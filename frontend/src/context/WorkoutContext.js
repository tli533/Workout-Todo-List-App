import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

//specifies how the state gets updated
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT' :
            return {
                workouts: [action.payload, ...(state.workouts || [])]
            }
        case 'DELETE_WORKOUT' :
            return {
                //if the workouts are not equal to the choosen one then keep. If it is then delete
                workouts: state.workouts ? state.workouts.filter((w) => w._id !== action.payload._id) : []
            }
        case 'PUT_WORKOUT' :
            return {
                
                workouts: [action.payload, ...(state.workouts)]
            }
        default: 
            return state
    }
}

//The children prop represents the components or template the const is accepting the prop
//wraps. In this case it represents the app component
export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: []
    })

    

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}