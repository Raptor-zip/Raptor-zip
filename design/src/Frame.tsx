import type { ReactNode } from "react";
import { W, c } from "./theme.ts";

// 各 SVG の外枠。<style> の中身はビルド時にフォントと合わせて差し込む。
export function Frame({
  h,
  css,
  label,
  children,
}: {
  h: number;
  css: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={W}
      height={h}
      viewBox={`0 0 ${W} ${h}`}
      role="img"
      aria-label={label}
    >
      <defs>
        <style dangerouslySetInnerHTML={{ __html: `/*FONTS*/${css}` }} />
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={c.line} strokeWidth="1" opacity="0.55" />
        </pattern>
        <clipPath id="card">
          <rect x="1" y="1" width={W - 2} height={h - 2} rx="22" />
        </clipPath>
      </defs>
      <g clipPath="url(#card)">
        <rect width={W} height={h} fill={c.bg} />
        {children}
      </g>
      <rect x="1" y="1" width={W - 2} height={h - 2} rx="22" fill="none" stroke={c.line} strokeWidth="2" />
    </svg>
  );
}

// 見出し行（`// ACHIEVEMENTS ────`）。
export function SectionTitle({ x, y, en, jp }: { x: number; y: number; en: string; jp: string }) {
  return (
    <g>
      <text x={x} y={y} className="mono" fontSize="15" fill={c.cyan} letterSpacing="3">
        {`// ${en}`}
      </text>
      <text x={x} y={y + 38} className="jpb" fontSize="30" fill={c.fg}>
        {jp}
      </text>
      <line x1={x + 250} y1={y + 28} x2={W - x} y2={y + 28} stroke={c.line} strokeWidth="2" />
    </g>
  );
}
