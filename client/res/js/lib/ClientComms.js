var noop = function() {};

function ClientComms( options ) {

	// Set default options. Note that some of these are required
	// to be truthy values. These are marked.
	this.options = {
		hostAddress: null,
		onPacketReceived: noop,
		roomName: 'game',

		onConnect: noop,
		onRoomFull: noop,
		onJoinedRoom: noop,
		onPacketReceived: noop,
		onChatMessageReceived: noop,
		onPlayerNameExists: noop,
		onPlayerNameAccepted: noop,
		onPlayerListReceived: noop
	};


	// Overwrite default options above with those provided.
	if(options) {
		for(var i in options) {
			if(this.options.hasOwnProperty(i)) {
				this.options[i] = options[i];
			}
		}
	}

	this.playerName = null;

	// Create as close to a websocket connection as we can
	this.socket = io.connect( this.options.hostAddress );

	// Bind initial events (such as connect, disconnect, etc.)
	this._bindEvents();
}


ClientComms.prototype = {

	// Internal events
	// These are prefixed with _
	_bindEvents: function() {
		this.socket.on('connected', this.onConnect.bind(this));
		this.socket.on('roomFull', this.onRoomFull.bind(this));
		this.socket.on('joinedRoom', this.onJoinedRoom.bind(this));
		this.socket.on('playerNameExists', this.onPlayerNameExists.bind(this));
		this.socket.on('playerNameAccepted', this.onPlayerNameAccepted.bind(this));
		this.socket.on('chatMessage', this.onChatMessageReceived.bind(this));
		this.socket.on('state', this.onStateReceive.bind(this));
	},

	_compressPacket: function( packet ) {
		return packet;
	},

	_decompressPacket: function( packet ) {
		return packet;
	},



	// Outbound events
	joinRoom: function() {
		this.socket.emit('joinRoom');
	},

	enterName: function( name ) {
		this.socket.emit('enterName', name);
	},

	sendState: function( state ) {
		var packet = this._compressPacket( state );
		this.socket.emit( 'state', packet );
	},

	sendChatMessage: function(message) {
		// TODO: Ensure message exists and is valid
		this.socket.emit( 'chatMessage', message );
	},

	getPlayerList: function() {
		var that = this;

		this.socket.emit('getPlayerList');
		this.socket.once('playerList', function( list ) {
			console.log('playerList', list);
			that.options.onPlayerListReceived(list);
		});
	},


	// Inbound events
	onConnect: function() {
		console.log('Socket has connected');
		this.options.onConnect();
	},

	onRoomFull: function() {
		console.log('roomFull');
		this.options.onRoomFull();
	},

	onJoinedRoom: function() {
		console.log('Successfully joined room');
		this.options.onJoinedRoom();
	},

	onPlayerNameExists: function( name ) {
		console.log('player name exists', name);
		this.options.onPlayerNameExists( name );
	},

	onPlayerNameAccepted: function( name ) {
		console.log('player name accepted', name);
		this.options.onPlayerNameAccepted( name );
	},

	onChatMessageReceived: function( message ) {
		console.log('chat message received', message);
		this.options.onChatMessageReceived();
	},

	onStateReceive: function( packet ) {
		console.log('received packet', packet);
		var state = this._decompressPacket( packet );
		this.options.onPacketReceived( state );
	},
};