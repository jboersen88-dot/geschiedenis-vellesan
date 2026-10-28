// Test: node tools/voortgang-test.js  (vanuit de repo-root). Bouwt codes met de functies uit app.html, leest ze met die uit de leespagina.
const fs=require("fs"),assert=require("assert");
const pick=(f,a,b)=>{const s=fs.readFileSync(f,"utf8");return s.slice(s.indexOf(a),s.indexOf(b))};
const rd=new Function(pick("tools/voortgang-lezen.html","/*CODE*/","/*ENDCODE*/")+";return {decodeCode,codeCheck}")();
for(const [f,bk,n] of [["app.html",1,[20,20,19,18]],["boekje-2/app.html",2,[16,13,12,11]]]){
  const src=fs.readFileSync(f,"utf8"),lo=src.indexOf("function codeVragen"),hi=src.indexOf("var codeNieuw");
  const mk=new Function("PARS","S","BOEKJE","goalCount",src.slice(lo,hi).replace(/function codeLees[\s\S]*$/,"")+";return codeMaak")(
    n.map((k,i)=>({id:"H"+(i+1),g:new Array(k).fill(0),gi:[...Array(k).keys()]})),{goals:{"H1-0":1,"H1-5":1,"H2-1":1,"H4-10":1}},bk,id=>({H1:2,H2:1,H3:0,H4:1})[id]);
  const c=mk(),d=rd.decodeCode(c);
  assert(!d.fout,d.fout);assert.equal(d.boekje,bk);assert.equal(d.bits.length,n.reduce((a,b)=>a+b));
  assert.equal(d.bits[5],"1");assert.equal(d.bits[n[0]+1],"1");assert.equal(d.bits.split("1").length-1,4);
  assert(!rd.decodeCode(" "+c.toLowerCase()+"\n").fout);          // spaties/kleine letters mogen
  for(let i=3;i<c.length;i++){ // elke enkele tekenwissel moet opvallen
    const bad=c.slice(0,i)+(c[i]==="7"?"8":"7")+c.slice(i+1);if(bad!==c&&c[i]!=="-")assert(rd.decodeCode(bad).fout,"gemist: "+bad);}
  assert(rd.decodeCode(c.slice(0,-1)).fout);assert(rd.decodeCode("hallo").fout);
  console.log(f,"ok",c.length,"tekens:",c);
}
