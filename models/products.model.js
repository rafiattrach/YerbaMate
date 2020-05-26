
const mongoose = require("mongoose")

const DB_URL = "mongodb://localhost:27017/yerbaMate"

const productSchema = mongoose.Schema({

    name: String,
    image: String,
    price: Number,
    description: String

})

const Product = mongoose.model("product", productSchema)

exports.getAllProducts = () => {

    // establish database connection
    // retrieve products
    // close connection

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find()
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err))
    })
}


exports.getProductsByColor = (color) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({ color: color })
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => reject(err))
    })
}