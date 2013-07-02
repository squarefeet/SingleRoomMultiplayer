var scenes = scenes || {};

scenes.middleground = {

	models: [],

	initialize: function() {
		// this.makeStarfield();

		this.addEmitters();
		this.addTemporaryShips();
		this.addLighting();

		renderer.addPreRenderTickFunction( this.tick );
	},

	tick: function( dt ) {
		scenes.middleground.particleGroup.update( 0.016 );
	},

	addEmitters: function() {
		this.particleGroup = new ParticleGroup({
            blending: THREE.AdditiveBlending,
            depthTest: true,
            texture: assetLoader.loaded.textures['../../res/textures/smokeparticle.png']
        });
	},

	addTemporaryShips: function() {
		var models = assetLoader.loaded.models;

        var i = '../../res/models/crosswing6.dae';

        var spread = 7000,
        	halfSpread = spread/2;


        function rand() {
        	return Math.random() * spread - halfSpread;
        }

        for(var k = 0; k < 16; ++k) {
        	var model = models[i].dae.clone();
        	model.position.set( rand(), rand(), rand() );
        	layerManager.addObject3dToLayer( 'middleground', model );


        	var emitter = new ParticleEmitter({
	            particlesPerSecond: 20,
	            maxAge:             5,

	            position:           new THREE.Vector3( 0, 0, 0 ),
	            positionSpread:     new THREE.Vector3( 0, 0, 0 ),

	            velocity:           new THREE.Vector3( 0, 0, 220 ),
	            velocitySpread:     new THREE.Vector3( 0, 0, 50 ),

	            acceleration:       new THREE.Vector3( 0, 0, 0 ),
	            accelerationSpread: new THREE.Vector3( 20, 20, 0 ),

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
	        });

			emitter.position.copy( model.position );
			emitter.position.z += 360;
			emitter.position.y += 6;

			emitter.initialize();

			// Lights are too expensive :(
			// var light = new THREE.DirectionalLight( 0x66ee11, 1, 500 );
			// light.position = emitter.position;
			// layerManager.addObject3dToLayer('middleground', light )

			this.particleGroup.addEmitter( emitter );
        }

        layerManager.addObject3dToLayer('middleground', this.particleGroup.mesh )
	},

	addLighting: function() {
		var sunLight = new THREE.DirectionalLight( 0xfffea6, 1 );
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