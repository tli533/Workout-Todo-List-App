import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useState } from "react"
import { Link} from 'react-router-dom';


const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const [tempTitle, setTempTitle ] =useState()

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

    return (
        <div className="workout-details">
            <input className="block"
            type = "text"
            value={workout.title}/>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>delete</span>
            <Link to={`/${workout._id}`}><button>edit</button></Link>
            
        </div>
    )
} 

export default WorkoutDetails