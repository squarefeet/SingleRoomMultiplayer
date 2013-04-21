var sio = require('socket.io'),
	noop = function() {},
	playerNames = {};


function stateProcessor(state) {
	return state;
}


function ServerComms( options ) {

	// Set default options. Note that some of these are required
	// to be truthy values. These are marked.
	this.options = {
		server: null, // Required
		logLevel: 0,
		maxPlayers: 16,
		roomName: 'game',
		stateProcessor: stateProcessor,
	};


	// Overwrite default options above with those provided.
	if(options) {
		for(var i in options) {
			if(this.options.hasOwnProperty(i)) {
				this.options[i] = options[i];
			}
		}
	}


	// Setup placeholders
	this.socket = null;
	this.playerName = null;


	// Initiate a socket.io connection using the app/server we passed in.
	this.io = sio.listen( this.options.server );

	// Configure Socket.io
	this.io.set('log level', this.options.logLevel);

	// When the socket has connected, let the client know, and start
	// binding other events since we now have a single socket session
	// to play with.
	this.io.sockets.on('connection', this.onConnect.bind(this));
}


ServerComms.prototype = {

	// Internal functions.
	// All internal functions are prefixed with _
	_bindEvents: function() {
		this.socket.on('ping', this.onPingReceived.bind(this));
		this.socket.on('enterName', this.onEnterName.bind(this));
		this.socket.on('getPlayerList', this.onGetPlayerList.bind(this));
		this.socket.on('chatMessage', this.onChatMessageReceived.bind(this));
		this.socket.on('joinRoom', this.onJoinRoom.bind(this));
		this.socket.on('state', this.onPacketReceived.bind(this));
		this.socket.on('disconnect', this.onDisconnect.bind(this));
	},

	_compressPacket: function( packet ) {
		// ...
		return packet;
	},

	_decompressPacket: function( packet ) {
		// ...
		return packet;
	},

	_emitToAll: function( message, data ) {
		this.io.sockets.in(this.options.roomName).emit(message, data);
	},



	// Outbound events
	sendState: function( state ) {
		var packet = this._compressPacket(state);
		this._emitToAll('state', packet);
	},



	// Inbound events
	onConnect: function( socket ) {
		// Store the socket for this session.
		this.socket = socket;

		// Let the client know that we've successfully connected
		this.socket.emit('connected');

		// Bind initial events (such as joinGame, disconnect, etc.)
		this._bindEvents();
	},


	onEnterName: function( name ) {
		var nameExists = false;

		for(var i in playerNames) {
			if(i === name) {
				nameExists = true;
			}
		}

		if(nameExists) {
			this.socket.emit('playerNameExists', name);
		}

		else {
			// Store the player name along with
			// base score and health values.
			this.playerName = playerNames[ name ] = {
				score: 0,
				health: 100,
				name: name
			};

			console.log(name, 'joined');

			// Send message to client
			this.socket.emit('playerNameAccepted', this.playerName);
			this._emitToAll('playerJoined', this.playerName);
		}
	},


	onGetPlayerList: function() {
		var list = [];

		for(var i in playerNames) {
			list.push(i);
		}

		this.socket.emit('playerList', list);
	},


	onJoinRoom: function() {
		var clients = this.io.sockets.clients(this.options.roomName);

		if(clients.length >= this.options.maxPlayers) {
			this.socket.emit('roomFull');
		}
		else {
			this.socket.join(this.options.roomName);
			this.socket.emit('joinedRoom');
		}
	},


	onChatMessageReceived: function( data ) {
		this._emitToAll('chatMessage', data);
	},

	onPingReceived: function() {
		this.socket.emit('ping');
	},

	onPacketReceived: function( packet ) {
		var state = this._decompressPacket(packet);

		// TEMPORARY
		// Process the packet and send straight back
		this.sendState( this.options.stateProcessor( state ) );
	},

	onDisconnect: function() {
		if(!this.playerName) return;

		console.log(this.playerName, 'disconnected');
		// Leave the room
		this.socket.leave(this.options.roomName);

		if( playerNames[this.playerName.name] ) {
			delete playerNames[this.playerName.name];
			this._emitToAll('onPlayerDisconnected', this.playerName);
		}
	}
};



module.exports = ServerComms;