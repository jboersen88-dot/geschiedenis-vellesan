/* Gedeelde AI-nakijker (Claude Haiku 5.5 via Apps Script). Laadt ná ai.js (gebruikt GV_AI voor esc/local en de CSS).
   UITZETTEN: zet GV_NK_URL op "" -> alles werkt met het nakijkblad / de lokale controle. Hier staat nooit een sleutel of lesstof.
   Geen naam, klas of leerlingnummer meesturen: alleen vraag, nakijkpunten, bron en antwoord. */
(function(){
var GV_NK_URL="https://geschiedenis-nakijker.nakijker-worker.workers.dev"; // Cloudflare Worker (sleutel en lesstof staan daar, niet hier)
var esc=window.GV_AI?GV_AI.esc:function(t){return String(t).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});};
/* o: {h:["H1","H2"], vraag, punten:[{t,p}], bron?, antwoord}
   -> belofte met {status:"ok",...} van het script, of {status:"fout", melding, lokaal?, ...local} */
function check(o){
  var fb=function(msg){var f=window.GV_AI?GV_AI.local(o.punten.map(function(p){return p.t;}),o.antwoord):{};f.status="fout";f.melding=msg;f.lokaal=true;return f;};
  if(!GV_NK_URL)return Promise.resolve(fb(""));
  var ctl=window.AbortController?new AbortController():null,t=setTimeout(function(){if(ctl)ctl.abort();},45000);
  // geen Content-Type -> geen CORS-preflight
  return fetch(GV_NK_URL,{method:"POST",body:JSON.stringify({actie:"nakijken",hoofdstukken:o.h,vraag:o.vraag,nakijkpunten:o.punten,bron:o.bron||"",antwoord:o.antwoord}),signal:ctl?ctl.signal:undefined})
    .then(function(r){return r.json();})
    .then(function(f){return f&&f.status==="ok"?f:fb((f&&f.melding)||"De AI kon nu niet nakijken. Gebruik het nakijkblad.");})
    .catch(function(){return fb("De AI is nu niet bereikbaar. Gebruik het nakijkblad.");})
    .then(function(f){clearTimeout(t);return f;});
}
/* Zelfde kaart als GV_AI.render, aangevuld met punten, per-punt-uitleg, feedback en 'buiten de lesstof' */
function render(f){
  if(f.status!=="ok")return '<div class="aifb"><p class="ainote">'+esc(f.melding||"")+'</p></div>';
  var lab={goed:"✓ Goed",bijna:"Bijna",nognietgoed:"Nog niet goed"}[f.oordeel]||"Bijna";
  return '<div class="aifb '+esc(f.oordeel)+'"><span class="aibadge">'+lab+' · '+f.punten+'/'+f.max+' p</span>'+
    '<ul class="aipp">'+(f.per_punt||[]).map(function(x){return '<li><b>'+(x.punten>=x.max?"✓":"✗")+'</b> Nakijkpunt '+x.nr+' <span class="ainote">('+x.punten+'/'+x.max+' p)</span>'+(x.waarom?'<br>'+esc(x.waarom):"")+'</li>';}).join("")+'</ul>'+
    (f.feedback?'<p>'+esc(f.feedback)+'</p>':"")+(f.tip?'<p><b>Tip:</b> '+esc(f.tip)+'</p>':"")+
    (f.buiten_lesstof?'<p><b>Dit staat niet in de lesstof:</b> '+esc(f.buiten_lesstof)+'</p>':"")+
    '<p class="ainote">Nagekeken door AI. Twijfel je? Vraag het je docent.</p></div>';
}
var css=document.createElement("style");
css.textContent=".aifb p{font-weight:400}.aipp{list-style:none;margin:8px 0;padding:0;display:grid;gap:8px}.aipp li{padding:8px 10px;border-radius:10px;background:color-mix(in srgb,var(--line) 35%,transparent)}";
document.head.appendChild(css);
window.GV_NK={check:check,render:render,enabled:!!GV_NK_URL};
})();
