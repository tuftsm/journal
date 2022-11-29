import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom/client";
import React from 'react';
import styles from './styles.module.css';
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
    <div>
    <div className={styles.academic}>
    <br/><br/>
    <div className={styles.whoops}>
        Academic Planner <br/>
    </div>
    <br/>
    <div className="App">
      {error}
      <Row>
      <Col>
      <h1>New Assignment</h1>
      <form onSubmit={addAssignment}>
        <div>
          <label>
            Assignment: <br/>
            <textarea value={assignment} rows="3" cols="40" onChange={e=>setAssignment(e.target.value)}></textarea>
          </label>
        </div>      
        <div>
          <label>
             Class: <br/>
            <textarea value={course} rows="3" cols="40" onChange={e=>setCourse(e.target.value)}></textarea>
          </label>
        </div>
        <div>
          <label>
            Due Date: <br/>
            <input type="text" value={due} onChange={e => setDue(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Completed? (%): <br/>
            <input type="text" value={completion} onChange={e=>setCompletion(e.target.value)} />
          </label>
        </div>
        <input type="submit" value="Submit" />
        <br/><br/><br/>
      </form>
      </Col>
      <Col>
      <h1>Working On </h1>
      {calendar.map( assignment => (
        <form onSubmit={updateAssignment}>
        <div key={assignment.id} className="assignment">
          <div className="assignment">
          <div className={styles.date}>
            <p><u><b>{assignment.assignment}</b></u><br/></p>
          </div>
            <p><b>Class: </b><br/>{assignment.course}</p>
            <p><b>Due: </b><br/>{assignment.due}</p>
            <p><b>Completion: </b><br/>{assignment.completion}%</p>
            Update Completion %  <br/>
            <input type="text" value={updated} onChange={e => setUpdated(e.target.value)} />
            <button onClick={e => updateAssignment(assignment)}>Update</button>
          </div><br/>
          <button onClick={e => deleteAssignment(assignment)}>Complete</button>
        </div>
        </form>
      ))}
      </Col>
      </Row>
    </div>
    </div>
            <div className={styles.academicfooter}>
            Utilized with <em>Github classroom</em>&emsp;&emsp;&emsp;
            All images licensed for use with <em>Creative Commons</em> licensing. The creator of this website does not claim to own any images.
            </div>
    </div>
  );
}

export default Academics;