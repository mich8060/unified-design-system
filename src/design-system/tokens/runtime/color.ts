import type { CssVarMap, TokenCategory } from "./types.js";

type Tone11 = "25" | "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "1000";
type Tone10 = Exclude<Tone11, "1000">;

type Scale11 = Record<Tone11, string>;
type Scale10 = Record<Tone10, string>;

const scale11 = (values: readonly [string, string, string, string, string, string, string, string, string, string, string, string]): Scale11 => ({
  "25": values[0],
  "50": values[1],
  "100": values[2],
  "200": values[3],
  "300": values[4],
  "400": values[5],
  "500": values[6],
  "600": values[7],
  "700": values[8],
  "800": values[9],
  "900": values[10],
  "1000": values[11],
});

const scale10 = (values: readonly [string, string, string, string, string, string, string, string, string, string, string]): Scale10 => ({
  "25": values[0],
  "50": values[1],
  "100": values[2],
  "200": values[3],
  "300": values[4],
  "400": values[5],
  "500": values[6],
  "600": values[7],
  "700": values[8],
  "800": values[9],
  "900": values[10],
});

export const colorTokens = {
  system: {
    black: "#111111",
    white: "#ffffff",
    transparent: "rgba(255, 255, 255, 0.0099999998)",
  },
  neutrals: scale11(["#fafbfc", "#f9fafc", "#f3f4f6", "#e6e7eb", "#d2d5dc", "#9ca2ae", "#6b7380", "#4c5564", "#384152", "#202938", "#111828", "#0d1320"]),
  brand: {
    primary: scale10(["#f2fafd", "#e3f5fa", "#aee0f4", "#78cbec", "#41b7e5", "#00a7e1", "#009add", "#008dcf", "#0c6bb0", "#006aa8", "#004b88"]),
    secondary: scale10(["#fefbf5", "#fef8ee", "#feefd6", "#fbdcad", "#f9c278", "#f59e42", "#f2821f", "#e36613", "#bc4d12", "#963e16", "#793515"]),
    tertiary: scale10(["#eff2f5", "#e6ebf0", "#bfcddb", "#97adc3", "#708caa", "#4f7499", "#295d8b", "#215583", "#174b77", "#12416b", "#0f3152"]),
    quaternary: scale10(["#fefdf6", "#fdfbed", "#f8f3cb", "#f1e796", "#ead55f", "#f8ca10", "#fbb03a", "#c3841c", "#a26e1b", "#845c1c", "#6d4d1a"]),
  },
  accent: {
    amber: scale11(["#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbc02d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f", "#5f2a09"]),
    aqua: scale11(["#f0fdfa", "#ccfbf1", "#99f6e4", "#5eead4", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a", "#0f3a37", "#0a2e2c"]),
    blue: scale11(["#f2f7ff", "#eff6ff", "#dbeaff", "#bfdcfe", "#93c4fc", "#61a5fa", "#3b82f6", "#2563ec", "#1d4ed7", "#1f41af", "#1f3a8b", "#182e6f"]),
    cyan: scale11(["#effeff", "#ecfeff", "#cffbfe", "#a5f3fd", "#66e8f8", "#21d3ed", "#07b6d5", "#0891b3", "#0f7490", "#165e76", "#164f63", "#113f4f"]),
    emerald: scale11(["#effdf7", "#ecfdf5", "#d0fae4", "#a7f3cf", "#6de7b6", "#34d399", "#10b982", "#05976a", "#057857", "#075f47", "#064d3b", "#043d2f"]),
    fuchsia: scale11(["#fef6ff", "#fef4ff", "#fae8fe", "#f5cffe", "#f0abfc", "#e879f9", "#d946ef", "#c026d4", "#a21caf", "#861990", "#701a75", "#59145d"]),
    green: scale11(["#f3fdf6", "#f0fdf4", "#dcfce7", "#bbf7d1", "#86efac", "#4ade80", "#23c55e", "#17a34a", "#157f3d", "#176535", "#15532e", "#104224"]),
    indigo: scale11(["#f1f4fe", "#eef2fe", "#e1e7ff", "#c7d2ff", "#a6b4fd", "#818cf8", "#6366f1", "#5046e5", "#4438ca", "#3730a2", "#312d81", "#272467"]),
    lime: scale11(["#f7feeb", "#f6fee7", "#ecfccb", "#daf99c", "#bef164", "#a3e636", "#83cc16", "#64a30e", "#5a8720", "#3f6212", "#365313", "#2b420f"]),
    magenta: scale11(["#fff5fb", "#fdf2f8", "#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d", "#831843", "#6b1235"]),
    orange: scale11(["#fffbf7", "#fffaf5", "#fff6ed", "#ffead5", "#fddcab", "#feb273", "#fd853a", "#fb6514", "#ec4a0a", "#9c2a10", "#7e2410", "#641c0c"]),
    purple: scale11(["#fbf7ff", "#fbf5ff", "#f4e8fe", "#ead5fe", "#d8b4fe", "#c085fd", "#a755f7", "#9334ea", "#7e22cf", "#6b22a8", "#571c86", "#45166b"]),
    red: scale11(["#fef4f4", "#fef2f2", "#fee2e1", "#fecbca", "#fda5a4", "#f87070", "#f04444", "#dc2625", "#ba1c1d", "#991b1c", "#7f1d1e", "#651718"]),
    rose: scale11(["#fff3f3", "#fff1f1", "#fee4e7", "#fecdd3", "#fea4b0", "#fb7286", "#f43f5e", "#e21d48", "#be113c", "#9f133a", "#891336", "#6d0f2b"]),
    sky: scale11(["#f3faff", "#f0f9ff", "#e0f2fe", "#bae7fe", "#7ed3fc", "#38bdf8", "#0ea5ea", "#0384c6", "#0469a1", "#075a86", "#0c4a6f", "#0c4a6f"]),
    violet: scale11(["#f7f5ff", "#f5f3ff", "#edeaff", "#ddd6ff", "#c5b5fe", "#a78bfa", "#8b5cf6", "#7d3aec", "#6d28d9", "#5b20b6", "#4d1d95", "#3d1777"]),
    yellow: scale11(["#fefcec", "#fefce8", "#fef9c3", "#fef08a", "#fde047", "#facc15", "#e9b308", "#ca8a04", "#a26208", "#854e0e", "#723f12", "#5b320e"]),
  },
} as const;

const rootVars: CssVarMap = {
  "--system-color-black": colorTokens.system.black,
  "--system-color-white": colorTokens.system.white,
  "--system-color-transparent": colorTokens.system.transparent,
};

for (const [tone, value] of Object.entries(colorTokens.neutrals)) {
    rootVars[`--system-color-neutrals-${tone}` as `--${string}`] = value;
}
for (const [family, tones] of Object.entries(colorTokens.brand)) {
  for (const [tone, value] of Object.entries(tones)) {
    rootVars[`--system-color-${family}-${tone}` as `--${string}`] = value;
  }
}
for (const [family, tones] of Object.entries(colorTokens.accent)) {
  for (const [tone, value] of Object.entries(tones)) {
    rootVars[`--system-color-accent-${family}-${tone}` as `--${string}`] = value;
  }
}

export const colorCategory: TokenCategory = {
  cssVars: rootVars,
};
