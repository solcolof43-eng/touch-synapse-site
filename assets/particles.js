(()=>{
'use strict';
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
if(document.querySelector('.particle-canvas'))return;
const canvas=document.createElement('canvas');canvas.className='particle-canvas';canvas.setAttribute('aria-hidden','true');document.body.prepend(canvas);
const aurora=document.createElement('div');aurora.className='aurora-layer';aurora.setAttribute('aria-hidden','true');aurora.innerHTML='<i class="aurora a1"></i><i class="aurora a2"></i><i class="aurora a3"></i>';document.body.prepend(aurora);
const ctx=canvas.getContext('2d');let points=[],mx=-9999,my=-9999,raf=0;
function resize(){const d=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(innerWidth*d);canvas.height=Math.round(innerHeight*d);canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(d,0,0,d,0,0);const count=innerWidth<600?22:innerWidth<1000?36:56;points=Array.from({length:count},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,r:.5+Math.random()*1.2}))}
function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);const light=document.documentElement.dataset.theme==='light';for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;const d=Math.hypot(p.x-mx,p.y-my);if(d<120&&d>1){p.x+=(p.x-mx)/d*.1;p.y+=(p.y-my)/d*.1}ctx.beginPath();ctx.fillStyle=light?'rgba(0,105,140,.25)':'rgba(106,226,247,.40)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<105){ctx.beginPath();ctx.strokeStyle=light?`rgba(0,91,125,${.06*(1-d/105)})`:`rgba(92,214,243,${.105*(1-d/105)})`;ctx.lineWidth=.6;ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}raf=requestAnimationFrame(draw)}
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;document.documentElement.style.setProperty('--px',`${(e.clientX-innerWidth/2)*.06}px`);document.documentElement.style.setProperty('--py',`${(e.clientY-innerHeight/2)*.06}px`)},{passive:true});
addEventListener('resize',()=>{cancelAnimationFrame(raf);resize();draw()},{passive:true});resize();draw();
})();
