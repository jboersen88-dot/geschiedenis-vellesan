# Bouwt economie/<naam>/toets.html (de digitale oefentoetsen, ?t=t1 t/m t4) uit de toets.html van de root (Geschiedenis)
# met de Economie-inhoud uit <naam>/bron/toetsen.json.
# Gebruik: python3 -I economie/bouw-toets.py se3   (vanuit de root van de repo)
# toetsen.json = blokken (meerkeuze, open vragen, rekenopgaven; een blok kan in meer toetsen zitten) + toetsen (welke blokken).
# Meerkeuze en rekenopgaven kijkt de pagina zelf na (met het nakijkblad van de docent); open vragen kijkt de AI van de Worker na
# (vak "economie"; antwoordmodel en puntenverdeling gaan mee in de aanvraag, de Worker hoeft niet te veranderen).
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ECO = os.path.join(ROOT, "economie")

CONFIG = {
    "se3": dict(
        titel="Online oefentoets · Economie SE3",
        key="gs-eco-se3-toets-v1",          # localStorage-sleutel (de Geschiedenis-toets gebruikt gv-toets-v1; zelfde domein)
        bron="se3/bron",
        data="se3/bron/data.json",           # VERS: n, min, pts moeten kloppen met toetsen.json
    ),
}

if len(sys.argv) != 2 or sys.argv[1] not in CONFIG:
    sys.exit("Gebruik: python3 -I economie/bouw-toets.py <" + "|".join(CONFIG) + ">")
name = sys.argv[1]
C = CONFIG[name]
OUT = os.path.join(ECO, name)

s = open(os.path.join(ROOT, "toets.html"), encoding="utf-8").read()
J = json.load(open(os.path.join(ECO, C["bron"], "toetsen.json"), encoding="utf-8"))
VERS = json.load(open(os.path.join(ECO, C["data"]), encoding="utf-8"))["VERS"]
B, T = J["blokken"], J["toetsen"]


def rep(s, old, new, n=1):
    assert s.count(old) == n, (s.count(old), old[:90])
    return s.replace(old, new)


# ---------- controle van de inhoud ----------
def fields(o):
    return [f for d in o["delen"] for f in d["velden"]]


for k, t in T.items():
    v = [x for x in VERS if x["n"] == t["n"]][0]
    pts = len(B[t["mc"]]) + sum(o["p"] for o in (B[t["open"]] if t["open"] else [])) + sum(o["p"] for o in B[t["rek"]])
    assert (v["min"], v["pts"]) == (t["min"], pts), (k, v["min"], v["pts"], t["min"], pts)
for o in B["rek_basis"] + B["rek_verd"]:
    assert o["p"] == sum(f["p"] for f in fields(o)), o["nr"]
    for f in fields(o):
        assert f["type"] in ("num", "keuze", "open")
        if f["type"] == "open":
            assert sum(g["p"] for g in f["g"]) == f["p"]
for o in B["open_verd"]:
    assert sum(g["p"] for g in o["g"]) == o["p"], o["nr"]
for q in B["mc_basis"] + B["mc_verd"]:
    assert len(q["o"]) == 4 and 0 <= q["j"] < 4

# meerkeuzeregels van de docent (tools/vragencheck.py): alleen waarschuwen, de inhoud blijft zoals de docent hem schreef
VCP = os.path.join(ROOT, "tools", "vragencheck.py")
vc = {"__name__": "vragencheck", "__file__": VCP}
exec(open(VCP, encoding="utf-8").read(), vc)
for blok in ("mc_basis", "mc_verd"):
    langste = 0
    for i, q in enumerate(B[blok]):
        probs, lang = vc["check_q"](q["o"], q["j"])
        langste += lang
        for p in probs:
            print("WAARSCHUWING vragencheck %s vraag %d: %s" % (blok, i + 1, p))
    share = langste / len(B[blok])
    print("vragencheck %s: juiste antwoord is in %.0f%% van de vragen het langste (max %.0f%%)%s" % (
        blok, share * 100, vc["LANGSTE_DREMPEL"] * 100, "  <-- WAARSCHUWING" if share > vc["LANGSTE_DREMPEL"] else ""))

# ---------- data in de pagina: blokken eenmaal, toetsen verwijzen ernaar ----------
toetsjs = ",".join('"%s":{"t":"Oefentoets %d","th":"%s","rk":"%s","min":%d,"mc":B.%s,"open":%s,"rek":B.%s}' % (
    k, t["n"], t["th"], t["rk"], t["min"], t["mc"], ("B." + t["open"]) if t["open"] else "[]", t["rek"]) for k, t in T.items())
data = "var B=" + json.dumps(B, ensure_ascii=False, separators=(",", ":")) + ";\nwindow.TOETSEN={" + toetsjs + "};"
assert "</script" not in data

s = rep(s, "<title>Online oefentoets · Geschiedenis</title>", "<title>%s</title>" % C["titel"])
s = rep(s, '<script src="data/toetsen.js"></script>', "<script>\n" + data + "\n</script>")
s = rep(s, '<script src="ai.js"></script>', '<script src="../../ai.js"></script>')
s = rep(s, '<script src="nakijker.js"></script>', '<script src="../../nakijker.js"></script>')
s = rep(s, 'var KEY="gv-toets-v1"', 'var KEY="%s"' % C["key"])

CSS = r"""
.rk{margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}.rk .rl{font-weight:600;margin-bottom:8px}
.ans{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:6px 0}
input.num{width:9.5em;max-width:100%;min-height:44px;border:2px solid var(--line);border-radius:12px;padding:8px 12px;font:16px Inter,sans-serif;background:var(--card);color:var(--ink);transition:border-color .16s}
input.num:focus{border-color:var(--teal);outline:none}
.stepper button.w{padding:0 16px}textarea.s{min-height:76px}
.rr{padding:8px 10px;border-radius:10px;margin:6px 0;border:1.5px solid var(--line)}.rr.ok{border-color:var(--ok);background:var(--ok-soft)}.rr.bad{border-color:var(--bad);background:var(--bad-soft)}
.bron th{border:1px solid var(--line);padding:5px 10px;text-align:left;background:color-mix(in srgb,var(--line) 40%,transparent)}
.bron .t{margin-bottom:6px}
</style>"""
s = rep(s, "</style>", CSS.lstrip("\n"))

# ---------- toetsen klaarzetten: alle open vragen (ook die in een rekenopgave) in D[k].ao ----------
s = rep(s, "Object.keys(D).forEach(mcWarn);", r"""Object.keys(D).forEach(mcWarn);
Object.keys(D).forEach(function(k){var d=D[k];d.ao=d.open.slice();d.rek.forEach(function(r){r.delen.forEach(function(dl){dl.velden.forEach(function(f){if(f.type==="open")d.ao.push(f);});});});});""")
s = rep(s, "function maxPts(k){return D[k].mc.length+D[k].open.reduce(function(a,o){return a+o.p;},0);}",
        "function maxPts(k){return D[k].mc.length+D[k].open.reduce(function(a,o){return a+o.p;},0)+D[k].rek.reduce(function(a,r){return a+r.p;},0);}")

# ---------- keuzescherm ----------
s = rep(s, "Aan het einde kijkt de meerkeuze zichzelf na en kijk je de open vragen na met het nakijkblad. Je antwoorden blijven op dit apparaat bewaard.",
        "Aan het einde kijken de meerkeuze en de rekenopgaven zichzelf na, met het nakijkblad van je docent. De open vragen kijkt de AI na. Je antwoorden blijven op dit apparaat bewaard.")
s = rep(s, """sub=maxPts(k)+" punten · "+D[k].min+" minuten · "+D[k].mc.length+" meerkeuze + "+D[k].open.length+" open";""",
        """sub=maxPts(k)+" punten · "+D[k].min+" minuten · "+D[k].mc.length+" meerkeuze"+(D[k].open.length?" + "+D[k].open.length+" open":"")+" + "+D[k].rek.length+" rekenopgaven · theorie "+D[k].th.toLowerCase()+", rekenen "+D[k].rk.toLowerCase();""")

# ---------- state, tellen ----------
s = rep(s, "st[k]={mc:{},open:{},self:{},perm:", "st[k]={mc:{},open:{},rek:{},calc:{},self:{},perm:")
s = rep(s, "D[cur].open.forEach(function(o){if(!(a.open[o.nr]||\"\").trim())n++;});return n;}",
        "D[cur].ao.forEach(function(o){if(!(a.open[o.nr]||\"\").trim())n++;});rekFields(cur).forEach(function(x){var v=((a.rek||{})[x[0]]||[])[x[1]];if(v==null||v===\"\")n++;});return n;}")
s = rep(s, "function total(){return D[cur].mc.length+D[cur].open.length;}", "function total(){return D[cur].mc.length+D[cur].ao.length+rekFields(cur).length;}")

# ---------- klikken en typen: keuzeknoppen en invulvelden van het rekenen, berekeningsstappen ----------
s = rep(s, """  var s=e.target.closest("[data-pt]");if(s){""", r"""  var rk=e.target.closest("[data-rk]");if(rk){var r1=st[cur].rek=st[cur].rek||{},ar=r1[rk.dataset.rk]=r1[rk.dataset.rk]||[];ar[+rk.dataset.f]=+rk.dataset.v;save();
    rk.parentNode.querySelectorAll("button").forEach(function(x){x.setAttribute("aria-pressed",x===rk?"true":"false");});prog();return;}
  var xk=e.target.closest("[data-xk]");if(xk){st[cur].self["x"+xk.dataset.xk]=+xk.dataset.xp;save();
    xk.parentNode.querySelectorAll("button").forEach(function(x){x.setAttribute("aria-pressed",x===xk?"true":"false");});score();return;}
  var s=e.target.closest("[data-pt]");if(s){""")
s = rep(s, """app.addEventListener("input",function(e){var t=e.target.closest("textarea[data-o]");""", r"""app.addEventListener("input",function(e){
  var ri=e.target.closest("input[data-r]");if(ri){var r1=st[cur].rek=st[cur].rek||{},ar=r1[ri.dataset.r]=r1[ri.dataset.r]||[];ar[+ri.dataset.f]=ri.value;save();prog();return;}
  var tc=e.target.closest("textarea[data-c]");if(tc){st[cur].calc=st[cur].calc||{};st[cur].calc[tc.dataset.c]=tc.value;save();return;}
  var t=e.target.closest("textarea[data-o]");""")
s = rep(s, "var o2=D[cur].open.filter(", "var o2=D[cur].ao.filter(")

# ---------- toets maken: Deel A meerkeuze, Deel B open vragen (alleen als die er zijn), Deel B/C rekenen ----------
EXAM = r"""/* ---------- rekenen ---------- */
function escA(s){return esc(s).replace(/"/g,"&quot;");}
function nl(x,dec){return x.toLocaleString("nl-NL",{minimumFractionDigits:dec,maximumFractionDigits:dec});}
/* Nederlands getal uit tekst: 1.892,55 | 1892.55 | € 13,33% | -0,22 ; bij meer getallen telt het laatste (het antwoord achter een =) */
function parseNL(s,klein){var t=String(s).match(/(?:[-−–]\s*)?\d[\d.]*(?:,\d+)?/g);if(!t)return NaN;t=t[t.length-1];var neg=/^[-−–]/.test(t);t=t.replace(/^[-−–]\s*/,"");
  if(t.indexOf(",")>-1)t=t.replace(/\./g,"").replace(",",".");else if(!klein&&/^\d{1,3}(\.\d{3})+$/.test(t))t=t.replace(/\./g,"");
  var x=parseFloat(t);return neg?-x:x;}
function fieldOk(f,v){if(v==null||v==="")return false;if(f.type==="keuze")return v===f.j;
  var x=parseNL(v,Math.max.apply(null,f.ans)<1000);if(isNaN(x))return false;if(f.abs)x=Math.abs(x);
  return f.ans.some(function(a){return Math.abs(x-a)<=(f.tol||0.005)+1e-9;});}
function dp(dl){return dl.velden.reduce(function(a,f){return a+f.p;},0);}
function rekFields(k){var a=[];D[k].rek.forEach(function(r){r.delen.forEach(function(dl){dl.velden.forEach(function(f,i){if(f.type!=="open")a.push([r.nr+dl.id,i,f]);});});});return a;}
/* punten van een deelvraag: goede velden + (als een rekenantwoord fout is) punten voor de berekening die de leerling zichzelf geeft, nooit het volle aantal */
function deelPts(r,dl){var a=((st[cur].rek||{})[r.nr+dl.id])||[],p=0,w=0;
  dl.velden.forEach(function(f,i){if(f.type==="open")return;if(fieldOk(f,a[i]))p+=f.p;else if(f.type==="num")w+=f.p;});
  var max=Math.max(w-1,0),ex=Math.min(max,+st[cur].self["x"+r.nr+dl.id]||0);return {p:p,ex:ex,max:max,ok:a};}
function rekScore(){var s=0;D[cur].rek.forEach(function(r){r.delen.forEach(function(dl){var q=deelPts(r,dl);s+=q.p+q.ex;});});return s;}
function rtbl(r){return '<table>'+r.map(function(c,i){return '<tr>'+c.map(function(x){return i?'<td>'+esc(x)+'</td>':'<th scope="col">'+esc(x)+'</th>';}).join("")+'</tr>';}).join("")+'</table>';}
function rekBron(r){return '<div class="bron"><div class="t">'+esc(r.tekst)+'</div>'+(r.tabel?rtbl(r.tabel):"")+'</div>';}
function fieldEx(r,dl,f,i){var key=r.nr+dl.id,v=((st[cur].rek||{})[key]||[])[i],lab="Opgave "+r.nr+" "+dl.id;
  if(f.type==="open")return '<label class="muted" style="font-size:13.5px" for="to-'+f.nr+'">'+esc(f.label)+'</label><textarea class="s" id="to-'+f.nr+'" data-o="'+f.nr+'" placeholder="Typ hier je antwoord">'+esc(st[cur].open[f.nr]||"")+'</textarea>';
  if(f.type==="keuze")return '<div class="stepper" role="group" aria-label="'+escA(f.label||lab)+'">'+(f.label?'<span class="muted">'+esc(f.label)+':</span>':"")+f.opties.map(function(o,j){return '<button class="w" data-rk="'+key+'" data-f="'+i+'" data-v="'+j+'" aria-pressed="'+(v===j)+'">'+esc(o)+'</button>';}).join("")+'</div>';
  var pre=f.eenh==="€"?"€":"",post=f.eenh&&!pre?f.eenh:"";
  return '<div class="ans">'+(f.label?'<label class="muted" for="rk-'+key+i+'">'+esc(f.label)+':</label>':"")+(pre?'<span>€</span>':"")+'<input class="num" type="text" inputmode="decimal" autocomplete="off" id="rk-'+key+i+'" data-r="'+key+'" data-f="'+i+'" value="'+escA(v==null?"":v)+'" aria-label="Antwoord '+lab+'">'+(post?'<span class="muted">'+esc(post)+'</span>':"")+'</div>';}
function rekEx(r){var h='<div class="card q"><div class="n">Opgave '+r.nr+' · '+r.p+' punten</div><p>'+esc(r.titel)+'</p>'+rekBron(r);
  r.delen.forEach(function(dl){h+='<div class="rk"><div class="rl">'+dl.id+') '+esc(dl.v)+' <span class="muted">('+dp(dl)+' p)</span></div>';
    dl.velden.forEach(function(f,i){h+=fieldEx(r,dl,f,i);});h+='</div>';});
  return h+'<div class="rk"><label class="muted" style="font-size:13.5px" for="rc-'+r.nr+'">Je berekening (mag ook op papier; hier wordt niets mee nagekeken)</label><textarea class="s" id="rc-'+r.nr+'" data-c="'+r.nr+'">'+esc((st[cur].calc||{})[r.nr]||"")+'</textarea></div></div>';}
function exam(){
  var d=D[cur],a=st[cur],n=0;
  var h='<div class="bar"><span class="t" id="clk">--:--</span><div class="pr"><i id="pr"></i></div><small id="pn"></small></div><div class="eyebrow" style="margin-top:18px">Oefentoets</div><h1>'+esc(d.t.replace("Oefentoets ","Toets "))+'</h1><p class="muted">'+maxPts(cur)+' punten · '+d.min+' minuten · zonder boek, een rekenmachine mag. Meerkeuze: kies één antwoord.'+(d.open.length?' Open vragen: schrijf in hele zinnen.':'')+' Rekenen: vul alleen je antwoord in, met een komma (bijvoorbeeld 12,50).</p><h2>Deel A · Meerkeuze</h2>';
  d.mc.forEach(function(q,i){n++;h+='<div class="card q fade" style="animation-delay:'+Math.min(i,8)*30+'ms"><div class="n">Vraag '+n+' · 1 punt</div><p>'+esc(q.v)+'</p><div class="opts" role="radiogroup" aria-label="Antwoorden">';
    a.perm[i].forEach(function(oi,pos){h+='<button class="opt" role="radio" aria-checked="'+(a.mc[i]===oi)+'" data-q="'+i+'" data-i="'+oi+'"><span class="l">'+"ABCD"[pos]+'</span><span>'+esc(q.o[oi])+'</span></button>';});
    h+="</div></div>";});
  if(d.open.length){h+='<h2>Deel B · Open vragen</h2>';
    d.open.forEach(function(o){h+='<div class="card q"><div class="n">Vraag '+o.nr+' · '+o.p+' punt'+(o.p>1?"en":"")+'</div>'+(o.b?bronHtml(o.b):"")+'<p>'+qtext(o.v)+'</p><textarea data-o="'+o.nr+'" aria-label="Antwoord vraag '+o.nr+'" placeholder="Typ hier je antwoord">'+esc(a.open[o.nr]||"")+'</textarea></div>';});}
  h+='<h2>Deel '+(d.open.length?"C":"B")+' · Rekenen</h2>';
  d.rek.forEach(function(r){h+=rekEx(r);});
  h+='<div class="stick"><button class="btn" id="hand">Inleveren en nakijken</button></div>';
  app.innerHTML=h;prog();clearInterval(timer);tick();timer=setInterval(tick,1000);
}
function tick"""
s = rep(s, "/* ---------- toets maken ---------- */\n", "/* ---------- toets maken ---------- */\n")  # ankerpunt aanwezig
i0, i1 = s.index("function exam(){"), s.index("function tick(){")
s = s[:i0] + EXAM + s[i1 + len("function tick"):]

# ---------- nakijken: score met rekenen, antwoordmodel, bron voor de AI ----------
s = rep(s, "function openScore(){var a=st[cur],s=0;D[cur].open.forEach(", "function openScore(){var a=st[cur],s=0;D[cur].ao.forEach(")
s = rep(s, "var m=maxPts(cur),p=mcScore()+openScore(),g=gradeOf(p,m)", "var m=maxPts(cur),p=mcScore()+openScore()+rekScore(),g=gradeOf(p,m)")
s = rep(s, """function nkHtml(o){var a=st[cur],v=a.self[o.nr],h="";""",
        """function nkHtml(o){var a=st[cur],v=a.self[o.nr],h=o.model?'<div class="nk"><div class="chk" style="cursor:default"><span><b>Antwoordmodel:</b> '+esc(o.model)+'</span></div></div>':"";""")
s = rep(s, "var HF={t1:[\"H1\",\"H2\"],t2:[\"H3\",\"H4\"],t3:[\"H1\",\"H2\",\"H3\",\"H4\"]},busy={},queue=[],running=0;",
        """var busy={},queue=[],running=0;
/* De Worker krijgt het antwoordmodel en de let-op-regel van de docent mee in bron (vraag en puntenverdeling gaan in vraag en nakijkpunten) */
function bronAI(o){return ((o.b||"")+(o.model?"ANTWOORDMODEL VAN DE DOCENT:\\n"+o.model:"")+(o.opm?"\\nLET OP: "+o.opm:"")).trim().slice(0,4000);}""")
s = rep(s, 'GV_NK.check({h:HF[k],vraag:o.v.slice(0,1500),punten:aiPunten(o),bron:(o.b||"").slice(0,4000),',
        'GV_NK.check({h:o.h,vak:"economie",vraag:o.v.slice(0,1500),punten:aiPunten(o),bron:bronAI(o),', 2)
s = rep(s, "D[k].open.forEach(function(o){var ans=", "D[k].ao.forEach(function(o){var ans=")
s = rep(s, 'if(cur)D[cur].open.forEach(function(o){var b=document.getElementById("ai-"', 'if(cur)D[cur].ao.forEach(function(o){var b=document.getElementById("ai-"')

RESULT = r"""function openRes(o){return '<div class="muted" style="font-size:13px">Jouw antwoord</div><div class="mine" id="mine-'+o.nr+'">'+mineHtml(o)+'</div><div class="muted" style="font-size:13px;margin-top:12px">Zo kijk je het na</div><div id="nk-'+o.nr+'">'+nkHtml(o)+'</div>';}
function fieldShow(f,v){if(v==null||v==="")return "niet ingevuld";return f.type==="keuze"?f.opties[v]:String(v).trim();}
function fieldGoed(f){if(f.type==="keuze")return f.opties[f.j];var e=f.eenh||"",eu=/^€/.test(e),post=e.replace(/^€\s*/,"");
  return f.ans.map(function(x){return (eu?"€ ":"")+nl(x,eu?2:((String(x).split(".")[1]||"").length))+(post?" "+post:"");}).join(" of ");}
function rekRes(r){var a=st[cur],h='<div class="card q"><div class="n">Opgave '+r.nr+' · '+r.p+' punten</div><p>'+esc(r.titel)+'</p>'+rekBron(r);
  r.delen.forEach(function(dl){var q=deelPts(r,dl),key=r.nr+dl.id;h+='<div class="rk"><div class="rl">'+dl.id+') '+esc(dl.v)+' <span class="muted">('+dp(dl)+' p)</span></div>';
    dl.velden.forEach(function(f,i){if(f.type==="open"){h+=openRes(f);return;}
      var ok=fieldOk(f,q.ok[i]);h+='<div class="rr '+(ok?"ok":"bad")+'"><b>'+(ok?"✓":"✗")+'</b> '+(f.label?esc(f.label)+': ':'')+'Jouw antwoord: <b>'+esc(fieldShow(f,q.ok[i]))+'</b>'+(ok?'':' · Goed: <b>'+esc(fieldGoed(f))+'</b>')+' <span class="muted">('+(ok?f.p:0)+'/'+f.p+' p)</span></div>';});
    h+='<div class="fb">'+dl.uitw.map(esc).join("<br>")+'</div>';
    if(q.max>0)h+='<div class="stepper" role="group" aria-label="Punten voor je berekening bij '+r.nr+dl.id+'"><span class="muted">Klopt je berekening? Punten voor je berekening:</span>'+Array.apply(null,Array(q.max+1)).map(function(_,p){return '<button data-xk="'+key+'" data-xp="'+p+'" aria-pressed="'+(q.ex===p)+'">'+p+'</button>';}).join("")+'</div>';
    h+='</div>';});
  var c=(a.calc||{})[r.nr];if(c&&c.trim())h+='<div class="rk"><div class="muted" style="font-size:13px">Jouw berekening</div><div class="mine">'+esc(c)+'</div></div>';
  return h+'</div>';}
function result(){
  var d=D[cur],a=st[cur],m=maxPts(cur);
  var h='<a class="muted" href="#" id="home">← Andere toets kiezen</a><div class="card res fade" style="margin-top:16px"><div class="eyebrow">Je cijfer'+(d.open.length?' (voorlopig, tot je de open vragen hebt nagekeken)':'')+'</div><div class="grade" id="gr">-</div><p><b id="pp">0</b> van <b>'+m+'</b> punten · meerkeuze '+mcScore()+'/'+d.mc.length+'</p><p class="muted" id="gm" style="margin:0"></p><p class="muted" style="font-size:14px;margin:10px 0 0">Cijfer = punten : '+m+' × 9 + 1. Meerkeuze en rekenen zijn nagekeken met het nakijkblad'+(d.open.length?'; bij de open vragen kijkt de AI mee en kun jij de vinkjes nog aanpassen':'')+'. Foute rekenantwoorden: geef jezelf de punten die je berekening waard is.</p></div><h2>Meerkeuze nagekeken</h2>';
  d.mc.forEach(function(q,i){var ok=a.mc[i]===q.j;h+='<div class="card q"><div class="n">Vraag '+(i+1)+(ok?" · goed":(a.mc[i]==null?" · niet beantwoord":" · fout"))+'</div><p>'+esc(q.v)+'</p><div class="opts">';
    a.perm[i].forEach(function(oi,pos){var c=oi===q.j?" right":(a.mc[i]===oi?" wrong":"");h+='<div class="opt'+c+'" style="cursor:default"><span class="l">'+"ABCD"[pos]+'</span><span>'+esc(q.o[oi])+'</span></div>';});
    h+='</div>'+(q.u?'<div class="fb">'+esc(q.u)+'</div>':"")+'</div>';});
  if(d.open.length){h+='<h2>Open vragen nakijken</h2>';
    d.open.forEach(function(o){h+='<div class="card q"><div class="n">Vraag '+o.nr+' · '+o.p+' punt'+(o.p>1?"en":"")+'</div>'+(o.b?bronHtml(o.b):"")+'<p>'+qtext(o.v)+'</p>'+openRes(o)+'</div>';});}
  h+='<h2>Rekenen nagekeken</h2>';
  d.rek.forEach(function(r){h+=rekRes(r);});
  h+='<div style="margin-top:26px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn ghost" id="again">Deze toets opnieuw maken</button><a class="btn" href="app.html#lab">Oefen verder in het Oefenlab</a></div>';
  app.innerHTML=h;score();runAI();
}
load();"""
j0, j1 = s.index("function result(){"), s.index("load();\nvar m=")
s = s[:j0] + RESULT + s[j1 + len("load();"):]
s = rep(s, "/[?&]t=(t[123])/", "/[?&]t=(t[1-4])/")

# ---------- controle ----------
for gone in ["Geschiedenis", "gv-toets", "HF[", "data/toetsen.js"]:
    assert gone not in s, gone
for need in ['vak:"economie"', C["key"], "../../ai.js", "../../nakijker.js", "t[1-4]"]:
    assert need in s, need

os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, "toets.html"), "w", encoding="utf-8").write(s)
print("economie/%s/toets.html" % name, len(s), "tekens;", ", ".join(T))
