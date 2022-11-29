import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom/client";

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
    <div className="App">
      {error}
      <h1>Create an Entry</h1>
      <form onSubmit={addEntry}>
        <div>
          <label>
            Date:
            <input type="text" value={date} onChange={e => setDate(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Info:
            <textarea value={info} onChange={e=>setInfo(e.target.value)}></textarea>
          </label>
        </div>
        <div>
          <label>
            Highlight:
            <textarea value={highlight} onChange={e=>setHighlight(e.target.value)}></textarea>
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <h1>Past Info</h1>
      {entries.map( entry => (
        <div key={entry.id} className="entry">
          <div className="info">
            <p>{entry.info}</p>
            <p>{entry.highlight}</p>
            <p><i>-- {entry.date}</i></p>
          </div>
          <button onClick={e => deleteEntry(entry)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Personal;