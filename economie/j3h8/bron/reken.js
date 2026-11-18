var FORM={
quote:"(exportwaarde : nationaal inkomen) × 100",
saldo:"exportwaarde − importwaarde",
invoer:"(percentage : 100) × totaal",
hoofd:"nationaal inkomen : aantal inwoners"
};
var MODES=[["quote","Export- en importquote"],["saldo","Handelssaldo"],["invoer","Invoerrechten"],["hoofd","Inkomen per hoofd"]];
function mrd(x){return "€"+num(x)+" miljard";}
var RGEN={
quote:function(){var ni=rnd(60,95)*10,ex=Math.random()<0.5,w=r(ni*rnd(18,82)/100,0),a=r(w/ni*100,1),s=ex?"export":"import";
if(Math.random()<0.3){var q=rnd(25,80),ni2=rnd(40,90)*10,b=r(q/100*ni2,1);
return{f:"invoer",h:"Hoe groot is de "+s+"waarde, in miljard euro? (1 decimaal)",body:qp("Het nationaal inkomen van een land is "+mrd(ni2)+". De "+s+"quote is "+q+"%."),a:b,d:1,u:"",calc:"Deel = (percentage : 100) × totaal\n("+q+" : 100) × "+ni2+" = "+mrd(b)};}
return{f:"quote",h:"Bereken de "+s+"quote. (1 decimaal)",body:qp("Het nationaal inkomen van een land is "+mrd(ni)+". De "+s+"waarde is "+mrd(w)+"."),a:a,d:1,u:"%",calc:(ex?"Exportquote":"Importquote")+" = ("+s+"waarde : nationaal inkomen) × 100\n("+w+" : "+ni+") × 100 = "+pc(a)+"\n"+(a>=50?"Een hoge quote: een open economie.":"")};},
saldo:function(){var ex=rnd(380,720),im=ex+pick([-64,-48,-35,-22,-9,12,27,41,56]),a=ex-im;
return{f:"saldo",h:"Wat is het handelssaldo, in miljard euro? (typ een min-teken bij een tekort)",body:stmt([["Exportwaarde",mrd(ex)],["Importwaarde",mrd(im)]]),a:a,d:0,u:"",calc:"Handelssaldo = exportwaarde − importwaarde\n"+ex+" − "+im+" = "+a+" miljard\n"+(a<0?"De import is groter: een handelstekort van "+mrd(-a)+".":"De export is groter: een handelsoverschot van "+mrd(a)+".")};},
invoer:function(){var v=pick([["Een fiets",rnd(18,45)*10],["Een partij staal",rnd(40,95)*100],["Een zonnepaneel",rnd(12,30)*10],["Een scooter",rnd(90,160)*10],["Een paar sportschoenen",rnd(30,80)]]),p=pick([4,6,8,10,12,15,25]),h=r(p/100*v[1],2),a=r(v[1]+h,2);
if(Math.random()<0.4)return{f:"invoer",h:"Hoeveel invoerrechten betaal je? (2 decimalen)",body:qp(v[0]+" van buiten de EU kost "+eur(v[1])+". De invoerrechten zijn "+p+"%."),a:h,d:2,u:"€",calc:"Invoerrechten = (percentage : 100) × prijs\n("+p+" : 100) × "+num(v[1])+" = "+eur(h)};
return{f:"invoer",h:"Wat is de prijs met invoerrechten? (2 decimalen)",body:qp(v[0]+" van buiten de EU kost "+eur(v[1])+". Daar komen "+p+"% invoerrechten bij."),a:a,d:2,u:"€",calc:"Stap 1: ("+p+" : 100) × "+num(v[1])+" = "+eur(h)+"\nStap 2: "+num(v[1])+" + "+num(h)+" = "+eur(a)};},
hoofd:function(){var inw=pick([4,5,8,12,16,20,25,40,50]),ph=rnd(8,420)*100,ni=r(inw*ph/1000,1),a=ph;
return{f:"hoofd",h:"Bereken het inkomen per hoofd van de bevolking, in hele euro's.",body:qp("Het nationaal inkomen van een land is "+mrd(ni)+". Er wonen "+inw+" miljoen mensen."),a:a,d:0,u:"€",calc:"Inkomen per hoofd = nationaal inkomen : aantal inwoners\n"+mrd(ni)+" = €"+num(r(ni*1e9,0))+"\n"+inw+" miljoen = "+num(inw*1e6)+"\n€"+num(r(ni*1e9,0))+" : "+num(inw*1e6)+" = €"+num(a)};}
};
