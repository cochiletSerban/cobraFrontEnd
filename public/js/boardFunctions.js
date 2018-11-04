function renderBoard (socket, domElemets) {
  let card
  let board = {
    first: [],
    mid: [],
    last: []
  }
  socket.on('renderBoard', (cardsInHand) => {
    transformLobbyIntoBoard(domElemets)
    let hand = domElemets.hand
    let lider = cardsInHand.pop()
    console.log(lider);
    
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

    $(".clickMe").click(function (cardsInHand) {
      ///console.log('asdf');
      card = $(this)
      card.addClass("card-click")
      domElemets.first.addClass("card-click")
      domElemets.mid.addClass("card-click")
      domElemets.last.addClass("card-click")

      domElemets.last.click(function (cardsInHand) {
        console.log(card + 'pe row');
        card.find('.hideMe').addClass('hideMe').removeClass('hideMe2')
        card.addClass('bindMe')
        $(this).append(card)
        card.removeClass('card-click')
        //let newDom = getDomElements()
        //bindOnHover(newDom)
        domElemets.first.removeClass("card-click")
        domElemets.mid.removeClass("card-click")
        domElemets.last.removeClass("card-click")
        board.last.push(cardsInHand[$(card).attr('alt')])
        console.log(board.last);
        
      })

      domElemets.last.click(function () {
        console.log(card + 'pe rows');
        $(this).append(card)
        card.removeClass('card-click')
        domElemets.first.removeClass("card-click")
        domElemets.mid.removeClass("card-click")
        domElemets.last.removeClass("card-click")
      })

      domElemets.mid.click(function () {
        console.log(card + 'pe row');
        $(this).append(card)
        card.removeClass('card-click')
        domElemets.first.removeClass("card-click")
        domElemets.mid.removeClass("card-click")
        domElemets.last.removeClass("card-click")
      })

      domElemets.first.click(function () {
        console.log(card + 'pe row');
        $(this).append(card)
        card.removeClass('card-click')
        domElemets.first.removeClass("card-click")
        domElemets.mid.removeClass("card-click")
        domElemets.last.removeClass("card-click")
      })

    })
  })
}
