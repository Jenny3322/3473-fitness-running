import fs from 'node:fs';
fs.mkdirSync('dist/server',{recursive:true});
let src=fs.readFileSync('worker/index.js','utf8');
src=src.replace('"__CSS__"',JSON.stringify(fs.readFileSync('worker/style.css','utf8'))).replace('"__CLIENT__"',JSON.stringify(fs.readFileSync('worker/client.js','utf8')));
fs.writeFileSync('dist/server/index.js',src);
console.log('Built local site');
