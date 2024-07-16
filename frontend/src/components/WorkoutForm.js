import {useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const{ dispatch } = useWorkoutsContext('')
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    //when form is submitted creates a workout with title, load and reps
    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps} //the function will change it to a json string

        //performing a POST req to the server
        const response = await fetch('https://backend-beta-snowy.vercel.app/api/workouts', {
            method: 'POST',
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
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

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

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
        
}

export default WorkoutForm