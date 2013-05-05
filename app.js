
/**
 * Module dependencies.
 */
var express = require('express'),
	http = require('http'),
	path = require('path'),
	ServerComms = require('./lib/ServerComms'),
	app = express(),
	server,	serverComms;


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
// app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'client')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}


// Routes
app.get('/', function(req, res) {
	res.sendfile( path.resolve( __dirname, 'client', 'index.html' ) );
});

app.get('/*', function(req, res) {
	res.sendfile( path.resolve( __dirname, 'client', req.params[0] ) );
});


// Create the hosting server
server = http.createServer(app);


// Start the game server
serverComms = new ServerComms({
	server: server
});


// Spin up server
server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
