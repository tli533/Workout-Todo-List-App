import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutsContainer from '../containers/WorkoutsContainer';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const { workouts } = useWorkoutsContext();
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        if (workouts && workouts.totalPages) {
            setNumberOfPages(workouts.totalPages);
        }
        
        console.log(workouts);
    }, [workouts]);

    

    const goToPrev = () => {
        setPageNumber(prevPageNumber => Math.max(0, prevPageNumber - 1));
    };

    const goToNext = () => {
        setPageNumber(prevPageNumber => Math.min(numberOfPages - 1, prevPageNumber + 1));
    };

    return (
        <div className="home">
            <WorkoutsContainer pageNumber={pageNumber} />
            <div className="workouts">
                <h3>Page {pageNumber + 1}</h3>
                {workouts && workouts.workouts && workouts.workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
                {(workouts && workouts.workouts && workouts.workouts.length === 0) && <p>No workouts found.</p>}
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
        </div>
    );
};

export default Home;
