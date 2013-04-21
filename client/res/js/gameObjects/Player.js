/**
*   @requires Inheritance
*/
(function(attachTo) {


	var Player = GameObject.extend({

	    initialize: function( options ) {

	        // Create a material from this texture & make sure it can be
	        // seen from inside the mesh.
	        this.material = new THREE.MeshPhongMaterial({
	        	color: 0xFFFFFF
	        });

	        // Create the sphere to apply the material to.
	        this.geometry = new THREE.SphereGeometry(10, 16, 16);

	        // Finally, create the mesh using the above objects.
	        this.mesh = new THREE.Mesh(this.geometry, this.material);

	        this.mesh.position.z = -100;

	        // Add the mesh to the renderables Array so it'll be rendered.
	        this.renderables.push(this.mesh);


	        // Create state history store
	        this.history = [];
	    },

	    tick: function( dt ) {

	    },

	    onServerStateReceived: function( state ) {
	    	state = {
	    		velocity: new THREE.Vector3(),
	    		position: new THREE.Vector3()
	    	};
	    }

	});


	attachTo.Player = Player;

}(window));