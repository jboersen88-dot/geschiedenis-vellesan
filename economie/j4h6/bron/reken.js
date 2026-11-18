var FORM={
netto:"brutoloon − inhoudingen",
belastbaar:"inkomsten + eigenwoningforfait + bijtelling − aftrekposten",
box1:"belasting schijf 1 + belasting schijf 2",
box3:"(vermogen − heffingsvrij vermogen) × fictief rendement × belastingpercentage",
verschuldigd:"belasting box 1 + belasting box 3 − heffingskortingen",
nivel:"(nieuw − oud) : oud × 100"
};
var MODES=[["netto","Nettoloon"],["belastbaar","Belastbaar inkomen"],["box1","Box 1: schijventarief"],["box3","Box 3: vermogen"],["verschuldigd","Te betalen belasting"],["nivel","Nivelleren"]];
function e0(x){return "€"+num(x);}
var G1=68508,T1=37.1,T2=49.5;
var RGEN={
netto:function(){var b=r(rnd(1700,3400)+rnd(0,99)/100,2),l=r(b*rnd(20,28)/100,2),p=r(b*rnd(6,10)/100,2),a=r(b-l-p,2);
return{f:"netto",h:"Wat is het nettoloon? (2 decimalen)",body:stmt([["Brutoloon",eur(b)],["Loonheffing",eur(l)],["Pensioenpremie",eur(p)]]),a:a,d:2,u:"€",calc:"Nettoloon = brutoloon − inhoudingen\nInhoudingen: "+num(l)+" + "+num(p)+" = "+eur(r(l+p,2))+"\n"+num(b)+" − "+num(r(l+p,2))+" = "+eur(a)};},
belastbaar:function(){var l=rnd(280,560)*100+rnd(1,9)*20,ew=pick([0,900,1250,1400,1750]),bj=pick([0,0,3600,4200,5100]),hy=ew?rnd(30,70)*100+35:0,st=pick([0,600,1200,1850]),rows=[["Loon",e0(l)]];
if(ew)rows.push(["Eigenwoningforfait",e0(ew)]);if(bj)rows.push(["Bijtelling auto van de zaak",e0(bj)]);if(hy)rows.push(["Hypotheekrente",e0(hy)]);if(st)rows.push(["Studiekosten",e0(st)]);
if(rows.length<3){st=1200;rows.push(["Studiekosten",e0(st)]);}
var a=l+ew+bj-hy-st;
return{f:"belastbaar",h:"Wat is het belastbaar inkomen in box 1? (hele euro's)",body:stmt(rows),a:a,d:0,u:"€",calc:"Belastbaar inkomen = inkomsten + eigenwoningforfait + bijtelling − aftrekposten\nErbij: "+num(l)+(ew?" + "+num(ew):"")+(bj?" + "+num(bj):"")+" = "+e0(l+ew+bj)+"\nEraf: "+(hy?num(hy):"")+(hy&&st?" + ":"")+(st?num(st):"")+" = "+e0(hy+st)+"\n"+num(l+ew+bj)+" − "+num(hy+st)+" = "+e0(a)};},
box1:function(){var hoog=Math.random()<0.5,i=hoog?rnd(700,980)*100:rnd(240,640)*100,s1=Math.min(i,G1),s2=Math.max(0,i-G1),b1=Math.floor(s1*T1/100+1e-9),b2=Math.floor(s2*T2/100+1e-9),a=b1+b2;
return{f:"box1",h:"Hoeveel belasting betaal je in box 1? (hele euro's, per schijf naar beneden afronden)",body:qp("Je belastbaar inkomen is "+e0(i)+".")+stmt([["Schijf 1: tot "+e0(G1),num(T1)+"%"],["Schijf 2: alles daarboven",num(T2)+"%"]]),a:a,d:0,u:"€",calc:"Stap 1: in schijf 1 zit "+e0(s1)+(s2?", in schijf 2 zit "+num(i)+" − "+num(G1)+" = "+e0(s2):". Schijf 2 is leeg.")+"\nStap 2: ("+num(T1)+" : 100) × "+num(s1)+" = "+num(r(s1*T1/100,2))+" → "+e0(b1)+(s2?"\n("+num(T2)+" : 100) × "+num(s2)+" = "+num(r(s2*T2/100,2))+" → "+e0(b2):"")+"\nStap 3: "+(s2?num(b1)+" + "+num(b2)+" = ":"de belasting in box 1 is ")+e0(a)};},
box3:function(){var v=rnd(56,140)*1000,vrij=50000,fr=pick([1.9,2.6,4.7]),bp=pick([30,31]),bv=v-vrij,ren=r(bv*fr/100,2),a=Math.floor(ren*bp/100+1e-9);
return{f:"box3",h:"Hoeveel belasting betaal je in box 3? (hele euro's, naar beneden afronden)",body:qp("Je vermogen is "+e0(v)+". Het heffingsvrij vermogen is "+e0(vrij)+". Het fictief rendement is "+num(fr)+"% en de belasting is "+bp+"%."),a:a,d:0,u:"€",calc:"Stap 1: "+num(v)+" − "+num(vrij)+" = "+e0(bv)+" belastbaar vermogen\nStap 2: ("+num(fr)+" : 100) × "+num(bv)+" = "+eur(ren)+" fictief rendement\nStap 3: ("+bp+" : 100) × "+num(ren)+" = "+num(r(ren*bp/100,2))+" → "+e0(a)};},
verschuldigd:function(){var b1=rnd(90,260)*100+rnd(1,99),b3=pick([0,88,152,452,610]),hk=rnd(22,56)*100+rnd(1,99),a=b1+b3-hk;
return{f:"verschuldigd",h:"Hoeveel inkomstenbelasting moet je betalen? (hele euro's)",body:stmt([["Belasting box 1",e0(b1)],["Belasting box 3",e0(b3)],["Heffingskortingen",e0(hk)]]),a:a,d:0,u:"€",calc:"Verschuldigde inkomstenbelasting = box 1 + box 3 − heffingskortingen\n"+num(b1)+" + "+num(b3)+" − "+num(hk)+" = "+e0(a)};},
nivel:function(){var lo=rnd(18,24)*100,hi=rnd(48,70)*100,vast=Math.random()<0.5,dl,dh;if(vast){dl=dh=pick([50,80,100,120]);}else{dl=r(lo*pick([1,2,3,4])/100,0);dh=r(hi*pick([1,2,3,4])/100,0);}
var wie=Math.random()<0.5,o=wie?lo:hi,n=o+(wie?dl:dh),a=r((n-o)/o*100,1),pl=r(dl/lo*100,1),ph=r(dh/hi*100,1);
return{f:"nivel",h:"Met hoeveel procent stijgt het "+(wie?"lage":"hoge")+" inkomen? (1 decimaal)",body:stmt([["","Oud","Nieuw"],["Laag inkomen",e0(lo),e0(lo+dl)],["Hoog inkomen",e0(hi),e0(hi+dh)]]),a:a,d:1,u:"%",calc:"(nieuw − oud) : oud × 100\n("+num(n)+" − "+num(o)+") : "+num(o)+" × 100 = "+pc(a)+"\nLaag inkomen: +"+pc(pl)+", hoog inkomen: +"+pc(ph)+". "+(pl>ph?"De verschillen worden in verhouding kleiner: nivellering.":pl<ph?"De verschillen worden in verhouding groter: denivellering.":"De verhouding blijft gelijk.")};}
};
