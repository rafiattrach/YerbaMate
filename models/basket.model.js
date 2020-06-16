const mongoose = require("mongoose")

const DB_URL = process.env.DB_URL

const basketSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
})

const BasketItem = mongoose.model("basket", basketSchema)

exports.addNewItem = data => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                let item = new BasketItem(data)
                return item.save()
            })
            .then(() => {
                mongoose.disconnect()
                resolve()
            })
            .catch(err => {
                mongoose.disconnect()
                reject(err)


            })
    })
}

exports.getItemByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                return BasketItem.find({ userId: userId }, {}, { sort: { timestamp: 1 } })
            })
            .then(items => {
                mongoose.disconnect()
                resolve(items)
            })
            .catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}

exports.deleteItem = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => BasketItem.deleteOne({ _id: id }))
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => BasketItem.updateOne({ _id: id }, newData))
            .then(items => {
                mongoose.disconnect()
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect()
                reject(err);
            })
    })
}