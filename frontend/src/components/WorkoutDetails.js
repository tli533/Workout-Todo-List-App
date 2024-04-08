import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useState, useEffect } from "react"
import { Link} from 'react-router-dom';


const WorkoutDetails = ({ workout }) => {
    
    const { dispatch } = useWorkoutsContext()
    const [prevWorkout, setWorkout] =useState()
    const [tempTitle, setTempTitle] =useState(workout.title)
    const [tempLoad, setTempLoad] = useState(workout.load)
    const [tempReps, setTempReps] = useState(workout.reps)
    const [changed, setChanged] = useState(false);

    useEffect(() => {

        console.log('temptitle', prevWorkout)
        console.log('setTemptitle', tempTitle)
        console.log(changed)
    })


    //handles deleting workouts
    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
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



    return (
        <div className="workout-details">
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
                    <button>Save</button> <button onClick={handleCancel}>Cancel</button>
                </>)
                : null}
            {/* <Link to={`/${workout._id}`}><button>edit</button></Link> */}
            
        </div>
    )
} 

export default WorkoutDetails