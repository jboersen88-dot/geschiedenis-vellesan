/* Economie · bouwt index.html, jaar.html en h.html op uit data/paginas.json
   (alle pagina's die in het menu van meneerboersen.nl staan, opgehaald met crawl.py; zie changelog.md). */
(function(){
/* jaar → niveau → hoofdstukken. Een niveau zonder pre heeft nog geen inhoud ("volgt"). */
var JAREN=[
  {id:"jaar-2",titel:"Jaar 2",img:"geld",intro:"Geld, kopen, werken, produceren, de markt en de overheid: de basis van economie.",
   niv:[{id:"mavo",titel:"Mavo",pre:"jaar-2/mavo/"}]},
  {id:"jaar-3",titel:"Jaar 3",img:"welvaart",intro:"Welvaart, consumeren, bankieren, verzekeren, productie, de overheid en de wereld.",
   niv:[{id:"mavo",titel:"Mavo",pre:"jaar-3/mavo/"},{id:"havo-vwo",titel:"Havo/vwo",pre:null}]},
  {id:"jaar-4",titel:"Jaar 4",img:"wereldhandel",intro:"Inkomen, geld, winst, werk, de overheid, handel en ontwikkeling: op weg naar het eindexamen.",
   niv:[{id:"mavo",titel:"Mavo",pre:"jaar-4/"}]}];
var THEMA={"jaar-2/mavo/hoofdstuk-0-rekenvaardigheden":"rekenen","jaar-2/mavo/hoofdstuk-1":"consument","jaar-2/mavo/kopie-van-hoofdstuk-1":"consument","jaar-2/mavo/hoofdstuk-2":"j2h2/sparen","jaar-2/mavo/hoofdstuk-3-aan-het-werk":"werk","jaar-2/mavo/hoofdstuk-4":"productie","jaar-2/mavo/hoofdstuk-5":"markt","jaar-2/mavo/hoofdstuk-6":"overheid","jaar-2/mavo/proefwerkweek-rekenvaardigheden-eindtoets":"toets",
  "jaar-3/mavo/hoofdstuk-0-rekenvaardigheden":"rekenen","jaar-3/mavo/hoofdstuk-1-hoe-groot-is-jouw-welvaart":"welvaart","jaar-3/mavo/hoofdstuk-2-wat-voor-consument-ben-jij":"consument","jaar-3/mavo/hoofdstuk-3-de-bank-en-jouw-geld":"bank","jaar-3/mavo/hoofdstuk-4-ben-je-verzekerd":"verzekeren","jaar-3/mavo/se-1":"toets","jaar-3/mavo/hoofdstuk-5-werkt-dat-zo":"werk","jaar-3/mavo/hoofdstuk-6-productie-en-markt":"productie","jaar-3/mavo/se-3-h5-h6":"toets","jaar-3/mavo/hoofdstuk-7-de-overheid-voor-ons-allemaal":"overheid","jaar-3/mavo/hoofdstuk-8-over-economische-grenzen":"wereldhandel","jaar-3/mavo/se4-h7-h8":"toets",
  "jaar-4/hoofdstuk-0-rekenvaardigheden":"rekenen","jaar-4/hoofdstuk-1-verdien-je-genoeg":"inkomen","jaar-4/hoofdstuk-2-geld-moet-rollen":"geld","jaar-4/se-h1-h2-h8":"toets","jaar-4/hoofdstuk-3":"winst","jaar-4/hoofdstuk-4-aan-het-werk":"werk","jaar-4/hoofdstuk-5-kan-de-overheid-dat-regelen":"overheid","jaar-4/hoofdstuk-6-de-overheid-en-ons-inkomen":"inkomen","jaar-4/se-h5-en-h6":"toets","jaar-4/hoofdstuk-7":"wereldhandel","jaar-4/hoofdstuk-8":"welvaart","jaar-4/se4":"toets","jaar-4/se6":"toets","jaar-4/eindexamen":"toets"};
/* pagina's waar op meneerboersen.nl een eigen lesapp in staat (kopie in apps/) */
var APPS={"jaar-2/mavo/hoofdstuk-1":[["Lesapp","jaar-2_mavo_hoofdstuk-1.html"]],"jaar-2/mavo/hoofdstuk-2":[["Lesapp","jaar-2_mavo_hoofdstuk-2.html"]],"jaar-2/mavo/hoofdstuk-3-aan-het-werk":[["Lesapp","jaar-2_mavo_hoofdstuk-3-aan-het-werk.html"]],"jaar-2/mavo/hoofdstuk-4":[["Lesapp","jaar-2_mavo_hoofdstuk-4.html"]],
  "jaar-4/hoofdstuk-1-verdien-je-genoeg":[["Lesapp","jaar-4_hoofdstuk-1-verdien-je-genoeg.html"]],"jaar-4/hoofdstuk-2-geld-moet-rollen":[["Lesapp","jaar-4_hoofdstuk-2-geld-moet-rollen.html"]],"jaar-4/hoofdstuk-3":[["Lesapp","jaar-4_hoofdstuk-3.html"]]};
/* pagina's met een eigen volledige leeromgeving (zelfde opzet als de Geschiedenis-boekjes): [link, titel, tekst] */
var LEEROMG={"jaar-4/se-h1-h2-h8":["se3/app.html","Open de leeromgeving SE3","Dia's per paragraaf, begrippen, leerdoelen, rekenen en formules, quiz, games en een toets op maat die de AI voor je nakijkt. Werkt ook op je telefoon en iPad."]};
/* hoofdstukken met een eigen pagina op volle breedte (opzet van Geschiedenis boekje 1): hoofdstukpagina, per paragraaf een leeromgeving
   (h.html?p=...&par=2.1) en een oefenomgeving. De inhoud staat in <map>/data.json en <map>/oefen.html, gemaakt door bouw-oefen.py
   uit de oude lesapp. Hier alleen de vormgeving: hero, kaartbeeld (als het niet het eerste beeld is) en kleuren [op de kaart, op de lichte band]. */
var RIJK={"jaar-2/mavo/hoofdstuk-1":{map:"j2h1",kop:["Wat heb je ","nodig?"],hero:"markt",
  alt:"Een overdekte markt met kraampjes vol groente en fruit, waar mensen boodschappen doen",
  intro:"Keuzes maken, geld en betalen, behoeften en slim kopen: vier paragrafen over jou als consument.",
  par:"Vier paragrafen over keuzes en geld.",reken:"Saldo, afronden, week naar maand, gemiddelde en procenten.",games:"Edu-Racer, Swipe & Scoor en begrippen-memory.",
  kleur:{"1.1":["var(--coral)","var(--berry)"],"1.2":["#7fd4c9","var(--teal)"],"1.3":["#b9d6cb","var(--green)"],"1.4":["#f2c46b","var(--ochre)"]}},
  "jaar-2/mavo/hoofdstuk-2":{map:"j2h2",kop:["Jij en je ","geld"],hero:"begroting",
  alt:"Een vrouw maakt 's avonds aan een bureau een jaarbegroting, met rekenmachine, bonnetjes en een laptop met bankapp",
  intro:"Inkomsten en uitgaven, sparen, lenen en verzekeren: vier paragrafen om slim met je geld om te gaan.",
  par:"Vier paragrafen over jouw geld.",reken:"Begroting, saldo, rente, lening en procenten, met de juiste formule.",games:"Een snelle quiz, Swipe & Scoor en begrippen-memory.",
  kaart:{"2.2":"bankapp"},/* sparen.jpg is een drieluik */
  kleur:{"2.1":["var(--coral)","var(--berry)"],"2.2":["#7fd4c9","var(--teal)"],"2.3":["#f2c46b","var(--ochre)"],"2.4":["#b9d6cb","var(--green)"]}}};
var NAAM={"jaar-2/mavo/kopie-van-hoofdstuk-1":"Hoofdstuk 1 · lesstof en PowerPoints"};

var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});};
var $=function(id){return document.getElementById(id);};
var PAGE=document.body.dataset.page,Q=new URLSearchParams(location.search),P=[];
function titel(p){return NAAM[p.pad]||p.titel.replace(/\s+/g," ").trim();}
/* geeft [jaar, niveau] van een pagina */
function jaarVan(pad){for(var a=0;a<JAREN.length;a++)for(var b=0;b<JAREN[a].niv.length;b++){var n=JAREN[a].niv[b];if(n.pre&&pad.indexOf(n.pre)===0)return [JAREN[a],n];}return [JAREN[0],JAREN[0].niv[0]];}
function hoofdstukken(n){if(!n.pre)return [];return P.filter(function(p){return p.pad.indexOf(n.pre)===0&&p.pad!==n.pre.replace(/\/$/,"");});}
function jaarTotaal(j){return j.niv.reduce(function(s,n){return s+hoofdstukken(n).length;},0);}
function naam(j,n){return j.titel+" · "+n.titel.toLowerCase();}
function jaarUrl(j,n){return "jaar.html?j="+j.id+(n?"&n="+n.id:"");}
function isSE(pad){return /\/(se|eindexamen|proefwerk)/.test(pad);}
function blokken(p){var b=[];p.secties.forEach(function(s){b=b.concat(s);});return b;}
function telling(p){var b=blokken(p),t={ppt:0,doc:0,vid:0,act:0};b.forEach(function(x){if(x.t==="drive"){var e=ext(x.naam);if(e==="ppt")t.ppt++;else if(e==="vid")t.vid++;else t.doc++;}else if(x.t==="youtube")t.vid++;else if(x.t==="link")t.act++;});
  var s=[];if(APPS[p.pad])s.push("lesapp");if(t.ppt)s.push(t.ppt+" PowerPoint"+(t.ppt>1?"s":""));if(t.vid)s.push(t.vid+" film"+(t.vid>1?"s":""));if(t.doc)s.push(t.doc+" oefenstof");if(t.act)s.push(t.act+" online oefening"+(t.act>1?"en":""));return s.join(" · ");}
function ext(n){var e=(/\.(\w{2,4})$/.exec(n||"")||[])[1]||"";e=e.toLowerCase();return /pptx?|key/.test(e)?"ppt":/docx?|pages|odt/.test(e)?"doc":e==="pdf"?"pdf":/mp4|mov|m4v|webm/.test(e)?"vid":/xlsx?|csv/.test(e)?"xls":"doc";}
var ICON={ppt:["PPT","PowerPoint"],doc:["DOC","Document"],pdf:["PDF","PDF"],vid:["▶","Film"],xls:["XLS","Spreadsheet"]};
function nette(n){return (n||"Bestand").replace(/\.(\w{2,4})$/,"").replace(/^Economie\s+jaar\s+\d\s+(hoofdstuk|Hoofdstuk|H)\s*/i,"").replace(/\s+/g," ").trim()||n;}
function linkSoort(h){var d=(h.split("/")[2]||"").replace(/^www\./,"");return /nearpod/.test(d)?["nearpod","Nearpod"]:/edpuzzle/.test(d)?["edpuzzle","Edpuzzle"]:/socrative/.test(d)?["socrative","Socrative"]:/schooltv/.test(d)?["web","Schooltv"]:["web",d];}
function top(extra){return '<div class="top"><div class="wrap"><a class="brand" href="../index.html">Meneer <span>Boersen</span></a><nav class="crumbs" aria-label="Kruimelpad"><a href="index.html">Economie</a>'+(extra||"")+'</nav></div></div>';}
function voet(){return '<footer><div class="wrap">Economie mavo · Vellesan College · J. Boersen. Foto\'s: Unsplash (gratis licentie). PowerPoints, opdrachten en films openen vanuit Google Drive.</div></footer>';}

/* ---------- overzicht ---------- */
function index(){
  var h=top()+'<main class="wrap"><section class="hero"><img src="img/markt.jpg" alt="" fetchpriority="high"><div class="in"><div class="eyebrow">Economie · mavo</div><h1>Economie bij meneer Boersen</h1><p>Alle hoofdstukken van jaar 2, 3 en 4: PowerPoints, uitleg, oefenstof, films, lesapps en voorbereiding op je SE\'s.</p></div></section>';
  h+='<div class="step"><span>Stap 1</span> In welk jaar zit je?</div>';
  h+='<div class="grid big">'+JAREN.map(function(j,i){return '<a class="tile rv" style="--i:'+i+'" href="'+jaarUrl(j)+'"><div class="ph"><img src="img/'+j.img+'.jpg" alt="" loading="lazy"></div><div class="tx"><div class="k">'+j.niv.map(function(n){return n.titel;}).join(" · ")+' · '+jaarTotaal(j)+' onderdelen</div><h2>'+esc(j.titel)+'</h2><p class="meta">'+esc(j.intro)+'</p></div></a>';}).join("")+'</div>';
  h+='<p style="margin-top:26px"><a class="btn ghost" href="../geschiedenis.html">Naar Geschiedenis</a></p></main>'+voet();
  document.body.innerHTML=h;}

/* ---------- jaar: eerst het niveau, daarna de hoofdstukken ---------- */
function jaar(){
  var j=JAREN.filter(function(x){return x.id===Q.get("j");})[0]||JAREN[1];
  var n=j.niv.filter(function(x){return x.id===Q.get("n");})[0];
  if(!n||!n.pre){niveau(j);return;}
  var L=hoofdstukken(n);
  document.title=naam(j,n)+" · Economie";
  var h=top(' / <a href="'+jaarUrl(j)+'">'+esc(j.titel)+'</a> / '+esc(n.titel))+'<main class="wrap"><section class="hero"><img src="img/'+j.img+'.jpg" alt="" fetchpriority="high"><div class="in"><div class="eyebrow">Economie · '+esc(j.titel)+'</div><h1>'+esc(naam(j,n))+'</h1><p>'+esc(j.intro)+'</p></div></section><div class="step"><span>Stap 3</span> Kies je hoofdstuk</div><div class="grid">';
  h+=L.map(function(p,i){var t=titel(p),m=/^(Hoofdstuk\s*\d+|SE\s*\d*|Proefwerkweek)\s*[:\-]?\s*(.*)$/i.exec(t),k=m?m[1]:"",n=m&&m[2]?m[2].replace(/^\((.*)\)$/,"$1"):t;
    if(n===t&&isSE(p.pad))k="Toetsvoorbereiding";
    return '<a class="tile rv'+(isSE(p.pad)?" se":"")+'" style="--i:'+i+'" href="h.html?p='+encodeURIComponent(p.pad)+'"><div class="ph"><img src="img/'+(THEMA[p.pad]||j.img)+'.jpg" alt="" loading="lazy"></div><div class="tx"><div class="k">'+esc(k||(isSE(p.pad)?"Toetsvoorbereiding":"Onderdeel"))+'</div><h3>'+esc(n.charAt(0).toUpperCase()+n.slice(1))+'</h3><div class="meta">'+esc(telling(p))+'</div></div></a>';}).join("");
  document.body.innerHTML=h+'</div><p style="margin-top:22px"><a class="btn ghost" href="'+jaarUrl(j)+'">← Ander niveau</a> <a class="btn ghost" href="index.html">Ander jaar</a></p></main>'+voet();}

function niveau(j){
  document.title=j.titel+" · Economie";
  var h=top(' / '+esc(j.titel))+'<main class="wrap"><section class="hero"><img src="img/'+j.img+'.jpg" alt="" fetchpriority="high"><div class="in"><div class="eyebrow">Economie</div><h1>'+esc(j.titel)+'</h1><p>'+esc(j.intro)+'</p></div></section>';
  h+='<div class="step"><span>Stap 2</span> Op welk niveau zit je?</div><div class="grid niv">'+j.niv.map(function(n,i){
    if(!n.pre)return '<div class="tile niv volgt rv" style="--i:'+i+'" aria-disabled="true"><div class="tx"><div class="k">Volgt binnenkort</div><h2>'+esc(n.titel)+'</h2><p class="meta">De lesstof voor '+esc(n.titel.toLowerCase())+' komt later op de site.</p></div></div>';
    var c=hoofdstukken(n).length;
    return '<a class="tile niv rv" style="--i:'+i+'" href="'+jaarUrl(j,n)+'"><div class="tx"><div class="k">'+c+' onderdelen</div><h2>'+esc(n.titel)+'</h2><p class="meta">'+esc(naam(j,n))+': alle hoofdstukken, PowerPoints, oefenstof, films en lesapps.</p><span class="go">Kies '+esc(n.titel.toLowerCase())+' →</span></div></a>';}).join("")+'</div>';
  h+='<p style="margin-top:22px"><a class="btn ghost" href="index.html">← Ander jaar</a></p></main>'+voet();
  document.body.innerHTML=h;}

/* ---------- hoofdstuk op volle breedte (RIJK) ---------- */
function rijk(p,j,n,c){
  fetch(c.map+"/data.json").then(function(r){return r.json();}).then(function(D){
    var x=D.pars.filter(function(y){return y.id===Q.get("par");})[0];
    document.body.className="rijk";
    if(x)paragraaf(p,j,n,c,D,x);else hoofdpagina(p,j,n,c,D);
    if(x&&D.deck[x.id])rDeck($("rdeck"),c.map+"/slides/"+x.id+"/",D.deck[x.id],D.steps[x.id]||{},"deck-"+c.map+"-"+x.id);
    rijkGedrag(D,!!x);
  }).catch(function(){document.body.innerHTML='<main class="wrap"><p>De pagina kon niet laden. Probeer het opnieuw.</p></main>';});}
function rUrl(p,id){return "h.html?p="+encodeURIComponent(p.pad)+(id?"&par="+id:"");}
function rSrc(c,f){return "img/"+c.map+"/"+f+".jpg";}
/* voortgang staat onder dezelfde sleutel als in de oefenomgeving, zodat afvinken op beide plekken meetelt */
function rStaat(D){try{return JSON.parse(localStorage.getItem(D.key))||{};}catch(e){return {};}}
function rTel(D,x){var q=rStaat(D).qs||{};return x.q.filter(function(_,i){return q[x.id+"-"+i];}).length;}
function rTags(D,x){var nf=D.films.filter(function(f){return f.par===x.id;}).length,d=rTel(D,x);
  return [(d?d+" van ":"")+x.q.length+" vragen"].concat(nf?[nf+" filmpje"+(nf>1?"s":"")]:[]);}
function rSpans(a){return a.map(function(g){return '<span>'+esc(g)+'</span>';}).join("");}
function rNav(links,cta){return '<header class="rnav" id="rnav"><div class="wrap"><a class="brand" href="../index.html" aria-label="Meneer Boersen, naar de homepage"><b class="bfull">Meneer <span>Boersen</span></b><b class="bshort" aria-hidden="true">M<span>B</span></b></a><nav class="rlinks" aria-label="Menu">'+links.map(function(l){return '<a href="'+l[0]+'"'+(l[2]?' aria-current="page"':'')+'>'+esc(l[1])+'</a>';}).join("")+'<a class="cta" href="'+cta+'">Oefenomgeving</a></nav></div></header>';}
function rGolf(m){return '<svg class="rwave'+m+'" viewBox="0 0 1200 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0,36 C200,70 400,4 600,30 C800,56 1000,12 1200,40 L1200,70 L0,70 Z"/></svg>';}
function rVoet(j,n){var w=esc(j.titel.toLowerCase()+" "+n.titel.toLowerCase());return '<footer class="rfoot"><div class="wrap"><span>Meneer Boersen · Vellesan College · Economie '+w+'</span><span>Beelden: AI-illustraties, gemaakt door de docent</span></div></footer>';}
function rGal(c,x){return '<div class="rgal n'+x.imgs.length+' io" style="--d:1">'+x.imgs.map(function(b){return '<a href="'+rSrc(c,b[0])+'" target="_blank" rel="noopener"><img src="'+rSrc(c,b[0])+'" alt="" loading="lazy"><span>'+esc(b[1])+'</span></a>';}).join("")+'</div>';}

/* dia-viewer met klikstappen, overgenomen uit app.html (mountDeck). STEPS: per dia het aantal klikstappen k;
   stap s<k = NN-s.jpg (toestand na s klikken), stap k = de volledige dia NN.jpg. Gemaakt met tools/dias/stappen.py. */
function rDeck(el,dir,N,STEPS,key){
  var i=1,s=0,tok=0;try{i=Math.min(Math.max(1,+localStorage.getItem(key)||1),N);}catch(e){}
  function K(n){return STEPS[n]||0;}
  function src(n,st){var nn=(n<10?"0":"")+n;return dir+nn+(st<K(n)?"-"+st:"")+".jpg";}
  el.innerHTML='<div class="sdeck" tabindex="0" aria-roledescription="presentatie" aria-label="Presentatie">'+
   '<div class="deck-stage"><img alt=""><img alt=""><button class="deck-nav l" aria-label="Vorige"><span>‹</span></button><button class="deck-nav r" aria-label="Volgende"><span>›</span></button></div>'+
   '<div class="deck-bar"><span class="cnt"></span><div class="deck-prog"><i></i></div><button data-act="fs">⛶ Schermvullend</button></div>'+
   '<div class="deck-thumbs">'+Array.from({length:N},function(_,k){return '<button data-n="'+(k+1)+'" aria-label="Dia '+(k+1)+'"><img loading="lazy" alt="" src="'+src(k+1,K(k+1))+'"></button>';}).join("")+'</div></div>';
  var d=el.querySelector(".sdeck"),stg=d.querySelector(".deck-stage"),imgs=stg.querySelectorAll("img"),front=0,cnt=d.querySelector(".cnt"),bar=d.querySelector(".deck-prog i"),th=d.querySelectorAll(".deck-thumbs button"),eerst=true;
  function go(n,st,dir2){
    n=Math.min(Math.max(1,n),N);st=Math.min(Math.max(0,st),K(n));
    var same=n===i&&!eerst,nextImg=imgs[1-front],curImg=imgs[front],t=++tok;eerst=false;
    stg.classList.toggle("stp",same);
    nextImg.style.transition="none";nextImg.className="";void nextImg.offsetWidth;nextImg.style.transition="";
    nextImg.onload=function(){if(t!==tok)return;nextImg.className="on";curImg.className=same?"under":(dir2<0?"":"prev-out");front=1-front;};
    nextImg.src=src(n,st);nextImg.alt="Dia "+n+" van "+N+(K(n)?", stap "+(st+1)+" van "+(K(n)+1):"");
    i=n;s=st;cnt.textContent=n+" / "+N;bar.style.width=(n/N*100)+"%";
    th.forEach(function(b){b.setAttribute("aria-current",String(+b.dataset.n===n));});
    var tb=th[n-1];if(tb&&!same)tb.parentNode.scrollTo({left:tb.offsetLeft-tb.parentNode.clientWidth/2,behavior:"smooth"});
    var pre=new Image();pre.src=st<K(n)?src(n,st+1):(n<N?src(n+1,0):"");
    try{localStorage.setItem(key,n);}catch(e){}
  }
  function next(){if(s<K(i))go(i,s+1,1);else if(i<N)go(i+1,0,1);}
  function prev(){if(s>0)go(i,s-1,-1);else if(i>1)go(i-1,K(i-1),-1);}
  d.querySelector(".deck-nav.l").onclick=prev;
  d.querySelector(".deck-nav.r").onclick=next;
  d.querySelector(".deck-thumbs").onclick=function(e){var b=e.target.closest("[data-n]");if(b)go(+b.dataset.n,0,+b.dataset.n>i?1:-1);};
  d.querySelector('[data-act="fs"]').onclick=function(){if(document.fullscreenElement)document.exitFullscreen();else if(d.requestFullscreen)d.requestFullscreen().catch(function(){});};
  d.addEventListener("keydown",function(e){if(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown"){e.preventDefault();next();}else if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();prev();}else if(e.key==="Home")go(1,0,-1);else if(e.key==="End")go(N,K(N),1);});
  var sx=null;
  stg.addEventListener("pointerdown",function(e){sx=e.clientX;});
  stg.addEventListener("pointerup",function(e){if(sx===null)return;var dx=e.clientX-sx;sx=null;if(Math.abs(dx)>40){if(dx<0)next();else prev();}});
  go(i,0,1);}

function hoofdpagina(p,j,n,c,D){
  var t=titel(p),bn=jaarUrl(j,n),oef=D.oefen,w=esc(j.titel.toLowerCase()+" "+n.titel.toLowerCase());
  var kaart=function(x,i){return '<a class="rchap io" style="--c:'+c.kleur[x.id][0]+';--d:'+i+'" href="'+rUrl(p,x.id)+'"><img src="'+rSrc(c,(c.kaart||{})[x.id]||x.imgs[0][0])+'" alt="" loading="lazy"><span class="glare"></span><span class="num">'+x.id+'</span><div class="body"><span class="tag">Paragraaf '+x.id+'</span><h3>'+esc(x.t)+'</h3><p>'+esc(x.sum)+'</p><div class="links">'+rSpans(rTags(D,x))+'</div></div></a>';};
  var tegels=[["#lab/begrippen","Begrippen","Flash cards en Leg uit: oefen alle "+D.cards.length+" begrippen van dit hoofdstuk."],["#lab/reken","Rekenen",c.reken],["#lab/games","Quiz en games",c.games],["#toets","Oefentoetsen","Met klok en nakijkblad, of als Word-bestand voor je iPad."]];
  document.title=c.kop.join("")+" · Economie "+naam(j,n);
  document.body.innerHTML=rNav([["index.html","Economie"],[bn,j.titel]],oef)
  +'<section class="rhero"><div class="rhero-img" id="rimg" style="background-image:url('+rSrc(c,c.hero)+')" role="img" aria-label="'+esc(c.alt)+'"></div><div class="wrap rhero-in"><div class="eyebrow rv" style="--i:0;color:var(--coral)">Economie · '+esc(naam(j,n))+' · '+esc(t.toLowerCase())+'</div><h1 class="rv" style="--i:1">'+esc(c.kop[0])+'<em>'+esc(c.kop[1])+'</em></h1><p class="rv" style="--i:2">'+esc(c.intro)+'</p><div class="rbtns rv" style="--i:3"><a class="rbtn primary" href="'+rUrl(p,D.pars[0].id)+'">Begin met '+D.pars[0].id+' <span class="arr">→</span></a><a class="rbtn ghost" href="'+oef+'">Naar de oefenomgeving</a></div></div><div class="rscroll" aria-hidden="true"></div></section>'
  +'<section class="rblk" id="paragrafen"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">'+esc(t)+' · '+esc(c.kop.join(""))+'</div><h2>'+esc(c.par)+'</h2></div><p>Open een paragraaf voor de PowerPoint, de filmpjes en de vragen die je moet kunnen beantwoorden. Oefenen doe je daarna in de oefenomgeving.</p></div><div class="rchaps">'+D.pars.map(kaart).join("")+'</div></div></section>'
  +rGolf(" top")+'<section class="rblk rapp" id="oefenen"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Oefenomgeving</div><h2>Oefen tot je het kunt.</h2></div><p>Alles om '+esc(t.toLowerCase())+' te oefenen op één plek. Je voortgang wordt op dit apparaat bewaard.</p></div><div class="roef">'
  +tegels.map(function(g,i){return '<a class="io" style="--d:'+i+'" href="'+oef+g[0]+'"><b>'+(i+1)+'</b><h3>'+esc(g[1])+'</h3><p>'+esc(g[2])+'</p><span class="arr">→</span></a>';}).join("")
  +'</div><div class="rbtns" style="justify-content:center;margin-top:30px"><a class="rbtn primary" href="'+oef+'">Naar de oefenomgeving <span class="arr">→</span></a></div></div></section>'+rGolf("")
  +'<section class="rblk rend"><div class="wrap"><div class="eyebrow" style="color:var(--coral)">Klaar met dit hoofdstuk?</div><h2>Verder met Economie.</h2><p>Kies een ander hoofdstuk van '+w+' of ga terug naar het overzicht.</p><div class="rbtns"><a class="rbtn primary" href="'+bn+'">Alle hoofdstukken <span class="arr">→</span></a><a class="rbtn ghost" href="index.html">Ander jaar</a></div></div></section>'+rVoet(j,n);}

/* leeromgeving: alles om de stof van één paragraaf te leren; oefenen gebeurt in de oefenomgeving */
function paragraaf(p,j,n,c,D,x){
  var t=titel(p),oef=D.oefen,k=c.kleur[x.id][1],i=D.pars.indexOf(x),vor=D.pars[i-1],na=D.pars[i+1],S=rStaat(D),qs=S.qs||{},films=D.films.filter(function(f){return f.par===x.id;}),d=rTel(D,x),
  doel=function(f){return f.lab==="reken"?"#lab/reken"+(f.mode?"/"+f.mode:""):f.lab==="quiz"?"#lab/quiz/"+(f.qpar||x.id):"#lab/"+f.lab;},
  film=function(f){var id=f.yt||f.film;return '<div class="rfilm io"><div class="yt"><img src="'+(f.yt?"https://i.ytimg.com/vi/"+esc(id)+"/hqdefault.jpg":"https://drive.google.com/thumbnail?id="+esc(id)+"&sz=w1200")+'" alt="" loading="lazy" onerror="this.remove()"><button '+(f.yt?'data-yt':'data-film')+'="'+esc(id)+'" aria-label="Speel film af: '+esc(f.t)+'"><span></span></button></div><div class="rfilm-tx"><div class="eyebrow">'+esc(f.k)+'</div><h3>'+esc(f.t)+'</h3><p>'+esc(f.d)+'</p><a class="rlink" href="'+oef+doel(f)+'">'+esc(f.btn)+' →</a></div></div>';},
  mat=x.x.map(function(m){var M=D.mat[m];return M[1].map(function(l){return '<a class="file" href="https://drive.google.com/file/d/'+esc(l[1])+'/view" target="_blank" rel="noopener"><span class="ic '+(/powerpoint/i.test(l[0])?"ppt\">PPT":"doc\">DOC")+'</span><span>'+esc(M[0])+'<small>'+esc(l[0])+' · opent in Google Drive</small></span></a>';}).join("");}).join("");
  document.title=x.id+" "+x.t+" · Leeromgeving · Economie";
  document.body.innerHTML=rNav([[rUrl(p),t],[rUrl(p,x.id),"Leeromgeving",1]],oef)
  /* de band van de paragraaf, zoals op de hoofdstukpagina */
  +'<section class="rpar rtop" style="--k:'+k+'"><div class="wrap"><div class="rpills"><div class="eyebrow">Leeromgeving · '+esc(t)+' · '+esc(c.kop.join(""))+'</div><nav aria-label="Paragrafen">'+D.pars.map(function(y){return '<a href="'+rUrl(p,y.id)+'"'+(y===x?' aria-current="page"':'')+' style="--k:'+c.kleur[y.id][1]+'">'+y.id+'<span> '+esc(y.t)+'</span></a>';}).join("")+'</nav></div>'
  +'<div class="rpar-in"><div class="io"><div class="rnum">'+x.id+'</div><div class="eyebrow">Paragraaf '+x.id+'</div><h1>'+esc(x.t)+'</h1><p class="rpar-sum">'+esc(x.sum)+'</p><div class="rqh">Kun jij dit beantwoorden?</div><ul class="rq">'+x.q.slice(0,4).map(function(q){return '<li>'+esc(q)+'</li>';}).join("")+'</ul><div class="rtags">'+rSpans(rTags(D,x))+'</div><div class="rbtns"><a class="rbtn primary" href="'+oef+'#lab/quiz/'+x.id+'">Oefen '+x.id+' <span class="arr">→</span></a><a class="rbtn line" href="#lesstof">Naar de PowerPoint ↓</a></div></div>'+rGal(c,x)+'</div></div></section>'
  +'<section class="rblk" id="lesstof"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Lesstof</div><h2>De PowerPoint van '+x.id+'.</h2></div><p>'+(D.deck[x.id]?'Klik of tik door de presentatie, met dezelfde animaties als in de les. Pijltjestoetsen werken ook.':'Blader door de dia\'s. Wil je hem groter? Open hem in Google Drive.')+'</p></div>'+(D.deck[x.id]?'<div id="rdeck" class="io"></div>':'<div class="rppt io"><iframe src="https://drive.google.com/file/d/'+esc(x.file)+'/preview" allow="autoplay" loading="lazy" title="PowerPoint '+x.id+' '+esc(x.t)+'"></iframe></div>')+'<div class="files" style="margin-top:14px"><a class="file" href="https://drive.google.com/file/d/'+esc(x.file)+'/view" target="_blank" rel="noopener"><span class="ic ppt">PPT</span><span>PowerPoint '+x.id+'<small>Open in Google Drive</small></span></a>'+mat+'</div></div></section>'
  +(films.length?'<section class="rblk ralt"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Filmpjes</div><h2>Kijk en luister.</h2></div><p>Bekijk de uitleg en oefen daarna meteen hetzelfde in de oefenomgeving.</p></div><div class="rfilms">'+films.map(film).join("")+'</div></div></section>':'')
  +'<section class="rblk" id="vragen"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Kun jij dit beantwoorden?</div><h2>Wat moet je weten na '+x.id+'?</h2></div><p>Tik op een vraag als je het antwoord weet. Je voortgang telt ook mee in de oefenomgeving.</p></div>'
  +'<div class="rcard io"><div class="rbar"><i id="rbar" style="width:'+(d/x.q.length*100)+'%;background:'+k+'"></i></div><p class="rbar-tx" id="rbartx">'+d+' van '+x.q.length+' vragen kun je beantwoorden</p><div class="rvragen">'+x.q.map(function(q,m){var key=x.id+"-"+m;return '<button class="rvraag'+(qs[key]?" on":"")+'" data-vraag="'+key+'" aria-pressed="'+!!qs[key]+'"><i aria-hidden="true"></i>'+esc(q)+'</button>';}).join("")+'</div></div></div></section>'
  +'<section class="rblk rend"><div class="wrap"><div class="eyebrow" style="color:var(--coral)">Klaar met '+x.id+'?</div><h2>Ga oefenen.</h2><p>Oefen de begrippen en sommen van '+x.id+' in de oefenomgeving'+(na?', of ga door met '+na.id+' '+esc(na.t)+'.':'.')+'</p><div class="rbtns"><a class="rbtn primary" href="'+oef+'#lab/quiz/'+x.id+'">Naar de oefenomgeving <span class="arr">→</span></a>'+(na?'<a class="rbtn ghost" href="'+rUrl(p,na.id)+'">Volgende: '+na.id+' →</a>':'<a class="rbtn ghost" href="'+rUrl(p)+'">Terug naar het hoofdstuk</a>')+'</div>'+(vor?'<p style="margin:22px auto 0"><a class="rterug" href="'+rUrl(p,vor.id)+'">← Vorige: '+vor.id+' '+esc(vor.t)+'</a></p>':'')+'</div></section>'+rVoet(j,n);}

function rijkGedrag(D,vast){
  var RM=matchMedia("(prefers-reduced-motion: reduce)").matches,nav=$("rnav"),img=$("rimg");
  function onScroll(){nav.classList.toggle("solid",vast||scrollY>40);if(img&&!RM&&scrollY<1200)img.style.setProperty("--py",scrollY*.28+"px");}
  addEventListener("scroll",onScroll,{passive:true});onScroll();
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".io").forEach(function(el){io.observe(el);});
  /* tilt op de paragraafkaarten (alleen met muis) */
  if(!RM&&matchMedia("(hover:hover) and (pointer:fine)").matches)document.querySelectorAll(".rchap").forEach(function(k){
    k.addEventListener("pointermove",function(e){var r=k.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;k.classList.add("tilting");k.style.setProperty("--ry",((x-.5)*7)+"deg");k.style.setProperty("--rx",((.5-y)*6)+"deg");k.style.setProperty("--gx",(x*100)+"%");k.style.setProperty("--gy",(y*100)+"%");});
    k.addEventListener("pointerleave",function(){k.classList.remove("tilting");k.style.setProperty("--ry","0deg");k.style.setProperty("--rx","0deg");});});
  /* vragen afvinken: lezen en schrijven in dezelfde opslag als de oefenomgeving */
  function zet(veld,key,aan){var S=rStaat(D);S[veld]=S[veld]||{};if(aan)S[veld][key]=1;else delete S[veld][key];try{localStorage.setItem(D.key,JSON.stringify(S));}catch(e){}}
  document.addEventListener("click",function(e){var b=e.target.closest("[data-vraag]");if(!b)return;var aan=!b.classList.contains("on");zet("qs",b.dataset.vraag,aan);b.classList.toggle("on",aan);b.setAttribute("aria-pressed",aan);
    var l=document.querySelectorAll("[data-vraag]").length,a=document.querySelectorAll("[data-vraag].on").length;$("rbar").style.width=(a/l*100)+"%";$("rbartx").textContent=a+" van "+l+" vragen kun je beantwoorden";});}

/* ---------- hoofdstuk ---------- */
var K;try{K=JSON.parse(localStorage.getItem("gv-eco-kunnen"))||{};}catch(e){K={};}
function hoofdstuk(){
  var p=P.filter(function(x){return x.pad===Q.get("p");})[0];if(!p){location.href="index.html";return;}
  var jn=jaarVan(p.pad),j=jn[0],n=jn[1],t=titel(p);document.title=t+" · Economie "+naam(j,n);
  if(RIJK[p.pad]){rijk(p,j,n,RIJK[p.pad]);return;}
  var secs=p.secties.filter(function(s){return !s.every(function(b){return b.t==="kop"||(b.t==="p"&&b.tekst.length<3);});});
  if(secs.length&&secs[0].every(function(b){return b.t==="kop";}))secs.shift();
  var chips=[],body="";
  secs=groepeer(secs);
  secs.forEach(function(s,si){var id="s"+si,eerste=s.filter(function(b){return b.t==="kop"&&echteKop(b.tekst);})[0];
    if(eerste&&PARKOP.test(eerste.tekst))chips.push('<a href="#'+id+'">'+esc(kort(eerste.tekst.replace(/:$/,""),34))+'</a>');
    else if(si===0)chips.push('<a href="#'+id+'">Start</a>');
    body+='<section class="sec rv" style="--i:'+Math.min(si,8)+'" id="'+id+'">'+sectie(s,p.pad,si)+'</section>';});
  var apps=(APPS[p.pad]||[]).map(function(a){return '<section class="sec"><h2>'+esc(a[0])+'</h2><iframe class="app" src="apps/'+a[1]+'" title="'+esc(a[0]+" "+t)+'" loading="lazy"></iframe><p><a class="btn ghost" href="apps/'+a[1]+'" target="_blank" rel="noopener">Open op volledig scherm</a></p></section>';}).join("");
  var h=top(' / <a href="'+jaarUrl(j)+'">'+esc(j.titel)+'</a> / <a href="'+jaarUrl(j,n)+'">'+esc(n.titel)+'</a> / '+esc(t))+'<main class="wrap"><section class="hero"><img src="img/'+(THEMA[p.pad]||j.img)+'.jpg" alt="" fetchpriority="high"><div class="in"><div class="eyebrow">Economie · '+esc(naam(j,n))+'</div><h1>'+esc(t)+'</h1><p>'+esc(telling(p))+'</p></div></section>';
  if(chips.length>1)h+='<nav class="chips" aria-label="Onderdelen van deze pagina">'+chips.join("")+'</nav>';
  var lo=LEEROMG[p.pad];
  if(lo)h+='<section class="sec leerkaart"><div><div class="eyebrow">Nieuw · alles op één plek</div><h2>'+esc(lo[1])+'</h2><p>'+esc(lo[2])+'</p></div><a class="btn" href="'+lo[0]+'">Open de leeromgeving →</a></section>';
  if(lo){var lz=blokken(p).filter(function(b){return b.t==="drive"||b.t==="link";});/* lesstof-links uit paginas.json, of een verwijzing naar de leeromgeving */
    h+='<section class="sec"><h2>Lesstof</h2>'+(lz.length?sectie(lz,p.pad,0):'<p>De lesstof vind je in de leeromgeving: <a href="'+lo[0]+'#les">tabblad Lesstof</a>.</p>')+'</section>';}
  h+=apps+body+'<p><a class="btn ghost" href="'+jaarUrl(j,n)+'">← Alle hoofdstukken van '+esc(naam(j,n))+'</a></p></main>'+voet();
  h+='<dialog class="viewer" id="viewer" aria-label="Bestand bekijken"><div class="bar"><b id="vtitel"></b><a class="btn ghost" id="vopen" target="_blank" rel="noopener">Open in Drive</a><button class="btn" id="vdicht">Sluiten</button></div><iframe id="vframe" title="Bestand" allow="autoplay; fullscreen"></iframe></dialog>';
  document.body.innerHTML=h;
  var lk=document.querySelector(".leerkaart");/* kaart pas tonen als de leeromgeving er echt is */
  if(lk){lk.hidden=true;fetch(lo[0],{method:"HEAD"}).then(function(r){if(r.ok)lk.hidden=false;}).catch(function(){});}}
/* Google Sites gebruikt koppen ook voor gewone zinnen: alleen korte koppen of paragraafkoppen tellen als kop */
var PARKOP=/^((paragraaf|hoofdstuk|h)\s*\d|\d+(\.\d+)+|se\s*\d)/i;
function echteKop(t){return PARKOP.test(t)||(t.length<=40&&!/[.!]$/.test(t)&&!/^(link|klik)/i.test(t)&&!/=/.test(t));}
function schoon(t){return String(t).toLowerCase().replace(/[^a-z0-9]+/g,"");}
function linkNaam(t){var x=t.replace(/^klik\s+(hier\s+)?op\s+(deze|onderstaande|de)\s+link\s*(voor\s+|om\s+)?/i,"").replace(/\s+te\s+kunnen\b/i,"").replace(/^het\s+/i,"").replace(/\.$/,"");return x?x.charAt(0).toUpperCase()+x.slice(1):t;}
function kort(t,n){return t.length>n?t.slice(0,n-1)+"…":t;}
function groepeer(secs){var g=[];secs.forEach(function(s){var k=s.filter(function(b){return b.t==="kop";})[0];
  if(!g.length||(k&&PARKOP.test(k.tekst)))g.push(s.slice());else g[g.length-1]=g[g.length-1].concat(s);});return g;}
function sectie(s,pad,si){var h="",kop=0,i=0;
  // generieke linkteksten ("link", "klik hier") krijgen de zin ervoor als naam; die zin vervalt dan
  s=s.slice();for(var q=0;q<s.length;q++){var b0=s[q];if(b0.t==="link"&&/^(link|klik hier|hier)$/i.test(b0.tekst)){for(var r=q-1;r>=0;r--){if(s[r].t==="kop"||s[r].t==="p"){s[q]={t:"link",href:b0.href,tekst:s[r].tekst.replace(/[:.]$/,"")};s.splice(r,1);q--;break;}if(s[r].t!=="link")break;}}}
  var namen=s.filter(function(b){return b.t==="link";}).map(function(b){return schoon(b.tekst);});
  s=s.filter(function(b){return !((b.t==="kop"||b.t==="p")&&(/^link$/i.test(b.tekst)||namen.indexOf(schoon(b.tekst))>-1));});
  s=s.map(function(b){return b.t==="link"?{t:"link",href:b.href,tekst:linkNaam(b.tekst)}:b;});
  while(i<s.length){var b=s[i];
    if(b.t==="kop"&&echteKop(b.tekst)){h+=(kop++?"<h3>":"<h2>")+esc(b.tekst)+(kop>1?"</h3>":"</h2>");i++;continue;}
    if(b.t==="kop"){h+='<p class="note">'+esc(b.tekst)+'</p>';i++;continue;}
    if(b.t==="li"){var l=[];while(i<s.length&&s[i].t==="li")l.push(s[i++].tekst);
      h+='<ul class="kunnen">'+l.map(function(x,n){var key=pad+"|"+si+"|"+x.slice(0,60),id="k"+si+"_"+i+"_"+n,af=!!K[key];
        return '<li'+(af?' class="af"':'')+'><input type="checkbox" id="'+id+'" data-k="'+esc(key)+'"'+(af?" checked":"")+'><label for="'+id+'">'+esc(x)+'</label></li>';}).join("")+'</ul>';continue;}
    if(b.t==="drive"||b.t==="link"){var f=[];while(i<s.length&&(s[i].t==="drive"||s[i].t==="link"))f.push(s[i++]);
      h+='<div class="files">'+f.map(function(x){
        if(x.t==="link"){var ls=linkSoort(x.href);return '<a class="file" href="'+esc(x.href)+'" target="_blank" rel="noopener"><span class="ic '+ls[0]+'">'+esc(ls[1].slice(0,3).toUpperCase())+'</span><span>'+esc(x.tekst)+'<small>'+esc(ls[1])+' · opent in nieuw tabblad</small></span></a>';}
        var e=ext(x.naam);return '<button class="file" data-drive="'+esc(x.id)+'" data-naam="'+esc(nette(x.naam))+'"><span class="ic '+e+'">'+ICON[e][0]+'</span><span>'+esc(nette(x.naam))+'<small>'+ICON[e][1]+'</small></span></button>';}).join("")+'</div>';continue;}
    if(b.t==="youtube"){var v=[];while(i<s.length&&s[i].t==="youtube")v.push(s[i++]);
      h+='<div class="vids">'+v.map(function(x){return '<div><div class="yt"><img src="https://i.ytimg.com/vi/'+esc(x.id)+'/hqdefault.jpg" alt="" loading="lazy"><button data-yt="'+esc(x.id)+'" aria-label="Speel film af: '+esc(x.naam||"YouTube")+'"><span></span></button></div>'+(x.naam?'<p class="ytcap">'+esc(x.naam.replace(/^Video,\s*/,""))+'</p>':'')+'</div>';}).join("")+'</div>';continue;}
    if(b.t==="p"){var nx=s[i+1];h+=(nx&&nx.t==="li"&&/:$/.test(b.tekst)?'<p class="kopkunnen">':'<p>')+esc(b.tekst)+'</p>';i++;continue;}
    i++;}
  return h;}

document.addEventListener("click",function(e){
  var d=e.target.closest("[data-drive]");if(d){var v=$("viewer");$("vtitel").textContent=d.dataset.naam;$("vframe").src="https://drive.google.com/file/d/"+d.dataset.drive+"/preview";$("vopen").href="https://drive.google.com/file/d/"+d.dataset.drive+"/view";v.showModal();return;}
  if(e.target.closest("#vdicht")||e.target.id==="viewer"){$("viewer").close();return;}
  var fm=e.target.closest("[data-film]");if(fm){fm.parentNode.innerHTML='<iframe src="https://drive.google.com/file/d/'+fm.dataset.film+'/preview" title="Film" allow="autoplay; fullscreen" allowfullscreen></iframe>';return;}
  var y=e.target.closest("[data-yt]");if(y){y.parentNode.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+y.dataset.yt+'?autoplay=1&rel=0" title="Film" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';}
});
document.addEventListener("close",function(e){if(e.target.id==="viewer")$("vframe").src="about:blank";},true);
document.addEventListener("change",function(e){var c=e.target.closest("[data-k]");if(!c)return;if(c.checked)K[c.dataset.k]=1;else delete K[c.dataset.k];c.closest("li").classList.toggle("af",c.checked);try{localStorage.setItem("gv-eco-kunnen",JSON.stringify(K));}catch(x){}});

fetch("data/paginas.json").then(function(r){return r.json();}).then(function(d){P=d;({index:index,jaar:jaar,hoofdstuk:hoofdstuk})[PAGE]();})
  .catch(function(){document.body.innerHTML='<main class="wrap"><p>De pagina kon niet laden. Probeer het opnieuw.</p></main>';});
})();
