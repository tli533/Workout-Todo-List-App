const WorkoutModel = require('../models/workoutModel')
const mongoose = require('mongoose')

const PAGE_SIZE = 2;
//get all workouts
const getWorkouts = async (req, res) => {
    const page =parseInt(req.query.page || "0");
    const totalPages = await WorkoutModel.countDocuments({deleted: null});
    const workouts = await WorkoutModel
    .find({deleted: null}).limit(PAGE_SIZE).skip(PAGE_SIZE * page)
    .sort({createdAt: -1});
    

    //res.status(200).json({workouts, totalPages: Math.ceil(totalPages / PAGE_SIZE)})
    res.status(200).json({workouts, totalPages: Math.ceil(totalPages/ PAGE_SIZE)})
}

//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    } 

    const workout = await WorkoutModel.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

//create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    //add doc to db
    try {
        //storing the response in the const workout
        //If it does not fit the requirements of the workoutModel/schema then errors
        const workout = await WorkoutModel.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await WorkoutModel.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await WorkoutModel.findOneAndDelete({_id: id}, {
        ...req.body
    })

    if (!workout) {
        return res.status(404).json({error: 'No suh workout'})
    }

    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}