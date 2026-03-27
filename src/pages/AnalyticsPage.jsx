
import { T, fontMono } from "../styles/theme.js";
import { Card } from "../components/ui/index.js";
import {
  RollupStats,
  TrendChart,
  Heatmap,
  CorrelationScatter,
} from "../components/analytics/index.js";

export default function AnalyticsPage({ logs, topTopics }) {
  const hasLogs = logs.length > 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── Roll-up Stats ── */}
      <Card title="Time Roll-ups">
        <RollupStats logs={logs} />
      </Card>

      {/* ── Subject Trend ── */}
      <Card title="Subject Trend — last 7 days">
        {hasLogs ? (
          <TrendChart logs={logs} topTopics={topTopics} />
        ) : (
          <EmptyState />
        )}
      </Card>

      {/* ── Heatmap ── */}
      <Card title="Activity Heatmap — last 12 weeks">
        <Heatmap logs={logs} />
      </Card>

      {/* ── Correlation Scatter ── */}
      <Card title="Happiness vs Duration">
        {hasLogs ? (
          <CorrelationScatter logs={logs} />
        ) : (
          <EmptyState />
        )}
      </Card>
    </div>
  );
}

// ── Shared empty state ─────────────────────────────────────────
function EmptyState() {
  return (
    <div
      style={{
        fontFamily: fontMono,
        fontSize:   12,
        color:      T.textLight,
        textAlign:  "center",
        padding:    "24px 0",
      }}
    >
      Log your first session to see data here.
    </div>
  );
}