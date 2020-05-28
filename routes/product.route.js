// work on router level
const router = require("express").Router()

const productController = require("../controllers/product.controller")
const homeController = require("../controllers/home.controller")

router.get("/", homeController.getHome)

// parameters after : 
router.get("/:id", productController.getProduct)


module.exports = router