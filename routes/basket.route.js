const router = require("express").Router()
const bodyParser = require("body-parser")
const authGuard = require("./guards/auth.guard")
const basketController = require("../controllers/basket.controller")
const check = require("express-validator").check

router.get("/", authGuard.isAuth, basketController.getBasket)


router.post("/", authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    check("amount").not().isEmpty().withMessage("Please enter an amount for the product before adding it to your basket!").isInt({ min: 1 })
        .withMessage("The minimum you can choose for a product is 1!"),
    basketController.postBasket
)

router.post("/save", authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    check("amount").not().isEmpty().withMessage("Please enter an amount for the product before adding it to your basket!").isInt({ min: 1 })
        .withMessage("The minimum you can choose for a product is 1!"),
    basketController.postSave)

router.post("/delete", authGuard.isAuth, bodyParser.urlencoded({ extended: true }),
    basketController.postDelete)

module.exports = router

