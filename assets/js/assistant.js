(()=>{
 const K=window.TDJ_KNOWLEDGE, F=K.facts;
 const launcher=document.getElementById('tdj-assistant-launcher'),panel=document.getElementById('tdj-assistant'),chat=document.getElementById('tdj-a-chat'),form=document.getElementById('tdj-a-form'),input=document.getElementById('tdj-a-input');
 const norm=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
 function add(text,who='bot'){const d=document.createElement('div');d.className='tdj-a-msg '+who;d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
 function ageOf(s){const m=s.match(/\b(\d{1,2})\s*(let|roku|roky|lete|leta)?\b/);return m?+m[1]:null}
 function catFor(s){
   const age=ageOf(s); if(age===null) return null;
   const female=/(dcera|divka|holka|zena|zens|female)/.test(s), male=/(syn|chlapec|kluk|muz|male)/.test(s);
   if(!female&&!male) return `Pro věk ${age} let potřebuji ještě vědět, zda jde o chlapce/muže, nebo dívku/ženu.`;
   const list=female?K.categories.female:K.categories.male;
   const row=list.find(r=>age>=r[0]&&age<=r[1]);
   return row?`Pro ${female?'dívku/ženu':'chlapce/muže'} ve věku ${age} let odpovídá kategorie ${row[2]}.` : null;
 }
 function answer(q){
   const s=norm(q);
   const cat=catFor(s); if(cat && /(kategori|dcera|syn|divka|chlapec|holka|kluk|let|vek)/.test(s)) return cat;
   if(/(startovn|kolik.*stoji|cena|platb)/.test(s)) return `Online startovné je ${F.startovneOnline}; při přihlášení na místě ${F.startovneMisto}. ${F.registrace}`;
   if(/(registr|prihl|prezent|zaplat|uhrad)/.test(s)) return `${F.registrace} Prezentace na místě probíhá ${F.prezentace}.`;
   if(/(kdy|termin|datum|den.*zavod)/.test(s)) return `Ročník 2027 je plánovaný na ${F.termin}. Jakmile bude přesné datum potvrzené, objeví se na webu TDJ.`;
   if(/(v kolik|cas.*start|kdy.*start|startuje)/.test(s)) return `Start hlavního závodu je v ${F.start} u restaurace Lidová zahrada ve Varnsdorfu. Prezentace probíhá ${F.prezentace}.`;
   if(/(kde.*start|misto.*start|lidov)/.test(s)) return `Start je: ${F.mistoStartu}. Cíl je u rozhledny Jedlová.`;
   if(/(tras|kilometr|dlouh|prevys|profil|vede|jedlovou)/.test(s)) return `Hlavní trasa má ${F.delka} a převýšení přibližně ${F.prevyseni}. ${K.route}`;
   if(/(kategori|vek)/.test(s)) return `Kategorie jsou věkové, zvlášť pro muže/chlapce a ženy/dívky. Napiš mi například „syn 14 let“ nebo „žena 42 let“ a určím kategorii.`;
   if(/(helma|prilb)/.test(s)) return `Ano. ${K.rules[7]}`;
   if(/(dite|deti|mladsi|nezlet|15 let|18 let)/.test(s)) return `${K.rules[4]} ${K.rules[5]}`;
   if(/(pocasi|dest|prsi)/.test(s)) return K.rules[2];
   if(/(provoz|silnic|uzavren)/.test(s)) return `${K.rules[0]} ${K.rules[1]}`;
   if(/(zdravot|sanit|zachran)/.test(s)) return K.rules[6];
   if(/(vysled)/.test(s)) return F.vysledky;
   if(/(fot|galeri|obrazk)/.test(s)) return F.fotky;
   if(/(histor|pribeh)/.test(s)) return F.pribeh;
   if(/(pomah|radimek|tomasek|sbirk)/.test(s)) return F.pomahame;
   if(/(cc varnsdorf|pohar)/.test(s)) return F.pohar;
   if(/(cil|rozhledn)/.test(s)) return `Cíl závodu je u rozhledny Jedlová, přibližně v nadmořské výšce ${F.vyskaCile}.`;
   return 'Tuhle informaci zatím v ověřených datech TDJ nemám. Nechci si ji vymýšlet. Dotaz si ale můžeme později zařadit mezi témata, která má TDJ Asistentka znát.';
 }
 launcher.onclick=()=>panel.classList.toggle('open');
 document.getElementById('tdj-a-close').onclick=()=>panel.classList.remove('open');
 document.querySelectorAll('.tdj-a-chip').forEach(b=>b.onclick=()=>{const labels={startovne:'Kolik je startovné?',registrace:'Jak funguje registrace?',trasa:'Jaká je trasa?',kategorie:'Jaké jsou kategorie?'};const q=labels[b.dataset.key]||b.textContent;add(q,'user');setTimeout(()=>add(answer(q)),120)});
 form.onsubmit=e=>{e.preventDefault();let q=input.value.trim();if(!q)return;add(q,'user');input.value='';setTimeout(()=>add(answer(q)),140)};
})();