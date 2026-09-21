// 3枚の SVG で共有する色・フォント・寸法。
export const W = 1200;

export const c = {
  bg: "#070b14",
  panel: "#0d1422",
  panelHi: "#121b2d",
  line: "#1c2940",
  fg: "#e8eef9",
  muted: "#8a96ad",
  dim: "#56627a",
  cyan: "#38e1ff",
  violet: "#8b7cff",
  gold: "#f5c451",
  silver: "#b9c6e4",
  mint: "#4fe3a1",
} as const;

export const f = {
  jpBlack: "'JP Black'",
  jpBold: "'JP Bold'",
  jpMed: "'JP Medium'",
  display: "'Space Grotesk'",
  mono: "'JetBrains Mono'",
} as const;

// 決まった値を返す乱数（ビルドごとに点群が変わらないように）。
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}
