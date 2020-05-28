// Using express framework
const express = require("express")
const path = require("path")

// sessions for storing info on DB
const session = require("express-session")
const SessionShop = require("connect-mongodb-session")(session)

const STORE = new SessionShop({
    // link of DB
    uri: "mongodb://localhost:27017/yerbaMate",
    collection: "sessions"
})

const homeRouter = require("./routes/home.route")
const productRouter = require("./routes/product.route")
const authRouter = require("./routes/auth.route")

const app = express()

// static files contained in same global dir in assets folder
app.use(express.static(path.join(__dirname, "assets")))
app.use(express.static(path.join(__dirname, "images")))


app.use(session({
    secret: "a secret no one is able to discover... hopefully, ok if you do props to you",
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000 // 1 hour in ms
    },
    store: STORE
}))

// set template engine to EJS
app.set("view engine", "ejs")
app.set("views", "views")


app.use("/", homeRouter)
app.use("/", authRouter)
app.use("/product", productRouter)


// app.get("/", (req,res,next) => {
//     // render() instead of send() for EJS
//     res.render("index")
// })

app.listen(9000, () => {
    console.log("Listening on port 9000!")
})