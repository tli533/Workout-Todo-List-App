import { useState, useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useNavigate, Link, useParams } from 'react-router-dom'

const WorkoutEdit = () => {
    
    const{ dispatch } = useWorkoutsContext('')
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    
    const [emptyFields, setEmptyFields] = useState([])
   
    

    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps} //the function will change it to a json string

        //performing a POST req to the server
        const response = await fetch('/api/workouts', {
            method: 'PUT',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('updated workout added', json)
            dispatch({type: 'PUT_WORKOUT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Edit Workout</h3>

            <label>Excerise Title:</label>
            <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (Kg):</label>
            <input 
            type="number"
            onChange={(e) => setLoad(e.target.value)} 
            value={load}
            className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
            type="number"
            onChange={(e) => setReps(e.target.value)} 
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Edit Workout</button>
            <Link to={`/`}><button>Cancel</button></Link>
            {error && <div className="error">{error}</div>}
        </form>
    )
} 


export default WorkoutEdit