app.controller('ChatController', function (socket) {
	socket.on('connect', function(){
		//add user called nickname
		socket.emit('add user', 'nickname');
	})

	//function called when user hits send button
	self.sendMessage=function(){
		socket.emit('new message', self.message)
		addMessageToList($stateParams.nickname, true, self.message)
		socket.emit('stop typing');
		self.message = "";
	}

	//add message
	function addMessageToList (username, style_type, message) {
		username = $sanitize(username);
		var color = style_type ? getUsernameColor(username) : null;
		self.messages.push({content: $sanitize(message), style:style_type, username:username, color:color});
		$ionicScrollDelegate.scrollBottom();
	}
})