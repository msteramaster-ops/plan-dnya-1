export const PLANNER_HTML = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Мой план дня</title>
<meta name="description" content="Личный планировщик дел, готовки и проектов">



<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
<style>
  :root{
    --bg:#F6F4EF; --card:#FFFFFF; --ink:#23282B; --muted:#7C848A;
    --line:#E7E3DA; --line2:#EFECE4;
    --primary:#2F5D50; --primary-soft:#E5EEEA;
    --now:#C0603A;
    --cat-dom:#3B6EA5; --cat-sob:#3E9E63; --cat-zal:#C77D33;
    --cat-rab:#6B5CA5; --cat-det:#C05E86; --cat-pro:#7A8288;
    --warn:#B0472F; --warn-soft:#F7E9E4;
    --radius:14px;
  }
  *{box-sizing:border-box}
  html{overflow-x:hidden}
  body{margin:0;background:var(--bg);color:var(--ink);
    font-family:Inter,system-ui,sans-serif;-webkit-font-smoothing:antialiased;
    line-height:1.45;padding:0 0 60px;overflow-x:hidden}
  .wrap{max-width:680px;margin:0 auto;padding:18px 16px}
  h1,h2,h3{margin:0}
  button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
  input,select{font-family:inherit;font-size:15px;color:var(--ink);max-width:100%}
  input,select{border:1px solid var(--line);border-radius:9px;padding:8px 10px;background:var(--card)}
  input:focus,select:focus{outline:2px solid var(--primary-soft);outline-offset:1px;border-color:var(--primary)}

  /* header / date */
  .top{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:14px}
  .datebox .dow{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:600}
  .datebox .big{font-family:Fraunces,serif;font-size:34px;font-weight:600;line-height:1.05;margin-top:2px}
  .nav{display:flex;gap:6px}
  .nav button{width:38px;height:38px;border-radius:10px;border:1px solid var(--line);background:var(--card);
    font-size:17px;color:var(--muted);display:flex;align-items:center;justify-content:center}
  .nav button:hover{color:var(--ink);border-color:var(--muted)}
  .today-link{font-size:13px;color:var(--primary);font-weight:600;padding:0 4px}

  /* tabs */
  .tabs{display:flex;gap:4px;background:var(--line2);padding:4px;border-radius:12px;margin-bottom:16px}
  .tabs button{flex:1;padding:9px 8px;border-radius:9px;font-size:14px;font-weight:600;color:var(--muted)}
  .tabs button.on{background:var(--card);color:var(--ink);box-shadow:0 1px 2px rgba(0,0,0,.05)}

  .card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);padding:14px 16px;margin-bottom:12px}
  .sub{font-size:12px;color:var(--muted)}

  /* day summary */
  .summary{display:flex;gap:10px 18px;font-size:13px;color:var(--muted);margin:2px 2px 12px;flex-wrap:wrap}
  .summary b{color:var(--ink);font-weight:600}
  .dayset{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);margin-bottom:14px;flex-wrap:wrap}
  .dayset input{width:76px;padding:5px 8px;font-size:13px}

  /* schedule blocks */
  .block{display:flex;gap:12px;align-items:flex-start;padding:11px 12px;border:1px solid var(--line);
    border-radius:12px;margin-bottom:8px;background:var(--card);position:relative}
  .block.done{opacity:.5}
  .block .time{min-width:82px;font-variant-numeric:tabular-nums;font-size:13px;color:var(--muted);padding-top:2px}
  .block .time b{display:block;color:var(--ink);font-weight:600;font-size:14px}
  .block .body{flex:1;min-width:0}
  .block .name{font-weight:600;font-size:15px;display:flex;align-items:center;gap:8px}
  .block.done .name{text-decoration:line-through}
  .dot{width:9px;height:9px;border-radius:50%;flex:none}
  .cat-badge{width:22px;height:22px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center}
  .cat-badge svg{width:12px;height:12px}
  .name{gap:9px}
  .block .meta{font-size:12px;color:var(--muted);margin-top:2px;display:flex;gap:8px;flex-wrap:wrap}
  .tag{font-size:11px;padding:1px 7px;border-radius:20px;background:var(--line2);color:var(--muted);font-weight:600}
  .chk{width:26px;height:26px;border-radius:7px;border:1.5px solid var(--line);flex:none;
    display:flex;align-items:center;justify-content:center;color:transparent;background:var(--card)}
  .chk svg{width:15px;height:15px}
  .chk.on{background:var(--primary);border-color:var(--primary);color:#fff;animation:pop .4s cubic-bezier(.34,1.56,.64,1)}
  @keyframes pop{0%{transform:scale(.5)}55%{transform:scale(1.18);box-shadow:0 0 0 7px var(--primary-soft)}100%{transform:scale(1);box-shadow:0 0 0 0 rgba(0,0,0,0)}}
  .block .del{position:absolute;top:8px;right:10px;color:var(--muted);opacity:.4;transition:.15s;
    width:26px;height:26px;display:flex;align-items:center;justify-content:center}
  .block .del svg{width:13px;height:13px}
  .block:hover .del,.block .del:active,.block .del:focus-visible{opacity:1;color:var(--warn)}
  .nowbar{display:flex;align-items:center;gap:8px;margin:8px 0}
  .nowbar .line{flex:1;height:2px;background:var(--now);opacity:.5}
  .nowbar .lbl{font-size:11px;color:var(--now);font-weight:700;font-variant-numeric:tabular-nums}

  .overflow{border:1px dashed var(--warn);background:var(--warn-soft);border-radius:12px;padding:12px 14px;margin-top:6px}
  .overflow h3{font-size:13px;color:var(--warn);margin-bottom:6px}
  .overflow .it{font-size:14px;padding:3px 0}

  .empty{text-align:center;color:var(--muted);font-size:14px;padding:26px 10px}

  /* forms */
  .frow{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
  .frow input[type=text]{flex:1;min-width:150px}
  .frow input.num{width:78px}
  .btn{background:var(--primary);color:#fff;font-weight:600;font-size:14px;padding:9px 16px;border-radius:10px}
  .btn:hover{filter:brightness(1.07)}
  .btn.ghost{background:var(--card);color:var(--primary);border:1px solid var(--primary)}
  .btn.sm{padding:7px 12px;font-size:13px}
  .mic{width:40px;height:40px;border-radius:10px;border:1px solid var(--line);background:var(--card);
    display:flex;align-items:center;justify-content:center;color:var(--muted)}
  .mic svg{width:18px;height:18px}
  .mic.rec{color:var(--now);border-color:var(--now);animation:pulse 1s infinite}
  @keyframes pulse{50%{background:var(--warn-soft)}}
  .hint{font-size:12px;color:var(--muted);margin-top:8px}
  .formtitle{font-weight:600;font-size:15px;margin-bottom:10px;display:flex;align-items:center;gap:8px}

  /* library */
  .lib-item{border:1px solid var(--line);border-radius:12px;padding:12px;margin-bottom:10px}
  .lib-top{display:flex;gap:8px;align-items:center}
  .lib-top input.name{flex:1}
  .lib-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:10px;font-size:13px;color:var(--muted)}
  .lib-row label{display:flex;align-items:center;gap:5px}
  .lib-row input.num{width:64px;padding:6px 8px;font-size:13px}
  .lib-row input[type=time]{width:104px;padding:6px 8px;font-size:13px}
  .days{display:flex;gap:4px;flex-wrap:wrap}
  .day{width:30px;height:30px;border-radius:8px;border:1px solid var(--line);font-size:12px;font-weight:600;
    color:var(--muted);background:var(--card);display:flex;align-items:center;justify-content:center}
  .day.on{background:var(--primary);color:#fff;border-color:var(--primary)}
  .day.every{width:auto;padding:0 10px}
  .catsel{display:flex;align-items:center;gap:6px}
  .lib-del{color:var(--muted);font-size:13px;margin-left:auto}
  .lib-del:hover{color:var(--warn)}
  .toggle{display:flex;align-items:center;gap:6px}
  .switch{width:38px;height:22px;border-radius:20px;background:var(--line);position:relative;transition:.15s;flex:none}
  .switch.on{background:var(--primary)}
  .switch b{position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;transition:.15s}
  .switch.on b{left:18px}
  .addlib{width:100%;border:1px dashed var(--line);border-radius:12px;padding:12px;color:var(--primary);font-weight:600;font-size:14px;background:var(--card)}
  .addlib:hover{border-color:var(--primary);background:var(--primary-soft)}

  .block.running{border-color:var(--primary);background:var(--primary-soft)}
  .ctrl{display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex:none}
  .runt{font-size:12px;color:var(--primary);font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap;
    display:inline-flex;align-items:center;gap:6px}
  .runt::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--primary);animation:livedot 1.2s infinite}
  @keyframes livedot{0%,100%{opacity:1}50%{opacity:.25}}
  .fact{color:var(--primary);font-weight:600}
  .fact.over{color:var(--warn)}
  .statline{margin-top:10px;padding-top:9px;border-top:1px solid var(--line2);font-size:12px;color:var(--muted);display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .applystat{font-size:12px;font-weight:600;color:var(--primary);border:1px solid var(--primary);border-radius:8px;padding:3px 9px;background:var(--card)}
  .applystat:hover{background:var(--primary-soft)}

  .tag-p{background:var(--primary-soft);color:var(--primary)}
  .ptbase{margin-top:14px;padding-top:12px;border-top:1px solid var(--line2)}
  .ptbase-t{font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px}
  .ptrow{display:flex;justify-content:space-between;align-items:center;font-size:14px;padding:5px 0;gap:10px}
  .ptrow .ptr-r{color:var(--muted);font-size:13px;display:flex;align-items:center;gap:8px;white-space:nowrap}
  .ptdel{color:var(--muted);display:inline-flex;width:18px;height:18px}
  .ptdel svg{width:12px;height:12px}
  .ptdel:hover{color:var(--warn)}

  .picker{margin-top:8px}
  .picker>summary{list-style:none;cursor:pointer;font-size:13px;color:var(--primary);font-weight:600;
    display:inline-flex;padding:3px 10px;border:1px solid var(--line);border-radius:8px;background:var(--card)}
  .picker>summary::-webkit-details-marker{display:none}
  .picker[open]>summary{background:var(--primary-soft);border-color:var(--primary)}
  .picker-body{margin-top:8px}
  .chips{display:flex;flex-wrap:wrap;gap:6px}
  .pchip{font-size:13px;padding:5px 11px;border:1px solid var(--line);border-radius:20px;background:var(--card);color:var(--ink)}
  .pchip:hover{border-color:var(--primary)}
  .pchip.on{background:var(--primary);color:#fff;border-color:var(--primary)}
  .picker-add{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-top:8px}
  .picker-add input{flex:1;min-width:140px;padding:6px 10px;font-size:13px}
  .ichip{display:inline-flex;align-items:center;gap:6px;font-size:13px;padding:5px 6px 5px 11px;
    border:1px solid var(--line);border-radius:20px;background:var(--card)}
  .ichip button{color:var(--muted);display:inline-flex;width:14px;height:14px}
  .ichip button svg{width:11px;height:11px}
  .ichip button:hover{color:var(--warn)}
  .litem-inp{flex:1;min-width:150px}

  @media (max-width:380px){
    .wrap{padding:14px 12px}
    .datebox .big{font-size:28px}
    .block{padding:10px}
    .time{min-width:70px}
    .frow input[type=text]{min-width:120px}
    .picker-add input{min-width:110px}
    .btn.sm{padding:6px 10px;font-size:12.5px}
    .day{width:27px;height:27px}
  }
</style>

<div class="wrap">
  <div class="top">
    <div class="datebox">
      <div class="dow" id="dow">—</div>
      <div class="big" id="bigdate">—</div>
      <button class="today-link" id="todayLink" style="display:none">вернуться к сегодня</button>
    </div>
    <div class="nav">
      <button id="prev">‹</button>
      <button id="next">›</button>
    </div>
  </div>

  <div class="tabs">
    <button data-tab="day" class="on">Сегодня</button>
    <button data-tab="add">Добавить</button>
    <button data-tab="lib">Мои дела</button>
  </div>

  <div id="view"></div>
</div>

<script>
(function(){
  // ---------- storage (localStorage — работает офлайн, без Клода) ----------
  async function sget(k){
    try{ return localStorage.getItem(k); } catch(e){ return null; }
  }
  async function sset(k,v){
    try{ localStorage.setItem(k,v); } catch(e){}
    try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({t:'s',k:k,v:v})); } catch(e){}
  }

  const CATS = {
    dom:{n:'Дом',c:'var(--cat-dom)'}, sob:{n:'Собака',c:'var(--cat-sob)'},
    zal:{n:'Зал',c:'var(--cat-zal)'}, rab:{n:'Работа',c:'var(--cat-rab)'},
    det:{n:'Дети',c:'var(--cat-det)'}, pro:{n:'Прочее',c:'var(--cat-pro)'}
  };
  const ICONS = {
    dom:'<path d="M3 11l9-7 9 7"/><path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9"/>',
    sob:'<g stroke="none" fill="currentColor"><ellipse cx="12" cy="16.5" rx="5.6" ry="4.6"/><ellipse cx="5.3" cy="9.6" rx="2.1" ry="2.8"/><ellipse cx="9.8" cy="5.8" rx="2.1" ry="2.8"/><ellipse cx="14.2" cy="5.8" rx="2.1" ry="2.8"/><ellipse cx="18.7" cy="9.6" rx="2.1" ry="2.8"/></g>',
    zal:'<g stroke="none" fill="currentColor"><rect x="1.5" y="9" width="3" height="6" rx="1"/><rect x="19.5" y="9" width="3" height="6" rx="1"/><rect x="4.8" y="10.4" width="2.2" height="3.2" rx="0.6"/><rect x="17" y="10.4" width="2.2" height="3.2" rx="0.6"/><rect x="7" y="11" width="10" height="2" rx="1"/></g>',
    rab:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
    det:'<g stroke="none" fill="currentColor"><rect x="3.5" y="4" width="7" height="7" rx="1.4"/><rect x="13" y="4" width="7" height="7" rx="1.4"/><rect x="8.3" y="13.3" width="7" height="7" rx="1.4"/></g>',
    pro:'<path stroke="none" fill="currentColor" d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9z"/>'
  };
  const ICON_TPL = k => \`<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\${ICONS[k]}</svg>\`;
  const catBadge = k => \`<span class="cat-badge" style="background:\${CATS[k].c}">\${ICON_TPL(k)}</span>\`;
  const ICON_MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3z"/><path d="M19 11a7 7 0 01-14 0"/><path d="M12 18v3"/></svg>';
  const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>';
  const ICON_CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>';
  const DOW_SHORT=['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];
  const DOW_FULL=['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
  const MONTHS=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

  const seedLibrary = [
    {id:'l1', name:'Выгул собаки (утро)', cat:'sob', dur:30, fixed:true, time:'07:30', days:'daily'},
    {id:'l2', name:'Выгул собаки (вечер)', cat:'sob', dur:30, fixed:true, time:'20:00', days:'daily'},
    {id:'l3', name:'Зал', cat:'zal', dur:90, fixed:true, time:'18:00', days:[1,3,5]},
    {id:'l4', name:'Обход бирж и Телеграма', cat:'rab', dur:45, fixed:false, time:'', days:'daily'},
    {id:'l6', name:'Готовка', cat:'dom', dur:45, fixed:false, time:'', days:'daily', list:'meals'},
    {id:'l7', name:'Уборка', cat:'dom', dur:30, fixed:false, time:'', days:[1,4], list:'clean'},
    {id:'l8', name:'Стирка', cat:'dom', dur:20, fixed:false, time:'', days:[2,6]},
    {id:'l9', name:'Занятия с детьми', cat:'det', dur:60, fixed:false, time:'', days:'daily'},
    {id:'l10', name:'Прогулка с детьми', cat:'det', dur:60, fixed:false, time:'', days:'daily'}
  ];
  const defSettings = {start:'07:00', end:'22:00'};
  const seedLists = {
    meals:{title:'Мои блюда', items:[]},
    clean:{title:'Зоны уборки', items:['Кухня','Ванная и туалет','Спальня','Детская','Гостиная','Прихожая','Полы во всей квартире']}
  };

  let LIB=[], OVR={}, SET={}, STATS={}, PTYPES=[], LISTS={}, cur=new Date(), tab='day', _tick=null;

  const dstr = d => d.toISOString().slice(0,10);
  const toMin = t => { const [h,m]=t.split(':').map(Number); return h*60+m; };
  const toHM = m => String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');
  const fmtDur = m => { const h=Math.floor(m/60),mm=m%60; return (h?h+' ч':'')+(h&&mm?' ':'')+(mm?mm+' мин':(h?'':'0 мин')); };
  const plural = (n,a,b,c)=>{ const d=n%100, e=n%10; if(d>=11&&d<=14) return c; if(e===1) return a; if(e>=2&&e<=4) return b; return c; };

  async function load(){
    const l = await sget('planner_library'); LIB = l? JSON.parse(l) : structuredClone(seedLibrary);
    const o = await sget('planner_overrides'); OVR = o? JSON.parse(o) : {};
    const s = await sget('planner_settings'); SET = s? JSON.parse(s) : structuredClone(defSettings);
    const st = await sget('planner_stats'); STATS = st? JSON.parse(st) : {};
    const pt = await sget('planner_ptypes'); PTYPES = pt? JSON.parse(pt) : [];
    const li = await sget('planner_lists'); LISTS = li? JSON.parse(li) : structuredClone(seedLists);
    if(!li) await sset('planner_lists', JSON.stringify(LISTS));

    // разовая миграция: убрать дублирующее «Работа над проектами» и привязать справочники
    if(!SET.migV2){
      LIB = LIB.filter(t=>t.id!=='l5');
      const g=LIB.find(t=>t.id==='l6'); if(g && !g.list) g.list='meals';
      const c=LIB.find(t=>t.id==='l7'); if(c && !c.list) c.list='clean';
      SET.migV2=true;
      await sset('planner_library', JSON.stringify(LIB));
      await sset('planner_settings', JSON.stringify(SET));
    }
    if(!l) await sset('planner_library', JSON.stringify(LIB));
  }
  const saveLib = ()=> sset('planner_library', JSON.stringify(LIB));
  const saveOvr = ()=> sset('planner_overrides', JSON.stringify(OVR));
  const saveSet = ()=> sset('planner_settings', JSON.stringify(SET));
  const saveStats = ()=> sset('planner_stats', JSON.stringify(STATS));
  const savePtypes = ()=> sset('planner_ptypes', JSON.stringify(PTYPES));
  const saveLists = ()=> sset('planner_lists', JSON.stringify(LISTS));

  const DEFAULT_PROJ = 90; // полтора часа по умолчанию
  const ptypeById = id => PTYPES.find(p=>p.id===id);
  const ptypeAvg = p => p&&p.count? Math.round(p.sum/p.count) : null;
  const ptypePlan = p => ptypeAvg(p) ?? DEFAULT_PROJ;
  function ptypeAdd(id,mins){ const p=ptypeById(id); if(!p) return; p.sum+=mins; p.count++; savePtypes(); }

  function ovrFor(ds){
    if(!OVR[ds]) OVR[ds]={oneoffs:[],track:{}};
    const ov=OVR[ds];
    if(!ov.track) ov.track={};
    if(!ov.detail) ov.detail={};
    if(ov.done){ // миграция старых галочек в трекинг
      for(const k in ov.done){ if(ov.done[k] && !ov.track[k]) ov.track[k]={status:'done',startTs:0,spent:null,counted:true}; }
      delete ov.done;
    }
    return ov;
  }
  function statsAdd(libId,mins){
    if(!String(libId).startsWith('l')) return;
    const s=STATS[libId]||{sum:0,count:0}; s.sum+=mins; s.count++; STATS[libId]=s; saveStats();
  }
  const statAvg = libId => STATS[libId]? Math.round(STATS[libId].sum/STATS[libId].count) : null;

  function activeOn(t, wd){ return t.days==='daily' || (Array.isArray(t.days)&&t.days.includes(wd)); }

  // ---------- scheduling ----------
  function buildDay(d){
    const ds=dstr(d), wd=d.getDay(), ov=ovrFor(ds);
    const start=toMin(SET.start), end=toMin(SET.end);
    const libTasks = LIB.filter(t=>activeOn(t,wd)).map(t=>({key:t.id,name:t.name,cat:t.cat,dur:+t.dur,fixed:!!t.fixed,time:t.time,list:t.list||null}));
    const oneoffs = (ov.oneoffs||[]).map(t=>({key:t.id,name:t.name,cat:t.cat,dur:+t.dur,fixed:!!t.fixed,time:t.time||'',ptype:t.ptype||null}));
    const all=[...libTasks,...oneoffs];

    const fixed=all.filter(t=>t.fixed&&t.time).map(t=>({...t,start:toMin(t.time),endm:toMin(t.time)+t.dur})).sort((a,b)=>a.start-b.start);
    const flex=all.filter(t=>!(t.fixed&&t.time));

    // free windows = [start,end] minus merged fixed intervals
    const merged=[];
    fixed.forEach(f=>{
      const s=Math.max(f.start,start), e=Math.min(f.endm,end);
      if(e<=s) return;
      if(merged.length&&s<=merged[merged.length-1].e) merged[merged.length-1].e=Math.max(merged[merged.length-1].e,e);
      else merged.push({s,e});
    });
    let windows=[], c=start;
    merged.forEach(m=>{ if(m.s>c) windows.push({s:c,cur:c,e:m.s}); c=Math.max(c,m.e); });
    if(c<end) windows.push({s:c,cur:c,e:end});

    const placed=[], overflow=[];
    flex.forEach(t=>{
      const w=windows.find(w=>w.e-w.cur>=t.dur);
      if(w){ placed.push({...t,start:w.cur,endm:w.cur+t.dur}); w.cur+=t.dur; }
      else overflow.push(t);
    });
    const scheduled=[...fixed,...placed].sort((a,b)=>a.start-b.start);
    return {scheduled,overflow,start,end};
  }

  // ---------- render ----------
  const view=document.getElementById('view');

  function renderHeader(){
    document.getElementById('dow').textContent=DOW_FULL[cur.getDay()];
    document.getElementById('bigdate').textContent=cur.getDate()+' '+MONTHS[cur.getMonth()];
    const isToday=dstr(cur)===dstr(new Date());
    document.getElementById('todayLink').style.display=isToday?'none':'block';
  }

  function render(){
    if(_tick){ clearInterval(_tick); _tick=null; }
    renderHeader();
    document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===tab));
    if(tab==='day') renderDay();
    else if(tab==='add') renderAdd();
    else renderLib();
  }

  function renderDay(){
    const {scheduled,overflow,start,end}=buildDay(cur);
    const ds=dstr(cur), ov=ovrFor(ds);
    const busy=scheduled.reduce((s,b)=>s+b.dur,0)+overflow.reduce((s,b)=>s+b.dur,0);
    const free=Math.max(0,(end-start)-scheduled.reduce((s,b)=>s+b.dur,0));
    const isToday=ds===dstr(new Date());
    const nowMin=new Date().getHours()*60+new Date().getMinutes();

    let h='';
    h+=\`<div class="dayset">День с
      <input type="time" id="dstart" value="\${SET.start}"> до
      <input type="time" id="dend" value="\${SET.end}"></div>\`;
    const factTotal=Object.values(ov.track).reduce((s,t)=>s+(t.status==='done'&&t.spent?t.spent:0),0);
    h+=\`<div class="summary"><span>Занято <b>\${fmtDur(busy)}</b></span><span>Свободно <b>\${fmtDur(free)}</b></span>\${factTotal?\`<span>Факт <b>\${fmtDur(factTotal)}</b></span>\`:''}</div>\`;

    if(!scheduled.length && !overflow.length){
      h+=\`<div class="card"><div class="empty">Пока здесь чисто, как после генеральной уборки. Занеси дела во вкладке «Мои дела» или добавь разовое во вкладке «Добавить».</div></div>\`;
    } else {
      h+='<div>';
      let nowShown=false;
      scheduled.forEach(b=>{
        if(isToday && !nowShown && b.start>nowMin){
          h+=\`<div class="nowbar"><span class="lbl">\${toHM(nowMin)}</span><span class="line"></span></div>\`; nowShown=true;
        }
        const tr=ov.track[b.key]||{status:'idle',spent:null};
        const done=tr.status==='done', running=tr.status==='running';
        let fact='';
        if(done&&tr.spent!=null){
          const over=tr.spent>b.dur*1.15;
          fact=\`<span class="fact \${over?'over':''}">факт \${fmtDur(tr.spent)}</span>\`;
        }
        let ctrl='';
        if(running){
          const el=Math.max(0,Math.round((Date.now()-tr.startTs)/60000));
          ctrl=\`<div class="ctrl"><span class="runt">\${el<1?'меньше минуты':fmtDur(el)}</span><button class="btn sm" data-done="\${b.key}">Готово</button></div>\`;
        } else if(done){
          ctrl=\`<button class="chk on" data-reset="\${b.key}" title="Снять отметку">\${ICON_CHECK}</button>\`;
        } else {
          ctrl=\`<button class="btn sm ghost" data-start="\${b.key}">Приступить</button>\`;
        }
        const det = ov.detail[b.key]||'';
        let picker='';
        if(b.list && LISTS[b.list]){
          const lst=LISTS[b.list], items=lst.items||[];
          const chips=items.map(it=>\`<button class="pchip \${it===det?'on':''}" data-pick="\${b.key}" data-val="\${esc(it)}">\${esc(it)}</button>\`).join('');
          const isMeal=b.list==='meals';
          picker=\`<details class="picker" data-pk="\${b.key}">
            <summary>\${det? esc(det)+' ▾' : ('Выбрать · '+lst.title.toLowerCase()+' ▾')}</summary>
            <div class="picker-body">
              <div class="chips">\${chips||'<span class="sub">список пуст, добавь ниже</span>'}</div>
              <div class="picker-add">
                <input type="text" class="pinput" placeholder="Добавить своё" data-list="\${b.list}" data-key="\${b.key}">
                <button class="btn sm ghost" data-addval="\${b.key}" data-list="\${b.list}">В список</button>
                \${isMeal&&items.length?\`<button class="btn sm ghost" data-suggest="\${b.key}" data-list="\${b.list}">Предложить</button>\`:''}
                \${det?\`<button class="btn sm ghost" data-cleardet="\${b.key}">Убрать</button>\`:''}
              </div>
            </div>
          </details>\`;
        }
        h+=\`<div class="block \${done?'done':''} \${running?'running':''}" data-key="\${b.key}">
          <div class="time"><b>\${toHM(b.start)}</b>\${toHM(b.endm)}</div>
          <div class="body">
            <div class="name">\${catBadge(b.cat)}\${esc(b.name)}\${det?': '+esc(det):''}</div>
            <div class="meta"><span>план \${fmtDur(b.dur)}</span>\${fact}\${b.ptype?'<span class="tag tag-p">проект</span>':''}\${b.fixed?'<span class="tag">фикс.</span>':''}</div>
            \${picker}
          </div>
          \${ctrl}
          \${String(b.key).startsWith('o')?\`<button class="del" data-del="\${b.key}" title="Удалить">\${ICON_CROSS}</button>\`:''}
        </div>\`;
      });
      if(isToday && !nowShown){
        h+=\`<div class="nowbar"><span class="lbl">\${toHM(nowMin)}</span><span class="line"></span></div>\`;
      }
      h+='</div>';
    }
    if(overflow.length){
      h+='<div class="overflow"><h3>Не помещается в этот день</h3>';
      overflow.forEach(t=>{ h+=\`<div class="it">• \${esc(t.name)} — \${fmtDur(t.dur)}</div>\`; });
      h+='<div class="sub" style="margin-top:6px">День не резиновый: сдвинь его границы, сократи что-то из списка или перенеси часть на другой день.</div></div>';
    }
    view.innerHTML=h;

    document.getElementById('dstart').onchange=e=>{SET.start=e.target.value;saveSet();render();};
    document.getElementById('dend').onchange=e=>{SET.end=e.target.value;saveSet();render();};
    view.querySelectorAll('[data-start]').forEach(el=>el.onclick=()=>{
      const k=el.dataset.start;
      // если было что-то другое запущено в этот день, ничего не трогаем, можно вести несколько дел
      ov.track[k]={status:'running',startTs:Date.now(),spent:null,counted:false};
      saveOvr(); render();
    });
    view.querySelectorAll('[data-done]').forEach(el=>el.onclick=()=>{
      const k=el.dataset.done, tr=ov.track[k]||{startTs:Date.now(),counted:false};
      const spent=Math.max(1,Math.round((Date.now()-(tr.startTs||Date.now()))/60000));
      const wasCounted=tr.counted;
      ov.track[k]={status:'done',startTs:tr.startTs||0,spent,counted:true};
      if(!wasCounted){
        statsAdd(k,spent);
        const oo=(ov.oneoffs||[]).find(o=>o.id===k);
        if(oo&&oo.ptype) ptypeAdd(oo.ptype,spent);
      }
      saveOvr(); render();
    });
    view.querySelectorAll('[data-reset]').forEach(el=>el.onclick=()=>{
      const k=el.dataset.reset; const tr=ov.track[k]||{};
      ov.track[k]={status:'idle',startTs:0,spent:null,counted:tr.counted}; // счётчик не откатываем, чтобы факт не задвоился
      saveOvr(); render();
    });
    view.querySelectorAll('[data-del]').forEach(el=>el.onclick=()=>{
      const k=el.dataset.del; ov.oneoffs=ov.oneoffs.filter(o=>o.id!==k); delete ov.track[k]; delete ov.detail[k]; saveOvr(); render();
    });
    view.querySelectorAll('[data-pick]').forEach(el=>el.onclick=()=>{
      ov.detail[el.dataset.pick]=el.dataset.val; saveOvr(); render();
    });
    view.querySelectorAll('[data-cleardet]').forEach(el=>el.onclick=()=>{
      delete ov.detail[el.dataset.cleardet]; saveOvr(); render();
    });
    view.querySelectorAll('[data-addval]').forEach(el=>el.onclick=()=>{
      const key=el.dataset.addval, listId=el.dataset.list;
      const inp=view.querySelector(\`.pinput[data-key="\${key}"]\`);
      const val=inp.value.trim(); if(!val) return;
      if(!LISTS[listId].items.includes(val)) LISTS[listId].items.push(val);
      saveLists(); ov.detail[key]=val; saveOvr(); render();
    });
    view.querySelectorAll('[data-suggest]').forEach(el=>el.onclick=()=>{
      const key=el.dataset.suggest, items=LISTS[el.dataset.list].items;
      if(!items.length) return;
      ov.detail[key]=items[Math.floor(Math.random()*items.length)]; saveOvr(); render();
    });
    // тикаем раз в 30 секунд, пока есть идущее дело
    if(Object.values(ov.track).some(t=>t.status==='running')){
      _tick=setInterval(()=>{ if(tab==='day') render(); }, 30000);
    }
  }

  function catOptions(sel){
    return Object.entries(CATS).map(([k,v])=>\`<option value="\${k}" \${k===sel?'selected':''}>\${v.n}</option>\`).join('');
  }

  function renderAdd(){
    let h='';
    // quick task
    h+=\`<div class="card">
      <div class="formtitle">Разовое дело на этот день</div>
      <div class="frow">
        <input type="text" id="qname" placeholder="Что сделать">
        <button class="mic" id="qmic" title="Продиктовать">\${ICON_MIC}</button>
      </div>
      <div class="frow" style="margin-top:8px">
        <label class="sub">Минут <input class="num" type="number" id="qdur" value="30" min="5" step="5"></label>
        <select id="qcat">\${catOptions('dom')}</select>
        <button class="btn" id="qadd">Добавить в день</button>
      </div>
      <div class="hint">Встанет в ближайшее свободное окно. Микрофон использует распознавание браузера и работает не на всех телефонах.</div>
    </div>\`;
    // project intake with learning type base
    const opts = PTYPES.map(p=>{
      const a=ptypeAvg(p);
      return \`<option value="\${p.id}">\${esc(p.name)}\${a!=null?' — обычно '+fmtDur(a):' — пока 1,5 ч'}</option>\`;
    }).join('');
    h+=\`<div class="card">
      <div class="formtitle">Приём проекта</div>
      <div class="frow">
        <select id="ptype" style="flex:1;min-width:160px">
          \${opts}
          <option value="__new__">+ Новый тип работы</option>
        </select>
      </div>
      <div class="frow" id="newtyperow" style="margin-top:8px;display:\${PTYPES.length?'none':'flex'}">
        <input type="text" id="ptname" placeholder="Название типа, например Текст на сайт">
      </div>
      <div class="frow" style="margin-top:8px">
        <input type="text" id="pdesc" placeholder="Опишите этот проект (заказчик, тема) — необязательно">
      </div>
      <div class="frow" style="margin-top:8px">
        <label class="sub">Планирую, мин <input class="num" type="number" id="pdur" value="\${DEFAULT_PROJ}" min="5" step="5"></label>
        <span class="sub" id="phint"></span>
        <button class="btn" id="padd">Добавить в день</button>
      </div>
      <div class="hint">Время подставляется из базы по этому типу. Пока замеров нет, планирую полтора часа. Нажмёшь «Готово» на задаче, и система уточнит среднее по факту.</div>\`;
    if(PTYPES.length){
      h+=\`<div class="ptbase"><div class="ptbase-t">Что система уже знает</div>\`;
      PTYPES.forEach(p=>{
        const a=ptypeAvg(p);
        h+=\`<div class="ptrow"><span>\${esc(p.name)}</span><span class="ptr-r">\${a!=null?fmtDur(a)+' · '+p.count+' '+plural(p.count,'замер','замера','замеров'):'нет данных'} <button class="ptdel" data-ptdel="\${p.id}" title="Удалить тип">\${ICON_CROSS}</button></span></div>\`;
      });
      h+=\`</div>\`;
    }
    h+=\`</div>\`;
    view.innerHTML=h;

    document.getElementById('qadd').onclick=()=>{
      const name=document.getElementById('qname').value.trim(); if(!name) return;
      const dur=+document.getElementById('qdur').value||30;
      const cat=document.getElementById('qcat').value;
      const ov=ovrFor(dstr(cur));
      ov.oneoffs.push({id:'o'+Date.now(),name,cat,dur,fixed:false,time:''});
      saveOvr(); tab='day'; render();
    };

    const psel=document.getElementById('ptype');
    const newrow=document.getElementById('newtyperow');
    const pdur=document.getElementById('pdur');
    const phint=document.getElementById('phint');
    function syncType(){
      if(psel.value==='__new__'){
        newrow.style.display='flex';
        pdur.value=DEFAULT_PROJ; phint.textContent='новый тип, по умолчанию 1,5 ч';
      } else {
        newrow.style.display='none';
        const p=ptypeById(psel.value); const a=ptypeAvg(p);
        pdur.value=ptypePlan(p);
        phint.textContent = a!=null? 'среднее по '+p.count+' '+plural(p.count,'замеру','замерам','замерам') : 'пока нет данных, 1,5 ч';
      }
    }
    psel.onchange=syncType; syncType();

    document.getElementById('padd').onclick=()=>{
      let typeId=psel.value, typeName='';
      if(typeId==='__new__'){
        typeName=document.getElementById('ptname').value.trim();
        if(!typeName){ document.getElementById('ptname').focus(); return; }
        typeId='p'+Date.now();
        PTYPES.push({id:typeId,name:typeName,sum:0,count:0}); savePtypes();
      } else {
        typeName=ptypeById(typeId).name;
      }
      const desc=document.getElementById('pdesc').value.trim();
      const dur=+pdur.value||DEFAULT_PROJ;
      const ov=ovrFor(dstr(cur));
      ov.oneoffs.push({id:'o'+Date.now(),name:desc?typeName+': '+desc:typeName,cat:'rab',dur,fixed:false,time:'',ptype:typeId});
      saveOvr(); tab='day'; render();
    };
    view.querySelectorAll('[data-ptdel]').forEach(el=>el.onclick=()=>{
      const id=el.dataset.ptdel, p=ptypeById(id);
      if(confirm('Удалить тип «'+p.name+'» из базы? Накопленные замеры пропадут.')){
        PTYPES=PTYPES.filter(x=>x.id!==id); savePtypes(); renderAdd();
      }
    });
    setupMic('qmic','qname');
  }

  function renderLib(){
    let h='';
    LIB.forEach((t,i)=>{
      const daily=t.days==='daily';
      h+=\`<div class="lib-item" data-i="\${i}">
        <div class="lib-top">
          \${catBadge(t.cat)}
          <input class="name" data-f="name" value="\${esc(t.name)}">
          <button class="lib-del" data-del="\${i}">удалить</button>
        </div>
        <div class="lib-row">
          <div class="catsel"><select data-f="cat">\${catOptions(t.cat)}</select></div>
          <label>Минут <input class="num" type="number" data-f="dur" value="\${t.dur}" min="5" step="5"></label>
          <div class="toggle">Фикс. время
            <div class="switch \${t.fixed?'on':''}" data-f="fixed"><b></b></div>
            \${t.fixed?\`<input type="time" data-f="time" value="\${t.time||'09:00'}">\`:''}
          </div>
        </div>
        <div class="lib-row">
          <label>Справочник вариантов
            <select data-f="list">
              <option value="">без справочника</option>
              \${Object.entries(LISTS).map(([id,l])=>\`<option value="\${id}" \${t.list===id?'selected':''}>\${esc(l.title)}</option>\`).join('')}
            </select>
          </label>
        </div>
        <div class="lib-row">
          <div class="days">
            <button class="day every \${daily?'on':''}" data-day="daily">каждый день</button>
            \${[1,2,3,4,5,6,0].map(wd=>\`<button class="day \${(!daily&&t.days.includes(wd))?'on':''}" data-day="\${wd}">\${DOW_SHORT[wd]}</button>\`).join('')}
          </div>
        </div>
        \${statAvg(t.id)!=null?\`<div class="statline">По факту в среднем \${fmtDur(statAvg(t.id))} за \${STATS[t.id].count} \${plural(STATS[t.id].count,'замер','замера','замеров')}\${statAvg(t.id)!==+t.dur?\` <button class="applystat" data-apply="\${i}">поставить как длительность</button>\`:''}</div>\`:''}
      </div>\`;
    });
    h+=\`<button class="addlib" id="addlib">+ Добавить постоянное дело</button>\`;

    h+=\`<div class="libs-section"><div class="ptbase-t" style="margin-top:20px">Справочники</div>\`;
    Object.entries(LISTS).forEach(([id,l])=>{
      h+=\`<div class="lib-item">
        <div class="lib-top"><input class="name" data-listtitle="\${id}" value="\${esc(l.title)}"></div>
        <div class="chips" style="margin-top:10px">
          \${l.items.map(it=>\`<span class="ichip">\${esc(it)}<button data-rmitem="\${id}" data-val="\${esc(it)}" title="Убрать">\${ICON_CROSS}</button></span>\`).join('')||'<span class="sub">пусто</span>'}
        </div>
        <div class="picker-add" style="margin-top:10px">
          <input type="text" class="litem-inp" data-additem="\${id}" placeholder="\${id==='meals'?'Добавить блюдо':'Добавить пункт'}">
          <button class="btn sm ghost" data-additembtn="\${id}">Добавить</button>
        </div>
      </div>\`;
    });
    h+=\`<div class="hint">Эти списки всплывают в расписании: у дела с привязанным справочником можно на каждый день выбрать конкретный пункт, например блюдо на готовку или зону на уборку.</div></div>\`;
    view.innerHTML=h;

    view.querySelectorAll('.lib-item').forEach(item=>{
      const i=+item.dataset.i, t=LIB[i];
      item.querySelector('[data-f=name]').onchange=e=>{t.name=e.target.value;saveLib();};
      item.querySelector('[data-f=cat]').onchange=e=>{t.cat=e.target.value;saveLib();renderLib();};
      item.querySelector('[data-f=dur]').onchange=e=>{t.dur=+e.target.value||t.dur;saveLib();};
      item.querySelector('[data-f=list]').onchange=e=>{t.list=e.target.value||undefined;saveLib();};
      const tm=item.querySelector('[data-f=time]'); if(tm) tm.onchange=e=>{t.time=e.target.value;saveLib();};
      item.querySelector('[data-f=fixed]').onclick=()=>{t.fixed=!t.fixed; if(t.fixed&&!t.time)t.time='09:00'; saveLib();renderLib();};
      item.querySelectorAll('[data-day]').forEach(db=>db.onclick=()=>{
        const v=db.dataset.day;
        if(v==='daily'){ t.days='daily'; }
        else{ const wd=+v; if(t.days==='daily') t.days=[wd];
          else if(t.days.includes(wd)){ t.days=t.days.filter(x=>x!==wd); if(!t.days.length) t.days='daily'; }
          else t.days.push(wd); }
        saveLib(); renderLib();
      });
      const ap=item.querySelector('[data-apply]'); if(ap) ap.onclick=()=>{ t.dur=statAvg(t.id); saveLib(); renderLib(); };
      item.querySelector('[data-del]').onclick=()=>{ if(confirm('Удалить «'+t.name+'» из постоянных дел?')){ LIB.splice(i,1); saveLib(); renderLib(); } };
    });
    document.getElementById('addlib').onclick=()=>{
      LIB.push({id:'l'+Date.now(),name:'Новое дело',cat:'pro',dur:30,fixed:false,time:'',days:'daily'});
      saveLib(); renderLib();
    };
    view.querySelectorAll('[data-listtitle]').forEach(el=>el.onchange=()=>{
      LISTS[el.dataset.listtitle].title=el.value.trim()||LISTS[el.dataset.listtitle].title; saveLists(); renderLib();
    });
    view.querySelectorAll('[data-rmitem]').forEach(el=>el.onclick=()=>{
      const id=el.dataset.rmitem; LISTS[id].items=LISTS[id].items.filter(x=>x!==el.dataset.val); saveLists(); renderLib();
    });
    view.querySelectorAll('[data-additembtn]').forEach(el=>el.onclick=()=>{
      const id=el.dataset.additembtn, inp=view.querySelector(\`.litem-inp[data-additem="\${id}"]\`);
      const v=inp.value.trim(); if(!v) return;
      if(!LISTS[id].items.includes(v)) LISTS[id].items.push(v);
      saveLists(); renderLib();
    });
  }

  // ---------- mic ----------
  function setupMic(btnId,inputId){
    const btn=document.getElementById(btnId); if(!btn) return;
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){ btn.onclick=()=>{ const inp=document.getElementById(inputId); inp.placeholder='Голос не поддерживается тут, впиши текстом'; inp.focus(); }; return; }
    let rec=null;
    btn.onclick=()=>{
      if(rec){ rec.stop(); return; }
      rec=new SR(); rec.lang='ru-RU'; rec.interimResults=false;
      btn.classList.add('rec');
      rec.onresult=e=>{ document.getElementById(inputId).value=e.results[0][0].transcript; };
      rec.onend=()=>{ btn.classList.remove('rec'); rec=null; };
      rec.onerror=()=>{ btn.classList.remove('rec'); rec=null; };
      rec.start();
    };
  }

  function esc(s){ return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

  // ---------- nav / tabs ----------
  document.getElementById('prev').onclick=()=>{cur.setDate(cur.getDate()-1);render();};
  document.getElementById('next').onclick=()=>{cur.setDate(cur.getDate()+1);render();};
  document.getElementById('todayLink').onclick=()=>{cur=new Date();render();};
  document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render();});

  load().then(render);
})();
</script>

</body>
</html>
`;
