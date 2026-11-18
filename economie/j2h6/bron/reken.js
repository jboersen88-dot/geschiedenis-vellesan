var FORM={
btw:"(percentage : 100) × prijs zonder btw",
cp:"prijs zonder btw + btw",
terug:"(consumentenprijs : 121) × 100",
terug9:"(consumentenprijs : 109) × 100",
saldo:"inkomsten − uitgaven",
mld:"miljarden × 1.000",
mln:"miljoenen : 1.000",
deel:"(deel : geheel) × 100"
};
var MODES=[["cp","Consumentenprijs"],["terug","Terugrekenen"],["saldo","Saldo van de begroting"],["mld","Miljoenen en miljarden"],["deel","Deel van de uitgaven"]];
var DING=[["een fiets",120,400],["een spelcomputer",150,300],["een bureaustoel",40,120],["een jas",30,90],["een telefoon",100,350],["een paar schoenen",30,75]];
var ETEN=[["een brood",1,3],["een pizza",3,9],["een leesboek",8,20],["een zak appels",1,4]];
var POST=["onderwijs","zorg","veiligheid","infrastructuur","sociale zekerheid"];
var RGEN={
cp:function(){var laag=Math.random()<0.35,d=laag?pick(ETEN):pick(DING),p=laag?9:21,vp=laag?r(rnd(d[1]*10,d[2]*10)/10,2):rnd(d[1]/2,d[2]/2)*2,b=r(p/100*vp,2),cp=r(vp+b,2);
if(Math.random()<0.3){return{f:"btw",h:"Bereken het btw-bedrag. (2 decimalen)",body:qp("De prijs van "+d[0]+" is "+eur(vp)+" zonder btw. Het btw-tarief is "+p+"%."),a:b,d:2,u:"€",calc:"Btw = (percentage : 100) × prijs zonder btw\n("+p+" : 100) × "+eur(vp)+" = "+eur(b)};}
return{f:"cp",h:"Bereken de consumentenprijs. (2 decimalen)",body:qp("De prijs van "+d[0]+" is "+eur(vp)+" zonder btw. Het btw-tarief is "+p+"%."),a:cp,d:2,u:"€",calc:"Stap 1: btw = (percentage : 100) × prijs zonder btw\n("+p+" : 100) × "+eur(vp)+" = "+eur(b)+"\nStap 2: consumentenprijs = prijs zonder btw + btw\n"+eur(vp)+" + "+eur(b)+" = "+eur(cp)};},
terug:function(){var laag=Math.random()<0.3,d=laag?pick(ETEN):pick(DING),p=laag?9:21,vp=laag?r(rnd(d[1]*10,d[2]*10)/10,2):rnd(d[1]/2,d[2]/2)*2,cp=r(vp*(100+p)/100,2),b=r(cp-vp,2),f=laag?"terug9":"terug";
if(Math.random()<0.3){return{f:f,h:"Bereken het btw-bedrag in deze prijs. (2 decimalen)",body:qp("De consumentenprijs van "+d[0]+" is "+eur(cp)+". Dat is inclusief "+p+"% btw."),a:b,d:2,u:"€",calc:"De prijs zonder btw is 100%. De consumentenprijs is "+(100+p)+"%.\nStap 1: prijs zonder btw = (consumentenprijs : "+(100+p)+") × 100\n("+eur(cp)+" : "+(100+p)+") × 100 = "+eur(vp)+"\nStap 2: btw = consumentenprijs − prijs zonder btw\n"+eur(cp)+" − "+eur(vp)+" = "+eur(b)};}
return{f:f,h:"Bereken de prijs zonder btw. (2 decimalen)",body:qp("De consumentenprijs van "+d[0]+" is "+eur(cp)+". Dat is inclusief "+p+"% btw."),a:vp,d:2,u:"€",calc:"De prijs zonder btw is 100%. De consumentenprijs is "+(100+p)+"%.\nPrijs zonder btw = (consumentenprijs : "+(100+p)+") × 100\n("+eur(cp)+" : "+(100+p)+") × 100 = "+eur(vp)};},
saldo:function(){var ink=rnd(2400,3600)/10,uit=r(ink+rnd(-250,250)/10,1);if(uit===ink)uit=r(ink+4.5,1);var a=r(ink-uit,1);
return{f:"saldo",h:"Bereken het saldo in miljarden euro's. (1 decimaal; typ een min-teken bij een tekort)",body:qp("In een land verwacht de overheid "+num(ink)+" miljard euro aan inkomsten en "+num(uit)+" miljard euro aan uitgaven."),a:a,d:1,u:"mld",calc:"Saldo = inkomsten − uitgaven\n"+num(ink)+" − "+num(uit)+" = "+(a<0?"−"+num(-a):num(a))+" miljard euro\n"+(a<0?"Het saldo is negatief: een begrotingstekort.":"Het saldo is positief: een begrotingsoverschot.")};},
mld:function(){var x=rnd(2,950)/10;
if(Math.random()<0.5){var m=rnd(3,98)*50,a=r(m/1000,2);return{f:"mln",h:"Hoeveel miljard euro is dit? (2 decimalen)",body:qp("Een gemeente geeft in een jaar "+num(m)+" miljoen euro uit."),a:a,d:2,u:"mld",calc:"1 miljard = 1.000 miljoen\nMiljarden = miljoenen : 1.000\n"+num(m)+" : 1.000 = "+num(a)+" miljard euro"};}
return{f:"mld",h:"Hoeveel miljoen euro is dit? (hele miljoenen)",body:qp("De overheid geeft "+num(x)+" miljard euro uit aan "+pick(POST)+"."),a:r(x*1000,0),d:0,u:"mln",calc:"1 miljard = 1.000 miljoen\nMiljoenen = miljarden × 1.000\n"+num(x)+" × 1.000 = "+num(r(x*1000,0))+" miljoen euro"};},
deel:function(){var tot=rnd(30,40)*10,p=pick(POST),d=rnd(20,110),a=r(d/tot*100,1);
return{f:"deel",h:"Hoeveel procent van de uitgaven gaat naar "+p+"? (1 decimaal)",body:qp("In een land geeft de overheid in totaal "+num(tot)+" miljard euro uit. Daarvan gaat "+num(d)+" miljard euro naar "+p+"."),a:a,d:1,u:"%",calc:"Percentage = (deel : geheel) × 100\n("+num(d)+" : "+num(tot)+") × 100 = "+pc(a)};}
};
