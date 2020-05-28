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

exports.login = (email, password) => {



    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
            .then(() =>
                User.findOne({ email: email })
            ).then(user => {
                if (!user) {
                    mongoose.disconnect()
                    reject("No account is registered with the following E-mail!")
                } else {
                    // nested promise in order to have access to user
                    bcrypt.compare(password, user.password).then(same => {
                        if (!same) {
                            mongoose.disconnect()
                            reject("The password is incorrect! Try again!")
                        } else {
                            mongoose.disconnect()
                            resolve(user._id)
                        }
                    })
                }
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}