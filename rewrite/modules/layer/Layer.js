function Layer( options ) {
	this.options = options;

	if( typeof this.initialize === 'function' ) {
		this.initialize();
	}
}

Layer.prototype = {
	_addObjectsToRenderer: function() {
		for( var i in this.objects ) {
			this.options.layerManager.addObjectToLayer( this.name, this.objects[i] );
		}

		for( var i in this.object3Ds ) {
			this.options.layerManager.addObject3dToLayer( this.name, this.object3Ds[i] );
		}
	},

	_addTickToRenderer: function() {
		this.options.renderer.addPreRenderTickFunction( this.tick );
	}
};

Layer.extend = utils.extend;




var BackgroundLayer = Layer.extend({
	name: 'background',

	objects: {},
	object3Ds: {},

	initialize: function() {
		console.log('yay', this.options )

		this.tick = this.tick.bind( this );

		this._makeObjects();
		this._addObjectsToRenderer();
		this._addTickToRenderer();
	},

	_makeObjects: function() {
		var o = this.objects,
			o3d = this.object3Ds;

		o.skybox = new Skybox( CONFIG.layers.background.skybox );
		o.starfield = new Starfield( CONFIG.layers.background.starfield );
		o.planet = new Planet( CONFIG.layers.background.planet );
		o.sun = new Sun( CONFIG.layers.background.sun );

		o3d.sunLight = new THREE.DirectionalLight( 0xfffea6, 1 );
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

	initialize: function() {
		console.log('yay', this.options )

		this.tick = this.tick.bind( this );

		this._makeObjects();
		this._addObjectsToRenderer();
		this._addTickToRenderer();
	},

	_makeParticleGroups: function() {
		// Shader Engines
		// Shader Rockets

		// Bullet particles
		//
	},

	_makeObjects: function() {
		var o = this.objects,
			o3d = this.object3Ds;


	},

	tick: function( dt ) {

	}
});