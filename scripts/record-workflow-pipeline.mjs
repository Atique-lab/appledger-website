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
const FRAMES_DIR = path.join(ARTIFACT_DIR, 'pipeline_frames');

if (fs.existsSync(FRAMES_DIR)) {
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
}
fs.mkdirSync(FRAMES_DIR, { recursive: true });

async function recordWorkflowPipeline() {
  console.log('Launching browser for Section 01 Workflow Pipeline Visualizer screencast...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const client = await page.target().createCDPSession();

  console.log('Navigating to http://localhost:3000/features#templates...');
  await page.goto('http://localhost:3000/features', { waitUntil: 'networkidle0' });

  // Scroll to templates section
  await page.evaluate(() => {
    const el = document.getElementById('templates');
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

  // Wait 3.5s at idle to capture sequential 4-beat light-up rhythm
  console.log('Capturing idle 4-beat light-up pulse for 3.5 seconds...');
  await new Promise((r) => setTimeout(r, 3500));

  // Find Dispatch Task Button
  const dispatchBtn = await page.$('#templates button.btn-primary');
  if (dispatchBtn) {
    console.log('Clicking Dispatch Task Card Through Pipeline...');
    await dispatchBtn.click();
    await new Promise((r) => setTimeout(r, 4000));
  }

  // Switch to Template 2 (Security Audit & Hotfix)
  const templateTabs = await page.$$('#templates button.role-filter-badge');
  if (templateTabs.length >= 2) {
    console.log('Switching to Template 2 (Security Audit & Hotfix)...');
    await templateTabs[1].click();
    await new Promise((r) => setTimeout(r, 2000));

    console.log('Dispatching Hotfix Task Card...');
    const dispatchBtn2 = await page.$('#templates button.btn-primary');
    if (dispatchBtn2) {
      await dispatchBtn2.click();
      await new Promise((r) => setTimeout(r, 4000));
    }
  }

  console.log('Stopping CDP Screencast...');
  await client.send('Page.stopScreencast').catch(() => {});
  await browser.close();

  console.log(`Captured ${frameCount} total screencast frames in ${FRAMES_DIR}.`);
}

recordWorkflowPipeline().catch((err) => {
  console.error('Error during Pipeline screencast:', err);
  process.exit(1);
});
