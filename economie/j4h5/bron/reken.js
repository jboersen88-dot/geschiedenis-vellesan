var FORM={
pct:"(nieuw − oud) : oud × 100",
bbp:"(percentage : 100) × totaal",
uitk:"(percentage : 100) × totaal",
saldo:"inkomsten − uitgaven",
mld:"miljard × 1.000 = miljoen",
deel:"(deel : geheel) × 100"
};
var MODES=[["saldo","Begrotingssaldo"],["mld","Miljoen ↔ miljard"],["deel","Deel van het geheel"],["pct","Procent verandering"],["bbp","Groei van het bbp"],["uitk","Uitkering"]];
function mrd(x){return "€"+num(x)+" miljard";}
var RGEN={
saldo:function(){var i=rnd(330,430),u=i+pick([-18,-12,-9,-6,-4,5,8,11,15,21,27,35]),a=i-u;
return{f:"saldo",h:"Wat is het begrotingssaldo, in miljard euro? (typ een min-teken bij een tekort)",body:stmt([["Verwachte inkomsten",mrd(i)],["Verwachte uitgaven",mrd(u)]]),a:a,d:0,u:"",calc:"Begrotingssaldo = inkomsten − uitgaven\n"+i+" − "+u+" = "+a+" miljard\n"+(a<0?"De uitgaven zijn hoger: een begrotingstekort van "+mrd(-a)+".":"De inkomsten zijn hoger: een begrotingsoverschot van "+mrd(a)+".")};},
mld:function(){if(Math.random()<0.5){var m=pick([1.4,2.6,3.2,0.8,12.5,7.3,0.25,4.75,34.9,9.1]),a=r(m*1000,0);
return{f:"mld",h:"Hoeveel miljoen euro is dat?",body:qp("De overheid geeft "+mrd(m)+" uit aan een nieuw plan."),a:a,d:0,u:"",calc:"1 miljard = 1.000 miljoen\n"+num(m)+" × 1.000 = "+num(a)+" miljoen"};}
var mi=pick([1400,2600,850,12300,450,7800,3250,19500,600,125]),b=r(mi/1000,3);
return{f:"mld",h:"Hoeveel miljard euro is dat? (typ alle decimalen)",body:qp("Een gemeente en het Rijk betalen samen €"+num(mi)+" miljoen voor een nieuwe spoorlijn."),a:b,d:3,u:"",calc:"1 miljoen = 0,001 miljard, dus delen door 1.000\n"+num(mi)+" : 1.000 = "+num(b)+" miljard"};},
deel:function(){if(Math.random()<0.5){var s=rnd(420,520),rt=pick([5.2,6.4,7.8,8.5,9.6,11.3]),a=r(rt/s*100,1);
return{f:"deel",h:"Hoeveel procent rente betaalt de overheid? (1 decimaal)",body:qp("De staatsschuld is "+mrd(s)+". De overheid betaalt dit jaar "+mrd(rt)+" rente over die schuld."),a:a,d:1,u:"%",calc:"Percentage = (deel : geheel) × 100\n("+num(rt)+" : "+s+") × 100 = "+pc(a)};}
var t=rnd(340,420),o=rnd(38,52),b=r(o/t*100,1);
return{f:"deel",h:"Hoeveel procent van de uitgaven gaat naar onderwijs? (1 decimaal)",body:qp("Het Rijk geeft in totaal "+mrd(t)+" uit. Daarvan gaat "+mrd(o)+" naar onderwijs."),a:b,d:1,u:"%",calc:"Percentage = (deel : geheel) × 100\n("+o+" : "+t+") × 100 = "+pc(b)};},
pct:function(){var v=pick([
function(){var o=rnd(160,190)/10,n=r(o+rnd(8,35)/10,1);return ["De accijns op een pakje sigaretten ging van "+num(o)+" cent per sigaret naar "+num(n)+" cent.",o,n,"Met hoeveel procent is de accijns gestegen?"];},
function(){var o=rnd(700,780),n=o+rnd(-14,22);if(n===o)n=o+9;return ["Het bbp van een land ging van "+mrd(o)+" naar "+mrd(n)+".",o,n,"Met hoeveel procent is het bbp veranderd?"];},
function(){var o=rnd(440,500),n=o+rnd(6,30);return ["De staatsschuld steeg van "+mrd(o)+" naar "+mrd(n)+".",o,n,"Met hoeveel procent is de staatsschuld gestegen?"];},
function(){var o=rnd(380,460)*1000,n=o-rnd(12,60)*1000;return ["Het aantal mensen met een bijstandsuitkering daalde van "+num(o)+" naar "+num(n)+".",o,n,"Met hoeveel procent is het aantal veranderd?"];}
])();var a=r((v[2]-v[1])/v[1]*100,1);
return{f:"pct",h:v[3]+" (1 decimaal; typ een min-teken bij een daling)",body:qp(v[0]),a:a,d:1,u:"%",calc:"Procentuele verandering = (nieuw − oud) : oud × 100\n("+num(v[2])+" − "+num(v[1])+") : "+num(v[1])+" × 100 = "+pc(a)+(a<0?"\nDus een daling van "+pc(-a):"")};},
bbp:function(){var o=rnd(70,82)*10,p=pick([0.8,1.2,1.5,2.1,2.4,3,-0.6,-1.2,-2.5]),g=r(Math.abs(p)/100*o,2),a=r(p<0?o-g:o+g,2);
return{f:"bbp",h:"Hoe groot is het bbp dit jaar, in miljard euro? (2 decimalen)",body:qp("Vorig jaar was het bbp "+mrd(o)+". Dit jaar "+(p<0?"krimpt de economie met "+pc(-p):"groeit de economie met "+pc(p))+"."),a:a,d:2,u:"",calc:"Stap 1: ("+num(Math.abs(p))+" : 100) × "+o+" = "+num(g)+" miljard\nStap 2: "+o+(p<0?" − ":" + ")+num(g)+" = "+mrd(a)};},
uitk:function(){if(Math.random()<0.5){var l=rnd(210,340)*10+pick([0,25,50,80]),p=75,a=r(p/100*l,2);
return{f:"uitk",h:"Hoe hoog is de uitkering per maand? (2 decimalen)",body:qp(pick(["Stefanie","Robin","Yusuf","Mila","Bram"])+" verdiende bruto "+eur(l)+" per maand en wordt werkloos. De WW-uitkering is "+p+"% van het laatste loon."),a:a,d:2,u:"€",calc:"Uitkering = (percentage : 100) × loon\n("+p+" : 100) × "+num(l)+" = "+eur(a)};}
var u=r(rnd(1500,2400)+pick([0.5,0.25,0.8,0]),2),p2=75,b=r(u/p2*100,2);
return{f:"uitk",h:"Hoe hoog was het brutoloon per maand? (2 decimalen)",body:qp("Een WW-uitkering is bruto "+eur(u)+" per maand. Dat is "+p2+"% van het laatste loon."),a:b,d:2,u:"€",calc:"Terugrekenen naar 100%: (bedrag : percentage) × 100\n("+num(u)+" : "+p2+") × 100 = "+eur(b)};}
};
