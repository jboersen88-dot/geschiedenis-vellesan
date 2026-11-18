var FORM={
opslag:"(percentage : 100) × inkoopprijs",
vp:"inkoopprijs + brutowinstopslag",
btw:"(percentage : 100) × verkoopprijs",
cp:"verkoopprijs + btw",
terug:"(consumentenprijs : 121) × 100",
terug9:"(consumentenprijs : 109) × 100",
omzet:"afzet × verkoopprijs",
afzet:"omzet : verkoopprijs",
bruto:"omzet − inkoopwaarde",
netto:"brutowinst − bedrijfskosten"
};
var MODES=[["vp","Verkoopprijs"],["cp","Consumentenprijs"],["terug","Terugrekenen"],["omzet","Omzet en afzet"],["winst","Bruto- en nettowinst"]];
var DING=[["een hockeystick",30,70],["een rugzak",12,40],["een voetbal",8,30],["een bureaulamp",10,36],["een skateboard",25,80],["een koptelefoon",20,90],["een paar sportschoenen",30,75],["een spijkerbroek",18,50]];
var ETEN=[["een brood",1,3],["een zak appels",1,4],["een fles sap",1,3],["een taart",8,20],["een leesboek",8,20]];
var RGEN={
vp:function(){var d=pick(DING),ik=rnd(d[1],d[2]),p=pick([40,50,60,75,80,90,100,120]),op=r(p/100*ik,2),vp=r(ik+op,2);
if(Math.random()<0.35){return{f:"opslag",h:"Bereken de brutowinstopslag in euro's. (2 decimalen)",body:qp("Een winkelier koopt "+d[0]+" in voor "+eur(ik)+". De brutowinstopslag is "+p+"% van de inkoopprijs."),a:op,d:2,u:"€",calc:"Brutowinstopslag = (percentage : 100) × inkoopprijs\n("+p+" : 100) × "+eur(ik)+" = "+eur(op)};}
if(Math.random()<0.3){var o2=rnd(5,40);return{f:"vp",h:"Bereken de verkoopprijs. (2 decimalen)",body:qp("Een winkelier koopt "+d[0]+" in voor "+eur(ik)+". De brutowinstopslag is "+eur(o2)+"."),a:r(ik+o2,2),d:2,u:"€",calc:"Verkoopprijs = inkoopprijs + brutowinstopslag\n"+eur(ik)+" + "+eur(o2)+" = "+eur(ik+o2)};}
return{f:"vp",h:"Bereken de verkoopprijs. (2 decimalen)",body:qp("Een winkelier koopt "+d[0]+" in voor "+eur(ik)+". De brutowinstopslag is "+p+"% van de inkoopprijs."),a:vp,d:2,u:"€",calc:"Stap 1: brutowinstopslag = (percentage : 100) × inkoopprijs\n("+p+" : 100) × "+eur(ik)+" = "+eur(op)+"\nStap 2: verkoopprijs = inkoopprijs + brutowinstopslag\n"+eur(ik)+" + "+eur(op)+" = "+eur(vp)};},
cp:function(){var laag=Math.random()<0.35,d=laag?pick(ETEN):pick(DING),p=laag?9:21,vp=laag?r(rnd(d[1]*10,d[2]*10)/10,2):rnd(d[1],d[2])*2,b=r(p/100*vp,2),cp=r(vp+b,2);
if(Math.random()<0.3){return{f:"btw",h:"Bereken het btw-bedrag. (2 decimalen)",body:qp("De verkoopprijs van "+d[0]+" is "+eur(vp)+". Het btw-tarief is "+p+"%."),a:b,d:2,u:"€",calc:"Btw = (percentage : 100) × verkoopprijs\n("+p+" : 100) × "+eur(vp)+" = "+eur(b)};}
return{f:"cp",h:"Bereken de consumentenprijs. (2 decimalen)",body:qp("De verkoopprijs van "+d[0]+" is "+eur(vp)+". Het btw-tarief is "+p+"%."),a:cp,d:2,u:"€",calc:"Stap 1: btw = (percentage : 100) × verkoopprijs\n("+p+" : 100) × "+eur(vp)+" = "+eur(b)+"\nStap 2: consumentenprijs = verkoopprijs + btw\n"+eur(vp)+" + "+eur(b)+" = "+eur(cp)+"\nSneller: "+eur(vp)+" × "+(laag?"1,09":"1,21")+" = "+eur(cp)};},
terug:function(){var laag=Math.random()<0.3,d=laag?pick(ETEN):pick(DING),p=laag?9:21,vp=laag?r(rnd(d[1]*10,d[2]*10)/10,2):rnd(d[1],d[2])*2,cp=r(vp*(100+p)/100,2),b=r(cp-vp,2);
if(Math.random()<0.3){return{f:laag?"terug9":"terug",h:"Bereken het btw-bedrag in deze prijs. (2 decimalen)",body:qp("De consumentenprijs van "+d[0]+" is "+eur(cp)+". Dat is inclusief "+p+"% btw."),a:b,d:2,u:"€",calc:"De verkoopprijs is 100%. De consumentenprijs is "+(100+p)+"%.\nStap 1: verkoopprijs = (consumentenprijs : "+(100+p)+") × 100\n("+eur(cp)+" : "+(100+p)+") × 100 = "+eur(vp)+"\nStap 2: btw = consumentenprijs − verkoopprijs\n"+eur(cp)+" − "+eur(vp)+" = "+eur(b)};}
return{f:laag?"terug9":"terug",h:"Bereken de verkoopprijs zonder btw. (2 decimalen)",body:qp("De consumentenprijs van "+d[0]+" is "+eur(cp)+". Dat is inclusief "+p+"% btw."),a:vp,d:2,u:"€",calc:"De verkoopprijs is 100%. De consumentenprijs is "+(100+p)+"%.\nVerkoopprijs = (consumentenprijs : "+(100+p)+") × 100\n("+eur(cp)+" : "+(100+p)+") × 100 = "+eur(vp)};},
omzet:function(){var d=pick(DING),af=rnd(4,60)*5,vp=rnd(d[1],d[2])*2,om=af*vp;
if(Math.random()<0.4){return{f:"afzet",h:"Bereken de afzet. (hele stuks)",body:qp("Een winkel verkoopt "+d[0]+" voor "+eur(vp)+" per stuk. De omzet van dit product is "+eur(om)+"."),a:af,d:0,u:"",calc:"Afzet = omzet : verkoopprijs\n"+eur(om)+" : "+eur(vp)+" = "+num(af)+" stuks"};}
return{f:"omzet",h:"Bereken de omzet. (2 decimalen)",body:qp("Een winkel verkoopt in een maand "+num(af)+" keer "+d[0]+". De verkoopprijs is "+eur(vp)+" per stuk."),a:om,d:2,u:"€",calc:"Omzet = afzet × verkoopprijs\n"+num(af)+" × "+eur(vp)+" = "+eur(om)};},
winst:function(){var om=rnd(40,180)*250,iw=Math.round(om*rnd(35,60)/100/50)*50,bw=om-iw,bk=Math.round(bw*rnd(30,115)/100/50)*50,nw=bw-bk,k=Math.random();
if(k<0.3){return{f:"bruto",h:"Bereken de brutowinst. (2 decimalen)",body:qp("Een winkel heeft een omzet van "+eur(om)+". De inkoopwaarde is "+eur(iw)+"."),a:bw,d:2,u:"€",calc:"Brutowinst = omzet − inkoopwaarde\n"+eur(om)+" − "+eur(iw)+" = "+eur(bw)};}
if(k<0.55){return{f:"netto",h:"Bereken de nettowinst. (2 decimalen; typ een min-teken bij verlies)",body:qp("Een winkel heeft een brutowinst van "+eur(bw)+". De bedrijfskosten zijn "+eur(bk)+"."),a:nw,d:2,u:"€",calc:"Nettowinst = brutowinst − bedrijfskosten\n"+eur(bw)+" − "+eur(bk)+" = "+eur(nw)+(nw<0?"\nDe uitkomst is negatief: de winkel maakt verlies.":"")};}
return{f:"netto",h:"Bereken de nettowinst. (2 decimalen; typ een min-teken bij verlies)",body:qp("Een winkel heeft een omzet van "+eur(om)+". De inkoopwaarde is "+eur(iw)+". De bedrijfskosten zijn "+eur(bk)+"."),a:nw,d:2,u:"€",calc:"Stap 1: brutowinst = omzet − inkoopwaarde\n"+eur(om)+" − "+eur(iw)+" = "+eur(bw)+"\nStap 2: nettowinst = brutowinst − bedrijfskosten\n"+eur(bw)+" − "+eur(bk)+" = "+eur(nw)+(nw<0?"\nDe uitkomst is negatief: de winkel maakt verlies.":"")};}
};
