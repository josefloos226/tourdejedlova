(()=>{
const launcher=document.getElementById('tdj-assistant-launcher'),
panel=document.getElementById('tdj-assistant'),
chat=document.getElementById('tdj-a-chat'),
form=document.getElementById('tdj-a-form'),
input=document.getElementById('tdj-a-input');

const S={topic:null,pending:null,people:[],lastPerson:null,lastPriceMode:null};
const F={online:150,place:300,start:"10:00",presentation:"9:00–9:40",startPlace:"u restaurace Lidová zahrada ve Varnsdorfu",distance:"10 km",climb:"400 m+"};

const N=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[?!.,]/g," ").replace(/\s+/g," ").trim();
const has=(s,r)=>r.test(s);
function add(t,w='bot'){let d=document.createElement('div');d.className='tdj-a-msg '+w;d.textContent=t;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
function age(s){let m=s.match(/\b(\d{1,2})\b/);return m?+m[1]:null}
function gender(s){
 if(/(dcera|divka|holka|zena|manzelka|maminka)/.test(s))return'f';
 if(/(syn|chlapec|kluk|muz|manzel|tatinek)/.test(s))return'm';
 return null;
}
function category(a,g){
 const M=[[0,10,"A – chlapci do 10 let"],[11,15,"B – chlapci 11–15 let"],[16,29,"C – muži 16–29 let"],[30,39,"D – muži 30–39 let"],[40,49,"E – muži 40–49 let"],[50,59,"F – muži 50–59 let"],[60,69,"G – muži 60–69 let"],[70,150,"H – muži 70+"]],
 W=[[0,10,"A1 – dívky do 10 let"],[11,15,"B1 – dívky 11–15 let"],[16,29,"C1 – ženy 16–29 let"],[30,39,"D1 – ženy 30–39 let"],[40,49,"E1 – ženy 40–49 let"],[50,59,"F1 – ženy 50–59 let"],[60,150,"G1 – ženy 60+"]];
 return (g==='f'?W:M).find(x=>a>=x[0]&&a<=x[1])?.[2];
}
function rememberPerson(label,a,g){
 let p={label,age:a,gender:g}; S.people.push(p);S.lastPerson=p;return p;
}
function childRule(a){return a<15?" Protože je mladší 15 let, může závod absolvovat pouze v doprovodu zákonného zástupce.":a<18?" Protože je mladší 18 let, potřebuje písemný souhlas zákonného zástupce.":""}
function respond(raw){
 let s=N(raw), a=age(s), g=gender(s);

 // pending conversational questions
 if(S.pending==='age'){
   if(a!==null){let p=rememberPerson(S.pendingLabel||'závodník',a,S.pendingGender||g||null);if(!p.gender){S.pending='gender';return `Věk ${a} let mám. Ještě potřebuji vědět, zda jde o chlapce, nebo dívku.`;}S.pending=null;return `Ve věku ${a} let spadá do kategorie ${category(a,p.gender)}.${childRule(a)}`}
   return "Stačí mi napsat věk, například „13 let“.";
 }
 if(S.pending==='gender'){
   if(g){S.pending=null;let p=S.lastPerson;if(p){p.gender=g;p.label=(g==='f'&&p.label==='dite')?'dcera':(g==='m'&&p.label==='dite')?'syn':p.label;return `Díky 🙂 Pro věk ${p.age} let je to kategorie ${category(p.age,g)}.${childRule(p.age)}`}}
   return "Ještě potřebuji vědět, zda jde o chlapce/muže, nebo dívku/ženu.";
 }

 // natural conversation
 if(/^(ahoj|cau|dobry den|zdar|nazdar)/.test(s)) return "Ahoj! 👋 Ráda ti poradím s Tour de Jedlová. Chystáš se závodit, nebo hledáš konkrétní informaci?";
 if(/(dekuji|diky|dik|super|parada)/.test(s)) return "Rádo se stalo 🙂 Klidně pokračuj. Můžeš se zeptat třeba na registraci, startovné, trasu, kategorie nebo pravidla.";
 if(/(nashle|mej se|zatim|cau$)/.test(s)) return "Měj se hezky a třeba na startu TDJ! 🚴";
 if(/(co umis|s cim.*porad|co.*vis)/.test(s)) return "Poradím se startovným, registrací, startem, trasou, kategoriemi, pravidly, dětmi, výsledky a fotkami. A klidně se ptej normálně, nemusíš používat přesná hesla.";

 // multi-intent child participation/registration
 if(/(dite|ditetem|sve dite)/.test(s) && /(zavod|jet|prihlas|registr|ucast)/.test(s)){
   let p=rememberPerson('dite',a,g);
   let intro='Jasně 🙂 Závodit můžete oba. ';
   if(a===null){S.pending='age';S.pendingLabel='dite';S.pendingGender=g;return intro+'Kolik je dítěti let?';}
   if(!g){S.pending='gender';return intro+`Dítěti je ${a} let. Ještě potřebuji vědět, zda jde o chlapce, nebo dívku, abych určila správnou kategorii.`;}
   let reg=/(prihlas|registr)/.test(s)?' Online registrace pro ročník 2027 zatím není spuštěná.':'';
   return intro+`Ve věku ${a} let spadá do kategorie ${category(a,g)}.${childRule(a)}`+reg;
 }
 // family/person context
 if(/(se synem|muj syn|synovi)/.test(s)){
   if(a!==null){let p=rememberPerson("syn",a,'m');return `Jasně 🙂 Syn ve věku ${a} let spadá do kategorie ${category(a,'m')}.${childRule(a)}`}
   S.pending='age';S.pendingLabel='syn';S.pendingGender='m';return "Super 🙂 Kolik je synovi let?";
 }
 if(/(s dcerou|moje dcera|dceri)/.test(s)){
   if(a!==null){rememberPerson("dcera",a,'f');return `Dcera ve věku ${a} let spadá do kategorie ${category(a,'f')}.${childRule(a)}`}
   S.pending='age';S.pendingLabel='dcera';S.pendingGender='f';return "Jasně 🙂 Kolik je dceři let?";
 }
 if(/^(a )?(ja|já)$/.test(raw.trim().toLowerCase()) || /(a co ja|a ja|moje kategorie)/.test(s)){
   S.pending='age';S.pendingLabel='ty';S.pendingGender=null;return "Jasně 🙂 Kolik je tobě let?";
 }
 if(a!==null && /(je mi|mne je|mam .*let)/.test(s)){
   let p=rememberPerson("ty",a,g); if(!g){S.pending='gender';return `Mám věk ${a} let. Ještě mi řekni, zda hledáme mužskou, nebo ženskou kategorii.`}
   return `Pro věk ${a} let je to kategorie ${category(a,g)}.${childRule(a)}`;
 }

 // follow-up price calculation
 if(/(kolik.*zaplat|kolik to.*stoji|za nas|za oba|dohromady)/.test(s)){
   let n=Math.max(1,S.people.length||1), mode=/miste/.test(s)?'place':'online';
   let each=mode==='place'?F.place:F.online;S.lastPriceMode=mode;
   return `${mode==='place'?'Při přihlášení na místě':'Při online registraci'} je startovné ${each} Kč za osobu. Pro ${n===1?'jednoho závodníka':n+' závodníky'} je to celkem ${each*n} Kč.`;
 }
 if(/^(a )?(na miste|miste)$/.test(s) && S.lastPriceMode){
   let n=Math.max(1,S.people.length||1);S.lastPriceMode='place';return `Na místě je startovné ${F.place} Kč za osobu${n>1?`, tedy pro ${n} závodníky celkem ${F.place*n} Kč`:""}.`;
 }

 if(/(startovn|cena)/.test(s)){S.topic='price';S.lastPriceMode='online';return `Online startovné je ${F.online} Kč. Při přihlášení na místě je ${F.place} Kč.`}
 if(/(registr|prihl)/.test(s)){S.topic='registration';return `Online registrace pro ročník 2027 zatím není spuštěná. Prezentace na místě probíhá ${F.presentation} ${F.startPlace}.`}
 if(/(kdy.*start|v kolik|cas.*start)/.test(s)) return `Hlavní závod startuje v ${F.start}. Prezentace je ${F.presentation}.`;
 if(/(kde.*start|odkud.*start)/.test(s)) return `Start je ${F.startPlace}. Cíl je u rozhledny Jedlová.`;
 if(/(tras|kilometr|dlouh|prevys)/.test(s)) return `Hlavní trasa má ${F.distance} a převýšení přibližně ${F.climb}. Vede z Varnsdorfu přes Dolní Podluží, Jiřetín pod Jedlovou a Křížovou horu na Jedlovou.`;
 if(/(mer.*cas|cas.*mer|cip|casomir|dostanu.*cip|vlastni.*cip)/.test(s)) return "Čas je měřen čipem, který závodník dostane na startu.";
 if(/(helma|prilba|bez helmy|bez prilby)/.test(s)) return "Ano, cyklistická helma je povinná po celou dobu závodu.";
 if(/(uzavren|auta|provoz|silnice)/.test(s)) return "Trať není uzavřená. Závod se jede za plného silničního provozu a účastníci musí dodržovat pravidla silničního provozu.";
 if(/(dest|prset|pocasi)/.test(s)) return "Závod se koná za každého počasí.";
 if(/(zdravot|sanit|zachran)/.test(s)) return "Zdravotní služba není pořadatelem zajištěna.";
 if(/(vysled)/.test(s)) return "Na webu najdeš výsledky 2026 a archiv výsledků 2025 a 2024.";
 if(/(fot|galeri)/.test(s)) return "Na webu jsou fotogalerie 2026, 2025, 2024 a fotoarchiv 2023–2019.";
 if(/(kategori)/.test(s)){S.pending='age';S.pendingLabel='závodník';S.pendingGender=g;return "Ráda ji určím. Kolik je závodníkovi let?";}
 if(/(termin|datum|kdy.*zavod)/.test(s)) return "Ročník 2027 je plánovaný na srpen. Přesný termín zatím není zveřejněný a nechci si ho vymýšlet.";
 if(/(deti|dite)/.test(s)) return "Děti jet mohou. U mladších 18 let platí souhlas zákonného zástupce a děti mladší 15 let mohou závod absolvovat pouze v doprovodu zákonného zástupce.";

 // clarification instead of dead-end
 return "Rozumím, že se ptáš na TDJ, ale tuhle konkrétní informaci zatím v ověřených podkladech nemám. Zkus otázku trochu upřesnit a já se pokusím navázat.";
}
function ask(q){add(q,'user');setTimeout(()=>add(respond(q)),100)}
launcher.onclick=()=>panel.classList.toggle('open');
document.getElementById('tdj-a-close').onclick=()=>panel.classList.remove('open');
const quick={startovne:"Kolik stojí startovné?",registrace:"Jak funguje registrace?",trasa:"Jaká je trasa?",kategorie:"Potřebuji určit kategorii."};
document.querySelectorAll('.tdj-a-chip').forEach(b=>b.onclick=()=>ask(quick[b.dataset.key]||b.textContent));
form.onsubmit=e=>{e.preventDefault();let q=input.value.trim();if(q){input.value='';ask(q)}};
})();