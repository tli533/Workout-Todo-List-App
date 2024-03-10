const Workout = require('../models/workoutModel')

//get all workouts

//get a single workout

//create new workout
const creeateWorkout = async (req, res) => {
    const { title, load, reps} = req.body

    try {
        //storing the response in the const workout
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a workout

//update a workout
