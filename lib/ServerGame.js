function ServerGame() {
	// Set default options.
	this.options = {

	};


	// Overwrite default options above with those provided.
	if(options) {
		for(var i in options) {
			if(this.options.hasOwnProperty(i)) {
				this.options[i] = options[i];
			}
		}
	}
}



Game.prototype = {

};