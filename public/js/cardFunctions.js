/// card Functions
function makeCard (cardInfo, id) {
  switch (cardInfo.type) {
    case 1:
      return `<div class="col-xs-6 col-md-3 col-lg-2 bg">
                  <div class="card" alt="${id}">
                      <h2 class="coolvetica">${cardInfo.name}</h2>
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
                                  <h2 class="coolvetica">A ${cardInfo.atack}</h2>
                              </div>
                          </div>
                          <div class="col-xs-6">
                              <div class="defence">
                                  <h2 class="coolvetica">D ${cardInfo.defence}</h2>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>`
    case 3:
      return `<div class="col-xs-6 col-md-3 col-lg-2 bg style="bakcground-color:red;">
        <div class="card" alt="${id}">
            <h2 class="coolvetica" style="margin-bottom:20px;">${cardInfo.name}</h2>
            <img width="140" height="140" src="./assets/images/funcBg.png" />
            <br>
            <div class="row">
                <div class="col-xs-6">
                </div>
                <div class="col-xs-6">
                </div>
            </div>
            </div>
        </div>
      </div>`

    case 2:
      return `<div class="col-xs-6 col-md-3 col-lg-2 bg">
        <div class="card" alt="${id}">
            <h2 class="coolvetica">${cardInfo.name}</h2>
            <img width="140" height="140" src="${cardInfo.picture}" />
            <hr>
            <br>
            <div class="row">
                <div class="col-xs-12">
                    <h3><img width="52" height="31" src="${cardInfo.nationality}" /></h3>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-6">
                </div>
                <div class="col-xs-6">
                </div>
            </div>
        </div>
      </div>`
  }
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
