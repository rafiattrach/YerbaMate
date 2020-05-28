const authModel = require("../models/auth.model")


exports.getSignup = (req, res, next) => {

    res.render("signup")
}

exports.postSignup = (req, res, next) => {

}


exports.getLogin = (req, res, next) => {
    res.render("login")
}