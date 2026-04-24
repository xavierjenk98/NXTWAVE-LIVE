/* =========================================
   NXTWAVE LIVE — Minimal Interaction Script
   ========================================= */
(function () {
  'use strict';

  /* ---- NAV: scroll class ---- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- NAV: mobile hamburger ---- */
  var hamburger = document.querySelector('.nav__hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      if (isOpen) {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('hidden', '');
      } else {
        mobileNav.removeAttribute('hidden');
        mobileNav.classList.add('open');
      }
    });

    /* Close mobile nav on link click */
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('hidden', '');
      });
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (
        mobileNav.classList.contains('open') &&
        !mobileNav.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('hidden', '');
      }
    });
  }

  /* ---- EMAIL FORM: basic validation ---- */
  var form = document.querySelector('.community__form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = form.querySelector('input[type="email"]');
      var submitBtn = form.querySelector('.community__submit');
      var email = emailInput ? emailInput.value.trim() : '';

      /* Basic email pattern check */
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        emailInput.setAttribute('aria-invalid', 'true');
        emailInput.focus();
        return;
      }

      emailInput.removeAttribute('aria-invalid');

      /* Optimistic UI feedback */
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'You\'re In!';
      submitBtn.disabled = true;
      emailInput.disabled = true;
      emailInput.value = '';
      emailInput.placeholder = 'Welcome to the wave ✓';

      /* Reset after 4 seconds */
      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        emailInput.disabled = false;
        emailInput.placeholder = 'Your email address';
      }, 4000);
    });
  }

  /* ---- SMOOTH SCROLL polyfill for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 68; /* nav height */
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
