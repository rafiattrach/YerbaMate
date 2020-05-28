// work on router level
const router = require("express").Router()

const productController = require("../controllers/product.controller")

// parameters after : 
router.get("/:id", productController.getProduct)


module.exports = router