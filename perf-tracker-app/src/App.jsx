import { useState, useEffect } from "react";
import Timer from "./components/Timer/Timer.jsx";
import './App.css'

function App() {
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem("user_logs");
    return savedLogs ? JSON.parse(savedLogs) : [];
  });
  const [targets, setTargets] = useState({
  1: { Coding: 120, Aptitude: 60, LeetCode: 90 }, // Monday targets in minutes
  2: { Coding: 120, Aptitude: 60, LeetCode: 90 },
  3: { Coding: 120, Aptitude: 60, LeetCode: 90 },
  4: { Coding: 120, Aptitude: 60, LeetCode: 90 },
  5: { Coding: 180, Aptitude: 30, LeetCode: 120 }, // Heavy Friday
  6: { Coding: 60, Aptitude: 0, LeetCode: 60 },    // Light Saturday
  0: { Coding: 0, Aptitude: 0, LeetCode: 0 }       // Sunday Rest
});
const TASK_COLORS = {
  "Coding": "#6d8299",     // Muted Blue-Grey
  "Aptitude": "#939b62",   // Sage Green
  "LeetCode": "#d4a373",   // Warm Tan/Orange
  "Web-Dev": "#a98467",    // Earthy Brown
  "ML": "#606c38",         // Moss Green
  "DSA": "#bc6c25"          // Deep Burnt Orange
};

  useEffect(() => {
  const savedHistory = JSON.parse(localStorage.getItem("performance_history") || "{}");
  
  const today = new Date().toISOString().split('T')[0];

  const todayTotal = logs.reduce((total, log) => {
    return total + log.duration;
  }, 0);

  const updatedHistory = {
    ...savedHistory,
    [today]: todayTotal
  };

  localStorage.setItem("performance_history", JSON.stringify(updatedHistory));
}, [logs]); 

  const addLog = (activity, duration) => {
  const newLog = {
    id: Date.now(),
    activity,
    duration,
    timestamp: new Date().toLocaleTimeString(),
    date: new Date().toISOString().split('T')[0], 
    type: "work"
  };
  setLogs([newLog, ...logs]);
};

  const calculatePerformance = () => {
  const currentDay = new Date().getDay();
  const dayTargets = targets[currentDay];
  
  const dailyStats = logs.reduce((acc, log) => {
    // Only count logs from today
    const logDate = new Date(log.id).toDateString();
    const todayDate = new Date().toDateString();
    
    if (logDate === todayDate) {
      acc[log.activity] = (acc[log.activity] || 0) + log.duration;
    }
    return acc;
  }, {});

  let totalScore = 0;
  let activityCount = 0;

  Object.keys(dayTargets).forEach(activity => {
    const target = dayTargets[activity];
    if (target > 0) {
      const actual = dailyStats[activity] || 0;
      const ratio = Math.min(actual / target, 1); 
      totalScore += ratio;
      activityCount++;
    }
  });

  return activityCount === 0 ? 0 : (totalScore / activityCount) * 100;
};

  return (
    <div className="app-container">
      <div className="performance-summary">
      <h2>Daily Performance: {calculatePerformance().toFixed(1)}%</h2>
      <progress value={calculatePerformance()} max="100"></progress>
    </div>
      <h1>Performance Tracker</h1>
      <Timer onSave={addLog} />

      <div className="log-display">
  {logs.map(log => {
    const themeColor = TASK_COLORS[log.activity] || "#ddd";

    return (
      <div 
        key={log.id} 
        className="log-item"
        style={{ 
          borderColor: themeColor 
        }}
      >
        <strong>{log.timestamp}</strong> {log.activity} | {log.duration} mins
      </div>
    );
  })}
</div>
    </div>
  );
}

export default App;