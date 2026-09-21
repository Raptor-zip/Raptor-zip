// 内容はすべて Obsidian vault（30_Projects / 40_Achievements / 50_Portfolio）で裏が取れたものだけ。
import { Heading, Svg } from "./parts.tsx";
import { W, type Theme } from "./theme.ts";

/* ─────────────────────────── Header ─────────────────────────── */

const highlights = [
  { big: "1st", label: "DCON2026", sub: "企業評価額 5.6億円" },
  { big: "2nd", label: "自動運転AIチャレンジ2026", sub: "End to End AI 部門" },
  { big: "Gold", label: "STEAM JAPAN AWARD 2026", sub: "ほか2賞" },
  { big: "1st", label: "KOSENJIN SUMMIT 2026", sub: "ハッカソン" },
];

export function Header({ t }: { t: Theme }) {
  const colW = W / 4;
  return (
    <Svg h={304} label="貝淵 蒼馬 — 豊田工業高等専門学校 電気・電子システム工学科 本科4年">
      <text x="0" y="16" className="mo" fontSize="12" fill={t.accent} letterSpacing="1.5">
        PHYSICAL AI · ROBOTICS
      </text>
      <text x="-2" y="78" className="jb" fontSize="50" fill={t.fg} letterSpacing="2">
        貝淵 蒼馬
      </text>
      <text x="262" y="78" className="in" fontSize="20" fill={t.muted} letterSpacing="0.5">
        Kaibuchi Soma
      </text>
      <text x="0" y="118" className="jm" fontSize="15" fill={t.fg}>
        豊田工業高等専門学校 電気・電子システム工学科 本科4年
        <tspan fill={t.muted}>（2028年3月卒業予定）</tspan>
      </text>
      <text x="0" y="158" className="jr" fontSize="14" fill={t.muted}>
        ハードウェアと AI をつないで現実世界を動かす「フィジカルAI」が専門。3D LiDAR の自律移動、
      </text>
      <text x="0" y="180" className="jr" fontSize="14" fill={t.muted}>
        点群処理、学習ベースの制御から XR アプリまで、センサから UI までを一人で通して作ります。
      </text>

      <line x1="0" y1="210" x2={W} y2="210" stroke={t.line} />
      {highlights.map((h, i) => (
        <g key={i} transform={`translate(${i * colW} 0)`}>
          {i > 0 && <line x1="0" y1="226" x2="0" y2="296" stroke={t.line} />}
          <text x={i ? 18 : 0} y="254" className="in" fontSize="28" fill={t.accent}>
            {h.big}
          </text>
          <text x={i ? 18 : 0} y="276" className="jm" fontSize="12.5" fill={t.fg}>
            {h.label}
          </text>
          <text x={i ? 18 : 0} y="294" className="jr" fontSize="11.5" fill={t.faint}>
            {h.sub}
          </text>
        </g>
      ))}
    </Svg>
  );
}

/* ─────────────────────────── Awards & Experience ─────────────────────────── */

type Row = { date: string; title: string; note: string; result: string };

const awards: Row[] = [
  { date: "2026.09", title: "自動運転AIチャレンジ2026 End to End AI 部門", note: "2D LiDAR だけを入力にした TinyLidarNet で操舵。本番コースは学習に使わず汎化で勝負", result: "準優勝" },
  { date: "2026", title: "DCON2026 高専ディープラーニングコンテスト", note: "下水管点検ロボット PipeEye（チーム Kanro AI）。ビジコン形式・企業評価額 5.6億円", result: "優勝・最優秀賞" },
  { date: "2026", title: "STEAM JAPAN AWARD 2026", note: "MICHIBIKI GUARDIAN TAP で金賞、PipeEye で日産財団賞、NEMUKE BUSTER でアイデア賞", result: "金賞 ほか2賞" },
  { date: "2026", title: "KOSENJIN SUMMIT 2026 ハッカソン", note: "ブラウザだけで動く居眠り検知 NEMUKE BUSTER", result: "優勝" },
  { date: "2026", title: "NHK学生ロボコン2026", note: "40チーム中。ソフトウェアリーダーとして 3D LiDAR・FAST-LIO2 の自律走行を担当", result: "ベスト9・特別賞" },
  { date: "2023–", title: "NHK高専ロボコン・NHK学生ロボコン", note: "ロボコン部で 2023 年から出場。画像認識から自律走行・機構設計まで", result: "’23–’26" },
];

const experience: Row[] = [
  { date: "2026.08", title: "JAXA インターンシップ（有人宇宙技術部門・筑波宇宙センター）", note: "ISS 実証用バッテリーの熱暴走伝搬試験の解析、PORTRS シミュレータの整備、月面ローバー用容器の概念検討", result: "2週間" },
  { date: "2026.03", title: "トランジスタ技術 × みちびきコミュニティ 合同勉強会", note: "準天頂衛星みちびきの災危通報に連動する電源タップを発表", result: "登壇" },
  { date: "2026.08", title: "産業用ロボットの教示等に係る特別教育", note: "安川電機", result: "修了" },
];

const ROW_H = 54;

function Rows({ t, rows, y0 }: { t: Theme; rows: Row[]; y0: number }) {
  return (
    <>
      {rows.map((r, i) => {
        const y = y0 + i * ROW_H;
        return (
          <g key={i}>
            <text x="0" y={y + 22} className="mo" fontSize="12" fill={t.faint}>
              {r.date}
            </text>
            <text x="84" y={y + 22} className="jb" fontSize="15" fill={t.fg}>
              {r.title}
            </text>
            <text x="84" y={y + 42} className="jr" fontSize="12.5" fill={t.muted}>
              {r.note}
            </text>
            <text x={W} y={y + 22} textAnchor="end" className="jb" fontSize="14" fill={t.accent}>
              {r.result}
            </text>
            <line x1="0" y1={y + ROW_H} x2={W} y2={y + ROW_H} stroke={t.line} />
          </g>
        );
      })}
    </>
  );
}

export function Record({ t }: { t: Theme }) {
  const y1 = 30;
  const y2 = y1 + awards.length * ROW_H + 64;
  return (
    <Svg
      h={y2 + 30 + experience.length * ROW_H + 4}
      label="受賞：自動運転AIチャレンジ2026 E2E部門 準優勝、DCON2026 優勝、STEAM JAPAN AWARD 2026 金賞ほか2賞、KOSENJIN SUMMIT 2026 優勝、NHK学生ロボコン2026 ベスト9・特別賞。経歴：JAXA インターンシップ、トランジスタ技術×みちびきコミュニティ合同勉強会 登壇"
    >
      <Heading t={t} y={16} no="01" en="AWARDS" jp="受賞" />
      <Rows t={t} rows={awards} y0={y1} />
      <Heading t={t} y={y2} no="02" en="EXPERIENCE" jp="経歴" />
      <Rows t={t} rows={experience} y0={y2 + 14} />
    </Svg>
  );
}

/* ─────────────────────────── Projects ─────────────────────────── */

type Project = { name: string; kind: string; lines: [string, string]; tech: string; role: string };

const projects: Project[] = [
  {
    name: "PipeEye",
    kind: "下水管点検ロボット",
    lines: ["LiDAR と深度カメラで管内を 3D 再構成し、損傷を検出して", "点検レポートを自動生成。VR 確認アプリと管理アプリを担当"],
    tech: "Livox · Femto Bolt · YOLO · ROS 2 · Meta Quest 3",
    role: "DCON2026 優勝",
  },
  {
    name: "AI Challenge 2026",
    kind: "自動運転レーシングカート（AWSIM）",
    lines: ["E2E 部門は TinyLidarNet（15万パラメータ）を自作 GPU シムで", "行動模倣＋DAgger 学習。SW 部門はサンプリング MPC"],
    tech: "TinyLidarNet · BC / DAgger · Autoware · ROS 2 · MPC",
    role: "E2E 部門 準優勝",
  },
  {
    name: "NHK学生ロボコン2026",
    kind: "自律走行ロボット",
    lines: ["1ヶ月半かけた画像認識を捨て、3D LiDAR に全面移行。", "FAST-LIO2 の自己位置推定で自動運行し、回収を 5mm 単位で詰めた"],
    tech: "Livox Mid-360 · FAST-LIO2 · SLAM · ROS 2",
    role: "ベスト9・特別賞",
  },
  {
    name: "ABU Robocon 2027 Simulator",
    kind: "試合シミュレータと機構設計",
    lines: ["4台・3分の試合をブラウザで丸ごと再現し、戦略と機構を", "実機の前に検証。物理は MuJoCo を WASM で動かす"],
    tech: "Svelte 5 · Three.js · MuJoCo WASM · build123d",
    role: "開発中",
  },
  {
    name: "MICHIBIKI GUARDIAN TAP",
    kind: "防災電源タップ",
    lines: ["準天頂衛星みちびきの L1S 災危通報を受信して、", "通報に連動して電源を制御する"],
    tech: "QZSS L1S · ZED-F9P · 回路設計",
    role: "STEAM JAPAN 金賞",
  },
  {
    name: "NEMUKE BUSTER",
    kind: "居眠り検知 Web アプリ",
    lines: ["ブラウザだけで完結する居眠り検知。", "カメラ映像を端末内の MediaPipe で処理する"],
    tech: "MediaPipe · TypeScript",
    role: "KOSENJIN 優勝",
  },
];

const CW = (W - 24) / 2;
const CH = 150;

export function Projects({ t }: { t: Theme }) {
  const rows = Math.ceil(projects.length / 2);
  return (
    <Svg h={40 + rows * (CH + 16)} label={`プロジェクト：${projects.map((p) => `${p.name}（${p.kind}）`).join("、")}`}>
      <Heading t={t} y={16} no="03" en="PROJECTS" jp="作ってきたもの" />
      {projects.map((p, i) => {
        const x = (i % 2) * (CW + 24);
        const y = 44 + Math.floor(i / 2) * (CH + 16);
        return (
          <g key={p.name} transform={`translate(${x} ${y})`}>
            <rect x="0.5" y="0.5" width={CW - 1} height={CH - 1} rx="8" fill="none" stroke={t.line} />
            <text x="20" y="32" className="jb" fontSize="16.5" fill={t.fg}>
              {p.name}
            </text>
            <text x={CW - 20} y="31" textAnchor="end" className="jb" fontSize="11.5" fill={t.accent}>
              {p.role}
            </text>
            <text x="20" y="54" className="jm" fontSize="12" fill={t.faint}>
              {p.kind}
            </text>
            <text x="20" y="84" className="jr" fontSize="12.5" fill={t.muted}>
              {p.lines[0]}
            </text>
            <text x="20" y="104" className="jr" fontSize="12.5" fill={t.muted}>
              {p.lines[1]}
            </text>
            <text x="20" y="132" className="mo" fontSize="11" fill={t.faint}>
              {p.tech}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

/* ─────────────────────────── Skills ─────────────────────────── */

const skills: { cat: string; jp: string; items: string }[] = [
  { cat: "ROBOTICS", jp: "自律ロボット", items: "ROS 2 · Autoware · 3D LiDAR · SLAM (FAST-LIO2) · MPC · Pure Pursuit" },
  { cat: "MANIPULATION", jp: "ロボットアーム", items: "URDF · MuJoCo · PyBullet · 産業用ロボット教示（特別教育修了）" },
  { cat: "PERCEPTION", jp: "画像・点群処理", items: "OpenCV · YOLO · MediaPipe · 点群再構成 · RealSense / Femto Bolt" },
  { cat: "LEARNING", jp: "学習ベースの制御", items: "行動模倣 / DAgger · 強化学習 · GPU シミュレータ自作 · MPC" },
  { cat: "APPS", jp: "アプリ開発", items: "TypeScript · Next.js · SvelteKit · Three.js · Meta Quest 3 (XR) · Android" },
  { cat: "FABRICATION", jp: "設計・製作", items: "build123d · OpenSCAD · 3Dプリンター · 回路設計 · Raspberry Pi" },
  { cat: "LANGUAGES", jp: "言語", items: "Python · C++ · TypeScript · C" },
];

export function Skills({ t }: { t: Theme }) {
  const RH = 40;
  return (
    <Svg h={36 + skills.length * RH + 4} label={`スキル：${skills.map((s) => `${s.jp}（${s.items}）`).join("、")}`}>
      <Heading t={t} y={16} no="04" en="SKILLS" jp="できること" />
      {skills.map((s, i) => {
        const y = 32 + i * RH;
        return (
          <g key={s.cat}>
            <text x="0" y={y + 25} className="mo" fontSize="11" fill={t.faint} letterSpacing="1">
              {s.cat}
            </text>
            <text x="116" y={y + 25} className="jb" fontSize="13.5" fill={t.fg}>
              {s.jp}
            </text>
            <text x="248" y={y + 25} className="jr" fontSize="13" fill={t.muted}>
              {s.items}
            </text>
            <line x1="0" y1={y + RH} x2={W} y2={y + RH} stroke={t.line} />
          </g>
        );
      })}
    </Svg>
  );
}
