var FORM={
netto:"brutoloon − inhoudingen",
belastbaar:"inkomsten + eigenwoningforfait − aftrekposten",
box1:"belasting schijf 1 + belasting schijf 2 + belasting schijf 3",
verschuldigd:"belasting box 1 + belasting box 3 − heffingskortingen",
nivel:"(nieuw − oud) : oud × 100"
};
var MODES=[["netto","Nettoloon"],["belastbaar","Belastbaar inkomen"],["box1","Box 1: schijventarief"],["verschuldigd","Te betalen belasting"],["nivel","Nivelleren"]];
function e0(x){return "€"+num(x);}
function n2(x){return Math.abs(x-Math.round(x))>1e-9?eur(x).slice(1):num(x);}
function e2(x){return "€"+n2(x);}
function p1(x){return pc(x).slice(0,-1);}
var G1=38400,G2=76800,T1=35.8,T2=37.5,T3=49.5;
var RGEN={
netto:function(){var b=r(rnd(1700,3400)+rnd(0,99)/100,2),l=r(b*rnd(20,28)/100,2),p=r(b*rnd(6,10)/100,2),a=r(b-l-p,2);
return{f:"netto",h:"Wat is het nettoloon? (2 decimalen)",body:stmt([["Brutoloon",eur(b)],["Loonheffing",eur(l)],["Pensioenpremie",eur(p)]]),a:a,d:2,u:"€",calc:"Nettoloon = brutoloon − inhoudingen\nInhoudingen: "+num(l)+" + "+num(p)+" = "+eur(r(l+p,2))+"\n"+num(b)+" − "+num(r(l+p,2))+" = "+eur(a)};},
belastbaar:function(){var l=rnd(280,560)*100+rnd(1,9)*20,huis=Math.random()<0.6,woz=huis?rnd(22,48)*10000:0,ew=r(woz*0.35/100,0),hy=huis?rnd(30,70)*100+35:0,gi=pick([0,350,600,900]),ov=(!huis||Math.random()<0.4)?pick([850,1150,1400]):0,rows=[["Loon",e0(l)]];
if(huis){rows.push(["WOZ-waarde van het huis",e0(woz)]);rows.push(["Eigenwoningforfait","0,35% van de WOZ-waarde"]);rows.push(["Hypotheekrente",e0(hy)]);}if(gi)rows.push(["Giften aan goede doelen",e0(gi)]);if(ov)rows.push(["Reiskosten openbaar vervoer",e0(ov)]);
var af=[];if(hy)af.push(hy);if(gi)af.push(gi);if(ov)af.push(ov);var ta=hy+gi+ov,a=l+ew-ta;
return{f:"belastbaar",h:"Wat is het belastbaar inkomen in box 1? (hele euro's)",body:stmt(rows),a:a,d:0,u:"€",calc:"Belastbaar inkomen = inkomsten + eigenwoningforfait − aftrekposten"+(huis?"\nEigenwoningforfait: (0,35 : 100) × "+num(woz)+" = "+e0(ew)+"\nErbij: "+num(l)+" + "+num(ew)+" = "+e0(l+ew):"\nGeen eigen huis, dus geen eigenwoningforfait.")+"\nAftrekposten: "+af.map(function(x){return num(x);}).join(" + ")+(af.length>1?" = "+e0(ta):"")+"\n"+num(l+ew)+" − "+num(ta)+" = "+e0(a)};},
box1:function(){var k=rnd(1,3),i=k===1?rnd(240,380)*100:k===2?rnd(400,760)*100:rnd(780,980)*100,s1=Math.min(i,G1),s2=Math.max(0,Math.min(i,G2)-G1),s3=Math.max(0,i-G2),b1=Math.floor(s1*T1/100+1e-9),b2=Math.floor(s2*T2/100+1e-9),b3=Math.floor(s3*T3/100+1e-9),a=b1+b2+b3;
return{f:"box1",h:"Hoeveel belasting betaal je in box 1? (hele euro's, per schijf naar beneden afronden)",body:qp("Je belastbaar inkomen is "+e0(i)+".")+stmt([["Schijf 1: t/m "+e0(G1),num(T1)+"%"],["Schijf 2: "+e0(G1)+" t/m "+e0(G2),num(T2)+"%"],["Schijf 3: alles daarboven",num(T3)+"%"]]),a:a,d:0,u:"€",calc:"Stap 1: in schijf 1 zit "+e0(s1)+(s2?", in schijf 2 zit "+(s3?num(G2):num(i))+" − "+num(G1)+" = "+e0(s2):". Schijf 2 en 3 zijn leeg.")+(s3?", in schijf 3 zit "+num(i)+" − "+num(G2)+" = "+e0(s3)+".":s2?". Schijf 3 is leeg.":"")+"\nStap 2: ("+num(T1)+" : 100) × "+num(s1)+" = "+n2(r(s1*T1/100,2))+" → "+e0(b1)+(s2?"\n("+num(T2)+" : 100) × "+num(s2)+" = "+n2(r(s2*T2/100,2))+" → "+e0(b2):"")+(s3?"\n("+num(T3)+" : 100) × "+num(s3)+" = "+n2(r(s3*T3/100,2))+" → "+e0(b3):"")+"\nStap 3: "+(s3?num(b1)+" + "+num(b2)+" + "+num(b3)+" = ":s2?num(b1)+" + "+num(b2)+" = ":"de belasting in box 1 is ")+e0(a)};},
verschuldigd:function(){var b1=rnd(90,260)*100+rnd(1,99),b3=pick([0,88,152,452,610]),hk=rnd(22,56)*100+rnd(1,99),a=b1+b3-hk;
return{f:"verschuldigd",h:"Hoeveel inkomstenbelasting moet je betalen? (hele euro's)",body:stmt([["Belasting box 1",e0(b1)],["Belasting box 3",e0(b3)],["Heffingskortingen",e0(hk)]]),a:a,d:0,u:"€",calc:"Verschuldigde inkomstenbelasting = box 1 + box 3 − heffingskortingen\n"+num(b1)+" + "+num(b3)+" − "+num(hk)+" = "+e0(a)};},
nivel:function(){var lo=rnd(18,24)*100,hi=rnd(48,70)*100,vast=Math.random()<0.5,dl,dh;if(vast){dl=dh=pick([50,80,100,120]);}else{dl=r(lo*pick([1,2,3,4])/100,0);dh=r(hi*pick([1,2,3,4])/100,0);}
var wie=Math.random()<0.5,o=wie?lo:hi,n=o+(wie?dl:dh),a=r((n-o)/o*100,1),pl=r(dl/lo*100,1),ph=r(dh/hi*100,1);
return{f:"nivel",h:"Met hoeveel procent stijgt het "+(wie?"lage":"hoge")+" inkomen? (1 decimaal)",body:stmt([["","Oud","Nieuw"],["Laag inkomen",e0(lo),e0(lo+dl)],["Hoog inkomen",e0(hi),e0(hi+dh)]]),a:a,d:1,u:"%",calc:"(nieuw − oud) : oud × 100\n("+num(n)+" − "+num(o)+") : "+num(o)+" × 100 = "+pc(a)+"\nLaag inkomen: +"+pc(pl)+", hoog inkomen: +"+pc(ph)+". "+(pl>ph?"De verschillen worden in verhouding kleiner: nivellering.":pl<ph?"De verschillen worden in verhouding groter: denivellering.":"De verhouding blijft gelijk.")};}
};
