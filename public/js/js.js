// make socket connection to geroku backend used for poduction ( when pushing to master)
// comment this line for local development ( if you are runnig the back end locally )
// var socket = io.connect('https://cobras.herokuapp.com/')

// used for local development , uncommetn for local dev
const socket = io.connect('http://localhost:3000/')

function appendElmentsTo (appendTo, listOfElements) {
  for (let elem of listOfElements) {
    $(appendTo).append(elem)
  }
}

function makeCards (cardList) {
  let cards = []
  for (let card of cardList) {
    cards.push(`<div class="col-xs-12 col-md-3 bg">${card.name}</div>`)
  }
  return cards
}

function renderCardSelector (domElemets, cardList) {
  let appendTo = domElemets.cardSelector.cardSelector.cards
  appendElmentsTo(appendTo, makeCards(cardList))
}

function getDomElements () {
  let elements = {
    welcomeText: $('#lobby > p'),
    showCardSelectorButton: $('#showCardSelector'),
    cardSelector: {
      cardSelector: $('#cardSelector'),
      cards: $('#cardSelector > .row')
    },
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
    showElement(domElemets.cardSelector.cardSelector)
  })
}

$(document).ready(() => {
  let domElemets = getDomElements()
  socket.on('connect', () => {
    console.log('connected')
  })
  socket.on('disconnect', () => {
    alert('to many players')
  })

  socket.on('lobbyFull', (cards) => {
    renderCardSelector(domElemets, cards)
    domElemets.welcomeText.text('All the players are now in the room')
    moveToCardSelection(domElemets)
  })
})
