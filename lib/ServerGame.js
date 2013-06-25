require('../client/res/js/lib/THREE-r58.min.js');
require('../client/res/js/framework/Inheritance.js');
require('../client/res/js/framework/GameObject.js');
require('../client/res/js/gameObjects/Player.js');
require('../client/res/js/gameObjects/PrimaryWeaponField.js');


function ServerGame( options ) {
	// Set default options.
	this.options = {
		physicsTickRate: 15,
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

	this.clock = new THREE.Clock();
	this.primaryWeapon = new PrimaryWeaponField({
		server: this
	});

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

	getPlayerObjects: function() {
		var objs = [];

		for(var i in this.players) {
			objs.push(this.players[i].player);
		}

		return objs;
	},

	start: function() {
		this.physicsTimer = setInterval( this.tick, this.options.physicsTickRate );
		this.updateTimer = setInterval( this.update, this.options.updateRate );
	},

	onStateReceived: function( state ) {
		var player = this.players[ state.name ],
			playerObj = player.player;

		if( !player ) {
			console.error('No player on server with name', state.name);
			return;
		}

		playerObj.moveState = state.moveState;
		playerObj.updateMovementVector();
		playerObj.updateRotationVector();

		if(state.moveState.isFiring) {
			this.primaryWeapon.burstFire(
				playerObj,
				state.name,
				playerObj.middlegroundTarget.position,
				playerObj.middlegroundTarget.quaternion
			);
		}
		else {
			this.primaryWeapon.stopFiring( state.name );
		}
	},

	tick: function() {
		var delta = this.clock.getDelta(),
			players = this.players,
			player;

		for( var i in players ) {
			player = this.players[i];
			player.player.updateMatrix( delta );
			// this.detectCollisions( player, players );
		}

		this.primaryWeapon.tick( delta );
	},

	detectCollisions: function( player, players ) {
		for( var i in players ) {
			if(players[i] === player) continue;

			if( players[i].player.middlegroundTarget.position.distanceToSquared( player.player.middlegroundTarget.position ) < 300 * 300 ) {
				players[i].player.moveState.hasCollided = true;
				player.player.moveState.hasCollided = true;
				this.resolveCollision(players[i], player);
				break;
			}
		}
	},

	resolveCollision: function( a, b ) {
		var aPos = a.player.middlegroundTarget.position,
			bPos = b.player.middlegroundTarget.position,
			angle = aPos.angleTo(bPos);

		console.log( angle );
	},

	update: function() {
		for( var i in this.players ) {
			this.options.comms._emitToAll( 'state', {
				name: this.players[i].name,
				pos: this.players[i].player.middlegroundTarget.position,
				quaternion: this.players[i].player.middlegroundTarget.quaternion,
				isFiring: this.players[i].player.moveState.isFiring,
				isHit: this.players[i].player.moveState.isHit,
				hasCollided: this.players[i].player.moveState.hasCollided
			} );

			this.players[i].player.moveState.isHit = false;
			this.players[i].player.moveState.hasCollided = false;
		}
	}
};


module.exports = ServerGame;