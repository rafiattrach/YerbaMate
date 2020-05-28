const productsModel = require("../models/products.model")

exports.getProduct = (req, res, next) => {

    // search for id 

    let id = req.params.id

    // get the product from DB (in model)

    productsModel.getProductById(id).then(product => {
        res.render("product",
            {
                product: product
            })
    })

    // render ejs file

}