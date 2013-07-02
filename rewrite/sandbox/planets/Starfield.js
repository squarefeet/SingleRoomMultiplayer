function Starfield( opts ) {
	var options = {
		width: 100000,
		height: 100000,
		depth: 100000,
		stars: 1000000,
		color: 0xffffff,
		size: 1
	};

	if( opts ) {
		for( var i in opts ) {
			options[i] = opts[i];
		}
	}


	var makeMaterial = function() {
		return new THREE.ParticleBasicMaterial({
	        color: options.color,
	        size: options.size
	    });
	};


	var createVertices = function() {
		for( var i = 0; i < options.stars; ++i ) {
			geometry.vertices.push(
	        	new THREE.Vector3(
	        		(Math.random() * options.width) - (options.width/2),
	        		(Math.random() * options.height) - (options.height/2),
	        		(Math.random() * options.depth) - (options.depth/2)
	        	)
	        );
		}
	};


	this.material = makeMaterial();
	var geometry = new THREE.Geometry();
	createVertices();
	this.mesh = new THREE.ParticleSystem(geometry, this.material);

	this.renderables = [ this.mesh ];

	this.getRenderables = function() {
		return this.renderables;
	};
}