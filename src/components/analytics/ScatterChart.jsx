
import { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { T, fontMono } from "../../styles/theme.js";
import { buildScatterData } from "../../utils/mathHelpers.js";

// ── Custom tooltip ─────────────────────────────────────────────
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { x, y, effort } = payload[0].payload;
  return (
    <div
      style={{
        background:   T.bgCard,
        border:       `1px solid ${T.border}`,
        borderRadius: 4,
        padding:      "6px 10px",
        fontFamily:   fontMono,
        fontSize:     11,
        color:        T.text,
      }}
    >
      <div>Duration: <strong>{x} min</strong></div>
      <div>Happiness: <strong>{y}/10</strong></div>
      <div>Effort: <strong>{effort}/10</strong></div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────

export default function CorrelationScatter({ logs }) {
  const data = useMemo(() => buildScatterData(logs), [logs]);

  if (data.length < 2) {
    return (
      <div
        style={{
          fontFamily: fontMono,
          fontSize:   12,
          color:      T.textLight,
          textAlign:  "center",
          padding:    "30px 0",
        }}
      >
        Log at least 2 sessions to see the correlation chart.
      </div>
    );
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <ScatterChart margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={T.border} />

          <XAxis
            dataKey="x"
            name="Duration"
            type="number"
            tick={{ fontFamily: fontMono, fontSize: 10, fill: T.textMuted }}
            label={{
              value:    "Duration (min)",
              position: "insideBottom",
              offset:   -2,
              fill:     T.textLight,
              fontSize: 9,
              fontFamily: fontMono,
            }}
            axisLine={{ stroke: T.border }}
            tickLine={false}
          />

          <YAxis
            dataKey="y"
            name="Happiness"
            type="number"
            domain={[1, 10]}
            tick={{ fontFamily: fontMono, fontSize: 10, fill: T.textMuted }}
            axisLine={false}
            tickLine={false}
          />

          {/* Midpoint reference lines to show quadrants */}
          <ReferenceLine
            y={5.5}
            stroke={T.border}
            strokeDasharray="4 3"
          />

          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />

          <Scatter
            data={data}
            fill={T.accent}
            fillOpacity={0.7}
            r={5}
          />
        </ScatterChart>
      </ResponsiveContainer>

      {/* ── Quadrant labels ── */}
      <div
        style={{
          display:       "flex",
          justifyContent: "space-between",
          fontFamily:    fontMono,
          fontSize:      9,
          color:         T.textLight,
          marginTop:     4,
          paddingLeft:   30,
        }}
      >
        <span>Short sessions →</span>
        <span style={{ color: T.warn }}>⚠ bottom-right = burnout zone</span>
        <span style={{ color: T.accent }}>✓ top-right = peak flow</span>
      </div>
    </div>
  );
}