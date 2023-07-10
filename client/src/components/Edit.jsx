import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
const Edit = () => {
  const { id } = useParams(); 
  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate=useNavigate()
  const [err,setErr]=useState([])

  const handleSubmit =  (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    axios.patch(`http://localhost:4000/api/workouts/${id}`, workout)
    .then((response) => {
      setEmptyFields([]);
      setError(null);
      setTitle('');
      setLoad('');
      setReps('');
      dispatch({ type: 'UPDATE_WORKOUT', payload: response.data });
      navigate("/");
    })
    .catch((error) => {
      console.log("An error occurred:", error);
      setError(error.response.data.error);
    });
  
  }


  return (
    <form className="edit" onSubmit={handleSubmit}>
      <h3>Edit Workout</h3>

      <div className="form-group">
        <label htmlFor="title">Exercise Title:</label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={`form-control `}
        />
       {error && Array.isArray(error.emptyFields) && error.emptyFields.includes("title") ? <span style={{ color: "red" }}>{error.error}</span> : ""}

      </div>


      <div className="form-group">
        <label htmlFor="load">Load (in kg):</label>
        <input
          type="number"
          id="load"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={`form-control`}
        />
      {error && Array.isArray(error.emptyFields) && error.emptyFields.includes("load") ? <span style={{ color: "red" }}>{error.error}</span> : ""}
      </div>

      <div className="form-group">
        <label htmlFor="reps">Number of Reps:</label>
        <input
          type="number"
          id="reps"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={`form-control `}
        />
    {error && Array.isArray(error.emptyFields) && error.emptyFields.includes("reps") ? <span style={{ color: "red" }}>{error.error}</span> : ""}
      </div>

      <button className="btn btn-primary">Save Changes</button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </form>
  );
};

export default Edit;
