import { T, fontMono } from "../styles/theme.js";

const TABS = [
  { id: "log",       label: "Log Session"  },
  { id: "goals",     label: "Goals"        },
  { id: "analytics", label: "Analytics"    },
  { id: "history",   label: "History"      },
];

export default function Nav({ activeTab, onTabChange }) {
  return (
    <nav
      style={{
        display:  "flex",
        gap:      6,
        flexWrap: "wrap",
        marginBottom: 18,
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              fontFamily:    fontMono,
              fontSize:      12,
              fontWeight:    "bold",
              letterSpacing: 0.5,
              padding:       "7px 16px",
              borderRadius:  6,
              cursor:        "pointer",
              outline:       "none",
              transition:    "all 0.1s",

              // Active vs inactive appearance
              border:     `2px solid ${isActive ? T.borderDark : T.border}`,
              background: isActive
                ? `linear-gradient(180deg, ${T.bgDeep} 0%, ${T.border} 100%)`
                : T.bgCard,
              color:      isActive ? T.text : T.textMuted,
              boxShadow:  isActive
                ? `inset 1px 1px 3px ${T.shadow}`
                : `1px 1px 0 ${T.borderDark}`,
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}