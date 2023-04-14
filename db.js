require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.DB_URL;

async function connect(){
  try{
    await mongoose.connect(url)
    console.log("connected to db!")
  }catch(error){
    console.error(error)
  }
}

connect()
module.exports = connect

