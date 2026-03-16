import React, { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState("");
  const [times, setTimes] = useState([]);

  const captureTime = () => {
    const now = new Date();
    setTime(now.toLocaleString());
  };

  const saveTime = async () => {
    await fetch("http://localhost:5000/save-time", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ time }),
    });

    loadTimes();
  };

  const loadTimes = async () => {
    const res = await fetch("http://localhost:5000/times");
    const data = await res.json();
    setTimes(data);
  };

  useEffect(() => {
    loadTimes();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Punch Time App</h2>

      <button onClick={captureTime}>Capture Local Time</button>

      <br /><br />

      <input
        type="text"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <button onClick={saveTime}>Save Time</button>

      <h3>Punch Times</h3>

      <ul>
        {times.map((t, index) => (
          <li key={index}>{t.time}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
