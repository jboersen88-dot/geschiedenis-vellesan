var FORM={
tw:"verkoopwaarde − inkoopwaarde",
afschr:"(aanschafprijs − restwaarde) : aantal gebruiksjaren",
vprijs:"inkoopprijs + ((opslagpercentage : 100) × inkoopprijs)",
cprijs:"verkoopprijs + ((btw-percentage : 100) × verkoopprijs)",
omzet:"afzet × verkoopprijs",
bwinst:"omzet − inkoopwaarde",
nwinst:"brutowinst − bedrijfskosten",
maandeel:"(afzet van het bedrijf : totale afzet) × 100",
kostprijs:"(vaste kosten + variabele kosten) : productie",
aprod:"productie : aantal werknemers"
};
var MODES=[["tw","Toegevoegde waarde"],["afschr","Afschrijving"],["vprijs","Verkoopprijs"],["cprijs","Consumentenprijs"],["omzet","Omzet"],["bwinst","Brutowinst"],["nwinst","Nettoresultaat"],["maandeel","Marktaandeel"],["kostprijs","Kostprijs"],["aprod","Arbeidsproductiviteit"]];
var NAMEN=["Daan","Sara","Yusuf","Lotte","Milan","Fenna","Jesse","Noor","Ravi","Evi"];
var WINKEL=[["een fietsenwinkel","fietsbellen",3,14],["een boekhandel","agenda's",4,12],["een sportwinkel","voetballen",8,30],["een kledingwinkel","T-shirts",5,20],["een bakker","taarten",6,18],["een tuincentrum","plantenbakken",7,25]];
var KOLOM=[["een meelfabriek","graan","meel"],["een bakkerij","meel","brood"],["een meubelmaker","hout","een tafel"],["een kledingfabriek","stof","een jas"],["een sapfabriek","sinaasappels","sap"],["een fietsenfabriek","onderdelen","een fiets"]];
var MACH=["een bestelbus","een drukpers","een vrachtwagen","een oven","een heftruck","een verpakkingsmachine"];
function zaak(){var w=pick(WINKEL),ip=money(w[2],w[3]),vp=r(ip*rnd(140,260)/100,2),af=rnd(8,95)*10;return{w:w,ip:ip,vp:vp,af:af,omz:r(af*vp,2),iw:r(af*ip,2)};}
var RGEN={
tw:function(){var k=pick(KOLOM),i=money(2,400),v=r(i*rnd(125,290)/100,2),a=r(v-i,2);
return{f:"tw",h:"Wat is de toegevoegde waarde? (2 decimalen)",body:qp(k[0].charAt(0).toUpperCase()+k[0].slice(1)+" koopt "+k[1]+" in voor "+eur(i)+". Het bedrijf maakt er "+k[2]+" van en verkoopt dat voor "+eur(v)+"."),a:a,d:2,u:"€",calc:"Toegevoegde waarde = verkoopwaarde − inkoopwaarde\n"+eur(v)+" − "+eur(i)+" = "+eur(a)};},
afschr:function(){var j=pick([4,5,6,8,10]),rest=rnd(2,40)*500,af=rnd(4,60)*250,aan=rest+af*j,s=pick(["jaar","jaar","waarde","maand"]),n=rnd(2,j-1),m=pick(MACH);
var body=qp("Een bedrijf koopt "+m+" voor "+eur(aan)+". Het bedrijf gebruikt "+(m.indexOf("een ")===0?"die":"deze")+" "+j+" jaar. Daarna is de restwaarde "+eur(rest)+"."),basis="Afschrijving per jaar = (aanschafprijs − restwaarde) : aantal gebruiksjaren\n("+num(aan)+" − "+num(rest)+") : "+j+" = "+eur(af);
if(s==="waarde")return{f:"afschr",h:"Wat is de waarde na "+n+" jaar? (2 decimalen)",body:body,a:aan-af*n,d:2,u:"€",calc:basis+"\nIn "+n+" jaar: "+n+" × "+eur(af)+" = "+eur(af*n)+"\nWaarde: "+eur(aan)+" − "+eur(af*n)+" = "+eur(aan-af*n)};
if(s==="maand")return{f:"afschr",h:"Wat is de afschrijving per maand? (2 decimalen)",body:body,a:r(af/12,2),d:2,u:"€",calc:basis+" per jaar\n"+eur(af)+" : 12 = "+eur(r(af/12,2))+" per maand"};
return{f:"afschr",h:"Wat is de afschrijving per jaar? (2 decimalen)",body:body,a:af,d:2,u:"€",calc:basis};},
vprijs:function(){var w=pick(WINKEL),ip=money(w[2],w[3]),p=pick([40,50,60,75,80,85,100,120,125,150,200,250]),op=r(p/100*ip,2),vp=r(ip+op,2),terug=Math.random()<0.3;
if(terug){var pp=r((vp-ip)/ip*100,1);return{f:"vprijs",h:"Hoeveel procent van de inkoopprijs is de brutowinstopslag? (1 decimaal)",body:qp(w[0].charAt(0).toUpperCase()+w[0].slice(1)+" koopt "+w[1]+" in voor "+eur(ip)+" per stuk. De verkoopprijs is "+eur(vp)+"."),a:pp,d:1,u:"%",calc:"Brutowinstopslag in euro's: "+eur(vp)+" − "+eur(ip)+" = "+eur(r(vp-ip,2))+"\n(opslag : inkoopprijs) × 100\n("+num(r(vp-ip,2))+" : "+num(ip)+") × 100 = "+pc(pp)};}
return{f:"vprijs",h:"Wat is de verkoopprijs? (2 decimalen)",body:qp(w[0].charAt(0).toUpperCase()+w[0].slice(1)+" koopt "+w[1]+" in voor "+eur(ip)+" per stuk. De brutowinstopslag is "+p+"% van de inkoopprijs."),a:vp,d:2,u:"€",calc:"Verkoopprijs = inkoopprijs + ((opslagpercentage : 100) × inkoopprijs)\nOpslag: ("+p+" : 100) × "+num(ip)+" = "+eur(op)+"\n"+eur(ip)+" + "+eur(op)+" = "+eur(vp)};},
cprijs:function(){var vp=money(2,180),b=pick([21,21,21,9]),bt=r(b/100*vp,2),cp=r(vp+bt,2),s=pick(["cp","cp","btw"]);
return{f:"cprijs",h:s==="btw"?"Hoeveel euro btw betaalt de klant? (2 decimalen)":"Wat is de consumentenprijs? (2 decimalen)",body:qp("De verkoopprijs van een product is "+eur(vp)+". Daar komt nog "+b+"% btw bij."),a:s==="btw"?bt:cp,d:2,u:"€",calc:"Btw: ("+b+" : 100) × "+num(vp)+" = "+eur(bt)+(s==="btw"?"":"\nConsumentenprijs = verkoopprijs + btw\n"+eur(vp)+" + "+eur(bt)+" = "+eur(cp))};},
omzet:function(){var z=zaak(),terug=Math.random()<0.25;
if(terug)return{f:"omzet",h:"Wat is de afzet? (hele stuks)",body:qp(z.w[0].charAt(0).toUpperCase()+z.w[0].slice(1)+" verkoopt "+z.w[1]+" voor "+eur(z.vp)+" per stuk. De omzet is "+eur(z.omz)+"."),a:z.af,d:0,u:"",calc:"Omzet = afzet × verkoopprijs, dus afzet = omzet : verkoopprijs\n"+num(z.omz)+" : "+num(z.vp)+" = "+num(z.af)+" stuks"};
return{f:"omzet",h:"Wat is de omzet? (2 decimalen)",body:qp(z.w[0].charAt(0).toUpperCase()+z.w[0].slice(1)+" verkoopt in een maand "+num(z.af)+" "+z.w[1]+". De verkoopprijs is "+eur(z.vp)+" per stuk."),a:z.omz,d:2,u:"€",calc:"Omzet = afzet × verkoopprijs\n"+num(z.af)+" × "+num(z.vp)+" = "+eur(z.omz)};},
bwinst:function(){var z=zaak(),a=r(z.omz-z.iw,2);
return{f:"bwinst",h:"Wat is de brutowinst? (2 decimalen)",body:qp(z.w[0].charAt(0).toUpperCase()+z.w[0].slice(1)+" verkoopt in een maand "+num(z.af)+" "+z.w[1]+". De inkoopprijs is "+eur(z.ip)+" per stuk. De verkoopprijs is "+eur(z.vp)+" per stuk."),a:a,d:2,u:"€",calc:"Omzet = afzet × verkoopprijs = "+num(z.af)+" × "+num(z.vp)+" = "+eur(z.omz)+"\nInkoopwaarde = afzet × inkoopprijs = "+num(z.af)+" × "+num(z.ip)+" = "+eur(z.iw)+"\nBrutowinst = omzet − inkoopwaarde\n"+eur(z.omz)+" − "+eur(z.iw)+" = "+eur(a)};},
nwinst:function(){var omz=rnd(30,400)*500,iw=Math.round(omz*rnd(40,65)/100/100)*100,bw=omz-iw,bk=Math.round(bw*rnd(55,115)/100/100)*100,a=bw-bk;
return{f:"nwinst",h:"Wat is het nettoresultaat? (2 decimalen, min-teken bij verlies)",body:qp("Een bedrijf heeft in een jaar een omzet van "+eur(omz)+". De inkoopwaarde is "+eur(iw)+". De bedrijfskosten zijn "+eur(bk)+"."),a:a,d:2,u:"€",calc:"Stap 1: brutowinst = omzet − inkoopwaarde\n"+eur(omz)+" − "+eur(iw)+" = "+eur(bw)+"\nStap 2: nettoresultaat = brutowinst − bedrijfskosten\n"+eur(bw)+" − "+eur(bk)+" = "+eur(a)+(a<0?"\nEen min-teken: het bedrijf maakt verlies.":"")};},
maandeel:function(){var tot=rnd(20,900)*100,eig=Math.round(tot*rnd(4,48)/100/10)*10,a=r(eig/tot*100,1),w=pick(["fietsen","telefoons","laptops","scooters","sportschoenen"]),terug=Math.random()<0.25;
if(terug){var p=rnd(5,45),x=r(p/100*tot,0);return{f:"maandeel",h:"Hoeveel "+w+" verkoopt dit merk? (hele stuks)",body:qp("Op de markt voor "+w+" worden in een jaar "+num(tot)+" stuks verkocht. Eén merk heeft een marktaandeel van "+p+"%."),a:x,d:0,u:"",calc:"Afzet van het merk = (marktaandeel : 100) × totale afzet\n("+p+" : 100) × "+num(tot)+" = "+num(x)+" stuks"};}
return{f:"maandeel",h:"Wat is het marktaandeel van dit merk? (1 decimaal)",body:qp("Op de markt voor "+w+" worden in een jaar "+num(tot)+" stuks verkocht. Eén merk verkoopt daarvan "+num(eig)+" stuks."),a:a,d:1,u:"%",calc:"Marktaandeel = (afzet van het bedrijf : totale afzet) × 100\n("+num(eig)+" : "+num(tot)+") × 100 = "+pc(a)};},
kostprijs:function(){var prod=rnd(4,120)*500,vk=rnd(10,180)*1000,vps=money(1,45),var_=r(prod*vps,2),tot=r(vk+var_,2),a=r(tot/prod,2);
return{f:"kostprijs",h:"Wat is de kostprijs per product? (2 decimalen)",body:qp("Een fabriek maakt in een jaar "+num(prod)+" producten. De vaste kosten zijn "+eur(vk)+". De variabele kosten zijn "+eur(vps)+" per product."),a:a,d:2,u:"€",calc:"Variabele kosten: "+num(prod)+" × "+num(vps)+" = "+eur(var_)+"\nTotale kosten: "+eur(vk)+" + "+eur(var_)+" = "+eur(tot)+"\nKostprijs = (vaste kosten + variabele kosten) : productie\n"+num(tot)+" : "+num(prod)+" = "+eur(a)};},
aprod:function(){var w=rnd(4,40),pp=rnd(12,250),prod=w*pp,uur=Math.random()<0.4,u=pick([6,8]),w2=pick(["T-shirts","broden","stoelen","dozen","flessen sap"]);
if(uur){prod=w*pp*u;return{f:"aprod",h:"Wat is de arbeidsproductiviteit per werknemer per uur? (hele stuks)",body:qp("In een fabriek maken "+w+" werknemers samen "+num(prod)+" "+w2+" per dag. Zij werken "+u+" uur per dag."),a:pp,d:0,u:"",calc:"Per werknemer per dag: productie : aantal werknemers = "+num(prod)+" : "+w+" = "+num(pp*u)+"\nPer uur: "+num(pp*u)+" : "+u+" = "+num(pp)+" "+w2};}
return{f:"aprod",h:"Wat is de arbeidsproductiviteit per werknemer per uur? (hele stuks)",body:qp("In een fabriek maken "+w+" werknemers samen "+num(prod)+" "+w2+" per uur."),a:pp,d:0,u:"",calc:"Arbeidsproductiviteit = productie : aantal werknemers\n"+num(prod)+" : "+w+" = "+num(pp)+" "+w2+" per werknemer per uur"};}
};
