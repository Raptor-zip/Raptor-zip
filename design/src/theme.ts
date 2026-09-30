// GitHub のライト／ダーク両方に置けるよう、背景は透明にして文字色だけを切り替える。
export const W = 880;

export type Theme = {
  name: "light" | "dark";
  fg: string;
  muted: string;
  faint: string;
  line: string;
  accent: string;
  panel: string;
};

export const themes: Theme[] = [
  { name: "light", fg: "#1d252b", muted: "#62665f", faint: "#717468", line: "#deded4", accent: "#816126", panel: "#f7f6f0" },
  { name: "dark", fg: "#f3f1e9", muted: "#b5b6ac", faint: "#a4a697", line: "#393c35", accent: "#d2b47c", panel: "#1b211e" },
];

// class 名 → 埋め込むフォント。build.tsx がこの対応で文字を集めてサブセット化する。
export const css = `
.jd{font-family:'JP Display',serif;font-feature-settings:'palt';font-kerning:normal}
.ed{font-family:'Space Display','JP Regular',sans-serif;font-kerning:normal}
.en{font-family:'Space Text','JP Regular',sans-serif;font-kerning:normal}
.jb{font-family:'JP Bold',sans-serif}
.jm{font-family:'JP Medium',sans-serif}
.jr{font-family:'JP Regular',sans-serif}
.in{font-family:'Inter','JP Regular',sans-serif}
.mo{font-family:'JetBrains Mono','JP Regular',monospace;font-variant-numeric:tabular-nums}
`;
