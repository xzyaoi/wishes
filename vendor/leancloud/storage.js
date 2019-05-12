var { Query, User } = AV;
AV.init("yLHB1xPIaSGodSLb95BhaYRO-gzGzoHsz", "onuuORMicMkxFkoLFQalSz3w");

function getMyWishList(userId) {
    let query = new AV.Query('WishItem');
    query.equalTo('UserId', userId);
    return new Promise((resolve, reject) => {
        query.find().then(function (results) {
            resolve(results)
        }, function (error) {
            reject(error)
        });
    })
}

function syncMyWishList() {

}

function addToMyWishList(userId, title, type) {
    let WishItem = AV.Object.extend('WishItem');
    let wishItem = new WishItem();
    wishItem.set('UserId', userId);
    wishItem.set('Name', title);
    wishItem.set('Type', type);
    return new Promise((resolve, reject) => {
        wishItem.save().then(function (resObject) {
            resolve(resObject)
        }, function (error) {
            reject(error)
        });
    })
}