(()=>{
  const modules=['theme-ui.js','i18n.js','details.js','particles.js'];
  let chain=Promise.resolve();
  modules.forEach(name=>{
    chain=chain.then(()=>new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=`assets/${name}`;
      s.onload=resolve;
      s.onerror=reject;
      document.head.appendChild(s);
    }));
  });
  chain.catch(err=>console.error('Touch Synapse enhancement module failed:',err));
})();
