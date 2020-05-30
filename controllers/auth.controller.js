const authModel = require("../models/auth.model")


exports.getSignup = (req, res, next) => {

    res.render("signup")
}

exports.postSignup = (req, res, next) => {

    authModel
        .createNewUser(req.body.username, req.body.email, req.body.password)
        .then(() => {
            res.redirect("/login")
                .catch((err) => res.redirect("/signup"))
        })

}


exports.getLogin = (req, res, next) => {
    res.render("login", {
        loginError: req.flash("loginError")[0]
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
