(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;

/* Hero system telemetry */
const heroVisual=$('#heroVisual');
if(heroVisual){
  heroVisual.insertAdjacentHTML('afterbegin','<div class="visual-system-status">AI SYSTEM ONLINE</div><div class="visual-scan" aria-hidden="true"></div>');
  const net=$('.network',heroVisual);
  if(net){
    net.insertAdjacentHTML('afterbegin','<i class="orbit o1" aria-hidden="true"></i><i class="orbit o2" aria-hidden="true"></i><i class="orbit o3" aria-hidden="true"></i>');
  }
  const row=document.createElement('div'); row.className='hero-signal-row'; row.setAttribute('aria-hidden','true');
  row.innerHTML='<div class="signal-unit"><b>MODEL</b><span>adaptive routing</span></div><div class="signal-unit"><b>CONTEXT</b><span>knowledge grounded</span></div><div class="signal-unit"><b>API</b><span>systems connected</span></div><div class="signal-unit"><b>CONTROL</b><span>enterprise ready</span></div>';
  heroVisual.appendChild(row);
}

/* Story bridge between services and use cases */
const servicesWrap=$('#services .wrap');
if(servicesWrap){
  const bridge=document.createElement('div');bridge.className='synapse-bridge reveal';bridge.id='synapseBridge';
  bridge.innerHTML='<div class="bridge-head"><span class="bridge-kicker">FROM CAPABILITIES TO BUSINESS VALUE</span><span class="bridge-copy">Навыки и технологии соединяются в работающий сценарий</span></div><div class="bridge-track"><span class="bridge-line"></span><span class="bridge-pulse"></span><div class="bridge-step active"><i></i><b>Навык</b><span>понимаем задачу</span></div><div class="bridge-step"><i></i><b>Метод</b><span>фиксируем правила</span></div><div class="bridge-step"><i></i><b>Система</b><span>соединяем AI и данные</span></div><div class="bridge-step"><i></i><b>Результат</b><span>встраиваем в процесс</span></div></div>';
  servicesWrap.appendChild(bridge);
  const updateBridge=()=>{
    const r=bridge.getBoundingClientRect();
    const start=innerHeight*.88,end=innerHeight*.28;
    const p=Math.max(0,Math.min(1,(start-r.top)/(start-end)));
    bridge.style.setProperty('--bridge-progress',p.toFixed(3));
    const steps=$$('.bridge-step',bridge);const idx=Math.min(3,Math.floor(p*4));steps.forEach((s,i)=>s.classList.toggle('active',i<=idx));
  };
  addEventListener('scroll',updateBridge,{passive:true});addEventListener('resize',updateBridge,{passive:true});updateBridge();
}

/* Region visual inside company card */
const aboutCard=$('.about-card');
if(aboutCard){
  const stage=document.createElement('div');stage.className='region-stage';stage.setAttribute('aria-hidden','true');
  stage.innerHTML=`<div class="region-grid"></div><svg class="region-contours" viewBox="0 0 420 190" preserveAspectRatio="none"><path d="M15 144C54 111 54 63 100 55c42-8 63 24 100 10 41-15 47-54 96-48 48 6 55 47 107 37"/><path d="M4 165c52-18 71-45 114-31 51 17 68-13 113-15 59-3 82 38 179 9"/><path d="M42 25c45 28 61 45 104 41 47-4 65-44 111-32 41 11 59 53 137 48"/></svg><div class="region-badge">REPUBLIC OF BASHKORTOSTAN</div><div class="region-code">RB</div><span class="region-ripple"></span><span class="region-pin"></span><span class="region-city">KUMERTAU</span><div class="region-meta"><span>URAL REGION</span><span>AI TECHNOLOGY</span><span>TOUCH SYNAPSE</span></div>`;
  aboutCard.prepend(stage);
  if(fine&&!reduced){
    aboutCard.addEventListener('pointermove',e=>{const r=aboutCard.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;stage.style.setProperty('--rx',`${x*12}px`);stage.style.setProperty('--ry',`${y*10}px`)});
    aboutCard.addEventListener('pointerleave',()=>{stage.style.setProperty('--rx','0px');stage.style.setProperty('--ry','0px')});
  }
}

/* Gentle case feedback */
const caseStage=$('#caseStage');$$('#caseTabs .tab').forEach(tab=>tab.addEventListener('click',()=>{if(!caseStage)return;caseStage.classList.remove('case-pulse');requestAnimationFrame(()=>{caseStage.classList.add('case-pulse');setTimeout(()=>caseStage.classList.remove('case-pulse'),500)})}));

/* Add new reveal node to existing animation flow */
const bridge=$('#synapseBridge');
if(bridge){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.12});io.observe(bridge);
}
})();