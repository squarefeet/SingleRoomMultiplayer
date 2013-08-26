var CONFIG = {

    // Performance
    resolutionScaling: 1,

    drawBoundingBoxes: false,

    keyMap: {
        'tab': 9
    },

    keyMapPreventDefaults: [ 'tab' ],

    hud: {
    	color: {
    		h: 0.551,
    		s: 1,
    		l: 0.5,
    		a: 0.5
    	},

        reticuleAdjustment: {
            h: 0,
            s: -0.9,
            l: 0,
            a: 0
        },

        speedAdjustment: {
            h: 0,
            s: 0,
            l: 0,
            a: -0.3
        },

    	textAdjustment: {
    		h: 0,
    		s: 0,
    		l: 0,
    		a: 1
    	},

    	weaponIndicatorAdjustment: {
    		h: 0,
    		s: 0,
    		l: 0,
    		a: -0.3
    	},

        speedIndicatorAdjustment: {
            h: 0,
            s: 0,
            l: 0,
            a: -0.3
        },

        speedIndicatorOverlayAdjustment: {
            h: 0,
            s: 0,
            l: 0,
            a: 0
        }
    },

    target: {
        minSize: 50,
        maxSize: 1500
    },

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

    cameraControls: {
        positionVelocityIncrement: 10,
        positionVelocityDecrement: 0.99,

        rotationDamping: 50,

        rollVelocityIncrement: 0.05,
        rollVelocityDecrement: 0.95,

        maxPositionVelocity: 1000,
        maxRotationVelocity: 1000,
        maxRollVelocity: 2
    },

	// Should the ship automatically decelerate if !FORWARD && !BACKWARD keys
	// are pressed?
	automaticShipDeceleration: true,

	maxPlayers: 10,


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
	        '../../res/models/rocket.dae',
            '../../res/models/crosswing6-recentered.dae',
            '../../res/models/crosswingBounding2.dae',
            '../../res/models/bigShip3.dae',
            '../../res/models/PlasmaCannon.dae'
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
	        '../../res/textures/lensflares/lensflare3.png',

            '../../res/textures/PlasmaCannon.png'
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
                stars: 500000,
                size: 50,
                color: 0xffffff,
                texture: '../../res/textures/star.png'
            }
        }
	},


    particleGroups: {
        engines: {
            maxAge: 3,
            texture: '../../res/textures/smokeparticle.png'
        },

        rockets: {
            maxAge: 3,
            texture: '../../res/textures/smokeparticle.png'
        },

        rocketExplosions: {
            maxAge: 2,
        	texture: '../../res/textures/smokeparticle.png',
        	hasPerspective: 1
        }
    },


    particleEmitters: {
        engines: {
            type: 'cube',
            particlesPerSecond: 50,
            size: 100,
            sizeSpread: 0,
            sizeEnd: 1000,
            colorStart: new THREE.Color( 'white' ),
            colorEnd: new THREE.Color( 'blue' ),
            opacityStart: 1.0,
            opacityEnd: 0.0
        },

        rockets: {
            particlesPerSecond: 200,
            accelerationSpread: new THREE.Vector3(20, 20, 20),
            size: 10,
            sizeEnd: 50,
            sizeSpread: 8,
            alive: 0,
            colorStart: new THREE.Color( 'white' ),
            colorEnd: new THREE.Color( 'green' ),
            opacityStart: 1.0,
            opacityEnd: 0.0,
        },

        rocketExplosions: {
        	radius: 1,
            speed: 250,
            speedSpread: 0,
            particlesPerSecond: 100,
            size: 500,
            sizeSpread: 0,
            sizeEnd: 20,
            emitterDuration: 0.1,
            alive: 0,
            type: 'sphere',
            colorStart: new THREE.Color('red'),
            colorEnd: new THREE.Color('yellow'),
            opacityStart: 1.0,
            opacityEnd: 0.0
        }
    },


    weapons: {
    	names: {
    		primary: [ 'Pulse', 'Plasma' ],
    		secondary: [ 'Sidewinder', 'Hellfire' ]
    	},

        rockets: {
            acceleration: new THREE.Vector3(0, 0, 2000),
            velocity: new THREE.Vector3(0, 0, 3000),
            maxVelocity: 40000,
            freeFlightDuration: 1,
            lerpAmount: 0.07,
            maxAge: 10,
            launchGap: 1000,
            model: '../../res/models/rocket.dae',
            name: 'rocket',
            rate: 200,
            bulletConstructor: 'Rocket'
        },

        plasmaCannon: {
            acceleration: new THREE.Vector3(0, 0, 2000),
            velocity: new THREE.Vector3(0, 0, 5000),
            maxVelocity: 20000,
            freeFlightDuration: 1,
            lerpAmount: 0.07,
            maxAge: 4,
            launchGap: 1,
            model: '../../res/models/PlasmaCannon.dae',
            texture: '../../res/textures/PlasmaCannon.png',
            name: 'plasmaCannon',
            scale: 0.1,
            rate: 200,
            bulletConstructor: 'PlasmaCannonBullet'
        }
    },


	ship: {
		model: '../../res/models/crosswing6-recentered.dae',
		scale: 1,
		useEmitter: true,
        controls: true
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