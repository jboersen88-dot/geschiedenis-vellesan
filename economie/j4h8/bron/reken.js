var FORM={
hoofd:"nationaal inkomen : aantal inwoners",
lorenz:"cumulatief % − vorig cumulatief %",
norm:"(percentage : 100) × totaal",
fair:"minimumprijs + fairtradepremie",
pct:"(nieuw − oud) : oud × 100"
};
var MODES=[["hoofd","Inkomen per hoofd"],["lorenz","Inkomensverdeling"],["norm","De norm van 0,7%"],["fair","Fairtradeprijs"],["pct","Procent verandering"]];
function mrd(x){return "€"+num(x)+" miljard";}
var RGEN={
hoofd:function(){var inw=pick([4,5,8,12,16,20,25,40,50]),ph=rnd(8,420)*100,ni=r(inw*ph/1000,1),a=ph;
return{f:"hoofd",h:"Bereken het inkomen per hoofd van de bevolking, in hele euro's.",body:qp("Het nationaal inkomen van een land is "+mrd(ni)+". Er wonen "+inw+" miljoen mensen."),a:a,d:0,u:"€",calc:"Inkomen per hoofd = nationaal inkomen : aantal inwoners\n"+mrd(ni)+" = €"+num(r(ni*1e9,0))+"\n"+inw+" miljoen = "+num(inw*1e6)+"\n€"+num(r(ni*1e9,0))+" : "+num(inw*1e6)+" = €"+num(a)};},
lorenz:function(){var c=[],x=0;for(var i=0;i<4;i++){x+=rnd(i===0?2:4,i===0?8:13);c.push(x);}
var names=["de armste 20%","de groep van 20% tot 40%","de groep van 40% tot 60%","de groep van 60% tot 80%","de rijkste 20%"],cum=[0].concat(c).concat([100]),k=rnd(1,5),a=cum[k]-cum[k-1];
return{f:"lorenz",h:"Hoeveel procent van het inkomen verdient "+names[k-1]+"?",body:qp("In een land is het inkomen zo verdeeld (opgeteld van arm naar rijk):")+stmt([["Bevolking","Opgeteld % van het inkomen"],["armste 20%",c[0]+"%"],["armste 40%",c[1]+"%"],["armste 60%",c[2]+"%"],["armste 80%",c[3]+"%"],["alle 100%","100%"]],"cpi"),a:a,d:0,u:"%",calc:"Groep = cumulatief % − vorig cumulatief %\n"+cum[k]+"% − "+cum[k-1]+"% = "+a+"%"};},
norm:function(){var ni=rnd(30,110)*10,p=Math.random()<0.6?0.7:pick([0.5,0.6,0.8,1]),a=r(p/100*ni,2);
return{f:"norm",h:"Hoeveel miljard euro is dat? (2 decimalen)",body:qp("Het nationaal inkomen van een land is "+mrd(ni)+". Het land besteedt "+num(p)+"% daarvan aan ontwikkelingssamenwerking."),a:a,d:2,u:"",calc:"Bedrag = (percentage : 100) × totaal\n("+num(p)+" : 100) × "+ni+" = "+mrd(a)};},
fair:function(){var v=pick([["cacao",rnd(200,260)*10,rnd(18,26)*10],["koffie",rnd(280,340)*10,rnd(40,48)*10],["katoen",rnd(140,180)*10,rnd(10,16)*10]]),t=pick([2,3,5,8,12]),pt=v[1]+v[2],a=pt*t;
if(Math.random()<0.45)return{f:"fair",h:"Hoeveel krijgt de boer per ton? (hele euro's)",body:qp("Een boer verkoopt "+v[0]+" via Fairtrade. De minimumprijs is €"+num(v[1])+" per ton. De fairtradepremie is €"+num(v[2])+" per ton."),a:pt,d:0,u:"€",calc:"Fairtradeprijs = minimumprijs + fairtradepremie\n"+num(v[1])+" + "+num(v[2])+" = €"+num(pt)+" per ton"};
return{f:"fair",h:"Hoeveel krijgt de coöperatie in totaal? (hele euro's)",body:qp("Een coöperatie verkoopt "+t+" ton "+v[0]+" via Fairtrade. De minimumprijs is €"+num(v[1])+" per ton. De fairtradepremie is €"+num(v[2])+" per ton."),a:a,d:0,u:"€",calc:"Stap 1: "+num(v[1])+" + "+num(v[2])+" = €"+num(pt)+" per ton\nStap 2: "+t+" × "+num(pt)+" = €"+num(a)};},
pct:function(){var v=pick([
function(){var o=rnd(220,300)*10,n=o+rnd(-60,45)*10;if(n===o)n=o-170;return ["De wereldmarktprijs van cacao ging van €"+num(o)+" naar €"+num(n)+" per ton.",o,n,"Met hoeveel procent is de prijs veranderd?"];},
function(){var o=rnd(12,48),n=o+rnd(2,9);return ["De bevolking van een land groeide van "+o+" miljoen naar "+n+" miljoen inwoners.",o,n,"Met hoeveel procent is de bevolking gegroeid?"];},
function(){var o=rnd(9,40)*100,n=o+rnd(1,6)*100;return ["Het inkomen per hoofd in een land steeg van €"+num(o)+" naar €"+num(n)+".",o,n,"Met hoeveel procent is het inkomen per hoofd gestegen?"];},
function(){var o=rnd(30,80),n=o+rnd(3,14);return ["De schuld van een land steeg van "+mrd(o)+" naar "+mrd(n)+".",o,n,"Met hoeveel procent is de schuld gestegen?"];}
])();var a=r((v[2]-v[1])/v[1]*100,1);
return{f:"pct",h:v[3]+" (1 decimaal; typ een min-teken bij een daling)",body:qp(v[0]),a:a,d:1,u:"%",calc:"Procentuele verandering = (nieuw − oud) : oud × 100\n("+num(v[2])+" − "+num(v[1])+") : "+num(v[1])+" × 100 = "+pc(a)+(a<0?"\nDus een daling van "+pc(-a):"")};}
};
