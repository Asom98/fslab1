const express = require('express')
const app = express()

const SERVER_PORT = 3000

app.get("/", (req, res)=>{
    res.send("hej")
})

app.listen(SERVER_PORT, ()=>{
    console.log(`server is up on `, SERVER_PORT)
})

