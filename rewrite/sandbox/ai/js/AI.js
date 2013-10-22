function AI( obj, options ) {
	this.options = {
		maxSteerVelocity: 0.02,
		maxVelocity: 5,

		maxHistoryLength: 10
	};

	if( options ) {
		for( var i in options ) {
			this.options[i] = options[i];
		}
	}

	this.targetMatrix = new THREE.Matrix4();
	this.targetQuaternion = new THREE.Quaternion();
	this.targetHistory = [];

	this.waypoints = new Waypoints();
	this.flags = new Flags();

	this.acceleration = 0.01;
	this.velocity = 0;
	this.steerVelocity = 0.02;

	this.chaseObj = null;

	this.changeUpTimerDuration = 100;
	this.changeUpTimer = 0;

	this.obj = obj;
	this._initializeFlags();
}

AI.prototype = {

	_addTargetToHistory: function( target ) {
		var history = this.targetHistory;

		if( !history.length || ( history.length && !history[ history.length - 1 ].equals( target ) ) ) {
			history.push( target );
		}

		if( history.length > this.options.maxHistoryLength ) {
			history.unshift();
		}
	},

	_removeTargetFromHistory: function( target ) {
		var history = this.targetHistory;

		for( var i = 0; i < history.length; ++i ) {
			if( history[ i ].equals( target ) ) {
				history.splice( i, 1 );
				break;
			}
		}
	},

	_removeLastTargetFromHistory: function() {
		this.targetHistory.pop();
	},

	_initializeFlags: function() {
		var flags = this.flags;

		flags.create( 'followWaypoints', false );
	    flags.create( 'detectedObstacle', false );
        flags.create( 'chase', false );
	},

	_checkDistanceToWaypoint: function() {
		var waypoint = this.waypoints.getCurrentWaypoint(),
			distance = this.obj.position.distanceTo( waypoint );

		var maxAngle = (Math.PI * 2) * this.steerVelocity;

		if( distance < maxAngle * 250 * this.velocity ) {
			return true;
		}

		return false;
	},

	tempVector: new THREE.Vector3(0, 1, 0),

	turnTowardsVector: function( vec, amount ) {
		var obj = this.obj,
			m = this.targetMatrix,
			q = this.targetQuaternion;

		this._addTargetToHistory( vec );

		m.lookAt( vec, obj.position, new THREE.Vector3(1, 0, 0) );
        q.setFromRotationMatrix( m );
        obj.quaternion.slerp( q, amount || this.steerVelocity );
	},



	avoid: (function() {
		var tempVector = new THREE.Vector3();

		return function( vec, amount ) {
			tempVector.subVectors( vec, this.obj.position );
			avoidWaypoint.position.copy( tempVector );
			this.turnTowardsVector( tempVector, amount || this.steerVelocity );
		};
	}()),



	chase: (function() {
		var tempObj = new THREE.Object3D();

		return function( obj, amount ) {
			var distance = obj.position.distanceTo( this.obj.position ) / 2;

			tempObj.quaternion.copy( obj.quaternion );
			tempObj.position.copy( obj.position );
			tempObj.translateZ( distance );

			avoidWaypoint.position.copy( tempObj.position );

			this.turnTowardsVector( tempObj.position, amount || this.steerVelocity );
		};
	}()),


	_handleWaypoints: function( target ) {
		this.turnTowardsVector( target );

		if( this._checkDistanceToWaypoint() ) {
			this.waypoints.randomWaypoint();

			console.log( 'next' );
		}
	},

	_changeUpVector: (function() {
		var axes = ['x', 'y', 'z'];

		return function() {
			var axis = axes[ Math.round( Math.random() * 2 ) ],
				value = Math.random() * 2 - 1 < 0 ? -1 : 1;

			console.log( axis, value );

			this.tempVector.set(0, 0, 0);

			this.tempVector[ axis ] = value;



			// this.tempVector.set(
			// 	Math.random() * 2 - 1,
			// 	Math.random() * 2 - 1,
			// 	Math.random() * 2 - 1
			// );
			// this.tempVector.normalize();

			// this.tempVector.negate();
		};
	}()),


	tick: function( dt ) {
		var target;

		if( this.flags.check( 'followWaypoints' ) || this.flags.check( 'chase' ) ) {
			target = this.waypoints.getCurrentWaypoint();
		}

		if( target ) {

			if( this.velocity < this.options.maxVelocity ) {
				this.velocity += this.acceleration;
				this.velocity = Math.min( this.velocity, this.options.maxVelocity );
			}

			if( this.flags.check( 'followWaypoints' ) ) {
				this._handleWaypoints( target );
			}
			else if( this.flags.check( 'chase' ) ) {
				this.chase( this.chaseObj );
			}


		}

		++this.changeUpTimer;

		if( this.changeUpTimer >= this.changeUpTimerDuration ) {
			this.changeUpTimerDuration = Math.random() * (300 * this.velocity);
			this._changeUpVector();
			this.changeUpTimer = 0;
		}


		this.obj.translateZ( this.velocity );
	}
};