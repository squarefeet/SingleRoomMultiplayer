function TargetBox( opts ) {
	var options = {
		events: null,
		cameraControls: null
	};


	if( opts ) {
		for( var i in opts ) {
			options[i] = opts[i];
		}
	}

	GameObject.call( this );

	
	var planeMaterial = new THREE.MeshBasicMaterial({
			color: 0xFF0000,
			wireframe: true
		}),
		planeMesh = new THREE.Mesh( new THREE.PlaneGeometry(1, 1, 1, 1), planeMaterial ),
		currentTargetObject = null;

	planeMesh.useQuaternion = true;
	planeMesh.depthWrite = false;
	planeMesh.quaternion = options.cameraControls.getCameraRotation();
	planeMesh.visible = false;
	this.renderables.push( planeMesh );


	options.events.on('newTarget', function( targetObject ) {
		planeMesh.position.copy( targetObject.position );

		currentTargetObject = targetObject;

		targetObject.traverse( function( o ) {
			if( o instanceof THREE.Mesh ) {
				var geometry = o.geometry,
					boundingBox = geometry.boundingBox,
					sizeX = (boundingBox.max.x - boundingBox.min.x) * targetObject.scale.x,
					sizeY = (boundingBox.max.y - boundingBox.min.y) * targetObject.scale.y,
					size = Math.min( Math.max( sizeX, sizeY, CONFIG.target.minSize ), CONFIG.target.maxSize );

				planeMesh.scale.x = planeMesh.scale.y = size;

				planeMesh.visible = true;
			}
		});
	});


	options.events.on('targetDeselected', function() {
		currentTargetObject = null;
		planeMesh.visible = false;
	});


	this.tick = function() {
		if(!currentTargetObject) return;

		planeMesh.position.copy( currentTargetObject.position );
		planeMesh.position.z -= currentTargetObject.__center.z;
	};
}