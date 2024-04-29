import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import Home from "../pages/Home";

export const HomeContainer = () => {
    const { dispatch } = useWorkoutsContext();
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [fetchComplete, setFetchComplete] = useState(false);
    
    const testing = 1;
    
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(`api/workouts?page=${pageNumber}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch workouts");
                }
                const json = await response.json();
                dispatch({ type: 'SET_WORKOUTS', payload: json.workouts });
                console.log("Total pages fetched:", json.totalPages); 
                setNumberOfPages(json.totalPages);
                
                setFetchComplete(true);
            } catch (error) {
                console.error("Error fetching workouts:", error);
            }
        };
    
        
        
    useEffect(() => {
        fetchWorkouts();
    }, [dispatch, pageNumber]);
    
    useEffect(() => {
        console.log("Updated numberOfPages:", numberOfPages);
    }, [numberOfPages]);
    
    const componentPages = numberOfPages

    //console.log('component pages', componentPages)

    const goToPrev = () => {
        setPageNumber(prevPageNumber => Math.max(0, prevPageNumber - 1));
    };

    
    const goToNext = () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
    };

    return (
        <Home 
            //workouts={workouts}
            testing={testing}
            
            pageNumber={pageNumber} 
            numberOfPages={numberOfPages}
            setNumberOfPages={setNumberOfPages}
            fetchComplete={fetchComplete} 
            goToPrev={goToPrev}
            goToNext={goToNext}
            setPageNumber={setPageNumber}
        />
        
    );
    
};

//export default HomeContainer;
