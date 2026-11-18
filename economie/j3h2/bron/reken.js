var FORM={
eenheid:"(prijs : aantal gram) × 100",
goedkoopst:"(prijs : aantal gram) × 100",
makelaar:"(percentage : 100) × verkoopprijs",
kk:"(percentage : 100) × koopprijs",
ozb:"(percentage : 100) × WOZ-waarde",
pct:"(nieuw − oud) : oud × 100",
energie:"(verbruik oud − verbruik nieuw) × prijs per kWh"
};
var MODES=[["eenheid","Prijs per 100 gram"],["goedkoopst","Verpakkingen vergelijken"],["makelaar","Loon van de makelaar"],["kk","Kosten koper"],["ozb","Ozb"],["pct","Procent verandering"],["energie","Zuinig apparaat"]];
var NAMEN=["Daan","Sara","Yusuf","Lotte","Milan","Fenna","Jesse","Noor","Ravi","Evi"];
var WAAR=[["Een pot pindakaas","pot"],["Een zak muesli","zak"],["Een pak hagelslag","pak"],["Een pot jam","pot"],["Een zak pasta","zak"],["Een pak koffie","pak"],["Een zak drop","zak"]];
function p100(p,g){return r(p/g*100,2);}
var RGEN={
eenheid:function(){var w=pick(WAAR),g=pick([250,350,400,450,500,600,692,750,900]),p=money(1.2,5.5),a=p100(p,g);
return{f:"eenheid",h:"Wat kost 100 gram? (2 decimalen)",body:qp(w[0]+" van "+g+" gram kost "+eur(p)+"."),a:a,d:2,u:"€",calc:"Prijs per 100 gram = (prijs : aantal gram) × 100\n("+num(p)+" : "+g+") × 100 = "+eur(a)};},
goedkoopst:function(){var w=pick(WAAR),g1=pick([250,300,350,400]),g2=pick([500,600,750,900,1000]),p1=money(1.1,2.9),p2=r(p1*g2/g1*pick([0.72,0.8,0.86,0.93,1.08,1.15]),2),a1=p100(p1,g1),a2=p100(p2,g2);
if(a1===a2){p2=r(p2+0.2,2);a2=p100(p2,g2);}var a=Math.min(a1,a2);
return{f:"goedkoopst",h:"Wat kost 100 gram van de goedkoopste verpakking? (2 decimalen)",body:qp(w[0]+" is er in twee maten.")+stmt([["Verpakking","Prijs"],["De kleine "+w[1]+": "+g1+" gram",eur(p1)],["De grote "+w[1]+": "+num(g2)+" gram",eur(p2)]],"cpi"),a:a,d:2,u:"€",calc:"Prijs per 100 gram = (prijs : aantal gram) × 100\nKlein: ("+num(p1)+" : "+g1+") × 100 = "+eur(a1)+"\nGroot: ("+num(p2)+" : "+num(g2)+") × 100 = "+eur(a2)+"\nDe "+(a1<a2?"kleine":"grote")+" "+w[1]+" is per 100 gram het goedkoopst: "+eur(a)};},
makelaar:function(){var v=rnd(180,520)*1000,p=pick([1,1.2,1.25,1.4,1.5,1.75,2]),a=r(p/100*v,2);
return{f:"makelaar",h:"Hoeveel krijgt de makelaar? (2 decimalen)",body:qp("Een huis wordt verkocht voor "+eur(v)+". De makelaar krijgt "+pc(p)+" van de verkoopprijs."),a:a,d:2,u:"€",calc:"Loon makelaar = (percentage : 100) × verkoopprijs\n("+num(p)+" : 100) × "+num(v)+" = "+eur(a)};},
kk:function(){var v=rnd(190,480)*1000,p=pick([3,4,5,6]),k=r(p/100*v,2),tot=Math.random()<0.45,a=tot?r(v+k,2):k;
return{f:"kk",h:tot?"Hoeveel betaalt de koper in totaal (koopprijs + kosten koper)? (2 decimalen)":"Hoeveel zijn de kosten koper? (2 decimalen)",body:qp(pick(NAMEN)+" koopt een huis voor "+eur(v)+". De kosten koper zijn "+pc(p)+" van de koopprijs."),a:a,d:2,u:"€",calc:"Kosten koper = (percentage : 100) × koopprijs\n("+num(p)+" : 100) × "+num(v)+" = "+eur(k)+(tot?"\nTotaal = koopprijs + kosten koper = "+eur(v)+" + "+eur(k)+" = "+eur(a):"")};},
ozb:function(){var w=rnd(180,560)*1000,p=pick([0.08,0.09,0.1,0.11,0.12,0.14,0.15]),j=r(p/100*w,2),mnd=Math.random()<0.3,a=mnd?r(j/12,2):j;
return{f:"ozb",h:mnd?"Hoeveel ozb is dat per maand? (2 decimalen)":"Hoeveel ozb betaalt de eigenaar per jaar? (2 decimalen)",body:qp("De WOZ-waarde van een huis is "+eur(w)+". De gemeente rekent "+num(p)+"% ozb per jaar."),a:a,d:2,u:"€",calc:"Ozb = (percentage : 100) × WOZ-waarde\n("+num(p)+" : 100) × "+num(w)+" = "+eur(j)+" per jaar"+(mnd?"\n"+eur(j)+" : 12 = "+eur(a)+" per maand":"")};},
pct:function(){var v=pick([
function(){var o=rnd(520,780),n=o+rnd(12,45);return ["De huur van een sociale huurwoning gaat van "+eur(o)+" naar "+eur(n)+" per maand.",o,n,"Met hoeveel procent stijgt de huur?"];},
function(){var o=rnd(95,140)*10,n=o+rnd(4,12)*10;return ["De huur van een appartement in de vrije sector gaat van "+eur(o)+" naar "+eur(n)+" per maand.",o,n,"Met hoeveel procent stijgt de huur?"];},
function(){var o=rnd(240,420)*1000,n=o+rnd(-25,40)*1000;if(n===o)n=o+15000;return ["Een huis stond te koop voor "+eur(o)+". Het is verkocht voor "+eur(n)+".",o,n,"Hoeveel procent wijkt de verkoopprijs af van de vraagprijs?"];},
function(){var o=rnd(260,420),n=o-rnd(40,120);return ["Een oude koelkast verbruikt "+o+" kWh per jaar. Een nieuwe verbruikt "+n+" kWh per jaar.",o,n,"Met hoeveel procent verandert het verbruik?"];}
])();var a=r((v[2]-v[1])/v[1]*100,1);
return{f:"pct",h:v[3]+" (1 decimaal; typ een min-teken bij een daling)",body:qp(v[0]),a:a,d:1,u:"%",calc:"Verandering in procenten = (nieuw − oud) : oud × 100\n("+num(v[2])+" − "+num(v[1])+") : "+num(v[1])+" × 100 = "+pc(a)+(a<0?"\nDus een daling van "+pc(-a):"")};},
energie:function(){var w=pick(["koelkast","wasmachine","droger","vriezer","vaatwasser"]),o=rnd(220,480),n=o-rnd(60,180),p=pick([0.24,0.28,0.3,0.32,0.35,0.4]),a=r((o-n)*p,2);
return{f:"energie",h:"Hoeveel euro bespaar je per jaar met het zuinige apparaat? (2 decimalen)",body:qp("Een oude "+w+" verbruikt "+o+" kWh per jaar. Een nieuwe "+w+" met een beter energielabel verbruikt "+n+" kWh per jaar. Stroom kost "+eur(p)+" per kWh."),a:a,d:2,u:"€",calc:"Besparing = (verbruik oud − verbruik nieuw) × prijs per kWh\n("+o+" − "+n+") × "+num(p)+" = "+eur(a)};}
};
