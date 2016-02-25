$(document).ready(function() {

  var socket = io();
  var typing = false;
  var timeout;

  var user = prompt("Please enter your name", "user" + Math.floor(Math.random()*100));

  if (user === null || user === '') {
    user = "user" + Math.floor(Math.random()*100);
  }

  $('#m').focus();

  $('form').submit(function(){
    console.log($('#m').val());
    socket.emit('send message', user + ": " + $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('print message', function(msg) {
    console.log(msg);
    $('#messages').append( "<li class='ind_msg'>" + msg);
  });

// socket.emit -> send
// socket.on -> receive

  $('#m').keypress(function() {
    onKeyDownNotEnter();
  });

  function timeoutFunction(){
    typing = false;
    socket.emit('noLongerTypingMessage', 'notTyping');
  }

  function onKeyDownNotEnter(){
    if(typing === false) {
      typing = true;
      socket.emit('typingMessage', user);
      timeout = setTimeout(timeoutFunction, 5000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(timeoutFunction, 5000);
    }
  }

  socket.on('istyping', function(msg) {
    $('#messages').append( "<li class='ind_msg'>" + msg + " is typing...");
  });
});
