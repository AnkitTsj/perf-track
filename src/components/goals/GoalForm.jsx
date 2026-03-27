import { useState } from "react";
import { T, fontMono } from "../../styles/theme.js";
import { VBtn } from "../ui/index.js";

const METRICS = [
  { value: "time",   label: "Hours",  hint: "auto-tracked from logs" },
  { value: "pages",  label: "Pages",  hint: "manually updated" },
  { value: "topics", label: "Topics", hint: "manually updated" },
];

const inputStyle = {
  fontFamily:   fontMono,
  fontSize:     12,
  background:   T.bgDeep,
  border:       `1px solid ${T.border}`,
  borderRadius: 4,
  padding:      "6px 10px",
  color:        T.text,
  outline:      "none",
};

export default function GoalForm({ onAdd }) {
  const [name,   setName]   = useState("");
  const [metric, setMetric] = useState("time");
  const [target, setTarget] = useState("");
  const [error,  setError]  = useState("");

  const selectedMetric = METRICS.find((m) => m.value === metric);

  const handleAdd = () => {
    if (!name.trim())        { setError("Goal name is required."); return; }
    if (!target || +target <= 0) { setError("Target must be a positive number."); return; }

    setError("");
    onAdd({ name: name.trim(), metric, target: +target });

    // Reset form
    setName("");
    setTarget("");
    setMetric("time");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* ── Row 1: Name + Target + Metric ── */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>

        {/* Name */}
        <div style={{ flex: 3, minWidth: 140 }}>
          <label style={{ fontFamily: fontMono, fontSize: 10, color: T.textLight, letterSpacing: 1, display: "block", marginBottom: 3 }}>
            GOAL NAME *
          </label>
          <input
            style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }}
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            placeholder="e.g. Complete DSA"
          />
        </div>

        {/* Target */}
        <div style={{ flex: 1, minWidth: 80 }}>
          <label style={{ fontFamily: fontMono, fontSize: 10, color: T.textLight, letterSpacing: 1, display: "block", marginBottom: 3 }}>
            TARGET *
          </label>
          <input
            style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }}
            type="number"
            min={1}
            value={target}
            onChange={(e) => { setTarget(e.target.value); setError(""); }}
            placeholder="e.g. 40"
          />
        </div>

        {/* Metric */}
        <div style={{ flex: 1, minWidth: 100 }}>
          <label style={{ fontFamily: fontMono, fontSize: 10, color: T.textLight, letterSpacing: 1, display: "block", marginBottom: 3 }}>
            UNIT
          </label>
          <select
            style={{ ...inputStyle, width: "100%", boxSizing: "border-box", cursor: "pointer" }}
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
          >
            {METRICS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <VBtn variant="primary" onClick={handleAdd}>
          + Add Goal
        </VBtn>
      </div>

      {/* ── Metric hint ── */}
      <div style={{ fontFamily: fontMono, fontSize: 10, color: T.textLight }}>
        {selectedMetric.label} goal — {selectedMetric.hint}
      </div>

      {/* ── Error ── */}
      {error && (
        <div style={{ fontFamily: fontMono, fontSize: 11, color: T.warn }}>
          {error}
        </div>
      )}
    </div>
  );
}