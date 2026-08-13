const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=matchMedia('(pointer:fine)').matches;

const menuBtn=document.getElementById('menuBtn');
const mobileMenu=document.getElementById('mobileMenu');
menuBtn?.addEventListener('click',()=>mobileMenu.classList.toggle('open'));
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('show');revealObserver.unobserve(entry.target)}
}),{threshold:.12});
document.querySelectorAll('.reveal,.stagger').forEach(el=>revealObserver.observe(el));

document.querySelectorAll('.spotlight,.btn').forEach(el=>el.addEventListener('pointermove',e=>{
  const r=el.getBoundingClientRect();
  el.style.setProperty('--x',(e.clientX-r.left)+'px');
  el.style.setProperty('--y',(e.clientY-r.top)+'px');
  el.style.setProperty('--mx',(e.clientX-r.left)+'px');
  el.style.setProperty('--my',(e.clientY-r.top)+'px');
}));

if(!reduced&&finePointer){
  const hv=document.getElementById('heroVisual');
  hv?.addEventListener('pointermove',e=>{
    const r=hv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    hv.style.transform=`perspective(900px) rotateY(${x*4}deg) rotateX(${-y*3}deg)`;
  });
  hv?.addEventListener('pointerleave',()=>hv.style.transform='');
  document.querySelectorAll('.magnetic').forEach(b=>{
    b.addEventListener('pointermove',e=>{
      const r=b.getBoundingClientRect();
      b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.05}px,${(e.clientY-r.top-r.height/2)*.08}px)`;
    });
    b.addEventListener('pointerleave',()=>b.style.transform='');
  });
}

const cases={
  assistant:{label:'Сценарий 01',title:'Корпоративный AI-помощник',text:'Сотрудник задаёт вопрос на естественном языке, система находит контекст в корпоративных данных, формирует ответ и возвращает его в привычный интерфейс.',pipe:['Сотрудник','Запрос','База знаний','AI-модель','Ответ'],result:'Быстрее доступ к корпоративным знаниям'},
  docs:{label:'Сценарий 02',title:'Интеллектуальная работа с документами',text:'AI извлекает нужные данные, классифицирует документы, формирует сводки и готовит материалы по заданным правилам.',pipe:['Документ','Извлечение','Проверка','AI-анализ','Результат'],result:'Меньше ручной обработки документов'},
  process:{label:'Сценарий 03',title:'Автоматизация бизнес-процесса',text:'Событие в рабочей системе запускает цепочку: данные передаются в AI, результат проверяется и автоматически инициирует следующее действие.',pipe:['Триггер','Данные','AI','Правила','Действие'],result:'Сокращение повторяющихся операций'},
  agent:{label:'Сценарий 04',title:'AI-агент с инструментами',text:'Агент получает цель, планирует шаги, обращается к данным и API, выполняет действия и возвращает итог пользователю.',pipe:['Цель','План','Инструменты','Действия','Итог'],result:'Автономное выполнение многошаговых задач'}
};
const stage=document.getElementById('caseStage');
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  const c=cases[t.dataset.case];
  if(!c||!stage)return;
  if(!reduced)stage.animate([{opacity:.45,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:260,easing:'ease-out'});
  stage.innerHTML=`<div class="case-label">${c.label}</div><h3>${c.title}</h3><p>${c.text}</p><div class="pipeline">${c.pipe.map((p,i)=>`<span class="pipe">${p}</span>${i<c.pipe.length-1?'<span class="arrow">→</span>':''}`).join('')}</div><div class="case-result"><svg viewBox="0 0 24 24"><path d="M5 12l4 4L19 6"/></svg>${c.result}</div>`;
}));

const stepData=[
 ['01. Понимаем результат','Определяем бизнес-задачу, ожидаемый эффект и точку, где AI действительно полезен.'],
 ['02. Выбираем модели','Сопоставляем модели с задачей по качеству, скорости, стоимости и ограничениям.'],
 ['03. Соединяем компоненты','Настраиваем контекст, API, автоматизации и взаимодействие систем.'],
 ['04. Строим инфраструктуру','Создаём управляемый корпоративный контур для комфортной работы.'],
 ['05. Формируем ИБД','Подключаем собственные или коммерческие данные и знания.']
];
const cards=[...document.querySelectorAll('.step-card')];
const bar=document.getElementById('progressBar'),pt=document.getElementById('progressTitle'),px=document.getElementById('progressText');
const stepObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){
    const i=+entry.target.dataset.step-1;
    cards.forEach(x=>x.classList.toggle('active',x===entry.target));
    if(bar)bar.style.width=((i+1)*20)+'%';
    if(pt)pt.textContent=stepData[i][0];
    if(px)px.textContent=stepData[i][1];
  }
}),{threshold:.55});
cards.forEach(c=>stepObserver.observe(c));

const capabilityCopy={
 'AI-агенты':{title:'AI-агенты',text:'Автономные помощники, которые получают цель, планируют последовательность действий, обращаются к данным и инструментам и выполняют многошаговые задачи.',benefit:'Снимают часть повторяющихся операций с сотрудников.'},
 'Базы знаний':{title:'Базы знаний',text:'Корпоративный контур знаний, где документы и данные становятся доступными для поиска, анализа и точных ответов AI.',benefit:'Ускоряют доступ к накопленной экспертизе компании.'},
 'API и интеграции':{title:'API и интеграции',text:'Связываем AI с CRM, ERP, документооборотом, внутренними сервисами и внешними API, чтобы решения работали внутри существующих процессов.',benefit:'AI становится частью рабочего процесса, а не отдельным инструментом.'},
 'Автоматизация':{title:'Автоматизация',text:'Настраиваем сценарии, в которых событие автоматически запускает AI-анализ, проверку, подготовку результата и последующее действие.',benefit:'Сокращает ручную работу и время выполнения процессов.'},
 'Методологии':{title:'Методологии',text:'Создаём правила, сценарии и стандарты применения AI: как ставить задачи, проверять качество и получать воспроизводимый результат.',benefit:'Помогают масштабировать AI без хаоса и потери качества.'},
 'Обучение':{title:'Обучение',text:'Обучаем сотрудников применять AI на реальных задачах компании: промптинг, контекст, проверка результатов и безопасная работа с данными.',benefit:'Повышает практическую отдачу от AI в ежедневной работе.'}
};

const chips=[...document.querySelectorAll('.chip')];
chips.forEach(chip=>{
  const label=chip.textContent.trim();
  const item=capabilityCopy[label];
  if(!item)return;
  chip.setAttribute('tabindex','0');
  chip.setAttribute('role','button');
  chip.setAttribute('aria-expanded','false');
  const existing=[...chip.childNodes];
  const labelWrap=document.createElement('span');
  labelWrap.className='chip-label';
  existing.forEach(n=>labelWrap.appendChild(n));
  chip.appendChild(labelWrap);
  const pop=document.createElement('span');
  pop.className='chip-popover';
  pop.innerHTML=`<strong>${item.title}</strong><p>${item.text}</p><span class="benefit">${item.benefit}</span>`;
  chip.appendChild(pop);
});

const closeCapabilities=except=>chips.forEach(ch=>{
  if(ch!==except){ch.classList.remove('open');ch.setAttribute('aria-expanded','false')}
});
chips.forEach(chip=>{
  chip.addEventListener('click',e=>{
    if(finePointer&&innerWidth>560)return;
    e.stopPropagation();
    const willOpen=!chip.classList.contains('open');
    closeCapabilities(chip);
    chip.classList.toggle('open',willOpen);
    chip.setAttribute('aria-expanded',String(willOpen));
  });
  chip.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){e.preventDefault();const willOpen=!chip.classList.contains('open');closeCapabilities(chip);chip.classList.toggle('open',willOpen);chip.setAttribute('aria-expanded',String(willOpen))}
    if(e.key==='Escape'){chip.classList.remove('open');chip.setAttribute('aria-expanded','false');chip.blur()}
  });
});
document.addEventListener('click',()=>closeCapabilities());

if('startViewTransition'in document){
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(!id||id==='#')return;
    const target=document.querySelector(id);
    if(!target)return;
    e.preventDefault();
    document.startViewTransition(()=>target.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'}));
  }));
}

// Progressive enhancement module: themes, languages, details, particles and back-to-top.
const enhancementScript=document.createElement('script');
enhancementScript.src='assets/enhancements.js';
enhancementScript.defer=true;
document.head.appendChild(enhancementScript);
