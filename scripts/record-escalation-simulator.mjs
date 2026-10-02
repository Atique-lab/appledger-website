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
const FRAMES_DIR = path.join(ARTIFACT_DIR, 'escalation_frames');

// PURGE PREVIOUS FRAMES DIRECTORY ENTIRELY
if (fs.existsSync(FRAMES_DIR)) {
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
}
fs.mkdirSync(FRAMES_DIR, { recursive: true });

async function recordEscalationSimulator() {
  console.log('Launching browser for Escalation Engine Simulator screencast...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const client = await page.target().createCDPSession();

  console.log('Navigating to http://localhost:3000/features#escalation...');
  await page.goto('http://localhost:3000/features', { waitUntil: 'networkidle0' });

  // Scroll to escalation section
  await page.evaluate(() => {
    const el = document.getElementById('escalation');
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

  // Wait 3.5s at idle to capture continuous endpoint heartbeat motion
  console.log('Capturing idle motion for 3.5 seconds...');
  await new Promise((r) => setTimeout(r, 3500));

  // Find scenario tabs and trigger button
  const scenarioButtons = await page.$$('.role-filter-badge');
  console.log(`Found ${scenarioButtons.length} scenario tabs.`);

  // SCENARIO 1: Tech Release Blocker (Click Trigger)
  console.log('Triggering Scenario 1 (Tech Release Blocker)...');
  const triggerBtn = await page.$('#escalation button.btn-primary');
  if (triggerBtn) {
    await triggerBtn.click();
    await new Promise((r) => setTimeout(r, 3500));
  }

  // SCENARIO 2: Vendor Compliance Hold
  if (scenarioButtons.length >= 2) {
    console.log('Switching to Scenario 2 (Vendor Compliance Hold)...');
    await scenarioButtons[1].click();
    await new Promise((r) => setTimeout(r, 2000));

    console.log('Triggering Scenario 2 escalation...');
    const triggerBtn2 = await page.$('#escalation button.btn-primary');
    if (triggerBtn2) {
      await triggerBtn2.click();
      await new Promise((r) => setTimeout(r, 3500));
    }
  }

  // SCENARIO 3: Legal Sign-off Escalation
  if (scenarioButtons.length >= 3) {
    console.log('Switching to Scenario 3 (Legal Sign-off Escalation)...');
    await scenarioButtons[2].click();
    await new Promise((r) => setTimeout(r, 2000));

    console.log('Triggering Scenario 3 escalation...');
    const triggerBtn3 = await page.$('#escalation button.btn-primary');
    if (triggerBtn3) {
      await triggerBtn3.click();
      await new Promise((r) => setTimeout(r, 3500));
    }
  }

  console.log('Stopping CDP Screencast...');
  await client.send('Page.stopScreencast').catch(() => {});
  await browser.close();

  console.log(`Captured ${frameCount} total screencast frames in ${FRAMES_DIR}.`);
}

recordEscalationSimulator().catch((err) => {
  console.error('Error during Escalation screencast:', err);
  process.exit(1);
});
