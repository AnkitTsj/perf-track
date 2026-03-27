
import { useState, useEffect, useRef } from "react";
import { T, fontMono, fontSerif } from "../../styles/theme.js";
import { fmtTime } from "../../utils/dateHelpers.js";
import { VBtn } from "../ui/index.js";

export default function Stopwatch({ onFinish }) {
  const [elapsed, setElapsed]   = useState(0);       // seconds
  const [running, setRunning]   = useState(false);
  const intervalRef             = useRef(null);

  // ── Timer tick ───────────────────────────────────────────────
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    // Cleanup on unmount or when running changes
    return () => clearInterval(intervalRef.current);
  }, [running]);

  // ── Actions ──────────────────────────────────────────────────
  const handleStartPause = () => setRunning((r) => !r);

  const handleReset = () => {
    setRunning(false);
    setElapsed(0);
  };

  const handleFinish = () => {
    setRunning(false);
    onFinish(elapsed);   // pass seconds up to LogPage
    setElapsed(0);
  };

  const canFinish = elapsed >= 60; 

  return (
    <div style={{ textAlign: "center" }}>

      {/* ── Time display ── */}
      <div
        style={{
          fontFamily:  fontSerif,
          fontSize:    42,
          fontWeight:  "bold",
          color:       T.text,
          letterSpacing: 4,
          textShadow:  `1px 1px 0 ${T.borderDark}`,
          marginBottom: 6,
          animation:   running ? "none" : undefined,
        }}
      >
        {fmtTime(elapsed)}
      </div>

      {/* ── Status label ── */}
      <div
        style={{
          fontFamily:  fontMono,
          fontSize:    10,
          letterSpacing: 3,
          color:       running ? T.accent : T.textLight,
          textTransform: "uppercase",
          marginBottom: 20,
          height:      14,
        }}
      >
        {running ? "● recording" : elapsed > 0 ? "paused" : "ready"}
      </div>

      {/* ── Controls ── */}
      <div
        style={{
          display:        "flex",
          justifyContent: "center",
          gap:            12,
        }}
      >
        <VBtn
          variant={running ? "danger" : "primary"}
          onClick={handleStartPause}
        >
          {running ? "Pause" : elapsed > 0 ? "Resume" : "Start"}
        </VBtn>

        <VBtn
          onClick={handleFinish}
          disabled={!canFinish}
          title={!canFinish ? "Session must be at least 1 minute" : ""}
        >
          Finish &amp; Log
        </VBtn>

        <VBtn
          onClick={handleReset}
          disabled={running}
        >
          Reset
        </VBtn>
      </div>

      {/* ── Minimum duration hint ── */}
      {elapsed > 0 && elapsed < 60 && (
        <div
          style={{
            fontFamily: fontMono,
            fontSize:   10,
            color:      T.warn,
            marginTop:  12,
          }}
        >
          minimum 1 minute to log
        </div>
      )}
    </div>
  );
}