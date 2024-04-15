// import { useEffect } from "react";
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// const WorkoutsContainer = ({ pageNumber }) => {
//     const { dispatch } = useWorkoutsContext();

//     useEffect(() => {
//         const fetchWorkouts = async () => {
//             try {
//                 const response = await fetch(`api/workouts?page=${pageNumber}`);
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch workouts");
//                 }
//                 const json = await response.json();
//                 dispatch({ type: 'SET_WORKOUTS', payload: json });
//             } catch (error) {
//                 console.error("Error fetching workouts:", error);
//             }
//         };

//         fetchWorkouts();
//     }, [dispatch, pageNumber]);

//     return; // This component doesn't render anything visible
// };

// export default WorkoutsContainer;
