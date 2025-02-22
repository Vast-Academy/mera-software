const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connnectDB = require("./config/db")
const router = require("./routes")



const app = express()
app.use(cors({
    origin: process.env.FORNTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api", router)


const PORT = 8080 || process.env.PORT

connnectDB().then(() => {
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})