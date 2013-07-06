const CONFIG = {

    // Performance
    resolutionScaling: 1.5,


	// Controls
	controls: {
		UP: 'r',
		DOWN: 'f',
		LEFT: 'a',
		RIGHT: 'd',
		ROLL_LEFT: 'q',
		ROLL_RIGHT: 'e',
		FORWARD: 'w',
		BACKWARD: 's',
		TARGET: 't',
		CHAT: 'y',
		TEAM_CHAT: 'u'
	},


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
		models: [
	        '../../res/models/rocket.dae'
	    ],
		textures: [
	        '../../res/textures/universe_sml_darker.jpg',
	        '../../res/textures/universe.jpg',

	        '../../res/textures/universe4.jpg',
	        '../../res/textures/universe4_lrg.jpg',
	        '../../res/textures/universe4_sml.jpg',

	        '../../res/textures/booster.jpg',

	        '../../res/textures/jupiter.jpg',
	        '../../res/textures/io.jpg',
	        '../../res/textures/europa.jpg',
	        '../../res/textures/sun.jpg',
	        '../../res/textures/atmosphere1.jpg',

	        // Particle materials
	        '../../res/textures/smokeparticle.png',
	        '../../res/textures/star.png',
	        '../../res/textures/plasmaBullet.png',
	        '../../res/textures/plasmaBullet.jpg',

	        // lens flare assets
	        '../../res/textures/lensflares/lensflare0.png',
	        '../../res/textures/lensflares/lensflare1.png',
	        '../../res/textures/lensflares/lensflare2.png',
	        '../../res/textures/lensflares/lensflare3.png'
	    ],

		parent: document.body,

	    onModelsLoaded: function( models ) {},

	    onAllLoaded: function( assets ) {
	        scenes.background.initialize();
	        scenes.middleground.initialize();
	        assetLoader.domElement.style.display = 'none';

	        setTimeout( renderer.start, 100 );
	    }
	},

	ship: {
		model: '../../res/models/crosswing6-recentered.dae',
		scale: 0.1,
		useEmitter: true
	},

	engineEmitter: {
        particlesPerSecond: 50,
        maxAge:             3,

        position:           new THREE.Vector3( Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY ),
        positionSpread:     new THREE.Vector3( 0, 0, 0 ),

        velocity:           new THREE.Vector3( 0, 0, 0 ),
        velocitySpread:     new THREE.Vector3( 0, 0, 0 ),

        acceleration:       new THREE.Vector3( 0, 0, 0 ),
        accelerationSpread: new THREE.Vector3( 0, 0, 0 ),

        angle:              90,
        angleSpread:        90,

        size:               100,
        // sizeSpread:         0,

        opacity:            1,
        // opacitySpread:      1,

        color:              new THREE.Vector3( 0.58, 0.5, 0.5 ),
        // colorSpread:        new THREE.Vector3( 0.05, 0, 0 ),

        opacityTweenTo:     0,
        sizeTweenTo:        200,
        colorTweenTo:       new THREE.Vector3( 0.65, 0.5, 0.5 )
    },

    engineBooster: {
    	texture: '../../res/textures/booster.jpg',
    	radiusTop: 100,
    	radiusBottom: 300,
    	height: 4000,
    	radiusSegments: 16,
    	heightSegments: 1,
    	openEnded: true
    },


    plasmaCannon: {
    	numBullets: 100000,
    	size: 100,
    	texture: null,
    	speed: 5000,
    	power: 10,
    	maxAge: 5
    },

    rocket: {
    	acceleration: 5,
	    velocity: 1000,
	    maxVelocity: 1500,
	    freeFlightDuration: 1,
	    lerpAmount: 0.07,
	    maxAge: 10,
	    launchGap: 1000
    }

};