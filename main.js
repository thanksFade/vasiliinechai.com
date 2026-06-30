// Minimal scroll reveal — fade + lift as elements enter the viewport.
(function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  var els = document.querySelectorAll(".reveal");
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // small per-element stagger for siblings revealed together
          var delay = entry.target.dataset.delay || 0;
          setTimeout(function () { entry.target.classList.add("in"); }, delay);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  els.forEach(function (el, i) { io.observe(el); });
})();
