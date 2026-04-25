/* =============================================================
   NXTWAVE — main.js
   Interactive features: sticky bars, accordions, tabs, forms
   ============================================================= */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Helpers
  ---------------------------------------------------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* ----------------------------------------------------------
     Mobile nav toggle
  ---------------------------------------------------------- */
  const mobileToggle = $('.nav-mobile-toggle');
  const mobileMenu   = $('.mobile-menu');
  const mobileClose  = $('.mobile-menu-close');

  if (mobileToggle && mobileMenu) {
    function openMobileMenu() {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      mobileClose && mobileClose.focus();
    }
    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      mobileToggle.focus();
    }

    mobileToggle.addEventListener('click', openMobileMenu);
    mobileClose && mobileClose.addEventListener('click', closeMobileMenu);

    // Close on link click
    $$('a', mobileMenu).forEach(function (a) {
      a.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ----------------------------------------------------------
     Quick Action Bar — sticky after scroll
  ---------------------------------------------------------- */
  var qab = $('#quick-action-bar');
  var qabOffset = 0;

  function calcQabOffset() {
    if (qab) {
      // Use getBoundingClientRect after page paint to get real offset
      qabOffset = qab.getBoundingClientRect().top + window.scrollY;
    }
  }

  /* ----------------------------------------------------------
     Sticky CTA Bars
  ---------------------------------------------------------- */
  var stickyCTABar    = $('#sticky-cta-bar');
  var stickyMobileCTA = $('#sticky-mobile-cta');
  var heroSection     = $('.hero');
  var ctaDismissed    = false;

  function onScroll() {
    if (!heroSection) return;
    var heroBottom = heroSection.getBoundingClientRect().bottom;
    var pastHero   = heroBottom < 0;

    // Desktop sticky bar
    if (stickyCTABar && !ctaDismissed) {
      if (pastHero) {
        stickyCTABar.classList.add('visible');
      } else {
        stickyCTABar.classList.remove('visible');
      }
    }

    // Mobile sticky bar
    if (stickyMobileCTA) {
      if (pastHero) {
        stickyMobileCTA.classList.add('visible');
        document.body.classList.add('sticky-mobile-visible');
      } else {
        stickyMobileCTA.classList.remove('visible');
        document.body.classList.remove('sticky-mobile-visible');
      }
    }

    // Quick action bar scrolled class
    if (qab) {
      if (window.scrollY > qabOffset) {
        qab.classList.add('scrolled');
      } else {
        qab.classList.remove('scrolled');
      }
    }
  }

  // Dismiss button for desktop sticky bar
  var dismissBtn = $('.sticky-cta-dismiss');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', function () {
      ctaDismissed = true;
      stickyCTABar && stickyCTABar.classList.remove('visible');
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', calcQabOffset, { passive: true });

  /* ----------------------------------------------------------
     Show card: spotlight mouse-tracking effect
  ---------------------------------------------------------- */
  $$('.show-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var mx   = ((e.clientX - rect.left) / rect.width) * 100;
      var my   = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', mx + '%');
      card.style.setProperty('--my', my + '%');
    });
  });

  /* ----------------------------------------------------------
     Show card: "View lineup" accordion toggle
  ---------------------------------------------------------- */
  $$('.btn-lineup-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('aria-controls');
      var drawer   = document.getElementById(targetId);
      if (!drawer) return;

      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));

      if (isOpen) {
        drawer.hidden = true;
      } else {
        drawer.hidden = false;
        // Smooth scroll-into-view so drawer is visible
        drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  /* ----------------------------------------------------------
     Talent tabs (Music / Comedy)
  ---------------------------------------------------------- */
  function initTabs(tabsSelector, panelPrefix) {
    var tabs   = $$(tabsSelector);
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab, tabs);
      });

      // Arrow key navigation
      tab.addEventListener('keydown', function (e) {
        var idx     = tabs.indexOf(tab);
        var newIdx  = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          newIdx = (idx + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          newIdx = (idx - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          newIdx = 0;
        } else if (e.key === 'End') {
          newIdx = tabs.length - 1;
        }
        if (newIdx >= 0) {
          e.preventDefault();
          activateTab(tabs[newIdx], tabs);
          tabs[newIdx].focus();
        }
      });
    });

    function activateTab(activeTab, allTabs) {
      allTabs.forEach(function (t) {
        var panelId = t.getAttribute('aria-controls');
        var panel   = document.getElementById(panelId);
        var isActive = (t === activeTab);
        t.setAttribute('aria-selected', String(isActive));
        t.setAttribute('tabindex',      isActive ? '0' : '-1');
        t.classList.toggle('active', isActive);
        if (panel) {
          panel.hidden = !isActive;
        }
      });
    }
  }

  initTabs('[role="tablist"] .talent-tab');
  initTabs('[role="tablist"] .apply-tab');

  /* ----------------------------------------------------------
     FAQ accordion
  ---------------------------------------------------------- */
  $$('.faq-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var answerId = trigger.getAttribute('aria-controls');
      var answer   = document.getElementById(answerId);
      if (!answer) return;

      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all others (single-open style)
      $$('.faq-trigger').forEach(function (t) {
        if (t !== trigger) {
          t.setAttribute('aria-expanded', 'false');
          var aId  = t.getAttribute('aria-controls');
          var aEl  = document.getElementById(aId);
          if (aEl) aEl.hidden = true;
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      answer.hidden = isOpen;
    });
  });

  /* ----------------------------------------------------------
     Form validation helper
  ---------------------------------------------------------- */
  function validateField(input) {
    var errorEl = input.parentElement.querySelector('.field-error');
    var valid   = true;
    var msg     = '';

    if (input.required && !input.value.trim()) {
      valid = false;
      msg   = 'This field is required.';
    } else if (input.type === 'email' && input.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        valid = false;
        msg   = 'Please enter a valid email address.';
      }
    } else if (input.type === 'url' && input.value.trim() && input.required) {
      try {
        new URL(input.value.trim());
      } catch (_) {
        valid = false;
        msg   = 'Please enter a valid URL (e.g. https://...).';
      }
    }

    if (errorEl) errorEl.textContent = msg;
    input.classList.toggle('invalid', !valid);
    return valid;
  }

  function validateForm(form) {
    var inputs = $$('input[required], textarea[required]', form);
    var allValid = true;
    inputs.forEach(function (input) {
      if (!validateField(input)) allValid = false;
    });
    // Focus first invalid
    if (!allValid) {
      var firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
    }
    return allValid;
  }

  // Live validation on blur
  $$('.apply-form input, .apply-form textarea').forEach(function (input) {
    input.addEventListener('blur', function () {
      if (input.required) validateField(input);
    });
    // Clear error on input
    input.addEventListener('input', function () {
      if (input.classList.contains('invalid')) validateField(input);
    });
  });

  /* ----------------------------------------------------------
     Music application form
  ---------------------------------------------------------- */
  var musicForm = $('#form-music');
  if (musicForm) {
    musicForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(musicForm)) return;
      var successEl = $('#form-music-success');
      if (successEl) {
        successEl.hidden = false;
        musicForm.querySelector('button[type="submit"]').disabled = true;
        successEl.focus();
        musicForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* ----------------------------------------------------------
     Comedy application form
  ---------------------------------------------------------- */
  var comedyForm = $('#form-comedy');
  if (comedyForm) {
    comedyForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(comedyForm)) return;
      var successEl = $('#form-comedy-success');
      if (successEl) {
        successEl.hidden = false;
        comedyForm.querySelector('button[type="submit"]').disabled = true;
        successEl.focus();
        comedyForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* ----------------------------------------------------------
     Community / email form
  ---------------------------------------------------------- */
  var emailForm = $('#email-form');
  if (emailForm) {
    emailForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = emailForm.querySelector('input[type="email"]');
      var errorEl    = $('#community-email-error');
      var successEl  = $('#email-success');
      var valid      = true;

      if (!emailInput.value.trim()) {
        if (errorEl) errorEl.textContent = 'Please enter your email address.';
        emailInput.classList.add('invalid');
        emailInput.focus();
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('invalid');
        emailInput.focus();
        valid = false;
      } else {
        if (errorEl) errorEl.textContent = '';
        emailInput.classList.remove('invalid');
      }

      if (valid && successEl) {
        successEl.hidden = false;
        emailForm.querySelector('button[type="submit"]').disabled = true;
        emailInput.disabled = true;
        successEl.focus();
      }
    });

    var communityEmailInput = emailForm.querySelector('input[type="email"]');
    if (communityEmailInput) {
      communityEmailInput.addEventListener('input', function () {
        var errorEl = $('#community-email-error');
        if (communityEmailInput.classList.contains('invalid')) {
          communityEmailInput.classList.remove('invalid');
          if (errorEl) errorEl.textContent = '';
        }
      });
    }
  }

  /* ----------------------------------------------------------
     Smooth anchor scroll with offset compensation
     (so fixed nav + qab don't cover the target)
  ---------------------------------------------------------- */
  $$('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var navHeight = 64; // var(--nav-height)
      var qabHeight = 52; // var(--qab-height)
      var offset    = navHeight + qabHeight + 8;

      var targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    });
  });

  /* ----------------------------------------------------------
     Init on DOMContentLoaded
  ---------------------------------------------------------- */
  function init() {
    calcQabOffset();
    onScroll(); // run once on load in case page is already scrolled
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
