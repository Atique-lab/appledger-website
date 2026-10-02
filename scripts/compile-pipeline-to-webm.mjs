import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const executablePath = fs.existsSync(edgePath) ? edgePath : (fs.existsSync(chromePath) ? chromePath : null);

const ARTIFACT_DIR = 'C:\\Users\\neetprep\\.gemini\\antigravity\\brain\\2ae8a746-f27b-4dca-bd22-fcf6350b8a07';
const FRAMES_DIR = path.join(ARTIFACT_DIR, 'pipeline_frames');
const OUTPUT_WEBM = path.join(ARTIFACT_DIR, 'workflow-pipeline-visualizer.webm');

async function assemblePipelineWebM() {
  const files = fs.readdirSync(FRAMES_DIR).filter((f) => f.endsWith('.jpeg')).sort();
  console.log(`Assembling ${files.length} frames into workflow-pipeline-visualizer.webm...`);

  const browser = await puppeteer.launch({ executablePath, headless: true });
  const page = await browser.newPage();

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <body style="margin:0; background:#000;">
      <canvas id="c" width="1280" height="800"></canvas>
      <script>
        window.startRecord = async function() {
          const canvas = document.getElementById('c');
          const stream = canvas.captureStream(15);
          window.recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
          window.chunks = [];
          window.recorder.ondataavailable = e => { if (e.data.size > 0) window.chunks.push(e.data); };
          window.recorder.start();
        };

        window.drawFrame = function(base64Data) {
          return new Promise((resolve) => {
            const canvas = document.getElementById('c');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
              ctx.drawImage(img, 0, 0, 1280, 800);
              resolve();
            };
            img.src = 'data:image/jpeg;base64,' + base64Data;
          });
        };

        window.stopRecord = function() {
          return new Promise((resolve) => {
            window.recorder.onstop = async () => {
              const blob = new Blob(window.chunks, { type: 'video/webm' });
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result.split(',')[1]);
              reader.readAsDataURL(blob);
            };
            window.recorder.stop();
          });
        };
      </script>
    </body>
    </html>
  `);

  await page.evaluate(() => window.startRecord());

  for (let i = 0; i < files.length; i++) {
    const framePath = path.join(FRAMES_DIR, files[i]);
    const base64 = fs.readFileSync(framePath).toString('base64');
    await page.evaluate((b64) => window.drawFrame(b64), base64);
    await new Promise((r) => setTimeout(r, 66));
  }

  const webmBase64 = await page.evaluate(() => window.stopRecord());
  fs.writeFileSync(OUTPUT_WEBM, Buffer.from(webmBase64, 'base64'));
  const stats = fs.statSync(OUTPUT_WEBM);

  console.log(`✅ WebM video saved successfully to ${OUTPUT_WEBM} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
  await browser.close();
}

assemblePipelineWebM().catch((err) => {
  console.error('Error assembling WebM:', err);
  process.exit(1);
});
