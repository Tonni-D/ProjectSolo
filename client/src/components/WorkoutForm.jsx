import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import axios from 'axios';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState([]);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };
    axios
      .post('http://localhost:4000/api/workouts', workout)
      .then((response) => {
        setEmptyFields([]);
        setError(null);
        setTitle('');
        setLoad('');
        setReps('');
        setError([]);
        dispatch({ type: 'CREATE_WORKOUT', payload: response.data });
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <div className="form-group transparent">
        <label htmlFor="title">Exercise Title:</label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="form-control"
        />
        {error && Array.isArray(error.emptyFields) && error.emptyFields.includes('title') ? (
          <span style={{ color: 'red' }}>{error.error}</span>
        ) : (
          ''
        )}
      </div>

      <div className="form-group transparent">
        <label htmlFor="load">Load (in kg):</label>
        <input
          type="number"
          id="load"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className="form-control"
        />
        {error && Array.isArray(error.emptyFields) && error.emptyFields.includes('load') ? (
          <span style={{ color: 'red' }}>{error.error}</span>
        ) : (
          ''
        )}
      </div>

      <div className="form-group transparent">
        <label htmlFor="reps">Number of Reps:</label>
        <input
          type="number"
          id="reps"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className="form-control"
        />
        {error && Array.isArray(error.emptyFields) && error.emptyFields.includes('reps') ? (
          <span style={{ color: 'red' }}>{error.error}</span>
        ) : (
          ''
        )}
      </div>

      <button className="btn btn-primary">Add Workout</button>
    </form>
  );
};

export default WorkoutForm;
