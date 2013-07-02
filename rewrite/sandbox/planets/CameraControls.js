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
		pitch = 0;
		rotationVector = new THREE.Vector3(),
		rotationQuaternion = new THREE.Quaternion(),
		positionVector = new THREE.Vector3();



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

		rotationVector.y = (-(mouseX - centerX) / centerX) / options.rotationDamping;
		rotationVector.x = (-(mouseY - centerY) / centerY) / options.rotationDamping;
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
			roll = rollRotation * dt;

		rotationQuaternion.set(
			rotationVector.x,
			rotationVector.y,
			roll,
			1
		).normalize();

		for( var i = 0; i < options.targetCameras.length; ++i ) {
			updateSingleCamera( options.targetCameras[i], velX, velY, velZ );
		}
	};



	this.tick = function( dt ) {
		mouseX = options.mouseHandler.x;
		mouseY = options.mouseHandler.y;
		centerX = options.mouseHandler.centerX;
		centerY = options.mouseHandler.centerY;

		forward = options.keyboardHandler.isPressed( 'w' );
		back = (!forward && options.keyboardHandler.isPressed( 's' ));

		left = options.keyboardHandler.isPressed( 'a' );
		right = (!left && options.keyboardHandler.isPressed( 'd' ));

		rollLeft = options.keyboardHandler.isPressed( 'q' );
		rollRight = (!rollLeft && options.keyboardHandler.isPressed( 'e' ) );

		updateRotation();
		updatePosition();
		updateCameras( dt );
	};
}