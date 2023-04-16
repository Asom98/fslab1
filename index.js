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



app.get("/", async(req, res) => {
    res.sendFile(__dirname + "/html/index.html");
});

app.get("/api/albums", async(req, res) => {
    //res.sendFile(__dirname + "/html/addAlbum.html");
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

app.post('/api/albums', async (req,res) => { // create a album in the database if the album does not exist 
    try {
        const data = req.body;
        const album = await fetch(`http://localhost:3000/api/albums/${data.title}`)
        if(album){
            res.sendStatus(409)
        }else{
            const newAlbum = new album(data);
            await newAlbum.save();
            res.status(201).redirect('/');
        }
        
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
    }
    
})



app.listen(process.env.SERVER_PORT, ()=>{
    console.log(`server is up on `, process.env.SERVER_PORT)
})

