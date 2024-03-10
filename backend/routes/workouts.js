const express = require('express')
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout
} = require('../controllers/workoutController')

//creating router instance
const router = express.Router()

//GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

//POST a new workout
//this handler function is now a async function
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({messg: 'UPDATE a new workout'})
})

module.exports = router
