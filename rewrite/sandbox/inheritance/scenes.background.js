var scenes = scenes || {};

scenes.background = {

	initialize: function() {
		this.makeSkybox();
		this.makePlanet();
		this.makeSun();
		renderer.addPreRenderTickFunction( this.tick );
	},

	tick: function( dt ) {
		scenes.background.planet.tick( dt );
	},

	makeSkybox: function() {
	    var skybox = new Skybox({
	        radius: 4096,
	        segmentsWidth: 32,
	        segmentsHeight: 32,
	        texture: assetLoader.loaded.textures['../../res/textures/universe_sml_darker.jpg']
	    });

	    layerManager.addObjectToLayer( 'background', skybox );

	    // var bgStarfield = new Starfield({
	    //     stars: 2000,
	    //     width: 4096,
	    //     height: 4096,
	    //     depth: 4096,
	    //     color: 0xffffff,
	    //     size: 20,
	    //     minDistance: 50
	    // });
	    // layerManager.addObjectToLayer( 'background', bgStarfield );
	},

	makePlanet: function() {
	    var planet = scenes.background.planet = new Planet({
	        position: new THREE.Vector3(0, 0, -400),
	        scale: 0.005
	    });

	    layerManager.addObjectToLayer( 'background', planet );
	},

	makeSun: function() {
	    var sun = new Sun({
	        position: sunPosition
	    });

	    layerManager.addObjectToLayer( 'background', sun);

	    var sunLight = new THREE.DirectionalLight( 0xfffea6, 1 );
	    sunLight.position = sunPosition;

	    layerManager.addObject3dToLayer( 'background', sunLight );
	}
};