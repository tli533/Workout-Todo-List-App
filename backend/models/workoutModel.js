const mongoose = require('mongoose')

const Schema = mongoose.Schema

//for each workout document
const workoutSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number, 
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    deleted: {
        type: Date
    }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)

//Workout.find()