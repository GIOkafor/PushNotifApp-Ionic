app.factory('socket', function(socketFactory){
	//create socket and connect to http://chat.socket.io
	var myIoSocket = io.connect('http://chat.socket.io');

	mySocket = socketFactory({
		ioSocket: myIoSocket
	});

	return mySocket;
})