import worker from './dist/server/index.js';
import assert from 'node:assert/strict';
const rows=new Map();
const env={ADMIN_KEY:'test-password',DB:{prepare(sql){return {bind(...v){this.values=v;return this},async run(){const [id,created_at,payload]=this.values;if(!rows.has(id))rows.set(id,{id,created_at,payload});return{}},async all(){return {results:[...rows.values()]}}}}}};
const id=crypto.randomUUID(),answers={q1example:'交接不清',q4:'更整齐',q6:'确定交接内容',q7:'愿意帮助整理仓库'};
const post=(data,origin='http://localhost:4173')=>worker.fetch(new Request('http://localhost:4173/api/responses',{method:'POST',headers:{origin},body:JSON.stringify(data)}),env);
assert.equal((await post({id,answers})).status,200);assert.equal((await post({id,answers})).status,200);assert.equal(rows.size,1);
assert.equal((await post({id,answers:{} })).status,400);assert.equal((await post({id,answers},'http://other.test')).status,403);
assert.equal((await worker.fetch(new Request('http://localhost:4173/api/responses'),env)).status,401);
const r=await worker.fetch(new Request('http://localhost:4173/api/responses',{headers:{Authorization:'Bearer test-password'}}),env);assert.equal((await r.json()).rows[0].q6,'确定交接内容');
const html=await(await worker.fetch(new Request('http://localhost:4173/'),env)).text();assert.match(html,/开放题/);assert.match(html,/name="q6"/);assert.ok(!html.includes('test-password'));
console.log('PASS: save, retry deduplication, required fields, origin, protected results, content');

assert.equal((await post({id:crypto.randomUUID(),answers:{...answers,q7:'  '}})).status,400);
assert.equal((await post({id:crypto.randomUUID(),answers:{...answers,name:'某同事'}})).status,400);
assert.ok(!html.includes('name="name"'));assert.ok(!html.includes('name="role"'));assert.ok(!html.includes('name="q5"'));assert.match(html,/<textarea[^>]*name="q7"[^>]*required/);
console.log('PASS: anonymous fields only, removed q5 subquestion, q7 required in form and API');
