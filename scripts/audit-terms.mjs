import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\Experimental_Lab\\Ledger\\website-nextjs\\src';
const terms = ['Clinical', 'Diagnostics', 'Tax Practice', 'Field Ops', 'Logistics', 'IP Chambers'];

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      searchDir(fullPath);
    } else if (/\.(tsx|ts|js|jsx|css|html|json)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      terms.forEach(term => {
        if (content.includes(term)) {
          console.log(`FOUND "${term}" in file: ${fullPath}`);
        }
      });
    }
  }
}

console.log('Searching src/ directory for placeholder terms...');
searchDir(srcDir);
console.log('Search complete.');
