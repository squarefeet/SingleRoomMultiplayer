/**
*   @requires Inheritance
*/

// This is here so this file can be used both server- and client-side.
var window = window || global;

(function(attachTo) {


	var PrimaryWeaponField = GameObject.extend({

	    initialize: function( options ) {
	    	this.hasFired = [];
	    	this.origins = [];
	    	this.pool = [];
	    	this.intervals = {};

	        this.geometry = new THREE.Geometry();
	        this.material = this.makeMaterial();

	        this.createVertices();

	        this.particleSystem = new THREE.ParticleSystem(this.geometry, this.material);
		    this.particleSystem.dynamic = true;
		    this.particleSystem.useQuaternion = true;

		    this.fire = this.fire.bind(this);

		    this.renderables.push( this.particleSystem );

		    this.server = options ? options.server : undefined;
	    },

	    makeMaterial: function() {
	    	return new THREE.ParticleBasicMaterial({
		        color: 0xFFFFFF,
		        size: 10
		    });
	    },

	    getFromPool: function() {
	    	return this.pool.pop();
	    },
	    returnToPool: function( i ) {
	    	this.pool.push( i );
	    },

	    createVertices: function() {
	    	for(var i = 0; i < 1000; ++i) {
				this.geometry.vertices.push(
		        	new THREE.Vector3(
		        		Number.POSITIVE_INFINITY,
		        		Number.POSITIVE_INFINITY,
		        		Number.POSITIVE_INFINITY
		        	)
		        );
		        this.origins.push( this.makeOrigin() );
		        this.pool.push( i );
	    	}
	    },

	    makeOrigin: function() {
	    	var obj3d = new THREE.Object3D();
	    	obj3d.useQuaternion = true;

	    	return {
	    		object3d: obj3d,
	    		player: null,
	    		zPos: 0,
	    		zPosCount: 0,
	    		power: 10
	    	};
	    },

	    fire: function( player, playerName, position, quaternion ) {
	    	var index = this.getFromPool(),
	    		origin = this.origins[ index ],
	    		obj3d = origin.object3d;

	    	obj3d.position = position.clone();
	    	obj3d.quaternion = quaternion.clone();
	    	obj3d.translateZ( -100 );
	    	origin.zPos = -3000; // Bullet speed (will be multipled by dt)
	    	origin.zPosCount = 0;
	    	origin.playerName = playerName;
	    	origin.player = player;
	    	this.geometry.vertices[index] = obj3d.position;

	    	this.hasFired.push(index);
	    },

	    burstFire: function( player, playerName, position, quaternion ) {
	    	if( this.intervals[ playerName ] ) return;

	    	var that = this;

	    	this.fire( player, playerName, position, quaternion );

	    	this.intervals[ playerName ] = setInterval( function() {
	    		that.fire( player, playerName, position, quaternion );
	    	}, 100 );
	    },

	    stopFiring: function( playerName ) {
	    	clearInterval( this.intervals[ playerName ] );
	    	this.intervals[ playerName ] = null;
	    },

	    tick: function( dt ) {
	    	this.geometry.verticesNeedUpdate = true;

	    	if(this.hasFired.length) {
	    		var i = this.hasFired.length;

	    		while(--i >= 0) {
	    			var index = this.hasFired[i],
	    				origin = this.origins[ index ];

	    			if( origin.zPosCount < -8000 ) {
	    				origin.object3d.position.x = -Number.POSITIVE_INFINITY;
	    				origin.object3d.position.y = -Number.POSITIVE_INFINITY;
	    				origin.object3d.position.z = -Number.POSITIVE_INFINITY;
	    				this.returnToPool( index );
	    				this.hasFired.splice(i, 1);
	    			}
	    			else {
	    				origin.zPosCount -= 40;
	    				origin.object3d.translateZ( origin.zPos * dt );

	    				if( this.checkCollision( origin ) ) {
	    					console.log('collision');
	    					origin.zPosCount = -8001;
	    				}
	    			}
	    		}
	    	}
	    },

	    checkCollision: function( origin ) {
	    	var objects = this.server ? this.server.getPlayerObjects() : sceneManager.getTargetableObjectsForLevel('middleground'),
	    		i = objects.length,
	    		obj, mesh, dist;

	    	console.log(i);

	    	while( --i >= 0 ) {
	    		obj = objects[i];

	    		if(obj === origin.player) continue;

	    		mesh = this.server ? obj.middlegroundTarget : objects[i].mesh;

	    		if(!mesh) continue;

	    		dist = origin.object3d.position.distanceToSquared( mesh.position );

	    		// console.log(dist);

	    		if( dist < 1000*1000 ) {
	    			if(this.server) {
	    				obj.moveState.isHit = true;
	    			}
	    			return true;
	    		}
	    	}
	    },

	    getGeometry: function() {
	    	return this.mesh.geometry;
	    }
	});


	attachTo.PrimaryWeaponField = PrimaryWeaponField;

}(window));