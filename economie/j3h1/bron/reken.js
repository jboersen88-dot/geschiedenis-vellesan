var FORM={
procentvan:"(percentage : 100) × totaal",
korting:"oude prijs − ((percentage : 100) × oude prijs)",
deel:"(deel : geheel) × 100",
budget:"inkomsten − uitgaven",
maand:"(weekbedrag × 52) : 12",
week:"(maandbedrag × 12) : 52",
reserve:"(benodigd bedrag − al gespaard) : aantal maanden",
pct:"(nieuw − oud) : oud × 100",
index:"(nieuw getal : getal basisjaar) × 100",
bedrag:"(indexcijfer : 100) × bedrag basisjaar"
};
var MODES=[["procentvan","Procent van een bedrag"],["korting","Prijs na korting"],["deel","Hoeveel procent is het?"],["budget","Begroting"],["maand","Week ↔ maand"],["reserve","Reserveren"],["pct","Procent verandering"],["index","Indexcijfer"],["bedrag","Rekenen met index"]];
var NAMEN=["Daan","Sara","Yusuf","Lotte","Milan","Fenna","Jesse","Noor","Ravi","Evi"];
var RGEN={
procentvan:function(){var v=pick([
function(){var t=rnd(12,48)*5,p=pick([15,20,25,30,35,40,12.5]);return [pick(NAMEN)+" verdient "+eur(t)+" per maand met een bijbaan. Daarvan gaat "+pc(p)+" naar de spaarrekening.","Hoeveel euro wordt er gespaard? (2 decimalen)",p,t];},
function(){var t=rnd(60,180)*10,p=pick([28,31.5,33,36,42]);return ["Een gezin heeft "+eur(t)+" per maand te besteden. Daarvan gaat "+pc(p)+" naar de huur.","Hoeveel euro is de huur? (2 decimalen)",p,t];},
function(){var t=pick([430,560,649,799,899,1250]),p=pick([13.5,15,17.5,22,38]);return ["Een tv kost "+eur(t)+". Deze week krijg je "+pc(p)+" korting.","Hoeveel euro korting krijg je? (2 decimalen)",p,t];},
function(){var t=rnd(20,95),p=pick([6,8,12,15,18]);return ["Een webshop rekent "+pc(p)+" verzendkosten over een bestelling van "+eur(t)+".","Hoeveel euro zijn de verzendkosten? (2 decimalen)",p,t];}
])();var a=r(v[2]/100*v[3],2);
return{f:"procentvan",h:v[1],body:qp(v[0]),a:a,d:2,u:"€",calc:"Bedrag = (percentage : 100) × totaal\n("+num(v[2])+" : 100) × "+num(v[3])+" = "+eur(a)};},
korting:function(){var w=pick([["Een tv",rnd(40,120)*10],["Een jas",rnd(60,190)-0.05],["Een paar sneakers",rnd(70,150)-0.01],["Een spelcomputer",rnd(40,60)*10-1],["Een fiets",rnd(35,90)*10]]),p=pick([10,15,20,25,30,35,38,40,12.5]),k=r(p/100*w[1],2),a=r(w[1]-k,2);
return{f:"korting",h:"Wat is de prijs na de korting? (2 decimalen)",body:qp(w[0]+" kost "+eur(w[1])+". Je krijgt "+pc(p)+" korting."),a:a,d:2,u:"€",calc:"Stap 1: korting = (percentage : 100) × oude prijs\n("+num(p)+" : 100) × "+num(w[1])+" = "+eur(k)+"\nStap 2: nieuwe prijs = oude prijs − korting\n"+eur(w[1])+" − "+eur(k)+" = "+eur(a)+"\nLet op: de vraag is de nieuwe prijs, niet de korting."};},
deel:function(){var v=pick([
function(){var g=rnd(40,150)*10,d=r(g*rnd(18,42)/100,0);return ["Een gezin geeft per maand "+eur(g)+" uit. Daarvan gaat "+eur(d)+" naar boodschappen.","Hoeveel procent van de uitgaven gaat naar boodschappen? (1 decimaal)",d,g];},
function(){var g=rnd(24,31),d=rnd(5,g-6);return ["In een klas zitten "+g+" leerlingen. Daarvan hebben "+d+" leerlingen een bijbaan.","Hoeveel procent van de klas heeft een bijbaan? (1 decimaal)",d,g];},
function(){var g=rnd(30,120)*5,d=r(g*rnd(8,35)/100,0);return [pick(NAMEN)+" krijgt "+eur(d)+" korting op een telefoon van "+eur(g)+".","Hoeveel procent korting is dat? (1 decimaal)",d,g];},
function(){var g=rnd(20,60)*10,d=rnd(3,15)*10;return ["Een bedrijf geeft €"+g+" miljoen uit. Daarvan gaat €"+d+" miljoen naar reclame.","Hoeveel procent van de uitgaven gaat naar reclame? (1 decimaal)",d,g];}
])();var a=r(v[2]/v[3]*100,1);
return{f:"deel",h:v[1],body:qp(v[0]),a:a,d:1,u:"%",calc:"Percentage = (deel : geheel) × 100\n("+num(v[2])+" : "+num(v[3])+") × 100 = "+pc(a)};},
budget:function(){var inc=shuffle([["Loon",money(900,1900)],["Kinderbijslag",money(60,260)],["Huurtoeslag",money(80,320)],["Loon bijbaan",money(80,400)]]).slice(0,rnd(2,4)),out=shuffle([["Huur",money(450,900)],["Energie en water",money(90,220)],["Boodschappen",money(250,600)],["Verzekeringen",money(80,220)],["Abonnementen",money(20,90)],["Kleding",money(30,160)]]).slice(0,rnd(3,5));
var ti=0,to=0;inc.forEach(function(x){ti+=x[1];});out.forEach(function(x){to+=x[1];});ti=r(ti,2);to=r(to,2);var a=r(ti-to,2);
var rows=[["Inkomsten per maand",""]].concat(inc.map(function(x){return [x[0],eur(x[1])];})).concat([["Uitgaven per maand",""]]).concat(out.map(function(x){return [x[0],eur(x[1])];}));
return{f:"budget",h:"Hoeveel blijft er over om te reserveren? (typ een min-teken bij een tekort)",body:stmt(rows,"cpi"),a:a,d:2,u:"€",calc:"Totaal inkomsten: "+eur(ti)+"\nTotaal uitgaven: "+eur(to)+"\nInkomsten − uitgaven = "+eur(ti)+" − "+eur(to)+" = "+eur(a)+(a<0?"\nEen tekort: de uitgaven zijn hoger dan de inkomsten.":"\nDit bedrag kun je reserveren voor onverwachte uitgaven.")};},
maand:function(){
if(Math.random()<0.55){var w=pick([[" verdient met een bijbaan ",35,140],[" krijgt aan zakgeld ",8,25],[" geeft aan boodschappen ",60,140]]),x=money(w[1],w[2]),j=r(x*52,2),a=r(x*52/12,2);
return{f:"maand",h:"Hoeveel is dat per maand? (2 decimalen)",body:qp(pick(NAMEN)+w[0]+eur(x)+" per week."),a:a,d:2,u:"€",calc:"Van week naar maand: (weekbedrag × 52) : 12\n"+eur(x)+" × 52 = "+eur(j)+" per jaar\n"+eur(j)+" : 12 = "+eur(a)+" per maand\nNiet × 4: een maand is langer dan 4 weken."};}
var m=pick([[" betaalt aan huur ",450,950],[" betaalt voor een telefoonabonnement ",12,45],[" betaalt aan sportcontributie ",15,40],[" verdient ",1200,2400]]),y=money(m[1],m[2]),j2=r(y*12,2),b=r(y*12/52,2);
return{f:"week",h:"Hoeveel is dat per week? (2 decimalen)",body:qp(pick(NAMEN)+m[0]+eur(y)+" per maand."),a:b,d:2,u:"€",calc:"Van maand naar week: (maandbedrag × 12) : 52\n"+eur(y)+" × 12 = "+eur(j2)+" per jaar\n"+eur(j2)+" : 52 = "+eur(b)+" per week"};},
reserve:function(){var v=pick([["rijlessen",rnd(18,32)*50],["een vakantie",rnd(10,24)*50],["een nieuwe laptop",rnd(12,24)*50],["een scooter",rnd(30,50)*50],["een nieuwe fiets",rnd(8,18)*50]]),jr=Math.random()<0.4?pick([2,3,4]):0,m=jr?jr*12:pick([4,5,6,8,9,10,12,18]),g=Math.random()<0.5?0:Math.round(v[1]*rnd(10,40)/100/10)*10,a=r((v[1]-g)/m,2);
return{f:"reserve",h:"Hoeveel moet er per maand gereserveerd worden? (2 decimalen)",body:qp(pick(NAMEN)+" wil over "+(jr?jr+" jaar":m+" maanden")+" "+eur(v[1])+" hebben voor "+v[0]+"."+(g?" Er is al "+eur(g)+" gespaard.":"")),a:a,d:2,u:"€",calc:"Reservering per maand = (benodigd bedrag − al gespaard) : aantal maanden"+(jr?"\n"+jr+" jaar = "+jr+" × 12 = "+m+" maanden":"")+"\n("+eur(v[1])+" − "+eur(g)+") : "+m+" = "+eur(a)};},
pct:function(){var v=pick([
function(){var o=pick([5,6,7.5,8,10,12.5]),n=r(o+pick([0.5,1,1.5,2,2.5]),2);return ["Vorig jaar kreeg je "+eur(o)+" zakgeld per week. Nu krijg je "+eur(n)+".",o,n,"Met hoeveel procent is je zakgeld gestegen?"];},
function(){var o=rnd(40,70),n=o+rnd(5,20);return ["Je kleedgeld gaat van "+eur(o)+" naar "+eur(n)+" per maand.",o,n,"Met hoeveel procent is je kleedgeld gestegen?"];},
function(){var o=rnd(180,260)/100,n=r(o+rnd(6,35)/100,2);return ["Een brood kostte vorig jaar "+eur(o)+". Nu kost het "+eur(n)+".",o,n,"Met hoeveel procent is de prijs gestegen?"];},
function(){var o=rnd(40,90)*10,n=o-rnd(3,14)*10;return ["Een telefoon kostte bij de start "+eur(o)+". Een jaar later kost hij "+eur(n)+".",o,n,"Met hoeveel procent is de prijs veranderd?"];},
function(){var o=rnd(550,900)/100,n=r(o+rnd(20,90)/100,2);return ["Het uurloon van "+pick(NAMEN)+" gaat van "+eur(o)+" naar "+eur(n)+".",o,n,"Met hoeveel procent is het uurloon gestegen?"];}
])();var a=r((v[2]-v[1])/v[1]*100,1);
return{f:"pct",h:v[3]+" (1 decimaal; typ een min-teken bij een daling)",body:qp(v[0]),a:a,d:1,u:"%",calc:"Verandering in procenten = (nieuw − oud) : oud × 100\n("+num(v[2])+" − "+num(v[1])+") : "+num(v[1])+" × 100 = "+pc(a)+(a<0?"\nDus een daling van "+pc(-a):"")};},
index:function(){var v=pick([
function(){var b=rnd(180,260)/100,n=r(b*(1+rnd(5,40)/100),2);return ["Een brood kostte in het basisjaar "+eur(b)+". Nu kost het "+eur(n)+".",b,n];},
function(){var b=rnd(38,52)*10,n=b-rnd(4,12)*10;return ["Een telefoon kostte in het basisjaar "+eur(b)+". Nu kost hij "+eur(n)+".",b,n];},
function(){var b=rnd(400,700)/100,n=r(b+rnd(30,200)/100,2);return ["Je uurloon was in het basisjaar "+eur(b)+". Nu is het "+eur(n)+".",b,n];},
function(){var b=rnd(900,1400)/100,n=r(b*(1+rnd(-8,25)/100),2);return ["Een bioscoopkaartje kostte in het basisjaar "+eur(b)+". Nu kost het "+eur(n)+".",b,n];}
])();var a=r(v[2]/v[1]*100,1);
return{f:"index",h:"Bereken het indexcijfer (1 decimaal).",body:qp(v[0]),a:a,d:1,u:"",calc:"Indexcijfer = (nieuw getal : getal basisjaar) × 100\n("+num(v[2])+" : "+num(v[1])+") × 100 = "+i1(a)+"\n"+(a>100?"Boven de 100: een stijging van "+pc(r(a-100,1)):a<100?"Onder de 100: een daling van "+pc(r(100-a,1)):"Precies 100: de prijs is gelijk gebleven.")};},
bedrag:function(){var w=pick([["Het minimumloon was in het basisjaar ",rnd(1500,2100),"per maand. Nu is het indexcijfer ","Hoeveel is het minimumloon nu?"],["Op de spaarrekening van "+pick(NAMEN)+" stond in het basisjaar ",rnd(20,90)*10,". Nu is het indexcijfer ","Hoeveel staat er nu op de rekening?"],["Een winkelwagen boodschappen kostte in het basisjaar ",rnd(6000,11000)/100,". Nu is het indexcijfer ","Hoeveel kost de winkelwagen nu?"],["Een treinkaartje kostte in het basisjaar ",rnd(600,1800)/100,". Nu is het indexcijfer ","Hoeveel kost het kaartje nu?"]]),i=rnd(960,1260)/10,a=r(i/100*w[1],2);if(i===100)i=103.5,a=r(i/100*w[1],2);
return{f:"bedrag",h:w[3]+" (2 decimalen)",body:qp(w[0]+eur(w[1])+(w[2].charAt(0)==="."?"":" ")+w[2]+i1(i)+"."),a:a,d:2,u:"€",calc:"Nieuw bedrag = (indexcijfer : 100) × bedrag basisjaar\n("+i1(i)+" : 100) × "+num(w[1])+" = "+eur(a)};}
};
