
import { useState } from "react";
import { T, fontMono } from "../../styles/theme.js";

const VARIANTS = {
  default: {
    normal: {
      background: "linear-gradient(180deg, #ece8da 0%, #d8d2be 100%)",
      color:      T.text,
      borderColor: T.borderDark,
      boxShadow:  `2px 2px 0px ${T.borderDark}, inset 0 1px 0 #f5f2e8`,
    },
    pressed: {
      background: "linear-gradient(180deg, #d8d2be 0%, #ece8da 100%)",
      color:      T.text,
      borderColor: T.borderDark,
      boxShadow:  `inset 2px 2px 4px ${T.shadow}`,
    },
  },

  primary: {
    normal: {
      background:  "linear-gradient(180deg, #8a9e5e 0%, #5a6e38 100%)",
      color:       "#f0ede4",
      borderColor: "#3a4e20",
      boxShadow:   "2px 2px 0px #3a4e20, inset 0 1px 0 #a0b870",
    },
    pressed: {
      background:  "linear-gradient(180deg, #5a6e38 0%, #8a9e5e 100%)",
      color:       "#f0ede4",
      borderColor: "#3a4e20",
      boxShadow:   "inset 2px 2px 4px rgba(0,0,0,0.3)",
    },
  },

  danger: {
    normal: {
      background:  "linear-gradient(180deg, #c86040 0%, #903020 100%)",
      color:       "#f0ede4",
      borderColor: "#601810",
      boxShadow:   "2px 2px 0px #601810, inset 0 1px 0 #e08060",
    },
    pressed: {
      background:  "linear-gradient(180deg, #903020 0%, #c86040 100%)",
      color:       "#f0ede4",
      borderColor: "#601810",
      boxShadow:   "inset 2px 2px 4px rgba(0,0,0,0.3)",
    },
  },
};

// ── Component ──────────────────────────────────────────────────

export default function VBtn({
  children,
  onClick,
  disabled = false,
  variant = "default",
  style = {},
}) {
  const [pressed, setPressed] = useState(false);

  const variantStyles = VARIANTS[variant] ?? VARIANTS.default;
  const activeStyle   = pressed ? variantStyles.pressed : variantStyles.normal;

  const baseStyle = {
    // Typography
    fontFamily:    fontMono,
    fontSize:      13,
    fontWeight:    "bold",
    letterSpacing: 0.5,

    // Layout
    padding:       "7px 18px",
    display:       "inline-flex",
    alignItems:    "center",
    justifyContent: "center",
    gap:           6,

    // Shape
    border:        `2px solid ${activeStyle.borderColor}`,
    borderRadius:  6,

    // Interaction
    cursor:     disabled ? "not-allowed" : "pointer",
    outline:    "none",
    userSelect: "none",

    // State
    opacity:   disabled ? 0.45 : 1,
    transform: pressed && !disabled ? "translate(1px, 1px)" : "none",

    // Transitions
    transition: "transform 0.08s, box-shadow 0.08s",

    // Spread variant + any custom overrides
    ...activeStyle,
    ...style,
  };

  return (
    <button
      style={baseStyle}
      onClick={!disabled ? onClick : undefined}
      onMouseDown={() => { if (!disabled) setPressed(true); }}
      onMouseUp={()   => setPressed(false)}
      onMouseLeave={()=> setPressed(false)}
      onTouchStart={() => { if (!disabled) setPressed(true); }}
      onTouchEnd={()  => setPressed(false)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}