var noop = function(){}

function Physics( options ) {

	this.options = {
		timestep: 15,
		onTick: noop
	};

	this.currentTime = null;
	this.dt = null;

	// Bind scope to the step function
	this.step = this.step.bind(this);
}

Physics.prototype = {

	registerObject: function() {

	},

	start: function() {
		setInterval(this.step, this.options.timestep);
	},

	step: function() {

	}
};