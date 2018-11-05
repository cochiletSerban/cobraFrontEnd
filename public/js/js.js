// make socket connection to geroku backend used for poduction ( when pushing to master)
// comment this line for local development ( if you are runnig the back end locally )
var socket = io.connect('https://cobras.herokuapp.com/')

// used for local development , uncommetn for local dev
//const socket = io.connect('http://localhost:3000/')

// inits
let selectedCards = [], cardList = [], myId = ''
let initScor = 0
let board = {
  first: [],
  mid: [],
  last: []
}

function populateBoard(socket, domElemets) {
  socket.emit('getBoard')
  // socket.on('populateBoard', (players) => {
  //   console.log('yolo');
  //   console.log(players[myId].cardsInHand)
  //   let hand = domElemets.hand
  //   //removeOldElemtsOf(hand)
  //   //appendElmentsTo(hand, makeBoardCards(players[myId].cardsInHand))
  // })
}

$(document).ready(() => {
  let domElemets = prepareGame(socket)
  cardSelection(socket, domElemets)
  renderBoard(socket, domElemets)
 // populateBoard(socket, domElemets)
  socket.on('boardChanged', (stuff) => {
    let scor = stuff.initScor
    let board = stuff.board
    domElemets.pl2Scor.text(scor)
    console.log(scor);
    
    if(board.first.length > 0) {
      removeOldElemtsOf($("#topPart > #firstt"))
      appendElmentsTo($("#topPart > #firstt"),makeBoardCards(board.first))
    }
    if(board.mid.length > 0) {
      removeOldElemtsOf($("#topPart > #midt"))
      appendElmentsTo($("#topPart > #midt"),makeBoardCards(board.mid))
    }
    if(board.last.length > 0) {
      removeOldElemtsOf($("#topPart > #lastt"))
      appendElmentsTo($("#topPart > #lastt"),makeBoardCards(board.last))
    }

  })
  socket.on('endRound',() => {
    $("#myScor").text(0)
    $("#pl2Scor").text(0)
    $("#bottomPart > .row").empty()
    $("#topPart > .row").empty()
    board.first = []
    board.mid = []
    board.last = []
  })

  socket.on('won' ,() => {
alert('you won this  round')
  })
  disconnect(socket)
})
