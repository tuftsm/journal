import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom/client";
import styles from './styles.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Personal = () => {
  // setup state
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [info, setInfo] = useState("");
  const [highlight, setHighlight] = useState("");
  const [pastDate, setPastDate] = useState("");

  const fetchEntries = async() => {
    try {      
      const response = await axios.get("/api/entries");
      setEntries(response.data.entries);
    } catch(error) {
      setError("error retrieving entries: " + error);
    }
  }
  const createEntry = async() => {
    try {
      await axios.post("/api/entries", {date: date, info: info, highlight: highlight});
    } catch(error) {
      setError("error adding an entry: " + error);
    }
  }
  const deleteOneEntry = async(entry) => {
    try {
      await axios.delete("/api/entries/" + entry.id);
    } catch(error) {
      setError("error deleting an entry: " + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchEntries();
  },[]);

  const addEntry = async(e) => {
    e.preventDefault();
    await createEntry();
    fetchEntries();
    setDate("");
    setInfo("");
    setHighlight("");
  }
  
 

  const deleteEntry = async(entry) => {
    await deleteOneEntry(entry);
    fetchEntries();
  }


  // render results
  return (
    <div>
    <div className={styles.personal}>
    <br/><br/>
    <div className={styles.whoops}>
        Personal Journal <br/>
    </div>
    <div className="App">
      {error}
      <Row>
      <Col>
      <h1>New Entry</h1>
      <form onSubmit={addEntry}>
        <div>
          <label>
            Highlights: <br/>
            <textarea value={highlight} rows="6" cols="60" onChange={e=>setHighlight(e.target.value)}></textarea>
          </label>
        </div>
        <div>
          <label>
            Things to Improve:<br/>
            <textarea value={info} rows="6" cols="60" onChange={e=>setInfo(e.target.value)}></textarea>
          </label>
        </div>
        <div>
          <label>
            Date: <br/>
            <input type="text" value={date} onChange={e => setDate(e.target.value)} />
          </label>
        </div>
        <br/>
        <input type="submit" value="Submit" />
      </form>
      <br/><br/><br/>
      </Col>
      <Col>
      <h1>Past Entries</h1>
      {entries.map( entry => (
        <div key={entry.id} className="entry">
          <div className="info">
          <div className={styles.date}>
            <p><u><b>{entry.date}</b></u></p>
          </div>
            <p><b>Highlights:</b> <br/>{entry.highlight}</p>
            <p><b>Improvements: </b><br/>{entry.info}</p>
          </div>
          <button onClick={e => deleteEntry(entry)}>Erase</button>
          <br/><br/><br/>
        </div>
      ))}
    <br/><br/>      
    </Col>
    </Row>
    </div>
    </div>
            <div className={styles.footer}>
             &emsp;&emsp;&emsp;Utilized with <em><a href="https://github.com/tuftsm/journal.git" target="_blank">Github classroom</a></em>&emsp;&emsp;&emsp;
            All images licensed for use with <em>Creative Commons</em> licensing. The creator of this website does not claim to own any images.
            </div>
    </div>
  );
}

export default Personal;