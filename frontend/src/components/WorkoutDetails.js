import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useState } from "react"


const WorkoutDetails = ({ workout }) => {
    
    const { dispatch } = useWorkoutsContext()
   
    const [tempTitle, setTempTitle] =useState(workout.title)
    const [tempLoad, setTempLoad] = useState(workout.load)
    const [tempReps, setTempReps] = useState(workout.reps)
    const [changed, setChanged] = useState(false);

    


    //handles deleting workouts
    const handleClick = async () => {
        const response = await fetch('https://learning-mern-stack-1dulp4ool-tli533s-projects.vercel.app/' + workout._id, {
            method: 'DELETE'
        }) 
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    //handles updating temporary title
    const handleTitleChange = (e) => {
        setChanged(true);
        setTempTitle(e.target.value);
    }

    const handleLoadChange = (e) => {
        setChanged(true);
        setTempLoad(e.target.value);
    }

    const handleRepsChange = (e) => {
        setChanged(true);
        setTempReps(e.target.value);
    }

    //Resets to initial state when cancelled
    const handleCancel = () => {
        setTempTitle(workout.title);
        setTempLoad(workout.load);
        setTempReps(workout.reps);
        setChanged(false);
    }

    const updateWorkout = async () => {
        const updatedWorkoutData = {
            title: tempTitle,
            load: tempLoad,
            reps: tempReps
        };

        const response = await fetch('https://learning-mern-stack-1dulp4ool-tli533s-projects.vercel.app/' + workout._id, {
            method: 'PUT',
            body: JSON.stringify(updatedWorkoutData),
            headers: {
                'Content-Type' : 'application/json'
            }
        }) 
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'PUT_WORKOUT', payload: json})
        }
    }
    



    return (
        <div className="workout-details ">
            <h4>Title</h4><input className="title-detail"
            type = "text"
            value={tempTitle}
            onChange={handleTitleChange}
            />
            
            <p><strong>Load (kg): </strong></p>
            <input className="load-detail"
            type = "number"
            value={tempLoad}
            onChange={handleLoadChange}
            />
            <p><strong>Reps: </strong></p>
            <input className="rep-detail"
            type = "number"
            value={tempReps}
            onChange={handleRepsChange}
            />
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>Delete</span>
            {changed ? (
                <>
                    <button onClick={updateWorkout}>Save</button> <button onClick={handleCancel}>Cancel</button>
                </>)
                : null}
            {/* <Link to={`/${workout._id}`}><button>edit</button></Link> */}
            
        </div>
    )
} 

export default WorkoutDetails