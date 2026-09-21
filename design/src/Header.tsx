import { Frame } from "./Frame.tsx";
import { c, rng } from "./theme.ts";

const H = 420;
const CX = 915;
const CY = 215;
const RANGE = 200;
const PERIOD = 4; // 1回転の秒数
const BUCKETS = 36;

type Seg = [number, number, number, number];

// 部屋の壁と障害物（中心からの相対座標）。LiDAR の光線をここに当てて点群を作る。
function box(x: number, y: number, w: number, h: number): Seg[] {
  return [
    [x, y, x + w, y],
    [x + w, y, x + w, y + h],
    [x + w, y + h, x, y + h],
    [x, y + h, x, y],
  ];
}
const walls: Seg[] = [
  [-250, -160, 120, -160],
  [120, -160, 250, -100],
  [250, -100, 250, 150],
  [250, 150, -250, 150],
  [-250, 150, -250, -160],
  ...box(70, -85, 56, 40),
  ...box(-150, 40, 34, 70),
  ...box(-40, -150, 70, 26),
  ...box(120, 70, 30, 30),
];
const pillars: [number, number, number][] = [
  [-120, -60, 18],
  [40, 110, 14],
];

function cast(a: number): number {
  const dx = Math.cos(a);
  const dy = Math.sin(a);
  let best = Infinity;
  for (const [x1, y1, x2, y2] of walls) {
    const ex = x2 - x1;
    const ey = y2 - y1;
    const den = dx * ey - dy * ex;
    if (Math.abs(den) < 1e-9) continue;
    const t = (x1 * ey - y1 * ex) / den;
    const u = (x1 * dy - y1 * dx) / den;
    if (t > 0 && u >= 0 && u <= 1) best = Math.min(best, t);
  }
  for (const [px, py, r] of pillars) {
    const b = px * dx + py * dy;
    const disc = b * b - (px * px + py * py - r * r);
    if (disc >= 0) {
      const t = b - Math.sqrt(disc);
      if (t > 0) best = Math.min(best, t);
    }
  }
  return best;
}

function cloud() {
  const rand = rng(7);
  const pts: { x: number; y: number; b: number; near: number }[] = [];
  const N = 900;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const t = cast(a);
    if (!isFinite(t) || t > RANGE * 1.35) continue;
    const n = (rand() - 0.5) * 3;
    const x = CX + Math.cos(a) * (t + n);
    const y = CY + Math.sin(a) * (t + n);
    if (x > 1188 || y < 12 || y > H - 12) continue;
    const deg = ((a * 180) / Math.PI + 360) % 360;
    pts.push({ x, y, b: Math.floor((deg / 360) * BUCKETS) % BUCKETS, near: t / (RANGE * 1.35) });
  }
  return pts;
}

// スイープの扇（後ろほど薄い）を細い扇の重ね合わせで作る。
function sweep() {
  const slices = 16;
  const span = 48;
  return Array.from({ length: slices }, (_, i) => {
    const a0 = ((-span + (span / slices) * i) * Math.PI) / 180;
    const a1 = ((-span + (span / slices) * (i + 1)) * Math.PI) / 180;
    const r = RANGE * 1.4;
    const d = `M${CX} ${CY}L${CX + Math.cos(a0) * r} ${CY + Math.sin(a0) * r}A${r} ${r} 0 0 1 ${CX + Math.cos(a1) * r} ${CY + Math.sin(a1) * r}Z`;
    return <path key={i} d={d} fill={c.cyan} opacity={((i + 1) / slices) ** 2 * 0.22} />;
  });
}

const bucketCss = Array.from({ length: BUCKETS }, (_, b) => {
  const delay = ((b + 0.5) / BUCKETS) * PERIOD - PERIOD;
  return `.b${b}{animation-delay:${delay.toFixed(3)}s}`;
}).join("");

const css = `
.mono{font-family:'JetBrains Mono',monospace}
.disp{font-family:'Space Grotesk',sans-serif;font-weight:700}
.jpk{font-family:'JP Black',sans-serif}
.jpb{font-family:'JP Bold',sans-serif}
.jpm{font-family:'JP Medium',sans-serif}
.sweep{transform-origin:${CX}px ${CY}px;animation:spin ${PERIOD}s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.pt{animation:glow ${PERIOD}s linear infinite}
@keyframes glow{0%{opacity:1}55%{opacity:.22}100%{opacity:.22}}
${bucketCss}
.caret{animation:blink 1.1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.pulse{transform-origin:${CX}px ${CY}px;animation:pulse 2.4s ease-out infinite}
@keyframes pulse{0%{transform:scale(.2);opacity:.9}100%{transform:scale(1.6);opacity:0}}
@media (prefers-reduced-motion:reduce){.sweep,.pt,.caret,.pulse{animation:none}}
`;

export function Header() {
  const pts = cloud();
  return (
    <Frame h={H} css={css} label="貝淵 蒼馬 / Kaibuchi Souma — 豊田高専 電気・電子システム工学科 4年。自律ロボット・ロボットアーム・ROS 2・画像処理・点群処理">
      <radialGradient id="glowR" cx={CX} cy={CY} r="330" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor={c.cyan} stopOpacity="0.16" />
        <stop offset="1" stopColor={c.cyan} stopOpacity="0" />
      </radialGradient>
      <radialGradient id="glowL" cx="120" cy="40" r="520" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor={c.violet} stopOpacity="0.20" />
        <stop offset="1" stopColor={c.violet} stopOpacity="0" />
      </radialGradient>
      <rect width="1200" height={H} fill="url(#grid)" />
      <rect width="1200" height={H} fill="url(#glowL)" />
      <rect width="1200" height={H} fill="url(#glowR)" />

      {/* LiDAR */}
      {[60, 120, 180, 240].map((r) => (
        <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke={c.cyan} strokeOpacity="0.14" strokeDasharray="2 6" />
      ))}
      <line x1={CX - 260} y1={CY} x2={CX + 260} y2={CY} stroke={c.cyan} strokeOpacity="0.1" />
      <line x1={CX} y1={CY - 200} x2={CX} y2={CY + 200} stroke={c.cyan} strokeOpacity="0.1" />
      <g className="sweep">{sweep()}</g>
      <g>
        {pts.map((p, i) => (
          <circle
            key={i}
            className={`pt b${p.b}`}
            cx={p.x.toFixed(1)}
            cy={p.y.toFixed(1)}
            r={p.near < 0.5 ? 2.1 : 1.7}
            fill={p.near < 0.45 ? c.cyan : p.near < 0.75 ? "#7fb8ff" : c.violet}
          />
        ))}
      </g>
      <circle className="pulse" cx={CX} cy={CY} r="26" fill="none" stroke={c.cyan} strokeWidth="1.5" />
      <g transform={`translate(${CX} ${CY})`}>
        <rect x="-15" y="-10" width="30" height="20" rx="5" fill={c.panelHi} stroke={c.cyan} strokeWidth="2" />
        <path d="M-4 -5L7 0L-4 5Z" fill={c.cyan} />
      </g>
      <text x="1170" y="400" textAnchor="end" className="mono" fontSize="13" fill={c.dim} letterSpacing="1">
        LIDAR SCAN · SLAM · ROS 2
      </text>

      {/* 名前 */}
      <text x="72" y="92" className="mono" fontSize="16" fill={c.cyan} letterSpacing="3">
        {"// PHYSICAL AI · ROBOTICS"}
      </text>
      <text x="68" y="190" className="jpk" fontSize="92" fill={c.fg} letterSpacing="4">
        貝淵 蒼馬
      </text>
      <text x="74" y="240" className="disp" fontSize="30" fill={c.muted} letterSpacing="9">
        KAIBUCHI SOUMA
      </text>
      <rect x="74" y="272" width="56" height="4" rx="2" fill={c.cyan} />
      <rect x="136" y="272" width="18" height="4" rx="2" fill={c.violet} />
      <text x="74" y="318" className="jpm" fontSize="21" fill={c.fg}>
        豊田工業高等専門学校　電気・電子システム工学科 4年
      </text>
      <text x="74" y="356" className="mono" fontSize="17" fill={c.muted}>
        <tspan fill={c.cyan}>$</tspan> sensors → AI → real-world robots
        <tspan className="caret" fill={c.cyan}> ▌</tspan>
      </text>
    </Frame>
  );
}
