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
			this.serverPos = new THREE.Vector3();
			this.serverQuaternion = new THREE.Quaternion();


			this.isPrimaryWeaponFiring = 0;

			this.moveState = {
			    up: 0, down: 0,
			    left: 0, right: 0,
			    forward: 0, back: 0,
			    pitchUp: 0, pitchDown: 0,
			    yawLeft: 0, yawRight: 0,
			    rollLeft: 0, rollRight: 0,
			    isFiring: 0
			};

	        // Create state history store
	        this.history = [];

	        this.middlegroundTarget = null;
	        this.backgroundTarget = null;
	        this.foregroundTarget = null;

	        this.targetable = 1;

	        this.options = options || {};

	        if(this.options.isServer) {
	        	this.middlegroundTarget = new THREE.Object3D();
	        	this.middlegroundTarget.useQuaternion = true;
	        	this.updateMovementVector();
	        	this.updateRotationVector();
	        }

	        else if(!this.options.hasControls) {
	        	this.loadCollada( 'res/models/fighter.dae', this.onModelLoaded.bind(this) );
	    	}

	    	else {
	    		this.hud = new HUD();
	    		this.middlegroundTarget = sceneManager.middleground.camera;
	    		this.backgroundTarget = sceneManager.background.camera;
	    		this.foregroundTarget = sceneManager.foreground.camera;

	    		this.middlegroundTarget.useQuaternion = true;
	    		this.backgroundTarget.useQuaternion = true;
	    		this.foregroundTarget.useQuaternion = true;


	    		var light = new THREE.PointLight(
			        0x70b0ff,
			        2,
			        5000
			    );

		        light.position.z = 2;

		        sceneManager.middleground.camera.add(light);

	        	this.addEvents();
	        	this.updateMovementVector();
	        	this.updateRotationVector();
	    	}
	    },

	    onModelLoaded: function( dae, skin ) {
	    	this.mesh = dae;
	    	this.mesh.useQuaternion = true;

        	this.emitterRight = new Emitter({
		        position: new THREE.Vector3(100, -10, 150),
		        velocity: new THREE.Vector3(0, 0, 50),
		        acceleration: new THREE.Vector3(0, 0, 50),
		        randomDrift: new THREE.Vector3(50, 50, 1000),
		        minSize: 40,
		        maxSize: 60,
		        duration: 200,
		        lifetime: [2, 2],
		        count: 750,
		        colors: [0x509efe, 0x50d7fe, 0xc97474, 0x009cff, 0x245490, 0x3186f0],
		        hasLight: true
		    });

        	this.emitterLeft = new Emitter({
		        position: new THREE.Vector3(-100, -10, 150),
		        velocity: new THREE.Vector3(0, 0, 50),
		        acceleration: new THREE.Vector3(0, 0, 50),
		        randomDrift: new THREE.Vector3(50, 50, 1000),
		        minSize: 40,
		        maxSize: 60,
		        duration: 200,
		        lifetime: [2, 2],
		        count: 750,
		        colors: [0x509efe, 0x50d7fe, 0xc97474, 0x009cff, 0x245490, 0x3186f0],
		        hasLight: true
		    });

        	this.mesh.add( this.emitterRight.object );
	       	this.mesh.add( this.emitterLeft.object );

	        this.emitterLeft.start();
	        this.emitterRight.start();

	        var light = new THREE.PointLight(
		        0x00FF00,
		        2,
		        1000
		    );

	        light.position.z = -250;

		    this.mesh.add(light);

	    	this.renderables.push( this.mesh );
	    	sceneManager.addObjectTo( 'middleground', this );

	    	// sceneManager.addObjectTo( 'middleground', this.emitterLeft.object );
	    	// sceneManager.addObjectTo( 'middleground', this.emitterRight.object );

	    	// sceneManager.middleground.scene.add( this.emitterLeft.object );
	    	// sceneManager.middleground.scene.add( this.emitterRight.object );

        	this.middlegroundTarget = this.mesh;
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
	    	if(this.emitterLeft) {
	    		// this.emitterLeft.emitterPos = this.middlegroundTarget.position.clone();
	    		// this.emitterLeft.emitterPos.x -= 100;
	    		// this.emitterLeft.emitterPos.y -= 10;
	    		// this.emitterLeft.emitterPos.z += 200;

	    		// this.emitterRight.emitterPos = this.middlegroundTarget.position.clone();
	    		// this.emitterRight.emitterPos.x -= 100;
	    		// this.emitterRight.emitterPos.y -= 10;
	    		// this.emitterRight.emitterPos.z += 200;

	    		this.emitterLeft.tick();
	    		this.emitterRight.tick();
	    	}

    		this.updateMatrix( dt );
	    },

	    onServerStateReceived: function( state ) {
	    	if(!this.middlegroundTarget) return;

	    	this.serverPos.x = state.pos.x;
	    	this.serverPos.y = state.pos.y;
	    	this.serverPos.z = state.pos.z;

	    	this.serverQuaternion.x = state.quaternion.x;
	    	this.serverQuaternion.y = state.quaternion.y;
	    	this.serverQuaternion.z = state.quaternion.z;
	    	this.serverQuaternion.w = state.quaternion.w;

			this.middlegroundTarget.position.lerp( this.serverPos, 0.5 );
			this.middlegroundTarget.quaternion.slerp( this.serverQuaternion, 0.5 );

			if(this.backgroundTarget) {
				this.backgroundTarget.quaternion.slerp(  this.serverQuaternion, 0.5 );
			}

			if(this.foregroundTarget) {
				this.foregroundTarget.position.lerp( this.serverPos, 0.5 );
				this.foregroundTarget.quaternion.slerp(  this.serverQuaternion, 0.5 );
			}

			if( state.isFiring && !this.isPrimaryWeaponFiring) {
				if(primaryWeapon) {
					this.isPrimaryWeaponFiring = 1;
					primaryWeapon.burstFire( state.name, this.serverPos, this.serverQuaternion );
				}
			}
			else if(!state.isFiring && this.isPrimaryWeaponFiring) {
				if(primaryWeapon) {
					primaryWeapon.stopFiring( state.name );
					this.isPrimaryWeaponFiring = 0;
				}
			}
	    },



	    // EVENTS
	    addEvents: function() {
	    	document.addEventListener( 'mousedown', this, false );
	    	document.addEventListener( 'mousemove', this, false );
	    	document.addEventListener( 'mouseup', this, false );
	    	document.addEventListener( 'keydown', this, false );
	    	document.addEventListener( 'keyup', this, false );
	    },

		handleEvent: function ( event ) {
			if ( typeof this[ event.type ] === 'function' ) {
				this[ event.type ]( event );
			}
		},

		mousedown: function( e ) {

			var camera = sceneManager.middleground.camera;

			if(primaryWeapon) {
				this.moveState.isFiring = 1;

				comms.sendState({
					name: userName,
					moveState: this.moveState
				});

				// primaryWeapon.burstFire( camera.position, camera.quaternion );
			}
		},

		mouseup: function() {
			if(primaryWeapon) {
				this.moveState.isFiring = 0;

				comms.sendState({
					name: userName,
					moveState: this.moveState
				});

				// primaryWeapon.stopFiring();
			}
		},

		mousemove: function( event ) {
			var container = this.getContainerDimensions();
			var halfWidth  = container.size[ 0 ] / 2;
			var halfHeight = container.size[ 1 ] / 2;


			this.moveState.yawLeft   = -( ( event.pageX - container.offset[ 0 ] ) - halfWidth  ) / halfWidth;
			this.moveState.pitchDown =  ( ( event.pageY - container.offset[ 1 ] ) - halfHeight ) / halfHeight;


            var absYaw = Math.abs(this.moveState.yawLeft),
                absPitchDown = Math.abs(this.moveState.pitchDown);


            if(absYaw < this.mousemoveThreshold) {
                this.moveState.yawLeft = 0;
            }
            if(absPitchDown < this.mousemoveThreshold) {
                this.moveState.pitchDown = 0;
            }

			this.updateRotationVector();

			comms.sendState({
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
			if(!this.middlegroundTarget) return;

	        this.updateVelocity();

			var rotMult = delta * this.rollSpeed,
		    	vel = this.velocityVector,
				x = vel.x * delta,
			    y = vel.y * delta,
			    z = vel.z * delta,
			    roll = this.rollSpeedLeftRight * delta;


			this.middlegroundTarget.translateX( x );
			this.middlegroundTarget.translateY( y );
			this.middlegroundTarget.translateZ( z );

			this.tmpQuaternion.set(
			    this.rotationVector.x * rotMult,
			    this.rotationVector.y * rotMult,
			    roll,
			    1
			).normalize();

			this.middlegroundTarget.quaternion.multiply( this.tmpQuaternion );


			if(this.backgroundTarget) {
				this.backgroundTarget.quaternion.multiply( this.tmpQuaternion );
			}

			if(this.foregroundTarget) {
				this.foregroundTarget.translateX( x );
				this.foregroundTarget.translateY( y );
				this.foregroundTarget.translateZ( z );
				this.foregroundTarget.quaternion.multiply( this.tmpQuaternion );
			}

			if(this.isTargeted) {
		    	var quaternion = sceneManager.middleground.camera.quaternion;

		    	this.boundingSphere.mesh.position = this.mesh.position;
		    	this.boundingSphere.mesh.quaternion = quaternion;
		    }

			if(this.hud) {
				this.hud.updateRoll( roll );
				this.hud.updateTargetAngle();
			}
		}

	});


	attachTo.Player = Player;

}(window));