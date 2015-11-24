/*
app.factory('socket', function(socketFactory){
	//create socket and connect to http://chat.socket.io
	//var myIoSocket = io.connect('http://chat.socket.io');

	var mySocket = io.connect('http://damp-plains-1400.herokuapp.com');

	//var last = io();

	mySocket = socketFactory({
		ioSocket: mySocket
	});

	return mySocket;
})
*/