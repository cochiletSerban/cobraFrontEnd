// make socket connection to geroku backend used for poduction ( when pushing to master)
// comment this line for local development ( if you are runnig the back end locally )
 var socket = io.connect('https://cobras.herokuapp.com/')

// used for local development , uncommetn for local dev
//const socket = io.connect('http://localhost:3000/')
var selectedCards = []
var cardList = []

function appendElmentsTo (appendTo, listOfElements) {
  for (let elem of listOfElements) {
    $(appendTo).append(elem)
  }
}

function cardSelected (card) {
  selectedCards.push(cardList[$(card).attr('alt')])
  $(card).css({ 'background-color': 'rgba(0,0,0,0.6)', 'border': '2px solid greenyellow', 'box-shadow': '0px 0px 18px  greenyellow' })
  console.log(selectedCards)
}

function makeCard (cardInfo, id) {
  return `<div class="col-xs-6 col-md-3 col-lg-2 bg" >
              <div class="card" alt="${id}" onclick="cardSelected(this)">
                <h2>${cardInfo.name}</h2>
                <hr>
                <img width="140" src="${cardInfo.picture}"/>
                <hr>
                <br>
                <div class="row">
                  <div class="col-xs-3">${cardInfo.atack}</div>
                  <div class="col-xs-3">country: ${cardInfo.nationality}</div>
                  <div class="col-xs-3">club: ${cardInfo.team}</div>
                  <div class="col-xs-3">${cardInfo.defence}</div>
                </div>
              </div>
          </div>`
}

function makeCards () {
  let cards = []
  let id = 0
  for (let card of cardList) {
    cards.push(makeCard(card, id))
    id++
  }
  return cards
}

function renderCardSelector (domElemets) {
  let appendTo = domElemets.cardSelector.cards
  console.log(appendTo)
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
    lobby: $('#lobby'),
    spinner: $('#spinner')
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
    cardList = cards
    renderCardSelector(domElemets)
    hideElement(domElemets.spinner)
    domElemets.welcomeText.text('All the players are now in the room')
    moveToCardSelection(domElemets)
  })
})
