import { useMemo } from "react";
import { T, fontMono } from "../../styles/theme.js";
import { getLast84Days } from "../../utils/dateHelpers.js";
import { buildHeatmapCounts } from "../../utils/mathHelpers.js";

// ── Color scale ────────────────────────────────────────────────
function heatColor(count, max) {
  if (count === 0)              return T.bgDeep;
  const ratio = count / max;
  if (ratio < 0.33)             return "#b8c898"; // light olive
  if (ratio < 0.66)             return "#8a9e5e"; // mid olive
  return T.accent;                                // full olive
}

// ── Day labels (Mon, Wed, Fri) ─────────────────────────────────
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function Heatmap({ logs }) {
  const days   = getLast84Days();
  const counts = useMemo(() => buildHeatmapCounts(logs), [logs]);
  const max    = Math.max(1, ...Object.values(counts));

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 2 }}>

        {/* ── Day-of-week labels column ── */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           2,
            marginRight:   4,
            justifyContent: "space-around",
          }}
        >
          {DAY_LABELS.map((label, i) => (
            <div
              key={i}
              style={{
                fontFamily: fontMono,
                fontSize:   8,
                color:      T.textLight,
                height:     12,
                lineHeight: "12px",
                textAlign:  "right",
                width:      22,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* ── Week columns ── */}
        {weeks.map((week, wi) => (
          <div
            key={wi}
            style={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {week.map((dateStr, di) => (
              <div
                key={di}
                title={`${dateStr}: ${counts[dateStr] || 0} log(s)`}
                style={{
                  width:        12,
                  height:       12,
                  borderRadius: 2,
                  background:   heatColor(counts[dateStr] || 0, max),
                  border:       `1px solid ${T.border}`,
                  cursor:       counts[dateStr] ? "default" : "default",
                  flexShrink:   0,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* ── Legend ── */}
      <div
        style={{
          display:     "flex",
          alignItems:  "center",
          gap:         6,
          marginTop:   10,
        }}
      >
        <span style={{ fontFamily: fontMono, fontSize: 9, color: T.textLight }}>
          Less
        </span>
        {[T.bgDeep, "#b8c898", "#8a9e5e", T.accent].map((color, i) => (
          <div
            key={i}
            style={{
              width:        10,
              height:       10,
              borderRadius: 2,
              background:   color,
              border:       `1px solid ${T.border}`,
            }}
          />
        ))}
        <span style={{ fontFamily: fontMono, fontSize: 9, color: T.textLight }}>
          More
        </span>
      </div>

      <div
        style={{
          fontFamily: fontMono,
          fontSize:   9,
          color:      T.textLight,
          marginTop:  4,
        }}
      >
        Each column = 1 week · Each cell = 1 day · Hover for count
      </div>
    </div>
  );
}