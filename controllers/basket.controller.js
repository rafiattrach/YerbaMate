const basketModel = require("../models/basket.model")
const validationResult = require("express-validator").validationResult


exports.postSave = (req, res, next) => {
    if (validationResult(req).isEmpty()) {

        basketModel.editItem(req.body.basketId, { amount: req.body.amount, timestamp: Date.now() })
            .then(() => res.redirect("/basket"))
            .catch(err => console.log(err))

    } else {
        req.flash("validationErrors", validationResult(req).array())
        res.redirect("/basket")
    }
}


exports.getBasket = (req, res, next) => {
    basketModel.getItemByUser(req.session.userId)
        .then(items => {
            res.render("basket", {
                items: items,
                isUser: true,
                pageTitle: "Basket"
            })
        }).catch(err => console.log(err))
}

exports.postBasket = (req, res, next) => {

    if (validationResult(req).isEmpty()) {
        basketModel.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            timestamp: Date.now()
        }).then(() => {
            res.redirect("/basket")
        }).catch(err => {
            console.log(err)
        })
    } else {
        req.flash("validationErrors", validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }

}

exports.postDelete = (req, res, next) => {

    basketModel.deleteItem(req.body.basketId)
        .then(() => {
            res.redirect("/basket")
        }).catch(err => {
            console.log(err)
        })
}