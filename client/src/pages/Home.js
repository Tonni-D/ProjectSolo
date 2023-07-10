import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import axios from "axios"
// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
import "../components/design.css";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    
    useEffect(() => {
        const fetchWorkouts = async () => {

            const response = await axios.get('http://localhost:4000/api/workouts/');
            console.log(response.data, "respnose");
            if (response.data) {
                dispatch({ type: 'SET_WORKOUTS', payload: response.data });
            }
            else{

            }

        }
        fetchWorkouts()
    }, [dispatch])
    console.log(workouts)
    return (
        <div className="home ">
            <WorkoutForm />

            <div className="workouts m-2">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
        </div>
    )
}

export default Home