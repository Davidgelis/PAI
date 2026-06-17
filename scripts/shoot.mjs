import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const EXEC = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const URL = process.env.URL || "http://localhost:3000/";
const TAG = process.env.TAG || "v1";
mkdirSync("shots", { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch({ executablePath: EXEC });
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    reducedMotion: "no-preference",
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.mouse.move(vp.width * 0.4, vp.height * 0.4);
  await page.waitForTimeout(2600);
  // viewport (above the fold) before scrolling
  await page.screenshot({ path: `shots/${vp.name}-fold-${TAG}.png` });

  // Scroll through to trigger every whileInView reveal, capturing sections.
  const total = await page.evaluate(() => document.body.scrollHeight);
  const step = Math.round(vp.height * 0.8);
  for (let y = 0; y < total; y += step) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(450);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  // section captures
  for (const id of ["news", "labs", "loved", "subscribe"]) {
    const el = await page.$(`#${id}`);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await el.screenshot({ path: `shots/${vp.name}-${id}-${TAG}.png` }).catch(() => {});
    }
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  // full page (reveals now triggered)
  await page.screenshot({
    path: `shots/${vp.name}-full-${TAG}.png`,
    fullPage: true,
  });
  console.log(`${vp.name}: shot ok, console errors=${errors.length}`);
  errors.slice(0, 10).forEach((e) => console.log("  ! " + e));
  await ctx.close();
}
await browser.close();
console.log("done");
