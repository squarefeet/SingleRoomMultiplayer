require('../client/res/js/lib/THREE-r58.min.js');
require('../client/res/js/framework/Inheritance.js');
require('../client/res/js/framework/GameObject.js');
require('../client/res/js/gameObjects/Player.js');


function ServerGame( options ) {
	// Set default options.
	this.options = {
		physicsTickRate: 1000/60,
		updateRate: 40,
		comms: null
	};


	// Overwrite default options above with those provided.
	if(options) {
		for(var i in options) {
			if(this.options.hasOwnProperty(i)) {
				this.options[i] = options[i];
			}
		}
	}


	// Bind scope
	this.tick = this.tick.bind(this);
	this.update = this.update.bind(this);

	this.players = {};
}



ServerGame.prototype = {
	addPlayer: function( playerDetails ) {
		this.players[playerDetails.name] = playerDetails;
		this.players[playerDetails.name].player = new Player({
			isServer: true
		});


		console.log('Making server player for', playerDetails.name);
	},


	start: function() {
		this.physicsTimer = setInterval( this.tick, this.options.physicsTickRate );
		this.updateTimer = setInterval( this.update, this.options.updateRate );
	},

	onStateReceived: function( state ) {
		if(!this.players[ state.name ]) {
			console.error('No player on server with name', state.name);
			return;
		}

		// this.moveState = {
		// 	    up: 0, down: 0,
		// 	    left: 0, right: 0,
		// 	    forward: 0, back: 0,
		// 	    pitchUp: 0, pitchDown: 0,
		// 	    yawLeft: 0, yawRight: 0,
		// 	    rollLeft: 0, rollRight: 0
		// 	};

		this.players[ state.name ].player.moveState = state.moveState;

		this.players[ state.name ].player.updateMovementVector();
		this.players[ state.name ].player.updateRotationVector();
	},

	tick: function() {
		for( var i in this.players ) {
			this.players[i].player.updateMatrix( this.options.physicsTickRate );
		}
	},

	update: function() {
		for( var i in this.players ) {
			this.options.comms._emitToAll( 'state', {
				name: this.players[i].name,
				pos: this.players[i].player.target.position,
				quaternion: this.players[i].player.target.quaternion
			} );
		}
	}
};


module.exports = ServerGame;