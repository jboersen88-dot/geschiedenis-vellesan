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
/* hoofdstukken met een eigen pagina op volle breedte (opzet van Geschiedenis boekje 1); vereist een lesapp (APPS) en oefentoetsen (TOETSEN).
   Teksten en aantallen komen uit de lesapp van het hoofdstuk. img = AI-illustraties van de docent in img/<map>/, de eerste staat op de kaart;
   q = kernvragen; c = kleur op de kaart, k = kleur op de lichte band. */
var RIJK={"jaar-2/mavo/hoofdstuk-2":{map:"j2h2",kop:["Jij en je ","geld"],hero:"begroting",
  alt:"Een vrouw maakt 's avonds aan een bureau een jaarbegroting, met rekenmachine, bonnetjes en een laptop met bankapp",
  intro:"Inkomsten en uitgaven, sparen, lenen en verzekeren: vier paragrafen om slim met je geld om te gaan.",
  par:[
   {id:"2.1",t:"Jouw inkomen en uitgaven",c:"var(--coral)",k:"var(--berry)",sum:"Soorten inkomen, drie groepen uitgaven, van week naar maand rekenen en een begroting maken.",tags:["12 begrippen","3 filmpjes","Quiz"],
    q:["Welke drie soorten inkomen zijn er?","Wat is het verschil tussen loon en winst?","Wat is een uitkering en wie geeft die?","Welke drie groepen uitgaven zijn er?"],
    img:[["maandlasten","Vaste lasten en rekeningen op een rij"],["begroting","Een begroting maken voor het hele jaar"],["boodschappen","Uitgaven aan de dagelijkse boodschappen"]]},
   {id:"2.2",t:"Met geld kun je meer",c:"#7fd4c9",k:"var(--teal)",sum:"De drie geldfuncties, waarom je spaart, wat rente is en hoe je de rente op je spaarrekening berekent.",tags:["9 begrippen","3 filmpjes","Quiz"],
    q:["Welke drie functies heeft geld?","Waarom sparen mensen geld? Noem drie redenen en leg deze uit.","Waarom krijg je rente van de bank?","Hoe bereken je de rente over een spaarsaldo in procenten?"],
    img:[["bankapp","Je spaargeld bijhouden in de bankapp"],["sparen","Sparen voor iets wat je graag wilt kopen"]]},
   {id:"2.3",t:"Geld te kort?",c:"#f2c46b",k:"var(--ochre)",sum:"Waarom mensen lenen, lenen bij de bank, de maandtermijn, de kosten van een lening en percentages berekenen.",tags:["6 begrippen","2 filmpjes","Quiz"],
    q:["Waarom lenen mensen geld? Noem twee redenen.","Wat moet je altijd bedenken vóórdat je geld leent?","Wat is aflossing bij een lening?","Wat is de maandtermijn bij een lening?"],
    img:[["lenen-vergelijken","Geleend bedrag tegenover de totale terugbetaling, met rente"],["lening","Een lening: elke maand aflossing plus rente"]]},
   {id:"2.4",t:"Voor alle zekerheid",c:"#b9d6cb",k:"var(--green)",sum:"Waarom je je verzekert, verplichte en vrijwillige verzekeringen, premie, polis en eigen risico.",tags:["10 begrippen","Quiz"],
    q:["Wat betekent het om je te verzekeren?","Waarom sluiten mensen verzekeringen af?","Wat betekent risico bij verzekeren?","Welke verzekeringen zijn verplicht in Nederland?"],
    img:[["verzekeringspapieren","De papieren van je verzekeringen"],["polis-tekenen","Een verzekering afsluiten"],["schade-uitkering","Schade vergoed: het eigen risico gaat eraf"],["fiets-op-slot","Je fiets op slot, tegen diefstal"]]}]}};
var TOETSEN={"jaar-2/mavo/hoofdstuk-2":[["Hoofdstuk 2 · Jij en je geld (§2.1 en §2.2)","h2"]]};
function toetsen(pad){var T=TOETSEN[pad];if(!T)return "";
  return '<section class="rblk" id="oefentoetsen" style="padding-top:0"><div class="wrap"><div class="rfeat io"><div><div class="eyebrow">Oefentoetsen</div><h2>Test jezelf met een oefentoets.</h2><p>Kies een variant (1, 2 of 3 sterren), download het Word-bestand en vul het in op je iPad of laptop: tik op een blauw vak en typ je antwoord.</p></div><div>'+T.map(function(g){return '<h3>'+esc(g[0])+'</h3><div class="files">'+[1,2,3].map(function(n){var u="oefentoetsen/oefentoets-"+g[1]+"-"+n+"-ster.docx";return '<a class="file" href="'+u+'" download="Oefentoets '+g[1].toUpperCase()+' '+n+'-ster.docx"><span class="ic doc">'+"★".repeat(n)+'</span><span>'+n+'-ster oefentoets<small>Word-bestand · download en vul in op je iPad of laptop</small></span></a>';}).join("")+'</div>';}).join("")+'</div></div></div></section>';}
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
  var app=APPS[p.pad][0],bn=jaarUrl(j,n),t=titel(p),src=function(f){return "img/"+c.map+"/"+f+".jpg";},ar=function(x){return "par-"+x.id.replace(".","-");},
  golf=function(m){return '<svg class="rwave'+m+'" viewBox="0 0 1200 70" preserveAspectRatio="none" aria-hidden="true"><path d="M0,36 C200,70 400,4 600,30 C800,56 1000,12 1200,40 L1200,70 L0,70 Z"/></svg>';},
  kaart=function(x,i){return '<a class="rchap io" style="--c:'+x.c+';--d:'+i+'" href="#'+ar(x)+'"><img src="'+src(x.img[0][0])+'" alt="" loading="lazy"><span class="glare"></span><span class="num">'+x.id+'</span><div class="body"><span class="tag">Paragraaf '+x.id+'</span><h3>'+esc(x.t)+'</h3><p>'+esc(x.sum)+'</p><div class="links">'+x.tags.map(function(g){return '<span>'+esc(g)+'</span>';}).join("")+'</div></div></a>';},
  /* de laatste band heeft de gewone achtergrond: de golf eronder loopt daar naadloos in */
  band=function(x,i){return '<section class="rpar'+((c.par.length-1-i)%2?" alt":"")+(i%2?" flip":"")+'" id="'+ar(x)+'" style="--k:'+x.k+'"><div class="wrap rpar-in"><div class="io"><div class="rnum">'+x.id+'</div><div class="eyebrow">Paragraaf '+x.id+'</div><h2>'+esc(x.t)+'</h2><p class="rpar-sum">'+esc(x.sum)+'</p><div class="rqh">Kun jij dit beantwoorden?</div><ul class="rq">'+x.q.map(function(q){return '<li>'+esc(q)+'</li>';}).join("")+'</ul><div class="rtags">'+x.tags.map(function(g){return '<span>'+esc(g)+'</span>';}).join("")+'</div><a class="rbtn primary" href="#lesapp">Oefen in de lesapp <span class="arr">→</span></a></div><div class="rgal n'+x.img.length+' io" style="--d:1">'+x.img.map(function(b){return '<a href="'+src(b[0])+'" target="_blank" rel="noopener"><img src="'+src(b[0])+'" alt="" loading="lazy"><span>'+esc(b[1])+'</span></a>';}).join("")+'</div></div></section>';};
  document.title=c.kop.join("")+" · Economie "+naam(j,n);
  document.body.className="rijk";
  document.body.innerHTML='<header class="rnav" id="rnav"><div class="wrap"><a class="brand" href="../index.html" aria-label="Meneer Boersen, naar de homepage"><b class="bfull">Meneer <span>Boersen</span></b><b class="bshort" aria-hidden="true">M<span>B</span></b></a><nav class="rlinks" aria-label="Menu"><a href="index.html">Economie</a><a href="'+bn+'">'+esc(j.titel)+'</a><a class="cta" href="#lesapp">Lesapp</a></nav></div></header>'
  +'<section class="rhero"><div class="rhero-img" id="rimg" style="background-image:url('+src(c.hero)+')" role="img" aria-label="'+esc(c.alt)+'"></div><div class="wrap rhero-in"><div class="eyebrow rv" style="--i:0;color:var(--coral)">Economie · '+esc(naam(j,n))+' · '+esc(t.toLowerCase())+'</div><h1 class="rv" style="--i:1">'+esc(c.kop[0])+'<em>'+esc(c.kop[1])+'</em></h1><p class="rv" style="--i:2">'+esc(c.intro)+'</p><div class="rbtns rv" style="--i:3"><a class="rbtn primary" href="#lesapp">Start de lesapp <span class="arr">→</span></a><a class="rbtn ghost" href="#oefentoetsen">Maak een oefentoets</a></div></div><div class="rscroll" aria-hidden="true"></div></section>'
  +'<section class="rblk" id="paragrafen"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">'+esc(t)+' · '+esc(c.kop.join(""))+'</div><h2>Vier paragrafen over jouw geld.</h2></div><p>In de lesapp staan de begrippen, filmpjes, oefenvragen en leerdoelen van alle vier.</p></div><div class="rchaps">'+c.par.map(kaart).join("")+'</div></div></section>'
  +c.par.map(band).join("")
  +golf(" top")+'<section class="rblk rapp" id="lesapp"><div class="wrap"><div class="rhead io"><div><div class="eyebrow">Lesapp</div><h2>Leer, oefen en test jezelf.</h2></div><p>Lesstof, oefenlab, oefentoetsen en filmpjes van '+esc(t.toLowerCase())+' in één app. Je voortgang wordt op dit apparaat bewaard.</p></div><div class="rframe io"><iframe src="apps/'+app[1]+'" title="'+esc(app[0]+" "+t)+'" loading="lazy"></iframe></div><div class="rbtns"><a class="rbtn ghost" href="apps/'+app[1]+'" target="_blank" rel="noopener">Open op volledig scherm</a></div></div></section>'+golf("")
  +toetsen(p.pad)
  +'<section class="rblk rend"><div class="wrap"><div class="eyebrow" style="color:var(--coral)">Klaar met dit hoofdstuk?</div><h2>Verder met Economie.</h2><p>Kies een ander hoofdstuk van '+esc(j.titel.toLowerCase()+" "+n.titel.toLowerCase())+' of ga terug naar het overzicht.</p><div class="rbtns"><a class="rbtn primary" href="'+bn+'">Alle hoofdstukken <span class="arr">→</span></a><a class="rbtn ghost" href="index.html">Ander jaar</a></div></div></section>'
  +'<footer class="rfoot"><div class="wrap"><span>Meneer Boersen · Vellesan College · Economie '+esc(j.titel.toLowerCase()+" "+n.titel.toLowerCase())+'</span><span>Beelden: AI-illustraties, gemaakt door de docent</span></div></footer>';
  var RM=matchMedia("(prefers-reduced-motion: reduce)").matches,nav=$("rnav"),img=$("rimg");
  function onScroll(){nav.classList.toggle("solid",scrollY>40);if(!RM&&scrollY<1200)img.style.setProperty("--py",scrollY*.28+"px");}
  addEventListener("scroll",onScroll,{passive:true});onScroll();
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:.18,rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".io").forEach(function(el){io.observe(el);});
  /* tilt op de paragraafkaarten (alleen met muis) */
  if(!RM&&matchMedia("(hover:hover) and (pointer:fine)").matches)document.querySelectorAll(".rchap").forEach(function(k){
    k.addEventListener("pointermove",function(e){var r=k.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;k.classList.add("tilting");k.style.setProperty("--ry",((x-.5)*7)+"deg");k.style.setProperty("--rx",((.5-y)*6)+"deg");k.style.setProperty("--gx",(x*100)+"%");k.style.setProperty("--gy",(y*100)+"%");});
    k.addEventListener("pointerleave",function(){k.classList.remove("tilting");k.style.setProperty("--ry","0deg");k.style.setProperty("--rx","0deg");});});}

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
  var y=e.target.closest("[data-yt]");if(y){y.parentNode.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+y.dataset.yt+'?autoplay=1&rel=0" title="Film" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';}
});
document.addEventListener("close",function(e){if(e.target.id==="viewer")$("vframe").src="about:blank";},true);
document.addEventListener("change",function(e){var c=e.target.closest("[data-k]");if(!c)return;if(c.checked)K[c.dataset.k]=1;else delete K[c.dataset.k];c.closest("li").classList.toggle("af",c.checked);try{localStorage.setItem("gv-eco-kunnen",JSON.stringify(K));}catch(x){}});

fetch("data/paginas.json").then(function(r){return r.json();}).then(function(d){P=d;({index:index,jaar:jaar,hoofdstuk:hoofdstuk})[PAGE]();})
  .catch(function(){document.body.innerHTML='<main class="wrap"><p>De pagina kon niet laden. Probeer het opnieuw.</p></main>';});
})();
