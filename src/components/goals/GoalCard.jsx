import { T, fontMono } from "../../styles/theme.js";
import { Gauge } from "../ui/index.js";
import { VBtn } from "../ui/index.js";
import { calcGoalProgress } from "../../utils/mathHelpers.js";

// ── Unit label map ─────────────────────────────────────────────
const UNIT_LABEL = {
  time:   "hrs",
  pages:  "pages",
  topics: "topics",
};

export default function GoalCard({ goal, logs, onUpdate, onDelete }) {
  const pct     = calcGoalProgress(goal, logs);
  const unit    = UNIT_LABEL[goal.metric] ?? goal.metric;
  const isManual = goal.metric !== "time"; // pages + topics need manual bumping

  const handleIncrement = () => {
    const next = Math.min((goal.current ?? 0) + 1, goal.target);
    onUpdate(goal.id, { current: next });
  };

  const handleDecrement = () => {
    const next = Math.max((goal.current ?? 0) - 1, 0);
    onUpdate(goal.id, { current: next });
  };

  return (
    <div
      style={{
        position:     "relative",
        background:   T.bgCard,
        border:       `1px solid ${T.border}`,
        borderRadius: 8,
        padding:      "16px 14px 12px",
        boxShadow:    `2px 2px 0 ${T.borderDark}`,
        display:      "flex",
        flexDirection: "column",
        alignItems:   "center",
        gap:          10,
        minWidth:     130,
        maxWidth:     160,
      }}
    >
      {/* ── Delete button ── */}
      <button
        onClick={() => onDelete(goal.id)}
        title="Remove goal"
        style={{
          position:   "absolute",
          top:        6,
          right:      8,
          background: "none",
          border:     "none",
          cursor:     "pointer",
          color:      T.textLight,
          fontSize:   13,
          lineHeight: 1,
          padding:    2,
        }}
      >
        ✕
      </button>

      {/* ── Gauge ── */}
      <Gauge
        pct={pct}
        label={goal.name}
        sub={`/ ${goal.target} ${unit}`}
      />

      {/* ── Progress detail ── */}
      <div
        style={{
          fontFamily: fontMono,
          fontSize:   10,
          color:      T.textMuted,
          textAlign:  "center",
        }}
      >
        {goal.metric === "time"
          ? "auto-tracked from logs"
          : `${goal.current ?? 0} / ${goal.target} ${unit}`}
      </div>

      {/* ── Manual +/- controls (pages / topics only) ── */}
      {isManual && (
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <VBtn
            onClick={handleDecrement}
            disabled={(goal.current ?? 0) <= 0}
            style={{ padding: "3px 10px", fontSize: 14 }}
          >
            −
          </VBtn>
          <span
            style={{
              fontFamily: fontMono,
              fontSize:   13,
              fontWeight: "bold",
              color:      T.text,
              minWidth:   28,
              textAlign:  "center",
            }}
          >
            {goal.current ?? 0}
          </span>
          <VBtn
            onClick={handleIncrement}
            disabled={(goal.current ?? 0) >= goal.target}
            style={{ padding: "3px 10px", fontSize: 14 }}
          >
            +
          </VBtn>
        </div>
      )}
    </div>
  );
}