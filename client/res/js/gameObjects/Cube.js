/**
*   @requires Inheritance
*/
(function(attachTo) {


	var Cube = GameObject.extend({

	    initialize: function( options ) {

	        // Create a material from this texture & make sure it can be
	        // seen from inside the mesh.
	        this.material = new THREE.MeshPhongMaterial({
	        	wireframe: true
	        });
	        this.material.side = THREE.DoubleSide;

	        // Create the sphere to apply the material to.
	        this.geometry = new THREE.CubeGeometry(100, 100, 100, 1, 1, 1);

	        // Finally, create the mesh using the above objects.
	        this.mesh = new THREE.Mesh(this.geometry, this.material);

	     //    this.emitter = new Emitter({
		    //     position: new THREE.Vector3(),
		    //     velocity: new THREE.Vector3(0, 0, 50),
		    //     acceleration: new THREE.Vector3(0, 0, 50),
		    //     randomDrift: new THREE.Vector3(50, 50, 1000),
		    //     minSize: 40,
		    //     maxSize: 60,
		    //     duration: 200,
		    //     lifetime: [2, 2],
		    //     count: 750,
		    //     colors: [0x509efe, 0x50d7fe, 0xc97474, 0x009cff, 0x245490, 0x3186f0],
		    //     hasLight: true
		    // });

		    // this.emitter.start();

	        // this.mesh.add(this.emitter.object);

	        // Add the mesh to the renderables Array so it'll be rendered.
	        this.renderables.push(this.mesh);

	        this.targetable = 1;
	    },

	    tick: function() {

	    	// this.emitter.tick();

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