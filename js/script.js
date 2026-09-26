(function () {
  var root = document.documentElement;

  // Theme toggle
  var themeBtn = document.getElementById('themeToggle');
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  themeBtn.addEventListener('click', function () {
    var next = isDark() ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile menu
  var menu = document.getElementById('menu');
  var menuBtn = document.getElementById('menuToggle');
  menuBtn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Active nav link
  var links = menu.querySelectorAll('a');
  var sections = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute('href')); });
  function onScroll() {
    var y = window.scrollY + 120, current = -1;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) current = i; });
    links.forEach(function (a, i) { a.classList.toggle('active', i === current); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Certificates: placeholder if the image isn't added yet, lightbox on click
  var modal = document.getElementById('certificate-modal');
  var modalImg = document.getElementById('modal-certificate-image');
  document.querySelectorAll('[data-certificate]').forEach(function (btn) {
    var img = btn.querySelector('img');
    function markMissing() { btn.classList.add('missing'); if (img) img.style.display = 'none'; btn.disabled = true; }
    var probe = new Image();
    probe.onerror = markMissing;
    probe.src = btn.getAttribute('data-certificate');
    btn.addEventListener('click', function () {
      if (btn.classList.contains('missing') || !modal) return;
      modalImg.src = btn.getAttribute('data-certificate');
      modalImg.alt = img ? img.alt : 'Certificate';
      if (typeof modal.showModal === 'function') modal.showModal(); else modal.setAttribute('open', '');
    });
  });
  function closeModal() {
    if (!modal) return;
    if (typeof modal.close === 'function') modal.close(); else modal.removeAttribute('open');
  }
  if (modal) {
    modal.querySelector('.cert-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
