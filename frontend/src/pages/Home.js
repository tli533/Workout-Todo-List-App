import { useEffect, useMemo, useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { usePagination } from "../hooks/usePagination"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import Pagination from "../components/Pagination"

let PageSize = 5


const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return workouts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    //fetching workout data from an API
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [])

    //rendering the divs and components
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <Pagination
            className = "pagination-bar"
            currentPage = {currentPage}
            totalCount={workouts.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
             />
            <WorkoutForm />
        </div>
    )
}

export default Home