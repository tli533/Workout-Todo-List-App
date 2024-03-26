import { useEffect, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
//import workoutModel from "../../../backend/models/workoutModel"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const [numberOfPages, setNumberOfPages] = useState(0);
    let [page, setPage] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    
    
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
    //fetching workout data from an API
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`api/workouts/}`)
            //const json = await response.json()
            const json = await response.json().then(({totalPages, workouts}) => {
                //workouts(workouts);
                page = workouts;
                setPage(page)
                setNumberOfPages(totalPages);
                console.log(workouts);
                console.log(page);
            });
            

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [dispatch, pageNumber])


    //rendering the divs and components
    return (
        <div className="home">
            
            <div className="workouts">
            <h3>Page {pageNumber + 1}</h3>
                {page && page.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
        
            
            
        </div>
        
    )
}

export default Home