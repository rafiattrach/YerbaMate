const router = require("express").Router()
const bodyParser = require("body-parser")

const authController = require("../controllers/auth.controller")

router.get("/signup", authController.getSignup)

router.post(
    "/signup",
    bodyParser.urlencoded({ extended: true }),
    authController.postSignup
)
router.post(
    "/login",
    bodyParser.urlencoded({ extended: true }),
    authController.postLogin
);

router.get("/login", authController.getLogin)

module.exports = router;
