function newWishItem() {

}

function putNewWishItem() {
    let userId = JSON.parse(localStorage.getItem('WISHES_USER'))['sub']
    let title = document.getElementById('newWishItemTitle').value
    let type = document.getElementById('newWishItemType').value
    if (title === '' || type === '') {
        alert("Title and Type cannot be empty")
    } else {
        addToMyWishList(userId, title, type).then(function (res) {
            console.log(res)
            getItems()
        })
    }
}

function getItems() {
    let userId = JSON.parse(localStorage.getItem('WISHES_USER'))['sub']
    getMyWishList(userId).then(function (res) {
        results = res.map(function (each) {
            localStorage.setItem('wishes', JSON.stringify(res))
            return each.toJSON()
        })
        renderItemLists(results)
    })
}

function renderItemLists(results) {
    let listsArea = document.getElementById('myWishItems')
    let listsContent = ''
    results.map(function (each) {
        let title = '[' + each['Type'] + ']'
        title = title + ' ' + each['Name']
        listsContent += '<li>' + title + '</li>'
    })
    listsArea.innerHTML = listsContent
}