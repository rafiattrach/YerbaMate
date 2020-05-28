
const productsModel = require("../models/products.model")

exports.getHome = (req, res, next) => {



    // if user filters on home page, return respective color
    let color = req.query.color
    let validColors = ["every", "yellow", "orange", "green", "red"]
    let productPromise
    if (validColors.includes(color))
        productPromise = productsModel.getProductsByColor(color)
    else
        productPromise = productsModel.getAllProducts()

    // return products based on the filter
    productPromise.then(products => {
        res.render("index", {
            products: products
        })
    })


}