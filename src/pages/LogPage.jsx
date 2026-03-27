
import { useState } from "react";
import { T, fontMono } from "../styles/theme.js";
import { toMins } from "../utils/dateHelpers.js";
import { Card } from "../components/ui/index.js";
import { Stopwatch, LogForm } from "../components/logger/index.js";

export default function LogPage({ addLog }) {
  const [pendingMins, setPendingMins] = useState(null);

  const handleFinish = (elapsedSeconds) => {
    setPendingMins(toMins(elapsedSeconds));
  };

  const handleSubmit = (entry) => {
    addLog({ ...entry, duration: pendingMins });
    setPendingMins(null);
  };

  const handleCancel = () => {
    setPendingMins(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {pendingMins === null ? (
        // ── Phase 1: Stopwatch ──────────────────────────────────
        <Card title="Session Timer">
          <Stopwatch onFinish={handleFinish} />
        </Card>
      ) : (
        // ── Phase 2: Log Form ───────────────────────────────────
        <Card title="Log This Session">
          <LogForm
            durationMins={pendingMins}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Card>
      )}

      {/* ── Tips ── */}
      <div
        style={{
          fontFamily: fontMono,
          fontSize:   10,
          color:      T.textLight,
          lineHeight: 1.8,
          padding:    "0 4px",
        }}
      >
        <div>· Minimum session: 1 minute to log</div>
        <div>· Topic name is used to auto-track time-based goals</div>
        <div>· Happiness + effort ratings power the correlation chart</div>
      </div>
    </div>
  );
}