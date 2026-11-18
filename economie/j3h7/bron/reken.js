var FORM={
pct:"(nieuw − oud) : oud × 100",
procentvan:"(percentage : 100) × totaal",
deel:"(deel : geheel) × 100",
ww:"(percentage : 100) × totaal",
saldo:"inkomsten − uitgaven"
};
var MODES=[["pct","Procent verandering"],["procentvan","Procent van een bedrag"],["deel","Deel van het geheel"],["ww","WW-uitkering"],["saldo","Begrotingssaldo"]];
function mrd(x){return "€"+num(x)+" miljard";}
var RGEN={
pct:function(){var v=pick([
function(){var o=rnd(380,450),n=o-rnd(8,45);return ["Het aantal gemeentes in Nederland daalde van "+o+" naar "+n+".",o,n,"Met hoeveel procent is het aantal gemeentes veranderd?"];},
function(){var o=rnd(70,82)/100,n=r(o+rnd(2,9)/100,2);return ["De accijns op een liter benzine ging van "+eur(o)+" naar "+eur(n)+".",o,n,"Met hoeveel procent is de accijns gestegen?"];},
function(){var o=rnd(440,500),n=o+rnd(6,30);return ["De staatsschuld steeg van "+mrd(o)+" naar "+mrd(n)+".",o,n,"Met hoeveel procent is de staatsschuld gestegen?"];},
function(){var o=rnd(320,400)*1000,n=o-rnd(10,50)*1000;return ["Het aantal mensen met een WW-uitkering daalde van "+num(o)+" naar "+num(n)+".",o,n,"Met hoeveel procent is het aantal veranderd?"];}
])();var a=r((v[2]-v[1])/v[1]*100,1);
return{f:"pct",h:v[3]+" (1 decimaal; typ een min-teken bij een daling)",body:qp(v[0]),a:a,d:1,u:"%",calc:"Procentuele verandering = (nieuw − oud) : oud × 100\n("+num(v[2])+" − "+num(v[1])+") : "+num(v[1])+" × 100 = "+pc(a)+(a<0?"\nDus een daling van "+pc(-a):"")};},
procentvan:function(){var t=pick([1.2,2.3,3.5,4.8,0.9,6.4]),p=pick([15,25,30,45,60]),a=r(p/100*t*1000000,0),wat=pick(["een theater","een zwembad","een museum","een bibliotheek","een sportclub"]);
return{f:"procentvan",h:"Hoeveel euro subsidie is dat?",body:qp("Op de begroting van "+wat+" staat €"+num(t)+" miljoen aan inkomsten. Daarvan is "+p+"% subsidie."),a:a,d:0,u:"€",calc:"Bedrag = (percentage : 100) × totaal\n("+p+" : 100) × "+num(t*1000000)+" = €"+num(a)};},
deel:function(){if(Math.random()<0.5){var kale=rnd(45,60)/100,marge=rnd(15,22)/100,acc=rnd(68,80)/100,btw=r((kale+marge+acc)*0.21,2),tot=r(kale+marge+acc+btw,2),a=r((acc+btw)/tot*100,1);
return{f:"deel",h:"Hoeveel procent van de literprijs is belasting? (1 decimaal)",body:stmt([["Kale prijs benzine",eur(kale)],["Kosten en winst pomphouder",eur(marge)],["Accijns",eur(acc)],["Btw",eur(btw)],["Prijs per liter",eur(tot)]]),a:a,d:1,u:"%",calc:"Belasting = accijns + btw = "+num(acc)+" + "+num(btw)+" = "+eur(r(acc+btw,2))+"\nPercentage = (deel : geheel) × 100\n("+num(r(acc+btw,2))+" : "+num(tot)+") × 100 = "+pc(a)};}
var k=[rnd(90,130),rnd(80,110),rnd(110,140),rnd(140,170),rnd(60,90)],tot2=k[0]+k[1]+k[2]+k[3]+k[4],s=k[1]+k[3],b=r(s/tot2*100,1);
return{f:"deel",h:"Hoeveel procent van de klanten hebben B en D samen? (1 decimaal)",body:qp("Vier bedrijven en een paar kleine winkels verkopen hetzelfde product. De bedrijven B en D gaan samen.")+stmt([["Bedrijf A",k[0]+" klanten"],["Bedrijf B",k[1]+" klanten"],["Bedrijf C",k[2]+" klanten"],["Bedrijf D",k[3]+" klanten"],["De rest",k[4]+" klanten"]]),a:b,d:1,u:"%",calc:"B + D = "+k[1]+" + "+k[3]+" = "+s+" klanten\nTotaal = "+tot2+" klanten\n("+s+" : "+tot2+") × 100 = "+pc(b)};},
ww:function(){var l=rnd(200,340)*10+pick([0,20,50,80]),vroeg=Math.random()<0.5,p=vroeg?75:70,a=r(p/100*l,2);
return{f:"ww",h:"Hoe hoog is de WW-uitkering per maand? (2 decimalen)",body:qp(pick(["Stefanie","Robin","Yusuf","Mila","Bram"])+" verdiende bruto "+eur(l)+" per maand en is buiten "+"eigen schuld ontslagen. Het is nu maand "+(vroeg?pick([1,2]):pick([3,4,5,6]))+" van de WW. De eerste twee maanden krijg je 75%, daarna 70%."),a:a,d:2,u:"€",calc:"Maand "+(vroeg?"1 en 2: 75%":"3 en later: 70%")+"\nUitkering = (percentage : 100) × loon\n("+p+" : 100) × "+num(l)+" = "+eur(a)};},
saldo:function(){var i=rnd(330,430),u=i+pick([-18,-12,-9,-6,-4,5,8,11,15,21,29,35]),a=i-u;
return{f:"saldo",h:"Wat is het begrotingssaldo, in miljard euro? (typ een min-teken bij een tekort)",body:stmt([["Inkomsten van het Rijk",mrd(i)],["Uitgaven van het Rijk",mrd(u)]]),a:a,d:0,u:"",calc:"Begrotingssaldo = inkomsten − uitgaven\n"+i+" − "+u+" = "+a+" miljard\n"+(a<0?"Meer uitgaven dan inkomsten: een begrotingstekort van "+mrd(-a)+". De staatsschuld loopt op.":"Meer inkomsten dan uitgaven: een begrotingsoverschot van "+mrd(a)+".")};}
};
