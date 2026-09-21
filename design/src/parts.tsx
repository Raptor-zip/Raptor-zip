import type { ReactNode } from "react";
import { W, css, type Theme } from "./theme.ts";

export function Svg({ h, label, children }: { h: number; label: string; children: ReactNode }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={W} height={h} viewBox={`0 0 ${W} ${h}`} role="img" aria-label={label}>
      <style dangerouslySetInnerHTML={{ __html: `/*FONTS*/${css}` }} />
      {children}
    </svg>
  );
}

// 「01  AWARDS ───────── 受賞」の見出し行。
export function Heading({ t, y, no, en, jp }: { t: Theme; y: number; no: string; en: string; jp: string }) {
  return (
    <g>
      <text x="0" y={y} className="mo" fontSize="12" fill={t.accent} letterSpacing="1.5">
        {no}
      </text>
      <text x="30" y={y} className="mo" fontSize="12" fill={t.fg} letterSpacing="1.5">
        {en}
      </text>
      <text x={W} y={y} textAnchor="end" className="jm" fontSize="12" fill={t.muted}>
        {jp}
      </text>
      <line x1="0" y1={y + 12} x2={W} y2={y + 12} stroke={t.fg} strokeWidth="1.5" />
    </g>
  );
}
