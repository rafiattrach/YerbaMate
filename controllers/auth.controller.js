const authModel = require("../models/auth.model")
const validationResult = require("express-validator").validationResult



exports.getSignup = (req, res, next) => {

    res.render("signup", {
        loginError: req.flash("loginError")[0],
        validationErrors: req.flash("validationErrors"),
        pageTitle: "Sign Up"

    })
}

exports.postSignup = (req, res, next) => {

    if (validationResult(req).isEmpty()) {

        authModel
            .createNewUser(req.body.username, req.body.email, req.body.password)
            .then(() => res.redirect("/login"))
            .catch(err => {
                req.flash("loginError", err)
                res.redirect("/signup")
            })
    }
    else {
        req.flash("validationErrors", validationResult(req).array())
        res.redirect("/signup")
    }

}


exports.getLogin = (req, res, next) => {
    res.render("login", {
        loginError: req.flash("loginError")[0],
        pageTitle: "Login"
    })
}

exports.postLogin = (req, res, next) => {

    authModel
        .login(req.body.email, req.body.password)
        .then((id) => {
            req.session.userId = id
            res.redirect("/")
        })
        .catch(err => {
            console.log(err)
            // key value pair with flash, saving error in key loginError
            req.flash("loginError", err)
            res.redirect("/login")
        })
}

exports.logout = (req, res, next) => {

    /*

    removes session from DB when user decides to logout

    */
    req.session.destroy(() => {
        res.redirect("/")
    })
}
