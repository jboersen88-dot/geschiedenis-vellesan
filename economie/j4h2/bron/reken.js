var FORM={
budget:"inkomsten − uitgaven",
maand:"(weekbedrag × 52) : 12",
week:"(maandbedrag × 12) : 52",
reserve:"(benodigd bedrag − al gespaard) : aantal maanden",
enkel:"(percentage : 100) × bedrag × aantal jaren",
samen:"bedrag × groeifactor ^ aantal jaren",
reeel:"nominale rente − inflatie",
rend:"koerswinst + dividend",
krediet:"(termijn × aantal termijnen) − krediet",
kredpct:"(kredietkosten : krediet) × 100",
saldo:"oud saldo + ontvangsten − betalingen"
};

var MODES=[["budget","Budgetplan"],["maand","Week ↔ maand"],["reserve","Reserveren"],["enkel","Enkelvoudige rente"],["samen","Samengestelde rente"],["reeel","Reële rente"],["rend","Rendement aandelen"],["krediet","Kredietkosten"],["kredpct","Kredietkosten in %"],["saldo","Saldo"]];
var RGEN={
budget:function(){var inc=shuffle([["Salaris",money(900,1900)],["Kinderbijslag",money(60,260)],["Belastingteruggave",money(40,300)],["Bijbaan",money(80,400)]]).slice(0,rnd(2,4)),out=shuffle([["Vaste lasten",money(500,1400)],["Huishoudelijke uitgaven",money(250,700)],["Incidentele uitgaven",money(80,600)],["Sparen voor reserveringen",money(50,300)]]).slice(0,rnd(3,4));
var ti=0,to=0;inc.forEach(function(x){ti+=x[1];});out.forEach(function(x){to+=x[1];});ti=r(ti,2);to=r(to,2);var a=r(ti-to,2);
var rows=[["Inkomsten per maand",""]].concat(inc.map(function(x){return [x[0],eur(x[1])];})).concat([["Uitgaven per maand",""]]).concat(out.map(function(x){return [x[0],eur(x[1])];}));
return{f:"budget",h:"Is er een overschot of een tekort? Bereken het verschil (typ een min-teken bij een tekort).",body:stmt(rows,"cpi"),a:a,d:2,u:"€",calc:"Totaal inkomsten: "+eur(ti)+"\nTotaal uitgaven: "+eur(to)+"\n"+eur(ti)+" − "+eur(to)+" = "+eur(a)+(a<0?"\nTekort: de uitgaven zijn hoger dan de inkomsten.":a>0?"\nOverschot: er blijft geld over.":"\nIn balans.")};},
reeel:function(){var nom=rnd(5,45)/10,inf=rnd(0,60)/10,a=r(nom-inf,1);
return{f:"reeel",h:"Wat is de reële rente? (1 decimaal, typ een min-teken bij negatief)",body:qp("De bank geeft "+pc(nom)+" rente (nominale rente). De inflatie is "+pc(inf)+"."),a:a,d:1,u:"%",calc:"Reële rente = nominale rente − inflatie\n"+pc(nom)+" − "+pc(inf)+" = "+pc(a)+"\n"+(a>0?"Positief: je spaargeld wordt meer waard en je koopkracht stijgt.":a<0?"Negatief: je spaargeld verliest waarde en je koopkracht daalt.":"Je koopkracht blijft gelijk.")};},
rend:function(){var n=pick([50,100,150,200,320,550]),k=rnd(900,4500)/100,w=r(k*(1+rnd(-12,35)/100),2),dv=pick([0.25,0.38,0.55,1.25,0.8]),kw=r((w-k)*n,2),dd=r(dv*n,2),tot=r(kw+dd,2),inl=r(k*n,2),pctQ=Math.random()<0.4;
var body=qp("Je koopt "+n+" aandelen voor "+eur(k)+" per stuk. Later verkoop je ze voor "+eur(w)+" per stuk. Je ontvangt "+eur(dv)+" dividend per aandeel.");
var calc="Koerswinst: ("+num(w)+" − "+num(k)+") × "+n+" = "+eur(kw)+"\nDividend: "+num(dv)+" × "+n+" = "+eur(dd)+"\nRendement = koerswinst + dividend = "+eur(tot);
if(pctQ){var a=r(tot/inl*100,1);return{f:"rend",h:"Hoeveel procent is het rendement van je inleg? (1 decimaal, min-teken bij verlies)",body:body,a:a,d:1,u:"%",calc:calc+"\nInleg: "+n+" × "+num(k)+" = "+eur(inl)+"\n("+num(tot)+" : "+num(inl)+") × 100 = "+pc(a)};}
return{f:"rend",h:"Bereken het rendement in euro's (2 decimalen, min-teken bij verlies).",body:body,a:tot,d:2,u:"€",calc:calc};},
kredpct:function(){var K=pick([5000,7000,12000,15000,25000]),n=pick([24,36,48,60]),i=pick([0.07,0.09,0.11,0.14,0.18]),t=r(K*(1+i*n/12)/n,2),tot=r(t*n,2),kk=r(tot-K,2),a=r(kk/K*100,1);
return{f:"kredpct",h:"Hoeveel procent zijn de kredietkosten van het geleende bedrag? (1 decimaal)",body:qp("Je leent "+eur(K)+" en betaalt "+n+" termijnen van "+eur(t)+"."),a:a,d:1,u:"%",calc:"Totaal terugbetaald: "+n+" × "+num(t)+" = "+eur(tot)+"\nKredietkosten = "+eur(tot)+" − "+eur(K)+" = "+eur(kk)+"\n("+num(kk)+" : "+num(K)+") × 100 = "+pc(a)};},
enkel:function(){var b=pick([1500,2000,2250,2500,3000,3750,4000,4150,5000,6250]),p=rnd(10,35)/10,n=rnd(2,6),per=r(p/100*b,2),tot=r(per*n,2),eind=Math.random()<0.45,a=eind?r(b+tot,2):tot;
return{f:"enkel",h:eind?"Wat is het eindbedrag na "+n+" jaar (inleg + rente)? (2 decimalen)":"Hoeveel rente krijg je in totaal? (2 decimalen)",body:qp("Je zet "+eur(b)+" op een spaardeposito, "+n+" jaar vast tegen "+pc(p)+" enkelvoudige rente per jaar."),a:a,d:2,u:"€",
calc:"Enkelvoudige rente = (percentage : 100) × bedrag × aantal jaren\n("+i1(p)+" : 100) × "+num(b)+" = "+eur(per)+" per jaar\n"+eur(per)+" × "+n+" = "+eur(tot)+" rente"+(eind?"\nEindbedrag: "+eur(b)+" + "+eur(tot)+" = "+eur(a):"")};},
samen:function(){var b=pick([800,1000,1250,1500,2000,2500,2900,3750,5000]),p=pick([1.2,1.5,1.8,2,2.2,2.5,2.6,3,3.5]),n=rnd(2,6),g=r(1+p/100,4),e=r(b*Math.pow(g,n),2),renteQ=Math.random()<0.3,a=renteQ?r(e-b,2):e;
return{f:"samen",h:renteQ?"Hoeveel rente heb je in totaal gekregen? (2 decimalen)":"Wat is het eindbedrag na "+n+" jaar? (2 decimalen)",body:qp("Je zet "+eur(b)+" op een spaarrekening met "+pc(p)+" samengestelde rente per jaar. Je laat het geld "+n+" jaar staan."),a:a,d:2,u:"€",
calc:"Groeifactor = 1 + ("+i1(p)+" : 100) = "+num(g)+"\n"+num(b)+" × "+num(g)+(SUP[n]||"^"+n)+" = "+eur(e)+(renteQ?"\nRente = "+eur(e)+" − "+eur(b)+" = "+eur(a):"")};},
krediet:function(){var K=pick([2500,4000,5000,6000,7500,10000]),j=pick([6.9,7.4,7.9,8.5,8.9]),mr=Math.pow(1+j/100,1/12)-1;
var rows=[24,36,48,60].map(function(n){return [n,r(K*mr/(1-Math.pow(1+mr,-n)),2)];}),x=pick(rows),a=r(x[1]*x[0]-K,2);
return{f:"krediet",h:"Bereken de kredietkosten (2 decimalen).",body:qp("Je leent "+eur(K)+" met een persoonlijke lening. Je kiest een looptijd van "+x[0]+" maanden. Gebruik de tabel.")+stmt([["Looptijd","Maandtermijn"]].concat(rows.map(function(y){return [y[0]+" maanden",eur(y[1])];})),"cpi"),a:a,d:2,u:"€",
calc:"Kredietkosten = (termijnbedrag × aantal termijnen) − krediet\n"+eur(x[1])+" × "+x[0]+" = "+eur(r(x[1]*x[0],2))+"\n"+eur(r(x[1]*x[0],2))+" − "+eur(K)+" = "+eur(a)};},
maand:function(){
if(Math.random()<0.55){var w=pick([["Je verdient met je bijbaan ",35,140],["Je krijgt aan zakgeld ",8,25],["Je gezin geeft aan boodschappen ",120,240]]),x=money(w[1],w[2]),j=r(x*52,2),a=r(x*52/12,2);
return{f:"maand",h:"Hoeveel is dat per maand? (2 decimalen)",body:qp(w[0]+eur(x)+" per week."),a:a,d:2,u:"€",calc:"Week → maand: (weekbedrag × 52) : 12\n"+eur(x)+" × 52 = "+eur(j)+" per jaar\n"+eur(j)+" : 12 = "+eur(a)+" per maand\n(Niet × 4: een maand is langer dan 4 weken!)"};}
var m=pick([["Je huur is ",450,950],["Je telefoonabonnement kost ",12,45],["Je sportcontributie is ",15,40],["Je verdient met je bijbaan ",180,520]]),y=money(m[1],m[2]),j2=r(y*12,2),b=r(y*12/52,2);
return{f:"week",h:"Hoeveel is dat per week? (2 decimalen)",body:qp(m[0]+eur(y)+" per maand."),a:b,d:2,u:"€",calc:"Maand → week: (maandbedrag × 12) : 52\n"+eur(y)+" × 12 = "+eur(j2)+" per jaar\n"+eur(j2)+" : 52 = "+eur(b)+" per week"};},
reserve:function(){var v=pick([["rijlessen",rnd(18,32)*50],["een vakantie",rnd(10,24)*50],["een nieuwe laptop",rnd(12,24)*50],["een scooter",rnd(30,50)*50],["de jaarlijkse autoverzekering",rnd(40,90)*10]]),m=pick([4,5,6,8,9,10,12]),g=Math.random()<0.5?0:Math.round(v[1]*rnd(10,40)/100/10)*10,a=r((v[1]-g)/m,2);
return{f:"reserve",h:"Hoeveel moet je per maand reserveren? (2 decimalen)",body:qp("Over "+m+" maanden heb je "+eur(v[1])+" nodig voor "+v[0]+"."+(g?" Je hebt al "+eur(g)+" gespaard.":"")),a:a,d:2,u:"€",calc:"Reservering per maand = (benodigd bedrag − al gespaard) : aantal maanden\n("+eur(v[1])+" − "+eur(g)+") : "+m+" = "+eur(a)};},
saldo:function(){var o=money(40,900),plusL=shuffle(["Loon bijbaan","Zakgeld","Terugbetaling webshop","Verjaardagsgeld","Tikkie van een vriend"]),minL=shuffle(["Supermarkt","Telefoonabonnement","Sportschool","Webshop","Bioscoop","Kapper","Opladen ov-chipkaart"]),rows=[["Oud saldo (credit)",eur(o)]],sp=0,sm=0,k=rnd(3,5);
for(var i=0;i<k;i++){var plus=i===0||Math.random()<0.35;if(plus){var x=money(10,250);sp+=x;rows.push([plusL.pop(),"+ "+eur(x)]);}else{var y=money(5,140);sm+=y;rows.push([minL.pop(),"− "+eur(y)]);}}
sp=r(sp,2);sm=r(sm,2);var a=r(o+sp-sm,2);rows.push(["Nieuw saldo","?",1]);
return{f:"saldo",h:"Wat is het nieuwe saldo? (typ een min-teken als je rood staat)",body:stmt(rows),a:a,d:2,u:"€",calc:"Nieuw saldo = oud saldo + ontvangsten − betalingen\n"+eur(o)+" + "+eur(sp)+" − "+eur(sm)+" = "+eur(a)+"\n"+(a>=0?"Creditsaldo: je hebt geld tegoed.":"Debetsaldo: je staat rood.")};}
};
