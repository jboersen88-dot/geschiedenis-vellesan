var FORM={
geldh:"chartaal geld + giraal geld",
pct:"(nieuw − oud) : oud × 100",
intr:"(intrinsieke waarde : nominale waarde) × 100",
index:"(getal gevraagd jaar : getal basisjaar) × 100",
ric:"(NIC : PIC) × 100",
koopk:"RIC − 100",
reeel:"rente − inflatie"
};
var MODES=[["geldh","Geldhoeveelheid"],["pct","Procent verandering"],["intr","Intrinsieke waarde"],["index","Indexcijfer"],["ric","Reëel inkomen (RIC)"],["koopk","Koopkracht"],["reeel","Reële rente"]];
function mld(x){return "€"+num(x)+" mld";}
var RGEN={
geldh:function(){var c=rnd(45,90),g=rnd(280,520),sp=rnd(350,700),dp=rnd(60,180),kl=rnd(5,25),rows=shuffle([["Chartaal geld bij gezinnen, bedrijven en overheid",mld(c),"c"],["Giraal geld op betaalrekeningen",mld(g),"g"],["Geld op spaarrekeningen",mld(sp)],["Spaardeposito's",mld(dp)],["Chartaal geld in de kluizen van banken",mld(kl)]]),a=c+g;
return{f:"geldh",h:"Hoe groot is de maatschappelijke geldhoeveelheid? (in miljard euro)",body:stmt(rows.map(function(x){return [x[0],x[1]];})),a:a,d:0,u:"",calc:"Geldhoeveelheid = chartaal geld (buiten de banken) + giraal geld\n"+c+" + "+g+" = "+mld(a)+"\nSpaargeld, deposito's en geld in de kluis van de bank tellen niet mee: dat kun je niet direct gebruiken."};},
pct:function(){var v=pick([
function(){var o=rnd(36,48)*10,n=o+rnd(-3,6)*8;return ["Het girale geld in een land ging van "+mld(o)+" naar "+mld(n)+".",o,n,"Met hoeveel procent is het girale geld veranderd?"];},
function(){var o=rnd(50,70),n=o-rnd(2,9);return ["Er was "+mld(o)+" aan chartaal geld in omloop. Een jaar later is dat "+mld(n)+".",o,n,"Met hoeveel procent is het chartale geld veranderd?"];},
function(){var o=rnd(150,260)/100,n=r(o+rnd(5,40)/100,2);return ["Een brood kostte vorig jaar "+eur(o)+". Nu kost het "+eur(n)+".",o,n,"Met hoeveel procent is de prijs gestegen?"];},
function(){var o=rnd(2200,2900),n=o+rnd(40,160);return ["Het maandloon van Sanne ging van "+eur(o)+" naar "+eur(n)+".",o,n,"Met hoeveel procent is haar loon gestegen?"];}
])();var a=r((v[2]-v[1])/v[1]*100,1);
return{f:"pct",h:v[3]+" (1 decimaal; typ een min-teken bij een daling)",body:qp(v[0]),a:a,d:1,u:"%",calc:"Procentuele verandering = (nieuw − oud) : oud × 100\n("+num(v[2])+" − "+num(v[1])+") : "+num(v[1])+" × 100 = "+pc(a)+(a<0?"\nDus een daling van "+pc(-a):"")};},
intr:function(){var v=pick([["een munt van 20 cent",0.20,pick([0.01,0.02,0.03])],["een munt van €2",2,pick([0.08,0.10,0.12,0.15])],["een munt van €1",1,pick([0.05,0.06,0.08,0.10])],["een munt van 50 cent",0.50,pick([0.02,0.03,0.04,0.05])],["een biljet van €50",50,pick([0.05,0.08,0.10])]]),a=r(v[2]/v[1]*100,1);
return{f:"intr",h:"Hoeveel procent van de nominale waarde is de intrinsieke waarde? (1 decimaal)",body:qp("Op "+v[0]+" staat "+eur(v[1])+". Het materiaal is "+eur(v[2])+" waard."),a:a,d:1,u:"%",calc:"Percentage = (intrinsieke waarde : nominale waarde) × 100\n"+num(v[2])+" : "+num(v[1])+" × 100 = "+pc(a)+"\nDe extrinsieke waarde is veel hoger dan de intrinsieke: fiduciair geld."};},
index:function(){var v=pick([["Een ijsje",money(1.2,2.5),[3,25]],["Een liter benzine",money(1.6,2.1),[-8,15]],["Een bioscoopkaartje",money(9,13),[2,18]],["Een zak chips",money(1.1,2.2),[4,30]],["De huur van een studio",rnd(55,85)*10,[2,9]]]),b=v[1],n=r(b*(1+rnd(v[2][0],v[2][1])/100),2);if(n===b)n=r(b+0.1,2);var a=r(n/b*100,1);
return{f:"index",h:"Wat is het indexcijfer van de prijs? (1 decimaal)",body:qp(v[0]+" kostte in het basisjaar "+eur(b)+". Nu kost het "+eur(n)+"."),a:a,d:1,u:"",calc:"Indexcijfer = (prijs nu : prijs in het basisjaar) × 100\n"+num(n)+" : "+num(b)+" × 100 = "+i1(a)+"\n"+(a>=100?"Dat is "+pc(r(a-100,1))+" duurder dan in het basisjaar.":"Dat is "+pc(r(100-a,1))+" goedkoper dan in het basisjaar.")};},
ric:function(){if(Math.random()<0.5){var N=r(100+rnd(-10,90)/10,1),Pi=r(100+rnd(5,90)/10,1),a=r(N/Pi*100,1);
return{f:"ric",h:"Bereken het indexcijfer van het reële inkomen (RIC). (1 decimaal)",body:qp("Het indexcijfer van het nominale inkomen (NIC) is "+i1(N)+". Het indexcijfer van de prijzen (PIC) is "+i1(Pi)+"."),a:a,d:1,u:"",calc:"RIC = (NIC : PIC) × 100\n"+i1(N)+" : "+i1(Pi)+" × 100 = "+i1(a)+"\nDe koopkracht "+(a>100?"stijgt met "+pc(r(a-100,1)):a<100?"daalt met "+pc(r(100-a,1)):"blijft gelijk")+"."};}
var nm=pick(["Eva","Tim","Noor","Ayoub","Lisa","Daan"]),o=rnd(22,32)*100,n=o+rnd(0,12)*10+rnd(1,9)*5,p=pick([1.5,2,2.4,2.6,3,3.3,3.8]),N2=r(n/o*100,1),P2=r(100+p,1),a2=r(N2/P2*100,1);
return{f:"ric",h:"Bereken het indexcijfer van het reële inkomen (RIC). (1 decimaal)",body:qp(nm+" verdient in 2025 "+eur(o)+" per maand en in 2026 "+eur(n)+". De prijzen stijgen met "+pc(p)+"."),a:a2,d:1,u:"",calc:"Stap 1, NIC: "+num(n)+" : "+num(o)+" × 100 = "+i1(N2)+"\nStap 2, PIC: prijzen + "+pc(p)+" → "+i1(P2)+"\nStap 3, RIC: "+i1(N2)+" : "+i1(P2)+" × 100 = "+i1(a2)+"\nDe koopkracht "+(a2>100?"stijgt met "+pc(r(a2-100,1)):a2<100?"daalt met "+pc(r(100-a2,1)):"blijft gelijk")+"."};},
koopk:function(){var l=pick([0,1,1.5,2,2.5,3,3.5,4,4.5,5]),p=pick([1,1.5,2,2.5,3,3.3,4,5]),N=100+l,Pi=100+p,ric=r(N/Pi*100,1),a=r(ric-100,1);
return{f:"koopk",h:"Met hoeveel procent verandert de koopkracht? (1 decimaal; typ een min-teken bij een daling)",body:qp("Je loon stijgt met "+pc(l)+". De prijzen stijgen met "+pc(p)+"."),a:a,d:1,u:"%",calc:"NIC = "+i1(N)+" en PIC = "+i1(Pi)+"\nRIC = ("+i1(N)+" : "+i1(Pi)+") × 100 = "+i1(ric)+"\nKoopkracht: "+i1(ric)+" − 100 = "+pc(a)};},
reeel:function(){var rt=pick([0.5,0.75,1,1.25,1.5,1.8,2,2.35,2.5,3]),inf=pick([1.2,1.8,2.1,2.6,3.1,3.3,3.6,4.2]),a=r(rt-inf,2);
return{f:"reeel",h:"Wat is de reële rente? (2 decimalen; typ een min-teken als hij negatief is)",body:qp("De spaarrente is "+num(rt)+"%. De inflatie is "+num(inf)+"%."),a:a,d:2,u:"%",calc:"Reële rente ≈ rente − inflatie\n"+num(rt)+" − "+num(inf)+" = "+num(a)+"%\n"+(a<0?"Negatief: je spaargeld verliest koopkracht.":"Positief: je spaargeld wordt echt meer waard.")};}
};
