var FORM={
netto:"brutoloon − (loonbelasting + premies)",
nettopct:"brutoloon − ((percentage : 100) × brutoloon)",
week:"(maandloon × 12) : 52",
uur:"weekloon : aantal uren per week",
deeltijd:"(voltijdloon : uren voltijd) × uren deeltijd",
part:"(beroepsbevolking : bevolking van 15 jaar tot pensioenleeftijd) × 100",
wloos:"(werklozen : beroepsbevolking) × 100",
ww:"(percentage : 100) × laatste loon"
};
var MODES=[["netto","Van bruto naar netto"],["nettopct","Netto met procenten"],["week","Maandloon → weekloon"],["uur","Weekloon → uurloon"],["deeltijd","Loon bij deeltijd"],["part","Arbeidsparticipatie"],["wloos","Werkloosheid in %"],["ww","WW-uitkering"]];
var NAMEN=["Daan","Sara","Yusuf","Lotte","Milan","Fenna","Jesse","Noor","Ravi","Evi"];
var BEROEP=["verkoper","monteur","kok","verpleegkundige","timmerman","buschauffeur","kapper","administratief medewerker"];
var RGEN={
netto:function(){var b=rnd(170,390)*10,lb=rnd(Math.round(b*0.17),Math.round(b*0.26)),p=rnd(Math.round(b*0.04),Math.round(b*0.11)),a=r(b-(lb+p),2);
return{f:"netto",h:"Wat is het nettoloon per maand? (2 decimalen)",body:qp(pick(NAMEN)+" werkt als "+pick(BEROEP)+". Het brutoloon is "+eur(b)+" per maand. De werkgever houdt "+eur(lb)+" loonbelasting in en "+eur(p)+" premies."),a:a,d:2,u:"€",calc:"Nettoloon = brutoloon − (loonbelasting + premies)\nInhoudingen: "+eur(lb)+" + "+eur(p)+" = "+eur(lb+p)+"\n"+eur(b)+" − "+eur(lb+p)+" = "+eur(a)};},
nettopct:function(){var b=rnd(170,390)*10,p=rnd(240,385)/10,inh=r(p/100*b,2),inhQ=Math.random()<0.3,a=inhQ?inh:r(b-inh,2);
return{f:"nettopct",h:inhQ?"Hoeveel euro wordt er per maand ingehouden? (2 decimalen)":"Wat is het nettoloon per maand? (2 decimalen)",body:qp(pick(NAMEN)+" heeft een brutoloon van "+eur(b)+" per maand. Aan loonbelasting en premies wordt samen "+pc(p)+" van het brutoloon ingehouden."),a:a,d:2,u:"€",calc:"Inhoudingen = (percentage : 100) × brutoloon\n("+i1(p)+" : 100) × "+num(b)+" = "+eur(inh)+(inhQ?"":"\nNettoloon = brutoloon − inhoudingen\n"+eur(b)+" − "+eur(inh)+" = "+eur(a))};},
week:function(){var m=money(1400,3600),s=pick(["week","week","week","jaar","terug"]),j=r(m*12,2),w=r(j/52,2);
if(s==="jaar")return{f:"week",h:"Wat is het jaarloon? (2 decimalen)",body:qp(pick(NAMEN)+" verdient "+eur(m)+" per maand."),a:j,d:2,u:"€",calc:"Een jaar heeft 12 maanden.\nJaarloon = maandloon × 12 = "+eur(m)+" × 12 = "+eur(j)};
if(s==="terug"){var wl=money(320,830),mm=r(wl*52/12,2);return{f:"week",h:"Wat is het maandloon? (2 decimalen)",body:qp(pick(NAMEN)+" verdient "+eur(wl)+" per week."),a:mm,d:2,u:"€",calc:"Andersom: eerst naar een jaar (× 52), dan naar een maand (: 12).\nMaandloon = (weekloon × 52) : 12\n("+num(wl)+" × 52) : 12 = "+eur(mm)};}
return{f:"week",h:"Wat is het weekloon? (2 decimalen)",body:qp(pick(NAMEN)+" verdient "+eur(m)+" per maand."),a:w,d:2,u:"€",calc:"Weekloon = (maandloon × 12) : 52\nEerst naar een jaar: "+eur(m)+" × 12 = "+eur(j)+"\nDan naar een week: "+eur(j)+" : 52 = "+eur(w)+"\nLet op: een maand is niet precies 4 weken."};},
uur:function(){var u=pick([36,38,40]),twee=Math.random()<0.4;
if(twee){var m=money(1900,3600),w=r(m*12/52,2),a2=r(w/u,2);return{f:"uur",h:"Wat is het uurloon? (2 decimalen)",body:qp(pick(NAMEN)+" verdient "+eur(m)+" per maand en werkt "+u+" uur per week."),a:a2,d:2,u:"€",calc:"Stap 1: weekloon = (maandloon × 12) : 52\n("+num(m)+" × 12) : 52 = "+eur(w)+"\nStap 2: uurloon = weekloon : aantal uren per week\n"+eur(w)+" : "+u+" = "+eur(a2)};}
var wl=money(380,860),a=r(wl/u,2);return{f:"uur",h:"Wat is het uurloon? (2 decimalen)",body:qp(pick(NAMEN)+" verdient "+eur(wl)+" per week en werkt "+u+" uur per week."),a:a,d:2,u:"€",calc:"Uurloon = weekloon : aantal uren per week\n"+eur(wl)+" : "+u+" = "+eur(a)};},
deeltijd:function(){var v=pick([36,38,40]),d=pick([16,20,24,28,32]),l=money(1800,3300),a=r(l/v*d,2);
return{f:"deeltijd",h:"Hoeveel verdient deze werknemer per maand? (2 decimalen)",body:qp("Bij een voltijdbaan van "+v+" uur per week is het loon "+eur(l)+" per maand. "+pick(NAMEN)+" werkt in deeltijd: "+d+" uur per week."),a:a,d:2,u:"€",calc:"Loon bij deeltijd = (voltijdloon : uren voltijd) × uren deeltijd\n("+num(l)+" : "+v+") × "+d+" = "+eur(a)+"\nEerst het loon voor één uur per week, dan keer de uren die je werkt."};},
part:function(){var bev=rnd(20,180)*1000,bb=Math.round(bev*rnd(62,82)/100/100)*100,los=Math.random()<0.35,wl=Math.round(bb*rnd(3,8)/100/100)*100,a=r(bb/bev*100,1);
return{f:"part",h:"Hoe hoog is de arbeidsparticipatie? (1 decimaal)",body:qp("In een gemeente wonen "+num(bev)+" mensen van 15 jaar tot de pensioenleeftijd. "+(los?"Daarvan werken er "+num(bb-wl)+". Nog eens "+num(wl)+" mensen zijn werkloos en zoeken werk.":"De beroepsbevolking is "+num(bb)+" mensen.")),a:a,d:1,u:"%",calc:(los?"Beroepsbevolking = werkenden + werklozen = "+num(bb-wl)+" + "+num(wl)+" = "+num(bb)+"\n":"")+"Arbeidsparticipatie = (beroepsbevolking : bevolking van 15 jaar tot pensioenleeftijd) × 100\n("+num(bb)+" : "+num(bev)+") × 100 = "+pc(a)};},
wloos:function(){var bb=rnd(30,950)*1000,wl=Math.round(bb*rnd(25,95)/1000/100)*100,s=pick(["pct","pct","aantal","vraag"]),p=r(wl/bb*100,1);
if(s==="aantal"){var pp=rnd(25,95)/10,aa=r(pp/100*bb,0);return{f:"wloos",h:"Hoeveel mensen zijn werkloos? (hele mensen)",body:qp("De beroepsbevolking van een provincie is "+num(bb)+" mensen. Daarvan is "+pc(pp)+" werkloos."),a:aa,d:0,u:"",calc:"Aantal werklozen = (percentage : 100) × beroepsbevolking\n("+i1(pp)+" : 100) × "+num(bb)+" = "+num(aa)+" mensen"};}
if(s==="vraag")return{f:"wloos",h:"Hoeveel mensen zijn werkloos? (hele mensen)",body:qp("In een provincie is het aanbod van arbeid (de beroepsbevolking) "+num(bb)+" mensen. De vraag naar arbeid (de werkgelegenheid) is "+num(bb-wl)+" banen."),a:wl,d:0,u:"",calc:"Werklozen = aanbod van arbeid − vraag naar arbeid\n"+num(bb)+" − "+num(bb-wl)+" = "+num(wl)+" mensen"};
return{f:"wloos",h:"Hoe hoog is de werkloosheid? (1 decimaal)",body:qp("De beroepsbevolking van een provincie is "+num(bb)+" mensen. Daarvan zijn "+num(wl)+" mensen werkloos."),a:p,d:1,u:"%",calc:"Werkloosheid = (werklozen : beroepsbevolking) × 100\n("+num(wl)+" : "+num(bb)+") × 100 = "+pc(p)};},
ww:function(){var l=money(1500,3200),s=pick(["75","70","verschil"]),a75=r(0.75*l,2),a70=r(0.7*l,2),nm=pick(NAMEN),tekst=nm+" wordt werkloos. Het laatste loon was "+eur(l)+" per maand. De WW-uitkering is de eerste twee maanden 75% van het laatste loon. Daarna is het 70%.";
if(s==="75")return{f:"ww",h:"Hoe hoog is de uitkering in de eerste maand? (2 decimalen)",body:qp(tekst),a:a75,d:2,u:"€",calc:"Uitkering = (percentage : 100) × laatste loon\n(75 : 100) × "+num(l)+" = "+eur(a75)};
if(s==="70")return{f:"ww",h:"Hoe hoog is de uitkering in de vierde maand? (2 decimalen)",body:qp(tekst),a:a70,d:2,u:"€",calc:"De vierde maand valt na de eerste twee maanden: 70%.\nUitkering = (percentage : 100) × laatste loon\n(70 : 100) × "+num(l)+" = "+eur(a70)};
return{f:"ww",h:"Hoeveel euro per maand gaat de uitkering na twee maanden omlaag? (2 decimalen)",body:qp(tekst),a:r(a75-a70,2),d:2,u:"€",calc:"Eerste twee maanden: (75 : 100) × "+num(l)+" = "+eur(a75)+"\nDaarna: (70 : 100) × "+num(l)+" = "+eur(a70)+"\nVerschil: "+eur(a75)+" − "+eur(a70)+" = "+eur(r(a75-a70,2))};}
};
