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
const FRAMES_DIR = path.join(ARTIFACT_DIR, 'guest_frames');

// PURGE PREVIOUS FRAMES DIRECTORY ENTIRELY
if (fs.existsSync(FRAMES_DIR)) {
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
}
fs.mkdirSync(FRAMES_DIR, { recursive: true });

async function recordRlsGuestConsole() {
  console.log('Launching browser for RLS Guest Access Console screencast...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const client = await page.target().createCDPSession();

  console.log('Navigating to http://localhost:3000/features#guest-access...');
  await page.goto('http://localhost:3000/features', { waitUntil: 'networkidle0' });

  // Scroll to guest access section
  await page.evaluate(() => {
    const el = document.getElementById('guest-access');
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

  // Wait 3.5s at idle to capture continuous RLS shield pulse
  console.log('Capturing idle shield pulse motion for 3.5 seconds...');
  await new Promise((r) => setTimeout(r, 3500));

  // Find Member and Guest toggle buttons
  const toggleButtons = await page.$$('#guest-access button.role-filter-badge');
  console.log(`Found ${toggleButtons.length} toggle buttons.`);

  // TOGGLE CYCLE 1: Switch to Guest Sandbox
  if (toggleButtons.length >= 2) {
    console.log('Toggle 1: Switching to Guest Sandbox View (is_guest = true)...');
    await toggleButtons[1].click();
    await new Promise((r) => setTimeout(r, 3500));

    // TOGGLE CYCLE 2: Switch back to Internal Member View
    console.log('Toggle 2: Switching back to Internal Member View (is_guest = false)...');
    await toggleButtons[0].click();
    await new Promise((r) => setTimeout(r, 3000));

    // TOGGLE CYCLE 3: Switch to Guest Sandbox View again
    console.log('Toggle 3: Switching to Guest Sandbox View again (is_guest = true)...');
    await toggleButtons[1].click();
    await new Promise((r) => setTimeout(r, 3500));
  }

  console.log('Stopping CDP Screencast...');
  await client.send('Page.stopScreencast').catch(() => {});
  await browser.close();

  console.log(`Captured ${frameCount} total screencast frames in ${FRAMES_DIR}.`);
}

recordRlsGuestConsole().catch((err) => {
  console.error('Error during Guest screencast:', err);
  process.exit(1);
});
