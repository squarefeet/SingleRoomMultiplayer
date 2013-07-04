var scenes = scenes || {};

scenes.middleground = {

	models: [],

	initialize: function() {
        this.ships = [];
        this.count = 0;

		this.makeStarfield();

		this.addEmitters();
		this.addTemporaryShips();
		this.addLighting();

		renderer.addPreRenderTickFunction( this.tick );
	},

	tick: function( dt ) {
        var ships = scenes.middleground.ships;

        ++scenes.middleground.count;

        if(scenes.middleground.count > 20) scenes.middleground.count = 0;

		scenes.middleground.particleGroup.update( 0.016 );


        for(var i = 0; i < ships.length; ++i) {
        	ships[i].controls.setForward( true );
        	ships[i].controls.setX( (window.innerWidth/2) - 100 );

        	if(scenes.middleground.count === 0) {
        		ships[i].weapons.plasmaCannon.fire(null, ships[i].mesh );
        	}
        }


	},

	addEmitters: function() {
		this.particleGroup = new ParticleGroup({
            blending: THREE.AdditiveBlending,
            depthTest: true,
            texture: assetLoader.loaded.textures['../../res/textures/smokeparticle.png']
        });
	},



	addTemporaryShips: function() {
		var spread = 7000,
        	halfSpread = spread/2;

        for(var k = 0; k < 12; ++k) {
        	var model = new Ship({
                x: Math.random() * spread - halfSpread,
                y: Math.random() * spread - halfSpread,
                z: Math.random() * spread - halfSpread,
                model: CONFIG.ship.model,
                useEmitter: CONFIG.ship.useEmitter,
                particleGroup: this.particleGroup
            });

            this.ships.push( model );
            layerManager.addObjectToLayer( 'middleground', model );
        }

        layerManager.addObject3dToLayer('middleground', this.particleGroup.mesh );
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