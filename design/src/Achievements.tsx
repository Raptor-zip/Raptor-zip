import { Frame, SectionTitle } from "./Frame.tsx";
import { c } from "./theme.ts";

const H = 560;

type Item = {
  big: string;
  bigSize: number;
  accent: string;
  tag: string;
  title: string;
  sub: string;
  detail: string;
};

const items: Item[] = [
  {
    big: "1st",
    bigSize: 84,
    accent: c.gold,
    tag: "2026 · WINNER",
    title: "DCON2026 優勝",
    sub: "高専ディープラーニングコンテスト（ビジコン）",
    detail: "企業評価額 5.6億円 · 下水管点検ロボット PipeEye",
  },
  {
    big: "2nd",
    bigSize: 84,
    accent: c.silver,
    tag: "2026 · RUNNER-UP",
    title: "自動運転AIチャレンジ2026 準優勝",
    sub: "End to End AI 部門",
    detail: "2D LiDAR だけで操舵する TinyLidarNet",
  },
  {
    big: "GOLD",
    bigSize: 62,
    accent: c.gold,
    tag: "2026 · AWARD",
    title: "STEAM JAPAN AWARD 2026 金賞",
    sub: "ほか 日産財団賞・アイデア賞",
    detail: "みちびき災危通報に連動する防災電源タップ",
  },
  {
    big: "’23–’26",
    bigSize: 50,
    accent: c.cyan,
    tag: "ROBOCON",
    title: "NHK高専ロボコン・学生ロボコン",
    sub: "ロボコン部 · 自律走行と制御ソフトウェア",
    detail: "学ロボ2026 ベスト9・特別賞 · 3D LiDAR 自律走行",
  },
];

const CW = 520;
const CH = 196;
const GX = 64;
const GY = 132;
const GAP = 32;

const css = `
.mono{font-family:'JetBrains Mono',monospace}
.jpk{font-family:'JP Black',sans-serif}
.jpb{font-family:'JP Bold',sans-serif}
.jpm{font-family:'JP Medium',sans-serif}
.run{stroke-dasharray:140 ${2 * (CW + CH)};animation:run 6s linear infinite}
@keyframes run{to{stroke-dashoffset:-${2 * (CW + CH) + 140}}}
.d1{animation-delay:-1.5s}.d2{animation-delay:-3s}.d3{animation-delay:-4.5s}
@media (prefers-reduced-motion:reduce){.run{animation:none;stroke-dasharray:none;stroke-opacity:.25}}
`;

function Card({ it, x, y, i }: { it: Item; x: number; y: number; i: number }) {
  const id = `g${i}`;
  return (
    <g transform={`translate(${x} ${y})`}>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={it.accent} stopOpacity="0.16" />
        <stop offset="0.55" stopColor={it.accent} stopOpacity="0" />
      </linearGradient>
      <rect width={CW} height={CH} rx="18" fill={c.panel} />
      <rect width={CW} height={CH} rx="18" fill={`url(#${id})`} />
      <rect width={CW} height={CH} rx="18" fill="none" stroke={c.line} strokeWidth="1.5" />
      <rect
        className={`run d${i}`}
        width={CW}
        height={CH}
        rx="18"
        fill="none"
        stroke={it.accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text x="30" y="70" className="jpk" fontSize={it.bigSize} fill={it.accent} dominantBaseline="middle">
        {it.big}
      </text>
      <text x={CW - 26} y="36" textAnchor="end" className="mono" fontSize="12.5" fill={c.dim} letterSpacing="2">
        {it.tag}
      </text>
      <text x="30" y="126" className="jpb" fontSize="23" fill={c.fg}>
        {it.title}
      </text>
      <text x="30" y="154" className="jpm" fontSize="15.5" fill={c.muted}>
        {it.sub}
      </text>
      <text x="30" y="178" className="jpm" fontSize="14" fill={c.dim}>
        {it.detail}
      </text>
    </g>
  );
}

export function Achievements() {
  return (
    <Frame h={H} css={css} label="実績：DCON2026 優勝（企業評価額5.6億円）、自動運転AIチャレンジ2026 準優勝（E2E部門）、STEAM JAPAN AWARD 2026 金賞、NHK高専ロボコン・学生ロボコン 2023–2026">
      <rect width="1200" height={H} fill="url(#grid)" opacity="0.6" />
      <SectionTitle x={GX} y={62} en="ACHIEVEMENTS" jp="実績" />
      {items.map((it, i) => (
        <Card key={i} it={it} i={i} x={GX + (i % 2) * (CW + GAP)} y={GY + Math.floor(i / 2) * (CH + GAP)} />
      ))}
    </Frame>
  );
}
