const router = require("express").Router()
const bodyParser = require("body-parser")
const check = require("express-validator").check

const authController = require("../controllers/auth.controller")
const authGuard = require("./guards/auth.guard")

router.get("/signup", authGuard.isNotAuth, authController.getSignup)

router.post(
    "/signup", authGuard.isNotAuth,
    bodyParser.urlencoded({ extended: true }),
    check("username").not().isEmpty().withMessage("Username is required!"),
    // not() only negates the next operator (single)
    check("email").not().isEmpty().withMessage("E-mail can't be empty!")
        .isEmail().withMessage("The field has to be an E-mail!"),
    check("password").isLength({ min: 6 }).withMessage("Password must have at least 6 characters"),
    check("confirmPassword").custom((value, meta) => {
        if (value === meta.req.body.password) return true
        else throw "The passwords don't match!"
    }),

    authController.postSignup
)
router.post(
    "/login", authGuard.isNotAuth,
    bodyParser.urlencoded({ extended: true }),
    authController.postLogin
);

router.get("/login", authGuard.isNotAuth, authController.getLogin)


router.all("/logout", authGuard.isAuth, authController.logout)

module.exports = router;
