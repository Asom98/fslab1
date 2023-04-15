const mongoose = require("mongoose")

const albumSchema = new mongoose.Schema({
    title: String,
    artist: String,
    year: Number
})

const album = mongoose.model('album', albumSchema)

module.exports = album