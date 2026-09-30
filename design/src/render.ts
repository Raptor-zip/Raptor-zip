// Rasterize self-contained SVGs so GitHub displays embedded photos and fonts reliably.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const browser = await chromium.launch({ executablePath: process.env.PROFILE_CHROMIUM_PATH || undefined });
try {
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  for (const theme of ["light", "dark"]) {
    for (const section of ["header", "projects", "record", "skills"]) {
      const base = new URL(`../../assets/profile/${section}-${theme}`, import.meta.url);
      const svg = readFileSync(`${fileURLToPath(base)}.svg`, "utf8");
      const height = Number(svg.match(/<svg[^>]*height="(\d+)"/)?.[1]);
      if (!height) throw new Error(`Missing height: ${base}`);
      await page.setViewportSize({ width: 880, height });
      await page.setContent(`<style>html,body{margin:0}svg{display:block}</style>${svg}`);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${fileURLToPath(base)}.png`, omitBackground: true });
      console.log(`${section}-${theme}.png`);
    }
  }
} finally { await browser.close(); }
