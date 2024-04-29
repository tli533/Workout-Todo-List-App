import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [fetchComplete, setFetchComplete] = useState(false); // Track fetch completion
    const [forceRender, setForceRender] = useState(false); // Track whether to force re-render

    // Fetch workouts and update the number of pages when the page number changes or workouts change
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`api/workouts?page=${pageNumber}`);
            const json = await response.json();
            
            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json.workouts});
                setNumberOfPages(json.totalPages);
                setFetchComplete(true); // Set fetch completion status
            }
        };

        fetchWorkouts();
    }, [dispatch, pageNumber, workouts.length]); // Include workouts.length in dependencies

    // Execute another useEffect hook only after the fetch operation is completed
    useEffect(() => {
        if (fetchComplete) {
            // Your logic here
            console.log("Fetch operation completed");
            // Check if there are fewer than two workouts and force re-render if needed
            if (workouts.length < 2) {
                setForceRender(prevState => !prevState);
            }
        }
    }, [fetchComplete, workouts.length]); // Include workouts.length in dependencies

    const goToPrev = () => {
        setPageNumber(prevPageNumber => Math.max(0, prevPageNumber - 1));
    };

    const goToNext = () => {
        setPageNumber(prevPageNumber => Math.min(numberOfPages - 1, prevPageNumber + 1));
    };

    return (
        <div className="home">
            <div className="workouts">
                <h3>Page {pageNumber + 1}</h3>
                {workouts.length > 0 && workouts.slice(0, 2).map((workout) => ( // Render only two workouts
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
                {workouts.length === 0 && <p>No workouts found.</p>}
            </div>
            <WorkoutForm />
            <div>
                <button onClick={goToPrev}>Prev</button>
                {[...Array(numberOfPages).keys()].map((pageIndex) => (
                    <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                        {pageIndex + 1}
                    </button>
                ))}
                <button onClick={goToNext}>Next</button>
            </div>
            {forceRender && <div style={{ display: 'none' }}>{Math.random()}</div>}
        </div>
    );
};

export default Home;