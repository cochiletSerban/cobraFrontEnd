
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
    } else {
      alert('you didnt select enough cards')
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

  socket.on('lobbyFull', () => {
    alert('to many players')
  })
}

function disconnect (socket) {
  socket.on('rageQuit', () => {
    alert('the other player left the game')
    socket.disconnect()
    location.reload()
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
