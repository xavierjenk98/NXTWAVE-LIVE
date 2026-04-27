/* ============================================================
   NXTWAVE — app.js
   Tabs, form validation, success states, nav interactions
============================================================ */

(function () {
  'use strict';

  /* ── Utility ── */
  function $(selector, ctx) {
    return (ctx || document).querySelector(selector);
  }
  function $$(selector, ctx) {
    return Array.from((ctx || document).querySelectorAll(selector));
  }

  /* ============================================================
     MOBILE NAV TOGGLE
  ============================================================ */
  var hamburger = $('.nav-hamburger');
  var mobileMenu = $('.nav-mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileMenu.hidden = isOpen;
    });

    // Close menu when a link is clicked
    $$('a', mobileMenu).forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
      });
    });
  }

  /* ============================================================
     TALENT SECTION TABS
  ============================================================ */
  function initTabs(tabsSelector, panelsSelector) {
    var tabs = $$(tabsSelector);
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var panelId = tab.getAttribute('aria-controls');
        var panel = $('#' + panelId);
        if (!panel) return;

        // Deactivate all
        tabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        $$(panelsSelector).forEach(function (p) {
          p.classList.remove('active');
          p.hidden = true;
        });

        // Activate selected
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        panel.classList.add('active');
        panel.hidden = false;
      });

      // Keyboard: arrow keys between tabs
      tab.addEventListener('keydown', function (e) {
        var idx = tabs.indexOf(tab);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          tabs[(idx + 1) % tabs.length].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          tabs[(idx - 1 + tabs.length) % tabs.length].focus();
        }
      });
    });
  }

  initTabs('[role="tab"][aria-controls^="talent-"]', '.talent-panel');

  /* ============================================================
     APPLY SECTION TABS
  ============================================================ */
  initTabs('[role="tab"][aria-controls^="panel-"]', '.apply-panel');

  /* ============================================================
     FORM VALIDATION
  ============================================================ */

  /**
   * Validate a single field. Returns true if valid.
   */
  function validateField(field) {
    var errorEl = field.parentElement.querySelector('.field-error');

    // Clear previous
    field.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';

    // Required check
    if (field.hasAttribute('required') && !field.value.trim()) {
      field.classList.add('invalid');
      if (errorEl) errorEl.textContent = 'This field is required.';
      return false;
    }

    // Email
    if (field.type === 'email' && field.value.trim()) {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(field.value.trim())) {
        field.classList.add('invalid');
        if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
        return false;
      }
    }

    // URL
    if (field.type === 'url' && field.value.trim()) {
      try {
        var url = new URL(field.value.trim());
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          throw new Error('bad protocol');
        }
      } catch (_) {
        field.classList.add('invalid');
        if (errorEl) errorEl.textContent = 'Please enter a valid URL (starting with https://).';
        return false;
      }
    }

    return true;
  }

  /**
   * Validate all required + type-checked fields in a form.
   * Returns true if all valid.
   */
  function validateForm(form) {
    var fields = $$('input, select, textarea', form);
    var allValid = true;
    var firstInvalid = null;

    fields.forEach(function (field) {
      var valid = validateField(field);
      if (!valid) {
        allValid = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return allValid;
  }

  /**
   * Attach live validation (on blur) to each field in a form.
   */
  function attachLiveValidation(form) {
    $$('input, select, textarea', form).forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });
      // Also clear error on input
      field.addEventListener('input', function () {
        if (field.classList.contains('invalid')) {
          validateField(field);
        }
      });
    });
  }

  /* ============================================================
     APPLY FORMS — SUBMIT HANDLERS
  ============================================================ */
  function initApplyForm(formId, successId) {
    var form = $('#' + formId);
    var successEl = $('#' + successId);
    if (!form || !successEl) return;

    attachLiveValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm(form)) return;

      // Show success (front-end only)
      form.hidden = true;
      successEl.hidden = false;
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  initApplyForm('form-music', 'success-music');
  initApplyForm('form-comedy', 'success-comedy');

  // Reset buttons
  $$('.apply-success__reset').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var formId = btn.getAttribute('data-form');
      var successId = btn.getAttribute('data-success');
      var form = $('#' + formId);
      var successEl = $('#' + successId);
      if (!form || !successEl) return;

      form.reset();
      // Clear all field errors
      $$('.field-error', form).forEach(function (el) { el.textContent = ''; });
      $$('.invalid', form).forEach(function (el) { el.classList.remove('invalid'); });

      successEl.hidden = true;
      form.hidden = false;
      form.querySelector('input, textarea').focus();
    });
  });

  /* ============================================================
     COMMUNITY FORM
  ============================================================ */
  var communityForm = $('#community-form');
  var communitySuccess = $('#community-success');

  if (communityForm && communitySuccess) {
    communityForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = communityForm.querySelector('input[type="email"]');
      if (!emailInput || !emailInput.value.trim()) {
        emailInput && emailInput.focus();
        return;
      }
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailInput.focus();
        return;
      }
      communityForm.hidden = true;
      communitySuccess.hidden = false;
    });
  }

  /* ============================================================
     SMOOTH SCROLL — polyfill for older Safari
  ============================================================ */
  $$('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;
      var target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ============================================================
     SHOW CARD LINEUP TOGGLES
  ============================================================ */
  $$('.show-card__lineup-toggle').forEach(function (btn) {
    var card = btn.closest('.show-card');
    var lineup = card && card.querySelector('.show-card__lineup');
    if (!lineup) return;

    // Start collapsed on small screens for cleanliness
    if (window.innerWidth < 600) {
      lineup.style.display = 'none';
    }

    btn.addEventListener('click', function () {
      var isHidden = lineup.style.display === 'none';
      lineup.style.display = isHidden ? '' : 'none';
      btn.textContent = isHidden ? 'Hide Lineup ↑' : 'View Lineup ↓';
    });
  });

})();
