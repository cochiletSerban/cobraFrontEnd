// make socket connection to geroku backend used for poduction ( when pushing to master)
// comment this line for local development ( if you are runnig the back end locally )
var socket = io.connect('https://cobras.herokuapp.com/')

// used for local development , uncommetn for local dev
// var socket = io.connect('http://localhost:3000/')

$(document).ready(() => {
  // event on send
  var msg = $('#message')
  var handle = $('#handle')
  var btn = $('#send')
  var out = $('#output')
  var feed = $('#feedback')

  btn.click(() => {
    socket.emit('chatMsg', {
      message: msg.val(),
      handle: handle.val()
    })
  })

  msg.keydown(() => {
    socket.emit('typing', {
      name: handle.val()
    })
  })

  socket.on('chatMsg', (data) => {
    feed.html('')
    out.append('<p><strong>' + data.handle + ': </strong>' +
    data.message + '</p>')
  })

  socket.on('typing', (data) => {
    feed.html('<p><em>' + data.name + ' is typing a message...</em></p>')
    setTimeout(() => {
      feed.html('')
    }, 1000)
  })
})
