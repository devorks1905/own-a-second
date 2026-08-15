/* OWN A SECOND — "liquid glass + spatial" FX engine
   Vanilla, performant (transform/opacity only), respects reduced-motion. */
(function () {
  'use strict';
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- 1. particle field — "moments in time" ---------- */
  (function particles() {
    var canvas = document.getElementById('fxCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H, pts = [];
    var N = window.innerWidth < 640 ? 45 : 90;

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    function make() {
      return {
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.6 + .4,
        vx: (Math.random() - .5) * .12, vy: (Math.random() - .5) * .12,
        tw: Math.random() * Math.PI * 2, tws: .01 + Math.random() * .03,
        g: Math.random() > .7 // some green (live) tint
      };
    }
    for (var i = 0; i < N; i++) pts.push(make());

    function frame() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy; p.tw += p.tws;
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        var a = .25 + Math.abs(Math.sin(p.tw)) * .5;
        ctx.beginPath();
        ctx.fillStyle = p.g ? 'rgba(52,211,153,' + a * .6 + ')' : 'rgba(240,180,41,' + a + ')';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    if (!REDUCED) frame();
    else { // static dots for reduced motion
      for (var i = 0; i < pts.length; i++) { var p = pts[i]; ctx.beginPath(); ctx.fillStyle = 'rgba(240,180,41,.35)'; ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
    }
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
})();
