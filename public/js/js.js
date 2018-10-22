// make socket connection to geroku backend used for poduction ( when pushing to master)
// comment this line for local development ( if you are runnig the back end locally )
var socket = io.connect('https://cobras.herokuapp.com/')

// used for local development , uncommetn for local dev
//var socket = io.connect('http://localhost:3000/')

$(document).ready(() => {
  let welcomeText = $('#lobby-container > p')
  socket.emit('playerHasJoindGame', { pula: 'mare' })

  socket.on('lobbyFull', (data) => {
    console.log('yes')
    welcomeText.text('player 2 has joined the lobby')
  })
})
