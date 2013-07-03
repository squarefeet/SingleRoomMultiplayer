function CameraControls( opts ) {
	var options = {
		keyboardHandler: null,
		mouseHandler: null,
		targetCameras: null,

		positionVelocityIncrement: 10,
		positionVelocityDecrement: 0.99,

		rotationDamping: 50,

		rollVelocityIncrement: 0.05,
		rollVelocityDecrement: 0.95,

		maxPositionVelocity: 1000,
		maxRotationVelocity: 1000,
		maxRollVelocity: 2
	};

	if( opts ) {
		for( var i in opts ) {
			options[i] = opts[i];
		}
	}


	var mouseX = 0,
		mouseY = 0,
		centerX = 0,
		centerY = 0,
		forward = false,
		back = false,
		left = false,
		right = false,
		rollLeft = false,
		rollRight = false,
		rollRotation = 0,
		yaw = 0,
		pitch = 0,
		rotationVector = new THREE.Vector3(),
		rotationQuaternion = new THREE.Quaternion(),
		positionVector = new THREE.Vector3(),
		hasInput = !!(options.keyboardHandler && options.mouseHandler),
		controls = CONFIG.controls;


	for(var i = 0; i < options.targetCameras.length; ++i) {
		options.targetCameras[i].useQuaternion = true;
	}

	for(var i in this) {
		if(typeof this[i] === 'function') {
			this[i] = this[i].bind(this);
		}
	}


	var updateRotation = function() {
		var inc = options.rollVelocityIncrement,
			dec = options.rollVelocityDecrement,
			max = options.maxRollVelocity;

		if( rollLeft ) {
			rollRotation += inc;
		}
		else if( rollRight ) {
			rollRotation -= inc;
		}
		else {
			rollRotation *= dec;
		}


		if( rollRotation > max ) {
			rollRotation = max;
		}
		else if( rollRotation < -max ) {
			rollRotation = -max;
		}

		if( centerX && centerY ) {
			rotationVector.y = (-(mouseX - centerX) / centerX) / options.rotationDamping;
			rotationVector.x = (-(mouseY - centerY) / centerY) / options.rotationDamping;
		}

		inc = null;
		dec = null;
		max = null;
	};



	var updatePosition = function() {
		var inc = options.positionVelocityIncrement,
			dec = options.positionVelocityDecrement,
			max = options.maxPositionVelocity;

		if( forward ) {
			positionVector.z -= inc;
		}
		else if( back ) {
			positionVector.z += inc;
		}
		else {
			positionVector.z *= dec;
		}

		if( left ) {
			positionVector.x -= inc;
		}
		else if( right ) {
			positionVector.x += inc;
		}
		else {
			positionVector.x *= dec;
		}


		if( positionVector.z > max ) {
			positionVector.z = max;
		}
		else if( positionVector.z < -max ) {
			positionVector.z = -max;
		}

		if( positionVector.x > max ) {
			positionVector.x = max;
		}
		else if( positionVector.x < -max ) {
			positionVector.x = -max;
		}

		inc = null;
		dec = null;
		max = null;
	};


	var updateSingleCamera = function( cam, x, y, z ) {
		if( cam.__updatePosition ) {
			cam.translateX( x );
			cam.translateY( y );
			cam.translateZ( z );
		}

		if( cam.__updateRotation ) {
			cam.quaternion.multiply ( rotationQuaternion );
		}
	};


	var updateCameras = function( dt ) {
		var velX = positionVector.x * dt,
			velY = positionVector.y * dt,
			velZ = positionVector.z * dt,
			roll = rollRotation * dt,
			cams = options.targetCameras,
			numCams = cams.length,
			i;

		rotationQuaternion.set(
			rotationVector.x,
			rotationVector.y,
			roll,
			1
		).normalize();

		for( i = 0; i < numCams; ++i ) {
			updateSingleCamera( cams[i], velX, velY, velZ );
		}

		velX = null;
		velY = null;
		velZ = null;
		roll = null;
		cams = null;
		numCams = null;
		i = null;
	};


	var handleInput = function() {
		var m = options.mouseHandler,
			k = options.keyboardHandler;

		mouseX = m.x;
		mouseY = m.y;
		centerX = m.centerX;
		centerY = m.centerY;

		forward = k.isPressed( controls.FORWARD );
		back = (!forward && k.isPressed( controls.BACKWARD ));

		left = k.isPressed( controls.LEFT );
		right = (!left && k.isPressed( controls.RIGHT ));

		rollLeft = k.isPressed( controls.ROLL_LEFT );
		rollRight = (!rollLeft && k.isPressed( controls.ROLL_RIGHT ) );
	};


	this.tick = function( dt ) {
		if( hasInput ) {
			handleInput();
		}

		updateRotation();
		updatePosition();
		updateCameras( dt );
	};


	this.set = function() {};

	this.setForward = function( state ) {
		forward = state;
	};
	this.setBackward = function( state ) {
		backward = state;
	};
	this.setLeft = function( state ) {
		left = state;
	};
	this.setRight = function( state ) {
		right = state;
	};
	this.setRollLeft = function( state ) {
		rollLeft = state;
	};
	this.setRollRight = function( state ) {
		rollRight = state;
	};
	this.setX = function( state ) {
		mouseX = state;
	};
	this.setY = function( state ) {
		mouseY = state;
	};
	this.setCenterX = function( state ) {
		centerX = state;
	};
	this.setCenterY = function( state ) {
		centerY = state;
	};
}