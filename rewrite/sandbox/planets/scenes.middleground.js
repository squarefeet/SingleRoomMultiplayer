var scenes = scenes || {};

scenes.middleground = {

	models: [],

	initialize: function() {
        this.boosters = [];
        this.controls = [];
        this.count = 0;

		this.makeStarfield();

		this.addEmitters();
		this.addTemporaryShips();
		this.addLighting();

		renderer.addPreRenderTickFunction( this.tick );
	},

	tick: function( dt ) {
		var invert = false;

		scenes.middleground.count += dt;

		scenes.middleground.particleGroup.update( 0.016 );

        var boosters = scenes.middleground.boosters,
        	controls = scenes.middleground.controls;

        for(var i = 0; i < controls.length; ++i) {
            // boosters[i].rotation.y += 1;


        	controls[i].setForward( true );
        	// controls[i].setBackward( false );
        	// controls[i].setRollLeft( true );
        	// controls[i].setRollRight( false );
        	controls[i].setX( (window.innerWidth/2) - 100 );
        }
	},

	addEmitters: function() {
		this.particleGroup = new ParticleGroup({
            blending: THREE.AdditiveBlending,
            depthTest: true,
            texture: assetLoader.loaded.textures['../../res/textures/smokeparticle.png']
        });
	},

    makeShip: function( model ) {

    	var spread = 5000,
    		halfSpread = spread/2;

        function rand() {
            return Math.random() * spread - halfSpread;
        }

        model.position.set( rand(), rand(), rand() );

        // var cylinder = new THREE.Mesh(
        //     new THREE.CylinderGeometry( 10, 30, 400, 16, 3, true ),
        //     new THREE.MeshPhongMaterial({
        //         map: assetLoader.loaded.textures['../../res/textures/booster.jpg'],
        //         transparent: true,
        //         blending: THREE.AdditiveBlending,
        //         opacity: 0.3
        //     })
        // );
        // cylinder.rotation.x = -Math.PI/2;
        // cylinder.position.z += 545;
        // cylinder.position.y += 2;

        // model.add( cylinder );

        // this.boosters.push( cylinder );

        layerManager.addObject3dToLayer( 'middleground', model );


        var emitter = new ParticleEmitter({
            particlesPerSecond: 50,
            maxAge:             3,

            position:           new THREE.Vector3( 0, 0, 0 ),
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
        });

        // emitter.position.copy( model.position );
        // emitter.position.z += 360;
        // emitter.position.y += 6;

        emitter.position = model.position;

        emitter.initialize();

        // Lights are too expensive :(
        // var light = new THREE.DirectionalLight( 0x66ee11, 1, 500 );
        // light.position = emitter.position;
        // layerManager.addObject3dToLayer('middleground', light )

        this.particleGroup.addEmitter( emitter );

    },

    addControlsToModel: function( model ) {
    	model.__updatePosition = true;
    	model.__updateRotation = true;

    	var controls = new CameraControls({
    		targetCameras: [ model ]
    	});

    	controls.setCenterX( window.innerWidth/2 );
    	controls.setCenterY( window.innerHeight/2 );

    	controls.setX( window.innerWidth/2 );
    	controls.setY( window.innerHeight/2 );

    	this.controls.push( controls );
    	renderer.addPreRenderTickFunction( controls.tick );
    },

	addTemporaryShips: function() {
		var models = assetLoader.loaded.models;

        var i = '../../res/models/crosswing6-recentered.dae';

        var spread = 7000,
        	halfSpread = spread/2;

        for(var k = 0; k < 12; ++k) {
        	var model = models[i].dae.clone();

            this.makeShip( model );
            this.addControlsToModel( model );
        }

        layerManager.addObject3dToLayer('middleground', this.particleGroup.mesh )
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