import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom/client";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Academics = () => {
  // setup state
  const [calendar, setCalendar] = useState([]);
  const [error, setError] = useState("");
  const [course, setCourse] = useState("");
  const [assignment, setAssignment] = useState("");
  const [due, setDue] = useState("");
  const [completion, setCompletion] = useState("");
  const [updated, setUpdated] = useState("");

  const fetchCalendar = async() => {
    try {      
      const response = await axios.get("/api/calendar");
      setCalendar(response.data.calendar);
    } catch(error) {
      setError("error retrieving calendar: " + error);
    }
  }
  
  const createAssignment = async() => {
    try {
      await axios.post("/api/calendar", {course: course, assignment: assignment, due: due, completion: completion});
    } catch(error) {
      setError("error adding an assignment: " + error);
    }
  }
  
  const deleteOneAssignment = async(assignment) => {
    try {
      await axios.delete("/api/calendar/" + assignment.id);
    } catch(error) {
      setError("error deleting an assignment: " + error);
    }
  }
  
  const updateOneAssignment = async(assignment) => {
    try {
      await axios.put("/api/calendar" + assignment.id + assignment.updated);
    } catch(error) {
      setError("error updating an assignment: " + error);
    }
    }

  // fetch ticket data
  useEffect(() => {
    fetchCalendar();
  },[]);

  const addAssignment = async(e) => {
    e.preventDefault();
    await createAssignment();
    fetchCalendar();
    setCourse("");
    setAssignment("");
    setDue("");
    setCompletion("");
    setUpdated("");
  }

  const deleteAssignment = async(assignment) => {
    await deleteOneAssignment(assignment);
    fetchCalendar();
  }
 
 const updateAssignment = async(assignment) => {
   console.log("updated: ", assignment.updated);
   await updateOneAssignment(assignment);
   fetchCalendar();
 }


  // render results
  return (
    <div className="App">
      {error}
      <h1>Create a Calendar</h1>
      <form onSubmit={addAssignment}>
        <div>
          <label>
             Course:
            <input type="text" value={course} onChange={e => setCourse(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Assignment:
            <textarea value={assignment} onChange={e=>setAssignment(e.target.value)}></textarea>
          </label>
        </div>
        <div>
          <label>
            Due Date:
            <textarea value={due} onChange={e=>setDue(e.target.value)}></textarea>
          </label>
        </div>
        <div>
          <label>
            Completed? (%):
            <textarea value={completion} onChange={e=>setCompletion(e.target.value)}></textarea>
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <h1>Working On: </h1>
      {calendar.map( assignment => (
        <form onSubmit={updateAssignment}>
        <div key={assignment.id} className="assignment">
          <div className="assignment">
            <p>Assignment: {assignment.course}</p>
            <p>Course: {assignment.assignment}</p>
            <p>Due: {assignment.due}</p>
            <p>Completion: {assignment.completion}</p>
            Update Completion % 
            <input type="text" value={updated} onChange={e => setUpdated(e.target.value)} />
          </div>
          <button onClick={e => deleteAssignment(assignment)}>Complete</button>
        </div>
        <input type="submit" value="Submit" />
        </form>
      ))}
    </div>
  );
}

export default Academics;