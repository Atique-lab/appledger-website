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
const FRAMES_DIR = path.join(ARTIFACT_DIR, 'role_frames');
if (!fs.existsSync(FRAMES_DIR)) fs.mkdirSync(FRAMES_DIR, { recursive: true });

async function recordRoleConsoleCDP() {
  console.log('Launching browser for 5-Tier Authorization Console screencast...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const client = await page.target().createCDPSession();

  console.log('Navigating to http://localhost:3000/features...');
  await page.goto('http://localhost:3000/features', { waitUntil: 'networkidle0' });

  // Scroll to roles section
  await page.evaluate(() => {
    const el = document.getElementById('roles');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  await new Promise((r) => setTimeout(r, 1500));

  // Start CDP screencast frames
  let frameCount = 0;
  client.on('Page.screencastFrame', async (frame) => {
    const framePath = path.join(FRAMES_DIR, `frame_${String(frameCount).padStart(5, '0')}.jpeg`);
    fs.writeFileSync(framePath, Buffer.from(frame.data, 'base64'));
    frameCount++;
    await client.send('Page.screencastFrameAck', { sessionId: frame.sessionId }).catch(() => {});
  });

  console.log('Starting CDP Screencast frame capture at 15 FPS...');
  await client.send('Page.startScreencast', { format: 'jpeg', quality: 85, everyNthFrame: 2 });

  const buttons = await page.$$('.role-filter-badge');
  console.log(`Found ${buttons.length} role tabs.`);

  // Cycle through all 6 role tabs slowly to demonstrate continuous beam & content switching
  for (let i = 0; i < buttons.length; i++) {
    console.log(`Clicking role tab ${i + 1}...`);
    await buttons[i].click();
    await new Promise((r) => setTimeout(r, 3500));
  }

  // Click back to CEO tab to complete cycle
  if (buttons.length > 0) {
    console.log('Clicking back to CEO tab...');
    await buttons[0].click();
    await new Promise((r) => setTimeout(r, 3000));
  }

  console.log('Stopping CDP Screencast...');
  await client.send('Page.stopScreencast');
  await browser.close();

  console.log(`Captured ${frameCount} total screencast frames in ${FRAMES_DIR}.`);
}

recordRoleConsoleCDP().catch((err) => {
  console.error('Error during CDP screencast:', err);
  process.exit(1);
});
