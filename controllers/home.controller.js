
const productsModel = require("../models/products.model")

exports.getHome = (req, res, next) => {


    
    // if user filters on home page, return respective color
    let color = req.query.color
    let productPromise
    if (color && color !== "all")
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