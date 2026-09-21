// React コンポーネントを静的 SVG に書き出す。
// フォントは使っている文字だけにサブセット化し、woff2 を base64 で SVG 内に埋め込む
// （GitHub は README の <img> 内 SVG から外部フォントを読めないため）。
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactElement } from "react";
import { Achievements } from "./Achievements.tsx";
import { Header } from "./Header.tsx";
import { Skills } from "./Skills.tsx";

const NOTO = "/usr/share/fonts/opentype/noto";
const FS = new URL("../node_modules/@fontsource/", import.meta.url).pathname;

const fonts = {
  "JP Black": { src: `${NOTO}/NotoSansCJK-Black.ttc`, n: 0 },
  "JP Bold": { src: `${NOTO}/NotoSansCJK-Bold.ttc`, n: 0 },
  "JP Medium": { src: `${NOTO}/NotoSansCJK-Medium.ttc`, n: 0 },
  "Space Grotesk": { src: `${FS}space-grotesk/files/space-grotesk-latin-700-normal.woff2`, n: 0 },
  "JetBrains Mono": { src: `${FS}jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2`, n: 0 },
} as const;
type Family = keyof typeof fonts;

const cards: { name: string; el: ReactElement }[] = [
  { name: "header", el: <Header /> },
  { name: "achievements", el: <Achievements /> },
  { name: "skills", el: <Skills /> },
];

const out = new URL("../../assets/profile/", import.meta.url).pathname;
mkdirSync(out, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "subset-"));

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");

// class 名 → フォント。<text> の class を見て、そのフォントで描く文字だけを集める。
const classFont: Record<string, Family> = {
  jpk: "JP Black",
  jpb: "JP Bold",
  jpm: "JP Medium",
  disp: "Space Grotesk",
  mono: "JetBrains Mono",
};

function charsByFamily(svg: string) {
  const acc = new Map<Family, Set<string>>();
  const re = /<text\b[^>]*class="([^"]+)"[^>]*>([\s\S]*?)<\/text>/g;
  for (const m of svg.matchAll(re)) {
    const fam = classFont[m[1].split(/\s+/).find((k) => k in classFont) ?? ""];
    if (!fam) continue;
    const txt = decode(m[2].replace(/<[^>]+>/g, ""));
    const set = acc.get(fam) ?? new Set();
    for (const ch of txt) set.add(ch);
    acc.set(fam, set);
  }
  return acc;
}

function subset(fam: Family, chars: Set<string>, tag: string) {
  const { src, n } = fonts[fam];
  const textFile = join(tmp, `${tag}.txt`);
  const outFile = join(tmp, `${tag}.woff2`);
  writeFileSync(textFile, [...chars].join("") + " ");
  execFileSync("pyftsubset", [
    src,
    `--font-number=${n}`,
    `--text-file=${textFile}`,
    "--flavor=woff2",
    "--layout-features=kern,palt,liga",
    "--no-hinting",
    "--desubroutinize",
    `--output-file=${outFile}`,
  ]);
  return readFileSync(outFile).toString("base64");
}

for (const { name, el } of cards) {
  let svg = renderToStaticMarkup(el);
  const faces = [...charsByFamily(svg)]
    .map(([fam, chars], i) => {
      const b64 = subset(fam, chars, `${name}-${i}`);
      return `@font-face{font-family:'${fam}';src:url(data:font/woff2;base64,${b64}) format('woff2')}`;
    })
    .join("");
  svg = svg.replace("/*FONTS*/", faces);
  const file = join(out, `${name}.svg`);
  writeFileSync(file, svg);
  console.log(`${name}.svg  ${(svg.length / 1024).toFixed(1)} KB`);
}
