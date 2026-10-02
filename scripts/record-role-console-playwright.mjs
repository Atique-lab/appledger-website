import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const ARTIFACT_DIR = 'C:\\Users\\neetprep\\.gemini\\antigravity\\brain\\2ae8a746-f27b-4dca-bd22-fcf6350b8a07';

async function recordRoleConsolePlaywright() {
  console.log('Starting Playwright WebM video recording for 5-Tier Authorization Console...');
  
  const browser = await chromium.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: {
      dir: ARTIFACT_DIR,
      size: { width: 1280, height: 800 },
    },
  });

  const page = await context.newPage();
  console.log('Navigating to http://localhost:3000/features...');
  await page.goto('http://localhost:3000/features', { waitUntil: 'networkidle' });

  // Scroll to roles section
  await page.evaluate(() => {
    const el = document.getElementById('roles');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  await page.waitForTimeout(2000);

  // Find all role filter buttons
  const buttons = await page.$$('.role-filter-badge');
  console.log(`Found ${buttons.length} role tabs.`);

  // Cycle through all 6 role tabs slowly to demonstrate continuous beam & content switching
  for (let i = 0; i < buttons.length; i++) {
    console.log(`Clicking role tab ${i + 1}...`);
    await buttons[i].click();
    await page.waitForTimeout(3200);
  }

  // Click back to CEO tab to complete 25+ second interaction cycle
  if (buttons.length > 0) {
    console.log('Clicking back to CEO tab...');
    await buttons[0].click();
    await page.waitForTimeout(3000);
  }

  // Get video file path
  const videoPath = await page.video().path();
  console.log(`Raw video saved at: ${videoPath}`);

  await page.close();
  await context.close();
  await browser.close();

  // Rename recorded video to role-authorization-console.webm
  const targetPath = path.join(ARTIFACT_DIR, 'role-authorization-console.webm');
  if (fs.existsSync(videoPath)) {
    fs.copyFileSync(videoPath, targetPath);
    console.log(`✅ WebM video successfully copied to ${targetPath}`);
  }
}

recordRoleConsolePlaywright().catch((err) => {
  console.error('Error during Playwright recording:', err);
  process.exit(1);
});
