$(document).ready(function() {

  var socket = io();

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
});
