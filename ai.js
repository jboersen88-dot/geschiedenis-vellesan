/* Gedeelde AI-nakijkmodule. Zelfde Apps Script-endpoint (Gemini) als de Economie-apps.
   UITZETTEN: zet GV_AI_URL hieronder op "" -> overal valt het terug op de lokale nakijker.
   NB: dit endpoint staat ook publiek in de broncode van de Google Site (quotum/misbruikrisico). */
(function(){
var GV_AI_URL="https://script.google.com/macros/s/AKfycbxkH4alzrbV7uJXjRbXAIHILrzQvlegxpeWD1yw9TCC_huhqs2wPEkBmEiXqf5YWuMiAA/exec";
var STOP=" de het een en van in op te dat die is zijn met voor aan als om bij of door uit naar ook maar dan wat wie hoe je jij jouw u ze zij hij wij we er niet geen meer minder kan kun moet wordt worden heeft hebben veel weinig alle alles iets deze dit waar wanneer welke zoals bijvoorbeeld per tot over onder tussen zonder wel nog al nu ";
function words(t){return (String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").match(/[a-z0-9]+/g)||[]);}
function keys(t){var seen={},k=[];words(t).forEach(function(w){if((w.length>=4||/^\d+$/.test(w))&&STOP.indexOf(" "+w+" ")<0&&!seen[w]){seen[w]=1;k.push(w);}});return k;}
function hits(text,aw){var k=keys(text),h=0;k.forEach(function(w){var s=/^\d+$/.test(w)?w:w.slice(0,Math.max(4,w.length-2));if(aw.some(function(x){return x.indexOf(s)===0;}))h++;});return k.length?h/k.length:0;}
/* Lokale controle per nakijkpunt (punten = lijst met korte teksten) */
function local(punten,ans){
  var aw=words(ans),goed=[],mist=[];
  punten.forEach(function(p,i){(hits(p,aw)>=0.4?goed:mist).push(i+1);});
  var f=punten.length?goed.length/punten.length:0;
  return {oordeel:f>=0.75?"goed":f>=0.4?"bijna":"nognietgoed",
    goed:goed.length?"Je raakt nakijkpunt "+goed.join(", ")+".":"",
    mist:mist.length?"Kijk nog naar nakijkpunt "+mist.join(", ")+".":"",fout:"",
    tip:"Vergelijk je antwoord met het modelantwoord hieronder.",lokaal:true};
}
/* o: {begrip, uitleg, voorbeeld, antwoord, paragraaf, punten[]} */
function check(o){
  var fb=function(msg){var f=local(o.punten&&o.punten.length?o.punten:[o.uitleg||""],o.antwoord);f.melding=msg;return f;};
  if(!GV_AI_URL)return Promise.resolve(fb(""));
  var ctl=window.AbortController?new AbortController():null,t=setTimeout(function(){if(ctl)ctl.abort();},45000);
  return fetch(GV_AI_URL,{method:"POST",body:JSON.stringify({vak:"geschiedenis",begrip:o.begrip,uitleg:o.uitleg||"",voorbeeld:o.voorbeeld||"",antwoord:o.antwoord,paragraaf:o.paragraaf||"",samenvatting:o.samenvatting||"",begrippen:(o.punten||[]).map(function(p,i){return (i+1)+". "+p;}).join("\n")}),signal:ctl?ctl.signal:undefined})
    .then(function(r){return r.json();})
    .then(function(f){return f&&f.status==="ok"?f:fb((f&&f.melding)||"De AI kon nu niet nakijken.");})
    .catch(function(){return fb("De AI is nu niet bereikbaar.");})
    .then(function(f){clearTimeout(t);return f;});
}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function render(f){
  var lab={goed:"✓ Goed",bijna:"Bijna",nognietgoed:"Nog niet goed"}[f.oordeel]||"Bijna";
  return '<div class="aifb '+esc(f.oordeel)+'"><span class="aibadge">'+lab+'</span>'+
    (f.melding?'<p class="ainote">'+esc(f.melding)+'</p>':'')+
    (f.goed?'<p><b>Goed:</b> '+esc(f.goed)+'</p>':'')+(f.mist?'<p><b>Mist nog:</b> '+esc(f.mist)+'</p>':'')+
    (f.fout?'<p><b>Klopt niet:</b> '+esc(f.fout)+'</p>':'')+(f.tip?'<p><b>Tip:</b> '+esc(f.tip)+'</p>':'')+
    '<p class="ainote">'+(f.lokaal?'Snelle controle op kernwoorden (zonder AI).':'Nagekeken door AI. Twijfel je? Vraag het je docent.')+'</p></div>';
}
/* CSS die alle pagina's delen (verwacht --green,--coral,--berry,--teal,--card,--line,--ink,--ok-soft) */
var css=document.createElement("style");
css.textContent=".aifb{margin-top:12px;border-radius:16px;padding:14px 16px;border:1.5px solid var(--line);background:var(--card);animation:aiin .32s cubic-bezier(.23,1,.32,1)}.aifb p{margin:6px 0}.aifb.goed{border-color:#2e9b6b;background:var(--ok-soft)}.aifb.bijna{border-color:#d69a2a}.aifb.nognietgoed{border-color:var(--berry)}.aibadge{display:inline-block;font-weight:800;font-size:13px;padding:3px 11px;border-radius:99px;background:var(--green);color:#fff}.aifb.bijna .aibadge{background:#b97a1f}.aifb.nognietgoed .aibadge{background:var(--berry)}.ainote{font-size:13px;color:var(--muted)}@keyframes aiin{from{opacity:0;transform:translateY(8px) scale(.98)}}@media(prefers-reduced-motion:reduce){.aifb{animation:none}}";
document.head.appendChild(css);
window.GV_AI={check:check,render:render,local:local,esc:esc,enabled:!!GV_AI_URL};
})();
