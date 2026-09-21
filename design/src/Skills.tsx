import type { ReactNode } from "react";
import { Frame, SectionTitle } from "./Frame.tsx";
import { c } from "./theme.ts";

const H = 470;

// 48×48 の線画アイコン。
const icons: Record<string, ReactNode> = {
  robot: (
    <>
      <rect x="9" y="15" width="30" height="22" rx="6" />
      <circle cx="18" cy="26" r="3" />
      <circle cx="30" cy="26" r="3" />
      <path d="M24 15V8M20 8h8M5 24v6M43 24v6M15 37v5M33 37v5" />
    </>
  ),
  arm: (
    <>
      <path d="M8 42h18M12 42v-6h10v6" />
      <circle cx="17" cy="33" r="3" />
      <path d="M17 33L27 17L38 22" />
      <circle cx="27" cy="17" r="3" />
      <path d="M38 22l5-5M38 22l5 5" />
    </>
  ),
  ros: (
    <>
      {[12, 24, 36].flatMap((x) => [12, 24, 36].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r={x === 24 && y === 24 ? 4.5 : 3.2} />))}
    </>
  ),
  vision: (
    <>
      <path d="M4 24C10 13 17 9 24 9s14 4 20 15c-6 11-13 15-20 15S10 35 4 24Z" />
      <circle cx="24" cy="24" r="7" />
      <path d="M6 6h7M6 6v7M42 6h-7M42 6v7M6 42h7M6 42v-7M42 42h-7M42 42v-7" />
    </>
  ),
  cloud: (
    <>
      <path d="M8 16l16-8 16 8v18l-16 8-16-8Z" strokeOpacity="0.45" />
      {[
        [14, 19], [20, 14], [28, 13], [34, 19], [24, 22], [16, 28], [22, 31], [31, 27], [27, 36], [35, 31], [19, 37], [12, 24],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" style={{ fill: "currentColor", stroke: "none" }} />
      ))}
    </>
  ),
  app: (
    <>
      <rect x="4" y="8" width="28" height="22" rx="3" />
      <path d="M4 14h28" />
      <rect x="28" y="18" width="16" height="26" rx="3" />
      <path d="M34 40h4M10 36h12" />
    </>
  ),
  printer: (
    <>
      <path d="M6 6h36M6 6v36M42 6v36M6 42h36" strokeOpacity="0.5" />
      <path d="M16 12h16v6H16Z" />
      <path d="M24 18v5l-2 3h4l-2-3" />
      <path d="M13 38h22M15 34h18M17 30h14" />
    </>
  ),
};

type Skill = { icon: keyof typeof icons; jp: string; en: string; accent: string };

const row1: Skill[] = [
  { icon: "robot", jp: "自律ロボット", en: "Autonomous robots", accent: c.cyan },
  { icon: "arm", jp: "ロボットアーム", en: "Manipulators", accent: c.violet },
  { icon: "ros", jp: "ROS 2", en: "Robot middleware", accent: c.mint },
  { icon: "vision", jp: "画像処理", en: "Computer vision", accent: c.gold },
];
const row2: Skill[] = [
  { icon: "cloud", jp: "点群処理", en: "Point cloud · SLAM", accent: c.cyan },
  { icon: "app", jp: "アプリ開発", en: "Web · XR · Android", accent: c.violet },
  { icon: "printer", jp: "3Dプリンター", en: "Digital fabrication", accent: c.mint },
];

const css = `
.mono{font-family:'JetBrains Mono',monospace}
.jpb{font-family:'JP Bold',sans-serif}
.jpm{font-family:'JP Medium',sans-serif}
.ic{fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.ic circle{fill:none}
.halo{animation:halo 3.2s ease-in-out infinite}
@keyframes halo{0%,100%{opacity:.10}50%{opacity:.28}}
@media (prefers-reduced-motion:reduce){.halo{animation:none}}
`;

function Tile({ s, x, y, w, i }: { s: Skill; x: number; y: number; w: number; i: number }) {
  const h = 128;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="16" fill={c.panel} stroke={c.line} strokeWidth="1.5" />
      <circle className="halo" cx="50" cy="64" r="32" fill={s.accent} style={{ animationDelay: `${-i * 0.45}s` }} />
      <g className="ic" color={s.accent} transform="translate(26 40)">
        {icons[s.icon]}
      </g>
      <text x="94" y="60" className="jpb" fontSize="20" fill={c.fg}>
        {s.jp}
      </text>
      <text x="94" y="88" className="mono" fontSize="13" fill={c.muted}>
        {s.en}
      </text>
    </g>
  );
}

export function Skills() {
  const x0 = 64;
  const inner = 1200 - x0 * 2;
  const gap = 20;
  const w1 = (inner - gap * 3) / 4;
  const w2 = (inner - gap * 2) / 3;
  return (
    <Frame h={H} css={css} label="スキル：自律ロボット、ロボットアーム、ROS 2、画像処理、点群処理、アプリ開発（Web・XR・Android）、3Dプリンター">
      <rect width="1200" height={H} fill="url(#grid)" opacity="0.6" />
      <SectionTitle x={x0} y={62} en="SKILLS" jp="できること" />
      {row1.map((s, i) => (
        <Tile key={s.jp} s={s} i={i} x={x0 + i * (w1 + gap)} y={138} w={w1} />
      ))}
      {row2.map((s, i) => (
        <Tile key={s.jp} s={s} i={i + 4} x={x0 + i * (w2 + gap)} y={138 + 128 + gap} w={w2} />
      ))}
    </Frame>
  );
}
