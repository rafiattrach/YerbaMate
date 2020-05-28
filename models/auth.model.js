const mongoose = require("mongoose")
var bcrypt = require('bcryptjs');

const DB_URL = "mongodb://localhost:27017/yerbaMate"

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = mongoose.model("user", userSchema)

exports.createNewUser = (username, email, password) => {



    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() => {
                return User.findOne({ email: email })
            }).then(user => {
                // duplicate check
                if (user) {
                    mongoose.disconnect()
                    reject("An account with this email is already in use!")
                }
                else {
                    return bcrypt.hash(password, 10)
                }
            }).then(hashedPass => {
                let user = new User({
                    username: username,
                    email: email,
                    password: hashedPass
                })
                return user.save()
            }).then(() => {
                resolve()
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })

}