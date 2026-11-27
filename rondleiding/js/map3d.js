/* Missie Vellesan: de plattegrond als echt 3D-model.
   Drie etages als platen in de ruimte, met glazen buitenmuren en de stops als bordjes die naar je toe draaien.
   Eén vinger: draaien en kantelen. Twee vingers: zoomen, schuiven en draaien. Muis: slepen, wiel = zoomen, shift+slepen = schuiven.
   Alleen CSS 3D (transform) en gewone JavaScript, geen bibliotheken. */
(function () {
  "use strict";

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* opts: { etages, pins: [{fi, x, y, cls, dot, label, aria, onPick}], reduced, sfx, onFocus } */
  window.Map3D = function (opts) {
    var E = opts.el, reduced = !!opts.reduced;
    var et = opts.etages, PW = 1400, PH = 682;
    var cam = { yaw: -24, tilt: 56, zoom: 1, x: 0, y: 0 }, home = { yaw: -24, tilt: 56, zoom: 1, x: 0, y: 0 };
    var focus = null, gapF = 0.2;

    var view = E("div", { class: "m3", tabindex: "0", role: "application",
      "aria-label": "3D-plattegrond van de school. Sleep om te draaien, knijp om te zoomen. Pijltjestoetsen draaien, plus en min zoomen." });
    var world = E("div", { class: "m3-world" });
    var shadow = E("div", { class: "m3-shadow", "aria-hidden": "true" });
    world.appendChild(shadow);
    view.appendChild(world);

    var floors = et.map(function (e, fi) {
      var f = E("div", { class: "m3-floor", "data-fi": fi });
      f.appendChild(E("div", { class: "m3-slab", "aria-hidden": "true" }));
      f.appendChild(E("img", { class: "m3-tex", src: e.plan, alt: "", draggable: "false" }));
      (e.muur || []).forEach(function (poly) {
        for (var k = 0; k < poly.length; k++) {
          var a = poly[k], b = poly[(k + 1) % poly.length];
          f.appendChild(E("i", { class: "m3-wall", "aria-hidden": "true", "data-seg": [a[0], a[1], b[0], b[1]].join(",") }));
        }
      });
      f.appendChild(E("span", { class: "m3-tag", "aria-hidden": "true", text: e.naam }));
      world.appendChild(f);
      return f;
    });

    var pins = (opts.pins || []).map(function (p) {
      var b = E("button", { type: "button", class: "pin m3-pin " + p.cls, "aria-label": p.aria, style: { left: p.x + "%", top: p.y + "%" } },
        E("span", { class: "m3-bb" }, E("span", { class: "pin-label", text: p.label }), E("span", { class: "pin-dot", text: p.dot })));
      b.addEventListener("click", function (ev) { ev.stopPropagation(); if (moved) return; p.onPick(); });
      floors[p.fi].appendChild(b);
      return { el: b, fi: p.fi };
    });

    var ctr = E("div", { class: "m3-ctl" },
      ctl("−", "Uitzoomen", function () { zoomBy(1 / 1.25); }),
      ctl("+", "Inzoomen", function () { zoomBy(1.25); }),
      ctl("↺", "Draai linksom", function () { turn(-45); }),
      ctl("↻", "Draai rechtsom", function () { turn(45); }),
      ctl("⌂", "Terug naar het begin", function () { reset(); }));
    var hint = E("p", { class: "m3-hint", "aria-hidden": "true", text: "Sleep om te draaien · knijp om te zoomen" });
    var wrap = E("div", { class: "m3-wrap" }, view, ctr, hint);

    function ctl(t, label, fn) {
      var b = E("button", { type: "button", class: "m3-btn", "aria-label": label, text: t });
      b.addEventListener("click", function () { if (opts.sfx) opts.sfx("tap"); fn(); });
      return b;
    }

    /* maten: de wereld is zo breed als het beeld, de etages liggen op afstand gap */
    var W = 0, H = 0, gap = 0;
    function layout() {
      var vw = view.clientWidth || 360;
      W = vw * (vw < 520 ? 1.12 : 0.92); H = W * PH / PW; gap = W * gapF;
      world.style.width = W + "px"; world.style.height = H + "px";
      world.style.marginLeft = -W / 2 + "px"; world.style.marginTop = -H / 2 + "px";
      var wallH = gap * 0.6;
      floors.forEach(function (f) {
        Array.prototype.forEach.call(f.querySelectorAll(".m3-wall"), function (w) {
          var s = w.getAttribute("data-seg").split(",").map(Number);
          var x1 = s[0] / 100 * W, y1 = s[1] / 100 * H, x2 = s[2] / 100 * W, y2 = s[3] / 100 * H;
          var len = Math.hypot(x2 - x1, y2 - y1), ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
          w.style.width = (len + 0.6) + "px"; w.style.height = wallH + "px";
          w.style.transform = "translate3d(" + x1 + "px," + y1 + "px,0) rotateZ(" + ang + "deg) rotateX(90deg)";
        });
      });
      place();
    }

    function floorZ(fi) {
      var z = fi * gap;
      if (focus != null && fi > focus) z += gap * 1.6;
      return z;
    }
    function place() {
      floors.forEach(function (f, fi) {
        f.style.transform = "translateZ(" + floorZ(fi) + "px)";
        var vis = focus == null || fi === focus ? 1 : fi < focus ? 0.28 : 0.08;
        f.style.opacity = vis;
        f.classList.toggle("dim", focus != null && fi !== focus);
      });
      pins.forEach(function (p) { p.el.tabIndex = focus == null || p.fi === focus ? 0 : -1; });
      render();
    }

    var raf = 0;
    function render() {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        var mid = focus != null ? floorZ(focus) : gap;
        world.style.transform = "translate3d(" + cam.x + "px," + cam.y + "px,0) scale(" + cam.zoom + ") rotateX(" + cam.tilt + "deg) rotateZ(" + cam.yaw + "deg) translateZ(" + (-mid) + "px)";
        world.style.setProperty("--yaw", (-cam.yaw) + "deg");
        world.style.setProperty("--tilt", (-cam.tilt) + "deg");
      });
    }
    function animate(on) { view.classList.toggle("anim", !!on && !reduced); }

    function zoomBy(f) { animate(true); cam.zoom = clamp(cam.zoom * f, 0.55, 3.2); render(); }
    function turn(d) { animate(true); cam.yaw += d; render(); }
    function reset() { animate(true); focus = null; cam.yaw = home.yaw; cam.tilt = home.tilt; cam.zoom = home.zoom; cam.x = 0; cam.y = 0; place(); if (opts.onFocus) opts.onFocus(null); }

    /* ---------- aanraken en muis ---------- */
    var pts = {}, moved = false, start = null, vel = { yaw: 0, tilt: 0 }, last = 0, inert = 0;
    function count() { return Object.keys(pts).length; }
    function two() { var k = Object.keys(pts); return [pts[k[0]], pts[k[1]]]; }
    function snap() {
      var p = two();
      return { d: Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y), a: Math.atan2(p[1].y - p[0].y, p[1].x - p[0].x) * 180 / Math.PI,
        mx: (p[0].x + p[1].x) / 2, my: (p[0].y + p[1].y) / 2, zoom: cam.zoom, yaw: cam.yaw, x: cam.x, y: cam.y };
    }
    view.addEventListener("pointerdown", function (e) {
      if (e.button > 0 && e.pointerType === "mouse" && e.button !== 2) return;
      cancelAnimationFrame(inert); animate(false);
      pts[e.pointerId] = { x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, pan: e.shiftKey || e.button === 2 };
      if (count() === 1) { moved = false; vel.yaw = vel.tilt = 0; last = performance.now(); }
      if (count() === 2) { start = snap(); moved = true; }
    });
    view.addEventListener("pointermove", function (e) {
      var p = pts[e.pointerId]; if (!p) return;
      var dx = e.clientX - p.x, dy = e.clientY - p.y;
      p.x = e.clientX; p.y = e.clientY;
      if (!moved && Math.hypot(p.x - p.sx, p.y - p.sy) > 7) { moved = true; try { view.setPointerCapture(e.pointerId); } catch (er) {} }
      if (!moved) return;
      e.preventDefault();
      if (count() === 1) {
        var now = performance.now(), dt = Math.max(8, now - last); last = now;
        if (p.pan) { cam.x += dx; cam.y += dy; }
        else {
          cam.yaw += dx * 0.35; cam.tilt = clamp(cam.tilt - dy * 0.3, 0, 78);
          vel.yaw = dx * 0.35 / dt * 16; vel.tilt = -dy * 0.3 / dt * 16;
        }
      } else if (count() === 2 && start) {
        var s = snap();
        cam.zoom = clamp(start.zoom * s.d / start.d, 0.55, 3.2);
        cam.yaw = start.yaw + (s.a - start.a);
        cam.x = start.x + (s.mx - start.mx); cam.y = start.y + (s.my - start.my);
      }
      render();
    });
    function up(e) {
      if (!pts[e.pointerId]) return;
      delete pts[e.pointerId];
      if (count() < 2) start = null;
      if (count() === 1) { var k = Object.keys(pts)[0]; pts[k].sx = pts[k].x; pts[k].sy = pts[k].y; }
      if (count() === 0 && moved && !reduced && (Math.abs(vel.yaw) > 0.3 || Math.abs(vel.tilt) > 0.3)) glide();
      if (count() === 0) setTimeout(function () { moved = false; }, 0);
    }
    view.addEventListener("pointerup", up);
    view.addEventListener("pointercancel", up);
    view.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    function glide() {
      vel.yaw *= 0.93; vel.tilt *= 0.9;
      cam.yaw += vel.yaw; cam.tilt = clamp(cam.tilt + vel.tilt, 0, 78);
      render();
      if (Math.abs(vel.yaw) > 0.05 || Math.abs(vel.tilt) > 0.05) inert = requestAnimationFrame(glide);
    }
    view.addEventListener("wheel", function (e) {
      e.preventDefault(); animate(false);
      cam.zoom = clamp(cam.zoom * Math.exp(-e.deltaY * 0.0015), 0.55, 3.2); render();
    }, { passive: false });
    /* Safari op de Mac: knijpen op het trackpad */
    var gz = 1;
    view.addEventListener("gesturestart", function (e) { e.preventDefault(); gz = cam.zoom; });
    view.addEventListener("gesturechange", function (e) { e.preventDefault(); cam.zoom = clamp(gz * e.scale, 0.55, 3.2); render(); });
    view.addEventListener("keydown", function (e) {
      var k = e.key, used = true;
      animate(true);
      if (k === "ArrowLeft") cam.yaw -= 15; else if (k === "ArrowRight") cam.yaw += 15;
      else if (k === "ArrowUp") cam.tilt = clamp(cam.tilt - 8, 0, 78); else if (k === "ArrowDown") cam.tilt = clamp(cam.tilt + 8, 0, 78);
      else if (k === "+" || k === "=") cam.zoom = clamp(cam.zoom * 1.2, 0.55, 3.2); else if (k === "-") cam.zoom = clamp(cam.zoom / 1.2, 0.55, 3.2);
      else used = false;
      if (used) { e.preventDefault(); render(); }
    });

    var ro = window.ResizeObserver ? new ResizeObserver(function () { layout(); }) : null;
    if (ro) ro.observe(view); else window.addEventListener("resize", layout);
    requestAnimationFrame(layout);

    return {
      el: wrap,
      focus: function (fi) {
        animate(true); focus = fi;
        if (fi == null) { cam.tilt = home.tilt; cam.zoom = home.zoom; }
        else { cam.tilt = Math.min(cam.tilt, 42); cam.zoom = Math.max(cam.zoom, 1.15); }
        cam.x = 0; cam.y = 0; place();
      },
      destroy: function () { cancelAnimationFrame(inert); cancelAnimationFrame(raf); if (ro) ro.disconnect(); else window.removeEventListener("resize", layout); }
    };
  };
})();
