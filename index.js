const connect = require('./public/js/db.js')
connect()
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const path = require('path');
const album = require('./models/album.js')
require('dotenv').config();
app.use('/public', express.static(path.join(__dirname, 'public')));;
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))
var cors = require('cors')
app.use(cors())

app.get("/", async(req, res) => {
    res.sendFile(__dirname + "/html/index.html");
});

app.get("/api/albums", async(req, res) => {
    try{
        const allAlbums = await album.find()
        res.json(allAlbums)
        
    }catch(error){
        console.log(error);
        res.status(500).send({ status: 'error', message: error });
    }
});

app.get("/api/albums/:title", async(req, res)=>{
    try{
        const title = req.params.title
        const query = {title : `${title}`}
        const albumByTitle = await album.findOne(query)
        if(!albumByTitle){
            res.sendStatus(404)
        }else{
            res.json(albumByTitle)
        }
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
})

app.post('/api/albums', async (req,res) => {
    try {
        const data = req.body;
        const newAlbum = new album(data);
        await newAlbum.save();
        res.status(201).redirect('/');
    } catch (error) {
        res.status(409).send({ status: 'error', message: error });
    }
})

app.put("/api/albums/:id", async(req, res)=>{
    try{
        const id  = req.params.id
        const updatedAlbum = req.body
        await album.findByIdAndUpdate(id, updatedAlbum)
    }catch(error){
        res.sendStatus(404)
        console.log(error)
    }
    
})

 app.delete("/api/albums/:id", async (req, res)=>{
    try{
        const id = req.params.id
        await album.findByIdAndDelete(id)
    }catch(error){
        res.sendStatus(404)
    }
 })


app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`server is up on `, process.env.SERVER_PORT)
})

