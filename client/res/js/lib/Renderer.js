var noop = function() {};

function State(x) {
	this.x = 0;
	this.v = 0;
}

function Derivative() {
	this.dx = 0;
	this.dv = 0;
}


function Renderer( options ) {

	this.options = {
		physicsTickRate: 15,
		serverTickRate: 50,
		integrator: noop,
		maxFrameTime: 100
	};

	this.currentTime = Date.now();
	this.lastTime = 0;
	this.accumulator = 0.0;
	this.t = 0;

	this.currentState = {};
	this.previousState = null;

	this.tick = this.tick.bind(this);
}


Renderer.prototype = {


	tick: function() {
		var newTime = Date.now(),
			frameTime = newTime - this.currentTime,
			dt = this.options.physicsTickRate,
			alpha;

		// Stop the spiral of death!
		if( frameTime > this.options.maxFrameTime ) {
			frameTime = this.options.maxFrameTime;
		}

		this.currentTime = newTime;
		this.accumulator += frameTime;

		while( this.accumulator >= dt ) {
			this.previousState = this.currentState;
			integrate( this.currentState, this.t, dt );
			this.t += dt;
			this.accumulator -= dt;
		}

		alpha = accumulator / dt;

		this.updateState( alpha );

		this.render( state );
	},

	evaluate: function( initial, t, dt, derivative ) {
		if(typeof dt === 'undefined' && typeof derivative === 'undefined') {
			derivative.dx = initial.v;
			derivative.dv += 1; // FIXME: acceleration and whatnot goes here
			return derivative;
		}
		else {
			state.x += d.dx * dt;
			state.v += d.dv * dt;
			derivative.dx = state.v;
			derivative.dv += 1; // FIXME: acceleration and whatnot goes here
			return derivative;
		}
	},


	// RK4 Integration
	integrate: function( state, t, dt ) {
		// Integrate state
		var a = this.evaluate( state, t ),
			b = this.evaluate( state, t, dt * 0.5, a),
			c = this.evaluate( state, t, dt * 0.5, b),
			d = this.evaluate( state, t, dt, c),

			dxdt = 1 / 6 * (a.dx + 2 * (b.dx + c.dx) + d.dx),
			dvdt = 1 / 6 * (a.dv + 2 * (b.dv + c.dv) + d.dv);

		state.x = state.x + dxdt * dt;
		state.v = state.v + dvdt * dt;
	},


	updateState: function( alpha ) {
		// currentState*alpha + previousState * ( 1.0 - alpha );
	},


	render: function( state ) {
		// Render state
	},


	start: function() {

	},

	stop: function() {

	}
};