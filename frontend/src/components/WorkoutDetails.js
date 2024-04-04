import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useState } from "react"
import { Link} from 'react-router-dom';


const WorkoutDetails = ({ workout }) => {
    
    const { dispatch } = useWorkoutsContext()
    const [tempTitle, setTempTitle] =useState(workout.title)
    const [tempLoad, setTempLoad] = useState(workout.load)
    const [tempReps, setTempReps] = useState(workout.reps)


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
        setTempTitle(e.target.value);
    }

    const handleLoadChange = (e) => {
        setTempLoad(e.target.value);
    }

    const handleRepsChange = (e) => {
        setTempReps(e.target.value);
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
            <Link to={`/${workout._id}`}><button>edit</button></Link>
            
        </div>
    )
} 

export default WorkoutDetails