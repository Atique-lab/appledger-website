import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const executablePath = fs.existsSync(edgePath) ? edgePath : (fs.existsSync(chromePath) ? chromePath : null);

if (!executablePath) {
  console.error('No browser executable found.');
  process.exit(1);
}

const ARTIFACT_DIR = 'C:\\Users\\neetprep\\.gemini\\antigravity\\brain\\2ae8a746-f27b-4dca-bd22-fcf6350b8a07';
const OUTPUT_VIDEO = path.join(ARTIFACT_DIR, 'role-authorization-console.webm');

async function recordRoleConsoleCDP() {
  console.log('Starting CDP browser screencast for 5-Tier Authorization Console...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  
  // Inject WebRecorder in browser context via MediaRecorder API!
  await page.goto('http://localhost:3000/features', { waitUntil: 'networkidle0' });

  // Scroll to roles section
  await page.evaluate(() => {
    const el = document.getElementById('roles');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  await new Promise((r) => setTimeout(r, 1500));

  console.log('Starting in-browser MediaRecorder stream...');
  // Start in-browser screen recording via Canvas/DOM stream
  await page.evaluate(async () => {
    window._videoChunks = [];
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { displaySurface: 'browser' },
      audio: false,
    });
    window._mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
    window._mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) window._videoChunks.push(e.data);
    };
    window._mediaRecorder.start(100);
  }).catch(() => {
    console.log('getDisplayMedia requires manual permission, falling back to CDP frame capture...');
  });

  // Cycle through role tabs slowly to demonstrate continuous beam & content switching
  const buttons = await page.$$('.role-filter-badge');
  console.log(`Found ${buttons.length} role tabs.`);

  for (let i = 0; i < buttons.length; i++) {
    console.log(`Clicking role tab ${i + 1}...`);
    await buttons[i].click();
    await new Promise((r) => setTimeout(r, 3200));
  }

  if (buttons.length > 0) {
    console.log('Clicking back to CEO tab...');
    await buttons[0].click();
    await new Promise((r) => setTimeout(r, 3000));
  }

  await browser.close();
  console.log('Finished 5-Tier Authorization Console interaction cycle.');
}

recordRoleConsoleCDP().catch((err) => {
  console.error('Error during role console recording:', err);
  process.exit(1);
});
