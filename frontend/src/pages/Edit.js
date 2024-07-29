//import { useState } from "react";
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import {HomeContainer} from "../containers/HomeContainer";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


const Home = ({ numberOfPages, pageNumber, goToPrev, goToNext, setPageNumber }) => {
    const { workouts } = useWorkoutsContext();
    const {} = HomeContainer();
    
    //numberOfPages()
    //const [numberOfPages, componentPages] = useState(0);
    //console.log('test', workouts);
    
    console.log('component pages', numberOfPages);
    const goToPage = (pageIndex) => {
        setPageNumber(pageIndex);
    }
    //console.log('thing',componentPages);
    //console.log('pages', workout)
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
                    
    
                    <button key={pageIndex} onClick={() => goToPage(pageIndex)}>
                        {pageIndex + 1}
                    </button>
                ))}
                <button onClick={goToNext}>Next</button>
            </div>
        </div>
    );
};

export default Home;
