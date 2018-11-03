// make socket connection to geroku backend used for poduction ( when pushing to master)
// comment this line for local development ( if you are runnig the back end locally )
// var socket = io.connect('https://cobras.herokuapp.com/')

// used for local development , uncommetn for local dev
const socket = io.connect('http://localhost:3000/')
var selectedCards = []
var cardList = []
let myId = ''

/// card Functions
function makeCard (cardInfo, id) {
  return `<div class="col-xs-6 col-md-3 col-lg-2 bg">
            <div class="card" alt="${id}">
                <h2>${cardInfo.name}</h2>
                <img width="140" height="140" src="${cardInfo.picture}" />
                <hr>
                <br>
                <div class="row">
                    <div class="col-xs-6">
                        <h3>${cardInfo.nationality} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</h3>
                    </div>
                    <div class="col-xs-6">
                        <h3>${cardInfo.team}</h3>
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

function makeCards (cardList) {
  let cards = []
  let id = 0
  for (let card of cardList) {
    cards.push(makeCard(card, id))
    id++
  }
  return cards
}

// uitls
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

function appendElmentsTo (appendTo, listOfElements) {
  for (let elem of listOfElements) {
    $(appendTo).append(elem)
  }
}

function removeOldElemtsOf (element) {
  element.empty(element)
}

// lobby functions
function displayStartGame (domElemets, socket) {
  hideElement(domElemets.spinner)
  domElemets.welcomeText.text('All the players are now in the room')
  showElement(domElemets.showCardSelectorButton)
  domElemets.showCardSelectorButton.click(() => {
    getCards(socket)
    transformLobbyIntoCardSlector(domElemets)
  })
}

function renderCardSelector (domElemets) {
  let appendTo = domElemets.cardSelector.cards
  removeOldElemtsOf(appendTo)
  appendElmentsTo(appendTo, makeCards(cardList))
}

function transformLobbyIntoCardSlector (domElemets) {
  hideElement(domElemets.lobby)
  showElement(domElemets.cardSelector.cardSelector)
}

function transformCardSlectorIntoLobby (domElemets) {
  hideElement(domElemets.cardSelector.cardSelector)
  showElement(domElemets.lobby)
  showElement(domElemets.spinner)
  hideElement(domElemets.showCardSelectorButton)
  domElemets.welcomeText.text('waiting for the other player to select his cards')
}

function toggleSubmitCardsButton (domElemets, toggle) {
  if (toggle) {
    domElemets.cardSelector.headerText.text('Submit your chiox')
    domElemets.cardSelector.header.addClass('card-click')
  } else {
    domElemets.cardSelector.headerText.text('Select your cards')
    domElemets.cardSelector.header.removeClass('card-click')
  }
}

function getStageText (cardList) {
  switch (cardList.length) {
    case 24: return 'select 11 cards'
    case 10: return 'select 5 cards'
    case 3: return 'select 1 card'
  }
}

// conncetion functions
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

function sendCardsToServer (domElemets, socket, numberOfCards) {
  domElemets.cardSelector.header.click(function () {
    console.log('length ' + selectedCards.length)
    if (selectedCards.length === numberOfCards) {
      socket.emit('selectedCards', selectedCards)
      domElemets.cardSelector.header.unbind('click')
      toggleSubmitCardsButton(domElemets, false)
    } else if (selectedCards.length > numberOfCards) {
      alert('you selected to many cards')
    } else if (selectedCards.length < numberOfCards) {
      alert('you didnt select enugh cards')
    }
  })
}

function getCards (socket) {
  socket.emit('getCards')
}

function cardSelection (socket, domElemets) {
  socket.on('startGame', () => displayStartGame(domElemets, socket))

  socket.on('reciveCards', (stage) => {
    selectedCards = []
    cardList = []
    console.log('got cards')
    cardList = stage.randomCards
    alert(getStageText(cardList))
    renderCardSelector(domElemets)
    selectCards(domElemets)
    sendCardsToServer(domElemets, socket, stage.stageNumber)
    console.log(stage.stageNumber)
  })

  socket.on('serverGotCards', (stage) => {
    getCards(socket)
  })

  socket.on('waitForPlayersToSelect', () => {
    transformCardSlectorIntoLobby(domElemets)
  })

  socket.on('renderBoard', (cardsInHand) => {
    alert("rendering bord")
    console.log(cardsInHand);
  })

  socket.on('lobbyFull', () => {
    alert('to many players')
  })
}

function disconnect (socket) {
  socket.on('rageQuit', () => {
    alert('the other player left the game, refresh the page to start a new game')
    socket.disconnect()
  })
}

function prepareGame (socket) {
  socket.on('connect', () => {
    console.log('connected')
    myId = socket.io.engine.id
    console.log(myId)
  })
  return getDomElements()
}

$(document).ready(() => {
  let domElemets = prepareGame(socket)
  cardSelection(socket, domElemets)
  disconnect(socket)
})
