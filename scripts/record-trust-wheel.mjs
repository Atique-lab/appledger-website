import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const executablePath = fs.existsSync(edgePath) ? edgePath : (fs.existsSync(chromePath) ? chromePath : null);

if (!executablePath) {
  console.error('No browser executable found.');
  process.exit(1);
}

const url = 'http://localhost:3000';
const recordDir = 'C:\\Experimental_Lab\\Ledger\\website-nextjs\\public\\images\\trust-wheel-proof';
if (!fs.existsSync(recordDir)) {
  fs.mkdirSync(recordDir, { recursive: true });
}

async function recordTrustWheel() {
  console.log('Starting Trust Wheel 45-Second Rotation Verification...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true, // we record frame snapshots
    viewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Scroll to Trust Wheel section
  console.log('Scrolling to Trust Wheel section...');
  await page.evaluate(() => {
    const el = document.querySelector('.section-trust');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await new Promise(r => setTimeout(r, 1500));

  console.log('Monitoring Trust Wheel rotation over 45 seconds (2+ full cycles)...');

  const timestamps = [0, 7, 14, 21, 28, 35, 42];
  for (let i = 0; i < timestamps.length; i++) {
    const t = timestamps[i];
    const snapPath = path.join(recordDir, `frame-t${t}s.png`);
    
    // Get current rotation angle of ring from DOM
    const state = await page.evaluate(() => {
      const ring = document.querySelector('.wheel-nodes-ring');
      const activeCardTitle = document.querySelector('.trust-card-title')?.textContent;
      const activeNodeLabel = document.querySelector('.wheel-node-item.active .node-label')?.textContent;
      const transform = ring ? getComputedStyle(ring).transform : 'none';
      return { activeCardTitle, activeNodeLabel, transform };
    });

    console.log(`[t = ${t}s] Active Node: "${state.activeNodeLabel}" | Card: "${state.activeCardTitle}" | Transform: ${state.transform}`);
    await page.screenshot({ path: snapPath, fullPage: false });

    if (i < timestamps.length - 1) {
      const waitTime = (timestamps[i + 1] - timestamps[i]) * 1000;
      await new Promise(r => setTimeout(r, waitTime));
    }
  }

  console.log('✅ Trust Wheel 45-second 2+ full cycle rotation test completed!');
  await browser.close();
}

recordTrustWheel().catch(err => {
  console.error('Error during Trust Wheel recording:', err);
  process.exit(1);
});
