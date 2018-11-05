function calcScore(cardsInHand) {
  let scor
  for (let card of cardsInHand) {
    scor = card.atack + card.defence
  }
  return scor
}

function endRound () {
  if(confirm('end round?')) initScor = 0
  $("#myScor").text(0)
  $("#bottomPart > .row").empty()
  $("#topPart > .row").empty()
  board.first = []
  board.mid = []
  board.last = []
  socket.emit('end')
}

function renderBoard (socket, domElemets) {
  f = false
  let stuff 
  let card
  socket.on('renderBoard', (cardsInHand) => {
    transformLobbyIntoBoard(domElemets)
    let hand = domElemets.hand
    let lider = cardsInHand.pop()
    //console.log(lider);
    
    appendElmentsTo(hand, makeBoardCards(cardsInHand))
    domElemets.myLider.append(`<div class="boardCard" alt="${myId}">
                                  ${lider.name}
                                  <!-- <div class="hideMe"> -->
                                  <img width="140" height="140" class="hideMe2" src="${lider.picture}" />
                                  <hr>
                                  <br>
                                  <div class="row">
                                      <div class="col-xs-12">
                                          <h3><img width="31"  height="31" src="${lider.nationality}" /></h3>
                                      </div>
                                  </div>
                              <!-- </div> -->
                              </div>
                              </div>`)


    $(".clickMe").off().on('click', function () {
      ///console.log('asdf');
      card = $(this).find('.boardCard')
      card.addClass("card-click")
      domElemets.first.addClass("card-click")
      domElemets.mid.addClass("card-click")
      domElemets.last.addClass("card-click")

      domElemets.last.off().on('click',function () {
        card.find('.hideMe').addClass('hideMe').removeClass('hideMe2')
        card.addClass('bindMe')
        $(this).append(card)
        card.removeClass('card-click')
        domElemets.first.removeClass("card-click")
        domElemets.mid.removeClass("card-click")
        domElemets.last.removeClass("card-click")
        //console.log($(card).attr('alt'));
        if(!board.last.includes(cardsInHand[$(card).attr('alt')]))
          board.last.push(cardsInHand[$(card).attr('alt')])
        //console.log(board.last);
        //console.log(cardsInHand[$(card).attr('alt')]);
        //console.log(cardsInHand[$(card).attr('alt')]);
        //  initScor = parseInt(domElemets.myScor.text)
        // if (isNaN(initScor)) initScor = 0
        // console.log(initScor);
        domElemets.myScor.text(initScor + calcScore(board.last))
        initScor = initScor + calcScore(board.last)
        stuff = {initScor,board}
        socket.emit('cardOnBoard', stuff)
      })

      domElemets.mid.off().on('click',function () {
        card.find('.hideMe').addClass('hideMe').removeClass('hideMe2')
        card.addClass('bindMe')
        $(this).append(card)
        card.removeClass('card-click')
        domElemets.first.removeClass("card-click")
        domElemets.mid.removeClass("card-click")
        domElemets.last.removeClass("card-click")
        //console.log($(card).attr('alt'));
        if(!board.mid.includes(cardsInHand[$(card).attr('alt')]))
          board.mid.push(cardsInHand[$(card).attr('alt')])
        //console.log(board.last);
        //console.log(cardsInHand[$(card).attr('alt')]);
        //console.log(cardsInHand[$(card).attr('alt')]);
        //  initScor = parseInt(domElemets.myScor.text)
        // if (isNaN(initScor)) initScor = 0
        // console.log(initScor);
        domElemets.myScor.text(initScor + calcScore(board.mid))
        initScor = initScor + calcScore(board.mid)
        stuff = {initScor,board}
        socket.emit('cardOnBoard', stuff)
      })


      domElemets.first.off().on('click',function () {
        card.find('.hideMe').addClass('hideMe').removeClass('hideMe2')
        card.addClass('bindMe')
        $(this).append(card)
        card.removeClass('card-click')
        domElemets.first.removeClass("card-click")
        domElemets.mid.removeClass("card-click")
        domElemets.last.removeClass("card-click")
        //console.log($(card).attr('alt'));
        if(!board.first.includes(cardsInHand[$(card).attr('alt')]))
          board.first.push(cardsInHand[$(card).attr('alt')])
        //console.log(board.last);
        //console.log(cardsInHand[$(card).attr('alt')]);
        //console.log(cardsInHand[$(card).attr('alt')]);
        //  initScor = parseInt(domElemets.myScor.text)
        // if (isNaN(initScor)) initScor = 0
        // console.log(initScor);
        domElemets.myScor.text(initScor + calcScore(board.first))
        initScor = initScor + calcScore(board.first)
        stuff = {initScor,board}
        socket.emit('cardOnBoard', stuff)
      })

    })
  })
}
