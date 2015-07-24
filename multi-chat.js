window.onload = function(){

//grab room from URL
var room = location.search && location.search.split('?')[1];



//create webRTC connection

var webrtc = new SimpleWebRTC({
	// the id/element dom element that will hold "our" video
	localVideoEl : 'localVideo',
	  // the id/element dom element that will hold remote videos
	  remoteVideosEl : 'remoteVideos',
	  // immediately ask for camera access
	  autoRequestMedia: true,
	  log: true
	});

//when everything is ready and have a room ULR, join call
webrtc.on ('readyToCall', function(){
	  // you can name it anything
	  if(room) webrtc.joinRoom(room);
	})


//set the room name

function setRoom(name){
	console.log('setting up room');
	$('form').remove();
	$('h1').text("Welcome to room:" + name);
	$('#subTitle').text("Share this link with anyone you want to join");
	$('#roomLink').text(location.href);
	$('body').addClass('active');
}

//if there's a room, expose it in UI
if (room){
	console.log('Room exists, proceeding to room setup');
	setRoom(room);
}else{
	$('form').submit(function(){
		console.log('form submittied ');
		var val = $('#sessionInput').val().toLowerCase().replace(/\s/g,'-');
		console.log(val);
		webrtc.createRoom(val, function(err,name){
			var newUrl = location.pathname +'?'+name;
			if(!err){
				history.replaceState({foo:'bar'}, null, newUrl);
				setRoom(name);
			}
		});
		return false;
	})
}
}