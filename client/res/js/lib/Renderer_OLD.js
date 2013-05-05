var noop = function() {};

function State(x) {
	this.x = 0;
	this.v = 0;
}

State.prototype.clone = function() {
	var s = new State();
	s.x = this.x;
	s.v = this.v;

	return s;
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

	this.currentState = new State();
	this.previousState = null;

	this.tick = this.tick.bind(this);

	this.canvas = document.createElement('canvas');
	this.canvas.width = 480;
	this.canvas.height = 320;
	this.ctx = this.canvas.getContext('2d');

	document.body.appendChild(this.canvas);
}


Renderer.prototype = {


	tick: function() {

		requestAnimationFrame(this.tick);

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
			this.previousState = this.currentState.clone();
			this.integrate( this.currentState, this.t, dt );
			this.t += dt;
			this.accumulator -= dt;
		}

		alpha = this.accumulator / dt;

		this.updateState( alpha );

		this.render( this.currentState );
	},

	evaluate: function( initial, t, dt, derivative ) {
		if(typeof dt === 'undefined' && typeof derivative === 'undefined') {
			derivative = new Derivative();
			derivative.dx = initial.v;
			derivative.dv = 0; // FIXME: acceleration and whatnot goes here
			return derivative;
		}
		else {
			initial.x += derivative.dx * dt;
			initial.v += derivative.dv * dt;
			derivative.dx = initial.v;
			derivative.dv = 0.0000001; // FIXME: acceleration and whatnot goes here
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
		this.currentState.x + this.previousState.x * (1 - alpha);
		this.currentState.v + this.previousState.v * (1 - alpha);
		// currentState*alpha + previousState * ( 1.0 - alpha );
	},


	render: function( state ) {
		// Render state
		this.ctx.fillRect(state.x, 100, 5, 5);
	},


	start: function() {
		this.tick();
	},

	stop: function() {

	}
};