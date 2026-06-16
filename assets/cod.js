/* Aryze · Sales & Marketing — quiet motion layer.
   Fade-up on scroll, staggered grids, count-up on scorecard integers.
   Honours prefers-reduced-motion; degrades to static without JS. */
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.remove("js");
    return;
  }
  var groups = ".cards-2 > *, .cards-3 > *, .kpi-grid > *, .stages > *, .grid-3 > *, .matrix > .row";
  var singles = ".section, .doc-body > h2, .doc-body > p, .doc-body > ul, .doc-body > ol, .doc-body > table, .doc-body > figure, .exec";
  var els = [].slice.call(document.querySelectorAll(groups + ", " + singles));
  els.forEach(function (e) {
    e.classList.add("reveal");
    if (e.matches(groups)) {
      var k = Array.prototype.indexOf.call(e.parentNode.children, e);
      e.style.transitionDelay = Math.min(k, 8) * 55 + "ms";
    }
  });
  function countUp(el) {
    var txt = (el.textContent || "").trim();
    if (!/^\d{1,4}$/.test(txt) || el.dataset.counted) return;
    el.dataset.counted = "1";
    var target = parseInt(txt, 10), start = null, dur = 700;
    function tick(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick); else el.textContent = txt;
    }
    requestAnimationFrame(tick);
  }
  function arrive(e) {
    e.classList.add("in-view");
    if (e.matches(".kpi-grid > *")) { var v = e.querySelector(".value"); if (v) countUp(v); }
    if (e.matches(".stages > *")) { var b = e.querySelector("b"); if (b) countUp(b); }
  }
  if (!("IntersectionObserver" in window)) { els.forEach(arrive); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { arrive(en.target); io.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  els.forEach(function (e) { io.observe(e); });
})();
