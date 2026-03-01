import { useState, useEffect } from "react";
import Timer from "./components/Timer/Timer.jsx";
import './App.css'

function App() {
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem("user_logs");
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  useEffect(() => {
    localStorage.setItem("user_logs", JSON.stringify(logs));
  }, [logs]);

  const addLog = (activity, duration) => {
    const newLog = {
      id: Date.now(),
      activity,
      duration, // in minutes
      timestamp: new Date().toLocaleTimeString(),
      type: "work"
    };
    setLogs([newLog, ...logs]);
  };

  return (
    <div className="app-container">
      <h1>Performance Tracker</h1>
      <Timer onSave={addLog} />
      
      <div className="log-display">
        <h3>Today's Logs</h3>
        {logs.map(log => (
          <div key={log.id} className="log-item">
            <strong>{log.timestamp}</strong>: {log.activity} — {log.duration} mins
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;