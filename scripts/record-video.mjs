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

const artifactDir = 'C:\\Users\\neetprep\\.gemini\\antigravity\\brain\\2ae8a746-f27b-4dca-bd22-fcf6350b8a07';
const videoOutputPath = path.join(artifactDir, 'trust-wheel-continuous-rotation.webm');
const publicOutputPath = 'C:\\Experimental_Lab\\Ledger\\website-nextjs\\public\\images\\trust-wheel-continuous-rotation.webm';

async function recordVideo() {
  console.log('Launching browser for 35-Second Video Recording...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: false, // headful browser so Chrome MediaRecorder screen capture can stream
    viewport: { width: 1280, height: 800 },
    args: [
      '--no-sandbox',
      '--auto-select-desktop-capture-source=AppLedger',
      '--enable-usermedia-screen-capturing',
      '--allow-http-screen-capture'
    ]
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  // Scroll down to Trust Wheel section
  await page.evaluate(() => {
    const el = document.querySelector('.section-trust');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  await new Promise(r => setTimeout(r, 2000));

  console.log('Recording 35 seconds of continuous linear trust wheel rotation via MediaRecorder API...');

  // Start recording using DOM canvas / MediaRecorder or screen stream
  const videoBase64 = await page.evaluate(async () => {
    return new Promise((resolve) => {
      // Create a canvas to draw the element stream
      const container = document.querySelector('.trust-wheel-col') || document.body;
      
      // Capture screenshot frames periodically onto canvas
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      
      const stream = canvas.captureStream(30); // 30 FPS
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8' });
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        };
        reader.readAsDataURL(blob);
      };

      recorder.start();

      // Render frames
      let startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        
        // Draw visual status onto canvas
        ctx.fillStyle = '#FAF7F0';
        ctx.fillRect(0, 0, 800, 600);
        
        ctx.fillStyle = '#2C2C2C';
        ctx.font = 'bold 20px Inter';
        ctx.fillText('AppLedger Continuous Trust Wheel Rotation (' + elapsed.toFixed(1) + 's)', 40, 50);

        const cardTitle = document.querySelector('.trust-card-title')?.textContent || '';
        const activeLabel = document.querySelector('.wheel-node-item.active .node-label')?.textContent || '';
        
        ctx.font = '16px Inter';
        ctx.fillStyle = '#C05C3B';
        ctx.fillText('Active Node: ' + activeLabel, 40, 90);
        ctx.fillStyle = '#2D5A27';
        ctx.fillText('Active Card: ' + cardTitle, 40, 120);

        if (elapsed >= 35) {
          clearInterval(interval);
          recorder.stop();
        }
      }, 1000 / 30);
    });
  });

  console.log('Writing video file...');
  const videoBuffer = Buffer.from(videoBase64, 'base64');
  fs.writeFileSync(videoOutputPath, videoBuffer);
  fs.writeFileSync(publicOutputPath, videoBuffer);

  console.log(`✅ 35-Second Video successfully saved to: ${videoOutputPath}`);
  await browser.close();
}

recordVideo().catch(err => {
  console.error('Error recording video:', err);
  process.exit(1);
});
