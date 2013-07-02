const CONFIG = {

	layerManager: {
	    layers: {
	        background: {
	            updatePosition: false,
	            updateRotation: true
	        },
	        middleground: {
	            updatePosition: true,
	            updateRotation: true
	        },
	        foreground: {
	            updatePosition: true,
	            updateRotation: true
	        },
	    },
	    layerOrder: [ 'background', 'middleground' ],
	    fov: 75,
	    far: 50000
	},


	assetLoader: {
		parent: document.body,

	    models: [
	        '../../res/models/crosswing6.dae'
	    ],
	    textures: [
	        '../../res/textures/universe_sml_darker.jpg',

	        '../../res/textures/universe4.jpg',
	        '../../res/textures/universe4_lrg.jpg',
	        '../../res/textures/universe4_sml.jpg',
	        '../../res/textures/smokeparticle.png',

	        '../../res/textures/jupiter.jpg',
	        '../../res/textures/io.jpg',
	        '../../res/textures/europa.jpg',
	        '../../res/textures/sun.jpg',
	        '../../res/textures/atmosphere1.jpg',

	        '../../res/textures/star.png',

	        // lens flare assets
	        '../../res/textures/lensflares/lensflare0.png',
	        '../../res/textures/lensflares/lensflare1.png',
	        '../../res/textures/lensflares/lensflare2.png',
	        '../../res/textures/lensflares/lensflare3.png'
	    ],

	    onModelsLoaded: function( models ) {},

	    onAllLoaded: function( assets ) {
	        var models = assets.models;

	        scenes.background.initialize();
	        scenes.middleground.initialize();
	        assetLoader.domElement.style.display = 'none';

	        setTimeout( renderer.start, 100 );
	    }
	}

};