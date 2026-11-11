/* Economie · persoonlijke oefenroute (fase 2, 2026-11-11)
   Eén module voor alle hoofdstukken: EcoRoute.mount({el, map, url, nk, les, onchange}).
   - url: <map>/route.json, gemaakt door bouw-route.py: per leerdoel vragen op drie niveaus (1-, 2- en 3-ster).
     Vraagtypen: mc (vier opties, o[0] is juist, geschud bij tonen), open (antwoordmodel + nakijkpunten; de AI kijkt na,
     anders zelf nakijken met het model) en gen (rekenvraag met nieuwe getallen, per niveau anders; zie RG hieronder).
   - Bij rekenvragen eerst de formule opschrijven of opzoeken (formulekaart), geen meerkeuze voor de formule.
   - Regels: een kort instaptoetsje (één vraag op niveau 2 per leerdoel) bepaalt het startniveau; daarna per vraag:
     twee keer goed op rij = een ster erbij, twee keer fout op rij = een ster eraf; na een fout komt hetzelfde leerdoel
     na drie andere vragen terug; leerdoelen met weinig sterren of een recente fout komen vaker aan de beurt.
     Op drie sterren en drie keer goed op rij vraagt de route de Worker om een nieuwe verdiepingsvraag (lukt dat niet,
     dan uit de vragenbank). Alles staat in changelog.md (2026-11-11).
   - Opslag alleen op het apparaat onder "eco-route-<map>-v1" (nieuwe sleutel; bestaande sleutels blijven ongemoeid),
     zonder namen. Voortgangscode: RT-<MAP>-<datum>-<per leerdoel het niveau 0..3>-<controle>; lezen met tools/voortgang-lezen.html. */
(function(){
"use strict";
var RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function pick(a){return a[Math.floor(Math.random()*a.length)];}
function r(x,d){var m=Math.pow(10,d);return Math.round((x+(x>=0?1:-1)*1e-9)*m)/m;}
function money(a,b){return rnd(a*100,b*100)/100;}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
var nf2=new Intl.NumberFormat("nl-NL",{minimumFractionDigits:2,maximumFractionDigits:2}),nf1=new Intl.NumberFormat("nl-NL",{minimumFractionDigits:1,maximumFractionDigits:1});
function eur(x){return (x<0?"−€":"€")+nf2.format(Math.abs(x));}
function pc(x){return (x<0?"−":"")+nf1.format(Math.abs(x))+"%";}
function num(x){return new Intl.NumberFormat("nl-NL",{maximumFractionDigits:4}).format(x);}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function parse(s,d){s=String(s).trim().replace(/[€%\s]/g,"").replace(/[−–]/g,"-");if(!s)return NaN;
  if(s.indexOf(",")>-1){s=s.replace(/\./g,"").replace(",",".");}
  else if((s.match(/\./g)||[]).length>1||(d===0&&/^-?\d{1,3}(\.\d{3})+$/.test(s))){s=s.replace(/\./g,"");}
  return parseFloat(s);}
function verdict(v,a,dec,abs){if(isNaN(v))return null;if(abs){v=Math.abs(v);a=Math.abs(a);}
  var tol=dec===2?0.0051:dec===1?0.051:0.51;if(Math.abs(v-a)<=tol)return "ok";
  if(!abs&&a!==0&&Math.abs(Math.abs(v)-Math.abs(a))<=tol)return "sign";
  if(Math.abs(v-a)<=Math.max(Math.abs(a)*0.01,dec===2?0.02:0.2))return "mid";return "no";}
function stmt(rows){return '<table class="rt-tbl">'+rows.map(function(x){return '<tr'+(x[2]===1?' class="ask"':'')+'><td>'+x[0]+'</td><td>'+x[1]+'</td></tr>';}).join("")+'</table>';}

/* ---------- formules: altijd met haakjes, zoals de docent ze schrijft ---------- */
var FORMULES={
  maand:{t:"weekbedrag × 52 : 12",must:[["52"],["12"]]},
  week:{t:"maandbedrag × 12 : 52",must:[["52"],["12"]]},
  budget:{t:"inkomsten − uitgaven",must:[["inkomst"],["uitgave"]]},
  saldo:{t:"oud saldo + bij − af",must:[["oud"],["bij","+"],["af","−","-"]]},
  terug:{t:"nieuw saldo + af − bij",must:[["nieuw"],["af"],["bij"]]},
  pct:{t:"(nieuw − oud) : oud × 100",must:[["nieuw"],["oud"],["100"]]},
  procvan:{t:"(percentage : 100) × totaal",must:[["100"],["percentage","procent","%","deel"]]},
  perc:{t:"(deel : geheel) × 100",must:[["deel"],["geheel","totaal","heel"],["100"]]},
  rente:{t:"(rentepercentage : 100) × spaarbedrag",must:[["100"],["rente","percentage","%"],["spaar","bedrag"]]},
  totaal:{t:"maandtermijn × aantal maanden",must:[["termijn"],["maand"]]},
  lening:{t:"totaal terugbetaald − geleend bedrag",must:[["terug","totaal"],["geleend","lening","leen"]]},
  schade:{t:"schade − eigen risico",must:[["schade"],["eigen","risico"]]},
  premie:{t:"premie per maand × 12",must:[["premie"],["12"]]},
  gem:{t:"alle getallen optellen : het aantal",must:[["optel","+","som","samen"],["aantal","delen",":","/"]]},
  afronden:{t:"geld: 2 cijfers achter de komma, procenten: 1 cijfer",must:[["2","twee"],["1","één","een"]]}
};
function normF(s){return String(s).toLowerCase().replace(/[xX*]|keer|maal/g,"×").replace(/÷|\/|gedeeld door|delen door/g,":").replace(/[–—]/g,"−").replace(/\bmin\b/g,"−").replace(/\bplus\b/g,"+");}
function formuleOk(key,ans){var f=FORMULES[key],a=normF(ans);if(!f||a.replace(/\s/g,"").length<3)return false;
  return f.must.every(function(alts){return alts.some(function(x){return a.indexOf(normF(x))>-1;});});}

/* ---------- rekenvragen per niveau (1 = basis, 2 = moeilijkere getallen of andersom, 3 = twee stappen) ---------- */
var NAMEN=["Lotte","Sem","Noah","Mila","Daan","Yara","Fatima","Jayden","Sanne","Mehmet","Lena","Tim"];
var RG={
maand:function(L){var n=pick(NAMEN);
  if(L===1){var w=pick([10,15,20,25,30,40,45,50,60,75]),a=r(w*52/12,2);return {f:"maand",h:"Hoeveel is dat per maand? Rond af op 2 decimalen.",body:n+" krijgt "+eur(w)+" zakgeld per week.",a:a,d:2,u:"€",calc:"Week → maand: × 52 : 12\n"+eur(w)+" × 52 = "+eur(w*52)+" per jaar\n"+eur(w*52)+" : 12 = "+eur(a)+" per maand"};}
  if(L===2){if(Math.random()<0.5){var x=money(35,140),j=r(x*52,2),a2=r(x*52/12,2);return {f:"maand",h:"Hoeveel is dat per maand? Rond af op 2 decimalen.",body:n+" verdient met een bijbaan "+eur(x)+" per week.",a:a2,d:2,u:"€",calc:"Week → maand: × 52 : 12\n"+eur(x)+" × 52 = "+eur(j)+"\n"+eur(j)+" : 12 = "+eur(a2)+" per maand\n(Niet × 4: een maand is langer dan 4 weken.)"};}
    var y=money(12,95),j2=r(y*12,2),b=r(y*12/52,2);return {f:"week",h:"Hoeveel is dat per week? Rond af op 2 decimalen.",body:pick(["Het telefoonabonnement van "+n+" kost ","De sportcontributie van "+n+" is ","De streamingdienst van "+n+" kost "])+eur(y)+" per maand.",a:b,d:2,u:"€",calc:"Maand → week: × 12 : 52\n"+eur(y)+" × 12 = "+eur(j2)+"\n"+eur(j2)+" : 52 = "+eur(b)+" per week"};}
  var w3=money(40,120),m=r(w3*52/12,2),vast=pick([25,35,40,55,60,75]),a3=r(m-vast,2);
  return {f:"maand",h:"Hoeveel houdt "+n+" per maand over? Reken eerst het weekbedrag om naar een maandbedrag. Rond af op 2 decimalen.",body:n+" verdient "+eur(w3)+" per week. Elke maand betaalt "+n+" "+eur(vast)+" voor een telefoonabonnement en de sportclub.",a:a3,d:2,u:"€",calc:"Stap 1, week → maand: "+eur(w3)+" × 52 : 12 = "+eur(m)+"\nStap 2: "+eur(m)+" − "+eur(vast)+" = "+eur(a3)+" over per maand"};},
budget:function(L){var n=pick(NAMEN);
  if(L===1){var inc=[["Zakgeld",pick([20,25,30,40])],["Bijbaan",pick([60,80,100,120])]],out=[["Telefoon",pick([10,15,20])],["Kleding",pick([20,25,30,40])],["Uitgaan",pick([15,20,25,35])]];return mk(inc,out,n,"budget");}
  if(L===2){var inc2=[["Zakgeld",money(20,60)],["Bijbaantje",money(80,320)]].concat(Math.random()<0.4?[["Verjaardagsgeld (gemiddeld)",money(5,25)]]:[]),out2=shuffle([["Telefoonabonnement",money(8,25)],["Contributie sportclub",money(12,30)],["Kleding (gemiddeld)",money(20,70)],["Uitgaan en snoep",money(25,90)],["Cadeautjes",money(8,30)],["Sparen voor een nieuwe fiets",money(20,80)]]).slice(0,rnd(3,5));return mk(inc2,out2,n,"budget");}
  var wk=pick([30,35,40,45,50]),wm=r(wk*52/12,2),inc3=[["Zakgeld",pick([20,25,30])],["Bijbaan: "+eur(wk)+" per week",wm,"("+eur(wk)+" × 52 : 12 = "+eur(wm)+" per maand)"]],out3=shuffle([["Telefoonabonnement",money(10,25)],["Contributie sportclub",money(12,30)],["Kleding (gemiddeld)",money(25,60)],["Uitgaan en snoep",money(30,80)]]).slice(0,3);
  var q=mk(inc3,out3,n,"budget");q.h="Het bijbaantje staat per week. Reken dat eerst om naar een maand. "+q.h;q.calc="Stap 1: "+inc3[1][2]+"\n"+q.calc;return q;
  function mk(inc,out,n,f){var ti=0,to=0;inc.forEach(function(x){ti+=x[1];});out.forEach(function(x){to+=x[1];});ti=r(ti,2);to=r(to,2);var a=r(ti-to,2);
    var rows=[["Inkomsten van "+n+" per maand",""]].concat(inc.map(function(x){return [x[0],x[2]?"?":eur(x[1])];})).concat([["Uitgaven per maand",""]]).concat(out.map(function(x){return [x[0],eur(x[1])];}));
    return {f:f,h:"Heeft "+n+" een overschot of een tekort? Bereken het verschil (typ een min-teken bij een tekort).",body:stmt(rows),a:a,d:2,u:"€",calc:"Totaal inkomsten: "+eur(ti)+"\nTotaal uitgaven: "+eur(to)+"\n"+eur(ti)+" − "+eur(to)+" = "+eur(a)+(a<0?"\nTekort: de uitgaven zijn hoger dan de inkomsten.":a>0?"\nOverschot: er blijft geld over.":"\nIn balans.")};}},
saldo:function(L){var n=pick(NAMEN);
  if(L===1){var o=pick([50,80,100,120,150,200]),b=pick([10,20,25,40,50]),f=pick([15,30,35,45,60,70]),a=r(o+b-f,2);return {f:"saldo",h:"Wat is het nieuwe saldo?",body:stmt([["Oud saldo",eur(o)],["Bij (ontvangsten)","+ "+eur(b)],["Af (betalingen)","− "+eur(f)],["Nieuw saldo","?",1]]),a:a,d:2,u:"€",calc:"Nieuw saldo = oud saldo + bij − af\n"+eur(o)+" + "+eur(b)+" − "+eur(f)+" = "+eur(a)};}
  if(L===2){var o2=money(40,900),plusL=shuffle(["Loon bijbaan","Zakgeld","Terugbetaling webshop","Verjaardagsgeld","Tikkie van een vriend"]),minL=shuffle(["Supermarkt","Telefoonabonnement","Sportschool","Webshop","Bioscoop","Kapper"]),rows=[["Oud saldo",eur(o2)]],sp=0,sm=0,k=rnd(3,5);
    for(var i=0;i<k;i++){var plus=i===0||Math.random()<0.35;if(plus){var x=money(10,250);sp+=x;rows.push([plusL.pop(),"+ "+eur(x)]);}else{var y=money(5,140);sm+=y;rows.push([minL.pop(),"− "+eur(y)]);}}
    sp=r(sp,2);sm=r(sm,2);var a2=r(o2+sp-sm,2);rows.push(["Nieuw saldo","?",1]);
    return {f:"saldo",h:"Wat is het nieuwe saldo? Typ een min-teken als "+n+" rood staat.",body:stmt(rows),a:a2,d:2,u:"€",calc:"Nieuw saldo = oud saldo + ontvangsten − betalingen\n"+eur(o2)+" + "+eur(sp)+" − "+eur(sm)+" = "+eur(a2)+"\n"+(a2>=0?"Creditsaldo: "+n+" heeft geld tegoed.":"Debetsaldo: "+n+" staat rood.")};}
  var nw=money(50,900),bb=money(10,300),ff=money(10,300),a3=r(nw+ff-bb,2);if(a3<=0)return RG.saldo(3);
  return {f:"terug",h:"Wat was het oude saldo? Reken terug.",body:stmt([["Oud saldo","?",1],["Bij (ontvangsten)","+ "+eur(bb)],["Af (betalingen)","− "+eur(ff)],["Nieuw saldo",eur(nw)]]),a:a3,d:2,u:"€",calc:"Terugrekenen: + wordt − en − wordt +\nOud saldo = nieuw saldo + af − bij\n"+eur(nw)+" + "+eur(ff)+" − "+eur(bb)+" = "+eur(a3)+"\nControle: "+eur(a3)+" + "+eur(bb)+" − "+eur(ff)+" = "+eur(nw)};},
pct:function(L){
  if(L===1){var o=pick([50,100,200,400,500]),n=o+pick([5,10,20,25,50])*(o/100),a=r((n-o)/o*100,1);return {f:"pct",h:"Met hoeveel procent is het bedrag gestegen? Rond af op 1 decimaal.",body:"Een jas kostte "+eur(o)+". Nu kost hij "+eur(n)+".",a:a,d:1,u:"%",calc:"(nieuw − oud) : oud × 100\n("+num(n)+" − "+num(o)+") : "+num(o)+" × 100 = "+pc(a)};}
  if(L===2){var v=pick([function(){var o=pick([5,6,7.5,8,10,12.5]),n=r(o+pick([0.5,1,1.5,2,2.5]),2);return ["Vorig jaar kreeg je "+eur(o)+" zakgeld per week. Nu krijg je "+eur(n)+".",o,n,"Met hoeveel procent is je zakgeld gestegen?"];},
    function(){var o=rnd(780,960),n=o+rnd(15,70);return ["Vorig schooljaar zaten er "+o+" leerlingen op school. Nu zijn het er "+n+".",o,n,"Met hoeveel procent is het aantal leerlingen gestegen?"];},
    function(){var o=rnd(65,98)*10,n=o-rnd(3,14)*10;return ["Een tweedehands scooter was vorig jaar "+eur(o)+" waard. Nu is hij "+eur(n)+" waard.",o,n,"Met hoeveel procent is de waarde gedaald?"];},
    function(){var o=rnd(2100,2600),n=o+rnd(40,140);return ["Het brutoloon van Fatima ging van "+eur(o)+" naar "+eur(n)+" per maand.",o,n,"Met hoeveel procent is haar loon gestegen?"];}])(),a2=r((v[2]-v[1])/v[1]*100,1);
    return {f:"pct",h:v[3]+" Rond af op 1 decimaal.",body:v[0],a:a2,d:1,u:"%",abs:a2<0,calc:"(nieuw − oud) : oud × 100\n("+num(v[2])+" − "+num(v[1])+") : "+num(v[1])+" × 100 = "+pc(a2)+(a2<0?"\nDus een daling van "+pc(-a2):"")};}
  var p0=pick([2,2.5,3,1.8,2.2]),p1=r(p0+pick([0.2,0.25,0.3,0.4]),2),p2=r(p1+pick([0.2,0.25,0.3,0.35]),2),a3=r((p2-p0)/p0*100,1);
  return {f:"pct",h:"Met hoeveel procent is een broodje in totaal duurder geworden, van 2024 tot 2026? Rond af op 1 decimaal.",body:"In 2024 kostte een broodje in de kantine "+eur(p0)+". In 2025 werd het "+eur(p1)+" en in 2026 "+eur(p2)+".",a:a3,d:1,u:"%",calc:"Let op: oud is de prijs van 2024, nieuw die van 2026.\n("+num(p2)+" − "+num(p0)+") : "+num(p0)+" × 100 = "+pc(a3)+"\n(De prijs van 2025 heb je niet nodig.)"};},
procvan:function(L){
  if(L===1){var t=pick([40,60,80,120,200,300]),p=pick([10,25,50]),a=r(p/100*t,2);return {f:"procvan",h:"Hoeveel euro korting krijg je?",body:"Een "+pick(["spijkerbroek","koptelefoon","hoodie","rugzak"])+" kost "+eur(t)+". Je krijgt "+p+"% korting.",a:a,d:2,u:"€",calc:"(percentage : 100) × totaal\n("+p+" : 100) × "+num(t)+" = "+eur(a)};}
  if(L===2){var v=pick([function(){var t=rnd(950,1600),k=pick([["huur",rnd(45,58)],["verzekeringen",rnd(12,19)],["gas en elektra",rnd(9,15)],["abonnementen",rnd(4,8)]]);return ["Denise betaalt elke maand "+eur(t)+" aan vaste lasten. Daarvan gaat "+k[1]+"% naar "+k[0]+".",k[1],t,"Hoeveel euro betaalt Denise per maand aan "+k[0]+"?"];},
    function(){var t=pick([49.95,79.99,129,249,349.5]),p=pick([15,20,30,35]);return ["Een "+pick(["fiets","spelcomputer","jas","tablet"])+" kost "+eur(t)+". Je krijgt "+p+"% korting.",p,t,"Hoeveel euro korting krijg je?"];},
    function(){var t=money(180,900),p=pick([10,15,20,25,40]);return ["Je verdient "+eur(t)+" per maand met je bijbaan. Je spaart "+p+"% daarvan.",p,t,"Hoeveel euro spaar je per maand?"];}])(),a2=r(v[1]/100*v[2],2);
    return {f:"procvan",h:v[3]+" Rond af op 2 decimalen.",body:v[0],a:a2,d:2,u:"€",calc:"(percentage : 100) × totaal\n("+num(v[1])+" : 100) × "+num(v[2])+" = "+eur(a2)};}
  var t3=pick([59.95,89.99,119,149.5,199,259]),p3=pick([15,20,25,30,40]),k3=r(p3/100*t3,2),a3=r(t3-k3,2);
  return {f:"procvan",h:"Wat is de nieuwe prijs? Bereken eerst de korting in euro's. Rond af op 2 decimalen.",body:"Een "+pick(["winterjas","smartwatch","skateboard","koptelefoon"])+" kost "+eur(t3)+". In de uitverkoop krijg je "+p3+"% korting.",a:a3,d:2,u:"€",calc:"Stap 1, korting: ("+p3+" : 100) × "+num(t3)+" = "+eur(k3)+"\nStap 2, nieuwe prijs: "+eur(t3)+" − "+eur(k3)+" = "+eur(a3)};},
perc:function(L){
  if(L===1){var t=pick([20,25,40,50]),d=pick([5,10,15,20].filter(function(x){return x<t;})),a=r(d/t*100,1);return {f:"perc",h:"Hoeveel procent van de klas fietst naar school? Rond af op 1 decimaal.",body:"In een klas zitten "+t+" leerlingen. "+d+" van hen fietsen naar school.",a:a,d:1,u:"%",calc:"(deel : geheel) × 100\n("+d+" : "+t+") × 100 = "+pc(a)};}
  if(L===2){var v=pick([function(){var t=pick([250,500,800,1200,2000]),d=r(t*pick([4.5,5.2,6.5,7.1,8.4])/100,2);return ["Je leent "+eur(t)+" en betaalt "+eur(d)+" rente.",d,t,"Hoeveel procent is de rente van het geleende bedrag?"];},
    function(){var t=money(40,120),d=r(t*rnd(15,60)/100,2);return ["Je krijgt "+eur(t)+" zakgeld per maand. Daarvan geef je "+eur(d)+" uit aan snoep en drinken.",d,t,"Hoeveel procent van je zakgeld geef je uit aan snoep en drinken?"];},
    function(){var t=rnd(30,140)*10,d=t-pick([50,75,100,150]);return ["De schade aan je spullen is "+eur(t)+". Je krijgt "+eur(d)+" vergoed van de verzekeraar.",d,t,"Hoeveel procent van je schade krijg je vergoed?"];}])(),a2=r(v[1]/v[2]*100,1);
    return {f:"perc",h:v[3]+" Rond af op 1 decimaal.",body:v[0],a:a2,d:1,u:"%",calc:"(deel : geheel) × 100\n("+num(v[1])+" : "+num(v[2])+") × 100 = "+pc(a2)};}
  var t3=pick([24,26,27,28,30]),f=rnd(6,12),l=rnd(3,8),rest=t3-f-l,a3=r(rest/t3*100,1);
  return {f:"perc",h:"Hoeveel procent van de klas komt met de bus of de auto? Bereken eerst hoeveel leerlingen dat zijn. Rond af op 1 decimaal.",body:"In klas 2B zitten "+t3+" leerlingen. "+f+" leerlingen fietsen en "+l+" lopen naar school. De rest komt met de bus of de auto.",a:a3,d:1,u:"%",calc:"Stap 1: "+t3+" − "+f+" − "+l+" = "+rest+" leerlingen\nStap 2: ("+rest+" : "+t3+") × 100 = "+pc(a3)};},
rente:function(L){
  if(L===1){var b=pick([200,500,800,1000,1500,2000]),p=pick([1,2,3,4]),a=r(p/100*b,2);return {f:"rente",h:"Hoeveel rente krijg je na een jaar?",body:"Op je spaarrekening staat "+eur(b)+". Je krijgt "+p+"% rente per jaar.",a:a,d:2,u:"€",calc:"(rentepercentage : 100) × spaarbedrag\n("+p+" : 100) × "+num(b)+" = "+eur(a)};}
  if(L===2){var b2=pick([240,450,600,850,1200,2500,3400]),p2=pick([0.5,0.75,1.1,1.2,1.4,1.5,1.6,1.8,2.1]),a2=r(p2/100*b2,2);return {f:"rente",h:"Hoeveel rente krijg je na een jaar? Rond af op 2 decimalen.",body:"Op je spaarrekening staat "+eur(b2)+". Je krijgt "+pc(p2)+" rente per jaar.",a:a2,d:2,u:"€",calc:"(rentepercentage : 100) × spaarbedrag\n("+nf1.format(p2)+" : 100) × "+num(b2)+" = "+eur(a2)};}
  if(Math.random()<0.5){var b3=pick([480,600,900,1200,2400]),p3=pick([1.2,1.5,1.8,2,2.4]),m=pick([3,4,6,8,9]),jr=r(p3/100*b3,2),a3=r(jr/12*m,2);
    return {f:"rente",h:"Hoeveel rente krijg je in "+m+" maanden? Bereken eerst de rente per jaar. Rond af op 2 decimalen.",body:"Je zet "+eur(b3)+" op een spaarrekening met "+pc(p3)+" rente per jaar. Na "+m+" maanden haal je het geld eraf.",a:a3,d:2,u:"€",calc:"Stap 1, per jaar: ("+nf1.format(p3)+" : 100) × "+num(b3)+" = "+eur(jr)+"\nStap 2: "+eur(jr)+" : 12 × "+m+" = "+eur(a3)};}
  var b4=pick([2000,5000,8500,12000]),q1=pick([0.5,0.75,0.9,1.1]),q2=r(q1+pick([0.3,0.45,0.6]),2),x1=r(q1/100*b4,2),x2=r(q2/100*b4,2),a4=r(x2-x1,2);
  return {f:"rente",h:"Hoeveel euro rente krijgt Bas per jaar méér dan Ryan? Rond af op 2 decimalen.",body:"Ryan en Bas hebben allebei "+eur(b4)+" op een spaarrekening. Ryan krijgt "+pc(q1)+" rente, Bas krijgt "+pc(q2)+".",a:a4,d:2,u:"€",calc:"Ryan: ("+nf1.format(q1)+" : 100) × "+num(b4)+" = "+eur(x1)+"\nBas: ("+nf1.format(q2)+" : 100) × "+num(b4)+" = "+eur(x2)+"\nVerschil: "+eur(x2)+" − "+eur(x1)+" = "+eur(a4)};},
lening:function(L){var TAB={5000:{24:225.28,36:155.82,60:100.49},15000:{24:671.40,36:462.96,60:269.82},25000:{24:1119.00,36:771.62,60:494.70}},K=pick([5000,15000,25000]),n=pick([24,36,60]),t=TAB[K][n],tot=r(t*n,2),kk=r(tot-K,2),
  tbl=stmt([["Kredietsom","24 mnd · 36 mnd · 60 mnd"]].concat([5000,15000,25000].map(function(x){return [eur(x),eur(TAB[x][24])+" · "+eur(TAB[x][36])+" · "+eur(TAB[x][60])];}))),
  body="Je leent "+eur(K)+" bij de bank en betaalt terug in "+n+" maanden. De maandtermijn staat in de tabel."+tbl,base="Maandtermijn (tabel): "+eur(t)+"\nTotaal terugbetaald: "+eur(t)+" × "+n+" = "+eur(tot);
  if(L===1)return {f:"totaal",h:"Hoeveel betaal je in totaal terug?",body:body,a:tot,d:2,u:"€",calc:base};
  if(L===2)return {f:"lening",h:"Wat zijn de kosten van de lening? Bereken eerst het totaal dat je terugbetaalt.",body:body,a:kk,d:2,u:"€",calc:base+"\nKosten = "+eur(tot)+" − "+eur(K)+" = "+eur(kk)};
  if(Math.random()<0.5){var a=r(kk/K*100,1);return {f:"perc",h:"Hoeveel procent van het geleende bedrag zijn de kosten van de lening? Bereken eerst de kosten. Rond af op 1 decimaal.",body:body,a:a,d:1,u:"%",calc:base+"\nKosten = "+eur(tot)+" − "+eur(K)+" = "+eur(kk)+"\n(deel : geheel) × 100 = ("+num(kk)+" : "+num(K)+") × 100 = "+pc(a)};}
  var n2=n===24?pick([36,60]):24,lo=Math.min(n,n2),hi=Math.max(n,n2),kl=r(TAB[K][lo]*lo-K,2),kh=r(TAB[K][hi]*hi-K,2),s=r(kh-kl,2);
  return {f:"lening",h:"Hoeveel euro bespaar je aan kosten als je in "+lo+" maanden terugbetaalt in plaats van in "+hi+" maanden?",body:"Je leent "+eur(K)+" bij de bank. Je twijfelt tussen "+lo+" en "+hi+" maanden. Gebruik de tabel."+tbl,a:s,d:2,u:"€",calc:hi+" maanden: "+eur(TAB[K][hi])+" × "+hi+" − "+eur(K)+" = "+eur(kh)+"\n"+lo+" maanden: "+eur(TAB[K][lo])+" × "+lo+" − "+eur(K)+" = "+eur(kl)+"\nBesparing: "+eur(kh)+" − "+eur(kl)+" = "+eur(s)};},
schade:function(L){
  if(L===1){var s=pick([300,450,600,800,1200]),e=pick([50,100,150]),a=s-e;return {f:"schade",h:"Hoeveel schadevergoeding krijg je?",body:"Je fiets is gestolen. Hij was "+eur(s)+" waard. Je eigen risico is "+eur(e)+".",a:a,d:2,u:"€",calc:"schade − eigen risico\n"+eur(s)+" − "+eur(e)+" = "+eur(a)};}
  if(L===2){if(Math.random()<0.5){var v=pick([["Op vakantie raak je je koffer kwijt. De schade is",rnd(25,90)*10],["Door een lekkage is je laptop kapot. De schade is",rnd(60,130)*10],["Bij een inbraak zijn spullen gestolen. De schade is",rnd(120,480)*10]]),e2=pick([75,100,150,250]),a2=v[1]-e2;return {f:"schade",h:"Hoeveel schadevergoeding krijg je?",body:v[0]+" "+eur(v[1])+". Je eigen risico is "+eur(e2)+".",a:a2,d:2,u:"€",calc:"schade − eigen risico\n"+eur(v[1])+" − "+eur(e2)+" = "+eur(a2)};}
    var p=money(4,25),a3=r(p*12,2);return {f:"premie",h:"Hoeveel premie betaal je per jaar? Rond af op 2 decimalen.",body:"De premie van je "+pick(["fietsverzekering","reisverzekering","telefoonverzekering"])+" is "+eur(p)+" per maand.",a:a3,d:2,u:"€",calc:"premie per maand × 12\n"+eur(p)+" × 12 = "+eur(a3)};}
  if(Math.random()<0.5){var s4=rnd(30,140)*10,e4=pick([50,75,100,150,250]),v4=s4-e4,a4=r(v4/s4*100,1);return {f:"schade",h:"Hoeveel procent van de schade krijg je vergoed? Bereken eerst de schadevergoeding. Rond af op 1 decimaal.",body:"De schade aan je spullen is "+eur(s4)+". Je eigen risico is "+eur(e4)+".",a:a4,d:1,u:"%",calc:"Stap 1: "+eur(s4)+" − "+eur(e4)+" = "+eur(v4)+" vergoed\nStap 2: ("+num(v4)+" : "+num(s4)+") × 100 = "+pc(a4)};}
  var lo=money(80,95),hi=r(lo+rnd(8,20),2),a5=r((hi-lo)*12,2);
  return {f:"premie",h:"Hoeveel euro premie bespaar je per jaar met het hoogste eigen risico? Rond af op 2 decimalen.",body:"Bij het hoogste eigen risico betaal je "+eur(lo)+" premie per maand. Bij het laagste eigen risico is dat "+eur(hi)+" per maand.",a:a5,d:2,u:"€",calc:"Verschil per maand: "+eur(hi)+" − "+eur(lo)+" = "+eur(r(hi-lo,2))+"\nPer jaar: "+eur(r(hi-lo,2))+" × 12 = "+eur(a5)+"\nHoger eigen risico = lagere premie."};},
afronden:function(L){
  if(L===1){var x=rnd(1,250)+rnd(1,9999)/10000,a=r(x,2);return {f:"afronden",h:"Noteer dit als geldbedrag.",body:"Uitkomst op je rekenmachine: <code>"+num(x).replace(/\./g,"")+"</code>",a:a,d:2,u:"€",calc:"Geld: twee cijfers achter de komma. Kijk naar het derde cijfer.\n"+num(x).replace(/\./g,"")+" → "+eur(a)};}
  if(L===2){var y=rnd(1,95)+rnd(1,999)/1000,b=r(y,1);return {f:"afronden",h:"Noteer dit als percentage.",body:"Uitkomst op je rekenmachine: <code>"+num(y)+"</code>",a:b,d:1,u:"%",calc:"Procenten: één cijfer achter de komma. Kijk naar het tweede cijfer.\n"+num(y)+" → "+pc(b)};}
  var t=pick([1250,2400,3600,4800]),q=pick([3,6,7,9]),w=t/q,a3=r(w,2);return {f:"afronden",h:"Hoeveel krijgt ieder? Reken uit en noteer het netjes als geldbedrag.",body:"Een prijs van "+eur(t)+" wordt eerlijk verdeeld over "+q+" personen.",a:a3,d:2,u:"€",calc:num(t)+" : "+q+" = "+num(r(w,4))+"…\nAfronden op 2 cijfers achter de komma: "+eur(a3)};},
gem:function(L){
  if(L===1){var xs=[rnd(5,9),rnd(5,9),rnd(5,9)],s=xs[0]+xs[1]+xs[2],a=r(s/3,1);return {f:"gem",h:"Wat is het gemiddelde cijfer? Rond af op 1 decimaal.",body:"Je haalt voor economie een "+xs.join(", een ")+".",a:a,d:1,u:"",calc:"Optellen en delen door het aantal:\n("+xs.join(" + ")+") : 3 = "+s+" : 3 = "+nf1.format(a)};}
  if(L===2){var n=rnd(4,6),ys=[],t=0;for(var i=0;i<n;i++){var v=rnd(8,20)/2;ys.push(v);t+=v;}var a2=r(t/n,1);return {f:"gem",h:"Wat is het gemiddelde cijfer? Rond af op 1 decimaal.",body:"Een speaker krijgt van de Consumentenbond deze cijfers: "+ys.map(function(v){return nf1.format(v);}).join(" · "),a:a2,d:1,u:"",calc:"("+ys.map(num).join(" + ")+") : "+n+" = "+num(t)+" : "+n+" = "+nf1.format(a2)};}
  var c1=rnd(4,9),c2=rnd(4,9),c3=rnd(4,9),tot=c1*2+c2+c3,a3=r(tot/4,1);return {f:"gem",h:"Wat is het gewogen gemiddelde? Rond af op 1 decimaal.",body:"De toets telt 2 keer mee, de twee so's tellen 1 keer mee. Toets: "+c1+". So's: "+c2+" en "+c3+".",a:a3,d:1,u:"",calc:"De toets telt dubbel:\n("+c1+" × 2 + "+c2+" + "+c3+") : 4 = "+tot+" : 4 = "+nf1.format(a3)};}
};

/* ---------- de route ---------- */
function mount(opt){
  var el=opt.el,MAP=opt.map,KEY="eco-route-"+MAP+"-v1",NK=opt.nk,HCODE=opt.h||("E"+MAP.charAt(1)+"H"+MAP.slice(3)).toUpperCase(),/* hoofdstukcode van de Worker, zoals in bron/toetsen.json: E2H2 */D=null,ST=load(),focus=null,cur=null,ronde=[],again=[],mode="route";
  function load(){try{var s=JSON.parse(localStorage.getItem(KEY));if(s&&typeof s==="object")return s;}catch(e){}return {lvl:{},str:{},n:{},ok:{},ins:{},tot:0,tok:0,hist:[]};}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(ST));}catch(e){}if(opt.onchange)opt.onchange(stand());}
  function L(d){return ST.lvl[d.id]||0;}
  function ster(l){return "★★★".slice(0,l)+"☆☆☆".slice(l);}
  function stand(){if(!D)return null;var n=D.doelen.length,k=D.doelen.filter(function(d){return L(d)===3;}).length,ins=D.doelen.filter(function(d){return !ST.ins[d.id];}).length;return {n:n,klaar:k,instap:ins,gedaan:ST.tot||0};}
  /* kies het volgende leerdoel: herkansing na een fout, anders gewogen op weinig sterren en recente fouten */
  function kies(){
    if(focus)return focus;
    again.forEach(function(a){a.na--;});
    if(again.length&&again[0].na<=0)return again.shift().d;
    var w=D.doelen.map(function(d){var l=L(d)||1,s=ST.str[d.id]||0,x=(4-l)*2+(s<0?3:0)+(ST.n[d.id]?0:2)+(cur&&cur.doel===d?-4:0);return Math.max(1,x);}),t=w.reduce(function(a,b){return a+b;},0),k=Math.random()*t;
    for(var i=0;i<w.length;i++){k-=w[i];if(k<=0)return D.doelen[i];}return D.doelen[D.doelen.length-1];}
  /* een vraag voor een leerdoel op een niveau: generator (rekenen) of uit de bank; niveau 3 met goede reeks: eerst de Worker */
  function vraag(d,l,ins){
    var bank=(d.bank&&d.bank[l])||[],kan=d.gen&&RG[d.gen];
    if(kan&&(!bank.length||Math.random()<0.7)){var g=RG[d.gen](l);return {t:"gen",doel:d,l:l,ins:ins,g:g};}
    if(!bank.length){for(var k=l-1;k>=1&&!bank.length;k--)bank=(d.bank&&d.bank[k])||[];if(!bank.length&&kan){var g2=RG[d.gen](l);return {t:"gen",doel:d,l:l,ins:ins,g:g2};}}
    var laatst=(ST.hist||[]).filter(function(h){return h.d===d.id;}).slice(-3).map(function(h){return h.q;}),pool=bank.filter(function(q,i){return laatst.indexOf(l+"-"+i)<0;});
    if(!pool.length)pool=bank;var q=pick(pool);return {t:q.t,doel:d,l:l,ins:ins,q:q,qi:l+"-"+bank.indexOf(q)};}
  function volgende(){
    var d=kies(),l=L(d),ins=false;
    if(!ST.ins[d.id]){l=2;ins=true;}
    if(mode==="instap"){var open=D.doelen.filter(function(x){return !ST.ins[x.id];});if(!open.length){mode="route";rondeKlaar(true);return;}d=open[0];l=2;ins=true;}
    cur=vraag(d,l||1,ins);
    /* verdieping: op drie sterren en drie keer goed op rij een nieuwe vraag van de Worker */
    if(!ins&&L(d)===3&&(ST.str[d.id]||0)>=3&&NK&&NK.enabled&&cur.t!=="gen"&&!cur.worker){toonWacht();maakWorker(d).then(function(q){if(q)cur={t:"mc",doel:d,l:3,q:q,worker:true};toon();});return;}
    toon();}
  function maakWorker(d){
    return NK.maak({vak:"eco2",onderwerpen:[d.t+" ("+HCODE+" "+d.par+")"],mc:1,open:0,niveau:3,fouten:(ST.hist||[]).filter(function(h){return h.d===d.id&&!h.ok;}).length}).then(function(f){
      var q=f&&f.status==="ok"&&f.mc&&f.mc[0];if(!q||!q.j||!q.f||q.f.length<3)return null;
      return {t:"mc",v:q.v||q.vraag||"",o:[q.j].concat(q.f.slice(0,3)),u:q.u||q.uitleg||""};}).catch(function(){return null;});}
  /* ---------- weergave ---------- */
  function kop(){var d=cur.doel,l=cur.l;return '<div class="rt-kop"><span class="rt-par">'+esc(d.par)+'</span><b>'+esc(d.t)+'</b><span class="rt-ster" aria-label="niveau '+l+' van 3">'+(cur.ins?"instap":ster(l))+'</span>'+(cur.worker?'<span class="rt-ai">AI-vraag</span>':'')+'</div>';}
  function toonWacht(){el.innerHTML='<div class="rt-card">'+kop()+'<p class="rt-wacht">De AI bedenkt een verdiepingsvraag voor jou… (ongeveer een halve minuut)</p><p><button class="rt-btn ghost" id="rtSkip">Liever een vraag uit de bank</button></p></div>';}
  function toon(){
    var h='<div class="rt-card rt-in">'+kop();
    if(cur.t==="mc"){cur.opts=shuffle(cur.q.o.map(function(t,i){return {t:t,ok:i===0};}));
      h+='<p class="rt-q">'+esc(cur.q.v)+'</p><div class="rt-opts">'+cur.opts.map(function(o,n){return '<button class="rt-opt" data-opt="'+n+'"><span>'+"ABCD"[n]+'</span>'+esc(o.t)+'</button>';}).join("")+'</div><div id="rtFb"></div>';}
    else if(cur.t==="open"){h+='<p class="rt-q">'+esc(cur.q.v)+'</p>'+(cur.q.bron?'<div class="rt-bron">'+esc(cur.q.bron)+'</div>':'')+'<textarea id="rtOpen" maxlength="800" placeholder="Typ je antwoord. Gebruik geen namen."></textarea><p class="rt-tip">'+cur.q.p+' punt'+(cur.q.p>1?"en":"")+'. De AI kijkt je antwoord na; lukt dat niet, dan kijk je zelf na met het antwoordmodel.</p><div class="rt-btns"><button class="rt-btn" id="rtOpenGo">Laat nakijken</button></div><div id="rtFb"></div>';}
    else{var g=cur.g;cur.fase=1;
      h+='<div class="rt-stap">Stap 1 van 2 · Welke formule gebruik je?</div><p class="rt-q">'+(g.body.indexOf("<table")===0?"":esc(g.body))+'</p>'+(g.body.indexOf("<table")===0?g.body:"")+'<p class="rt-h">'+esc(g.h)+'</p>'
        +'<div class="rt-fin"><input id="rtF" autocomplete="off" autocapitalize="off" placeholder="Schrijf de formule op"><button class="rt-btn" id="rtFGo">Verder</button></div>'
        +'<p class="rt-tip"><button class="rt-link" id="rtKaart">Formule opzoeken</button></p><div class="rt-kaart" id="rtKaartBox" '+(cur.l===1?'':'hidden')+'>'+kaart()+'</div><div id="rtFb"></div>';}
    el.innerHTML=h+'</div>';var f=el.querySelector("input,textarea");if(f&&!RM)setTimeout(function(){try{f.focus({preventScroll:true});}catch(e){}},50);}
  function kaart(){var keys={};D.doelen.forEach(function(d){if(d.gen)(FORMKEYS[d.gen]||[]).forEach(function(k){keys[k]=1;});});
    return '<div class="rt-kaart-in"><b>Formulekaart</b>'+Object.keys(keys).map(function(k){return '<button class="rt-fk" data-fk="'+k+'">'+esc(FORMULES[k].t)+'</button>';}).join("")+'</div>';}
  var FORMKEYS={maand:["maand","week","budget"],budget:["budget","maand"],saldo:["saldo","terug"],pct:["pct","procvan","perc"],procvan:["procvan","pct","perc"],perc:["perc","procvan","pct"],rente:["rente","procvan"],lening:["totaal","lening","perc"],schade:["schade","premie","perc"],afronden:["afronden"],gem:["gem"]};
  /* ---------- nakijken en bijwerken ---------- */
  function klaar(ok,fbHtml,half){
    var d=cur.doel,id=d.id,was=L(d)||0,msg="";
    ST.n[id]=(ST.n[id]||0)+1;if(ok)ST.ok[id]=(ST.ok[id]||0)+1;ST.tot=(ST.tot||0)+1;if(ok)ST.tok=(ST.tok||0)+1;
    if(cur.ins){ST.ins[id]=1;ST.lvl[id]=ok?2:1;ST.str[id]=ok?1:0;msg=ok?"Je begint dit leerdoel op twee sterren.":"Je begint dit leerdoel op één ster. Dat is prima: je bouwt het op.";}
    else{var s=ST.str[id]||0;s=ok?Math.max(1,s+1):Math.min(-1,s-1);if(half)s=0;
      if(s>=2&&was<3){ST.lvl[id]=was+1;s=0;msg="Een ster erbij: "+ster(was+1)+". De volgende vraag is een stapje moeilijker.";}
      else if(s<=-2&&was>1){ST.lvl[id]=was-1;s=0;msg="Even een stapje terug: "+ster(was-1)+". Zo bouw je het weer op.";}
      else if(!ok)msg="Dit leerdoel komt zo nog een keer terug.";
      ST.str[id]=s;if(!ok)again.push({d:d,na:3});}
    ST.hist=(ST.hist||[]).concat([{d:id,l:cur.l,ok:ok?1:0,q:cur.qi||"",t:Date.now()}]).slice(-60);
    ronde.push({d:d,ok:ok,van:was,naar:L(d)});save();
    var fb=el.querySelector("#rtFb");fb.innerHTML=fbHtml+(msg?'<p class="rt-msg">'+esc(msg)+'</p>':'')+'<div class="rt-btns"><button class="rt-btn" id="rtNext">'+(ronde.length>=8&&mode!=="instap"?"Bekijk je ronde":"Volgende vraag")+' →</button>'+(focus?'<button class="rt-btn ghost" id="rtHome">Stop</button>':'')+'</div>';
    el.querySelectorAll(".rt-opt").forEach(function(b){b.disabled=true;});
    var nb=el.querySelector("#rtNext");if(nb&&!RM)nb.scrollIntoView({block:"nearest",behavior:"smooth"});}
  function uitlegHtml(ok,u){return '<div class="rt-fb '+(ok?"ok":"no")+'">'+(ok?"✓ Goed! ":"✗ Nog niet. ")+esc(u||"")+'</div>';}
  function checkGetal(){var g=cur.g,inp=el.querySelector("#rtA"),v=parse(inp.value,g.d),res=verdict(v,g.a,g.d,g.abs);if(!res)return;
    inp.disabled=true;el.querySelector("#rtAGo").disabled=true;var ok=res==="ok",tekst=ok?"✓ Helemaal goed!":res==="sign"?"Bijna! Let op het teken: stijging (+) of daling (−).":res==="mid"?"Bijna! Controleer je afronding.":"✗ Dat klopt niet.";
    klaar(ok&&cur.fOk,'<div class="rt-fb '+(ok?"ok":"no")+'">'+tekst+(ok&&!cur.fOk?" Maar de formule klopte nog niet; daarom telt deze nog niet als goed.":"")+'<span class="rt-calc">'+esc(g.calc)+'</span></div>');}
  function checkFormule(){var g=cur.g,inp=el.querySelector("#rtF"),ok=formuleOk(g.f,inp.value);if(inp.value.trim().length<2){inp.focus();return;}
    cur.fase=2;cur.fOk=ok;inp.disabled=true;el.querySelector("#rtFGo").disabled=true;var kb=el.querySelector("#rtKaartBox");if(kb)kb.hidden=true;
    el.querySelector("#rtFb").innerHTML='<div class="rt-fb '+(ok?"ok":"no")+'">'+(ok?"✓ Goede formule: ":"✗ Niet deze. De formule is: ")+'<b>'+esc(FORMULES[g.f].t)+'</b></div><div class="rt-stap">Stap 2 van 2 · Reken het uit</div><div class="rt-fin"><span class="rt-eenh">'+(g.u==="€"?"€":"")+'</span><input id="rtA" inputmode="decimal" autocomplete="off" placeholder="je antwoord"><span class="rt-eenh">'+(g.u==="%"?"%":"")+'</span><button class="rt-btn" id="rtAGo">Controleer</button></div><div id="rtFb2"></div>';
    var a=el.querySelector("#rtA");a.focus();a.addEventListener("keydown",function(e){if(e.key==="Enter")checkGetal();});}
  function checkOpen(){var q=cur.q,ta=el.querySelector("#rtOpen"),ans=ta.value.trim(),btn=el.querySelector("#rtOpenGo");if(ans.length<3){ta.focus();return;}
    btn.disabled=true;btn.textContent="Bezig met nakijken…";ta.disabled=true;
    var zelf=function(melding){el.querySelector("#rtFb").innerHTML='<div class="rt-fb mid">'+(melding?esc(melding)+" ":"")+'Kijk zelf na met het antwoordmodel.</div><div class="rt-model"><b>Antwoordmodel</b><p>'+esc(q.model)+'</p><ul>'+q.g.map(function(x){return '<li>'+esc(x.t)+' ('+x.p+' p)</li>';}).join("")+'</ul></div><p class="rt-h">Had jij dit?</p><div class="rt-btns"><button class="rt-btn" data-zelf="1">Ja, alles</button><button class="rt-btn ghost" data-zelf="2">Een deel</button><button class="rt-btn ghost" data-zelf="0">Nee</button></div>';};
    if(!NK||!NK.enabled){zelf("");return;}
    NK.check({h:[HCODE],vak:"economie",vraag:q.v,punten:q.g.map(function(x){return {t:x.t,p:x.p};}),bron:"ANTWOORDMODEL VAN DE DOCENT:\n"+q.model,antwoord:ans.slice(0,2000)}).then(function(f){
      if(f.status!=="ok"){zelf(f.melding||"De AI kon nu niet nakijken.");return;}
      var ok=f.punten>=f.max,half=!ok&&f.punten>0;klaar(ok,NK.render(f)+'<div class="rt-model"><b>Antwoordmodel</b><p>'+esc(q.model)+'</p></div>',half);});}
  el.addEventListener("click",function(e){
    var b;
    if((b=e.target.closest("[data-opt]"))&&cur&&cur.t==="mc"&&!b.disabled){var o=cur.opts[+b.dataset.opt];el.querySelectorAll(".rt-opt").forEach(function(x,i){x.disabled=true;if(cur.opts[i].ok)x.classList.add("right");else if(x===b)x.classList.add("wrong");});klaar(o.ok,uitlegHtml(o.ok,cur.q.u));return;}
    if(e.target.closest("#rtFGo")){checkFormule();return;}
    if(e.target.closest("#rtAGo")){checkGetal();return;}
    if(e.target.closest("#rtOpenGo")){checkOpen();return;}
    if((b=e.target.closest("[data-zelf]"))){var z=+b.dataset.zelf;el.querySelectorAll("[data-zelf]").forEach(function(x){x.disabled=true;});klaar(z===1,'<div class="rt-fb '+(z===1?"ok":z===2?"mid":"no")+'">'+(z===1?"✓ Goed zo.":z===2?"Een deel goed. Lees het model nog eens.":"Nog niet. Lees het model nog eens.")+'</div>',z===2);return;}
    if(e.target.closest("#rtKaart")){var kb=el.querySelector("#rtKaartBox");kb.hidden=!kb.hidden;return;}
    if((b=e.target.closest("[data-fk]"))){var inp=el.querySelector("#rtF");if(inp&&!inp.disabled){inp.value=FORMULES[b.dataset.fk].t;inp.focus();}return;}
    if(e.target.closest("#rtSkip")){cur.worker=true;toon();return;}
    if(e.target.closest("#rtNext")){if(ronde.length>=8&&mode!=="instap")rondeKlaar(false);else volgende();return;}
    if(e.target.closest("#rtStart")){mode="route";ronde=[];volgende();return;}
    if(e.target.closest("#rtInstap")){mode="instap";ronde=[];volgende();return;}
    if(e.target.closest("#rtHome")){focus=null;mode="route";home();return;}
    if((b=e.target.closest("[data-doel]"))){focus=D.doelen.filter(function(d){return d.id===b.dataset.doel;})[0]||null;ronde=[];volgende();return;}
    if(e.target.closest("#rtCode")){code();return;}
    if(e.target.closest("#rtKopie")){var t=el.querySelector("#rtCodeTxt");t.focus();t.select();var ok2=function(){el.querySelector("#rtCodeMsg").textContent="Gekopieerd. Plak de code in Teams of Magister.";};
      if(navigator.clipboard)navigator.clipboard.writeText(t.value).then(ok2,function(){document.execCommand("copy");ok2();});else{document.execCommand("copy");ok2();}return;}
  });
  el.addEventListener("keydown",function(e){if(e.key==="Enter"&&e.target.id==="rtF"){e.preventDefault();checkFormule();}});
  function rondeKlaar(instap){var n=ronde.length,g=ronde.filter(function(x){return x.ok;}).length,ups=ronde.filter(function(x){return x.naar>x.van;}),downs=ronde.filter(function(x){return x.naar<x.van;});
    el.innerHTML='<div class="rt-card rt-in"><div class="rt-eyebrow">'+(instap?"Instaptoets klaar":"Ronde klaar")+'</div><h3 class="rt-h2">'+g+' van '+n+' goed.</h3>'
      +(instap?'<p>Je route is ingesteld. Elk leerdoel begint op het niveau dat bij jou past.</p>':'')
      +(ups.length?'<p class="rt-up">★ Ster erbij: '+ups.map(function(x){return esc(x.d.t);}).join(", ")+'</p>':'')+(downs.length?'<p class="rt-down">Stapje terug: '+downs.map(function(x){return esc(x.d.t);}).join(", ")+'</p>':'')
      +'<div class="rt-btns"><button class="rt-btn" id="rtStart">Verder oefenen →</button><button class="rt-btn ghost" id="rtHome">Overzicht</button></div></div>';ronde=[];}
  function home(){var s=stand(),pars={};D.doelen.forEach(function(d){(pars[d.par]=pars[d.par]||[]).push(d);});
    el.innerHTML='<div class="rt-home rt-in"><div class="rt-top"><div><div class="rt-eyebrow">Mijn route</div><h3 class="rt-h2">'+(s.gedaan?"Ga verder op jouw niveau.":"Oefenen op jouw niveau.")+'</h3><p>Elk leerdoel heeft drie sterren. Goed? Dan wordt het een stapje moeilijker. Fout? Dan krijg je uitleg en komt de vraag later terug.</p></div>'
      +'<div class="rt-btns">'+(s.instap===s.n?'<button class="rt-btn" id="rtInstap">Start met de instaptoets ('+s.n+' korte vragen)</button><button class="rt-btn ghost" id="rtStart">Liever meteen oefenen</button>':'<button class="rt-btn" id="rtStart">'+(s.gedaan?"Verder oefenen":"Start")+' →</button>'+(s.instap?'<button class="rt-btn ghost" id="rtInstap">Instaptoets afmaken ('+s.instap+')</button>':'')+'<button class="rt-btn ghost" id="rtCode">Voortgangscode</button>')+'</div></div>'
      +'<div class="rt-stand"><b>'+s.klaar+'</b> van '+s.n+' leerdoelen op drie sterren · '+(ST.tot||0)+' vragen gemaakt</div>'
      +Object.keys(pars).map(function(p){return '<div class="rt-par-h">Paragraaf '+esc(p)+'</div><div class="rt-doelen">'+pars[p].map(function(d){var l=L(d),n=ST.n[d.id]||0,o=ST.ok[d.id]||0;return '<button class="rt-doel l'+l+'" data-doel="'+esc(d.id)+'"><span class="rt-ster">'+(ST.ins[d.id]?ster(l):"nog geen niveau")+'</span><b>'+esc(d.t)+'</b><small>'+(n?o+" van "+n+" goed":"Tik om dit leerdoel te oefenen")+'</small></button>';}).join("")+'</div>';}).join("")
      +'<div id="rtCodeBox"></div></div>';}
  /* voortgangscode: per leerdoel het niveau (0 = nog niet gestart), met datum en controlesom; lezen met tools/voortgang-lezen.html */
  function codeCheck(t){var h=2166136261;for(var i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return ("0"+(h%1296).toString(36)).slice(-2).toUpperCase();}
  function code(){var d=new Date(),yy=("0"+(d.getFullYear()%100)).slice(-2),mm=("0"+(d.getMonth()+1)).slice(-2),dd=("0"+d.getDate()).slice(-2),dig=D.doelen.map(function(x){return L(x);}).join(""),t="RT-"+MAP.toUpperCase()+"-"+yy+mm+dd+"-"+dig,c=t+"-"+codeCheck(t);
    el.querySelector("#rtCodeBox").innerHTML='<div class="rt-codebox"><b>Jouw voortgangscode</b><p>Lever deze code in bij je docent (Teams of Magister). Er staat geen naam in: alleen per leerdoel je niveau.</p><textarea id="rtCodeTxt" readonly rows="2">'+c+'</textarea><div class="rt-btns"><button class="rt-btn" id="rtKopie">Kopieer de code</button></div><p class="rt-tip" id="rtCodeMsg"></p></div>';}
  /* ---------- opmaak (kleuren van de pagina) ---------- */
  if(!document.getElementById("rt-css")){var css=document.createElement("style");css.id="rt-css";css.textContent=
    '.rt-in{animation:rtin .4s cubic-bezier(.23,1,.32,1)}@keyframes rtin{from{opacity:0;transform:translateY(8px)}}@media (prefers-reduced-motion:reduce){.rt-in{animation:none}}'
    +'.rt-card,.rt-home{max-width:780px}.rt-eyebrow{font-size:12px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:var(--berry)}.rt-h2{font:700 clamp(24px,3.4vw,34px)/1.1 Fraunces,Georgia,serif;margin:6px 0 10px}'
    +'.rt-top p{color:var(--muted);max-width:56ch;margin:0 0 14px}.rt-stand{font-size:14px;color:var(--muted);margin:18px 0 6px}.rt-par-h{font-size:12.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--teal,#2f8f86);margin:18px 0 8px}'
    +'.rt-doelen{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,230px),1fr));gap:10px}.rt-doel{display:flex;flex-direction:column;align-items:flex-start;gap:4px;text-align:left;padding:14px 16px;border:1.5px solid var(--line);border-radius:16px;background:var(--card);color:var(--ink);font:inherit;cursor:pointer;transition:border-color .16s,transform .16s}.rt-doel:hover{border-color:var(--berry)}.rt-doel:active{transform:scale(.98)}'
    +'.rt-doel b{font-size:15px;line-height:1.3}.rt-doel small{color:var(--muted);font-size:12.5px}.rt-ster{font-size:13px;font-weight:800;letter-spacing:2px;color:var(--p4,#b97a1f)}.rt-doel.l3{border-color:var(--teal,#2f8f86)}.rt-doel.l0 .rt-ster{letter-spacing:0;color:var(--muted);font-weight:600}'
    +'.rt-kop{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px;font-size:14px}.rt-kop b{font-weight:700}.rt-par{font-size:12px;font-weight:800;padding:3px 8px;border-radius:8px;background:var(--berry);color:#fff}.rt-ai{font-size:12px;font-weight:800;padding:3px 8px;border-radius:8px;background:var(--teal,#2f8f86);color:#fff}'
    +'.rt-q{font:700 clamp(19px,2.4vw,24px)/1.35 Fraunces,Georgia,serif;margin:4px 0 12px}.rt-h{font-weight:700;margin:10px 0 8px}.rt-stap{font-size:12.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--teal,#2f8f86);margin:14px 0 6px}'
    +'.rt-opts{display:grid;gap:8px}.rt-opt{display:flex;gap:12px;align-items:center;min-height:52px;border:2px solid var(--line);background:var(--card);color:var(--ink);border-radius:14px;padding:12px 14px;text-align:left;font:600 15.5px/1.35 Inter,system-ui,sans-serif;cursor:pointer;touch-action:manipulation}.rt-opt:hover:not(:disabled){border-color:var(--berry)}.rt-opt span{flex:none;width:30px;height:30px;border-radius:9px;background:color-mix(in srgb,var(--line) 60%,transparent);display:grid;place-items:center;font-weight:800;font-size:13px}'
    +'.rt-opt.right{border-color:var(--ok,#1d8a5a);background:var(--ok-soft,#e1f4ea)}.rt-opt.wrong{border-color:var(--bad,#c0392b);background:var(--bad-soft,#fbe9e7)}.rt-opt:disabled{cursor:default}'
    +'.rt-fb{margin-top:12px;border-radius:12px;padding:12px 14px;font-size:14.5px;line-height:1.45}.rt-fb.ok{background:var(--ok-soft,#e1f4ea)}.rt-fb.no{background:var(--bad-soft,#fbe9e7)}.rt-fb.mid{background:var(--warn-soft,#fff3d6)}.rt-calc{display:block;margin-top:6px;white-space:pre-wrap;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13.5px}'
    +'.rt-msg{font-weight:700;margin:10px 0 0}.rt-btns{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}.rt-btn{border:0;border-radius:999px;padding:11px 18px;font:700 15px Inter,system-ui,sans-serif;background:var(--coral,#ff8d90);color:#3a1412;cursor:pointer;min-height:44px}.rt-btn.ghost{background:var(--card);color:var(--ink);border:1.5px solid var(--line)}.rt-btn:disabled{opacity:.5;cursor:default}'
    +'.rt-fin{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:8px}.rt-fin input{flex:1 1 200px;min-width:0;border:2px solid var(--line);border-radius:12px;background:var(--card);color:var(--ink);font:inherit;font-size:17px;padding:10px 12px}.rt-fin input:focus{outline:0;border-color:var(--berry)}.rt-eenh{font-weight:700;color:var(--muted)}.rt-eenh:empty{display:none}'
    +'.rt-link{border:0;background:none;padding:0;font:600 14px Inter,system-ui,sans-serif;color:var(--berry);text-decoration:underline;cursor:pointer}.rt-tip{font-size:13.5px;color:var(--muted);margin:10px 0 0}'
    +'.rt-kaart[hidden]{display:none}.rt-kaart-in{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:8px;padding:10px 12px;border-radius:12px;background:color-mix(in srgb,var(--line) 35%,transparent)}.rt-kaart-in b{width:100%;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em}.rt-fk{border:1.5px solid var(--line);background:var(--card);color:var(--ink);border-radius:999px;padding:6px 12px;font:600 13.5px Inter,system-ui,sans-serif;cursor:pointer}.rt-fk:hover{border-color:var(--berry)}'
    +'.rt-tbl{border-collapse:collapse;margin:4px 0 8px;font-size:15px;min-width:260px}.rt-tbl td{padding:6px 12px;border-bottom:1px solid var(--line)}.rt-tbl td:last-child{text-align:right;font-family:ui-monospace,Menlo,Consolas,monospace}.rt-tbl tr.ask td{font-weight:800;color:var(--berry)}'
    +'textarea#rtOpen,#rtCodeTxt{width:100%;min-height:110px;border:2px solid var(--line);border-radius:12px;padding:12px 14px;font:inherit;font-size:15.5px;background:var(--card);color:var(--ink);resize:vertical}#rtCodeTxt{min-height:0;font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:700}textarea#rtOpen:focus{outline:0;border-color:var(--berry)}'
    +'.rt-model{margin-top:10px;border-left:4px solid var(--line);padding:6px 12px;color:var(--muted);font-size:14px}.rt-model p{margin:4px 0}.rt-model ul{margin:4px 0 0;padding-left:18px}.rt-bron{border-left:4px solid var(--teal,#2f8f86);padding:6px 12px;margin:0 0 10px;font-size:14.5px}'
    +'.rt-wacht{color:var(--muted)}.rt-up{color:var(--ok,#1d8a5a);font-weight:700}.rt-down{color:var(--muted)}.rt-codebox{margin-top:18px;padding:14px 16px;border:1.5px solid var(--line);border-radius:16px;background:var(--card)}.rt-codebox p{margin:4px 0 10px;color:var(--muted);font-size:14px}';
    document.head.appendChild(css);}
  fetch(opt.url).then(function(r){return r.json();}).then(function(d){D=d;window.EcoRouteApp={stand:stand,focus:function(id){focus=D.doelen.filter(function(x){return x.id===id;})[0]||null;if(focus){ronde=[];volgende();}else home();},home:home};
    var h=location.hash.split("/");if(h[0]==="#route"&&h[1]==="doel"&&h[2])window.EcoRouteApp.focus(h[2]);else home();if(opt.onchange)opt.onchange(stand());})
    .catch(function(){el.innerHTML='<p class="rt-tip">De oefenroute kon niet laden. Probeer het opnieuw.</p>';});
}
window.EcoRoute={mount:mount,RG:RG,FORMULES:FORMULES,formuleOk:formuleOk};
})();
