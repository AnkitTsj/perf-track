
import { T, fontMono } from "../styles/theme.js";
import { Card } from "../components/ui/index.js";
import { GoalForm, GoalCard } from "../components/goals/index.js";

export default function GoalsPage({
  goals,
  logs,
  addGoal,
  updateGoal,
  deleteGoal,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* ── Add Goal ── */}
      <Card title="Add Goal">
        <GoalForm onAdd={addGoal} />
      </Card>

      {/* ── Goal Cards ── */}
      <Card title="Active Goals">
        {goals.length === 0 ? (
          <div
            style={{
              fontFamily: fontMono,
              fontSize:   12,
              color:      T.textLight,
              textAlign:  "center",
              padding:    "24px 0",
            }}
          >
            No goals yet. Add one above.
          </div>
        ) : (
          <div
            style={{
              display:   "flex",
              flexWrap:  "wrap",
              gap:       16,
              justifyContent: "flex-start",
            }}
          >
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                logs={logs}
                onUpdate={updateGoal}
                onDelete={deleteGoal}
              />
            ))}
          </div>
        )}
      </Card>

      {/* ── Tip ── */}
      <div
        style={{
          fontFamily: fontMono,
          fontSize:   10,
          color:      T.textLight,
          padding:    "0 4px",
          lineHeight: 1.8,
        }}
      >
        <div>· Hours goals are auto-tracked — topic name must match your log entries</div>
        <div>· Pages / Topics goals are updated manually with the +/- buttons</div>
      </div>
    </div>
  );
}