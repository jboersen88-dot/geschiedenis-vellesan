var FORM={
groei:"oud bedrag × groeifactor",
procentvan:"(percentage : 100) × totaal",
deel:"(deel : geheel) × 100",
pct:"(nieuw − oud) : oud × 100",
index:"(nieuw getal : getal basisjaar) × 100",
terug:"(prijs : indexcijfer) × 100",
vooruit:"(prijs basisjaar × indexcijfer) : 100",
reeel:"nominale verandering − inflatie",
reserve:"benodigd bedrag : aantal maanden",
maand:"(weekbedrag × 52) : 12",
week:"(maandbedrag × 12) : 52",
bbp:"BBP : aantal inwoners",
cpi:"som van (weging × indexcijfer) : totale weging",
lorenz:"cumulatief % − vorig cumulatief %"
};

var MODES=[["groei","Groeifactor"],["perc","Procenten"],["pct","Procent verandering"],["index","Indexcijfer"],["terug","Rekenen met index"],["koop","Koopkracht"],["cpi","CPI (gewogen)"],["bbp","BBP per inwoner"],["lorenz","Lorenzcurve"],["maand","Week ↔ maand"],["reserve","Reserveren"]];
var RGEN={
groei:function(){var up=Math.random()<0.6,p=pick(up?[2,2.5,3,4,4.5,6,6.5,8,12]:[3,4,5,8.5,10,12.5,23.6]),g=r(up?1+p/100:1-p/100,4),o=pick([950,1250,1850,2250,3940,15000,23000,89,123,2436]);
if(Math.random()<0.35)return{f:"groei",h:"Wat is de groeifactor? (3 decimalen)",body:qp("Een bedrag "+(up?"stijgt":"daalt")+" met "+pc(p)+"."),a:g,d:3,u:"",calc:"Groeifactor = 1 "+(up?"+":"−")+" ("+num(p)+" : 100) = "+num(g)};
var a=r(o*g,2);
return{f:"groei",h:"Wat is het nieuwe bedrag? (2 decimalen)",body:qp("Een bedrag van "+eur(o)+" "+(up?"stijgt":"daalt")+" met "+pc(p)+"."),a:a,d:2,u:"€",calc:"Groeifactor = 1 "+(up?"+":"−")+" ("+num(p)+" : 100) = "+num(g)+"\nNieuw bedrag = "+num(o)+" × "+num(g)+" = "+eur(a)};},
perc:function(){
if(Math.random()<0.5){var p=pick([21,4.1,16.5,76.2,12,6,35,15,40]),t=pick([160,250,310,65,220,89,180,30]),a=r(p/100*t,2);
return{f:"procentvan",h:"Bereken het bedrag (2 decimalen).",body:qp("Hoeveel is "+num(p)+"% van "+eur(t)+"?"),a:a,d:2,u:"€",calc:"Getal = (percentage : 100) × totaal\n("+num(p)+" : 100) × "+num(t)+" = "+eur(a)};}
var t2=pick([215,2190,250,180,160,1820]),dd=r(t2*pick([0.15,0.085,0.12,0.2,0.35,0.4]),2),b=r(dd/t2*100,1);
return{f:"deel",h:"Hoeveel procent? (1 decimaal)",body:qp(eur(dd)+" is hoeveel procent van "+eur(t2)+"?"),a:b,d:1,u:"%",calc:"Percentage = (deel : geheel) × 100\n("+num(dd)+" : "+num(t2)+") × 100 = "+pc(b)};},
lorenz:function(){var c=[],x=0;for(var i=0;i<4;i++){x+=rnd(i===0?3:5,i===0?9:14);c.push(x);}
var names=["de armste 20%","de volgende 20% (20% t/m 40%)","de middelste 20% (40% t/m 60%)","de volgende 20% (60% t/m 80%)","de rijkste 20%"],cum=[0].concat(c).concat([100]),k=rnd(1,5),a=cum[k]-cum[k-1];
return{f:"lorenz",h:"Hoeveel procent van het inkomen verdient "+names[k-1]+"?",body:qp("In land X is de inkomensverdeling zo (cumulatief, van arm naar rijk):")+stmt([["Bevolking","Cumulatief % van het inkomen"],["armste 20%",c[0]+"%"],["armste 40%",c[1]+"%"],["armste 60%",c[2]+"%"],["armste 80%",c[3]+"%"],["alle 100%","100%"]],"cpi"),a:a,d:0,u:"%",calc:"Groep = cumulatief % − vorig cumulatief %\n"+cum[k]+"% − "+cum[k-1]+"% = "+a+"%"};},
pct:function(){var v=pick([
function(){var o=pick([5,6,7.5,8,10,12.5]),n=r(o+pick([0.5,1,1.5,2,2.5]),2);return ["Vorig jaar kreeg je "+eur(o)+" zakgeld per week. Nu krijg je "+eur(n)+".",o,n,"Met hoeveel procent is je zakgeld gestegen?"];},
function(){var o=rnd(780,960),n=o+rnd(15,70);return ["Vorig schooljaar zaten er "+o+" leerlingen op school. Dit schooljaar zijn het er "+n+".",o,n,"Met hoeveel procent is het aantal leerlingen gestegen?"];},
function(){var o=rnd(145,175)/100,n=r(o+rnd(6,25)/100,2);return ["Een liter benzine kostte vorig jaar "+eur(o)+". Nu kost een liter "+eur(n)+".",o,n,"Met hoeveel procent is de prijs gestegen?"];},
function(){var o=rnd(65,98)*10,n=o-rnd(3,14)*10;return ["Een tweedehands scooter was vorig jaar "+eur(o)+" waard. Nu is hij "+eur(n)+" waard.",o,n,"Met hoeveel procent is de waarde gedaald?"];},
function(){var o=rnd(72,89)*10,n=o+rnd(2,6)*5;return ["De huur van een studio ging van "+eur(o)+" naar "+eur(n)+" per maand.",o,n,"Met hoeveel procent is de huur gestegen?"];},
function(){var o=rnd(2100,2600),n=o+rnd(40,140);return ["Het brutoloon van Fatima ging van "+eur(o)+" naar "+eur(n)+" per maand.",o,n,"Met hoeveel procent is haar loon gestegen?"];}
])();var a=r((v[2]-v[1])/v[1]*100,1);
return{f:"pct",h:v[3]+" (1 decimaal)",body:qp(v[0]),a:a,d:1,u:"%",abs:a<0,calc:"Procentuele verandering = (nieuw − oud) : oud × 100\n("+num(v[2])+" − "+num(v[1])+") : "+num(v[1])+" × 100 = "+pc(a)+(a<0?"\nDus een daling van "+pc(-a):"")};},
index:function(){var v=pick([
function(){var b=rnd(180,260)/100,n=r(b*(1+rnd(5,40)/100),2);return ["Een brood kostte in 2015 (basisjaar) "+eur(b)+". Nu kost het "+eur(n)+".",b,n];},
function(){var b=rnd(38,52)*10,n=b-rnd(4,12)*10;return ["Een telefoon kostte in het basisjaar "+eur(b)+". Nu kost hij "+eur(n)+".",b,n];},
function(){var b=rnd(2100,2400),n=b+rnd(80,220);return ["Je inkomen was in het basisjaar "+eur(b)+" per maand. Nu is het "+eur(n)+".",b,n];},
function(){var b=rnd(800,880),n=b+rnd(20,90);return ["In 2015 (basisjaar) zaten er "+b+" leerlingen op school. Nu zijn het er "+n+".",b,n];}
])();var a=r(v[2]/v[1]*100,1);
return{f:"index",h:"Bereken het indexcijfer (1 decimaal).",body:qp(v[0]),a:a,d:1,u:"",calc:"Indexcijfer = (nieuw getal : getal in het basisjaar) × 100\n("+num(v[2])+" : "+num(v[1])+") × 100 = "+i1(a)+"\n"+(a>=100?"Boven de 100: een stijging van "+pc(r(a-100,1)):"Onder de 100: een daling van "+pc(r(100-a,1)))};},
terug:function(){
if(Math.random()<0.6){var v=pick([["Een liter benzine",1.69,176.6],["Een liter benzine",rnd(160,199)/100,rnd(1500,1850)/10],["Een kilo kaas",rnd(1100,1600)/100,rnd(1250,1600)/10],["Een kop koffie",rnd(300,420)/100,rnd(1180,1450)/10],["Een bioscoopkaartje",rnd(1250,1650)/100,rnd(1150,1400)/10]]),a=r(v[1]/v[2]*100,2);
return{f:"terug",h:"Wat kostte het in 2015? (2 decimalen)",body:qp(v[0]+" kost nu "+eur(v[1])+". Het indexcijfer is "+i1(v[2])+" (2015 = 100)."),a:a,d:2,u:"€",calc:"Terugrekenen: (prijs nu : indexcijfer) × 100\n("+num(v[1])+" : "+i1(v[2])+") × 100 = "+eur(a)};}
var w=pick([["Een brood",rnd(190,260)/100],["Een treinkaartje",rnd(400,900)/100],["Een pizza",rnd(800,1300)/100],["Een spijkerbroek",rnd(4000,8000)/100]]),i=rnd(1030,1250)/10,b=r(w[1]*i/100,2);
return{f:"vooruit",h:"Wat is de prijs nu? (2 decimalen)",body:qp(w[0]+" kostte in het basisjaar "+eur(w[1])+". Het indexcijfer is nu "+i1(i)+"."),a:b,d:2,u:"€",calc:"Prijs nu = (prijs in het basisjaar × indexcijfer) : 100\n("+num(w[1])+" × "+i1(i)+") : 100 = "+eur(b)};},
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
calc:"Gewogen indexcijfer = som van (weging × indexcijfer) : totale weging\n"+rows.map(function(x){return x[1]+" × "+i1(x[2])+" = "+num(r(x[1]*x[2],1));}).join("\n")+"\nSamen: "+num(r(tot,1))+" : 100 = "+i1(a)+"\nDe prijzen zijn gemiddeld "+pc(Math.abs(r(a-100,1)))+(a>=100?" gestegen.":" gedaald.")};},
bbp:function(){var v=pick([["Nederland",rnd(1000,1200),rnd(175,182)/10],["België",rnd(560,640),rnd(115,120)/10],["Duitsland",rnd(4100,4500),rnd(830,845)/10],["Denemarken",rnd(380,420),rnd(58,60)/10]]),bb=v[1]*1e9,inw=r(v[2]*1e6,0),a=r(bb/inw,0);
return{f:"bbp",h:"Bereken het BBP per inwoner (afronden op hele euro's).",body:qp("Het BBP van "+v[0]+" is €"+num(v[1])+" miljard. Er wonen "+i1(v[2])+" miljoen mensen."),a:a,d:0,u:"€",calc:"BBP per inwoner = BBP : aantal inwoners\n€"+num(v[1])+" miljard = €"+num(bb)+"\n"+i1(v[2])+" miljoen = "+num(inw)+"\n€"+num(bb)+" : "+num(inw)+" = €"+num(a)};},
maand:function(){
if(Math.random()<0.55){var w=pick([["Je verdient met je bijbaan ",35,140],["Je krijgt aan zakgeld ",8,25],["Je gezin geeft aan boodschappen ",120,240]]),x=money(w[1],w[2]),j=r(x*52,2),a=r(x*52/12,2);
return{f:"maand",h:"Hoeveel is dat per maand? (2 decimalen)",body:qp(w[0]+eur(x)+" per week."),a:a,d:2,u:"€",calc:"Week → maand: (weekbedrag × 52) : 12\n"+eur(x)+" × 52 = "+eur(j)+" per jaar\n"+eur(j)+" : 12 = "+eur(a)+" per maand\n(Niet × 4: een maand is langer dan 4 weken!)"};}
var m=pick([["Je huur is ",450,950],["Je telefoonabonnement kost ",12,45],["Je sportcontributie is ",15,40],["Je verdient met je bijbaan ",180,520]]),y=money(m[1],m[2]),j2=r(y*12,2),b=r(y*12/52,2);
return{f:"week",h:"Hoeveel is dat per week? (2 decimalen)",body:qp(m[0]+eur(y)+" per maand."),a:b,d:2,u:"€",calc:"Maand → week: (maandbedrag × 12) : 52\n"+eur(y)+" × 12 = "+eur(j2)+" per jaar\n"+eur(j2)+" : 52 = "+eur(b)+" per week"};},
reserve:function(){var v=pick([["rijlessen",rnd(18,32)*50],["een vakantie",rnd(10,24)*50],["een nieuwe laptop",rnd(12,24)*50],["een scooter",rnd(30,50)*50],["de jaarlijkse autoverzekering",rnd(40,90)*10]]),m=pick([4,5,6,8,9,10,12]),a=r(v[1]/m,2);
return{f:"reserve",h:"Hoeveel moet je per maand reserveren? (2 decimalen)",body:qp("Over "+m+" maanden heb je "+eur(v[1])+" nodig voor "+v[0]+"."),a:a,d:2,u:"€",calc:"Reservering per maand = benodigd bedrag : aantal maanden\n"+eur(v[1])+" : "+m+" = "+eur(a)};},
};
