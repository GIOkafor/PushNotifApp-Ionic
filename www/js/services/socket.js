
app.factory('socket', function(socketFactory){
	//create socket and connect to http://chat.socket.io
	//var myIoSocket = io.connect('http://chat.socket.io');

	var mySocket = io.connect('http://lit-cove-5088.herokuapp.com');

	//var last = io();

	mySocket = socketFactory({
		ioSocket: mySocket
	});

	return mySocket;
})
