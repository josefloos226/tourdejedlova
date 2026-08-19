
const nav=document.getElementById('nav'), bg=document.getElementById('heroBg'), photo=document.querySelector('.photo-break');addEventListener('scroll',()=>{nav.classList.toggle('scrolled',scrollY>40);if(scrollY<innerHeight)bg.style.transform=`scale(1.03) translateY(${scrollY*.12}px)`;if(photo){const r=photo.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const p=(innerHeight-r.top)/(innerHeight+r.height);photo.style.setProperty('--photo-y',`${42+(p-.5)*18}%`)}}});
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:0,transform:'translateY(35px)'},{opacity:1,transform:'none'}],{duration:700,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});obs.unobserve(e.target)}}),{threshold:.15});document.querySelectorAll('section>*').forEach(e=>obs.observe(e));

// V11 scroll reveal + route draw
const v11Observer=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.16});
document.querySelectorAll('.fade-up').forEach(el=>v11Observer.observe(el));



(function(){
  function initV192(){
    if(!window.L) return;
    const el=document.getElementById('tdj-map-v192');
    if(!el || el._leaflet_id) return;

    const route = [[50.898442,14.618824],[50.89863,14.619164],[50.897587,14.619407],[50.89748,14.619416],[50.897111,14.619479],[50.896839,14.619533],[50.896629,14.619614],[50.896533,14.61965],[50.89646,14.619695],[50.896324,14.619443],[50.896057,14.619021],[50.895938,14.618806],[50.895938,14.618806],[50.895927,14.618787],[50.895649,14.618258],[50.895468,14.617845],[50.895366,14.617629],[50.895258,14.617432],[50.895213,14.617359],[50.895156,14.617306],[50.895094,14.617252],[50.895026,14.617225],[50.894958,14.617225],[50.894896,14.617252],[50.894816,14.617323],[50.894737,14.61744],[50.894351,14.618122],[50.89344,14.619766],[50.893377,14.619848],[50.893315,14.61991],[50.893224,14.619965],[50.893116,14.620028],[50.892765,14.620153],[50.892516,14.620252],[50.892272,14.620386],[50.891604,14.620772],[50.891604,14.620772],[50.891365,14.620908],[50.890952,14.621124],[50.890669,14.62124],[50.890368,14.621311],[50.89004,14.621384],[50.889575,14.62098],[50.889286,14.620711],[50.889025,14.620495],[50.888782,14.620342],[50.88864,14.620261],[50.888459,14.620171],[50.888062,14.620019],[50.886163,14.619372],[50.886056,14.619344],[50.88503,14.618994],[50.884157,14.618707],[50.882338,14.618061],[50.882236,14.618024],[50.882066,14.617971],[50.881986,14.617925],[50.88193,14.617881],[50.881885,14.617845],[50.881834,14.617755],[50.881669,14.617503],[50.88155,14.617306],[50.881397,14.616973],[50.880972,14.616074],[50.880847,14.61577],[50.880785,14.61559],[50.880762,14.615464],[50.880745,14.615266],[50.880745,14.615024],[50.880773,14.614575],[50.880773,14.614575],[50.880796,14.614252],[50.880802,14.613883],[50.880802,14.613587],[50.880796,14.613497],[50.880711,14.612292],[50.880683,14.612023],[50.880683,14.612023],[50.880655,14.611808],[50.880564,14.611242],[50.880371,14.610172],[50.880343,14.610002],[50.880343,14.610002],[50.880297,14.609724],[50.880195,14.609185],[50.88011,14.608772],[50.879969,14.608178],[50.879963,14.60817],[50.879963,14.60817],[50.879901,14.607945],[50.879833,14.607738],[50.879747,14.607451],[50.879674,14.607199],[50.879652,14.607119],[50.879652,14.607119],[50.879566,14.606832],[50.879493,14.606598],[50.879493,14.606598],[50.879465,14.606499],[50.879414,14.606266],[50.879357,14.605924],[50.879328,14.605734],[50.879317,14.605537],[50.879317,14.605321],[50.879334,14.604002],[50.87934,14.603687],[50.87934,14.603516],[50.879345,14.603436],[50.879345,14.603436],[50.879357,14.603346],[50.879391,14.603166],[50.879453,14.602851],[50.879589,14.602367],[50.879759,14.601855],[50.879827,14.601648],[50.879861,14.601513],[50.879867,14.601459],[50.879867,14.601459],[50.879878,14.601369],[50.87989,14.601208],[50.87989,14.601109],[50.879884,14.600147],[50.879878,14.599887],[50.879855,14.599788],[50.879827,14.599662],[50.879719,14.599249],[50.879719,14.599249],[50.879685,14.599105],[50.879595,14.598765],[50.879493,14.598468],[50.87943,14.598316],[50.87943,14.598316],[50.879385,14.598189],[50.879204,14.597767],[50.879158,14.597633],[50.87913,14.597524],[50.879119,14.59739],[50.879119,14.59721],[50.879147,14.596995],[50.879164,14.596868],[50.879192,14.596779],[50.879238,14.596681],[50.879425,14.596321],[50.879555,14.596052],[50.879617,14.595926],[50.879663,14.595729],[50.879685,14.59561],[50.879685,14.59561],[50.879691,14.595584],[50.879708,14.595432],[50.879714,14.59526],[50.879725,14.59492],[50.879725,14.594578],[50.879737,14.594138],[50.879754,14.593895],[50.879765,14.593608],[50.879754,14.593455],[50.879747,14.593312],[50.879719,14.593186],[50.879697,14.593113],[50.879697,14.593113],[50.879674,14.593042],[50.879629,14.592952],[50.879589,14.59288],[50.879509,14.5928],[50.879391,14.592683],[50.879255,14.592574],[50.879051,14.59236],[50.878943,14.592251],[50.878337,14.591434],[50.877928,14.590868],[50.877713,14.590545],[50.877577,14.59031],[50.877214,14.58971],[50.876772,14.589],[50.876619,14.588748],[50.876466,14.588452],[50.87629,14.588083],[50.876063,14.587526],[50.875882,14.587104],[50.875791,14.58688],[50.875729,14.586708],[50.875684,14.586494],[50.875644,14.586322],[50.875644,14.586322],[50.875627,14.586251],[50.875264,14.584284],[50.875219,14.584121],[50.87519,14.583942],[50.875259,14.583907],[50.87527,14.583825],[50.875298,14.583727],[50.875338,14.58361],[50.875378,14.583528],[50.875355,14.583412],[50.875333,14.583295],[50.875276,14.583286],[50.875213,14.583241],[50.875151,14.583188],[50.875105,14.583115],[50.875043,14.583161],[50.874975,14.582819],[50.874879,14.58237],[50.874879,14.58237],[50.87485,14.582236],[50.874811,14.582037],[50.874793,14.581894],[50.874793,14.581894],[50.874793,14.581867],[50.874783,14.581697],[50.874783,14.581498],[50.874811,14.581014],[50.874828,14.580528],[50.874828,14.580528],[50.874845,14.580089],[50.87489,14.57875],[50.87489,14.57875],[50.874901,14.578498],[50.874924,14.578004],[50.874952,14.577689],[50.875038,14.576603],[50.875088,14.575525],[50.875111,14.574617],[50.875128,14.574249],[50.875128,14.57424],[50.875128,14.57424],[50.875145,14.573944],[50.875145,14.573944],[50.875151,14.573881],[50.874964,14.573863],[50.874624,14.573836],[50.874323,14.573827],[50.874153,14.573818],[50.874063,14.573791],[50.873434,14.573638],[50.87328,14.573513],[50.873173,14.573351],[50.873071,14.573171],[50.872935,14.572857],[50.872764,14.572219],[50.872691,14.572039],[50.872521,14.571699],[50.872447,14.571573],[50.872385,14.571401],[50.872328,14.571213],[50.872254,14.570917],[50.872044,14.569982],[50.871732,14.568464],[50.87167,14.568104],[50.87167,14.568104],[50.871659,14.568051],[50.871614,14.567871],[50.871551,14.567709],[50.871461,14.567557],[50.871325,14.567359],[50.871223,14.567252],[50.871109,14.567152],[50.870973,14.567062],[50.870452,14.566812],[50.870185,14.566703],[50.870185,14.566703],[50.869947,14.566605],[50.869584,14.566479],[50.869136,14.566317],[50.868904,14.566246],[50.868615,14.566173],[50.868388,14.566156],[50.868138,14.566129],[50.868008,14.56611],[50.867895,14.566074],[50.867606,14.565949],[50.867452,14.565859],[50.867373,14.565833],[50.867283,14.565833],[50.867191,14.56585],[50.866993,14.56594],[50.866897,14.565976],[50.866789,14.565984],[50.86667,14.565967],[50.865978,14.565833],[50.865553,14.565751],[50.865094,14.565697],[50.864895,14.56567],[50.864436,14.565644],[50.864283,14.565653],[50.864136,14.56568],[50.863767,14.565751],[50.863586,14.56577],[50.863098,14.565814],[50.862854,14.565833],[50.862667,14.565833],[50.86248,14.565804],[50.862191,14.565743],[50.862083,14.565697],[50.861811,14.565563],[50.86172,14.565517],[50.86163,14.5655],[50.861545,14.5655],[50.86113,14.565535],[50.860938,14.565535],[50.86024,14.566443],[50.859509,14.567412],[50.859469,14.567458],[50.859469,14.567458],[50.859135,14.567854],[50.859004,14.567997],[50.858874,14.568185],[50.858738,14.56833],[50.858613,14.568446],[50.858488,14.568544],[50.858352,14.568634],[50.858216,14.568707],[50.85804,14.568787],[50.857814,14.568859],[50.857672,14.568923],[50.857524,14.568994],[50.85715,14.56921],[50.856628,14.569515],[50.856487,14.569586],[50.856487,14.569586],[50.856367,14.569641],[50.856118,14.569731],[50.855874,14.569775],[50.855392,14.569838],[50.855262,14.569838],[50.855131,14.569838],[50.854938,14.569829],[50.854786,14.569829],[50.854706,14.569848],[50.854627,14.569875],[50.854535,14.569919],[50.854309,14.570072],[50.854615,14.56929],[50.854745,14.568976],[50.85483,14.568787],[50.854893,14.568617],[50.854955,14.56842],[50.855058,14.568024],[50.855182,14.567242],[50.855341,14.566326],[50.8555,14.565418],[50.855506,14.565302],[50.855506,14.565177],[50.855477,14.565059],[50.855443,14.564961],[50.855409,14.564898],[50.855352,14.564825],[50.855245,14.564709],[50.855142,14.564583],[50.855058,14.564458],[50.854967,14.564305],[50.85453,14.56347],[50.854484,14.56337],[50.854445,14.563254],[50.854428,14.563137],[50.8544,14.56294],[50.854371,14.562643],[50.854371,14.562517],[50.854383,14.562391],[50.854428,14.562104],[50.854525,14.561592],[50.854564,14.561269],[50.854592,14.560954],[50.854592,14.560594],[50.854581,14.560415],[50.854541,14.559938],[50.854541,14.559732],[50.854558,14.559598],[50.854576,14.559472],[50.854615,14.559364],[50.854655,14.559256],[50.854995,14.55852],[50.855097,14.558322],[50.855182,14.558179],[50.855301,14.558007],[50.855409,14.557891],[50.855522,14.557774],[50.855647,14.557684],[50.855903,14.557567],[50.85601,14.557541],[50.856078,14.557541],[50.856123,14.557558],[50.856164,14.557585],[50.856192,14.55764],[50.856192,14.557693],[50.856192,14.55773],[50.856152,14.557801],[50.85609,14.557909],[50.856067,14.557999],[50.856056,14.55807],[50.856067,14.558107],[50.85609,14.558151],[50.856129,14.558196],[50.856311,14.558304],[50.856362,14.558349],[50.856407,14.55843],[50.856424,14.558475],[50.856436,14.55852],[50.856424,14.558592],[50.856407,14.558646],[50.856311,14.558862],[50.856277,14.558959],[50.856265,14.559076],[50.856277,14.559185],[50.856305,14.559301],[50.856458,14.559741],[50.856532,14.559957],[50.856538,14.56002],[50.85656,14.560091],[50.856583,14.560164],[50.856628,14.560235],[50.856697,14.560317],[50.856776,14.560433],[50.856849,14.560559],[50.856884,14.56063],[50.856946,14.560757],[50.856946,14.560766]];

    const map=L.map(el,{
      zoomControl:true,
      scrollWheelZoom:true,
      doubleClickZoom:true,
      dragging:true,
      touchZoom:true,
      attributionControl:true
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
      maxZoom:19,
      attribution:'&copy; OpenStreetMap contributors'
    }).addTo(map);

    const halo=L.polyline(route,{color:'#ffffff',weight:9,opacity:.88,lineCap:'round',lineJoin:'round'}).addTo(map);
    const line=L.polyline(route,{color:'#0875d1',weight:5,opacity:1,lineCap:'round',lineJoin:'round'}).addTo(map);
    map.fitBounds(line.getBounds(),{padding:[18,18],maxZoom:14});

    const labels=[
      {p:route[0],t:'START',dir:'right'},
      {p:route[route.length-1],t:'CÍL',dir:'left'}
    ];
    labels.forEach(x=>{
      L.circleMarker(x.p,{radius:5,color:'#0875d1',weight:3,fillColor:'#fff',fillOpacity:1})
        .addTo(map)
        .bindTooltip(x.t,{permanent:true,direction:x.dir,className:'tdj-map-label-v192',offset:[0,-8]});
    });

    const rider=L.marker(route[0],{
      interactive:false,
      zIndexOffset:1000,
      icon:L.divIcon({className:'tdj-rider-v192',iconSize:[16,16]})
    }).addTo(map);

    const ll=route.map(p=>L.latLng(p[0],p[1]));
    const cum=[0]; let total=0;
    for(let i=1;i<ll.length;i++){total+=ll[i-1].distanceTo(ll[i]);cum.push(total);}
    function pointAt(frac){
      const target=Math.max(0,Math.min(1,frac))*total;
      let i=1;
      while(i<cum.length && cum[i]<target)i++;
      if(i>=cum.length)return ll[ll.length-1];
      const seg=cum[i]-cum[i-1],q=seg?(target-cum[i-1])/seg:0;
      return L.latLng(
        ll[i-1].lat+(ll[i].lat-ll[i-1].lat)*q,
        ll[i-1].lng+(ll[i].lng-ll[i-1].lng)*q
      );
    }

    // Use the approved V18.5/V18.11 profile path if present.
    const profilePath=document.getElementById('tdj-profile-line') ||
                      document.getElementById('profileLine') ||
                      document.querySelector('.tdj-profile-line') ||
                      document.querySelector('.profile-line-v13');
    const profileDot=document.getElementById('tdj-profile-dot') ||
                     document.getElementById('profileDot') ||
                     document.querySelector('.tdj-profile-dot') ||
                     document.querySelector('.profile-rider-v13');
    const pathLen=(profilePath && typeof profilePath.getTotalLength==='function') ? profilePath.getTotalLength() : 0;

    // 0–5 km normal speed; 5 km–finish at half speed.
    const routeKm=9.25, slowFromKm=5.0, split=slowFromKm/routeKm;
    const firstWeight=split, secondWeight=(1-split)*2;
    const splitTime=firstWeight/(firstWeight+secondWeight);
    const travelMs=14000, pauseMs=1800, cycleMs=travelMs+pauseMs;
    function distanceProgress(t){
      if(t<=splitTime) return split*(t/splitTime);
      return split+(1-split)*((t-splitTime)/(1-splitTime));
    }

    const start=performance.now();
    function frame(now){
      const elapsed=(now-start)%cycleMs;
      const p=elapsed>=travelMs ? 1 : distanceProgress(elapsed/travelMs);
      rider.setLatLng(pointAt(p));
      if(profilePath && profileDot && pathLen){
        const q=profilePath.getPointAtLength(pathLen*p);
        if(profileDot.tagName && profileDot.tagName.toLowerCase()==='circle'){
          profileDot.setAttribute('cx',q.x.toFixed(2));
          profileDot.setAttribute('cy',q.y.toFixed(2));
        }else{
          profileDot.style.transform='translate('+q.x+'px,'+q.y+'px)';
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    setTimeout(()=>{map.invalidateSize(true);map.fitBounds(line.getBounds(),{padding:[18,18],maxZoom:14});},250);
    window.addEventListener('resize',()=>map.invalidateSize(false));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initV192,{once:true});
  else initV192();
})();



(function(){
 const page=document.getElementById('propozice');
 const open=document.getElementById('openPropozice');
 const close=document.getElementById('closePropozice');
 const closeBottom=document.getElementById('closePropoziceBottom');
 function show(e){if(e)e.preventDefault();page.classList.add('is-open');page.setAttribute('aria-hidden','false');page.scrollTop=0;document.body.style.overflow='hidden';history.replaceState(null,'','#propozice');requestAnimationFrame(()=>{page.scrollTop=0;});}
 function hide(){
   page.classList.remove('is-open');
   page.setAttribute('aria-hidden','true');
   document.body.style.overflow='';
   history.replaceState(null,'',location.pathname+location.search+'#zavod');
   requestAnimationFrame(function(){
     var target=document.getElementById('zavod');
     if(target){target.scrollIntoView({behavior:'smooth',block:'start'});}
     else{
       var btn=document.getElementById('openPropozice');
       if(btn){btn.scrollIntoView({behavior:'smooth',block:'center'});}
     }
   });
 }
 if(open)open.addEventListener('click',show);
 if(close)close.addEventListener('click',hide);
 if(closeBottom)closeBottom.addEventListener('click',hide);
 if(location.hash==='#propozice')show();
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&page.classList.contains('is-open'))hide();});
})();



(function(){
 function closeStories(destination){
   document.querySelectorAll('.tdj-story').forEach(function(s){s.classList.remove('open');s.classList.remove('is-open');s.setAttribute('aria-hidden','true');});
   document.body.style.overflow='';
   if(destination==='help'){
     history.replaceState(null,'',location.pathname+location.search+'#pomahame');
     requestAnimationFrame(function(){var t=document.getElementById('pomahame');if(t)t.scrollIntoView({behavior:'smooth',block:'start'});});
   } else if(destination==='home'){
     history.replaceState(null,'',location.pathname+location.search);
     requestAnimationFrame(function(){window.scrollTo({top:0,behavior:'smooth'});});
   }
 }
 document.querySelectorAll('[data-story]').forEach(function(a){
   a.addEventListener('click',function(e){
     e.preventDefault();
     document.querySelectorAll('.tdj-story').forEach(function(x){x.classList.remove('open');x.classList.remove('is-open');});
     var s=document.getElementById(this.getAttribute('data-story'));
     if(s){s.classList.add('open');s.classList.add('is-open');s.removeAttribute('aria-hidden');s.scrollTop=0;document.body.style.overflow='hidden';requestAnimationFrame(function(){s.scrollTop=0;});}
   });
 });
 document.querySelectorAll('.closeStory,#closeRad').forEach(function(b){b.addEventListener('click',function(){closeStories('help');});});
 document.addEventListener('click',function(e){
   var back=e.target.closest('.tdj-bottom-back'); if(back){e.preventDefault();closeStories('help');return;}
   var home=e.target.closest('.tdj-bottom-home'); if(home){e.preventDefault();closeStories('home');return;}
 });
 document.addEventListener('keydown',function(e){if(e.key==='Escape')closeStories('help');});
})();



document.addEventListener('click',function(e){var a=e.target.closest('[data-story]');if(!a)return;var s=document.getElementById(a.getAttribute('data-story'));if(!s)return;setTimeout(function(){s.scrollTop=0},0)});



document.addEventListener('click',function(e){
  var a=e.target.closest('a,button');
  if(a && /PŘÍBĚH\s+TDJ/i.test(a.textContent)){e.preventDefault();location.hash='historie-tdj';}
});



document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.tdj-story').forEach(function(page) {
    var old = page.querySelector('.tdj-bottom-nav');
    if (old) old.remove();
    var nav = document.createElement('div');
    nav.className = 'tdj-bottom-nav';
    nav.innerHTML = '<button type="button" class="tdj-bottom-back">← ZPĚT NA POMÁHÁME</button><button type="button" class="tdj-bottom-home">ZPĚT NA TDJ →</button>';
    page.appendChild(nav);
  });
});



(function(){
  const page=document.getElementById('fotogalerie-2026'); if(!page) return;
  const slides=[...page.querySelectorAll('.tdj-2026-slide')], dotsWrap=page.querySelector('.tdj-2026-dots'); let i=0,t;
  slides.forEach((_,n)=>{const b=document.createElement('button');b.className='tdj-2026-dot'+(n===0?' is-active':'');b.type='button';b.setAttribute('aria-label','Fotografie '+(n+1));b.onclick=()=>go(n,true);dotsWrap.appendChild(b)});
  const dots=[...dotsWrap.children];
  function go(n,reset){i=(n+slides.length)%slides.length;slides.forEach((s,k)=>s.classList.toggle('is-active',k===i));dots.forEach((d,k)=>d.classList.toggle('is-active',k===i));if(reset) start()}
  function start(){clearInterval(t);t=setInterval(()=>go(i+1,false),5000)}
  page.querySelector('.tdj-2026-prev').onclick=()=>go(i-1,true);page.querySelector('.tdj-2026-next').onclick=()=>go(i+1,true);
  page.querySelector('.tdj-2026-slider').addEventListener('mouseenter',()=>clearInterval(t));page.querySelector('.tdj-2026-slider').addEventListener('mouseleave',start);start();
})();
