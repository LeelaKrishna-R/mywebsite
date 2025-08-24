import { globby } from 'globby';
import path from 'node:path';

const pages = await globby(['app/**/page.@(js|jsx|ts|tsx|mdx)']);
const map = new Map();
for (const p of pages) {
  const key = path.dirname(p); // route folder
  map.set(key, (map.get(key) || []).concat(p));
}
let dup = false;
for (const [dir, files] of map.entries()) {
  if (files.length > 1) {
    dup = true;
    console.error('Duplicate route:', dir);
    files.forEach(f => console.error('  -', f));
  }
}
if (dup) process.exit(1);
