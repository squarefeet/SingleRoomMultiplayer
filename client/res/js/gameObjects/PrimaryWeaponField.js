/**
*   @requires Inheritance
*/
(function(attachTo) {


	var PrimaryWeaponField = GameObject.extend({

	    initialize: function( options ) {
	    	this.hasFired = [];
	    	this.origins = [];

	        this.geometry = new THREE.Geometry();
	        this.material = new THREE.ParticleBasicMaterial({
		        color: 0xFFFFFF,
		        size: 10
		    });

	        this.makeVertices();

	        this.particleSystem = new THREE.ParticleSystem(this.geometry, this.material);
		    this.particleSystem.dynamic = true;
		    this.particleSystem.useQuaternion = true;

		    this.renderables.push( this.particleSystem );
	    },

	    makeVertices: function() {
	    	for(var i = 0; i < 1000; ++i) {
	    		this.geometry.vertices.push(
		        	new THREE.Vector3(
		        		Number.POSITIVE_INFINITY,
		        		Number.POSITIVE_INFINITY,
		        		Number.POSITIVE_INFINITY
		        	)
		        );
		        this.origins.push( this.makeOrigin() );
	    	}
	    },

	    makeOrigin: function() {
	    	return {
	    		quaternion: new THREE.Quaternion(),
	    		position: new THREE.Vector3()
	    	};
	    },

	    setQuaternion: function( origin, quaternion ) {
	    	origin.quaternion = quaternion;
	    },


	    fire: function() {
	    	console.log('yay')
	    	this.hasFired.push(0);
	    	// this.geometry.vertices[0] = new THREE.Vector3();
	    	this.geometry.vertices[0] = sceneManager.middleground.camera.position.clone();
	    	this.geometry.vertices[0].setEulerFromQuaternion( sceneManager.middleground.camera.quaternion );
	    },

	    tick: function() {
	    	this.geometry.verticesNeedUpdate = true;

	    	if(this.hasFired.length) {
	    		this.geometry.vertices[0].z -= 100;
	    	}

	    	// this.particleSystem.quaternion = camera.quaternion.clone();
	    },

	    getNewParticlePosition: function() {

	    },

	    getGeometry: function() {
	    	return this.mesh.geometry;
	    }
	});


	attachTo.PrimaryWeaponField = PrimaryWeaponField;

}(window));