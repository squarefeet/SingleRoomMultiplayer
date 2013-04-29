


/**
*   @requires Inheritance
*/
(function(attachTo) {


	var Asteroid = GameObject.extend({

	    initialize: function( options ) {

	    	this.options = {
	    		weightX: Math.random(),
	    		weightY: Math.random(),
	    		weightZ: Math.random(),
	    		variation: ((Math.random() * 7 | 0) + 1),
	    		spread: 8096
	    	};

	    	if(options) {
	    		for(var i in options) {
	    			this.options[i] = options[i];
	    		}
	    	}

	    	this.options.halfSpread = this.options.spread/2;

	        this.loadCollada(
	        	'res/models/asteroid' + this.options.variation + '.dae',
	        	this.onModelLoaded.bind(this)
	        );
	    },

		onModelLoaded: function( dae, skin ) {
	        this.mesh = dae;

	    	this.mesh.position.x = (Math.random() * this.options.spread) - this.options.halfSpread;
	    	this.mesh.position.y = (Math.random() * this.options.spread) - this.options.halfSpread;
	    	this.mesh.position.z = (Math.random() * this.options.spread) - this.options.halfSpread;

	    	this.renderables.push( this.mesh );
	    	sceneManager.addObjectTo( 'middleground', this );
		},

		tick: function( dt ) {
			if(this.mesh) {
				this.mesh.rotation.x += this.options.weightX * dt;
				this.mesh.rotation.y += this.options.weightY * dt;
				this.mesh.rotation.z += this.options.weightZ * dt;
			}
		}

	});


	attachTo.Asteroid = Asteroid;

}(window));