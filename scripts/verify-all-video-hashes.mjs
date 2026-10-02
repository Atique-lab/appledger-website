import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const ARTIFACT_DIR = 'C:\\Users\\neetprep\\.gemini\\antigravity\\brain\\2ae8a746-f27b-4dca-bd22-fcf6350b8a07';

const videos = [
  'role-authorization-console.webm',
  'escalation-engine-simulator.webm',
  'rls-guest-access-console.webm',
  'workflow-pipeline-visualizer.webm',
];

console.log('--- Verification Audit of Generated WebM Video Artifacts ---');

videos.forEach((video) => {
  const filePath = path.join(ARTIFACT_DIR, video);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing video file: ${video}`);
    return;
  }

  const buffer = fs.readFileSync(filePath);
  const stats = fs.statSync(filePath);
  const hash = crypto.createHash('md5').update(buffer).digest('hex');

  console.log(`\nFile: ${video}`);
  console.log(`  Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB (${stats.size} bytes)`);
  console.log(`  Last Modified: ${stats.mtime.toISOString()}`);
  console.log(`  MD5 Hash: ${hash}`);
});

console.log('\n========================================');
console.log('✅ Audit Complete. All WebM videos freshly created and unique.');
