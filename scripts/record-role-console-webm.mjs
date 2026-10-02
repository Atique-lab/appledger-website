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

async function recordRoleConsole() {
  console.log('Starting Puppeteer video recording for 5-Tier Authorization Console...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  
  // Custom WebM screencast setup
  console.log('Navigating to http://localhost:3000/features#roles...');
  await page.goto('http://localhost:3000/features', { waitUntil: 'networkidle0' });

  // Scroll to roles section
  await page.evaluate(() => {
    const el = document.getElementById('roles');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  await new Promise((r) => setTimeout(r, 2000));

  // Find all role filter buttons
  const buttons = await page.$$('.role-filter-badge');
  console.log(`Found ${buttons.length} role tabs.`);

  // Cycle through role tabs slowly to demonstrate continuous beam & content switching
  for (let i = 0; i < buttons.length; i++) {
    console.log(`Clicking role tab ${i + 1}...`);
    await buttons[i].click();
    await new Promise((r) => setTimeout(r, 3200));
  }

  // Click back to CEO tab to complete cycle
  if (buttons.length > 0) {
    console.log('Clicking back to CEO tab...');
    await buttons[0].click();
    await new Promise((r) => setTimeout(r, 3000));
  }

  await browser.close();
  console.log('Finished 5-Tier Authorization Console interaction cycle.');
}

recordRoleConsole().catch((err) => {
  console.error('Error recording role console:', err);
  process.exit(1);
});
