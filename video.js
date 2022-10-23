let mongoose = require('mongoose')

// create mongoSchema which refers to
// document in video collection

let mongoSchema = mongoose.Schema

let videoSchema = new mongoSchema({
    'title':String,
    'videoid':String,
    'likes':Number,
    'Dislikes':Number
}, {collection :'video'})

// export the videoSchema so that can be imported and 
// can be used in index.js
module.exports = mongoose.model('video', videoSchema)