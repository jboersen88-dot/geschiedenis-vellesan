var FORM={
kostprijs:"(vaste kosten + variabele kosten) : aantal producten",
afschr:"(aanschafprijs − restwaarde) : aantal gebruiksjaren",
verkoop:"(inkoopprijs : 100) × (100 + opslag)",
consument:"(verkoopprijs : 100) × (100 + btw)",
exbtw:"(prijs inclusief btw : 121) × 100, of : 109 bij 9% btw",
inkoop:"eerst btw eruit, dan (verkoopprijs : (100 + opslag)) × 100",
marge:"(verkoopprijs − inkoopprijs) : inkoopprijs × 100",
btw:"(percentage : 100) × omzet exclusief btw",
omzet:"afzet × verkoopprijs",
winst:"omzet − inkoopwaarde − bedrijfskosten",
arbprod:"totale productie per periode : aantal werkenden",
evenwicht:"de prijs waarbij gevraagd = aangeboden",
marktaandeel:"(eigen afzet : totale afzet) × 100",
pct:"(nieuw − oud) : oud × 100"
};

var MODES=[["kostprijs","Kostprijs"],["afschr","Afschrijving"],["prijs","Verkoop- en consumentenprijs"],["marge","Brutowinstmarge"],["btw","Btw"],["winst","Omzet en winst"],["arbprod","Arbeidsproductiviteit"],["markt","Vraag en aanbod"],["aandeel","Marktaandeel"],["pct","Procent verandering"]];

var RGEN={
kostprijs:function(){var v=pick([["scooters",rnd(20,40)*1000,rnd(60,120)*100000,rnd(30,70)*100000],["taarten",rnd(30,60)*1000,rnd(180,260)*1000,rnd(80,140)*1000],["fietsen",rnd(10,20)*1000,rnd(200,300)*1000,rnd(900,1400)*1000],["banken",rnd(25,40)*100,rnd(800,1000)*1000,rnd(1100,1500)*1000],["shirts",rnd(60,80)*10000,rnd(900,1000)*1000,rnd(300,400)*1000]]),k=rnd(1,4),n=v[1],vk=v[2],vr=v[3],a=r((vk+vr)/n,2);
if(k<=3)return{f:"kostprijs",h:"Bereken de kostprijs per stuk. (2 decimalen)",body:qp("Een fabriek maakt per jaar "+num(n)+" "+v[0]+". De vaste kosten zijn "+eur(vk)+" en de variabele kosten "+eur(vr)+"."),a:a,d:2,u:"€",calc:"Kostprijs = (vaste kosten + variabele kosten) : aantal producten\n("+num(vk)+" + "+num(vr)+") : "+num(n)+" = "+num(vk+vr)+" : "+num(n)+" = "+eur(a)};
var n2=Math.round(n*rnd(85,95)/100),vr2=r(vr/n*n2,2),a2=r((vk+vr2)/n2,2);
return{f:"kostprijs",h:"Bereken de nieuwe kostprijs per stuk. (2 decimalen)",body:qp("Een fabriek maakte "+num(n)+" "+v[0]+". Vaste kosten "+eur(vk)+", variabele kosten "+eur(vr)+". Het jaar daarna maakt de fabriek er nog maar "+num(n2)+". De variabele kosten per stuk blijven gelijk."),a:a2,d:2,u:"€",calc:"Variabele kosten per stuk: "+num(vr)+" : "+num(n)+" = "+eur(r(vr/n,4))+"\nNieuwe variabele kosten: "+num(n2)+" × "+num(r(vr/n,4))+" = "+eur(vr2)+"\nKostprijs = ("+num(vk)+" + "+num(vr2)+") : "+num(n2)+" = "+eur(a2)+"\nDe vaste kosten worden over minder producten verdeeld: de kostprijs stijgt."};},
afschr:function(){var ap=rnd(150,1000)*100,j=pick([4,5,6,8,10]),rw=Math.round(ap*rnd(10,30)/100/100)*100,a=r((ap-rw)/j,2),k=rnd(1,4),it=pick(["een bestelbus","een machine","een heftruck","een oven","een koelcel"]);
if(k<=2)return{f:"afschr",h:"Bereken de afschrijving per jaar. (2 decimalen)",body:qp("Een bedrijf koopt "+it+" voor "+eur(ap)+". Na "+j+" jaar is de restwaarde "+eur(rw)+"."),a:a,d:2,u:"€",calc:"Afschrijving per jaar = (aanschafprijs − restwaarde) : aantal gebruiksjaren\n("+num(ap)+" − "+num(rw)+") : "+j+" = "+eur(a)};
if(k===3){var y=rnd(1,j-1),bw=r(ap-y*a,2);return{f:"afschr",h:"Wat is de boekwaarde na "+y+" jaar? (2 decimalen)",body:qp("Je koopt "+it+" voor "+eur(ap)+". Je schrijft in "+j+" jaar af tot een restwaarde van "+eur(rw)+"."),a:bw,d:2,u:"€",calc:"Afschrijving per jaar: ("+num(ap)+" − "+num(rw)+") : "+j+" = "+eur(a)+"\nNa "+y+" jaar: "+num(ap)+" − ("+y+" × "+num(a)+")"+" = "+eur(bw)};}
var pm=pick([250,300,450,500,600]),ja=pick([5,6,8,9]),rw2=rnd(30,140)*100,ap2=ja*12*pm+rw2;
return{f:"afschr",h:"Wat was de aanschafprijs? (2 decimalen)",body:qp("Je verkoopt "+it+" na "+ja+" jaar voor de restwaarde van "+eur(rw2)+". De afschrijving was "+eur(pm)+" per maand."),a:ap2,d:2,u:"€",calc:"Afschrijving in "+ja+" jaar: "+ja+" × 12 × "+num(pm)+" = "+eur(ja*12*pm)+"\nAanschafprijs = "+eur(ja*12*pm)+" + "+eur(rw2)+" = "+eur(ap2)};},
prijs:function(){var ip=money(20,900),m=pick([25,30,32,35,40,42,45,50,60,75]),bt=pick([21,21,9]),vp=r(ip*(100+m)/100,2),cp=r(vp*(100+bt)/100,2),k=rnd(1,4),it=pick(["een jas","een tablet","een fiets","een koptelefoon","een stoel","een boek","een taart"]);
if(k===1)return{f:"verkoop",h:"Bereken de verkoopprijs (exclusief btw). (2 decimalen)",body:qp("Een winkel koopt "+it+" in voor "+eur(ip)+" en rekent een brutowinstopslag van "+m+"%."),a:vp,d:2,u:"€",calc:"Verkoopprijs = (inkoopprijs : 100) × (100 + opslag)\n("+num(ip)+" : 100) × "+(100+m)+" = "+eur(vp)};
if(k===2)return{f:"consument",h:"Bereken de consumentenprijs. (2 decimalen)",body:qp("Een winkel koopt "+it+" in voor "+eur(ip)+". De brutowinstopslag is "+m+"% en de btw is "+bt+"%."),a:cp,d:2,u:"€",calc:"Stap 1 · verkoopprijs: ("+num(ip)+" : 100) × "+(100+m)+" = "+eur(vp)+"\nStap 2 · consumentenprijs: ("+num(vp)+" : 100) × "+(100+bt)+" = "+eur(cp)+"\nLet op: opslag en btw nooit bij elkaar optellen!"};
if(k===3){var ex=r(cp/(100+bt)*100,2);return{f:"exbtw",h:"Wat is de prijs exclusief btw? (2 decimalen)",body:qp(it.charAt(0).toUpperCase()+it.slice(1)+" kost in de winkel "+eur(cp)+" inclusief "+bt+"% btw."),a:ex,d:2,u:"€",calc:"Prijs exclusief btw = (prijs inclusief btw : "+(100+bt)+") × 100\n("+num(cp)+" : "+(100+bt)+") × 100 = "+eur(ex)};}
var ip2=r(vp/(100+m)*100,2);return{f:"inkoop",h:"Bereken de inkoopprijs. (2 decimalen)",body:qp(it.charAt(0).toUpperCase()+it.slice(1)+" kost "+eur(cp)+" inclusief "+bt+"% btw. De winkel rekent een brutowinstopslag van "+m+"%."),a:ip2,d:2,u:"€",calc:"Stap 1 · btw eruit: ("+num(cp)+" : "+(100+bt)+") × 100 = "+eur(vp)+"\nStap 2 · opslag eruit: ("+num(vp)+" : "+(100+m)+") × 100 = "+eur(ip2)};},
marge:function(){var ip=money(1,400),m=rnd(15,95),vp=r(ip*(100+m)/100,2),a=r((vp-ip)/ip*100,1);
return{f:"marge",h:"Bereken de brutowinstmarge in procenten van de inkoopprijs. (1 decimaal)",body:qp("Een winkelier koopt een product in voor "+eur(ip)+" en verkoopt het voor "+eur(vp)+" (exclusief btw)."),a:a,d:1,u:"%",calc:"Brutowinst per stuk: "+num(vp)+" − "+num(ip)+" = "+eur(r(vp-ip,2))+"\nBrutowinstmarge = (brutowinst : inkoopprijs) × 100\n("+num(r(vp-ip,2))+" : "+num(ip)+") × 100 = "+pc(a)};},
btw:function(){var o=rnd(60,250)*100,bt=pick([21,9]),k=rnd(1,3),pm=r(o*bt/100,2);
if(k===1)return{f:"btw",h:"Hoeveel btw draagt de ondernemer per kwartaal af? (2 decimalen)",body:qp("Een "+pick(["hovenier","kapper","schilder","fietsenmaker"])+" heeft per maand een omzet van "+eur(o)+" (exclusief "+bt+"% btw). Eens per kwartaal draagt hij de btw af."),a:r(pm*3,2),d:2,u:"€",calc:"Btw per maand: ("+bt+" : 100) × "+num(o)+" = "+eur(pm)+"\nPer kwartaal: 3 × "+eur(pm)+" = "+eur(r(pm*3,2))};
var inn=money(200,700),ink=r(inn*1.21,2),vp=r(inn*(100+rnd(20,50))/100,2),vk=r(vp*1.21,2),bi=r(ink-inn,2),bv=r(vk-vp,2),a=r(bv-bi,2);
return{f:"btw",h:"Hoeveel btw moet de winkelier per product aan de Belastingdienst afdragen? (2 decimalen)",body:qp("Een winkelier koopt een computer in voor "+eur(ink)+" inclusief 21% btw. Hij verkoopt hem voor "+eur(vk)+" inclusief 21% btw."),a:a,d:2,u:"€",calc:"Btw bij inkoop: "+num(ink)+" − ("+num(ink)+" : 121 × 100) = "+eur(bi)+"\nBtw bij verkoop: "+num(vk)+" − ("+num(vk)+" : 121 × 100) = "+eur(bv)+"\nAfdragen: "+eur(bv)+" − "+eur(bi)+" = "+eur(a)};},
winst:function(){var af=rnd(80,300)*100,p=money(2,15),om=r(af*p,2),iw=r(om*rnd(20,45)/100,2),k=rnd(1,3);
if(k===1)return{f:"omzet",h:"Bereken de omzet. (2 decimalen)",body:qp("Een bedrijf verkoopt "+num(af)+" producten voor "+eur(p)+" per stuk (exclusief btw)."),a:om,d:2,u:"€",calc:"Omzet = afzet × verkoopprijs\n"+num(af)+" × "+num(p)+" = "+eur(om)};
var c=[["Personeelskosten",r(om*rnd(15,30)/100,2)],["Huur",money(3000,9000)],["Energie",money(1000,4000)],["Afschrijving",money(1500,6000)],["Reclame",money(500,3000)]],tc=0;c.forEach(function(x){tc+=x[1];});tc=r(tc,2);var bw=r(om-iw,2),nr=r(bw-tc,2);
var rows=[["Omzet",eur(om)],["Inkoopwaarde","− "+eur(iw)],["Brutowinst",k===2?"?":eur(bw),k===2?1:0]].concat(k===3?c.map(function(x){return [x[0],"− "+eur(x[1])];}).concat([["Nettoresultaat","?",1]]):[]);
if(k===2)return{f:"winst",h:"Bereken de brutowinst. (2 decimalen)",body:stmt(rows.map(function(x){return x[2]?[x[0],x[1],1]:[x[0],x[1]];})),a:bw,d:2,u:"€",calc:"Brutowinst = omzet − inkoopwaarde\n"+eur(om)+" − "+eur(iw)+" = "+eur(bw)};
return{f:"winst",h:"Bereken het nettoresultaat. (2 decimalen, min-teken bij verlies)",body:stmt(rows.map(function(x){return x[2]?[x[0],x[1],1]:[x[0],x[1]];})),a:nr,d:2,u:"€",calc:"Brutowinst = "+eur(om)+" − "+eur(iw)+" = "+eur(bw)+"\nBedrijfskosten samen: "+eur(tc)+"\nNettoresultaat = "+eur(bw)+" − "+eur(tc)+" = "+eur(nr)+(nr<0?" (nettoverlies)":" (nettowinst)")};},
arbprod:function(){var w=rnd(3,12),d=pick([5,6]),pd=rnd(6,40),wk=w*d*pd,k=rnd(1,3);
if(k<=2){var jr=wk*52;return{f:"arbprod",h:"Bereken de arbeidsproductiviteit per werknemer per dag.",body:qp("Een bedrijf heeft "+w+" medewerkers die "+d+" dagen per week werken. Het bedrijf maakt "+num(jr)+" producten per jaar."),a:pd,d:0,u:"",calc:"Per week: "+num(jr)+" : 52 = "+num(wk)+"\nPer dag: "+num(wk)+" : "+d+" = "+num(w*pd)+"\nPer werknemer per dag: "+num(w*pd)+" : "+w+" = "+pd};}
var pd2=pd+rnd(2,6),w2=w+1,jr2=pd2*w2*d*52;return{f:"arbprod",h:"Hoeveel producten maakt het bedrijf nu per jaar?",body:qp("Een bedrijf met "+w+" medewerkers neemt er één medewerker bij en koopt nieuwe machines. De arbeidsproductiviteit stijgt naar "+pd2+" producten per persoon per dag. Iedereen werkt "+d+" dagen per week."),a:jr2,d:0,u:"",calc:pd2+" × "+w2+" medewerkers × "+d+" dagen = "+num(pd2*w2*d)+" per week\n"+num(pd2*w2*d)+" × 52 = "+num(jr2)+" per jaar"};},
markt:function(){var ps=[2,2.5,3,3.5,4,4.5,5],e=rnd(1,5),qe=rnd(60,90)*10,dv=rnd(3,8)*10,da=rnd(3,8)*10,rows=ps.map(function(p,i){return [eur(p),num(qe-(i-e)*dv),num(qe+(i-e)*da)];}),k=rnd(1,3);
var body=qp("Hieronder zie je de vraag naar en het aanbod van een product op de markt.")+stmt([["Prijs","Gevraagd","Aangeboden"]].concat(rows),"cpi");
if(k===1)return{f:"evenwicht",h:"Wat is de evenwichtsprijs? (2 decimalen)",body:body,a:ps[e],d:2,u:"€",calc:"Bij de evenwichtsprijs zijn vraag en aanbod gelijk.\nBij "+eur(ps[e])+": gevraagd "+num(qe)+" = aangeboden "+num(qe)};
if(k===2)return{f:"evenwicht",h:"Wat is de evenwichtshoeveelheid?",body:body,a:qe,d:0,u:"",calc:"Zoek de prijs waarbij gevraagd = aangeboden: "+eur(ps[e])+"\nEvenwichtshoeveelheid = "+num(qe)};
var j=e>0?rnd(0,e-1):0;if(e===0)j=0;var t=(qe-(j-e)*dv)-(qe+(j-e)*da);
return{f:"evenwicht",h:"De overheid stelt een maximumprijs in van "+eur(ps[j])+". Hoe groot is het tekort?",body:body,a:t,d:0,u:"",calc:"Bij "+eur(ps[j])+": gevraagd "+num(qe-(j-e)*dv)+", aangeboden "+num(qe+(j-e)*da)+"\nTekort = "+num(qe-(j-e)*dv)+" − "+num(qe+(j-e)*da)+" = "+num(t)+"\nDe maximumprijs ligt onder de evenwichtsprijs: de vraag is groter dan het aanbod."};},
aandeel:function(){var tot=rnd(40,200)*1000,eig=Math.round(tot*rnd(5,40)/100),a=r(eig/tot*100,1),om=Math.random()<0.5;
return{f:"marktaandeel",h:"Bereken het marktaandeel. (1 decimaal)",body:qp(om?"Een bedrijf heeft een omzet van "+eur(eig*10)+". De totale omzet op de markt is "+eur(tot*10)+".":"Een bedrijf verkoopt "+num(eig)+" producten. Op de hele markt worden "+num(tot)+" van deze producten verkocht."),a:a,d:1,u:"%",calc:"Marktaandeel = (eigen "+(om?"omzet":"afzet")+" : totale "+(om?"omzet":"afzet")+") × 100\n("+num(om?eig*10:eig)+" : "+num(om?tot*10:tot)+") × 100 = "+pc(a)};},
pct:function(){var v=pick([
function(){var o=pick([5,6,7.5,8,10,12.5]),n=r(o+pick([0.5,1,1.5,2,2.5]),2);return ["Vorig jaar kreeg je "+eur(o)+" zakgeld per week. Nu krijg je "+eur(n)+".",o,n,"Met hoeveel procent is je zakgeld gestegen?"];},
function(){var o=rnd(780,960),n=o+rnd(15,70);return ["Vorig schooljaar zaten er "+o+" leerlingen op school. Dit schooljaar zijn het er "+n+".",o,n,"Met hoeveel procent is het aantal leerlingen gestegen?"];},
function(){var o=rnd(145,175)/100,n=r(o+rnd(6,25)/100,2);return ["Een liter benzine kostte vorig jaar "+eur(o)+". Nu kost een liter "+eur(n)+".",o,n,"Met hoeveel procent is de prijs gestegen?"];},
function(){var o=rnd(65,98)*10,n=o-rnd(3,14)*10;return ["Een tweedehands scooter was vorig jaar "+eur(o)+" waard. Nu is hij "+eur(n)+" waard.",o,n,"Met hoeveel procent is de waarde gedaald?"];},
function(){var o=rnd(72,89)*10,n=o+rnd(2,6)*5;return ["De huur van een studio ging van "+eur(o)+" naar "+eur(n)+" per maand.",o,n,"Met hoeveel procent is de huur gestegen?"];},
function(){var o=rnd(2100,2600),n=o+rnd(40,140);return ["Het brutoloon van Fatima ging van "+eur(o)+" naar "+eur(n)+" per maand.",o,n,"Met hoeveel procent is haar loon gestegen?"];}
])();var a=r((v[2]-v[1])/v[1]*100,1);
return{f:"pct",h:v[3]+" (1 decimaal)",body:qp(v[0]),a:a,d:1,u:"%",abs:a<0,calc:"Procentuele verandering = (nieuw − oud) : oud × 100\n("+num(v[2])+" − "+num(v[1])+") : "+num(v[1])+" × 100 = "+pc(a)+(a<0?"\nDus een daling van "+pc(-a):"")};}
};
