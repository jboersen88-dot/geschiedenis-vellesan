# Haalt alle pagina's op die nu in het menu van meneerboersen.nl staan (Economie) -> economie/data/paginas.json
import urllib.request, urllib.parse, re, json, html
from html.parser import HTMLParser
BASE="https://sites.google.com/view/meneerboersen/homepage/"
def get(u): return urllib.request.urlopen(urllib.request.Request(u,headers={"User-Agent":"Mozilla/5.0"}),timeout=30).read().decode("utf8","ignore")
home=get("https://sites.google.com/view/meneerboersen/")
# menu: <a> met href naar /homepage/economie/... in volgorde
menu=[]
for href,txt in re.findall(r'<a[^>]+href="(/view/meneerboersen/homepage/economie[^"#]*)"[^>]*>(.*?)</a>',home,re.S):
    t=html.unescape(re.sub(r"<[^>]+>","",txt)).strip()
    if t and (href,t) not in menu: menu.append((href,t))
class P(HTMLParser):
    def __init__(s): super().__init__(); s.secs=[]; s.depth=0; s.stack=[]; s.cur=None; s.buf=None; s.kind=None
    def handle_starttag(s,tag,a):
        a=dict(a)
        if tag=="section":
            s.depth+=1
            if s.depth==1: s.cur=[]; s.secs.append(s.cur)
        if s.cur is None: return
        if tag in("h1","h2","h3","h4","p","li") and s.buf is None: s.buf=[]; s.kind=tag
        if tag=="br" and s.buf is not None: s.buf.append("\n")
        if tag=="iframe":
            src=a.get("data-src") or a.get("src") or ""; lab=a.get("aria-label") or ""
            m=re.search(r"file/d/([\w-]+)",src); y=re.search(r"youtube(?:-nocookie)?\.com/embed/([\w-]+)",src)
            d=re.search(r"docs\.google\.com/(presentation|document|spreadsheets|forms)/d/(?:e/)?([\w-]+)",src)
            if m: s.cur.append({"t":"drive","id":m.group(1),"naam":re.sub(r"^Drive,\s*","",lab)})
            elif y: s.cur.append({"t":"youtube","id":y.group(1),"naam":re.sub(r"^YouTube,?\s*","",lab)})
            elif d: s.cur.append({"t":"gdoc","soort":d.group(1),"src":src,"naam":lab})
            elif src: s.cur.append({"t":"embed","src":src,"naam":lab})
        if tag=="a" and s.cur is not None and a.get("href","").startswith("http") and "sites.google.com/view/meneerboersen" not in a["href"]:
            s.link=[a["href"],[]]
    def handle_endtag(s,tag):
        if tag=="section": s.depth-=1
        if tag=="a" and getattr(s,"link",None):
            t=re.sub(r"\s+"," ","".join(s.link[1])).strip(); h=s.link[0]
            m=re.search(r"[?&]q=([^&]+)",h)
            if "google.com/url" in h and m: h=urllib.parse.unquote(m.group(1))
            if t and "google.com/policies" not in h: s.cur.append({"t":"link","tekst":t,"href":h})
            s.link=None
        if s.buf is not None and tag==s.kind:
            t=re.sub(r"[ \t\xa0]+"," ","".join(s.buf)).strip()
            if t: s.cur.append({"t":"kop" if tag[0]=="h" else tag,"tekst":t})
            s.buf=None
    def handle_data(s,d):
        if s.buf is not None: s.buf.append(d)
        if getattr(s,"link",None): s.link[1].append(d)
uit=[]
for href,titel in menu:
    u="https://sites.google.com"+href; p=P(); p.feed(get(u))
    secs=[b for b in p.secs if b]
    rel=href.split("/homepage/economie")[1].strip("/")
    uit.append({"pad":rel,"titel":titel,"url":u,"secties":secs})
    n=sum(len(x) for x in secs); print(f"{n:4} blokken  {rel or '(economie)'}  {titel}")
json.dump(uit,open("/Users/BON/Claude/geschiedenis-vellesan/economie/data/paginas.json","w"),ensure_ascii=False,indent=1)
