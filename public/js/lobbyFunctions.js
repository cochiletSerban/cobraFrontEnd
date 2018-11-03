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

function transformLobbyIntoBoard(domElemets) {
  hideElement(domElemets.lobby)
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
    domElemets.cardSelector.headerText.text('Submit your choice')
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