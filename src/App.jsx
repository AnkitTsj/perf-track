
import { useState } from "react";
import { T, fontMono, fontSerif } from "./styles/theme.js";
import { useLogs }  from "./hooks/useLogs.js";
import { useGoals } from "./hooks/useGoals.js";
import { minsToHours, sumMins } from "./utils/mathHelpers.js";

import Nav           from "./components/Nav.jsx";
import { VBtn }      from "./components/ui/index.js";
import LogPage       from "./pages/LogPage.jsx";
import GoalsPage     from "./pages/GoalsPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import HistoryPage   from "./pages/HistoryPage.jsx";

export default function App() {
  const [activeTab, setActiveTab] = useState("log");

  // ── Data hooks ───────────────────────────────────────────────
  const {
    logs,
    addLog,
    deleteLog,
    clearAllLogs,
    topTopics,
  } = useLogs();

  const {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
  } = useGoals();

  // ── After logging a session, jump to analytics ───────────────
  const handleAddLog = (entry) => {
    addLog(entry);
    setActiveTab("analytics");
  };

  // ── Render active page ────────────────────────────────────────
  const renderPage = () => {
    switch (activeTab) {
      case "log":
        return <LogPage addLog={handleAddLog} />;
      case "goals":
        return (
          <GoalsPage
            goals={goals}
            logs={logs}
            addGoal={addGoal}
            updateGoal={updateGoal}
            deleteGoal={deleteGoal}
          />
        );
      case "analytics":
        return <AnalyticsPage logs={logs} topTopics={topTopics} />;
      case "history":
        return <HistoryPage logs={logs} deleteLog={deleteLog} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight:  "100vh",
        background: T.bg,
        padding:    "24px 16px 48px",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* ── Header ── */}
        <header
          style={{
            marginBottom:   20,
            paddingBottom:  14,
            borderBottom:   `2px solid ${T.borderDark}`,
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "flex-end",
          }}
        >
          {/* Logo + subtitle */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontFamily:    fontSerif,
                  fontSize:      30,
                  fontWeight:    "bold",
                  color:         T.text,
                  letterSpacing: -1,
                }}
              >
                APEX
              </span>
              <span
                style={{
                  fontFamily:    fontMono,
                  fontSize:      11,
                  color:         T.textLight,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}
              >
                Performance Engine
              </span>
            </div>

            {/* Live session counter */}
            <div
              style={{
                fontFamily: fontMono,
                fontSize:   10,
                color:      T.textLight,
                marginTop:  2,
              }}
            >
              {logs.length} session{logs.length !== 1 ? "s" : ""} ·{" "}
              {minsToHours(sumMins(logs))} hrs total ·{" "}
              {goals.length} active goal{goals.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Clear all logs button */}
          <VBtn
            variant="danger"
            style={{ fontSize: 10, padding: "4px 10px" }}
            onClick={() => {
              if (window.confirm("Delete all session logs? This cannot be undone.")) {
                clearAllLogs();
              }
            }}
          >
            Clear Logs
          </VBtn>
        </header>

        {/* ── Navigation ── */}
        <Nav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ── Active page ── */}
        <main>{renderPage()}</main>

        {/* ── Footer ── */}
        <footer
          style={{
            marginTop:     24,
            paddingTop:    10,
            borderTop:     `1px solid ${T.border}`,
            fontFamily:    fontMono,
            fontSize:      9,
            color:         T.textLight,
            textAlign:     "center",
            letterSpacing: 1,
          }}
        >
          DATA STORED LOCALLY IN YOUR BROWSER · EXPORT TO SUPABASE WHEN READY
        </footer>
      </div>
    </div>
  );
}