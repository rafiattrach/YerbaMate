const express = require("express")

const app = express()

app.listen(9000, (err) => {
    console.log("Error occured: " + err)
    console.log("Listening on port 9000!")
})