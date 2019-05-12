const ssr_prob = 3
const sr_prob = 15 + ssr_prob
const r_prob = 52 + sr_prob
const n_prob = 25 + r_prob
const none_prob = 5 + n_prob

function renderCardItem() {
    // let elem = document.createElement("div")
    elem = `
        <div class="nes-table-responsive">
            <table class="nes-table is-bordered is-centered">
                <tbody>
                    <tr>
                        <td><button type="button" class="nes-btn is-primary" onclick="startLottery()">Click</button></td>
                        <td><button type="button" class="nes-btn is-primary" onclick="startLottery()">Click</button></td>
                        <td><button type="button" class="nes-btn is-primary" onclick="startLottery()">Click</button></td>
                        <td><button type="button" class="nes-btn is-primary" onclick="startLottery()">Click</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
    return elem
}

function initCardBack() {
    let areas = document.getElementById("new_card_area")
    areas.innerHTML = renderCardItem()
}

function newCard () {
    document.getElementById('card-dialog').showModal();
    initCardBack()
}

function getACardType () {
    let type = ''
    if (none_prob !== 100) {
        alert("Internal Error")
    } else {
        let result = Math.floor((Math.random() * 100) + 1);
        if (result < ssr_prob) {
            type = 'SSR'
        } else if (result < sr_prob) {
            type = 'SR'
        } else if (result < r_prob) {
            type = 'R'
        } else if (result < n_prob) {
            type = 'N'
        } else {
            type = 'Empty'
        }
    }
    return type
}

function startLottery () {
    document.getElementById('lottery-dialog').showModal();
    let type = getACardType()
    let title = ""
    if (type === 'Empty') {
        title = 'Bad Luck, You got an Empty Card!'
    } else {
        let wishes = JSON.parse(localStorage.getItem('wishes'))
        let filteredWishes = wishes.filter(function(each) {
            return each.Type === type
        })
        if (filteredWishes.length === 0) {
            title = 'You got a ' + type + ', but you do not have a card in your list!'
        } else {
            let finalResultIndex = Math.ceil((Math.random() * filteredWishes.length) -1);
            console.log(filteredWishes)
            console.log(finalResultIndex)
            console.log(filteredWishes[finalResultIndex])
            title = 'You got ' + filteredWishes[finalResultIndex].Name
        }
    }
    document.getElementById('card_result').innerHTML = title
}