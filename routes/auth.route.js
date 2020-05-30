const router = require("express").Router()
const bodyParser = require("body-parser")
const check = require("express-validator").check

const authController = require("../controllers/auth.controller")

router.get("/signup", authController.getSignup)

router.post(
    "/signup",
    bodyParser.urlencoded({ extended: true }),
    check("username").not().isEmpty(),
    // check("")
    authController.postSignup
)
router.post(
    "/login",
    bodyParser.urlencoded({ extended: true }),
    authController.postLogin
);

router.get("/login", authController.getLogin)


router.all("/logout", authController.logout)

module.exports = router;
