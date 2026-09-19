(()=>{
const $=id=>document.getElementById(id);
const launcher=$('tdj-assistant-launcher'),panel=$('tdj-assistant'),chat=$('tdj-a-chat'),form=$('tdj-a-form'),input=$('tdj-a-input');
if(!launcher||!panel||!chat||!form||!input)return;

const KB=(window.TDJ_KB||{}).facts||{};
const state={topic:null,pending:null,person:{age:null,gender:null},unknown:0};

const norm=t=>(t||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
 .replace(/[?!.,:;()"']/g," ").replace(/\s+/g," ").trim();

const clean=t=>norm(t).replace(/^(?:(?:ahoj|cau|dobry den|nazdar|zdar|prosim|hele|super|ok|okej|jasny|jasne|dobre|fajn|parada|aha|rozumim)\s*)+/,"").trim();

const has=(s,arr)=>arr.some(x=>typeof x==="string"?s.includes(x):x.test(s));
const age=s=>{const m=s.match(/\b(\d{1,2})\s*(?:let|roku|roky|leta)?\b/);return m?+m[1]:null};
const gender=s=>has(s,["dcera","divka","holka","zena","zenska"])?"f":has(s,["syn","chlapec","kluk","muz","muzsky"])?"m":null;
const yes=s=>has(s,[/^(ano|jo|jj|jasne|urcite|prosim|chci|posli|dej)$/]);
const no=s=>has(s,[/^(ne|ne dik|ne dekuji|neni treba)$/]);

function cat(a,g){
 const M=[[0,10,"A – chlapci do 10 let"],[11,15,"B – chlapci 11–15 let"],[16,29,"C – muži 16–29 let"],[30,39,"D – muži 30–39 let"],[40,49,"E – muži 40–49 let"],[50,59,"F – muži 50–59 let"],[60,69,"G – muži 60–69 let"],[70,150,"H – muži 70+"]];
 const W=[[0,10,"A1 – dívky do 10 let"],[11,15,"B1 – dívky 11–15 let"],[16,29,"C1 – ženy 16–29 let"],[30,39,"D1 – ženy 30–39 let"],[40,49,"E1 – ženy 40–49 let"],[50,59,"F1 – ženy 50–59 let"],[60,150,"G1 – ženy 60+"]];
 return (g==="f"?W:M).find(x=>a>=x[0]&&a<=x[1])?.[2];
}
function childRules(a){
 let r=[];
 if(a<15)r.push("Dítě mladší 15 let musí jet se zákonným zástupcem od startu až do cíle. Doprovod nemusí být přihlášený a neplatí startovné.");
 if(a<18)r.push("U závodníka mladšího 18 let je potřeba písemný souhlas zákonného zástupce.");
 return r.join(" ");
}

const intents=[
 {id:"contact_tom",score:9,keys:["tomas","toma","tom"],need:["kontakt","telefon","cislo","email","mail"],answer:()=>KB.contacts?`Tomáš Hurt: ${KB.contacts.tomas.phone}, ${KB.contacts.tomas.email}.`:"Kontakt na Tomáše je uvedený v sekci Kontakt."},
 {id:"contact_terka",score:9,keys:["tereza","terka","terku"],need:["kontakt","telefon","cislo","email","mail"],answer:()=>KB.contacts?`Tereza Císařová: ${KB.contacts.tereza.phone}, ${KB.contacts.tereza.email}.`:"Kontakt na Terezu je uvedený v sekci Kontakt."},
 {id:"contact_general",score:8,keys:["kontakt na organizatora","kontakt na organizatory","kontakt organizator","telefon na organizatora","cislo na organizatora","kontakt na poradat"],answer:()=>KB.contacts?`Jasně. Tomáš Hurt: ${KB.contacts.tomas.phone}, ${KB.contacts.tomas.email}. Tereza Císařová: ${KB.contacts.tereza.phone}, ${KB.contacts.tereza.email}.`:"Kontakty na organizátory najdeš v sekci Kontakt."},
 {id:"payment",score:8,keys:["kart","terminal","hotov","cash","zaplat","platba"],answer:()=>"Na startu není platební terminál. Kartou zaplatit nelze; startovné na místě je 300 Kč a platí se pouze v hotovosti."},
 {id:"dnf",score:8,keys:["nedojed","nedokonc","nezvlad","vzdam","vzdat","odstoup","skoncim","nemuzu pokracovat","dal nejedu","to nedam"],answer:()=>"Pokud závod nedokončíš, kontaktuj organizátory a vrať měřicí čip. Při zastavení dbej především na bezpečnost – stále jsi účastníkem silničního provozu."},
 {id:"ebike",score:8,keys:["elektrokol","e bike","ebike","e-bike","ebiku","elektricke kolo"],answer:()=>"Ne. Elektrokola / e-bike nejsou na TDJ povolena. Povolené jsou MTB / horská kola a gravel."},
 {id:"gravel",score:8,keys:["gravel"],answer:()=>"Ano 🙂 Gravel je na TDJ povolený. Povolené jsou také MTB / horská kola. Elektrokola povolená nejsou."},
 {id:"bike",score:5,keys:["jake kolo","jakem kole","jakym kolem","jaky kolo","typ kola","druh kola","povolena kola","na cem muzu jet","na cem mohu jet","cim muzu jet","cim mohu jet","mohu jet","muzu jet","mtb","horske kolo","horskem kole"],answer:()=>"Na TDJ můžeš jet na MTB / horském kole nebo na gravelu. Elektrokola ani ostatní typy kol povolené nejsou. Cyklistická helma je povinná po celou dobu závodu."},
 {id:"equipment",score:8,keys:["vybaveni","povinna vybava","co musim mit","co potrebuji","co si mam vzit","vystroj"],answer:()=>"Pro účast na TDJ potřebuješ vhodné kolo – povolené je MTB / horské kolo nebo gravel – a cyklistickou helmu, která je povinná po celou dobu závodu. Elektrokola nejsou povolena."},
 {id:"accident",score:9,keys:["vybour","spadnu","pad","nehoda","zran","nabour","uraz","neco stane"],answer:()=>"Pokud dojde k pádu nebo nehodě, dbej nejdřív na vlastní bezpečnost a bezpečnost ostatních. Pokud můžeš, přesuň se mimo vozovku a kontaktuj organizátory. Při vážném zranění volej 155. Pokud závod ukončíš, je potřeba vrátit měřicí čip."},
 {id:"helmet",score:7,keys:["helma","prilba"],answer:()=>"Ano. Cyklistická helma je povinná po celou dobu závodu."},
 {id:"parking",score:7,keys:["parkov","auto","zapark"],answer:()=>"Parkovat lze u restaurace Lidová zahrada. Alternativou je nechat auto pod Tolštejnem a po závodě se k němu z Jedlové vrátit na kole. Organizovaný návrat zpět na start není zajištěn."},
 {id:"bags",score:7,keys:["batoh","bunda","osobni vec","veci do cile","prevoz vec"],answer:()=>"Organizátor zajišťuje převoz batohů závodníků ze startu na Jedlovou."},
 {id:"toilet",score:7,keys:["wc","toaleta","zachod"],answer:()=>"WC je k dispozici v zázemí startu."},
 {id:"timing",score:7,keys:["meren cas","meri cas","casomira","cip","chip"],answer:()=>"Čas je měřen čipem, který závodník dostane v kanceláři závodu v místě startu. Po závodě je potřeba čip vrátit."},
 {id:"results",score:7,keys:["vysled"],answer:()=>"Po závodě budou výsledky dostupné online na portálu poskytovatele čipové časomíry. Na web TDJ je doplníme nejpozději do jednoho týdne."},
 {id:"route_mark",score:8,keys:["znacen","sipk","navigac","gpx","jak poznam kudy"],answer:()=>"Trasa je značená organizátory směrovými šipkami a značením na silnici. Pro orientaci proto není navigace nutná."},
 {id:"route_profile",score:8,keys:["profil trate","profil trasy","obtiz","naroc","tezka trat","tezky zavod","nastoup","vyskove metry","stoupani","kopce","kopec"],answer:()=>"Trať má přibližně 10 km a převýšení kolem 400 m+. Profil je převážně stoupavý a nejtěžší část přichází ve druhé třetině závodu při stoupání směrem na Jedlovou. Povrch kombinuje asfalt a nezpevněné/štěrkové úseky."},
 {id:"rules",score:9,keys:["co pravidla","jaka jsou pravidla","pravidla zavodu","propozice","kde najdu propozice","jsou propozice"],answer:()=>"Základní pravidla: závod se jede za běžného silničního provozu, helma je povinná a povolené jsou MTB / horské kolo a gravel. Elektrokola povolená nejsou. Podrobnosti najdeš v Propozicích závodu přímo na webu TDJ."},
 {id:"safety_route",score:9,keys:["je nebezpecna","je trat nebezpecna","je trasa nebezpecna","je trat bezpecna","je trasa bezpecna","nebezpecny usek"],answer:()=>"Trať není uzavřená a závod se jede za běžného silničního provozu. Je proto potřeba dodržovat pravidla silničního provozu, pokyny pořadatelů a Policie ČR a přizpůsobit jízdu podmínkám."},
 {id:"race_flow",score:9,keys:["jak zavod probiha","jak probiha zavod","jak to cele funguje","co me ceka","prubeh zavodu","organizace zavodu","celkova organizace","co mam delat po prijezdu"],answer:()=>"Ráno probíhá prezentace v kanceláři závodu, kde dostaneš startovní číslo, měřicí čip a potřebné informace. Potom následuje start a závod na Jedlovou. V cíli je připravené občerstvení a po dojezdu posledního závodníka následuje vyhodnocení a vyhlášení 1.–3. místa ve všech kategoriích. Podrobnosti najdeš také v Propozicích závodu na webu TDJ."},
 {id:"attendance",score:8,keys:["kolik jede zavodniku","kolik zavodniku","kolik je prihlasenych","kolik lidi zavodi","kolik byva ucastniku","kolik ucastniku"],answer:()=>"V posledních třech ročnících se TDJ účastnilo vždy více než 100 závodníků 🙂 Aktuální počet přihlášených se může průběžně měnit."},
 {id:"record",score:10,keys:["nejrychlejsi cas","rekord zavodu","tratovy rekord","nejlepsi cas","kdo jel nejrychleji","kdo drzi rekord"],answer:()=>"Traťový rekord TDJ drží Jan Strož časem 23:04 z roku 2021. Nejrychlejší závodníci se obvykle pohybují kolem 25 minut."},
 {id:"typical_time",score:8,keys:["jak dlouho zavod trva","za jak dlouho to dojedu","bezny cas","prumerny cas","jak dlouho se jede","za jak dlouho to jedou","cas zavodu"],answer:()=>"Běžný čas na TDJ je orientačně kolem 30–40 minut. Nejrychlejší závodníci se pohybují kolem 25 minut a traťový rekord je 23:04."},
 {id:"descent",score:9,keys:["prudky sjezd","sjezd","sjezdy","klesani","jede se z kopce","nebezpecny sjezd"],answer:()=>"Výrazně prudký sjezd na trase není. Trať je celkově převážně stoupavá a nejnáročnější část je ve druhé třetině závodu při stoupání směrem na Jedlovou."},
 {id:"hardest_section",score:10,keys:["kde je usek nejhorsi","nejhorsi usek","nejtezsi usek","nejtezsi cast","nejprudsi cast","kde je to nejtezsi","kde to nejvic boli"],answer:()=>"Nejtěžší část přichází ve druhé třetině závodu při stoupání směrem na Jedlovou."},
 {id:"profile",score:9,keys:["profil trate","profil trasy","nastoupani","vyskove metry","stoupani","kopce","tezka trat","tezka trasa","obtizna trat","obtizna trasa","narocna trat","narocna trasa","obtiznost","narocnost","je trat lehka","je trasa lehka","je trat tezka","je trasa tezka","je to makacka","zvladnu ji"],answer:()=>"Trať má přibližně 10 km a převýšení kolem 400 m+. Je krátká, ale převýšením intenzivní. Nejtěžší část přichází ve druhé třetině závodu při stoupání směrem na Jedlovou. Povrch kombinuje asfalt a nezpevněné/štěrkové úseky."},
 {id:"route",score:5,keys:["trasa","trat","kudy","kolik km","delka","prevys","povrch"],answer:()=>"Trasa měří přibližně 10 km, má převýšení kolem 400 m a vede z Varnsdorfu přes Dolní Podluží, Jiřetín pod Jedlovou a Křížovou horu na Jedlovou. Povrch kombinuje asfalt a nezpevněné/štěrkové úseky."},
 {id:"start",score:6,keys:["kde je start","odkud se startuje","v kolik start","kdy start","startuje"],answer:()=>"Start je u restaurace Lidová zahrada ve Varnsdorfu v 10:00. Prezentace probíhá od 9:00 do 9:40."},
 {id:"office",score:7,keys:["kancelar","startovni cislo","kde dostanu cislo","kde dostanu cip"],answer:()=>"Kancelář závodu je v místě startu. Závodník zde dostane startovní číslo, měřicí čip a organizační informace."},
 {id:"registration_status",score:10,keys:["spustena registrace","spustena online registrace","otevrena registrace","registrace otevrena","uz spustena registrace","uz se muzu prihlasit","uz se mohu prihlasit","funguje online registrace","online registrace spustena"],answer:()=>"Online registrace na TDJ 2027 zatím není spuštěná. Jakmile bude otevřená, odkaz najdeš přímo na webu TDJ. Přihlásit se bude možné také v den závodu na místě."},
 {id:"registration",score:6,keys:["registr","prihlas"],answer:()=>"Online registrace na TDJ 2027 zatím není spuštěná. Po jejím otevření bude odkaz přímo na webu TDJ. Přihlásit se bude možné také v den závodu na místě; prezentace probíhá od 9:00 do 9:40 a startovné na místě je 300 Kč v hotovosti."},
 {id:"fee",score:7,keys:["startovne","vstupne","poplatek","kolik stoji","kolik zaplatim","cena zavodu"],answer:()=>"Startovné je při online registraci 150 Kč, při přihlášení na místě 300 Kč. Na místě se platí pouze hotově."},
 {id:"traffic",score:7,keys:["uzavrena trat","uzavren","silnicni provoz","auta","provoz"],answer:()=>"Trať není uzavřená. Závod se jede za běžného silničního provozu a účastníci musí dodržovat pravidla provozu a pokyny pořadatelů a Policie ČR."},
 {id:"technical",score:7,keys:["defekt","pichnu","pichl","technicky problem","rozbije kolo"],answer:()=>"Při defektu nebo technickém problému je nejdůležitější bezpečnost. Jsi stále účastníkem silničního provozu; v případě potřeby kontaktuj organizátory."},
 {id:"weather",score:6,keys:["pocasi","dest","prset"],answer:()=>"Závod se koná za každého počasí."},
 {id:"finish",score:5,keys:["kde je cil","cil zavodu","do cile"],answer:()=>"Cíl závodu je u rozhledny Jedlová, přibližně 774 m n. m."},
 {id:"after_finish",score:8,keys:["dojel jsem","po dojezdu","co ted","po zavode"],answer:()=>"Po dojezdu vrať měřicí čip a můžeš využít připravené občerstvení. Po dojezdu posledního závodníka následuje vyhodnocení a vyhlášení všech kategorií, vždy 1.–3. místo."},
 {id:"awards",score:7,keys:["vyhlas","stupne vitezu","prvni tri"],answer:()=>"Vyhlašují se všechny kategorie a v každé 1.–3. místo. Vyhlášení probíhá po dojezdu posledního závodníka a vyhodnocení závodu."},
 {id:"spectators",score:7,keys:["divak","fand","fandit","rodina cekat"],answer:()=>"Diváci jsou vítáni kdekoliv podél trasy i v cíli. Nejlepší místo na fandění je ve druhé třetině závodu směrem na Jedlovou v náročném stoupání."},
 {id:"photos",score:6,keys:["foto","fotky","fotografie","galerie"],answer:()=>"Fotografie z jednotlivých ročníků najdeš na webu TDJ v sekci Fotogalerie a ve fotoarchivu."},
 {id:"history",score:6,keys:["historie","vznik zavodu"],answer:()=>"Příběh a historii Tour de Jedlová najdeš v sekci Historie na webu TDJ."},
 {id:"help",score:6,keys:["pomah","charit","sbirka"],answer:()=>"TDJ není jen cyklistický závod. Součástí akce je také pomoc konkrétním lidem a rodinám prostřednictvím komunity kolem Tour de Jedlová."},
 {id:"cc",score:6,keys:["cc varnsdorf","pohar"],answer:()=>"Tour de Jedlová je zařazena do poháru CC Varnsdorf."}
];

function detect(s){
 let best=null,bestScore=0;
 for(const i of intents){
   let hits=i.keys.filter(k=>s.includes(k)).length;
   if(i.need && !i.need.some(k=>s.includes(k))) hits=0;
   let score=hits?i.score+hits:0;
   if(score>bestScore){best=i;bestScore=score}
 }
 return best;
}
function conversational(s){
 if(!s)return "Jasně 🙂 Ptej se.";
 if(has(s,[/^(super|parada|fajn|dobre|ok|okej|jasny|jasne|aha|rozumim)$/]))return "Jasně 🙂 Ptej se dál.";
 if(has(s,["mam jeste otazku","mam jeste dotaz","pak mam jeste otazku","jeste bych mel dotaz","jeste bych mela dotaz","jeste bych se chtel zeptat","jeste bych se chtela zeptat","muzu se jeste zeptat","mohu se jeste zeptat","muzu mit dalsi otazku","mohu mit dalsi otazku","na co se muzu zeptat","na co se mohu zeptat","co umis","co dokazes","s cim mi poradis","s cim mi muzes pomoct","jake informace mas","pomoc","jen te testuju","jen te zkousim","testuji co umis","zkousim co umis","jsi dobra","jsi sikovna","jeste jedna otazka","chtela bych se jeste zeptat","chtel bych se jeste zeptat","jeste mam dotaz","jeste mam otazku","jeste jeden dotaz","jeste otazka","dalsi otazka","jeste dotaz","dalsi dotaz","mam dalsi otazku","mam dalsi dotaz","chtel bych se zeptat","chtela bych se zeptat","jeste bych se chtel zeptat","jeste bych se chtela zeptat","muzu mit dalsi otazku","mohu mit dalsi otazku","mam dalsi otazku","mam dalsi dotaz"]))return "Jasně 🙂 Ptej se.";
 if(has(s,["diky","dekuji","dik"]))return "Rádo se stalo 🙂 Kdybys potřeboval něco dalšího kolem TDJ, ptej se.";
 return null;
}
function answer(raw){
 const original=norm(raw),s=clean(raw);
 const conv=conversational(s);
 if(conv)return conv;

 if(has(s,["na co se muzu zeptat","na co se mohu zeptat","co umis","co dokazes","s cim mi poradis","s cim mi muzes pomoct","jake informace mas","help","pomoc"]))
   return "Můžeš se mě zeptat třeba na registraci, startovné, děti a kategorie, trasu, náročnost, povolená kola, pravidla, parkování, čip, výsledky, průběh závodu nebo časy 🙂 Co tě zajímá?";
 if(has(s,["jen te testuju","jen te zkousim","testuji co umis","zkousim co umis"]))
   return "😄 Jasně, klidně mě testuj. Uvidíme, co všechno zvládnu.";
 if(has(s,["jsi dobra","jsi sikovna"]))
   return "Díky 🙂 Ptej se dál, ráda poradím.";
 if(state.pending==="contact"){
   if(yes(s)){state.pending=null;state.unknown=0;return KB.contacts?`Jasně. Tomáš Hurt: ${KB.contacts.tomas.phone}, ${KB.contacts.tomas.email}. Tereza Císařová: ${KB.contacts.tereza.phone}, ${KB.contacts.tereza.email}.`:"Kontakty na organizátory najdeš v sekci Kontakt."}
   if(no(s)){state.pending=null;state.unknown=0;return "Dobře 🙂 Ptej se dál, kdybys něco potřeboval."}
 }
 if(state.pending==="gender"){
   const g=gender(s); if(!g)return state.person.age!==null&&state.person.age>=18?"Jde o muže, nebo ženu?":"Jde o chlapce, nebo dívku?";
   state.person.gender=g;state.pending=null;
   return `Ve věku ${state.person.age} let jde o kategorii ${cat(state.person.age,g)}. ${childRules(state.person.age)}`;
 }
 if(state.pending==="age"){
   const a=age(s); if(a===null)return "Napiš mi prosím věk závodníka, například „10 let“.";
   state.person.age=a; const g=gender(s)||state.person.gender;
   if(!g){state.pending="gender";return `Věk ${a} let mám. ${a>=18?"Jde o muže, nebo ženu?":"Jde o chlapce, nebo dívku?"}`}
   state.person.gender=g;state.pending=null;return `Kategorie je ${cat(a,g)}. ${childRules(a)}`;
 }

 if(has(s,["mam dite","mohou jet deti","muze jet dite","muzou jet deti","chci registrovat dite","chci prihlasit dite","registrace ditete","prihlasit dite","jede se mnou dcera","jede se mnou syn","muze zavodit syn","muze zavodit dcera"])){
   const a=age(s), g=gender(s)||(s.includes("dcera")?"f":s.includes("syn")?"m":null);
   if(a===null){state.pending="age";state.topic="child";return "Ano 🙂 Děti se TDJ mohou účastnit. Kolik je dítěti let? Podle věku ti řeknu kategorii a podmínky účasti."}
   state.person.age=a;
   if(!g){state.pending="gender";state.topic="child";return `Věk ${a} let mám. Jde o chlapce, nebo dívku?`}
   state.person.gender=g;state.topic="child";
   return `Ano 🙂 Dítě závodit může. Ve věku ${a} let jde o kategorii ${cat(a,g)}. ${childRules(a)}`;
 }
 if(has(s,["kategorie","kam patrim","jaka kategorie"])){
   const a=age(s),g=gender(s);
   state.person={age:a,gender:g};
   if(a===null){state.pending="age";return "Ráda kategorii určím. Kolik je závodníkovi let?"}
   if(!g){state.pending="gender";return `Věk ${a} let mám. ${a>=18?"Jde o muže, nebo ženu?":"Jde o chlapce, nebo dívku?"}`}
   return `Kategorie je ${cat(a,g)}. ${childRules(a)}`;
 }

 const a=age(s),g=gender(s);
 if(a!==null && has(s,["dite","dcera","syn","holka","kluk"]) && has(s,["zavod","jet","prihlas","ucast"])){
   const gg=g||(s.includes("dcera")?"f":s.includes("syn")?"m":null);
   if(!gg){state.person={age:a,gender:null};state.pending="gender";return `Dítě ve věku ${a} let závodit může. Jde o chlapce, nebo dívku?`}
   return `Ano, dítě závodit může. Ve věku ${a} let jde o kategorii ${cat(a,gg)}. ${childRules(a)}`;
 }

 if(has(s,["spustena registrace","otevrena registrace","registrace spustena","registrace otevrena","uz je spustena registrace","uz je otevrena registrace","je uz spustena registrace","je uz otevrena registrace","uz se muzu registrovat","uz se mohu registrovat","uz se muzu prihlasit","uz se mohu prihlasit"])){
   state.topic="registration_status"; state.unknown=0;
   return "Online registrace na TDJ 2027 zatím není spuštěná. Jakmile bude otevřená, odkaz najdeš přímo na webu TDJ. Přihlásit se bude možné také v den závodu na místě.";
 }
 const intent=detect(s);
 if(intent){state.topic=intent.id;state.unknown=0;return intent.answer(s)}

 // context-aware short followups
 if((state.topic==="payment"||state.topic==="registration"||state.topic==="registration_status") && has(s,["online verzi","online moznost","online registrace","pres internet"])){
   state.topic="registration_status";
   return "Online registrace na TDJ 2027 zatím není spuštěná. Jakmile bude otevřená, odkaz najdeš přímo na webu TDJ.";
 }
 if(state.topic==="bike" && has(s,["a gravel","gravel"]))return "Ano 🙂 Gravel je povolený.";
 if(state.topic==="results" && /\b20\d\d\b/.test(s))return "Výsledky předchozích ročníků najdeš v archivu výsledků na webu TDJ.";
 if(state.topic==="photos" && /\b20\d\d\b/.test(s))return "Fotografie z předchozích ročníků najdeš ve fotoarchivu na webu TDJ.";

 if(has(original,["ahoj","cau","dobry den"]) && s===original.replace(/^(ahoj|cau|dobry den)\s*/,"").trim() && !s)
   return "Ahoj! 👋 Ráda ti poradím s Tour de Jedlová. Ptej se na start, registraci, děti, kategorie, kola, trasu, pravidla nebo praktické věci.";

 state.unknown++;
 state.pending="contact";
 return "Tomu ještě úplně nerozumím 🙂 Zkus otázku položit trochu jinak, nebo se obrať na Toma či Terku, organizátory TDJ. Chceš na ně kontakt?";
}

const say=(t,who="bot")=>{const d=document.createElement("div");d.className="tdj-a-msg "+who;d.textContent=t;chat.appendChild(d);chat.scrollTop=chat.scrollHeight};
function ask(q){say(q,"user");setTimeout(()=>say(answer(q)),60)}
const nudge=$("tdj-a-nudge"),nudgeClose=$("tdj-a-nudge-close");
const hideNudge=()=>{if(nudge)nudge.classList.remove("show")};
const markNudge=()=>{try{sessionStorage.setItem("tdj-a-nudge-seen","1")}catch(e){}};
const openPanel=()=>{panel.classList.add("open");hideNudge();markNudge()};
launcher.onclick=()=>panel.classList.contains("open")?panel.classList.remove("open"):openPanel();
const close=$("tdj-a-close");if(close)close.onclick=()=>panel.classList.remove("open");
if(nudgeClose)nudgeClose.onclick=e=>{e.stopPropagation();hideNudge();markNudge()};
if(nudge)nudge.onclick=e=>{if(e.target.closest("button"))return;openPanel()};
document.querySelectorAll("[data-welcome]").forEach(b=>b.onclick=e=>{e.stopPropagation();openPanel();document.querySelectorAll(".tdj-a-welcome-actions").forEach(x=>x.remove());if(b.dataset.welcome==="race"){say("Chci závodit","user");setTimeout(()=>say("Super 🙂 Můžu ti poradit se startovným, registrací, kategorií, kolem, trasou nebo pravidly závodu."),60)}else{say("Mám dotaz","user");setTimeout(()=>{say("Jasně 🙂 Ptej se.");input.focus()},60)}});
setTimeout(()=>{let seen=false;try{seen=sessionStorage.getItem("tdj-a-nudge-seen")==="1"}catch(e){}if(!seen&&!panel.classList.contains("open")&&nudge){nudge.classList.add("show");try{const AC=window.AudioContext||window.webkitAudioContext;if(AC){const ac=new AC(),o=ac.createOscillator(),g=ac.createGain();o.frequency.value=880;g.gain.setValueAtTime(.0001,ac.currentTime);g.gain.exponentialRampToValueAtTime(.025,ac.currentTime+.01);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.14);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+.15)}}catch(e){}}},2600);
form.onsubmit=e=>{e.preventDefault();const q=input.value.trim();if(q){input.value="";document.querySelectorAll(".tdj-a-welcome-actions").forEach(x=>x.remove());ask(q)}};
})();