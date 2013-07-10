const CONFIG = {

    // Performance
    resolutionScaling: 2,


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
	    layerOrder: [ 'background', 'middleground', 'foreground' ],
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
	},


	layers: {
		background: {
			starfield: {
		        stars: 2000,
		        width: 4096,
		        height: 4096,
		        depth: 4096,
		        color: 0xffffff,
		        size: 20,
		        minDistance: 50,
		        texture: '../../res/textures/star.png'
		    },

		    planet: {
		    	position: new THREE.Vector3(0, 0, -600),
		        scale: 0.005,
		        planetTexture: '../../res/textures/jupiter.jpg',
		        atmosphereTexture: '../../res/textures/atmosphere1.jpg',
		        smallMoonTexture: '../../res/textures/io.jpg',
		        largeMoonTexture: '../../res/textures/europa.jpg'
		    },

		    skybox: {
		        radius: 4096,
		        segmentsWidth: 32,
		        segmentsHeight: 32,
		        texture: '../../res/textures/universe_sml_darker.jpg'
		    },

		    sun: {
		    	position: new THREE.Vector3(-2000, 0, 0),
		    	sunTexture: '../../res/textures/sun.jpg',
		    	flare0Texture: '../../res/textures/lensflares/lensflare0.png',
				flare1Texture: '../../res/textures/lensflares/lensflare1.png',
				flare2Texture: '../../res/textures/lensflares/lensflare2.png',
				flare3Texture: '../../res/textures/lensflares/lensflare3.png'
		    }
		},

        middleground: {
            starfield: {
                stars: 200000,
                size: 50,
                texture: '../../res/textures/star.png'
            }
        }
	},

    particleGroups: {
        engines: {
            maxAge: 3,
            colorStart: new THREE.Color( 'white' ),
            colorEnd: new THREE.Color( 'blue' ),
            opacityStart: 1.0,
            opacityEnd: 0.0,
            texture: '../../res/textures/smokeparticle.png'
        },

        rockets: {
            maxAge: 1.5,
            colorStart: new THREE.Color( 'white' ),
            colorEnd: new THREE.Color( 'green' ),
            opacityStart: 1.0,
            opacityEnd: 0.0,
            texture: '../../res/textures/smokeparticle.png'
        }
    },

    particleEmitters: {
        engines: {},
        rockets: {
            particlesPerSecond: 100,
            accelerationSpread: new THREE.Vector3(20, 20, 20),
            sizeSpread: 8
        }
    },


    weapons: {
        rockets: {
            acceleration: 5,
            velocity: 1000,
            maxVelocity: 1500,
            freeFlightDuration: 1,
            lerpAmount: 0.07,
            maxAge: 10,
            launchGap: 1,
            model: '../../res/models/rocket.dae'
        }
    },


	ship: {
		model: '../../res/models/crosswing6-recentered.dae',
		scale: 0.1,
		useEmitter: true
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
    	numBullets: 10000,
    	size: 100,
    	texture: null,
    	speed: 5000,
    	power: 10,
    	maxAge: 5
    }

};