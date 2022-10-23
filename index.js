// import express
const { response } = require('express')
let express = require('express')
let mongoose = require('mongoose')
const videos = require('./video')
let cors = require('cors')

// create express app
let app = express()
//configure this app to work with request and response 
//in JSON format
app.use(express.json())
// configure cors
app.use(cors())

// connect with mongodb
let connectionString = 'mongodb+srv://ishak1219:angryLove87@cluster0.gigqpvp.mongodb.net/youtube'
mongoose.connect(connectionString)
let db = mongoose.connection

// check if mongodb was success
db.once('open', ()=>{
    console.log('Mongodb database host on cloud.mongodb.com is connected!');
})

// use express app create first endpoint to receive GET request
// app.get('/') - whenever the get request comes from/ 'root'
// endpoint, execute the associate callback function
app.get('/', (request, response)=>{
    console.log('GET Request recived...')
    response.json({
        'message':'welcome to youtube API',
        'request_type':'GET'
    })

})

// whenever the get request comes from/ 'root'
// endpoint, execute the associate callback function
app.post('/', (request, response)=>{
    console.log('POST Request recived...')
    response.json({
        'massage':'welcome to youtube API',
        'request_type':'POST'
    })

})

app.get('/get/video/all', (request, response)=>{
    console.log('Get all the list of the video...')
    //get all the documents
    videos.find({},(error, data)=>{
        if(error){
            response.json(error)
        }else{
            response.json(data)
        }
    })


    
})

app.post("/video/add", (request, response)=>{
    
    console.log("Log request body received in console");
    console.log(request.body)
    // create new instance of video(empty document)
    let newvideo = new videos()
    // extract values from request body and initialize each
    // in newvideo

    console.log(newvideo)
    newvideo.title = request.body.title
    newvideo.videoid = request.body.videoid
    newvideo.likes = request.body.likes
    newvideo.dislikes = request.body.dislikes
    console.log(newvideo)

    // save new video to mongodb
    newvideo.save((error, data)=>{
        if(error){
            response.json(error)
        }else{
            response.json(data)
        }
        })
    })
    
    

// expose the express app on PORT 8888
let PORT = 8888
// listed to port 8888 and if it successfull, then execute
// the callback function
app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`)
})