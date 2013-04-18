function onSocketConnected() {
	comms.joinRoom();
}


var comms = new ClientComms({
	onConnect: onSocketConnected
});