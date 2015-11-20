//setup basic server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function  () {
	console.log('Server listening on port %d', port);
});

//routing 
app.use(express.static(__dirname + '/www'));

//chatroom stuff goes here
var usernames = {};
var numUsers = 0;

io.on('connection', function(socket){
	var addedUser = false;

	//when the client emits 'new message', this listens and executes
	socket.on('new message', function (data) {
		// we tell the client to execute 'new message' 
		//could be changed to send to a specific user
		socket.broadcast.emit('new message', {
			username: socket.username,
			message: data
		});
	});

	//when the client emits 'add user', this listens and executes
	socket.on('add user', function (username) {
		// we store the username in the socket session for this client
		socket.username = username;
		//add clients name to global list
		usernames[username] = username;
		++numUsers;
		addedUser = true;
		socket.emit('login', {
			numUsers: numUsers
		});
	});

	//when client emits typing, broadcast it to others
	//broadcast could be changed to send to specific user
	socket.on('typing', function(){
		socket.broadcast.emit('typing', {
			username: socket.username
		});
	});

	//when the client stops typing
	socket.on('stop typing', function(){
		socket.broadcast.emit('stop typing', {
			username: socket.username
		});
	});

	//when the user disconnects do this 
	socket.on('disconnect', function () {
		// remove user name from global usernames list
		if(addedUser){
			delete usernames[socket.username];
			--numUsers;

			//tell everyone that this client has left
			socket.broadcast.emit('user left', {
				username: socket.username, 
				numUsers: numUsers
			});
		}
	});
});