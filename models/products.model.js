
const mongoose = require("mongoose")

const DB_URL = "mongodb+srv://rafiattrach:rafiattrach@cluster0-qya1b.mongodb.net/yerbaMate?retryWrites=true&w=majority"

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
        mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
            return Product.find()
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getProductById = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                return Product.findById(id)
            })
            .then(product => {
                mongoose.disconnect()
                resolve(product)
            })
            .catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}


exports.getProductsByColor = (color) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
            if (color === "every") {
                return Product.find().then(products => {
                    mongoose.disconnect()
                    resolve(products)
                }).catch(err => {
                    mongoose.disconnect()
                    reject(err)})
            }
            else return Product.find({ color: color })
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}