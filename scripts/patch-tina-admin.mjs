// Tina's generated admin page shows "Failed loading TinaCMS assets" if the
// ~6MB editor bundle hasn't rendered within 2s, which trips on normal
// first loads. Give it more time before showing that error.
import { readFileSync, writeFileSync } from 'node:fs';

const file = 'public/admin/index.html';
const html = readFileSync(file, 'utf8');
const patched = html.replace(/\}, 2000\)/, '}, 20000)');
if (patched === html) {
	console.warn(`patch-tina-admin: load timeout not found in ${file}, leaving it unchanged`);
} else {
	writeFileSync(file, patched);
	console.log('patch-tina-admin: raised admin load timeout to 20s');
}
