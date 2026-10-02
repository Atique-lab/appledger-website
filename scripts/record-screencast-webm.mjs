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

async function recordScreencast() {
  console.log('Launching browser for CDP Screencast Recording...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    viewport: { width: 1280, height: 800, deviceScaleFactor: 1.5 },
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });

  // Scroll to Trust Wheel section
  await page.evaluate(() => {
    const el = document.querySelector('.section-trust');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  await new Promise(r => setTimeout(r, 1500));

  console.log('Recording 35 seconds of live Trust Wheel video matching reference codebase...');

  const videoBase64 = await page.evaluate(async () => {
    return new Promise(async (resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1100;
      canvas.height = 550;
      const ctx = canvas.getContext('2d');

      const stream = canvas.captureStream(25); // 25 FPS
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8' });
      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(blob);
      };

      recorder.start();

      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;

        // Draw background
        ctx.fillStyle = '#FAF7F0';
        ctx.fillRect(0, 0, 1100, 550);

        // Header bar
        ctx.fillStyle = '#2C2C2C';
        ctx.font = 'bold 18px Inter, sans-serif';
        ctx.fillText('AppLedger Continuous Trust Wheel (Exact Reference Architecture)', 40, 40);

        // Active node status
        const activeCardTitle = document.querySelector('.trust-card-title')?.textContent || 'Accountable Governance';
        const activeNodeLabel = document.querySelector('.wheel-node-item.active .node-label')?.textContent || 'Accountable';
        const activeCardDesc = document.querySelector('.trust-card-desc')?.textContent || '';

        // Colors map
        const pillarColors = {
          'Accountable': '#2D5A27',
          'Human-Centered': '#C05C3B',
          'Reliable': '#2B6CB0',
          'Fair & Unbiased': '#6B46C1',
          'Transparent': '#D69E2E',
          'Secure & Private': '#319795'
        };

        const activeColor = pillarColors[activeNodeLabel] || '#2D5A27';

        // Left Card Container Box
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(40, 70, 480, 420, 14);
        ctx.fill();
        ctx.stroke();

        // Active Badge
        ctx.fillStyle = activeColor + '18';
        ctx.fillRect(60, 90, 200, 28);
        ctx.fillStyle = activeColor;
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText('ACTIVE: ' + activeNodeLabel.toUpperCase(), 70, 108);

        // Card Title & Desc
        ctx.fillStyle = '#2C2C2C';
        ctx.font = 'bold 22px Fraunces, serif';
        ctx.fillText(activeCardTitle, 60, 155);

        ctx.fillStyle = '#5A554C';
        ctx.font = '14px Inter, sans-serif';
        
        // Wrap description text
        const words = activeCardDesc.split(' ');
        let line = '';
        let yPos = 200;
        for (let w of words) {
          let testLine = line + w + ' ';
          if (ctx.measureText(testLine).width > 440) {
            ctx.fillText(line, 60, yPos);
            line = w + ' ';
            yPos += 22;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 60, yPos);

        // Right Wheel Graphic Box
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#EFEAE1';
        ctx.beginPath();
        ctx.roundRect(560, 70, 500, 420, 14);
        ctx.fill();
        ctx.stroke();

        const cx = 810;
        const cy = 280;
        const radius = 170;

        // ROTATING LAYER (Continuous spin angle = -90deg + elapsed * -7.2deg)
        const currentRingAngle = -90 - elapsed * 7.2;
        const rotRad = (currentRingAngle * Math.PI) / 180;

        // Draw Rotating Dashed Circles & Spokes
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotRad);

        ctx.strokeStyle = '#E2DBD0';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#EFEAE1';
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, radius - 60, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // 6 Rotating Spokes
        const spokePos = [
          { x: 0, y: -170 },
          { x: 147, y: -85 },
          { x: 147, y: 85 },
          { x: 0, y: 170 },
          { x: -147, y: 85 },
          { x: -147, y: -85 }
        ];

        spokePos.forEach(p => {
          ctx.strokeStyle = '#E2DBD0';
          ctx.setLineDash([2, 3]);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        });
        ctx.restore();

        // VISUALLY FIXED OVERLAY SVG (Active Left Arc & Left Spoke Line)
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        // Arc from (73, 135) to (73, 305) on canvas relative to cx=810, cy=280: x1=663, y1=195, x2=663, y2=365
        ctx.arc(cx, cy, radius, (150 * Math.PI) / 180, (210 * Math.PI) / 180, false);
        ctx.stroke();

        ctx.lineWidth = 3.5;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx - radius, cy);
        ctx.stroke();
        ctx.setLineDash([]);

        // Center Badge
        ctx.fillStyle = '#FAF7F0';
        ctx.beginPath();
        ctx.arc(cx, cy, 45, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#2D5A27';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('APPLEDGER', cx, cy - 4);
        ctx.fillStyle = '#7C7567';
        ctx.font = '9px Inter, sans-serif';
        ctx.fillText('GOVERNANCE', cx, cy + 10);
        ctx.textAlign = 'left';

        // ROTATING NODES
        let rawIdx = Math.round((270 - currentRingAngle) / 60) % 6;
        if (rawIdx < 0) rawIdx = ((rawIdx % 6) + 6) % 6;

        const nodeDefs = [
          { label: 'Accountable', color: '#2D5A27', bx: 0, by: -170 },
          { label: 'Human-Centered', color: '#C05C3B', bx: 147, by: -85 },
          { label: 'Reliable', color: '#2B6CB0', bx: 147, by: 85 },
          { label: 'Fair & Unbiased', color: '#6B46C1', bx: 0, by: 170 },
          { label: 'Transparent', color: '#D69E2E', bx: -147, by: 85 },
          { label: 'Secure & Private', color: '#319795', bx: -147, by: -85 }
        ];

        nodeDefs.forEach((nd, i) => {
          // Compute rotated position
          const rx = nd.bx * Math.cos(rotRad) - nd.by * Math.sin(rotRad);
          const ry = nd.bx * Math.sin(rotRad) + nd.by * Math.cos(rotRad);
          const nx = cx + rx;
          const ny = cy + ry;

          const isNodeActive = i === rawIdx;

          // Node Circle
          ctx.fillStyle = isNodeActive ? nd.color : '#FFF';
          ctx.strokeStyle = isNodeActive ? nd.color : '#E2DBD0';
          ctx.lineWidth = isNodeActive ? 3 : 1;
          ctx.beginPath();
          ctx.arc(nx, ny, 22, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Upright Label
          ctx.fillStyle = isNodeActive ? nd.color : '#8C8578';
          ctx.font = isNodeActive ? 'bold 11px Inter, sans-serif' : '10px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(nd.label, nx, ny + 34);
          ctx.textAlign = 'left';
        });

        if (elapsed >= 35) {
          clearInterval(interval);
          recorder.stop();
        }
      }, 1000 / 25);
    });
  });

  console.log('Writing continuous rotation video file...');
  const videoBuffer = Buffer.from(videoBase64, 'base64');
  fs.writeFileSync(videoOutputPath, videoBuffer);
  fs.writeFileSync(publicOutputPath, videoBuffer);

  console.log(`✅ 35-Second Video successfully saved to: ${videoOutputPath}`);
  await browser.close();
}

recordScreencast().catch(err => {
  console.error('Error recording screencast:', err);
  process.exit(1);
});
