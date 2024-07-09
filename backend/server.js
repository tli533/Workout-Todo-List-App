require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//express app
const app = express()   

//middleware
app.use(express.json()) //.json attaches it to the req objects

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
//app.use('/api/workouts', workoutRoutes)
app.use('https://learning-mern-stack-s.vercel.app/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listening for request
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

//testing the api
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})

module.exports = app;