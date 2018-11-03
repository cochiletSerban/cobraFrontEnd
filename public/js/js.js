// make socket connection to geroku backend used for poduction ( when pushing to master)
// comment this line for local development ( if you are runnig the back end locally )
 //var socket = io.connect('https://cobras.herokuapp.com/')

// used for local development , uncommetn for local dev
const socket = io.connect('http://localhost:3000/')

// inits
let selectedCards = [], cardList = [], myId = ''

function renderBoard(socket, domElemets) {
  socket.on('renderBoard', (cardsInHand) => {
    console.log(cardsInHand)
    transformLobbyIntoBoard(domElemets)
  })
}

$(document).ready(() => {
  let domElemets = prepareGame(socket)
  cardSelection(socket, domElemets)
  renderBoard(socket, domElemets)
  disconnect(socket)
})
