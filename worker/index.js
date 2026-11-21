const css="__CSS__";
const client="__CLIENT__";
export const fields={q1:'影响工作的问题',q1example:'具体经历与影响',q2:'交接问题',q2must:'交接必须包含的内容',q3:'仓库问题',q3idea:'仓库改进建议',q4:'理想的部门',keep:'希望保留的优点',q5action:'提醒与跟进方式',q6:'希望会议拍板的事情',q7:'愿意的行动与所需支持'};
const options=(key,items,single=false)=>`<div class="options">${items.map(v=>`<label class="option"><input name="${key}" type="${single?'radio':'checkbox'}" value="${v}">${v}</label>`).join('')}</div>`;
const text=(key,label,placeholder,required=false)=>`<label class="field" for="${key}">${label}${required?'<span class="required">必填</span>':''}</label><textarea id="${key}" name="${key}" maxlength="2000" ${required?'required':''} placeholder="${placeholder}"></textarea>`;
const card=(title,body)=>`<section class="card"><h2>${title}</h2>${body}</section>`;
const survey=`<header><div class="brand"><span class="mark">共</span>部门共创 workshop</div><span>周三 · 会前准备</span></header><main class="shell"><aside><div class="eyebrow">YOUR VOICE MATTERS</div><h1>一起，<br>让部门更好。</h1><p>从一次清楚的交接，<br>一个好找东西的仓库开始。<br>把你的体验，变成我们的改变。</p><span class="badge">约 5–8 分钟</span><span class="badge">匿名填写</span><div class="progress"><i id="progress" style="width:0%"></i></div><small id="count">已填写 0 / 7 个主题</small><div class="note">本问卷不收集姓名及工作类型。请描述具体事情，避免填写可识别个人身份的信息。<br>你的回答仅供会议组织者查看与整理，会议中将集中讨论共性问题。</div></aside><div id="content"><form id="survey">
${card('1. 什么最影响工作顺畅？','<p class="sub">可以多选，再分享一个具体经历。</p>'+options('q1',['交接不清楚','仓库杂乱／东西难找','分工不明确','沟通不及时','工作时注意力分散','其他'])+text('q1example','最近发生了什么？对你有什么影响？','例如：接班时不知道哪些任务还没完成，需要再找上一班确认。',true))}
${card('2. 怎样让交接更清楚？','<p class="sub">你最常遇到哪些问题？（可多选）</p>'+options('q2',['不清楚未完成事项','不知道谁负责','缺少注意事项','信息散落各处','没有确认收到','其他'])+text('q2must','每次交接必须说清楚的三项内容是？','① …&#10;② …&#10;③ …'))}
${card('3. 怎样让仓库更好用？','<p class="sub">哪些地方最需要先改善？（可多选）</p>'+options('q3',['没有固定位置','标识不清楚','使用后不归位','库存／缺货不清楚','杂物积压','其他'])+text('q3idea','你建议怎么做？怎样才能持续保持？','写下一条具体做法，也可以补充你遇到的其他问题。'))}
${card('4. 你理想中的部门是什么样？',text('q4','一个月后，你希望看到哪三个具体变化？','① …&#10;② …&#10;③ …',true)+text('keep','目前有哪些做得好的地方，希望继续保留？','一种合作方式、一个习惯，或让你感觉被支持的细节。'))}
${card('5. 怎样合理使用手机？','<p class="sub">请针对行为与影响提出建议，不必写同事姓名。</p>'+text('q5action','如果已经影响工作，第一次怎么提醒？反复发生又怎么办？','你认为怎样处理公平、有效？应该由谁跟进？'))}
${card('6. 这次会议，你希望拍板什么？','<p class="sub">开放题，欢迎提出任何你认为值得讨论的事情。</p>'+text('q6','写出最希望确定的 1–2 件事，也欢迎附上建议。','① 我希望确定……；我的建议是……&#10;② 我希望确定……；我的建议是……',true))}
${card('7. 你愿意做什么？需要哪些支持？',text('q7','让改变落地，我们可以怎样一起行动？','我愿意……&#10;我需要的支持……&#10;还有什么想说的……',true))}
<p id="error" class="error" role="alert" hidden></p><div class="foot"><small>提交后由会议组织者统一整理。<br>请勿填写敏感个人信息。</small><button class="primary" id="submit">提交我的想法</button></div></form></div></main>`;
const admin=`<main class="admin"><div class="eyebrow">WORKSHOP · 会议组织者</div><h1>大家的想法</h1><p>汇总会前意见，确定周三优先讨论的事情。</p><form id="login" class="card"><label class="field" for="password">管理密码</label><input id="password" type="password" required autocomplete="current-password"><p class="sub">结果仅供组织者查看，请勿将管理密码发到部门群。</p><button class="primary">查看收集结果</button></form><p id="error" class="error" role="alert" hidden></p><div id="dashboard" hidden><div class="toolbar"><button class="secondary" id="refresh">刷新结果</button><button class="primary" id="export">导出 CSV 表格</button><button class="secondary" id="logout">退出查看</button></div><div id="results"></div></div></main>`;
const html=(isAdmin)=>`<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${isAdmin?'结果管理':'一起，让部门更好 · 会前问题卡'}</title><style>${css}</style></head><body>${isAdmin?admin:survey}<script>const fields=${JSON.stringify(fields)};${client}</script></body></html>`;
const h={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'};
const json=(d,status=200)=>Response.json(d,{status,headers:h});
export default {async fetch(req,env){const url=new URL(req.url);
if(url.pathname==='/api/responses'){
 if(req.method==='GET'){if(!env.ADMIN_KEY||req.headers.get('Authorization')!==`Bearer ${env.ADMIN_KEY}`)return json({error:'管理密码不正确'},401);const r=await env.DB.prepare('SELECT id,created_at,payload FROM responses ORDER BY created_at DESC').all();return json({rows:r.results.map(r=>({id:r.id,createdAt:r.created_at,...Object.fromEntries(Object.entries(JSON.parse(r.payload)).filter(([k])=>Object.hasOwn(fields,k)))}))});}
 if(req.method==='POST'){
  if(req.headers.get('origin')!==url.origin)return json({error:'请求来源无效'},403);
  try{const raw=await req.text();if(raw.length>35000)return json({error:'内容过长'},413);const {id,answers}=JSON.parse(raw);if(typeof id!=='string'||!/^[a-f0-9-]{36}$/.test(id)||!answers||typeof answers!=='object'||Array.isArray(answers))return json({error:'回答格式不正确'},400);
  for(const [k,v]of Object.entries(answers))if(!Object.hasOwn(fields,k)||typeof v!=='string'||v.length>2000)return json({error:'回答格式不正确或内容过长'},400);
  for(const k of ['q1example','q4','q6','q7'])if(!answers[k]?.trim())return json({error:'请完成标记为必填的问题。'},400);
  await env.DB.prepare('INSERT OR IGNORE INTO responses (id,created_at,payload) VALUES (?,?,?)').bind(id,new Date().toISOString(),JSON.stringify(answers)).run();return json({ok:true});
  }catch{return json({error:'暂时无法保存，请稍后重试；你的填写仍保留在页面中。'},500)}
 }return json({error:'不支持的请求'},405);
}
if(req.method!=='GET'&&req.method!=='HEAD')return new Response('Method not allowed',{status:405});
if(url.pathname!=='/'&&url.pathname!=='/admin')return new Response('Not found',{status:404});
return new Response(req.method==='HEAD'?null:html(url.pathname==='/admin'),{headers:{...h,'Content-Type':'text/html;charset=utf-8','Content-Security-Policy':"default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; frame-ancestors 'self'; base-uri 'none'; form-action 'self'"}});
}};
