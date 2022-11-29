import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom/client";

const Plan = () => {
  // setup state
  const [planner, setPlanner] = useState([]);
  const [error, setError] = useState("");
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const fetchPlanner = async() => {
    try {      
      const response = await axios.get("/api/planner");
      setPlanner(response.data.planner);
    } catch(error) {
      setError("error retrieving planner: " + error);
    }
  }
  
  const createPlan = async() => {
    try {
      await axios.post("/api/planner", {exercise: exercise, sets: sets, reps: reps, date: date, time: time});
    } catch(error) {
      setError("error adding an entry: " + error);
    }
  }
  
  const deleteOnePlan = async(plan) => {
    try {
      await axios.delete("/api/planner/" + plan.id);
    } catch(error) {
      setError("error deleting a plan: " + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchPlanner();
  },[]);

  const addPlan = async(e) => {
    e.preventDefault();
    await createPlan();
    fetchPlanner();
    setExercise("");
    setSets("");
    setReps("");
    setDate("");
    setTime("");
  }

  const deletePlan = async(plan) => {
    await deleteOnePlan(plan);
    fetchPlanner();
  }
 

  // render results
  return (
    <div className="App">
      {error}
      <h1>Efforts to Become Stronger</h1>
      <form onSubmit={addPlan}>
        <div>
          <label>
            Exercise:
            <textarea value={exercise} onChange={e=>setExercise(e.target.value)}></textarea>
          </label>
        </div>
        <div>
          <label>
            Sets:
            <textarea value={sets} onChange={e=>setSets(e.target.value)}></textarea>
          </label>
        </div>   
        <div>
          <label>
            Reps:
            <textarea value={reps} onChange={e=>setReps(e.target.value)}></textarea>
          </label>
        </div>
        <div>
          <label>
             Date:
            <input type="text" value={date} onChange={e => setDate(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Time:
            <textarea value={time} onChange={e=>setTime(e.target.value)}></textarea>
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <h1>Past Info</h1>
      {planner.map( plan => (
        <div key={plan.id} className="plan">
          <div className="plan">
            <p>{plan.exercise}</p>
            <p>Sets: {plan.sets}  Reps: {plan.reps}</p>
            <p><i>{plan.date} at {plan.time}</i></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Plan;