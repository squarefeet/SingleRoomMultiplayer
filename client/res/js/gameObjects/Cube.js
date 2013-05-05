/**
*   @requires Inheritance
*/
(function(attachTo) {


	var Cube = GameObject.extend({

	    initialize: function( options ) {

	        // Create a material from this texture & make sure it can be
	        // seen from inside the mesh.
	        this.material = new THREE.MeshPhongMaterial();
	        this.material.side = THREE.DoubleSide;

	        // Create the sphere to apply the material to.
	        this.geometry = new THREE.CubeGeometry(100, 100, 100, 1, 1, 1);

	        // Finally, create the mesh using the above objects.
	        this.mesh = new THREE.Mesh(this.geometry, this.material);

	        // Add the mesh to the renderables Array so it'll be rendered.
	        this.renderables.push(this.mesh);

	        this.targetable = 1;

	    },

	    tick: function() {
	    	if(!this.isTargeted) return;

	    	var quaternion = sceneManager.middleground.camera.quaternion;

	    	this.boundingSphere.mesh.position = this.mesh.position;
	    	this.boundingSphere.mesh.quaternion = quaternion;
	    },

	    getGeometry: function() {
	    	return this.mesh.geometry;
	    }
	});


	attachTo.Cube = Cube;

}(window));