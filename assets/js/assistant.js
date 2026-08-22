(()=>{
 const launcher=document.getElementById('tdj-assistant-launcher'),panel=document.getElementById('tdj-assistant'),chat=document.getElementById('tdj-a-chat'),form=document.getElementById('tdj-a-form'),input=document.getElementById('tdj-a-input');
 const facts={
  startovne:'Online startovné je 150 Kč. Při přihlášení na místě je startovné 300 Kč. Online registrace pro ročník 2027 zatím není spuštěna.',
  registrace:'Online registrace pro ročník 2027 zatím není spuštěna. Prezentace na místě probíhá 9:00–9:40 před restaurací Lidová zahrada ve Varnsdorfu.',
  trasa:'Hlavní trasa má 10 km a převýšení přibližně 400 m+. Vede z Varnsdorfu přes Dolní Podluží, Jiřetín pod Jedlovou a Křížovou horu k rozhledně Jedlová.',
  kategorie:'Kategorie jsou rozdělené podle věku pro muže/chlapce a ženy/dívky, od dětí do 10 let až po veteránské kategorie. Pokud mi napíšeš věk a zda jde o muže/chlapce nebo ženu/dívku, zkusím určit kategorii.',
  start:'Start je v 10:00 u restaurace Lidová zahrada ve Varnsdorfu. Termín ročníku 2027 je zatím uveden jako srpen 2027.',
  default:'Tohle je zatím testovací verze TDJ Asistentky. Tento dotaz ještě nemám v ověřené znalostní bázi. V ostré AI verzi podobné dotazy využijeme k postupnému rozšiřování znalostí.'
 };
 function add(text,who='bot'){const d=document.createElement('div');d.className='tdj-a-msg '+who;d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
 function answer(q){let s=q.toLowerCase();if(/startovn|cena|kolik.*stoj/.test(s))return facts.startovne;if(/registr|přihl|prihl|prezent/.test(s))return facts.registrace;if(/tras|kilometr|převýš|prevys|jedlovou/.test(s))return facts.trasa;if(/kategori|věk|vek|let/.test(s))return facts.kategorie;if(/kdy|start|čas|cas|hodin/.test(s))return facts.start;return facts.default}
 launcher.onclick=()=>panel.classList.toggle('open');document.getElementById('tdj-a-close').onclick=()=>panel.classList.remove('open');
 document.querySelectorAll('.tdj-a-chip').forEach(b=>b.onclick=()=>{add(b.textContent,'user');setTimeout(()=>add(facts[b.dataset.key]),180)});
 form.onsubmit=e=>{e.preventDefault();let q=input.value.trim();if(!q)return;add(q,'user');input.value='';setTimeout(()=>add(answer(q)),220)};
})();
