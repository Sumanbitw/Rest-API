const express = require("express")
const app = express()
const cors = require("cors")
const productRoute = require("./router/router.product")
require("dotenv/config")
const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}
))

app.get("/",(req,res) => {
    res.send("hello express")
})

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true, useUnifiedTopology:true}, () =>{
    console.log("connected to db")
})
app.use("/product", productRoute)

app.listen(3000)