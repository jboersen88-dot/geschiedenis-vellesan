var FORM={
loon:"(weekloon × 52) : 12",
winst:"(percentage : 100) × totaal",
jaren:"totaal aantal uren : uren van een voltijdbaan",
deel:"(deel : geheel) × 100",
pct:"(nieuw − oud) : oud × 100"
};
var MODES=[["loon","Loon per maand"],["winst","Winst verdelen"],["jaren","Arbeidsjaren"],["deel","Werkloosheid in procenten"],["pct","Procent verandering"]];
var RGEN={
loon:function(){var u=pick([12,16,20,24,28,32,36]),h=r(rnd(1300,2400)/100,2),w=r(u*h,2),a=r(w*52/12,2);
if(Math.random()<0.5){w=rnd(28,72)*10;a=r(w*52/12,2);return{f:"loon",h:"Bereken het loon per maand. (2 decimalen)",body:qp("Een werknemer verdient "+eur(w)+" per week. Een jaar heeft 52 weken."),a:a,d:2,u:"€",calc:"Maandloon = (weekloon × 52) : 12\n("+eur(w)+" × 52) : 12 = "+eur(a)};}
return{f:"loon",h:"Bereken het loon per maand. (2 decimalen)",body:qp("Een werknemer werkt "+u+" uur per week voor "+eur(h)+" per uur. Een jaar heeft 52 weken."),a:a,d:2,u:"€",calc:"Stap 1: "+u+" × "+eur(h)+" = "+eur(w)+" per week\nStap 2: maandloon = (weekloon × 52) : 12\n("+eur(w)+" × 52) : 12 = "+eur(a)};},
winst:function(){var t=rnd(40,160)*1000,p=pick([25,30,35,40,45,55,60,65]),a=r(p/100*t,2),n=pick(["Sam","Noor","Yusuf","Lotte","Daan","Amira"]);
if(Math.random()<0.4){var b=r((100-p)/100*t,2);return{f:"winst",h:"Hoeveel winst krijgt de andere vennoot? (2 decimalen)",body:qp("Een vof met twee vennoten maakt "+eur(t)+" winst. "+n+" krijgt volgens de afspraak "+p+"% van de winst. De andere vennoot krijgt de rest."),a:b,d:2,u:"€",calc:"Stap 1: 100% − "+p+"% = "+(100-p)+"%\nStap 2: bedrag = (percentage : 100) × totaal\n("+(100-p)+" : 100) × "+eur(t)+" = "+eur(b)};}
return{f:"winst",h:"Hoeveel winst krijgt "+n+"? (2 decimalen)",body:qp("Een vof maakt "+eur(t)+" winst. De vennoten hebben afgesproken dat "+n+" "+p+"% van de winst krijgt."),a:a,d:2,u:"€",calc:"Bedrag = (percentage : 100) × totaal\n("+p+" : 100) × "+eur(t)+" = "+eur(a)};},
jaren:function(){var vt=pick([36,40]),n=rnd(2,14),d=vt===36?pick([[18,rnd(1,9)],[24,pick([3,6,9])],[12,pick([3,6,9])],[27,pick([4,8])],[9,pick([2,4,6,8])]]):pick([[20,rnd(1,9)],[32,pick([5,10])],[24,pick([5,10])],[16,pick([5,10])],[10,pick([2,4,6,8])]]),tot=n*vt+d[0]*d[1],a=r(tot/vt,1);
return{f:"jaren",h:"Hoeveel arbeidsjaren werk is er in dit bedrijf? (1 decimaal)",body:qp("Een voltijdbaan is in een bedrijf "+vt+" uur per week. Er werken "+n+" mensen in voltijd en "+d[1]+" mensen in een deeltijdbaan van "+d[0]+" uur per week."),a:a,d:1,u:"",calc:"Arbeidsjaren = totaal aantal uren : uren van een voltijdbaan\nStap 1: "+n+" × "+vt+" + "+d[1]+" × "+d[0]+" = "+num(tot)+" uur\nStap 2: "+num(tot)+" : "+vt+" = "+num(a)+" arbeidsjaren\nEr werken "+(n+d[1])+" personen, maar samen doen zij het werk van "+num(a)+" voltijdbanen."};},
deel:function(){var bb=rnd(40,960)*10,wl=Math.round(bb*rnd(25,95)/1000/10)*10,a=r(wl/bb*100,1);
if(Math.random()<0.45){var wk=bb-wl;return{f:"deel",h:"Hoeveel procent van de beroepsbevolking is werkloos? (1 decimaal)",body:qp("In een regio werken "+num(wk)+" mensen. Er zijn "+num(wl)+" mensen werkloos. Samen zijn zij de beroepsbevolking."),a:a,d:1,u:"%",calc:"Stap 1: beroepsbevolking = "+num(wk)+" + "+num(wl)+" = "+num(bb)+"\nStap 2: (deel : geheel) × 100\n("+num(wl)+" : "+num(bb)+") × 100 = "+pc(a)};}
return{f:"deel",h:"Hoeveel procent van de beroepsbevolking is werkloos? (1 decimaal)",body:qp("De beroepsbevolking van een regio bestaat uit "+num(bb)+" mensen. Daarvan zijn "+num(wl)+" mensen werkloos."),a:a,d:1,u:"%",calc:"Percentage = (deel : geheel) × 100\n("+num(wl)+" : "+num(bb)+") × 100 = "+pc(a)};},
pct:function(){var v=pick([
function(){var o=rnd(30,90)*100,n=o+rnd(-20,25)*100;if(n===o)n=o+700;return ["Het aantal werklozen in een regio ging van "+num(o)+" naar "+num(n)+".",o,n,"Met hoeveel procent is het aantal werklozen veranderd?"];},
function(){var o=rnd(12,60)*10,n=o+rnd(-9,14)*10;if(n===o)n=o-40;return ["Het aantal vacatures in een stad ging van "+num(o)+" naar "+num(n)+".",o,n,"Met hoeveel procent is het aantal vacatures veranderd?"];},
function(){var o=rnd(20,80)*100,n=o+rnd(2,12)*100;return ["De werkgelegenheid in een bedrijfstak steeg van "+num(o)+" naar "+num(n)+" arbeidsjaren.",o,n,"Met hoeveel procent is de werkgelegenheid gestegen?"];},
function(){var o=rnd(180,320)*10,n=o+rnd(4,22)*10;return ["Volgens de nieuwe cao gaat een maandloon van "+eur(o)+" naar "+eur(n)+".",o,n,"Met hoeveel procent stijgt het loon?"];}
])();var a=r((v[2]-v[1])/v[1]*100,1);
return{f:"pct",h:v[3]+" (1 decimaal; typ een min-teken bij een daling)",body:qp(v[0]),a:a,d:1,u:"%",calc:"Procentuele verandering = (nieuw − oud) : oud × 100\n("+num(v[2])+" − "+num(v[1])+") : "+num(v[1])+" × 100 = "+pc(a)+(a<0?"\nDus een daling van "+pc(-a):"")};}
};
