// Destination page interactions

(function () {
  'use strict';

  // Current year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Smooth scrolling for same-page anchors
  function smoothScrollTo(targetId) {
    var target = document.querySelector(targetId);
    if (!target) return;
    var y = target.getBoundingClientRect().top + window.pageYOffset - 64; // header offset
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  });

  // Custom image arrow cursor (shows on move, hides when idle)
  var cursor = document.querySelector('.cursor-image');
  var cursorTimer = null;
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('custom-cursor');
    document.addEventListener('mousemove', function (e) {
      document.body.classList.add('cursor-active');
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      clearTimeout(cursorTimer);
      cursorTimer = setTimeout(function () {
        document.body.classList.remove('cursor-active');
      }, 900);
    }, { passive: true });

    // Slight pulse when hovering interactive elements
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a, button, .btn')) {
        cursor.style.transform = 'translate(-4px, -4px) scale(1.1)';
      } else {
        cursor.style.transform = 'translate(-4px, -4px) scale(1)';
      }
    }, { passive: true });
  }

  // Intersection-based reveal animations
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.card, .hotel').forEach(function (el) {
    el.style.willChange = 'transform';
    el.style.transform = 'translateY(10px)';
    el.style.opacity = '0';
    observer.observe(el);
  });

  var style = document.createElement('style');
  style.textContent = '.in-view{opacity:1 !important; transform:translateY(0) !important; transition: opacity .5s ease, transform .5s ease;}';
  document.head.appendChild(style);
})();


