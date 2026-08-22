(()=>{
const launcher=document.getElementById('tdj-assistant-launcher'),panel=document.getElementById('tdj-assistant'),chat=document.getElementById('tdj-a-chat'),form=document.getElementById('tdj-a-form'),input=document.getElementById('tdj-a-input');
const S={pending:null,person:null,people:[],lastTopic:null,followUp:null,lastQuestion:null};
const F={online:150,place:300,start:'10:00',presentation:'9:00–9:40',startPlace:'u restaurace Lidová zahrada ve Varnsdorfu',distance:'10 km',climb:'400 m+',timing:'Čas je měřen čipem, který závodník dostane na startu.'};
const N=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[?!.,]/g,' ').replace(/\s+/g,' ').trim();
function add(t,w='bot'){let d=document.createElement('div');d.className='tdj-a-msg '+w;d.textContent=t;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
function age(s){let m=s.match(/\b(\d{1,2})\s*(let|roku|roky|leta)?\b/);return m?+m[1]:null}
function gender(s){if(/(dcera|divka|holka|zena|zenska|zenske)/.test(s))return'f';if(/(syn|chlapec|kluk|muz|muzsky|muzske)/.test(s))return'm';return null}
function category(a,g){const M=[[0,10,'A – chlapci do 10 let'],[11,15,'B – chlapci 11–15 let'],[16,29,'C – muži 16–29 let'],[30,39,'D – muži 30–39 let'],[40,49,'E – muži 40–49 let'],[50,59,'F – muži 50–59 let'],[60,69,'G – muži 60–69 let'],[70,150,'H – muži 70+']],W=[[0,10,'A1 – dívky do 10 let'],[11,15,'B1 – dívky 11–15 let'],[16,29,'C1 – ženy 16–29 let'],[30,39,'D1 – ženy 30–39 let'],[40,49,'E1 – ženy 40–49 let'],[50,59,'F1 – ženy 50–59 let'],[60,150,'G1 – ženy 60+']];return(g==='f'?W:M).find(x=>a>=x[0]&&a<=x[1])?.[2]}
function childRule(a){return a<15?' Protože je mladší 15 let, musí závod absolvovat v doprovodu zákonného zástupce.':a<18?' Protože je mladší 18 let, potřebuje písemný souhlas zákonného zástupce.':''}
function store(label,a,g){let p={label,age:a,gender:g};S.person=p;S.people.push(p);return p}
function finishPerson(p){if(!p.gender){S.pending='gender';return `Věk ${p.age} let mám. Ještě potřebuji vědět, zda jde o chlapce, nebo dívku.`}S.pending=null;return `${p.label==='dcera'?'Dcera':p.label==='syn'?'Syn':'Závodník'} ve věku ${p.age} let spadá do kategorie ${category(p.age,p.gender)}.${childRule(p.age)}`}
function greeting(raw,s){return /^(ahoj|cau|dobry den|zdar|nazdar)\b/.test(s)}
function rules(){S.lastTopic='rules';S.followUp='childrenRules';return 'Základní podmínky jsou jednoduché 🙂 Závod se jede za plného silničního provozu a trať není uzavřená. Cyklistická helma je povinná. Každý účastník startuje na vlastní nebezpečí a musí dodržovat pravidla silničního provozu a pokyny pořadatelů a Policie ČR. Závod se koná za každého počasí a zdravotní služba není pořadatelem zajištěna. U dětí platí další podmínky podle věku. Chceš je také vysvětlit?'}
function respond(raw){
 let s=N(raw),a=age(s),g=gender(s),hello=greeting(raw,s);
 // pending dialog has priority over generic matching
 if(S.pending==='gender'){
   if(g){S.person.gender=g;if(S.person.label==='dite')S.person.label=g==='f'?'dcera':'syn';return finishPerson(S.person)}
   return 'Ještě potřebuji vědět, zda jde o chlapce/muže, nebo dívku/ženu.';
 }
 if(S.pending==='age'){
   if(a!==null){S.person.age=a;return finishPerson(S.person)}
   return 'Stačí mi napsat věk, například „10 let“.';
 }
 // short contextual replies
 if(/^(ano|jo|jasne|urcite)$/.test(s)&&S.followUp==='childrenRules'){S.followUp=null;return 'U dětí mladších 18 let je potřeba písemný souhlas zákonného zástupce. Děti mladší 15 let mohou závod absolvovat pouze v doprovodu zákonného zástupce.'}
 if(/^(ne|ne diky|ne dekuji)$/.test(s)&&S.followUp){S.followUp=null;return 'Dobře 🙂 Ptej se dál na cokoli kolem TDJ.'}
 if(/(uz jsem se te zeptal|uz jsem se ptal|vzdyt jsem se ptal)/.test(s)){return 'Máš pravdu 🙂 Předchozí dotaz jsem nezpracovala správně. Napiš ho prosím ještě jednou a zkusím ho vyhodnotit celý, ne jen první slovo.'}
 // Multi-intent: child + participation/registration, even if sentence starts with greeting
 if(/(dite|ditetem|sve dite)/.test(s)&&/(zavod|jet|prihlas|registr|ucast|mozne)/.test(s)){
   let p=store('dite',a,g),prefix=hello?'Ahoj 🙂 ':'';
   if(a===null){S.pending='age';return prefix+'Ano, dítě se závodu může zúčastnit. Kolik je mu let?'}
   if(!g){S.pending='gender';let reg=/(prihlas|registr)/.test(s)?' Online registrace pro ročník 2027 zatím není spuštěná.':'';return prefix+`Ano, dítě ve věku ${a} let se závodu může zúčastnit.${childRule(a)} Ještě mi řekni, zda jde o chlapce, nebo dívku, abych určila správnou kategorii.`+reg}
   let reg=/(prihlas|registr)/.test(s)?' Online registrace pro ročník 2027 zatím není spuštěná.':'';return prefix+`Ano 🙂 ${finishPerson(p)}`+reg;
 }
 if(/(dcera|s dcerou|dceri)/.test(s)){let p=store('dcera',a,'f');if(a===null){S.pending='age';return 'Ano 🙂 Kolik je dceři let?'}return finishPerson(p)}
 if(/(syn|se synem|synovi)/.test(s)){let p=store('syn',a,'m');if(a===null){S.pending='age';return 'Ano 🙂 Kolik je synovi let?'}return finishPerson(p)}
 // semantic topic groups
 if(/(podmink|pravidl|co musim splnit|co potrebuji k ucasti|pozadavk.*zavod|jak.*ucast)/.test(s))return rules();
 if(/(mer.*cas|cas.*mer|cip|casomir|vlastni.*cip|dostanu.*cip)/.test(s)){S.lastTopic='timing';return F.timing}
 if(/(kde.*cip|cip.*kde)/.test(s)&&S.lastTopic==='timing')return 'Čip dostane závodník na startu.';
 if(/kategori/.test(s)){let p=store('závodník',a,g);if(a===null){S.pending='age';return 'Ráda kategorii určím. Kolik je závodníkovi let?'}return finishPerson(p)}
 if(a!==null&&/^\d{1,2}(\s*let)?$/.test(s)){let p=store('závodník',a,null);return finishPerson(p)}
 if(/(kolik.*zaplat|kolik.*stoji|za nas|za oba|dohromady)/.test(s)){let n=Math.max(1,S.people.length||1),on=!/miste/.test(s),each=on?F.online:F.place;S.lastTopic='price';return `${on?'Při online registraci':'Při přihlášení na místě'} je startovné ${each} Kč za osobu${n>1?`, tedy pro ${n} závodníky celkem ${each*n} Kč`:''}.`}
 if(/^(a )?(na miste|miste)$/.test(s)&&S.lastTopic==='price'){let n=Math.max(1,S.people.length||1);return `Na místě je startovné ${F.place} Kč za osobu${n>1?`, tedy pro ${n} závodníky celkem ${F.place*n} Kč`:''}.`}
 if(/(startovn|cena)/.test(s)){S.lastTopic='price';return `Online startovné je ${F.online} Kč. Při přihlášení na místě je ${F.place} Kč.`}
 if(/(registr|prihlas)/.test(s))return `Online registrace pro ročník 2027 zatím není spuštěná. Prezentace na místě probíhá ${F.presentation} ${F.startPlace}.`;
 if(/(kdy.*start|v kolik|cas.*start)/.test(s))return `Hlavní závod startuje v ${F.start}. Prezentace je ${F.presentation}.`;
 if(/(kde.*start|odkud.*start)/.test(s))return `Start je ${F.startPlace}. Cíl je u rozhledny Jedlová.`;
 if(/(tras|kilometr|dlouh|prevys)/.test(s))return `Hlavní trasa má ${F.distance} a převýšení přibližně ${F.climb}. Vede z Varnsdorfu přes Dolní Podluží, Jiřetín pod Jedlovou a Křížovou horu na Jedlovou.`;
 if(/(elektrokol|e bike|ebike|e-bike|elektrick.*kol)/.test(s))return 'Elektrokola (e-bike) nejsou v závodě TDJ povolena.';
 if(/(gravel)/.test(s))return 'Ano 🙂 Gravel je v závodě TDJ povolen.';
 if(/(mtb|horske.*kolo|horskem.*kole|bike)/.test(s))return 'Ano 🙂 Horské kolo (MTB) je v závodě TDJ povoleno.';
 if(/(jake.*kolo|jaky.*typ.*kola|druh.*kola|kolo.*povol|na cem.*jet)/.test(s))return 'V závodě TDJ jsou povolena horská kola (MTB) a gravel. Elektrokola (e-bike) povolena nejsou.';
 if(/(helma|prilba)/.test(s))return 'Cyklistická helma je povinná po celou dobu závodu.';
 if(/(uzavren|auta|provoz|silnice|policie)/.test(s))return 'Trať není uzavřená. Závod se jede za plného silničního provozu a účastníci musí dodržovat pravidla silničního provozu a pokyny pořadatelů a Policie ČR.';
 if(/(dest|prset|pocasi)/.test(s))return 'Závod se koná za každého počasí.';
 if(/(zdravot|sanit|zachran)/.test(s))return 'Zdravotní služba není pořadatelem zajištěna.';
 if(/(vysled)/.test(s))return 'Na webu najdeš výsledky 2026 a archiv výsledků 2025 a 2024.';
 if(/(fot|galeri)/.test(s))return 'Na webu jsou fotogalerie 2026, 2025, 2024 a fotoarchiv 2023–2019.';
 if(/(termin|datum|kdy.*zavod)/.test(s))return 'Ročník 2027 je plánovaný na srpen. Přesný termín zatím není zveřejněný.';
 if(/(deti|dite)/.test(s))return 'Děti závodit mohou. Osoby mladší 18 let potřebují písemný souhlas zákonného zástupce a děti mladší 15 let musí jet v doprovodu zákonného zástupce.';
 if(/(co umis|s cim.*porad|co.*vis)/.test(s))return 'Poradím se startovným, registrací, startem, trasou, kategoriemi, podmínkami závodu, dětmi, kolem a vybavením, měřením času, výsledky a fotkami. Ptej se klidně celou větou.';
 if(/(dekuji|diky|dik|super|parada)/.test(s))return 'Rádo se stalo 🙂 Ptej se dál, klidně úplně normálně.';
 if(/(nashle|mej se|zatim)/.test(s))return 'Měj se hezky a třeba na startu TDJ! 🚴';
 // Greeting only if no actual topic was found
 if(hello)return 'Ahoj! 👋 Ráda ti poradím s Tour de Jedlová. Chystáš se závodit, nebo hledáš konkrétní informaci?';
 return 'Rozumím, že se ptáš na TDJ, ale tuhle konkrétní informaci zatím v ověřených podkladech nemám. Zkus otázku trochu upřesnit a já se pokusím navázat.';
}
function ask(q){add(q,'user');S.lastQuestion=q;setTimeout(()=>add(respond(q)),80)}
launcher.onclick=()=>panel.classList.toggle('open');document.getElementById('tdj-a-close').onclick=()=>panel.classList.remove('open');
const quick={startovne:'Kolik stojí startovné?',registrace:'Jak funguje registrace?',trasa:'Jaká je trasa?',kategorie:'Potřebuji určit kategorii.'};document.querySelectorAll('.tdj-a-chip').forEach(b=>b.onclick=()=>ask(quick[b.dataset.key]||b.textContent));form.onsubmit=e=>{e.preventDefault();let q=input.value.trim();if(q){input.value='';ask(q)}};
})();
