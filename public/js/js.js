// make socket connection to geroku backend used for poduction ( when pushing to master)
// comment this line for local development ( if you are runnig the back end locally )
var socket = io.connect('https://cobras.herokuapp.com/')

// used for local development , uncommetn for local dev
//var socket = io.connect('http://localhost:3000/')

function getDomElements () {
  let elements = {
    welcomeText: $('#lobby > div > p'),
    showCardSelectorButton: $('#showCardSelector'),
    cardSelector: $('#cardSelector'),
    lobby: $('#lobby')
  }
  return elements
}

function hideElement (element) {
  element.hide()
}

function showElement (element) {
  element.show()
}

function moveToCardSelection (domElemets) {
  showElement(domElemets.showCardSelectorButton)
  domElemets.showCardSelectorButton.click(() => {
    hideElement(domElemets.lobby)
    showElement(domElemets.cardSelector)
  })
}

$(document).ready(() => {
  let domElemets = getDomElements()
  socket.emit('playerHasJoindGame')
  socket.on('lobbyFull', () => {
    domElemets.welcomeText.text('All the players are now in the room')
    moveToCardSelection(domElemets)
  })
})
