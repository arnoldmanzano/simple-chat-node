$(document).ready(function() {

  var socket = io();
  var typing = false;
  var timeout;

  $('form').submit(function(){
    console.log($('#m').val());
    socket.emit('send message', $('#m').val());
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
      socket.emit('typingMessage', 'typing');
      timeout = setTimeout(timeoutFunction, 5000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(timeoutFunction, 5000);
    }
  }

  socket.on('is typing', function() {
    $('#messages').append( "<li class='ind_msg'>someone is typing...");
  });
});
