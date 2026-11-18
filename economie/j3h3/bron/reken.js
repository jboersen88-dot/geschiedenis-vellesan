var FORM={
saldo:"oud saldo + ontvangsten − uitgaven",
terug:"nieuw saldo − ontvangsten + uitgaven",
enkel:"(percentage : 100) × spaarbedrag × aantal jaren",
samen:"beginbedrag × (groeifactor ^ aantal jaren)",
krediet:"(termijnbedrag × aantal termijnen) − krediet",
kredpct:"(kredietkosten : krediet) × 100",
aandeel:"(verkoopprijs − aankoopprijs) × aantal aandelen",
valuta:"euro's × wisselkoers",
terugw:"vreemd geld : wisselkoers"
};
var MODES=[["saldo","Nieuw saldo"],["terug","Oud saldo terugrekenen"],["enkel","Enkelvoudige rente"],["samen","Samengestelde rente"],["krediet","Kredietkosten"],["kredpct","Kredietkosten in %"],["aandeel","Winst op aandelen"],["valuta","Euro → vreemd geld"],["terugw","Vreemd geld → euro"]];
var NAMEN=["Daan","Sara","Yusuf","Lotte","Milan","Fenna","Jesse","Noor","Ravi","Evi"];
var GELD=[["Deense kronen","Denemarken",730,760],["Poolse zloty","Polen",415,440],["Britse ponden","Engeland",83,89],["Zwitserse franken","Zwitserland",93,98],["Amerikaanse dollars","de Verenigde Staten",104,112],["Turkse lira","Turkije",3400,3700]];
function boekingen(){var plusL=shuffle(["Loon bijbaan","Zakgeld","Terugbetaling webshop","Verjaardagsgeld","Betaalverzoek van een vriend"]),minL=shuffle(["Supermarkt","Telefoonabonnement","Sportschool","Webshop","Bioscoop","Kapper","Opladen ov-chipkaart"]),rows=[],sp=0,sm=0,k=rnd(3,5);
for(var i=0;i<k;i++){var plus=i===0||Math.random()<0.35;if(plus){var x=money(10,250);sp+=x;rows.push([plusL.pop(),eur(x)+" bij"]);}else{var y=money(5,140);sm+=y;rows.push([minL.pop(),eur(y)+" af"]);}}
return{rows:rows,sp:r(sp,2),sm:r(sm,2)};}
function kredTab(){var j=pick([6.9,7.4,7.9,8.5,8.9,9.4]),mr=Math.pow(1+j/100,1/12)-1,Ks=shuffle([4000,5000,6000,7500,10000,12000,15000,20000]).slice(0,3).sort(function(a,b){return a-b;}),ns=[24,36,60];
var T={};Ks.forEach(function(K){T[K]={};ns.forEach(function(n){T[K][n]=r(K*mr/(1-Math.pow(1+mr,-n)),2);});});
var rows=[["Krediet"].concat(ns.map(function(n){return n+" maanden";}))].concat(Ks.map(function(K){return [eur(K)].concat(ns.map(function(n){return eur(T[K][n]);}));}));
return{T:T,Ks:Ks,ns:ns,html:stmt(rows,"cpi")};}
var RGEN={
saldo:function(){var o=money(40,900),b=boekingen(),a=r(o+b.sp-b.sm,2),rows=[["Oud saldo",eur(o)]].concat(b.rows);rows.push(["Nieuw saldo","?",1]);
return{f:"saldo",h:"Wat is het nieuwe saldo? (typ een min-teken bij een negatief saldo)",body:stmt(rows),a:a,d:2,u:"€",calc:"Nieuw saldo = oud saldo + ontvangsten − uitgaven\nOntvangsten: "+eur(b.sp)+"\nUitgaven: "+eur(b.sm)+"\n"+eur(o)+" + "+eur(b.sp)+" − "+eur(b.sm)+" = "+eur(a)+"\n"+(a>=0?"Een creditsaldo: je staat in de plus.":"Een debetsaldo: je staat rood.")};},
terug:function(){var o=money(150,1800),b=boekingen(),n=r(o+b.sp-b.sm,2),rows=[["Oud saldo","?",1]].concat(b.rows);rows.push(["Nieuw saldo",eur(n)]);
return{f:"terug",h:"Wat was het oude saldo? (2 decimalen)",body:stmt(rows),a:o,d:2,u:"€",calc:"Oud saldo = nieuw saldo − ontvangsten + uitgaven\nOntvangsten: "+eur(b.sp)+"\nUitgaven: "+eur(b.sm)+"\n"+eur(n)+" − "+eur(b.sp)+" + "+eur(b.sm)+" = "+eur(o)+"\nControle: "+eur(o)+" + "+eur(b.sp)+" − "+eur(b.sm)+" = "+eur(n)};},
enkel:function(){var nm=pick(NAMEN),b=pick([1500,2000,2500,3000,4000,4500,5000,6500,8000,10000,12500,18000]),p=rnd(10,45)/10,n=rnd(2,10),per=r(p/100*b,2),tot=r(per*n,2),s=pick(["rente","rente","eind","jaar"]),a=s==="eind"?r(b+tot,2):s==="jaar"?per:tot;
return{f:"enkel",h:s==="eind"?"Hoeveel staat er na "+n+" jaar op de rekening (spaarbedrag + rente)? (2 decimalen)":s==="jaar"?"Hoeveel rente is dat per jaar? (2 decimalen)":"Hoeveel rente krijgt "+nm+" in totaal? (2 decimalen)",body:qp(nm+" zet "+eur(b)+" op een spaardeposito. Het geld staat "+n+" jaar vast tegen "+pc(p)+" rente per jaar. De rente wordt aan het einde in één keer uitbetaald."),a:a,d:2,u:"€",
calc:"Enkelvoudige rente = (percentage : 100) × spaarbedrag × aantal jaren\n("+i1(p)+" : 100) × "+num(b)+" = "+eur(per)+" per jaar"+(s==="jaar"?"":"\n"+eur(per)+" × "+n+" = "+eur(tot)+" rente")+(s==="eind"?"\nSpaarbedrag + rente: "+eur(b)+" + "+eur(tot)+" = "+eur(a):"")};},
samen:function(){var b=pick([800,1000,1500,2000,2500,3000,5000,7500,10000]),p=pick([1.2,1.5,1.65,1.8,2,2.3,2.5,2.8,3,3.5]),n=rnd(2,12),g=r(1+p/100,4),e=r(b*Math.pow(g,n),2),renteQ=Math.random()<0.35,a=renteQ?r(e-b,2):e;
return{f:"samen",h:renteQ?"Hoeveel rente is er na "+n+" jaar in totaal bijgekomen? (2 decimalen)":"Hoeveel staat er na "+n+" jaar op de rekening? (2 decimalen)",body:qp(pick(NAMEN)+" zet "+eur(b)+" op een spaarrekening tegen "+pc(p)+" rente per jaar. De rente wordt elk jaar bijgeschreven. Het geld blijft "+n+" jaar staan."),a:a,d:2,u:"€",
calc:"Groeifactor = ("+num(p)+" : 100) + 1 = "+num(g)+"\nEindbedrag = beginbedrag × (groeifactor ^ aantal jaren)\n"+num(b)+" × ("+num(g)+" ^ "+n+") = "+eur(e)+(renteQ?"\nRente = "+eur(e)+" − "+eur(b)+" = "+eur(a):"")+"\nVergeet de haakjes niet."};},
krediet:function(){var t=kredTab(),K=pick(t.Ks),n=pick(t.ns),m=t.T[K][n],tot=r(m*n,2),a=r(tot-K,2);
return{f:"krediet",h:"Bereken de kredietkosten (2 decimalen).",body:qp(pick(NAMEN)+" leent "+eur(K)+" en betaalt dat in "+n+" maanden terug. In de tabel staat het bedrag per maand.")+t.html,a:a,d:2,u:"€",
calc:"Kredietkosten = (termijnbedrag × aantal termijnen) − krediet\n"+eur(m)+" × "+n+" = "+eur(tot)+"\n"+eur(tot)+" − "+eur(K)+" = "+eur(a)};},
kredpct:function(){var t=kredTab(),K=pick(t.Ks),n=pick(t.ns),m=t.T[K][n],tot=r(m*n,2),kk=r(tot-K,2),a=r(kk/K*100,1);
return{f:"kredpct",h:"Hoeveel procent van het geleende bedrag zijn de kredietkosten? (1 decimaal)",body:qp(pick(NAMEN)+" leent "+eur(K)+" met een looptijd van "+n+" maanden. In de tabel staat het bedrag per maand.")+t.html,a:a,d:1,u:"%",
calc:"Stap 1: kredietkosten = (termijnbedrag × aantal termijnen) − krediet\n("+num(m)+" × "+n+") − "+num(K)+" = "+eur(kk)+"\nStap 2: (kredietkosten : krediet) × 100\n("+num(kk)+" : "+num(K)+") × 100 = "+pc(a)};},
aandeel:function(){var nm=pick(NAMEN),n=pick([15,20,35,40,50,80,100,150]),k=rnd(800,6000)/100,w=r(k*(1+rnd(-15,60)/100),2),ws=r(w-k,2),tot=r(ws*n,2),inl=r(k*n,2),pctQ=Math.random()<0.4;
var body=qp(nm+" koopt "+n+" aandelen voor "+eur(k)+" per aandeel. Later verkoopt "+nm+" ze voor "+eur(w)+" per aandeel."),calc="Winst = (verkoopprijs − aankoopprijs) × aantal aandelen\n("+num(w)+" − "+num(k)+") × "+n+" = "+eur(tot)+(tot<0?"\nEen min-teken: dit is verlies.":"");
if(pctQ){var a=r(tot/inl*100,1);return{f:"aandeel",h:"Hoeveel procent winst of verlies is dat van de inleg? (1 decimaal, min-teken bij verlies)",body:body,a:a,d:1,u:"%",calc:calc+"\nInleg: "+n+" × "+num(k)+" = "+eur(inl)+"\n(winst : inleg) × 100 = ("+num(tot)+" : "+num(inl)+") × 100 = "+pc(a)};}
return{f:"aandeel",h:"Bereken de winst in euro's (2 decimalen, min-teken bij verlies).",body:body,a:tot,d:2,u:"€",calc:calc};},
valuta:function(){var v=pick(GELD),k=rnd(v[2],v[3])/100,e=pick([50,80,100,150,200,250,400,600]),a=r(e*k,2);
return{f:"valuta",h:"Hoeveel "+v[0]+" krijg je? (2 decimalen)",body:qp("Je gaat naar "+v[1]+" en wisselt "+eur(e)+". De wisselkoers: voor €1 krijg je "+num(k)+" "+v[0]+"."),a:a,d:2,u:"",calc:"Vreemd geld = euro's × wisselkoers\n"+num(e)+" × "+num(k)+" = "+num(a)+" "+v[0]};},
terugw:function(){var v=pick(GELD),k=rnd(v[2],v[3])/100,x=r(pick([20,35,60,75,120,180,400])*(k>10?10:1),0),a=r(x/k,2);
return{f:"terugw",h:"Hoeveel euro krijg je terug? (2 decimalen)",body:qp("Na je vakantie in "+v[1]+" heb je nog "+num(x)+" "+v[0]+" over. De wisselkoers: voor €1 krijg je "+num(k)+" "+v[0]+"."),a:a,d:2,u:"€",calc:"Euro's = vreemd geld : wisselkoers\n"+num(x)+" : "+num(k)+" = "+eur(a)};}
};
