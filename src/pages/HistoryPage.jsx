
import { T, fontMono } from "../styles/theme.js";
import { Card } from "../components/ui/index.js";

// ── Table styles ───────────────────────────────────────────────
const thStyle = {
  fontFamily:    fontMono,
  fontSize:      10,
  color:         T.textLight,
  textTransform: "uppercase",
  letterSpacing: 1,
  padding:       "6px 10px",
  borderBottom:  `1px solid ${T.border}`,
  textAlign:     "left",
  whiteSpace:    "nowrap",
  background:    T.bgDeep,
};

const tdStyle = {
  fontFamily: fontMono,
  fontSize:   12,
  color:      T.text,
  padding:    "6px 10px",
  borderBottom: `1px solid ${T.bgDeep}`,
  whiteSpace: "nowrap",
};

// ── Happiness color coding ─────────────────────────────────────
function happinessColor(val) {
  if (val >= 8) return T.accent;
  if (val >= 5) return T.gold;
  return T.warn;
}

export default function HistoryPage({ logs, deleteLog }) {
  const sorted = [...logs].sort((a, b) => b.ts - a.ts);

  return (
    <Card title="Session History">
      {sorted.length === 0 ? (
        <div
          style={{
            fontFamily: fontMono,
            fontSize:   12,
            color:      T.textLight,
            textAlign:  "center",
            padding:    "24px 0",
          }}
        >
          No sessions logged yet.
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Topic</th>
                <th style={thStyle}>Sub-topic</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Mins</th>
                <th style={{ ...thStyle, textAlign: "center" }}>Happy!</th>
                <th style={{ ...thStyle, textAlign: "center" }}>Good</th>
                <th style={{ ...thStyle, textAlign: "center" }}></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((log, i) => (
                <tr
                  key={log.id}
                  style={{
                    background: i % 2 === 0 ? "transparent" : T.bgDeep,
                  }}
                >
                  <td style={{ ...tdStyle, color: T.textMuted }}>
                    {log.date}
                  </td>
                  <td style={{ ...tdStyle, fontWeight: "bold" }}>
                    {log.topic}
                  </td>
                  <td style={{ ...tdStyle, color: T.textMuted }}>
                    {log.subtopic || "—"}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    {log.duration}
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "center",
                      color: happinessColor(log.happiness),
                      fontWeight: "bold",
                    }}
                  >
                    {log.happiness}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    {log.effort}
                  </td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <button
                      onClick={() => deleteLog(log.id)}
                      title="Delete entry"
                      style={{
                        background: "none",
                        border:     "none",
                        cursor:     "pointer",
                        color:      T.textLight,
                        fontSize:   12,
                        padding:    "2px 4px",
                        borderRadius: 3,
                      }}
                      onMouseEnter={(e) => (e.target.style.color = T.warn)}
                      onMouseLeave={(e) => (e.target.style.color = T.textLight)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ── Footer summary ── */}
          <div
            style={{
              fontFamily: fontMono,
              fontSize:   10,
              color:      T.textLight,
              marginTop:  12,
              textAlign:  "right",
            }}
          >
            {sorted.length} session{sorted.length !== 1 ? "s" : ""} total
          </div>
        </div>
      )}
    </Card>
  );
}