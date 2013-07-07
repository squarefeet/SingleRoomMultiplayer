var scenes = scenes || {};

scenes.middleground = {

	models: [],

	initialize: function() {
		var that = this;

		this.rocket = null;
        this.count = 0;
        this.engineParticles = new ParticleGroup({
            blending: THREE.AdditiveBlending,
            depthTest: true,
            texture: assetLoader.loaded.textures['../../res/textures/smokeparticle.png']
        });

		this.makeStarfield();
		this.addLighting();
		this.addRocket();
		this.addTemporaryShips();

		layerManager.addObject3dToLayer( 'middleground', this.engineParticles.mesh );

		renderer.addPreRenderTickFunction( function() {
			that.engineParticles.update( 0.016 );
		});

		// TEMPORARY
	    var targetMesh = new THREE.Mesh( new THREE.CubeGeometry(100, 100, 100), this.material );
	    targetMesh.position.set(-1000, 2000, 1000);
	    layerManager.addObject3dToLayer( 'middleground', targetMesh );


        mouseHandler.addMouseDownListener(function() {
            that.rocket.fire( 'host', layerManager.getLayerWithName('middleground').camera, targetMesh );
		});
	},

	tick: function( dt ) {

	},

	addTemporaryShips: function() {
		var spread = 4000,
			halfSpread = spread/2;

		CONFIG.ship.particleGroup = this.engineParticles;

		for( var i = 0; i < 10; ++i ) {
			CONFIG.ship.x = Math.random() * spread - halfSpread;
			CONFIG.ship.y = Math.random() * spread - halfSpread;
			CONFIG.ship.z = Math.random() * spread - halfSpread;

			var ship = new Ship( CONFIG.ship );
			layerManager.addObjectToLayer( 'middleground', ship );

			ship.controls.setForward( !!(Math.random() > 0.5) );
			ship.controls.setLeft( !!(Math.random() > 0.5) );
			ship.controls.setRollRight( !!(Math.random() > 0.5) );
			ship.controls.setX( Math.random() * 100 );
		}
	},

	addRocket: function() {
		this.rocket = new Rocket({
			model: assetLoader.loaded.models['../../res/models/rocket.dae'].dae
		});
		renderer.addPreRenderTickFunction( this.rocket.tick );
		layerManager.addObjectToLayer( 'middleground', this.rocket );
	},

	addLighting: function() {
		var sunLight = new THREE.DirectionalLight( 0xfffea6, 3 );
	    sunLight.position.copy( sunPosition );
	    sunLight.position.x -= 1000;

	    layerManager.addObject3dToLayer( 'middleground', sunLight );
	},

	makeStarfield: function() {
		var starfield = new Starfield({
		    stars: 200000,
		    size: 50
		});
		layerManager.addObjectToLayer( 'middleground', starfield );
	}
};