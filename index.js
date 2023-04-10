const { main } = require('./db.js')

const express = require('express')
const app = express()

require('dotenv').config();



app.get("/", (req, res)=>{
    res.send("hej")
})

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`server is up on `, process.env.SERVER_PORT)
})

