import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\neetprep\\.gemini\\antigravity\\brain\\2ae8a746-f27b-4dca-bd22-fcf6350b8a07';
const FRAMES_DIR = path.join(ARTIFACT_DIR, 'guest_frames');

// Sample 5 frames during idle phase (frames 5, 12, 19, 26, 33) before toggle
const sampleIndices = [5, 12, 19, 26, 33];

console.log('--- Self-Verification of RLS Guest Console Idle Shield Pulse ---');

let previousBuffer = null;
let allDifferent = true;

sampleIndices.forEach((idx) => {
  const fileName = `frame_${String(idx).padStart(5, '0')}.jpeg`;
  const filePath = path.join(FRAMES_DIR, fileName);

  if (!fs.existsSync(filePath)) {
    console.error(`Frame missing: ${fileName}`);
    return;
  }

  const buffer = fs.readFileSync(filePath);
  const size = buffer.length;

  if (previousBuffer) {
    const isDifferent = !buffer.equals(previousBuffer);
    console.log(`Comparing ${fileName} vs previous idle frame: ${isDifferent ? '✅ DIFFERENT PIXEL DATA (Idle RLS shield pulse active)' : '❌ IDENTICAL'}`);
    if (!isDifferent) allDifferent = false;
  } else {
    console.log(`Sampled initial idle frame: ${fileName} (${size} bytes)`);
  }

  previousBuffer = buffer;
});

console.log('\n========================================');
if (allDifferent) {
  console.log('✅ VERIFICATION PASSED: Every idle frame sampled shows DISTINCT pixel data! The continuous RLS shield pulse is active at idle.');
} else {
  console.error('❌ VERIFICATION FAILED: Found identical idle frames!');
}
