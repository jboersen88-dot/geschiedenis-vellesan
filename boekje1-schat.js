/* Schat het eerst (boekje-1.html#cijfers). Alle getallen komen uit de lesstof (dia's H1–H4, app.html). */
(function(){
var host=document.getElementById("schat");if(!host)return;
var RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
function nl(n){return Math.round(n).toLocaleString("nl-NL");}
var HC={H1:"var(--coral)",H2:"#7fd4c9",H3:"#f2c46b",H4:"#b9d6cb"};

/* v = waarde, per = waarde per vakje, raak/dicht = [min,max] */
var Q=[
{k:"Draden per Spinning Jenny",h:"H1",tag:"Hoofdstuk 1 · ± 1765",q:"Een spinner spon thuis één draadje tegelijk. Met de Spinning Jenny soms hoeveel draden tegelijk?",ctx:"Gebruik de schuif: je schat een aantal draden.",
 min:1,max:20,step:1,start:1,truth:10,per:1,cells:20,cols:10,base:1,unit:" draden",raak:[9,11],dicht:[7,13],
 f:function(v){return nl(v)+(v==1?" draad":" draden");},d:function(v){return nl(v)+(v==1?" draad":" draden");},per_t:"1 vakje = 1 draad",
 why:"Met de Spinning Jenny spon één spinner soms wel 10 draden tegelijk. Dat gaf een gigantische toename van stof. De volgende stap was een betere krachtbron: het waterrad en later de stoommachine.",
 img:"h1-spinning-jenny",alt:"Een vrouw spint aan een Spinning Jenny, een houten machine met veel draden tegelijk",cr:"Beeld: J. Boersen (uit de dia's)",link:"app.html#H1",lt:"Hoofdstuk 1"},
{k:"Engelse bevolking in 1850",h:"H1",tag:"Hoofdstuk 1 · 1750 – 1850",q:"In 1750 woonden er 6 miljoen mensen in Engeland. Hoeveel waren het er in 1850?",ctx:"Het blauwgroene stuk is 1750. Schuif naar je schatting voor 1850.",
 min:6,max:30,step:1,start:6,truth:18,per:1,cells:30,cols:10,base:6,unit:" miljoen",raak:[17,19],dicht:[14,22],
 f:function(v){return nl(v)+" miljoen";},d:function(v){return nl(v)+" miljoen";},per_t:"1 vakje = 1 miljoen mensen",
 why:"De bevolking werd in honderd jaar drie keer zo groot: van 6 naar 18 miljoen. Niet doordat er veel meer kinderen werden geboren, maar doordat er minder mensen stierven. Meer en beter eten en betere hygiëne: de demografische revolutie.",
 img:"industriestad",alt:"Een Engelse industriestad vol rokende schoorstenen",cr:"AI-illustratie, gemaakt door de docent",link:"app.html#H1",lt:"Hoofdstuk 1"},
{k:"Werkloosheid in 1935",h:"H3",tag:"Hoofdstuk 3 · 1935",q:"In 1935, op het dieptepunt van de crisis: van elke 100 mensen die konden werken, hoeveel hadden geen werk?",ctx:"Elk vakje is één van de 100.",
 min:0,max:100,step:1,start:0,truth:25,per:1,cells:100,cols:10,base:0,unit:" van de 100",raak:[22,28],dicht:[15,35],
 f:function(v){return nl(v)+" van de 100";},d:function(v){return nl(v)+" van de 100";},per_t:"1 vakje = 1 van elke 100",
 why:"Zo'n 640.000 mensen waren werkloos: een kwart. Na de beurskrach van 1929 stortte de handel in. De invoer daalde van 2,75 naar 0,94 miljard gulden, de uitvoer van 1,99 naar 0,67 miljard. Geen vraag naar producten, dus nog meer werkloosheid.",
 img:"arbeidsbeurs",alt:"Een lange rij werklozen wacht bij het gemeentelijk arbeidsbureau",cr:"AI-illustratie, gemaakt door de docent",link:"app.html#H3",lt:"Hoofdstuk 3"},
{k:"Mensen zonder huis in 1945",h:"H4",tag:"Hoofdstuk 4 · mei 1945",q:"Nederland is bevrijd, maar er is veel schade. Hoeveel mensen hadden geen huis meer?",ctx:"Er woonden toen 9 miljoen mensen in Nederland.",
 min:0,max:1500000,step:50000,start:0,truth:500000,per:50000,cells:30,cols:10,base:0,unit:"",raak:[450000,600000],dicht:[300000,800000],
 f:function(v){return nl(v)+" mensen";},d:function(v){return nl(v)+" mensen";},tv:"meer dan 500.000 mensen",per_t:"1 vakje = 50.000 mensen",
 why:"Meer dan 500.000 mensen hadden geen huis meer. Daarnaast hadden 800.000 mensen alleen de kleren die ze aanhadden, en 250.000 Nederlanders overleefden de oorlog niet. Alles moest weer worden opgebouwd.",
 img:"oorlogseconomie",alt:"Verwoeste straten vol puin en rook na de oorlog",cr:"AI-illustratie, gemaakt door de docent",link:"app.html#H4",lt:"Hoofdstuk 4"},
{k:"Trekpaarden in 1970",h:"H4",tag:"Hoofdstuk 4 · 1950 – 1970",q:"In 1950 werkten er 265.000 trekpaarden op Nederlandse boerderijen. Hoeveel waren er twintig jaar later nog aan het werk?",ctx:"Schuif van 265.000 naar beneden tot je schatting.",
 min:0,max:265000,step:5000,start:265000,truth:0,per:5000,cells:53,cols:10,base:0,unit:"",raak:[0,5000],dicht:[0,40000],
 f:function(v){return nl(v)+" paarden";},d:function(v){return nl(v)+" paarden";},per_t:"1 vakje = 5.000 paarden",
 why:"Twintig jaar later waren ze allemaal vervangen door tractoren: mechanisatie. Tussen 1947 en 1960 verdween bijna de helft van de banen in de landbouw.",
 img:"tractor",alt:"Een rode tractor met een aanhanger vol graan op het land",cr:"Illustratie uit de dia's van J. Boersen",link:"app.html#H4",lt:"Hoofdstuk 4"},
{k:"Prijs van een tv in 1963",h:"H4",tag:"Hoofdstuk 4 · 1963",q:"Een televisie in 1963: hoeveel maandsalarissen van een vakman kostte hij?",ctx:"Elk vakje is één maandsalaris.",
 min:1,max:12,step:1,start:1,truth:2,per:1,cells:12,cols:6,base:0,unit:"",raak:[2,2],dicht:[1,3],
 f:function(v){return nl(v)+(v==1?" maandsalaris":" maandsalarissen");},d:function(v){return nl(v)+(v==1?" maandsalaris":" maandsalarissen");},per_t:"1 vakje = 1 maandsalaris",
 why:"Twee volle maandsalarissen! Daarom spaarden mensen er jaren voor: eerst sparen, dan pas kopen. Vanaf 1963 stegen de lonen snel en kon bijna iedereen meer luxe kopen.",
 img:"wederopbouw",alt:"Een gezin in de jaren zestig thuis in de kamer, met een televisie en een wasmachine",cr:"AI-illustratie, gemaakt door de docent",link:"app.html#H4",lt:"Hoofdstuk 4"}
];

var st={i:0,res:[],val:0,moved:false,done:false};
function inR(v,r){return v>=r[0]&&v<=r[1];}
function verdict(q,g){return inR(g,q.raak)?"raak":inR(g,q.dicht)?"dicht":"mis";}
function pct(q,v){return ((v-q.min)/(q.max-q.min))*100;}

function fieldHTML(q){var h="";for(var k=0;k<q.cells;k++)h+="<i></i>";return h;}
function paint(grid,q,v,truthOn){
  var cs=grid.children,n=Math.round(v/q.per),tn=Math.round(q.truth/q.per);
  for(var k=0;k<cs.length;k++){
    var c=cs[k],cls="";
    if(k<q.base&&q.start<q.truth)cls+=" b";
    if(k<n&&k>=(q.start<q.truth?q.base:0))cls+=" g";
    if(truthOn&&k<tn)cls+=" t";
    c.className=cls.trim();
    if(truthOn&&k<tn)c.style.setProperty("--dl",Math.min(22,520/Math.max(1,tn))*k+"ms");
  }
}

function render(){
  var q=Q[st.i],core=host;
  st.val=q.start;st.moved=false;st.done=false;
  core.className="sx-core";core.removeAttribute("aria-busy");
  core.innerHTML=
  '<div class="sx-l">'+
    '<div class="sx-top"><span class="sx-step">Vraag '+(st.i+1)+' van '+Q.length+'</span><span class="sx-pips" aria-hidden="true">'+Q.map(function(_,k){return '<i class="'+(k<st.i?st.res[k].v:(k==st.i?"now":""))+'"></i>';}).join("")+'</span></div>'+
    '<span class="sx-tag" style="--c:'+HC[q.h]+'">'+q.tag+'</span>'+
    '<h3 class="sx-q" id="sxq" tabindex="-1">'+q.q+'</h3><p class="sx-ctx">'+q.ctx+'</p>'+
    '<div class="sx-read" id="sxread"><small>Jouw schatting</small><span id="sxn"></span></div>'+
    '<div class="sx-sl"><input class="sx-range" id="sxr" type="range" min="'+q.min+'" max="'+q.max+'" step="'+q.step+'" value="'+q.start+'" aria-labelledby="sxq"><div class="sx-ends" aria-hidden="true"><span>'+nl(q.min)+'</span><span>'+nl(q.max)+'</span></div></div>'+
    '<button class="sx-btn" id="sxb" type="button" disabled><span id="sxbt">Schuif eerst naar je schatting</span><span class="ar" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h12M10 4l5 5-5 5"/></svg></span></button>'+
    '<div class="sx-res" id="sxres" role="status" aria-live="polite"></div>'+
  '</div>'+
  '<div class="sx-r"><div class="sx-field"><div class="sx-grid" id="sxg" style="--cols:'+q.cols+'" aria-hidden="true">'+fieldHTML(q)+'</div>'+
    '<div class="sx-key" aria-hidden="true"><span><i class="g"></i>jouw schatting</span><span><i class="t"></i>zo was het</span>'+(q.base&&q.start<q.truth?'<span><i></i>beginsituatie</span>':'')+'</div><div class="sx-per">'+q.per_t+'</div></div>'+
    '<figure class="sx-pic" id="sxp"><img src="img/tijdlijn/'+q.img+'.jpg" alt="'+q.alt+'" width="900" height="675"><figcaption>'+q.cr+'</figcaption></figure></div>';
  var rng=document.getElementById("sxr"),n=document.getElementById("sxn"),b=document.getElementById("sxb"),g=document.getElementById("sxg");
  function show(){
    var v=+rng.value;st.val=v;
    n.textContent=q.f(v);
    rng.style.setProperty("--p",pct(q,v)+"%");
    rng.setAttribute("aria-valuetext",q.f(v));
    paint(g,q,v,false);
  }
  rng.addEventListener("input",function(){
    if(!st.moved){st.moved=true;b.disabled=false;b.classList.add("go");document.getElementById("sxbt").textContent="Dit is mijn schatting";}
    show();
  });
  rng.addEventListener("keydown",function(e){if(e.key==="Enter"&&st.moved&&!st.done){e.preventDefault();check();}});
  b.addEventListener("click",function(){if(!st.done)check();else next();});
  show();
  if(!RM){core.classList.add("enter");}
}

function check(){
  var q=Q[st.i],g=st.val,v=verdict(q,g),dif=g-q.truth,ab=Math.abs(dif);
  st.done=true;st.res[st.i]={v:v,g:g};
  var rng=document.getElementById("sxr"),b=document.getElementById("sxb"),res=document.getElementById("sxres"),rd=document.getElementById("sxread"),n=document.getElementById("sxn");
  rng.disabled=true;b.focus({preventScroll:true}); /* de schuif wordt uitgezet: focus naar de knop, anders raakt een toetsenbordgebruiker de plek kwijt */
  var lab={raak:"Raak!",dicht:"Dichtbij",mis:"Ernaast"}[v];
  var cmp=v==="raak"&&ab===0?"Precies goed: "+(q.tv||q.f(q.truth))+".":
    "Je schatte "+q.f(g)+". Het was "+(q.tv||q.f(q.truth))+(ab===0?".":". Je zat "+q.d(ab)+" te "+(dif>0?"hoog":"laag")+".");
  if(v==="raak"&&(ab>0||q.tv))cmp="Goed geschat! Je schatte "+q.f(g)+"; het was "+(q.tv||q.f(q.truth))+".";
  res.innerHTML='<span class="sx-verd '+v+'">'+lab+'</span><p class="cmp">'+cmp+'</p><p class="why">'+q.why+' <a href="'+q.link+'">Meer in '+q.lt.toLowerCase()+'</a></p>';
  requestAnimationFrame(function(){res.classList.add("show");res.scrollIntoView({block:"nearest",behavior:RM?"auto":"smooth"});});
  rd.classList.add("done");rd.querySelector("small").textContent="Zo was het";
  tween(n,g,q.truth,q);
  var grid=document.getElementById("sxg");grid.classList.add("done");paint(grid,q,g,true);
  document.getElementById("sxp").classList.add("done");
  var pip=host.querySelectorAll(".sx-pips i")[st.i];if(pip){pip.className=v;}
  document.getElementById("sxbt").textContent=st.i<Q.length-1?"Volgende vraag":"Bekijk je score";
  b.classList.remove("go");
}
function tween(n,from,to,q){
  function fin(){n.textContent=q.f(to);}
  if(RM||from===to)return fin();
  var t0=null,D=800;
  function step(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,4);n.textContent=q.f(from+(to-from)*e);if(k<1)requestAnimationFrame(step);else fin();}
  requestAnimationFrame(step);
}

function next(){
  if(st.i<Q.length-1){st.i++;render();var h=document.getElementById("sxq");if(h)h.focus({preventScroll:true});}
  else finale();
}

function finale(){
  var core=host,pts=0,worst=0,wi=0;
  st.res.forEach(function(r,k){var q=Q[k];pts+=r.v==="raak"?2:r.v==="dicht"?1:0;var e=Math.abs(r.g-q.truth)/(q.max-q.min);if(e>worst){worst=e;wi=k;}});
  var head=pts>=10?"Je hebt een goed gevoel voor de grote lijnen.":pts>=6?"Niet slecht. Een paar getallen blijven nu hopelijk hangen.":"Verrassend, hè? Juist dat maakt dat je deze getallen nu onthoudt.";
  var W=Q[wi],sur=worst>0?"Je grootste verrassing: "+W.k.toLowerCase()+". Jij schatte "+W.f(st.res[wi].g)+", maar het was "+(W.tv||W.f(W.truth))+".":"Alles precies goed geschat.";
  core.className="sx-core";
  core.innerHTML='<div class="sx-end"><div><div class="sx-score" aria-label="Score: '+pts+' van '+(Q.length*2)+' punten">'+pts+'<small>van '+(Q.length*2)+' punten</small></div><h3 id="sxq" tabindex="-1">'+head+'</h3><p>'+sur+'</p><div class="row"><button class="sx-btn go" id="sxagain" type="button"><span>Probeer opnieuw</span><span class="ar" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 9a6 6 0 1 1-2-4.5M15 2v3.5h-3.5"/></svg></span></button><a class="sx-btn ghost" href="#tijdlijn" style="text-decoration:none"><span>Zie alles op de tijdlijn</span><span class="ar" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v12M4 10l5 5 5-5"/></svg></span></a></div></div>'+
  '<ol class="sx-list">'+Q.map(function(q,k){var r=st.res[k];return '<li><span class="v '+r.v+'"></span><b>'+q.k+': '+(q.tv||q.f(q.truth))+'</b><span>Jij: '+q.f(r.g)+' · '+q.tag.replace(/ · .*/,"")+'</span></li>';}).join("")+'</ol></div>';
  if(!RM)core.classList.add("enter");
  document.getElementById("sxagain").addEventListener("click",function(){st.i=0;st.res=[];render();document.getElementById("sxq").focus({preventScroll:true});});
  document.getElementById("sxq").focus({preventScroll:true});
}

/* alle getallen als gewone tekst, voor wie niet wil schuiven (en voor schermlezers) */
document.getElementById("sxfacts").innerHTML=Q.map(function(q){return "<dt>"+(q.tv||q.f(q.truth))+"</dt><dd>"+q.q+" "+q.why+"</dd>";}).join("");

render();
})();
