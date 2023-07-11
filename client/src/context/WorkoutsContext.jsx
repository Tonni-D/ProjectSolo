import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state = { workouts: [] }, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                ...state,
                workouts: action.payload,
            }
        case 'UPDATE_WORKOUT':
            return {
                ...state,
                workouts: state.workouts.map(workout =>
                    workout._id === action.payload._id ? action.payload : workout
                )
            }
        case 'CREATE_WORKOUT':
            return {
                ...state,
                workouts: [...state.workouts, action.payload]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter(w => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: []
    })

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}