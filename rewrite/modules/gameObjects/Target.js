function Target( opts ) {
	var options = {
		// renderer: null,
		// layerManager: null,
		cameraControls: null
	};


	if( opts ) {
		for( var i in opts ) {
			options[i] = opts[i];
		}
	}

	GameObject.call( this );

	
	// Create target plane
	var planeGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
	var planeMaterial = new THREE.MeshBasicMaterial({
		color: 0xFF0000,
		wireframe: true
	});
	var planeMesh = new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.useQuaternion = true;
	planeMesh.quaternion = options.cameraControls.getCameraRotation();

	planeMesh.position.set(0, 0, -500);



	var cubeGeometry = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1);
	var cubeMesh = new THREE.Mesh( cubeGeometry, planeMaterial );
	cubeMesh.useQuaternion = true;
	cubeMesh.quaternion = options.cameraControls.getCameraRotation();


	var tick = function() {

	};

	// this.renderables.push( planeMesh );
	this.renderables.push( cubeMesh );

	this.tick = tick;


	this.setTargetObject = function( object ) {
		var mesh = object.renderables[0];

		planeMesh.position = mesh.position;
		cubeMesh.position = mesh.position;
		cubeMesh.quaternion = mesh.quaternion;

		mesh.traverse( function( o ) {
			if( o instanceof THREE.Mesh ) {
				var geometry = o.geometry,
					boundingBox = geometry.boundingBox;

				cubeMesh.scale.x = (boundingBox.max.x - boundingBox.min.x) * mesh.scale.x;
				cubeMesh.scale.y = (boundingBox.max.y - boundingBox.min.y) * mesh.scale.y;
				cubeMesh.scale.z = (boundingBox.max.z - boundingBox.min.z) * mesh.scale.z;

				planeMesh.scale.x = (boundingBox.max.x - boundingBox.min.x) * mesh.scale.x;
				planeMesh.scale.y = (boundingBox.max.y - boundingBox.min.y) * mesh.scale.y;
			}
		});

	};


}