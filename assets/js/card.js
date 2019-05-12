function renderCardItem() {
    let elem = document.createElement("div")
    elem.innerHTML = `
        <div class="nes-table-responsive">
            <table class="nes-table is-bordered is-centered">
                <tbody>
                    <tr>
                        <td>Thou hast had a good morning</td>
                        <td>Thou hast had a good afternoon</td>
                        <td>Thou hast had a good evening</td>
                        <td>Thou hast had a good night</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
    return elem
}

function initCardBack() {
    let areas = document.getElementById("new_card_area")
    areas.replaceChild(renderCardItem())
}

function newCard() {
    document.getElementById('card-dialog').showModal();
    initCardBack()
}