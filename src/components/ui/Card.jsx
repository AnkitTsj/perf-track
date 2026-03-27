import { T, fontMono } from "../../styles/theme.js";

export default function Card({ children, title, style = {}, bodyStyle = {} }) {
  return (
    <div
      style={{
        background:   T.bgCard,
        border:       `1px solid ${T.border}`,
        borderRadius: 8,
        boxShadow:    `2px 2px 0 ${T.borderDark}`,
        overflow:     "hidden",
        ...style,
      }}
    >
      {/* ── Header (only rendered if title is provided) ── */}
      {title && (
        <div
          style={{
            fontFamily:      fontMono,
            fontSize:        11,
            fontWeight:      "bold",
            letterSpacing:   2,
            color:           T.textLight,
            textTransform:   "uppercase",
            padding:         "10px 20px",
            borderBottom:    `1px solid ${T.border}`,
            background:      T.bgDeep,
            // Slight inset feel for the header strip
            boxShadow:       `inset 0 -1px 0 ${T.border}`,
          }}
        >
          {title}
        </div>
      )}

      {/* ── Body ── */}
      <div
        style={{
          padding: "16px 20px",
          ...bodyStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}