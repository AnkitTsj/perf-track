import { T, fontMono } from "../../styles/theme.js";

// Returns a color based on progress percentage
function autoColor(pct) {
  if (pct >= 80) return T.accent;
  if (pct >= 40) return T.gold;
  return T.warn;
}

export default function Gauge({ pct, label, sub = "", color, size = 104 }) {
  const displayPct = Math.min(Math.max(pct, 0), 100); // clamp 0–100
  const resolvedColor = color ?? autoColor(displayPct);

  // ── SVG circle math ──────────────────────────────────────────
  //  The circle sits centered in the viewBox.
  //  stroke-dasharray controls how much of the ring is filled.
  const cx = size / 2;
  const cy = size / 2;
  const radius     = size * 0.40;               // ring radius
  const strokeW    = size * 0.096;              // ring thickness
  const circumference = 2 * Math.PI * radius;
  const filledDash = (displayPct / 100) * circumference;

  return (
    <div
      style={{
        display:    "flex",
        flexDirection: "column",
        alignItems: "center",
        gap:        4,
      }}
    >
      {/* ── Ring SVG ── */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label={`${label}: ${Math.round(displayPct)}% complete`}
      >
        {/* Track (background ring) */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={T.bgDeep}
          strokeWidth={strokeW}
        />

        {/* Progress ring */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={resolvedColor}
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={`${filledDash} ${circumference}`}
          // Start from top (12 o'clock) instead of SVG default (3 o'clock)
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dasharray 0.5s ease" }}
        />

        {/* ── Center text ── */}
        {/* Percentage */}
        <text
          x={cx}
          y={cy - size * 0.06}
          textAnchor="middle"
          dominantBaseline="central"
          fill={T.text}
          fontFamily={fontMono}
          fontSize={size * 0.155}
          fontWeight="bold"
        >
          {Math.round(displayPct)}%
        </text>

        {/* Sub label (e.g. "/40h") */}
        {sub && (
          <text
            x={cx}
            y={cy + size * 0.115}
            textAnchor="middle"
            dominantBaseline="central"
            fill={T.textMuted}
            fontFamily={fontMono}
            fontSize={size * 0.087}
          >
            {sub}
          </text>
        )}
      </svg>

      {/* ── Label below ring ── */}
      <span
        style={{
          fontFamily:  fontMono,
          fontSize:    11,
          color:       T.textMuted,
          textAlign:   "center",
          maxWidth:    size,
          overflow:    "hidden",
          textOverflow: "ellipsis",
          whiteSpace:  "nowrap",
        }}
        title={label}
      >
        {label}
      </span>
    </div>
  );
}