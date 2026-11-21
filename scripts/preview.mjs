import http from 'node:http';
import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
import worker from '../dist/server/index.js';
fs.mkdirSync('data',{recursive:true});
const db=new DatabaseSync('data/responses.sqlite');db.exec(fs.readFileSync('drizzle/0000_responses.sql','utf8').replace('CREATE TABLE','CREATE TABLE IF NOT EXISTS'));
const config=JSON.parse(fs.readFileSync('.local-config.json','utf8')); 
const env={ADMIN_KEY:config.adminKey,DB:{prepare(sql){let values=[];return{bind(...v){values=v;return this},async run(){return db.prepare(sql).run(...values)},async all(){return {results:db.prepare(sql).all(...values)}}}}}};
http.createServer(async(req,res)=>{try{const chunks=[];for await(const c of req)chunks.push(c);const body=Buffer.concat(chunks);const r=await worker.fetch(new Request('http://localhost:4173'+req.url,{method:req.method,headers:req.headers,...(body.length?{body}:{} )}),env);res.writeHead(r.status,Object.fromEntries(r.headers));res.end(Buffer.from(await r.arrayBuffer()))}catch(e){res.writeHead(500);res.end(String(e))}}).listen(4173,'127.0.0.1',()=>console.log('Local: http://localhost:4173'));
