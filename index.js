const { main, connect } = require('./db.js')

const express = require('express')
const app = express()

require('dotenv').config();
app.use(express.static("public"));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`server is up on `, process.env.SERVER_PORT)
})

