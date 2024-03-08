const express = require('express')

//creating router instance
const router = express.Router()

//GET all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
})

//GET a single workout
router.get('/:id', (res, req) => {
    res.json({mssg: 'GET a single workout'})
})

//POST a new workout
router.post('/', (req, res) => {
    res.json({messg: 'POST a new workout'})
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