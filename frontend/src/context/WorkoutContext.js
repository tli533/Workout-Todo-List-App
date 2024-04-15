import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

//specifies how the state gets updated
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                ...state,
                workouts: action.payload
            };
            case 'CREATE_WORKOUT':
            return {
                ...state,
                workouts: Array.isArray(state.workouts) ? [action.payload, ...state.workouts] : [action.payload]
            };
            
            case 'DELETE_WORKOUT':
            return {
                ...state,
                workouts: Array.isArray(state.workouts) ? state.workouts.filter((w) => w._id !== action.payload._id) : []
            };
            
            case 'PUT_WORKOUT':
                return {
                    ...state,
                workouts: Array.isArray(state.workouts) ? [action.payload, ...state.workouts] : [action.payload]
                };
            
        default:
            return state;
    }
};


//The children prop represents the components or template the const is accepting the prop
//wraps. In this case it represents the app component
export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: [] // Ensure workouts is initialized as an empty array
    });

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    );
};
