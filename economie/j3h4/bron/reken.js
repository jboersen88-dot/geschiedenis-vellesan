var FORM={
tabel:"jaarpremie uit de tabel × aantal jaren",
vkosten:"(premie + poliskosten) + assurantiebelasting",
kans:"(aantal schades : aantal verzekerden) × 100",
opstal:"(percentage : 100) × verzekerd bedrag",
onder:"(verzekerd bedrag : werkelijke waarde) × schade",
noclaim:"brutopremie − ((kortingspercentage : 100) × brutopremie)",
zorg:"(maandpremie × 12) + betaald eigen risico"
};
var MODES=[["tabel","Premie uit een tabel"],["vkosten","Verzekeringskosten"],["kans","Kans op schade"],["opstal","Premie opstalverzekering"],["onder","Onderverzekerd"],["noclaim","Bonus-malusladder"],["zorg","Zorgkosten per jaar"]];
var NAMEN=["Daan","Sara","Yusuf","Lotte","Milan","Fenna","Jesse","Noor","Ravi","Evi"];
/* eigen voorbeeldtabellen: de bedragen en percentages zijn verzonnen voor de som */
function fietsTab(){var b=rnd(40,60),rows=[["Waarde van de fiets","Regio 1","Regio 2","Regio 3"]],T=[];[600,800,1000,1500,2000].forEach(function(w,i){var p1=b+i*rnd(11,16),p2=Math.round(p1*1.45),p3=Math.round(p1*1.9);T.push([w,p1,p2,p3]);rows.push(["tot en met "+eur(w),eur(p1),eur(p2),eur(p3)]);});return{T:T,html:stmt(rows,"cpi")};}
var LADDER=[[0,0],[1,10],[2,20],[3,30],[4,40],[5,45],[6,50],[7,55],[8,60],[9,65],[10,70]];
function ladderTab(van){var rows=[["Schadevrije jaren","Korting op de brutopremie"]];LADDER.slice(van,van+6).forEach(function(x){rows.push([String(x[0]),x[1]+"%"]);});return stmt(rows,"cpi");}
var RGEN={
tabel:function(){var t=fietsTab(),rij=pick(t.T),reg=rnd(1,3),n=pick([1,2,3,3,4,5]),w=rij[0]-rnd(1,9)*10,jp=rij[reg],a=r(jp*n,2);
return{f:"tabel",h:n===1?"Hoeveel premie betaal je per jaar? (2 decimalen)":"Hoeveel premie betaal je in totaal in "+n+" jaar? (2 decimalen)",body:qp("Je verzekert een fiets van "+eur(w)+". Je woont in regio "+reg+". In de tabel staat de premie per jaar.")+t.html,a:a,d:2,u:"€",calc:"Zoek de goede rij: de fiets van "+eur(w)+" valt in 'tot en met "+eur(rij[0])+"'.\nZoek de goede kolom: regio "+reg+". De jaarpremie is "+eur(jp)+"."+(n>1?"\nJaarpremie × aantal jaren = "+eur(jp)+" × "+n+" = "+eur(a):"")};},
vkosten:function(){var p=money(35,240),k=pick([3.5,4,5,6,7.5,8.5]),s=r(p+k,2),b=r(s*0.21,2),a=r(s+b,2);
return{f:"vkosten",h:"Bereken de verzekeringskosten voor het eerste jaar (2 decimalen).",body:qp(pick(NAMEN)+" sluit een verzekering af. De premie is "+eur(p)+" per jaar. De poliskosten zijn eenmalig "+eur(k)+". De assurantiebelasting is 21%."),a:a,d:2,u:"€",calc:"Verzekeringskosten = (premie + poliskosten) + assurantiebelasting\nPremie + poliskosten: "+eur(p)+" + "+eur(k)+" = "+eur(s)+"\nAssurantiebelasting: (21 : 100) × "+num(s)+" = "+eur(b)+"\n"+eur(s)+" + "+eur(b)+" = "+eur(a)};},
kans:function(){var v=rnd(8,90)*500,s=Math.round(v*rnd(4,90)/1000),w=pick(["een inboedelverzekering","een fietsverzekering","een reisverzekering","een opstalverzekering"]),a=r(s/v*100,1);
return{f:"kans",h:"Hoe groot is de kans op schade? (1 decimaal)",body:qp("Een verzekeraar heeft "+num(v)+" klanten met "+w+". In één jaar melden "+num(s)+" klanten schade."),a:a,d:1,u:"%",calc:"Kans op schade = (aantal schades : aantal verzekerden) × 100\n("+num(s)+" : "+num(v)+") × 100 = "+pc(a)};},
opstal:function(){var v=rnd(18,52)*10000,p=pick([0.06,0.07,0.08,0.09,0.1,0.11,0.12]),j=r(p/100*v,2),mnd=Math.random()<0.35,a=mnd?r(j/12,2):j;
return{f:"opstal",h:mnd?"Hoeveel premie is dat per maand? (2 decimalen)":"Hoeveel premie betaalt de eigenaar per jaar? (2 decimalen)",body:qp("Een huis is verzekerd voor een herbouwwaarde van "+eur(v)+". De premie van de opstalverzekering is "+num(p)+"% van het verzekerde bedrag per jaar."),a:a,d:2,u:"€",calc:"Premie = (percentage : 100) × verzekerd bedrag\n("+num(p)+" : 100) × "+num(v)+" = "+eur(j)+" per jaar"+(mnd?"\n"+eur(j)+" : 12 = "+eur(a)+" per maand":"")};},
onder:function(){var w=rnd(8,16)*5000,vb=w*pick([0.5,0.6,0.75,0.8,0.9]),s=rnd(4,40)*500,a=r(vb/w*s,2);if(s>vb)s=vb/2,a=r(vb/w*s,2);
return{f:"onder",h:"Hoeveel keert de verzekeraar uit? (2 decimalen)",body:qp("De inboedel van "+pick(NAMEN)+" is "+eur(w)+" waard, maar is verzekerd voor "+eur(vb)+". Na een brand is de schade "+eur(s)+"."),a:a,d:2,u:"€",calc:"Onderverzekerd: je krijgt maar een deel van de schade.\nUitkering = (verzekerd bedrag : werkelijke waarde) × schade\n("+num(vb)+" : "+num(w)+") × "+num(s)+" = "+eur(a)+"\nDe rest, "+eur(r(s-a,2))+", betaal je zelf."};},
noclaim:function(){var van=rnd(0,5),x=LADDER[van+rnd(1,5)],b=rnd(50,140)*10,k=r(x[1]/100*b,2),a=r(b-k,2);
return{f:"noclaim",h:"Wat is de nettopremie? (2 decimalen)",body:qp("De brutopremie van een autoverzekering is "+eur(b)+" per jaar. "+pick(NAMEN)+" heeft "+x[0]+" schadevrije jaren. Gebruik de tabel.")+ladderTab(van),a:a,d:2,u:"€",calc:"Bij "+x[0]+" schadevrije jaren hoort "+x[1]+"% korting.\nKorting: ("+x[1]+" : 100) × "+num(b)+" = "+eur(k)+"\nNettopremie = brutopremie − korting = "+eur(b)+" − "+eur(k)+" = "+eur(a)};},
zorg:function(){var p=money(128,172),er=pick([385,385,485,585,685]),kosten=pick([60,140,230,er,er+rnd(1,40)*50]),bet=Math.min(kosten,er),a=r(p*12+bet,2);
return{f:"zorg",h:"Hoeveel betaalt deze persoon dit jaar zelf aan zorg (premie + eigen risico)? (2 decimalen)",body:qp("De premie van de basisverzekering is "+eur(p)+" per maand. Het eigen risico is "+eur(er)+" per jaar. Dit jaar zijn de kosten van het ziekenhuis "+eur(kosten)+"."),a:a,d:2,u:"€",calc:"Premie per jaar: "+eur(p)+" × 12 = "+eur(r(p*12,2))+"\nEigen risico: de kosten zijn "+eur(kosten)+", het eigen risico is "+eur(er)+". Je betaalt zelf "+eur(bet)+"."+(kosten>er?"\nDe rest, "+eur(kosten-er)+", betaalt de verzekeraar.":"")+"\n"+eur(r(p*12,2))+" + "+eur(bet)+" = "+eur(a)};}
};
