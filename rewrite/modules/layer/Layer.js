function Layer( options ) {
	this.options = options;

	if( typeof this.initialize === 'function' ) {
		this.initialize();
	}
}

Layer.prototype = {
	_addObjectsToRenderer: function() {
		var l = this.options.layerManager;

		for( var i in this.objects ) {
			l.addObjectToLayer( this.name, this.objects[i] );
		}

		for( var i in this.object3Ds ) {
			l.addObject3dToLayer( this.name, this.object3Ds[i] );
		}
	},

	_addTickToRenderer: function() {
		this.options.renderer.addPreRenderTickFunction( this.tick );
	},

	_addParticleGroupsToRenderer: function() {
		for( var i in this.particleGroups ) {
			this.options.layerManager.addObject3dToLayer( this.name, this.particleGroups[i].mesh );
		}
	}
};

Layer.extend = utils.extend;




var BackgroundLayer = Layer.extend({
	name: 'background',

	objects: {},
	object3Ds: {},

	initialize: function() {
		this.tick = this.tick.bind( this );

		this._makeObjects();
		this._addObjectsToRenderer();
		this._addTickToRenderer();
	},

	_makeObjects: function() {
		var o = this.objects,
			o3d = this.object3Ds;

		o.skybox = new Skybox( CONFIG.layers.background.skybox );
		// o.starfield = new Starfield( CONFIG.layers.background.starfield );
		o.planet = new Planet( CONFIG.layers.background.planet );
		o.sun = new Sun( CONFIG.layers.background.sun );

		o3d.sunLight = new THREE.DirectionalLight( 0xfffea6, 0.75 );
	    o3d.sunLight.position = CONFIG.layers.background.sun.position;
	},

	tick: function( dt ) {
		this.objects.planet.tick( dt );
	}
});


var MiddlegroundLayer = Layer.extend({
	name: 'middleground',

	objects: {},
	object3Ds: {},
	particleGroups: {},
	particleEmitters: {},

	initialize: function() {
		this.tick = this.tick.bind( this );

		this._makeParticleGroups();
		this._makeLayerEmitters();

		this._makeObjects();
		this._addObjectsToRenderer();
		this._addParticleGroupsToRenderer();
		this._addTickToRenderer();

	    var that = this;
        this.options.mouseHandler.addRightMouseDownListener(function() {
            that.objects.rockets.fire( 
            	'host', 
            	CAMERA_CONTROLS.getPositionForCamera(1), 
            	CAMERA_CONTROLS.getCameraRotation(), 
            	CAMERA_CONTROLS.getVelocity(), 
            	TARGETING_SYSTEM.getCurrentTarget() 
            );
		});

		this.options.mouseHandler.addLeftMouseDownListener(function() {
            that.objects.plasmaCannon.fire( 
            	'host', 
            	CAMERA_CONTROLS.getPositionForCamera(1), 
            	CAMERA_CONTROLS.getCameraRotation(), 
            	CAMERA_CONTROLS.getVelocity(), 
            	TARGETING_SYSTEM.getCurrentTarget() 
            );
		});

		this.options.mouseHandler.addLeftMouseUpListener(function() {
            that.objects.plasmaCannon.stopFiring( 'host' );
		});
	},

	_makeParticleGroups: function() {
		var groups = this.particleGroups;

		// Shader Engines
		groups.engines = new ShaderParticleGroup( CONFIG.particleGroups.engines );

		// Shader Rocket engines
		groups.rockets = new ShaderParticleGroup( CONFIG.particleGroups.rockets );

		// Shader rocket explosions
		groups.rocketExplosions = new ShaderParticleGroup( CONFIG.particleGroups.rocketExplosions );

		// Shader plasma cannon explosions
		groups.plasmaCannonExplosions = new ShaderParticleGroup( CONFIG.particleGroups.plasmaCannonExplosions );

	},

	_makeLayerEmitters: function() {
		var p = this.particleEmitters,
			g = this.particleGroups,
			store;

		// Make rocket explosion pool and add each emitter in this pool to its parent particle group
		p.rocketExplosions = new Pool( 20, ShaderParticleEmitter, CONFIG.particleEmitters.rocketExplosions );

		store = p.rocketExplosions.getStore();

		for( var i = 0; i < store.length; ++i ) {
			g.rocketExplosions.addEmitter( store[i] );
		}

		// Do the same for plasma cannon explosions
		p.plasmaCannonExplosions = new Pool( 20, ShaderParticleEmitter, CONFIG.particleEmitters.plasmaCannonExplosions );

		store = p.plasmaCannonExplosions.getStore();

		for( var i = 0; i < store.length; ++i ) {
			g.plasmaCannonExplosions.addEmitter( store[i] );
		}
	},

	_makeObjects: function() {
		var o = this.objects,
			o3d = this.object3Ds;

		o.starfield = new Starfield( CONFIG.layers.middleground.starfield );

		o.rockets = new Rockets( _.extend( {
			particleGroup: this.particleGroups.rockets,
			bulletConstructor: 'Rocket'
		}, CONFIG.weapons.rockets ) );

		o3d.targetMesh = new THREE.Mesh( new THREE.CubeGeometry(100, 100, 100) );
	    o3d.targetMesh.position.set(-1000, 2000, 1000);

		o3d.sunLight = new THREE.DirectionalLight( 0xfffea6, 3 );
	    o3d.sunLight.position.copy( CONFIG.layers.background.sun.position );


	    o.plasmaCannon = new PlasmaCannon( CONFIG.weapons.plasmaCannon );

		o.ship = new Ship( _.extend( {
			particleGroup: this.particleGroups.engines,
			x: 0, y: 0, z: 0
		}, CONFIG.ship )  );
		o.ship.playerID = 'enemy';

		o.ship.controls.setForward( true );
		o.ship.controls.setY( window.innerHeight / 10 );


		o.mothership = new Mothership({
			x: 0, y: 0, z: -5000,
			model: '../../res/models/tempMothership.dae'
		});
	},

	triggerRocketExplosion: function( type, x, y, z ) {
		var pool = this.particleEmitters.rocketExplosions,
			explosion = pool.get();

		if(!explosion) return;

		explosion.position.set( x, y, z );
		explosion.alive = 1;

		setTimeout( function() {
			pool.release( explosion );
		}, CONFIG.particleGroups.rocketExplosions.maxAge + 100 )
	},

	triggerPlasmaCannonExplosion: function( type, x, y, z ) {
		var pool = this.particleEmitters.plasmaCannonExplosions,
			explosion = pool.get();

		if(!explosion) {
			console.log( 'no explosion', explosion );
			return;
		}

		explosion.position.set( x, y, z );
		explosion.alive = 1;

		setTimeout( function() {
			pool.release( explosion );
		}, CONFIG.particleGroups.plasmaCannonExplosions.maxAge + 100 )
	},

	tick: function( dt ) {
		this.objects.rockets.tick( dt );
		this.objects.plasmaCannon.tick( dt );
		
		this.particleGroups.rockets.tick();
		this.particleGroups.rocketExplosions.tick( dt );
		this.particleGroups.plasmaCannonExplosions.tick( dt );
		this.particleGroups.engines.tick( dt );
	}
});



var ForegoundLayer = Layer.extend({
	name: 'foreground',

	objects: {},
	object3Ds: {},

	initialize: function() {
		this.tick = this.tick.bind( this );

		this._makeObjects();
		this._addObjectsToRenderer();
		this._addTickToRenderer();
	},

	_makeObjects: function() {
		var o = this.objects,
			o3d = this.object3Ds;

		o.targetBox = new TargetBox({
			cameraControls: this.options.cameraControls,
			events: this.options.events
		});
	},

	tick: function( dt ) {
		this.objects.targetBox.tick( dt );
	}
});