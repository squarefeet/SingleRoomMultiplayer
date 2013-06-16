/**
*   @requires Inheritance
*/
(function(attachTo) {


	var PrimaryWeapon = GameObject.extend({

	    initialize: function( options ) {
	    	this.hasFired = [];

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

	        this.particleSystem = new THREE.ParticleSystem(this.geometry, this.material);
		    this.particleSystem.dynamic = true;
		    this.particleSystem.useQuaternion = true;

		    this.renderables.push( this.particleSystem );
	    },

	    fire: function() {
	    	console.log('yay')
	    	this.hasFired.push(0);
	    	this.geometry.vertices[0] = new THREE.Vector3();
	    },

	    tick: function() {
	    	this.geometry.verticesNeedUpdate = true;

	    	if(this.hasFired.length) {
	    		this.geometry.vertices[0].z -= 100;
	    	}

	    	var camera = sceneManager.middleground.camera;

	    	// this.particleSystem.quaternion = camera.quaternion.clone();
	    },

	    getGeometry: function() {
	    	return this.mesh.geometry;
	    }
	});


	attachTo.PrimaryWeapon = PrimaryWeapon;

}(window));