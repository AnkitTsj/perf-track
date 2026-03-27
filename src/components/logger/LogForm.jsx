
import { useState } from "react";
import { T, fontMono } from "../../styles/theme.js";
import { VBtn } from "../ui/index.js";

// ── Shared input style ─────────────────────────────────────────
const inputStyle = {
  fontFamily:   fontMono,
  fontSize:     13,
  background:   T.bgDeep,
  border:       `1px solid ${T.border}`,
  borderRadius: 4,
  padding:      "7px 10px",
  color:        T.text,
  width:        "100%",
  boxSizing:    "border-box",
  outline:      "none",
};

// ── RatingSlider sub-component ─────────────────────────────────
function RatingSlider({ label, value, onChange, color = T.accent }) {
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          marginBottom:   4,
        }}
      >
        <label
          style={{
            fontFamily:    fontMono,
            fontSize:      11,
            color:         T.textLight,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {label}
        </label>
        <span
          style={{
            fontFamily: fontMono,
            fontSize:   13,
            fontWeight: "bold",
            color,
          }}
        >
          {value}/10
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: color }}
      />
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────

export default function LogForm({ durationMins, onSubmit, onCancel }) {
  const [topic,    setTopic]    = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [happiness, setHappiness] = useState(7);
  const [effort,   setEffort]   = useState(7);
  const [error,    setError]    = useState("");

  const handleSubmit = () => {
    // ── Validation ─────────────────────────────────────────────
    if (!topic.trim()) {
      setError("Topic is required.");
      return;
    }

    setError("");
    onSubmit({
      topic:     topic.trim(),
      subtopic:  subtopic.trim(),
      duration:  durationMins,
      happiness,
      effort,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── Duration display (read-only) ── */}
      <div
        style={{
          background:   T.bgDeep,
          border:       `1px solid ${T.border}`,
          borderRadius: 6,
          padding:      "10px 14px",
          display:      "flex",
          justifyContent: "space-between",
          alignItems:   "center",
        }}
      >
        <span style={{ fontFamily: fontMono, fontSize: 11, color: T.textLight, letterSpacing: 1 }}>
          SESSION DURATION
        </span>
        <span style={{ fontFamily: fontMono, fontSize: 18, fontWeight: "bold", color: T.text }}>
          {durationMins} min
        </span>
      </div>

      {/* ── Topic + Subtopic ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label
            style={{
              fontFamily:    fontMono,
              fontSize:      11,
              color:         T.textLight,
              letterSpacing: 1,
              textTransform: "uppercase",
              display:       "block",
              marginBottom:  4,
            }}
          >
            Topic *
          </label>
          <input
            style={{
              ...inputStyle,
              borderColor: error && !topic.trim() ? T.warn : T.border,
            }}
            value={topic}
            onChange={(e) => { setTopic(e.target.value); setError(""); }}
            placeholder="e.g. Data Structures"
            autoFocus
          />
        </div>

        <div>
          <label
            style={{
              fontFamily:    fontMono,
              fontSize:      11,
              color:         T.textLight,
              letterSpacing: 1,
              textTransform: "uppercase",
              display:       "block",
              marginBottom:  4,
            }}
          >
            Sub-topic
          </label>
          <input
            style={inputStyle}
            value={subtopic}
            onChange={(e) => setSubtopic(e.target.value)}
            placeholder="e.g. Binary Trees"
          />
        </div>
      </div>

      {/* ── Ratings ── */}
      <div style={{ display: "flex", gap: 20 }}>
        <RatingSlider
          label="Happiness"
          value={happiness}
          onChange={setHappiness}
          color={T.accent}
        />
        <RatingSlider
          label="Effort"
          value={effort}
          onChange={setEffort}
          color={T.warn}
        />
      </div>

      {/* ── Error message ── */}
      {error && (
        <div
          style={{
            fontFamily:   fontMono,
            fontSize:     11,
            color:        T.warn,
            background:   T.warnBg,
            border:       `1px solid ${T.warn}`,
            borderRadius: 4,
            padding:      "6px 10px",
          }}
        >
          {error}
        </div>
      )}

      {/* ── Actions ── */}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <VBtn onClick={onCancel}>Cancel</VBtn>
        <VBtn variant="primary" onClick={handleSubmit}>Save Log</VBtn>
      </div>
    </div>
  );
}