// GitHub のライト／ダーク両方に置けるよう、背景は透明にして文字色だけを切り替える。
export const W = 880;

export type Theme = {
  name: "light" | "dark";
  fg: string;
  muted: string;
  faint: string;
  line: string;
  accent: string;
};

export const themes: Theme[] = [
  { name: "light", fg: "#1f2328", muted: "#59636e", faint: "#818b98", line: "#d1d9e0", accent: "#bc4c00" },
  { name: "dark", fg: "#f0f6fc", muted: "#9198a1", faint: "#656c76", line: "#3d444d", accent: "#f0883e" },
];

// class 名 → 埋め込むフォント。build.tsx がこの対応で文字を集めてサブセット化する。
export const css = `
.jb{font-family:'JP Bold',sans-serif}
.jm{font-family:'JP Medium',sans-serif}
.jr{font-family:'JP Regular',sans-serif}
.in{font-family:'Inter',sans-serif;font-weight:600}
.mo{font-family:'JetBrains Mono',monospace}
`;
