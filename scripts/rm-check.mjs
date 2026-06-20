import { chromium } from "playwright";
import { spawn } from "node:child_process";

const EXEC = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const URL = "http://localhost:3000/";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ready = async () => {
  try {
    return (await fetch(URL)).ok;
  } catch {
    return false;
  }
};

let dev = null;
if (!(await ready())) {
  dev = spawn("npm", ["run", "dev"], { stdio: "ignore" });
  let up = false;
  for (let i = 0; i < 90; i++) {
    if (await ready()) {
      up = true;
      break;
    }
    await sleep(1000);
  }
  if (!up) {
    dev?.kill("SIGKILL");
    throw new Error("server did not start");
  }
}

const browser = await chromium.launch({ executablePath: EXEC });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: "reduce",
});
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1200);
// scroll through so every whileInView reveal fires (instantly under reduce)
const total = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < total; y += 700) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(250);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
const stuck = await page.evaluate(() => {
  const els = Array.from(document.querySelectorAll("main *, footer *"));
  let n = 0;
  for (const el of els) {
    const s = getComputedStyle(el);
    if (
      parseFloat(s.opacity) === 0 &&
      el.textContent &&
      el.textContent.trim().length > 8
    )
      n++;
  }
  return n;
});
await page.screenshot({ path: "shots/desktop-full-rm.png", fullPage: true });
console.log(
  `reduced-motion: pageErrors=${errors.length} stuckOpacityEls=${stuck}`
);
errors.slice(0, 5).forEach((e) => console.log("  ! " + e));
await browser.close();
dev?.kill("SIGKILL");
process.exit(0);
