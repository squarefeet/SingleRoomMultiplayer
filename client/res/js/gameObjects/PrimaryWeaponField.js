/**
*   @requires Inheritance
*/
(function(attachTo) {


	var PrimaryWeaponField = GameObject.extend({

	    initialize: function( options ) {
	    	this.hasFired = [];
	    	this.origins = [];
	    	this.pool = [];
	    	this.intervals = {};

	        this.geometry = new THREE.Geometry();
	        this.material = new THREE.ParticleBasicMaterial({
		        color: 0xFFFFFF,
		        size: 10
		    });

	        this.geometry.vertices.push(
	        	new THREE.Vector3(
	        		Number.POSITIVE_INFINITY,
	        		Number.POSITIVE_INFINITY,
	        		Number.POSITIVE_INFINITY
	        	)
	        );

	        this.createVertices();

	        this.particleSystem = new THREE.ParticleSystem(this.geometry, this.material);
		    this.particleSystem.dynamic = true;
		    this.particleSystem.useQuaternion = true;

		    this.fire = this.fire.bind(this);

		    this.renderables.push( this.particleSystem );
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
	    		zPosCount: 0
	    	};
	    },

	    fire: function( playerName, position, quaternion ) {
	    	var index = this.getFromPool(),
	    		origin = this.origins[ index ],
	    		obj3d = origin.object3d;

	    	obj3d.position = position.clone();
	    	obj3d.quaternion = quaternion.clone();
	    	obj3d.translateZ( -50 );
	    	origin.zPos = -40; // Bullet speed
	    	origin.player = playerName;
	    	this.geometry.vertices[index] = obj3d.position;

	    	this.hasFired.push(index);
	    },

	    burstFire: function( playerName, position, quaternion ) {
	    	if( this.intervals[ playerName ] ) return;

	    	var that = this;

	    	this.fire( playerName, position, quaternion );

	    	this.intervals[ playerName ] = setInterval( function() {
	    		that.fire( playerName, position, quaternion );
	    	}, 100 );
	    },

	    stopFiring: function( playerName ) {
	    	clearInterval( this.intervals[ playerName ] );
	    	this.intervals[ playerName ] = null;
	    },

	    tick: function() {
	    	this.geometry.verticesNeedUpdate = true;

	    	if(this.hasFired.length) {
	    		var i = this.hasFired.length;

	    		while(--i >= 0) {
	    			var index = this.hasFired[i],
	    				origin = this.origins[ index ];

	    			if( origin.zPosCount < -500 ) {
	    				origin.object3d.position.x = -Number.POSITIVE_INFINITY;
	    				origin.object3d.position.y = -Number.POSITIVE_INFINITY;
	    				origin.object3d.position.z = -Number.POSITIVE_INFINITY;
	    				this.returnToPool( index );
	    				this.hasFired.splice(i, 1);
	    			}
	    			else {
	    				origin.zPosCount -= 40;
	    				origin.object3d.translateZ( origin.zPos );
	    			}
	    		}
	    	}

	    },

	    getGeometry: function() {
	    	return this.mesh.geometry;
	    }
	});


	attachTo.PrimaryWeaponField = PrimaryWeaponField;

}(window));