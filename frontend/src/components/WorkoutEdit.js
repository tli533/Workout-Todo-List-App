import { useState, useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useHistory} from 'react-router-dom'

const WorkoutEdit = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()

    //handles deleting workouts
    const handleClick = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'PUT'
        }) 
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'PUT_WORKOUT', payload: json})
        }

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
            dispatch({type: 'PUT_WORKOUT', payload: json})
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

            <button>Edit Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
} 


export default WorkoutEdit