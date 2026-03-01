import { useState, useEffect } from "react";
import "./Time.css";
function Timer({ onSave }) {
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopAndSave = () => {
    if (seconds === 0) return;
    const activityName = prompt("What were you working on?");
    if (activityName) {
      onSave(activityName, Math.floor(seconds / 60)); 
      setSeconds(0);
      setActive(false);
    }
  };

  return (
    <div className='timer-container'>
      <h3>Session Time: {formatTime(seconds)}</h3>
      <button onClick={() => setActive(!active)}>
        {active ? "Pause" : "Start"}
      </button>
      <button onClick={handleStopAndSave} disabled={seconds === 0}>
        Finish & Log
      </button>
      <button onClick={() => { setSeconds(0); setActive(false); }}>
        Reset
      </button>
    </div>
  );
}

export default Timer;