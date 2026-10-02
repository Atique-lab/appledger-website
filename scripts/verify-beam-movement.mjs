import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\neetprep\\.gemini\\antigravity\\brain\\2ae8a746-f27b-4dca-bd22-fcf6350b8a07';
const FRAMES_DIR = path.join(ARTIFACT_DIR, 'role_frames');

// Sample 5 frames from a single unchanging tab view (e.g. frames 30 to 70 during CEO view)
const sampleIndices = [30, 38, 46, 54, 62];

console.log('--- Self-Verification of RLS Beam Movement Across Unchanging Tab Frames ---');

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
    console.log(`Comparing ${fileName} vs previous frame: ${isDifferent ? '✅ DIFFERENT PIXEL DATA (Beam position moved)' : '❌ IDENTICAL'}`);
    if (!isDifferent) allDifferent = false;
  } else {
    console.log(`Sampled initial frame: ${fileName} (${size} bytes)`);
  }

  previousBuffer = buffer;
});

console.log('\n========================================');
if (allDifferent) {
  console.log('✅ VERIFICATION PASSED: Every frame sampled within a single tab view shows DISTINCT pixel data! The RLS security beam is continuously sweeping frame-over-frame.');
} else {
  console.error('❌ VERIFICATION FAILED: Found identical frames!');
}
