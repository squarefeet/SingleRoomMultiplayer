function Starfield( opts ) {
	var options = {
		width: 100000,
		height: 100000,
		depth: 100000,
		stars: 1000000,
		color: 0xffffff,
		size: 1,
		minDistance: 0,
		texture: null
	};

	if( opts ) {
		for( var i in opts ) {
			options[i] = opts[i];
		}
	}


	var makeMaterial = function() {
		return new THREE.ParticleBasicMaterial({
	        size: options.size,
	        map: ASSET_LOADER.loaded.textures[ options.texture ],
	        blending: THREE.AdditiveBlending,
	        depthTest: true,
	        transparent : true
	    });
	};

	var getRandomPoint = function() {
		var value = (Math.random() * options.width) - (options.width/2);


		if(value > 0 && value < options.minDistance) {
			value += options.minDistance
		}
		else if(value < 0 && value > -options.minDistance) {
			value -= options.minDistance
		}

		return value;
	}

	var createVertices = function() {
		for( var i = 0; i < options.stars; ++i ) {
			geometry.vertices.push(
	        	new THREE.Vector3(
	        		getRandomPoint(),
	        		getRandomPoint(),
	        		getRandomPoint()
	        	)
	        );
		}
	};


	var material = makeMaterial();
	var geometry = new THREE.Geometry();

	createVertices();

	this.mesh = new THREE.ParticleSystem(geometry, material);

	this.renderables = [ this.mesh ];

	this.getRenderables = function() {
		return this.renderables;
	};
}