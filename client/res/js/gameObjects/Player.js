// This is here so this file can be used both server- and client-side.
var window = window || global;

/**
*   @requires Inheritance
*/
(function(attachTo) {


	var Player = GameObject.extend({

	    initialize: function( options ) {
	    	this.movementSpeed = 1.0;
			this.rollSpeed = Math.PI/2;

			this.rollSpeedLeftRight = 0.005;
		    this.movementSpeedMultiplier = 1;

		    this.mousemoveThreshold = 0.01;

			this.dragToLook = false;
			this.autoForward = false;

		    // Store acceleration, deceleration and maximum velocity values
		    this.acceleration = 0.8;
		    this.deceleration = 0.97;
		    this.maximumVelocity = 1000;

	    	this.moveVector = new THREE.Vector3( 0, 0, 0 );
			this.rotationVector = new THREE.Vector3( 0, 0, 0 );
			this.velocityVector = new THREE.Vector3( 0, 0, 0 );
			this.tmpQuaternion = new THREE.Quaternion();

			this.moveState = {
			    up: 0, down: 0,
			    left: 0, right: 0,
			    forward: 0, back: 0,
			    pitchUp: 0, pitchDown: 0,
			    yawLeft: 0, yawRight: 0,
			    rollLeft: 0, rollRight: 0
			};

	        // Create state history store
	        this.history = [];

	        this.target = null;
	        this.backgroundTarget = null;
	        this.foregroundTarget = null;

	        this.targetable = 1;

	        this.options = options || {};

	        if(this.options.isServer) {
	        	this.target = new THREE.Object3D();
	        	this.target.useQuaternion = true;
	        	this.updateMovementVector();
	        	this.updateRotationVector();
	        }

	        else if(!this.options.hasControls) {
	        	this.loadCollada( 'res/models/fighter.dae', this.onModelLoaded.bind(this) );
	    	}

	    	else {
	    		this.hud = new HUD();

	    		this.target = sceneManager.middleground.camera;
	    		this.backgroundTarget = sceneManager.background.camera;
	    		this.foregroundTarget = sceneManager.foreground.camera;

	    		this.target.useQuaternion = true;
	    		this.backgroundTarget.useQuaternion = true;
	    		this.foregroundTarget.useQuaternion = true;

	        	this.addEvents();
	        	this.updateMovementVector();
	        	this.updateRotationVector();
	    	}
	    },

	    onModelLoaded: function( dae, skin ) {
	    	this.mesh = dae;
	    	this.mesh.useQuaternion = true;

	    	this.renderables.push( this.mesh );
	    	sceneManager.addObjectTo( 'middleground', this );


	    	// var light = new THREE.PointLight(0xffffff, 1);
	    	// light.direction.set(0, 0, -1);
	    	// this.mesh.add(light);

        	this.target = this.mesh;
        	this.updateMovementVector();
        	this.updateRotationVector();
	    },

	    getGeometry: function() {
	    	if(this.mesh) {
	    		return this.mesh.children[0].geometry;
	    	}
	    	else {
	    		return undefined;
	    	}
	    },

	    tick: function( dt ) {
    		this.updateMatrix( dt );
	    },

	    onServerStateReceived: function( state ) {
	    	return;

	    	var newPos = new THREE.Vector3(state.pos.x, state.pos.y, state.pos.z);

	    	var newQuat = new THREE.Quaternion(
	    		state.quaternion.x,
	    		state.quaternion.y,
	    		state.quaternion.z,
	    		state.quaternion.w
	    	);

			this.target.position.lerp( newPos, 0.5);
			this.target.quaternion.slerp( newQuat, 0.5);

			if(this.backgroundTarget) {
				this.backgroundTarget.quaternion = this.target.quaternion;
			}

			if(this.foregroundTarget) {
				this.foregroundTarget.position = this.target.position;
				this.foregroundTarget.quaternion = this.target.quaternion;
			}
	    },



	    // EVENTS
	    addEvents: function() {
	    	document.addEventListener( 'mousemove', this, false );
	    	document.addEventListener( 'keydown', this, false );
	    	document.addEventListener( 'keyup', this, false );
	    },

		handleEvent: function ( event ) {
			if ( typeof this[ event.type ] == 'function' ) {
				this[ event.type ]( event );
			}
		},

		mousemove: function( event ) {
			var container = this.getContainerDimensions();
			var halfWidth  = container.size[ 0 ] / 2;
			var halfHeight = container.size[ 1 ] / 2;


			this.moveState.yawLeft   = - ( ( event.pageX - container.offset[ 0 ] ) - halfWidth  ) / halfWidth;
			this.moveState.pitchDown =   ( ( event.pageY - container.offset[ 1 ] ) - halfHeight ) / halfHeight;


            var absYaw = Math.abs(this.moveState.yawLeft),
                absPitchDown = Math.abs(this.moveState.pitchDown);


            if(absYaw < this.mousemoveThreshold) {
                this.moveState.yawLeft = 0;
            }
            if(absPitchDown < this.mousemoveThreshold) {
                this.moveState.pitchDown = 0;
            }

			this.updateRotationVector();

			comms.sendState( {
				name: userName,
				moveState: this.moveState
			});
		},

		keydown: function( event ) {
			if ( event.altKey ) {
				return;
			}

			switch ( event.keyCode ) {

				case 16: /* shift */ this.movementSpeedMultiplier = .1; break;

				case 87: /*W*/ this.moveState.forward = 1; break;
				case 83: /*S*/this.moveState.back = 1; break;

				case 65: /*A*/ this.moveState.left = 1; break;
				case 68: /*D*/ this.moveState.right = 1; break;

				case 82: /*R*/ this.moveState.up = 1; break;
				case 70: /*F*/ this.moveState.down = 1; break;

				case 38: /*up*/ this.moveState.pitchUp = 1; break;
				case 40: /*down*/ this.moveState.pitchDown = 1; break;

				case 37: /*left*/ this.moveState.yawLeft = 1; break;
				case 39: /*right*/ this.moveState.yawRight = 1; break;

				case 81: /*Q*/ this.moveState.rollLeft = 1; break;
				case 69: /*E*/ this.moveState.rollRight = 1; break;

				default:
					return;
			}

			this.updateMovementVector();
			this.updateRotationVector();

			comms.sendState( {
				name: userName,
				moveState: this.moveState
			});
		},

		keyup: function( event ) {

			switch( event.keyCode ) {

				case 16: /* shift */ this.movementSpeedMultiplier = 1; break;

				case 87: /*W*/ this.moveState.forward = 0; break;
				case 83: /*S*/ this.moveState.back = 0; break;

				case 65: /*A*/ this.moveState.left = 0; break;
				case 68: /*D*/ this.moveState.right = 0; break;

				case 82: /*R*/ this.moveState.up = 0; break;
				case 70: /*F*/ this.moveState.down = 0; break;

				case 38: /*up*/ this.moveState.pitchUp = 0; break;
				case 40: /*down*/ this.moveState.pitchDown = 0; break;

				case 37: /*left*/ this.moveState.yawLeft = 0; break;
				case 39: /*right*/ this.moveState.yawRight = 0; break;

				case 81: /*Q*/ this.moveState.rollLeft = 0; break;
				case 69: /*E*/ this.moveState.rollRight = 0; break;

				default:
					return;
			}

			this.updateMovementVector();
			this.updateRotationVector();

			comms.sendState( {
				name: userName,
				moveState: this.moveState
			});
		},
		// END EVENTS


		// UTILS
	    clamp: function(n, min, max) {
	        if(n > 0) {
	            return ( n < min ? 0 : (n > max ? max : n) );
	        }
	        else {
	            return ( n > -min ? 0 : (n < -max ? -max : n) );
	        }
	    },
	    getContainerDimensions: function() {
			return {
				size	: [ window.innerWidth, window.innerHeight ],
				offset	: [ 0, 0 ]
			};
		},
		// END UTILS


	    updateVelocity: function() {
	        var state = this.moveState,
	            vel = this.velocityVector,
	            velx = vel.x,
	            vely = vel.y,
	            velz = vel.z,
	            roll = this.rollSpeedLeftRight,
	            accel = this.acceleration,
	            decel = this.deceleration,
	            accelRoll = accel / 25,
	            accelMove = accel * 10,
	            clamp = this.clamp;


	        if(state.rollLeft) {
	            roll += accelRoll;
	        }
	        else if(state.rollRight) {
	            roll -= accelRoll;
	        }
	        else {
	            roll *= decel;
	        }


	        this.rollSpeedLeftRight = clamp(roll, 0.001, this.maximumVelocity / 1000);


	        if(this.movementSpeed) {

	            // Forward/Back (Z axis)
	            if(state.forward) {
	                velz -= accelMove;
	            }
	            else if(state.back) {
	                velz += accelMove;
	            }
	            else {
	                velz *= decel;
	            }

	            // Left/Right (X axis)
	            if(state.left) {
	                velx -= accelMove;
	            }
	            else if(state.right) {
	                velx += accelMove;
	            }
	            else {
	                velx *= decel;
	            }

	            // Up/Down (Y axis)
	            if(state.up) {
	                vely += accelMove;
	            }
	            else if(state.down) {
	                vely -= accelMove;
	            }
	            else {
	                vely *= decel;
	            }


	            // Clamp velocities
	            vel.x = clamp(velx, 0.001, this.maximumVelocity);
	            vel.y = clamp(vely, 0.001, this.maximumVelocity);
	            vel.z = clamp(velz, 0.001, this.maximumVelocity);

	        }
	    },

	    updateMovementVector: function() {
			var forward = ( this.moveState.forward || ( this.autoForward && !this.moveState.back ) ) ? 1 : 0;

			this.moveVector.x = ( -this.moveState.left    + this.moveState.right );
			this.moveVector.y = ( -this.moveState.down    + this.moveState.up );
			this.moveVector.z = ( -forward + this.moveState.back );
		},

		updateRotationVector: function() {
			this.rotationVector.x = ( -this.moveState.pitchDown + this.moveState.pitchUp );
			this.rotationVector.y = ( -this.moveState.yawRight  + this.moveState.yawLeft );
			this.rotationVector.z = ( -this.moveState.rollRight + this.moveState.rollLeft );
		},

		updateMatrix: function( delta ) {
			if(!this.target) return;

	        this.updateVelocity();

			var rotMult = delta * this.rollSpeed,
		    	vel = this.velocityVector,
				x = vel.x * delta,
			    y = vel.y * delta,
			    z = vel.z * delta,
			    roll = this.rollSpeedLeftRight * delta;


			this.target.translateX( x );
			this.target.translateY( y );
			this.target.translateZ( z );

			this.tmpQuaternion.set(
			    this.rotationVector.x * rotMult,
			    this.rotationVector.y * rotMult,
			    roll,
			    1
			).normalize();

			this.target.quaternion.multiply( this.tmpQuaternion );


			if(this.backgroundTarget) {
				this.backgroundTarget.quaternion.multiply( this.tmpQuaternion );
			}

			if(this.foregroundTarget) {
				this.foregroundTarget.translateX( x );
				this.foregroundTarget.translateY( y );
				this.foregroundTarget.translateZ( z );
				this.foregroundTarget.quaternion.multiply( this.tmpQuaternion );
			}

			if(this.hud) {
				this.hud.updateRoll( roll );
				this.hud.updateTargetAngle();
			}
		}

	});


	attachTo.Player = Player;

}(window));