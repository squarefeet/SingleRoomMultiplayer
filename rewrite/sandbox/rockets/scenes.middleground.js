var scenes = scenes || {};

scenes.middleground = {

	models: [],

	initialize: function() {
		this.rocket = null;
        this.count = 0;

		this.makeStarfield();
		this.addLighting();

		this.addRocket();



        var that = this;

        document.addEventListener('mousedown', function() {
            that.rocket.fire( null, layerManager.getLayerWithName('middleground').camera );
		}, false);
	},

	tick: function( dt ) {

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
		    stars: 100000,
		    size: 50
		});
		layerManager.addObjectToLayer( 'middleground', starfield );
	}
};