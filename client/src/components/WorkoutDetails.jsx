import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
// date fns
import { formatDistanceToNow } from 'date-fns';
import { useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    
    const navigate=useNavigate()
    const handleClick = async () => {
        console.log(workout._id)
        const response = await axios.delete('http://localhost:4000/api/workouts/' + workout._id)
        console.log(response.data)
        if (response.data) {
            dispatch({ type: 'DELETE_WORKOUT', payload:response.data  })
        }
    }

    return (
        <div className="card workout-details">
    <div className="card-body">
    <h4 className="card-title">{workout.title}</h4>
    <p className="card-text"><strong>Load (kg):</strong> {workout.load}</p>
    <p className="card-text"><strong>Number of reps:</strong> {workout.reps}</p>
    <p className="card-text">{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
    <button className="btn btn-danger m-2" onClick={handleClick}>Delete</button>
    <button className='btn btn-info' onClick={()=>navigate("/edit/"+workout._id)}>Edit</button>
  </div>
</div>

    )
}

export default WorkoutDetails