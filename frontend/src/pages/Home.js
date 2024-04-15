import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    // Fetch workouts and update the number of pages when the page number changes or workouts change
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`api/workouts?page=${pageNumber}`);
            const json = await response.json();
            
            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json.workouts});
                setNumberOfPages(json.totalPages);
            }
        }

        fetchWorkouts();
    }, [dispatch, pageNumber, workouts])

    const goToPrev = () => {
        setPageNumber(prevPageNumber => Math.max(0, prevPageNumber - 1));
    }

    const goToNext = () => {
        setPageNumber(prevPageNumber => Math.min(numberOfPages - 1, prevPageNumber + 1));
    }

    return (
        <div className="home">
            <div className="workouts">
                <h3>Page {pageNumber + 1}</h3>
                {workouts.length > 0 && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
                {workouts.length === 0 && <p>No workouts found.</p>}
            </div>
            <WorkoutForm />
            <div>
                <button onClick={goToPrev}>Prev</button>
                {pages.map((pageIndex) => (
                    <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                        {pageIndex + 1}
                    </button>
                ))}
                <button onClick={goToNext}>Next</button>
            </div>
        </div>
    )
}

export default Home;
