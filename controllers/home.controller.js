
const productsModel = require("../models/products.model")

exports.getHome = (req, res, next) => {
    // connect to DB and get products
    productsModel.getAllProducts().then(products => {
        res.render("index", {
            products:products
        })
    })


    // render ejs file
}