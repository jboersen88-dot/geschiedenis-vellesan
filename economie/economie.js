/* Economie · bouwt index.html, jaar.html en h.html op uit data/paginas.json
   (alle pagina's die in het menu van meneerboersen.nl staan, opgehaald met crawl.py; zie changelog.md). */
(function(){
var JAREN=[
  {id:"jaar-2",titel:"Jaar 2 mavo",pre:"jaar-2/mavo/",img:"geld",intro:"Geld, kopen, werken, produceren, de markt en de overheid: de basis van economie."},
  {id:"jaar-3",titel:"Jaar 3 mavo",pre:"jaar-3/mavo/",img:"welvaart",intro:"Welvaart, consumeren, bankieren, verzekeren, productie, de overheid en de wereld."},
  {id:"jaar-4",titel:"Jaar 4 mavo",pre:"jaar-4/",img:"wereldhandel",intro:"Inkomen, geld, winst, werk, de overheid, handel en ontwikkeling: op weg naar het eindexamen."}];
var THEMA={"jaar-2/mavo/hoofdstuk-0-rekenvaardigheden":"rekenen","jaar-2/mavo/hoofdstuk-1":"consument","jaar-2/mavo/kopie-van-hoofdstuk-1":"consument","jaar-2/mavo/hoofdstuk-2":"geld","jaar-2/mavo/hoofdstuk-3-aan-het-werk":"werk","jaar-2/mavo/hoofdstuk-4":"productie","jaar-2/mavo/hoofdstuk-5":"markt","jaar-2/mavo/hoofdstuk-6":"overheid","jaar-2/mavo/proefwerkweek-rekenvaardigheden-eindtoets":"toets",
  "jaar-3/mavo/hoofdstuk-0-rekenvaardigheden":"rekenen","jaar-3/mavo/hoofdstuk-1-hoe-groot-is-jouw-welvaart":"welvaart","jaar-3/mavo/hoofdstuk-2-wat-voor-consument-ben-jij":"consument","jaar-3/mavo/hoofdstuk-3-de-bank-en-jouw-geld":"bank","jaar-3/mavo/hoofdstuk-4-ben-je-verzekerd":"verzekeren","jaar-3/mavo/se-1":"toets","jaar-3/mavo/hoofdstuk-5-werkt-dat-zo":"werk","jaar-3/mavo/hoofdstuk-6-productie-en-markt":"productie","jaar-3/mavo/se-3-h5-h6":"toets","jaar-3/mavo/hoofdstuk-7-de-overheid-voor-ons-allemaal":"overheid","jaar-3/mavo/hoofdstuk-8-over-economische-grenzen":"wereldhandel","jaar-3/mavo/se4-h7-h8":"toets",
  "jaar-4/hoofdstuk-0-rekenvaardigheden":"rekenen","jaar-4/hoofdstuk-1-verdien-je-genoeg":"inkomen","jaar-4/hoofdstuk-2-geld-moet-rollen":"geld","jaar-4/se-h1-h2-h8":"toets","jaar-4/hoofdstuk-3":"winst","jaar-4/hoofdstuk-4-aan-het-werk":"werk","jaar-4/hoofdstuk-5-kan-de-overheid-dat-regelen":"overheid","jaar-4/hoofdstuk-6-de-overheid-en-ons-inkomen":"inkomen","jaar-4/se-h5-en-h6":"toets","jaar-4/hoofdstuk-7":"wereldhandel","jaar-4/hoofdstuk-8":"welvaart","jaar-4/se4":"toets","jaar-4/se6":"toets","jaar-4/eindexamen":"toets"};
/* pagina's waar op meneerboersen.nl een eigen lesapp in staat (kopie in apps/) */
var APPS={"jaar-2/mavo/hoofdstuk-1":[["Lesapp","jaar-2_mavo_hoofdstuk-1.html"]],"jaar-2/mavo/hoofdstuk-2":[["Lesapp","jaar-2_mavo_hoofdstuk-2.html"]],"jaar-2/mavo/hoofdstuk-3-aan-het-werk":[["Lesapp","jaar-2_mavo_hoofdstuk-3-aan-het-werk.html"]],"jaar-2/mavo/hoofdstuk-4":[["Lesapp","jaar-2_mavo_hoofdstuk-4.html"]],
  "jaar-4/hoofdstuk-1-verdien-je-genoeg":[["Lesapp","jaar-4_hoofdstuk-1-verdien-je-genoeg.html"]],"jaar-4/hoofdstuk-2-geld-moet-rollen":[["Lesapp","jaar-4_hoofdstuk-2-geld-moet-rollen.html"]],"jaar-4/se-h1-h2-h8":[["SE3-app","jaar-4_se-h1-h2-h8.html"],["EDU-Racer","jaar-4_se-h1-h2-h8_1.html"]],"jaar-4/hoofdstuk-3":[["Lesapp","jaar-4_hoofdstuk-3.html"]]};
var NAAM={"jaar-2/mavo/kopie-van-hoofdstuk-1":"Hoofdstuk 1 · lesstof en PowerPoints"};

var esc=function(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});};
var $=function(id){return document.getElementById(id);};
var PAGE=document.body.dataset.page,Q=new URLSearchParams(location.search),P=[];
function titel(p){return NAAM[p.pad]||p.titel.replace(/\s+/g," ").trim();}
function jaarVan(pad){return JAREN.filter(function(j){return pad.indexOf(j.pre)===0;})[0];}
function hoofdstukken(j){return P.filter(function(p){return p.pad.indexOf(j.pre)===0&&p.pad!==j.pre.replace(/\/$/,"");});}
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
  h+='<div class="grid big">'+JAREN.map(function(j,i){var n=hoofdstukken(j).length;return '<a class="tile rv" style="--i:'+i+'" href="jaar.html?j='+j.id+'"><div class="ph"><img src="img/'+j.img+'.jpg" alt="" loading="lazy"></div><div class="tx"><div class="k">'+n+' onderdelen</div><h2>'+esc(j.titel)+'</h2><p class="meta">'+esc(j.intro)+'</p></div></a>';}).join("")+'</div>';
  h+='<p style="margin-top:26px"><a class="btn ghost" href="../index.html">Naar Geschiedenis</a></p></main>'+voet();
  document.body.innerHTML=h;}

/* ---------- jaar ---------- */
function jaar(){
  var j=JAREN.filter(function(x){return x.id===Q.get("j");})[0]||JAREN[1],L=hoofdstukken(j);
  document.title=j.titel+" · Economie";
  var h=top(' / '+esc(j.titel))+'<main class="wrap"><section class="hero"><img src="img/'+j.img+'.jpg" alt="" fetchpriority="high"><div class="in"><div class="eyebrow">Economie</div><h1>'+esc(j.titel)+'</h1><p>'+esc(j.intro)+'</p></div></section><div class="grid">';
  h+=L.map(function(p,i){var t=titel(p),m=/^(Hoofdstuk\s*\d+|SE\s*\d*|Proefwerkweek)\s*[:\-]?\s*(.*)$/i.exec(t),k=m?m[1]:"",n=m&&m[2]?m[2].replace(/^\((.*)\)$/,"$1"):t;
    if(n===t&&isSE(p.pad))k="Toetsvoorbereiding";
    return '<a class="tile rv'+(isSE(p.pad)?" se":"")+'" style="--i:'+i+'" href="h.html?p='+encodeURIComponent(p.pad)+'"><div class="ph"><img src="img/'+(THEMA[p.pad]||j.img)+'.jpg" alt="" loading="lazy"></div><div class="tx"><div class="k">'+esc(k||(isSE(p.pad)?"Toetsvoorbereiding":"Onderdeel"))+'</div><h3>'+esc(n.charAt(0).toUpperCase()+n.slice(1))+'</h3><div class="meta">'+esc(telling(p))+'</div></div></a>';}).join("");
  document.body.innerHTML=h+'</div></main>'+voet();}

/* ---------- hoofdstuk ---------- */
var K;try{K=JSON.parse(localStorage.getItem("gv-eco-kunnen"))||{};}catch(e){K={};}
function hoofdstuk(){
  var p=P.filter(function(x){return x.pad===Q.get("p");})[0];if(!p){location.href="index.html";return;}
  var j=jaarVan(p.pad),t=titel(p);document.title=t+" · Economie "+(j?j.titel:"");
  var secs=p.secties.filter(function(s){return !s.every(function(b){return b.t==="kop"||(b.t==="p"&&b.tekst.length<3);});});
  if(secs.length&&secs[0].every(function(b){return b.t==="kop";}))secs.shift();
  var chips=[],body="";
  secs=groepeer(secs);
  secs.forEach(function(s,si){var id="s"+si,eerste=s.filter(function(b){return b.t==="kop"&&echteKop(b.tekst);})[0];
    if(eerste&&PARKOP.test(eerste.tekst))chips.push('<a href="#'+id+'">'+esc(kort(eerste.tekst.replace(/:$/,""),34))+'</a>');
    else if(si===0)chips.push('<a href="#'+id+'">Start</a>');
    body+='<section class="sec rv" style="--i:'+Math.min(si,8)+'" id="'+id+'">'+sectie(s,p.pad,si)+'</section>';});
  var apps=(APPS[p.pad]||[]).map(function(a){return '<section class="sec"><h2>'+esc(a[0])+'</h2><iframe class="app" src="apps/'+a[1]+'" title="'+esc(a[0]+" "+t)+'" loading="lazy"></iframe><p><a class="btn ghost" href="apps/'+a[1]+'" target="_blank" rel="noopener">Open op volledig scherm</a></p></section>';}).join("");
  var h=top(' / <a href="jaar.html?j='+j.id+'">'+esc(j.titel)+'</a> / '+esc(t))+'<main class="wrap"><section class="hero"><img src="img/'+(THEMA[p.pad]||j.img)+'.jpg" alt="" fetchpriority="high"><div class="in"><div class="eyebrow">Economie · '+esc(j.titel)+'</div><h1>'+esc(t)+'</h1><p>'+esc(telling(p))+'</p></div></section>';
  if(chips.length>1)h+='<nav class="chips" aria-label="Onderdelen van deze pagina">'+chips.join("")+'</nav>';
  h+=apps+body+'<p><a class="btn ghost" href="jaar.html?j='+j.id+'">← Alle onderdelen van '+esc(j.titel)+'</a></p></main>'+voet();
  h+='<dialog class="viewer" id="viewer" aria-label="Bestand bekijken"><div class="bar"><b id="vtitel"></b><a class="btn ghost" id="vopen" target="_blank" rel="noopener">Open in Drive</a><button class="btn" id="vdicht">Sluiten</button></div><iframe id="vframe" title="Bestand" allow="autoplay; fullscreen"></iframe></dialog>';
  document.body.innerHTML=h;}
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
