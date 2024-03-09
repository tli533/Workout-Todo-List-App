require('dotenv').config()

const express = require('express')
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
app.use('/api/workouts', workoutRoutes)

//testing the api
// app.get('/', (req, res) => {
//     res.json({mssg: 'Welcome to the app'})
// })

//listejn for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})

//process.env