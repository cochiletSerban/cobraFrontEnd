// make socket connection to geroku backend used for poduction ( when pushing to master)
// comment this line for local development ( if you are runnig the back end locally )
 var socket = io.connect('https://cobras.herokuapp.com/')

// used for local development , uncommetn for local dev
//const socket = io.connect('http://localhost:3000/')
var selectedCards = []
var cardList = []
let myId = ''
function appendElmentsTo (appendTo, listOfElements) {
  for (let elem of listOfElements) {
    $(appendTo).append(elem)
  }
}

function makeCard (cardInfo, id) {
  return `<div class="col-xs-6 col-md-3 col-lg-2 bg">
            <div class="card" alt="${id}">
                <h2 class="customfont">${cardInfo.name}</h2>
                <img width="140" height="140" src="${cardInfo.picture}" />
                <hr>
                <br>
                <div class="row">
                    <div class="col-xs-6">
                        <h3><img width="52" height="31" src="${cardInfo.nationality}" /></h3>
                    </div>
                    <div class="col-xs-6">
                        <h3><img width="31" height="31" src="${cardInfo.team}" /></h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        <div class="atack">
                            <h2 class="bold">A ${cardInfo.atack}</h2>
                        </div>
                    </div>
                    <div class="col-xs-6">
                        <div class="defence">
                            <h2 class="bold">D ${cardInfo.defence}</h2>
                        </div>
                    </div>
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
    welcomeText: $('#lobby > h3'),
    showCardSelectorButton: $('#showCardSelector'),
    cardSelector: {
      cardSelector: $('#cardSelector'),
      cards: $('#cardSelector > .row'),
      headerText: $('#headerText'),
      header: $('#cardSelector > div:first-child')
    },
    lobby: $('#lobby'),
    spinner: $('#spinner'),
    anyCard: $('.card')
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

function toggleSubmitCardsButton (domElemets, toggle) {
  if (toggle) {
    domElemets.cardSelector.headerText.text('Submit your choise')
    domElemets.cardSelector.header.addClass('card-click')
  } else {
    domElemets.cardSelector.headerText.text('Select your cards')
    domElemets.cardSelector.header.removeClass('card-click')
  }

}

function selectCards (domElemets) {
  $('.card').click(function () {
    if (!selectedCards.includes(cardList[$(this).attr('alt')])) {
      selectedCards.push(cardList[$(this).attr('alt')])
      $(this).addClass('card-click')
    } else {
      selectedCards = selectedCards.filter(e => e !== cardList[$(this).attr('alt')])
      $(this).removeClass('card-click')
    }
    toggleSubmitCardsButton(domElemets, selectedCards.length > 0)
  })
}

function sendCardsToServer (domElemets, socket) {
  domElemets.cardSelector.header.click(function () {
    if (selectedCards.length == 11) {
      alert('good')
      socket.emit('cardSelect', selectedCards)
    } else if (selectedCards.length > 11) {
      alert('you selected to many cards')
    } else {
      alert('you didnt select enugh cards')
    }
  })
}

$(document).ready(() => {
  let domElemets = getDomElements()

  socket.on('connect', () => {
    console.log('connected')
    myId = socket.io.engine.id
    console.log(myId)
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
    selectCards(domElemets)
    sendCardsToServer(domElemets, socket)
  })

})
