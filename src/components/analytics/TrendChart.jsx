import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { T, fontMono } from "../../styles/theme.js";
import { getLastNDays } from "../../utils/dateHelpers.js";
import { buildTrendData } from "../../utils/mathHelpers.js";

// ── Chart colors — one per topic line ─────────────────────────
const TOPIC_COLORS = [
  T.accent,   // olive green
  T.warn,     // terracotta
  T.gold,     // gold
  "#7a8ea8",  // muted blue
  "#a87878",  // muted rose
];

// ── Tooltip style ──────────────────────────────────────────────
const tooltipStyle = {
  background:   T.bgCard,
  border:       `1px solid ${T.border}`,
  borderRadius: 4,
  padding:      "6px 10px",
  fontFamily:   fontMono,
  fontSize:     11,
  color:        T.text,
};

export default function TrendChart({ logs, topTopics }) {
  const days = getLastNDays(7);

  const chartData = useMemo(
    () => buildTrendData(days, topTopics, logs),
    [logs, topTopics]
  );

  if (topTopics.length === 0) {
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
        Log sessions to see your subject trends.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart
        data={chartData}
        margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={T.border} />

        <XAxis
          dataKey="date"
          tick={{ fontFamily: fontMono, fontSize: 10, fill: T.textMuted }}
          axisLine={{ stroke: T.border }}
          tickLine={false}
        />

        <YAxis
          tick={{ fontFamily: fontMono, fontSize: 10, fill: T.textMuted }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip contentStyle={tooltipStyle} />

        <Legend
          wrapperStyle={{ fontFamily: fontMono, fontSize: 10, paddingTop: 8 }}
        />

        {topTopics.map((topic, i) => (
          <Area
            key={topic}
            type="monotone"
            dataKey={topic}
            stroke={TOPIC_COLORS[i % TOPIC_COLORS.length]}
            fill={TOPIC_COLORS[i % TOPIC_COLORS.length] + "30"}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}