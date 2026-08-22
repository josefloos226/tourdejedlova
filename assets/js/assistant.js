(()=>{
const $=id=>document.getElementById(id), launcher=$('tdj-assistant-launcher'), panel=$('tdj-assistant'), chat=$('tdj-a-chat'), form=$('tdj-a-form'), input=$('tdj-a-input');
if(!launcher||!panel||!chat||!form||!input)return;
const K=window.TDJ_KB.facts;
const S={pending:null,lastTopic:null,person:null,people:[],offeredContact:false};
const N=x=>x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[?!.,:;]/g," ").replace(/\s+/g," ").trim();
const say=(t,w='bot')=>{let d=document.createElement('div');d.className='tdj-a-msg '+w;d.textContent=t;chat.appendChild(d);chat.scrollTop=chat.scrollHeight};
const age=s=>{let m=s.match(/\b(\d{1,2})\s*(let|roku|roky|leta)?\b/);return m?+m[1]:null};
const gender=s=>/(dcera|divka|holka|zena|zenska)/.test(s)?'f':/(syn|chlapec|kluk|muz|muzsky)/.test(s)?'m':null;
const yes=s=>/^(ano|jo|jj|jasne|prosim|urcite|posli|chci)( prosim)?$/.test(s);
const no=s=>/^(ne|ne dik|ne dekuji|neni treba)$/.test(s);
const social=s=>/^(super|ok|okej|jasny|jasne|dobre|fajn|parada|rozumim|aha|dik|diky|dekuji)(.*)?$/.test(s);
const wantsAsk=s=>/^(?:(?:super|ok|okej|jasny|jasne|dobre|fajn|parada)[ ]*)?(?:pak )?(?:mam )?(?:jeste )?(?:otazku|dotaz)$|^(?:muzu se|mohu se|chtel bych se|chtela bych se)(?: jeste)? zeptat$/.test(s);
const stripFiller=s=>s.replace(/^(?:(?:ahoj|cau|dobry den|nazdar|zdar|prosim|hele|super|ok|okej|jasny|jasne|dobre|fajn|parada|aha)[ ]*)+/,"").trim();
const dnf=s=>/(nedojed|nedokon|nezvlad|vzda|odstoup|musim.*skoncit|nemuzu.*pokracovat|dal.*nejedu|to.*nedam)/.test(s);
function category(a,g){let M=[[0,10,"A – chlapci do 10 let"],[11,15,"B – chlapci 11–15 let"],[16,29,"C – muži 16–29 let"],[30,39,"D – muži 30–39 let"],[40,49,"E – muži 40–49 let"],[50,59,"F – muži 50–59 let"],[60,69,"G – muži 60–69 let"],[70,150,"H – muži 70+"]],W=[[0,10,"A1 – dívky do 10 let"],[11,15,"B1 – dívky 11–15 let"],[16,29,"C1 – ženy 16–29 let"],[30,39,"D1 – ženy 30–39 let"],[40,49,"E1 – ženy 40–49 let"],[50,59,"F1 – ženy 50–59 let"],[60,150,"G1 – ženy 60+"]];return (g==='f'?W:M).find(x=>a>=x[0]&&a<=x[1])?.[2]}
function childRules(a){let x=[];if(a<15)x.push(K.children.under15);if(a<18)x.push(K.children.under18);return x.join(" ")}
function fallback(){S.pending='contactOffer';S.offeredContact=true;return "Tuhle informaci zatím nemám ověřenou a nechci si ji vymýšlet 🙂 Tom nebo Terka, organizátoři TDJ, ti s tím poradí. Chceš na ně kontakt?"}
function respond(raw){
 let s=N(raw),hello=/\b(ahoj|cau|dobry den|nazdar|zdar)\b/.test(s),q=stripFiller(s)||s,a=age(q),g=gender(q);
 // pending dialog
 if(S.pending==='contactOffer'){if(yes(s)){S.pending=null;return `Jasně 🙂 Tereza Císařová: ${K.contacts.tereza.phone}, ${K.contacts.tereza.email}. Tomáš Hurt: ${K.contacts.tomas.phone}, ${K.contacts.tomas.email}.`} if(no(s)){S.pending=null;return "Jasně 🙂 Ptej se dál na cokoliv kolem TDJ."}}
 if(S.pending==='gender'){if(g){S.person.gender=g;S.pending=null;return `Díky 🙂 Ve věku ${S.person.age} let jde o kategorii ${category(S.person.age,g)}. ${childRules(S.person.age)}`};return "Ještě potřebuji vědět, zda jde o chlapce/muže, nebo dívku/ženu."}
 if(S.pending==='age'){if(a!==null){S.person.age=a;if(!S.person.gender){S.pending='gender';return `Věk ${a} let mám. Jde o chlapce, nebo dívku?`}S.pending=null;return `Ve věku ${a} let jde o kategorii ${category(a,S.person.gender)}. ${childRules(a)}`};return "Stačí mi napsat věk, například „10 let“."}
 // conversational layer and high-priority situations
 if(/(?:cislo|telefon|kontakt|email|mail).*(?:tomas|toma|tom)|(?:tomas|toma|tom).*(?:cislo|telefon|kontakt|email|mail)/.test(q))
   return `Tomáš Hurt: ${K.contacts.tomas.phone}, ${K.contacts.tomas.email}.`;
 if(/(?:cislo|telefon|kontakt|email|mail).*(?:tereza|terka|terku)|(?:tereza|terka|terku).*(?:cislo|telefon|kontakt|email|mail)/.test(q))
   return `Tereza Císařová: ${K.contacts.tereza.phone}, ${K.contacts.tereza.email}.`;
 if(wantsAsk(q)) return "Jasně 🙂 Ptej se, co tě zajímá kolem TDJ.";
 if(dnf(q)) return K.safety.dnf+" Při zastavení dbej především na bezpečnost – závod probíhá za běžného silničního provozu.";
 if(/(kart|terminal|hotov|cash|jak.*zaplat|platit.*start)/.test(q)) return "Na startu není platební terminál, kartou tedy zaplatit nelze. Startovné na místě je 300 Kč a platí se pouze v hotovosti.";
 // extract multi-intent child
 if(/(dite|ditetem|dcera|syn|holka|kluk)/.test(q)){
   let label=/dcera|holka/.test(q)?'dcera':/syn|kluk/.test(q)?'syn':'dítě', pg=g;
   if(label==='dcera')pg='f'; if(label==='syn')pg='m';
   if(a!==null){S.person={label,age:a,gender:pg};S.people.push(S.person);
      let parts=[hello?"Ahoj 🙂":""];
      if(/(prihlas|zavod|jet|ucast)/.test(q))parts.push("Ano, dítě se může závodu zúčastnit.");
      if(pg)parts.push(`Ve věku ${a} let jde o kategorii ${category(a,pg)}.`); else {S.pending='gender';parts.push("Ještě potřebuji vědět, zda jde o chlapce, nebo dívku, abych určila kategorii.")}
      parts.push(childRules(a));
      if(/gravel/.test(q))parts.push("Gravel je na TDJ povolený.");
      if(/(elektrokol|e ?bike|ebike)/.test(q))parts.push("Elektrokolo / e-bike na TDJ povolené není.");
      if(/prihlas|registr/.test(q))parts.push("Online registrace pro další ročník zatím není spuštěná.");
      return parts.filter(Boolean).join(" ");
   }
   if(/(prihlas|zavod|jet|ucast|kategori)/.test(q)){S.person={label,age:null,gender:pg};S.pending='age';return (hello?"Ahoj 🙂 ":"")+"Ano, dítě závodit může. Kolik je mu/jí let?"}
 }
 // bike
 if(/(elektrokol|e ?bike|ebike|elektro kolo)/.test(q)){S.lastTopic='bike';return "Ne. Elektrokola / e-bike nejsou na TDJ povolena. Povolené jsou MTB (horská kola) a gravel."}
 if(/gravel/.test(q)){S.lastTopic='bike';return "Ano 🙂 Gravel je na TDJ povolený. Povolené jsou také MTB / horská kola. Elektrokola povolená nejsou."}
 if(/\bmtb\b|horsk.*kol|\bbike\b|jak(?:e|em|ym|y)?.*kol|druh.*kol|typ.*kol|povolen.*kol|na cem.*jet|cim.*jet|na.*kol.*(?:jet|mohu|muzu)|kol.*(?:mohu|muzu).*jet/.test(q)){S.lastTopic='bike';return "Na TDJ jsou povolená MTB / horská kola a gravel. Elektrokola ani ostatní typy kol povolené nejsou. Cyklistická helma je povinná."}
 if(/helm|prilb/.test(q))return K.bike.helmet;
 // registration/fees
 if(/startovn|kolik.*zaplat|kolik.*stoji|cena/.test(q)){let n=(s.match(/\b(\d+)\s*(lidi|osob|zavodnik)/)||[])[1];n=n?+n:1;let onsite=/miste/.test(q),v=onsite?K.fees.onsite:K.fees.online;return `${onsite?"Při přihlášení na místě":"Při online registraci"} je startovné ${v} Kč za závodníka${n>1?`, tedy pro ${n} závodníky ${v*n} Kč`:""}. Doprovázející rodič dítěte mladšího 15 let se registrovat nemusí a jako doprovod startovné neplatí.`}
 if(/registr|prihlas/.test(q))return `Přihlásit se lze online nebo na místě. Na místě probíhá prezentace ${K.start.presentation} v kanceláři závodu ${K.start.place}.`;
 // category
 if(/kategori|kam patrim/.test(q)){S.person={age:a,gender:g,label:'závodník'};if(a===null){S.pending='age';return "Ráda kategorii určím. Kolik je závodníkovi let?"}if(!g){S.pending='gender';return `Věk ${a} let mám. Jde o muže/chlapce, nebo ženu/dívku?`}return `Kategorie je ${category(a,g)}.`}
 // start/logistics
 if(/(v kolik|kdy).*start|cas.*start/.test(q))return `Hlavní závod startuje v ${K.start.time}. Prezentace probíhá ${K.start.presentation}.`;
 if(/kde.*start|odkud.*jede|misto.*start/.test(q))return `Start je ${K.start.place}.`;
 if(/kancelar|startovni cislo|cislo.*cip|kde.*cip/.test(q))return K.logistics.office;
 if(/wc|toalet|zachod/.test(q))return K.logistics.toilet;
 if(/batoh|bundu|veci.*cil|prevoz.*veci/.test(q))return K.logistics.bags;
 if(/parkov|auto/.test(q))return K.logistics.parking+" "+K.logistics.return;
 if(/jak.*zpet|navrat|odvoz/.test(q))return K.logistics.return+" "+K.logistics.parking;
 // route
 if(/znacen|sipk|navigac|gpx|jak.*poznam.*kudy/.test(q))return `Trasa je značená ${K.route.marking}. Pro orientaci proto není navigace nutná.`;
 if(/povrch|asfalt|sterk|nezpev/.test(q))return `Trať tvoří ${K.route.surface}.`;
 if(/prevys|nastoup/.test(q))return `Převýšení závodu je ${K.route.climb}.`;
 if(/kolik.*km|delk|dlouh/.test(q))return `Trasa měří ${K.route.distance} a má převýšení ${K.route.climb}.`;
 if(/tras|kudy|kam.*jede/.test(q))return `Trasa vede ${K.route.way}. Měří ${K.route.distance} a cíl je ${K.route.finish}.`;
 if(/cil|jedlov/.test(q)&&!/(divak|fand)/.test(q))return `Cíl závodu je ${K.route.finish}, přibližně ${K.route.finish_altitude}.`;
 if(/tez|naroc|zvlad/.test(q))return `TDJ má ${K.route.distance} a převýšení ${K.route.climb}. Je krátký, ale převýšením intenzivní. Trať tvoří ${K.route.surface}.`;
 // timing/results/finish
 if(/mer.*cas|casomir|cip/.test(q)){S.lastTopic='timing';return K.timing.method+" "+K.timing.return}
 if(/vysled/.test(q)){S.lastTopic='results';return K.results.immediate+" "+K.results.website}
 if(/vyhlas|stupn|prvni tri|1.*3/.test(q))return K.finish.ceremony+" "+K.finish.awards;
 if(/obcerst/.test(q))return K.finish.refreshment;
 if(/dojel.*co|po dojezdu|co.*cil/.test(q))return `Gratuluji k dojetí! 🚴 ${K.timing.return} ${K.finish.refreshment} ${K.finish.ceremony} ${K.finish.awards}`;
 if(/tombol/.test(q))return K.finish.raffle;
 // safety
 if(/defekt|pich|pichnu|rozbije.*kolo|technick.*problem/.test(q))return K.safety.technical;
 if(/vzdam|nedojed|odstoup/.test(q))return K.safety.dnf;
 if(/provoz|uzavren|auta|silnic/.test(q))return K.safety.traffic;
 if(/pocasi|dest|prset/.test(q))return K.safety.weather;
 if(/podmink|pravidl|co.*musim.*splnit/.test(q)){S.lastTopic='rules';return `${K.bike.helmet} ${K.safety.traffic} ${K.safety.weather} U nezletilých platí další pravidla podle věku. Chceš je vysvětlit?`}
 if(S.lastTopic==='rules'&&yes(s)){S.lastTopic=null;return K.children.under15+" "+K.children.under18+" "+K.children.escort}
 // spectators
 if(/divak|fand|rodina.*div|kde.*fand/.test(q))return K.spectators.welcome+" "+K.spectators.best;
 // photos/history/help
 if(/fot|galeri/.test(q)){S.lastTopic='photos';return "Fotografie z jednotlivých ročníků najdeš na webu TDJ v sekci Fotogalerie a ve fotoarchivu."}
 if(/histor/.test(q))return "Historii Tour de Jedlová najdeš na webu v sekci Historie. TDJ má vlastní příběh a postupně se rozvíjí jako sportovní i komunitní akce.";
 if(/pomah|charit|sbirk/.test(q))return "TDJ není jen cyklistický závod. Součástí akce je také pomoc konkrétním lidem a rodinám prostřednictvím komunity kolem Tour de Jedlová. Konkrétní příběhy najdeš v sekci TDJ Pomáhá.";
 if(/cc varnsdorf|pohar/.test(q))return "Tour de Jedlová je zařazena do poháru CC Varnsdorf.";
 if(/(kontakt|cislo|telefon|email).*(tomas|toma|tom)|(^| )(tomas|toma|tom)( |$)/.test(q))return `Tomáš Hurt: ${K.contacts.tomas.phone}, ${K.contacts.tomas.email}.`;
 if(/(kontakt|cislo|telefon|email).*(tereza|terka|terku)|(^| )(tereza|terka|terku)( |$)/.test(q))return `Tereza Císařová: ${K.contacts.tereza.phone}, ${K.contacts.tereza.email}.`;
 if(/kontakt|organizator/.test(q))return `Organizátoři TDJ: Tereza Císařová – ${K.contacts.tereza.phone}, ${K.contacts.tereza.email}; Tomáš Hurt – ${K.contacts.tomas.phone}, ${K.contacts.tomas.email}.`;
 // pure greeting only after intents
 if(hello)return "Ahoj! 👋 Ráda ti poradím s Tour de Jedlová. Můžeš se ptát na registraci, děti, kategorie, kola, trasu, start, pravidla, výsledky nebo praktické věci kolem závodu.";
 if(/dekuji|diky|dik/.test(s))return "Rádo se stalo 🙂 Kdybys potřeboval něco dalšího kolem TDJ, ptej se.";
 if(social(s))return "Jasně 🙂 Ptej se dál, co tě zajímá kolem TDJ.";
 return fallback();
}
function ask(q){say(q,'user');setTimeout(()=>say(respond(q)),80)}
launcher.onclick=()=>panel.classList.toggle('open');
let close=$('tdj-a-close');if(close)close.onclick=()=>panel.classList.remove('open');
document.querySelectorAll('.tdj-a-chip').forEach(b=>b.onclick=()=>ask(b.textContent));
form.onsubmit=e=>{e.preventDefault();let q=input.value.trim();if(q){input.value='';ask(q)}};
})();