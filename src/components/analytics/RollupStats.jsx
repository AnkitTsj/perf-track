
import { useMemo } from "react";
import { T, fontMono } from "../../styles/theme.js";
import {
  dateKey,
  weekKey,
  monthKey,
  getLastNDays,
} from "../../utils/dateHelpers.js";
import {
  sumMins,
  logsForDay,
  logsForWeek,
  logsForMonth,
  minsToHours,
  continuityScore,
} from "../../utils/mathHelpers.js";

// ── StatBox sub-component ──────────────────────────────────────
function StatBox({ label, value, unit, highlight = false }) {
  return (
    <div
      style={{
        flex:         1,
        minWidth:     90,
        textAlign:    "center",
        padding:      "12px 8px",
        background:   highlight ? T.accentBg : T.bgDeep,
        borderRadius: 6,
        border:       `1px solid ${highlight ? T.accent : T.border}`,
      }}
    >
      <div
        style={{
          fontFamily: fontMono,
          fontSize:   22,
          fontWeight: "bold",
          color:      highlight ? T.accent : T.text,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {unit && (
        <div
          style={{
            fontFamily: fontMono,
            fontSize:   9,
            color:      highlight ? T.accent : T.textMuted,
            marginTop:  2,
            letterSpacing: 0.5,
          }}
        >
          {unit}
        </div>
      )}
      <div
        style={{
          fontFamily:    fontMono,
          fontSize:      9,
          color:         highlight ? T.accent : T.textLight,
          marginTop:     4,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────

export default function RollupStats({ logs }) {
  const stats = useMemo(() => {
    const today     = dateKey();
    const thisWeek  = weekKey();
    const thisMonth = monthKey();
    const last7Days = getLastNDays(7);

    // Daily totals for continuity score
    const dailyMins = last7Days.map((day) =>
      sumMins(logsForDay(logs, day))
    );

    return {
      todayMins:  sumMins(logsForDay(logs, today)),
      weekMins:   sumMins(logsForWeek(logs, thisWeek)),
      monthMins:  sumMins(logsForMonth(logs, thisMonth)),
      allMins:    sumMins(logs),
      continuity: continuityScore(dailyMins),
    };
  }, [logs]);

  return (
    <div
      style={{
        display:   "flex",
        gap:       10,
        flexWrap:  "wrap",
      }}
    >
      <StatBox
        label="Today"
        value={stats.todayMins}
        unit="min"
      />
      <StatBox
        label="This Week"
        value={stats.weekMins}
        unit="min"
      />
      <StatBox
        label="This Month"
        value={minsToHours(stats.monthMins)}
        unit="hrs"
      />
      <StatBox
        label="All Time"
        value={minsToHours(stats.allMins)}
        unit="hrs"
      />
      <StatBox
        label="Continuity"
        value={stats.continuity}
        unit="/ 10"
        highlight
      />
    </div>
  );
}