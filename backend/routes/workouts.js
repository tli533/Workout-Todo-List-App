const express = require('express')
const Workout = require('../models/workoutModel')

//creating router instance
const router = express.Router()

//GET all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
})

//GET a single workout
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single workout'})
})

//POST a new workout
//this handler function is now a async function
router.post('/', async (req, res) => {
    const { title, load, reps} = req.body

    try {
        //storing the response in the const workout
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

//DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({messg: 'DELETE a workout'})
})

//UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({messg: 'UPDATE a new workout'})
})

module.exports = router