
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
