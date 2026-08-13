(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const navIn=$('.nav-in');
if(navIn&&!$('.site-controls')){
  const controls=document.createElement('div');
  controls.className='site-controls';
  controls.innerHTML=`<button class="control-btn" id="themeToggle" type="button" aria-label="Theme"></button><div class="lang-switch" role="group" aria-label="Language"><button type="button" data-lang="ru">RU</button><button type="button" data-lang="en">EN</button><button type="button" data-lang="kk">KZ</button></div>`;
  navIn.insertBefore(controls,$('#menuBtn')||null);
}
const themeBtn=$('#themeToggle');
const sun='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const moon='<svg viewBox="0 0 24 24"><path d="M20.5 14.7A8 8 0 0 1 9.3 3.5 8.2 8.2 0 1 0 20.5 14.7Z"/></svg>';
function setTheme(v){document.documentElement.dataset.theme=v;localStorage.setItem('ts-theme',v);if(themeBtn)themeBtn.innerHTML=v==='light'?moon:sun;const meta=$('meta[name="theme-color"]');if(meta)meta.content=v==='light'?'#f4f8fc':'#06101d';window.dispatchEvent(new CustomEvent('ts:theme',{detail:{theme:v}}));}
const saved=localStorage.getItem('ts-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
setTheme(saved);
themeBtn?.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='light'?'dark':'light'));

if(!$('.to-top')){
  const b=document.createElement('button');b.type='button';b.className='to-top';b.innerHTML='<svg viewBox="0 0 24 24"><path d="m6 15 6-6 6 6"/></svg>';b.title='Наверх';b.setAttribute('aria-label','Наверх');document.body.appendChild(b);const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const upd=()=>b.classList.toggle('show',scrollY>Math.max(560,innerHeight*.7));addEventListener('scroll',upd,{passive:true});upd();b.addEventListener('click',()=>scrollTo({top:0,behavior:reduced?'auto':'smooth'}));
}
window.TSTheme={setTheme,get theme(){return document.documentElement.dataset.theme},themeBtn};
})();
