function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(a){return a[Math.floor(Math.random()*a.length)];}
function r(x,d){var m=Math.pow(10,d);return Math.round((x+(x>=0?1:-1)*1e-9)*m)/m;}
var nf2=new Intl.NumberFormat("nl-NL",{minimumFractionDigits:2,maximumFractionDigits:2});
var nf1=new Intl.NumberFormat("nl-NL",{minimumFractionDigits:1,maximumFractionDigits:1});
function eur(x){return (x<0?"−€":"€")+nf2.format(Math.abs(x));}
function pc(x){return (x<0?"−":"")+nf1.format(Math.abs(x))+"%";}
function num(x){return new Intl.NumberFormat("nl-NL",{maximumFractionDigits:4}).format(x);}
function i1(x){return nf1.format(x);}
var SUP={2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸"};
function parse(s,d){s=String(s).trim().replace(/[€%\s]/g,"").replace(/[−–]/g,"-");if(!s)return NaN;
if(s.indexOf(",")>-1){s=s.replace(/\./g,"").replace(",",".");}
else if((s.match(/\./g)||[]).length>1||(d===0&&/^-?\d{1,3}(\.\d{3})+$/.test(s))){s=s.replace(/\./g,"");}
return parseFloat(s);}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function verdict(v,a,dec,abs){if(isNaN(v))return null;if(abs){v=Math.abs(v);a=Math.abs(a);}
var tol=dec===2?0.0051:dec===1?0.051:0.51;if(Math.abs(v-a)<=tol)return "ok";
if(!abs&&a!==0&&Math.abs(Math.abs(v)-Math.abs(a))<=tol)return "sign";
if(Math.abs(v-a)<=Math.max(Math.abs(a)*0.01,dec===2?0.02:0.2))return "mid";return "no";}
function vmsg(res){return res==="ok"?"✓ Helemaal goed!":res==="sign"?"Bijna! Let op het teken: is het een stijging (+) of een daling (−)?":res==="mid"?"Bijna! Controleer je afronding.":"✗ Helaas, dat klopt niet.";}
function answerRow(id,u){return '<div class="row" style="margin-top:12px"><div class="inp">'+(u==="€"?"<b>€</b>":"")+'<input id="'+id+'In" inputmode="decimal" autocomplete="off" placeholder="je antwoord">'+(u==="%"?"<b>%</b>":"")+'</div><button class="btn" id="'+id+'Check">Controleer</button></div><div id="'+id+'Fb"></div>';}
function money(a,b){return rnd(a*100,b*100)/100;}
function stmt(rows,cls){return '<table class="statement'+(cls?" "+cls:"")+'">'+rows.map(function(x){return '<tr'+(x[x.length-1]===1?' class="ask"':'')+'>'+x.filter(function(c){return c!==1;}).map(function(c){return '<td>'+c+'</td>';}).join("")+'</tr>';}).join("")+'</table>';}
function qp(t){return '<p class="qq">'+t+'</p>';}

var FORM={
pct:"(nieuw − oud) : oud × 100",
index:"nieuw getal : getal basisjaar × 100",
terug:"prijs : indexcijfer × 100",
vooruit:"prijs basisjaar × indexcijfer : 100",
reeel:"nominale stijging % − inflatie %",
enkel:"rente% : 100 × bedrag × aantal jaren",
samen:"bedrag × groeifactor ^ aantal jaren",
krediet:"termijn × aantal termijnen − krediet",
reserve:"benodigd bedrag : aantal maanden",
maand:"weekbedrag × 52 : 12",
week:"maandbedrag × 12 : 52",
saldo:"oud saldo + ontvangsten − betalingen",
bbp:"BBP : aantal inwoners"
};

var MODES=[["pct","Procent verandering"],["index","Indexcijfer"],["terug","Rekenen met index"],["koop","Koopkracht"],["cpi","CPI (gewogen)"],["bbp","BBP per inwoner"],["enkel","Enkelvoudige rente"],["samen","Samengestelde rente"],["krediet","Kredietkosten"],["maand","Week ↔ maand"],["reserve","Reserveren"],["saldo","Saldo"]];
var RGEN={
pct:function(){var v=pick([
function(){var o=pick([5,6,7.5,8,10,12.5]),n=r(o+pick([0.5,1,1.5,2,2.5]),2);return ["Vorig jaar kreeg je "+eur(o)+" zakgeld per week. Nu krijg je "+eur(n)+".",o,n,"Met hoeveel procent is je zakgeld gestegen?"];},
function(){var o=rnd(780,960),n=o+rnd(15,70);return ["Vorig schooljaar zaten er "+o+" leerlingen op school. Dit schooljaar zijn het er "+n+".",o,n,"Met hoeveel procent is het aantal leerlingen gestegen?"];},
function(){var o=rnd(145,175)/100,n=r(o+rnd(6,25)/100,2);return ["Een liter benzine kostte vorig jaar "+eur(o)+". Nu kost een liter "+eur(n)+".",o,n,"Met hoeveel procent is de prijs gestegen?"];},
function(){var o=rnd(65,98)*10,n=o-rnd(3,14)*10;return ["Een tweedehands scooter was vorig jaar "+eur(o)+" waard. Nu is hij "+eur(n)+" waard.",o,n,"Met hoeveel procent is de waarde gedaald?"];},
function(){var o=rnd(72,89)*10,n=o+rnd(2,6)*5;return ["De huur van een studio ging van "+eur(o)+" naar "+eur(n)+" per maand.",o,n,"Met hoeveel procent is de huur gestegen?"];},
function(){var o=rnd(2100,2600),n=o+rnd(40,140);return ["Het brutoloon van Fatima ging van "+eur(o)+" naar "+eur(n)+" per maand.",o,n,"Met hoeveel procent is haar loon gestegen?"];}
])();var a=r((v[2]-v[1])/v[1]*100,1);
return{f:"pct",h:v[3]+" (1 decimaal)",body:qp(v[0]),a:a,d:1,u:"%",abs:a<0,calc:"Procentuele verandering = (nieuw − oud) : oud × 100\n("+num(v[2])+" − "+num(v[1])+") : "+num(v[1])+" × 100 = "+pc(a)+(a<0?"\nDus een daling van "+pc(-a):" gestegen")};},
index:function(){var v=pick([
function(){var b=rnd(180,260)/100,n=r(b*(1+rnd(5,40)/100),2);return ["Een brood kostte in 2015 (basisjaar) "+eur(b)+". Nu kost het "+eur(n)+".",b,n];},
function(){var b=rnd(38,52)*10,n=b-rnd(4,12)*10;return ["Een telefoon kostte in het basisjaar "+eur(b)+". Nu kost hij "+eur(n)+".",b,n];},
function(){var b=rnd(2100,2400),n=b+rnd(80,220);return ["Je inkomen was in het basisjaar "+eur(b)+" per maand. Nu is het "+eur(n)+".",b,n];},
function(){var b=rnd(800,880),n=b+rnd(20,90);return ["In 2015 (basisjaar) zaten er "+b+" leerlingen op school. Nu zijn het er "+n+".",b,n];}
])();var a=r(v[2]/v[1]*100,1);
return{f:"index",h:"Bereken het indexcijfer (1 decimaal).",body:qp(v[0]),a:a,d:1,u:"",calc:"Indexcijfer = nieuw getal : getal in het basisjaar × 100\n"+num(v[2])+" : "+num(v[1])+" × 100 = "+i1(a)+"\n"+(a>=100?"Boven de 100: een stijging van "+pc(r(a-100,1)):"Onder de 100: een daling van "+pc(r(100-a,1)))};},
terug:function(){
if(Math.random()<0.6){var v=pick([["Een liter benzine",1.69,176.6],["Een liter benzine",rnd(160,199)/100,rnd(1500,1850)/10],["Een kilo kaas",rnd(1100,1600)/100,rnd(1250,1600)/10],["Een kop koffie",rnd(300,420)/100,rnd(1180,1450)/10],["Een bioscoopkaartje",rnd(1250,1650)/100,rnd(1150,1400)/10]]),a=r(v[1]/v[2]*100,2);
return{f:"terug",h:"Wat kostte het in 2015? (2 decimalen)",body:qp(v[0]+" kost nu "+eur(v[1])+". Het indexcijfer is "+i1(v[2])+" (2015 = 100)."),a:a,d:2,u:"€",calc:"Terugrekenen: prijs nu : indexcijfer × 100\n"+num(v[1])+" : "+i1(v[2])+" × 100 = "+eur(a)};}
var w=pick([["Een brood",rnd(190,260)/100],["Een treinkaartje",rnd(400,900)/100],["Een pizza",rnd(800,1300)/100],["Een spijkerbroek",rnd(4000,8000)/100]]),i=rnd(1030,1250)/10,b=r(w[1]*i/100,2);
return{f:"vooruit",h:"Wat is de prijs nu? (2 decimalen)",body:qp(w[0]+" kostte in het basisjaar "+eur(w[1])+". Het indexcijfer is nu "+i1(i)+"."),a:b,d:2,u:"€",calc:"Prijs nu = prijs in het basisjaar × indexcijfer : 100\n"+num(w[1])+" × "+i1(i)+" : 100 = "+eur(b)};},
koop:function(){var v=pick([
function(){var l=rnd(10,50)/10,i=rnd(5,45)/10;return ["Je loon stijgt met "+pc(l)+". De inflatie is "+pc(i)+".",l,i];},
function(){var l=rnd(10,40)/10,i=rnd(10,40)/10;return ["De cao geeft "+pc(l)+" loonsverhoging. De prijzen stijgen dit jaar met "+pc(i)+".",l,i];},
function(){var bi=rnd(1030,1090)/10,pi=rnd(1020,1095)/10;return ["Het indexcijfer van je inkomen is "+i1(bi)+". Het prijsindexcijfer is "+i1(pi)+" (zelfde basisjaar).",r(bi-100,1),r(pi-100,1),bi,pi];},
function(){var l=rnd(15,40)/10,i=rnd(10,45)/10;return ["In de grafiek lees je af: de lonen stegen met "+pc(l)+" en de consumentenprijzen met "+pc(i)+".",l,i];}
])();if(v[1]===v[2]){v[2]=r(v[2]+0.3,1);if(v[4])v[4]=r(v[4]+0.3,1);}var a=r(v[1]-v[2],1);
return{f:"reeel",h:"Met hoeveel procent verandert de koopkracht? (1 decimaal, typ een min-teken bij een daling)",body:qp(v[0]),a:a,d:1,u:"%",calc:"Reële verandering = nominale verandering − prijsverandering\n"+(v[3]?"Inkomen: "+i1(v[3])+" − 100 = "+pc(v[1])+" · prijzen: "+i1(v[4])+" − 100 = "+pc(v[2])+"\n":"")+pc(v[1])+" − "+pc(v[2])+" = "+pc(a)+"\n"+(a>0?"De koopkracht stijgt.":"De koopkracht daalt.")};},
cpi:function(){var g=shuffle([["🍞","Voeding"],["🏠","Wonen"],["🚗","Vervoer"],["👕","Kleding"],["🎉","Vrije tijd"],["⚡","Energie"]]).slice(0,4),w=pick([[40,30,20,10],[35,25,25,15],[30,30,25,15],[45,25,20,10],[25,35,25,15]]);
var rows=g.map(function(x,i){return [x,w[i],rnd(980,1180)/10];}),tot=0;rows.forEach(function(x){tot+=x[1]*x[2];});var a=r(tot/100,1);
return{f:"cpi",h:"Bereken het CPI: het gewogen indexcijfer (1 decimaal).",body:qp("Het CBS meet de prijzen in IJmuiden. De weging laat zien hoe zwaar een groep meetelt (samen 100).")+stmt([["Groep","Weging","Indexcijfer"]].concat(rows.map(function(x){return [x[0][0]+" "+x[0][1],x[1],i1(x[2])];})),"cpi"),a:a,d:1,u:"",
calc:"Gewogen indexcijfer = (weging × indexcijfer) opgeteld : totale weging\n"+rows.map(function(x){return x[1]+" × "+i1(x[2])+" = "+num(r(x[1]*x[2],1));}).join("\n")+"\nSamen: "+num(r(tot,1))+" : 100 = "+i1(a)+"\nDe prijzen zijn gemiddeld "+pc(Math.abs(r(a-100,1)))+(a>=100?" gestegen.":" gedaald.")};},
bbp:function(){var v=pick([["Nederland",rnd(1000,1200),rnd(175,182)/10],["België",rnd(560,640),rnd(115,120)/10],["Duitsland",rnd(4100,4500),rnd(830,845)/10],["Denemarken",rnd(380,420),rnd(58,60)/10]]),bb=v[1]*1e9,inw=r(v[2]*1e6,0),a=r(bb/inw,0);
return{f:"bbp",h:"Bereken het BBP per inwoner (afronden op hele euro's).",body:qp("Het BBP van "+v[0]+" is €"+num(v[1])+" miljard. Er wonen "+i1(v[2])+" miljoen mensen."),a:a,d:0,u:"€",calc:"BBP per inwoner = BBP : aantal inwoners\n€"+num(v[1])+" miljard = €"+num(bb)+"\n"+i1(v[2])+" miljoen = "+num(inw)+"\n€"+num(bb)+" : "+num(inw)+" = €"+num(a)};},
enkel:function(){var b=pick([1500,2000,2250,2500,3000,3750,4000,4150,5000,6250]),p=rnd(10,35)/10,n=rnd(2,6),per=r(p/100*b,2),tot=r(per*n,2),eind=Math.random()<0.45,a=eind?r(b+tot,2):tot;
return{f:"enkel",h:eind?"Wat is het eindbedrag na "+n+" jaar (inleg + rente)? (2 decimalen)":"Hoeveel rente krijg je in totaal? (2 decimalen)",body:qp("Je zet "+eur(b)+" op een spaardeposito, "+n+" jaar vast tegen "+pc(p)+" enkelvoudige rente per jaar."),a:a,d:2,u:"€",
calc:"Enkelvoudige rente = rente% : 100 × bedrag × aantal jaren\n"+i1(p)+" : 100 × "+num(b)+" = "+eur(per)+" per jaar\n"+eur(per)+" × "+n+" = "+eur(tot)+" rente"+(eind?"\nEindbedrag: "+eur(b)+" + "+eur(tot)+" = "+eur(a):"")};},
samen:function(){var b=pick([800,1000,1250,1500,2000,2500,2900,3750,5000]),p=pick([1.2,1.5,1.8,2,2.2,2.5,2.6,3,3.5]),n=rnd(2,6),g=r(1+p/100,4),e=r(b*Math.pow(g,n),2),renteQ=Math.random()<0.3,a=renteQ?r(e-b,2):e;
return{f:"samen",h:renteQ?"Hoeveel rente heb je in totaal gekregen? (2 decimalen)":"Wat is het eindbedrag na "+n+" jaar? (2 decimalen)",body:qp("Je zet "+eur(b)+" op een spaarrekening met "+pc(p)+" samengestelde rente per jaar. Je laat het geld "+n+" jaar staan."),a:a,d:2,u:"€",
calc:"Groeifactor = 1 + "+i1(p)+" : 100 = "+num(g)+"\n"+num(b)+" × "+num(g)+(SUP[n]||"^"+n)+" = "+eur(e)+(renteQ?"\nRente = "+eur(e)+" − "+eur(b)+" = "+eur(a):"")};},
krediet:function(){var K=pick([2500,4000,5000,6000,7500,10000]),j=pick([6.9,7.4,7.9,8.5,8.9]),mr=Math.pow(1+j/100,1/12)-1;
var rows=[24,36,48,60].map(function(n){return [n,r(K*mr/(1-Math.pow(1+mr,-n)),2)];}),x=pick(rows),a=r(x[1]*x[0]-K,2);
return{f:"krediet",h:"Bereken de kredietkosten (2 decimalen).",body:qp("Je leent "+eur(K)+" met een persoonlijke lening. Je kiest een looptijd van "+x[0]+" maanden. Gebruik de tabel.")+stmt([["Looptijd","Maandtermijn"]].concat(rows.map(function(y){return [y[0]+" maanden",eur(y[1])];})),"cpi"),a:a,d:2,u:"€",
calc:"Kredietkosten = termijnbedrag × aantal termijnen − krediet\n"+eur(x[1])+" × "+x[0]+" = "+eur(r(x[1]*x[0],2))+"\n"+eur(r(x[1]*x[0],2))+" − "+eur(K)+" = "+eur(a)};},
maand:function(){
if(Math.random()<0.55){var w=pick([["Je verdient met je bijbaan ",35,140],["Je krijgt aan zakgeld ",8,25],["Je gezin geeft aan boodschappen ",120,240]]),x=money(w[1],w[2]),j=r(x*52,2),a=r(x*52/12,2);
return{f:"maand",h:"Hoeveel is dat per maand? (2 decimalen)",body:qp(w[0]+eur(x)+" per week."),a:a,d:2,u:"€",calc:"Week → maand: × 52 : 12\n"+eur(x)+" × 52 = "+eur(j)+" per jaar\n"+eur(j)+" : 12 = "+eur(a)+" per maand\n(Niet × 4: een maand is langer dan 4 weken!)"};}
var m=pick([["Je huur is ",450,950],["Je telefoonabonnement kost ",12,45],["Je sportcontributie is ",15,40],["Je verdient met je bijbaan ",180,520]]),y=money(m[1],m[2]),j2=r(y*12,2),b=r(y*12/52,2);
return{f:"week",h:"Hoeveel is dat per week? (2 decimalen)",body:qp(m[0]+eur(y)+" per maand."),a:b,d:2,u:"€",calc:"Maand → week: × 12 : 52\n"+eur(y)+" × 12 = "+eur(j2)+" per jaar\n"+eur(j2)+" : 52 = "+eur(b)+" per week"};},
reserve:function(){var v=pick([["rijlessen",rnd(18,32)*50],["een vakantie",rnd(10,24)*50],["een nieuwe laptop",rnd(12,24)*50],["een scooter",rnd(30,50)*50],["de jaarlijkse autoverzekering",rnd(40,90)*10]]),m=pick([4,5,6,8,9,10,12]),a=r(v[1]/m,2);
return{f:"reserve",h:"Hoeveel moet je per maand reserveren? (2 decimalen)",body:qp("Over "+m+" maanden heb je "+eur(v[1])+" nodig voor "+v[0]+"."),a:a,d:2,u:"€",calc:"Reservering per maand = benodigd bedrag : aantal maanden\n"+eur(v[1])+" : "+m+" = "+eur(a)};},
saldo:function(){var o=money(40,900),plusL=shuffle(["Loon bijbaan","Zakgeld","Terugbetaling webshop","Verjaardagsgeld","Tikkie van een vriend"]),minL=shuffle(["Supermarkt","Telefoonabonnement","Sportschool","Webshop","Bioscoop","Kapper","Opladen ov-chipkaart"]),rows=[["Oud saldo (credit)",eur(o)]],sp=0,sm=0,k=rnd(3,5);
for(var i=0;i<k;i++){var plus=i===0||Math.random()<0.35;if(plus){var x=money(10,250);sp+=x;rows.push([plusL.pop(),"+ "+eur(x)]);}else{var y=money(5,140);sm+=y;rows.push([minL.pop(),"− "+eur(y)]);}}
sp=r(sp,2);sm=r(sm,2);var a=r(o+sp-sm,2);rows.push(["Nieuw saldo","?",1]);
return{f:"saldo",h:"Wat is het nieuwe saldo? (typ een min-teken als je rood staat)",body:stmt(rows),a:a,d:2,u:"€",calc:"Nieuw saldo = oud saldo + ontvangsten − betalingen\n"+eur(o)+" + "+eur(sp)+" − "+eur(sm)+" = "+eur(a)+"\n"+(a>=0?"Creditsaldo: je hebt geld tegoed.":"Debetsaldo: je staat rood.")};}
};

var fs={good:0,total:0,streak:0},fq=null,fCard=document.getElementById("fCard");
var FMODES=["pct","index","terug","koop","bbp","enkel","samen","krediet","maand","reserve","saldo"],lastF="";
function fScore(){document.getElementById("fScore").innerHTML="Goed: <b>"+fs.good+"</b> van "+fs.total+" &nbsp;·&nbsp; Reeks: <b>"+fs.streak+"</b>";}
function newF(){var m;do{m=pick(FMODES);}while(m===lastF);lastF=m;fq=RGEN[m]();fq.phase=1;
var others=shuffle(Object.keys(FORM).filter(function(k){return k!==fq.f;})).slice(0,3),opts=shuffle([fq.f].concat(others));
fCard.innerHTML='<div class="muted" style="font-size:13px">Stap 1 van 2 · kies de juiste formule</div>'+fq.body+'<p style="font-weight:700;margin:4px 0 12px">'+fq.h+'</p><div class="opts">'+opts.map(function(k){return '<button class="opt f" data-k="'+k+'">'+FORM[k]+'</button>';}).join("")+'</div><div id="fFb0"></div>';fScore();}
fCard.addEventListener("click",function(e){
var b=e.target.closest("[data-k]");
if(b&&fq.phase===1){fq.phase=2;var ok=b.dataset.k===fq.f;fq.formulaOk=ok;
fCard.querySelectorAll(".opt").forEach(function(x){x.disabled=true;if(x.dataset.k===fq.f)x.classList.add("right");else if(x===b)x.classList.add("wrong");});
document.getElementById("fFb0").innerHTML='<div class="fb '+(ok?"ok":"no")+'">'+(ok?"✓ Goede formule!":"✗ Niet deze. De juiste formule is: <code>"+FORM[fq.f]+"</code>")+'</div><div class="muted" style="font-size:13px;margin-top:14px">Stap 2 van 2 · reken het uit</div>'+answerRow("f",fq.u);
var inp=document.getElementById("fIn");inp.addEventListener("keydown",function(ev){if(ev.key==="Enter")checkF();});
document.getElementById("fCheck").addEventListener("click",checkF);}
if(e.target.id==="fNext")newF();
});
function checkF(){var v=parse(document.getElementById("fIn").value,fq.d),res=verdict(v,fq.a,fq.d,fq.abs);if(!res)return;
fs.total++;if(res==="ok"&&fq.formulaOk){fs.good++;fs.streak++;}else fs.streak=0;
document.getElementById("fCheck").disabled=true;document.getElementById("fIn").disabled=true;
document.getElementById("fFb").innerHTML='<div class="fb '+(res==="sign"?"mid":res)+'">'+vmsg(res)+'<span class="calc">'+fq.calc+'</span></div><div class="row" style="margin-top:12px"><button class="btn" id="fNext">Volgende som →</button></div>';fScore();}
newF();

var mode="pct",rs={good:0,total:0,streak:0},rq=null,rCard=document.getElementById("rCard"),rModes=document.getElementById("rModes");
function rScore(){document.getElementById("rScore").innerHTML="Goed: <b>"+rs.good+"</b> van "+rs.total+" &nbsp;·&nbsp; Reeks: <b>"+rs.streak+"</b>";}
function newR(){
rModes.innerHTML=MODES.map(function(m){return '<button data-m="'+m[0]+'" class="'+(m[0]===mode?"on":"")+'">'+m[1]+'</button>';}).join("");
rq=RGEN[mode]();
rCard.innerHTML=rq.body+'<p style="font-weight:700;margin:8px 0 0">'+rq.h+'</p>'+(rq.f!=="cpi"?'<div class="muted" style="font-size:13px;margin-top:4px">Formule: <code>'+FORM[rq.f]+'</code></div>':'')+answerRow("r",rq.u);
var inp=document.getElementById("rIn");inp.addEventListener("keydown",function(ev){if(ev.key==="Enter")checkR();});
document.getElementById("rCheck").addEventListener("click",checkR);rScore();
}
function checkR(){
var v=parse(document.getElementById("rIn").value,rq.d),res=verdict(v,rq.a,rq.d,rq.abs);if(!res)return;
rs.total++;if(res==="ok"){rs.good++;rs.streak++;}else rs.streak=0;
document.getElementById("rCheck").disabled=true;document.getElementById("rIn").disabled=true;
document.getElementById("rFb").innerHTML='<div class="fb '+(res==="sign"?"mid":res)+'">'+vmsg(res)+'<span class="calc">'+rq.calc+'</span></div><div class="row" style="margin-top:12px"><button class="btn" id="rNext">Volgende som →</button></div>';
document.getElementById("rNext").addEventListener("click",newR);rScore();
}
rModes.addEventListener("click",function(e){var m=e.target.dataset.m;if(m){mode=m;newR();}});
newR();

