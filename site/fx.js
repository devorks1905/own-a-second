/* OWN A SECOND — "liquid glass + spatial" FX engine
   Vanilla, performant (transform/opacity only), respects reduced-motion. */
(function () {
  'use strict';
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- 1. particle field — "moments in time" (constellation) ---------- */
  (function particles() {
    var canvas = document.getElementById('fxCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H, pts = [];
    var N = window.innerWidth < 640 ? 70 : 150;

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    function make() {
      return {
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.8 + .5,
        vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
        tw: Math.random() * Math.PI * 2, tws: .015 + Math.random() * .05,
        g: Math.random() > .7
      };
    }
    for (var i = 0; i < N; i++) pts.push(make());

    function frame() {
      ctx.clearRect(0, 0, W, H);
      var LINK = 110;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy; p.tw += p.tws;
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        // constellation lines
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j];
          var dx = p.x - q.x, dy = p.y - q.y;
          var d = dx * dx + dy * dy;
          if (d < LINK * LINK) {
            var a = (1 - Math.sqrt(d) / LINK) * .14;
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(240,180,41,' + a + ')';
            ctx.lineWidth = .5;
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        var al = .3 + Math.abs(Math.sin(p.tw)) * .6;
        ctx.beginPath();
        ctx.fillStyle = p.g ? 'rgba(52,211,153,' + al * .7 + ')' : 'rgba(240,180,41,' + al + ')';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    if (!REDUCED) frame();
    else { for (var i = 0; i < pts.length; i++) { var p = pts[i]; ctx.beginPath(); ctx.fillStyle = 'rgba(240,180,41,.35)'; ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); } }
  })();

  /* ---------- 2. scroll reveal ---------- */
  (function reveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || REDUCED) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- 3. cursor glow (desktop) ---------- */
  (function glow() {
    if (!FINE) return;
    var el = document.getElementById('cursorGlow');
    if (!el) return;
    var tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty;
    window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; el.style.opacity = '1'; });
    window.addEventListener('mouseleave', function () { el.style.opacity = '0'; });
    (function loop() {
      x += (tx - x) * .12; y += (ty - y) * .12;
      el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      requestAnimationFrame(loop);
    })();
  })();

  /* ---------- 4. magnetic tilt (desktop) ---------- */
  (function tilt() {
    if (!FINE || REDUCED) return;
    document.querySelectorAll('.tiltable').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5;
        var py = (e.clientY - r.top) / r.height - .5;
        el.style.transform = 'perspective(800px) rotateX(' + (-py * 6) + 'deg) rotateY(' + (px * 6) + 'deg) translateY(-2px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  })();
  /* ---------- 5. clock pulse rings (radiate every second) ---------- */
  (function rings() {
    var card = document.querySelector('.clock-card');
    if (!card || REDUCED) return;
    var lastSec = -1;
    setInterval(function () {
      var sec = Math.floor(Date.now() / 1000);
      if (sec === lastSec) return;
      lastSec = sec;
      var ring = document.createElement('span');
      ring.className = 'ring';
      card.appendChild(ring);
      setTimeout(function () { if (ring.parentNode) ring.parentNode.removeChild(ring); }, 1500);
    }, 200);
  })();

  /* ---------- 6. intro curtain removal ---------- */
  (function curtain() {
    var c = document.getElementById('introCurtain');
    if (!c) return;
    var mark = document.createElement('span');
    mark.className = 'c-mark';
    mark.textContent = 'OWN A SECOND';
    c.appendChild(mark);
    window.addEventListener('load', function () {
      setTimeout(function () { c.classList.add('hide'); }, 600);
    });
    // fallback if load already fired
    if (document.readyState === 'complete') setTimeout(function () { c.classList.add('hide'); }, 600);
  })();
})();
