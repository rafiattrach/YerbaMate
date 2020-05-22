// Using express framework
const express = require("express")
const path = require("path")

const app = express()

// static files contained in same global dir in assets folder
app.use(express.static(path.join(__dirname, "assets")))
app.set("view engine", "ejs")
app.set("views", "views")



app.get("/", (req,res,next) => {
    res.send("hello")
})

app.listen(9000, () => {
    console.log("Listening on port 9000!")
})