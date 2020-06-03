const productsModel = require("../models/products.model")

exports.getProductById = (req, res, next) => {

    // search for id 

    let id = req.params.id

    // get the product from DB (in model)

    productsModel.getProductById(id).then(product => {
        res.render("product",
            {
                product: product,
                pageTitle: "Product"
            })
    })

    // render ejs file

}