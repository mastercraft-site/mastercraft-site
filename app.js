function applySiteConfig() {
  var cfg = window.SITE_CONFIG;
  if (!cfg) return;

  document.querySelectorAll('[data-cfg]').forEach(function (el) {
    el.getAttribute('data-cfg').split(';').forEach(function (rule) {
      var pair = rule.split(':');
      var target = pair[0] && pair[0].trim();
      var path = pair[1] && pair[1].trim();
      if (!target || !path) return;
      var value = path.split('.').reduce(function (obj, key) {
        return obj && obj[key] !== undefined ? obj[key] : undefined;
      }, cfg);
      if (value === undefined) return;
      if (target === 'text') el.textContent = value;
      else el.setAttribute(target, value);
    });
  });

  var schemaEl = document.getElementById('business-schema');
  if (schemaEl) {
    schemaEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      "@id": cfg.business.website + "/#business",
      "name": cfg.business.name,
      "image": cfg.business.website + "/" + cfg.images.logo,
      "url": cfg.business.website,
      "telephone": cfg.business.phoneE164,
      "email": cfg.business.email,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": cfg.address.street,
        "addressLocality": cfg.address.city,
        "addressRegion": cfg.address.region,
        "postalCode": cfg.address.zip,
        "addressCountry": cfg.address.country
      },
      "areaServed": ["Long Island City", "Astoria", "Sunnyside", "Queens", "Western Long Island"],
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": cfg.hours.schemaDays,
        "opens": cfg.hours.schemaOpens,
        "closes": cfg.hours.schemaCloses
      }]
    }, null, 2);
  }

  var mapEl = document.getElementById('map-fallback');
  if (mapEl && cfg.images.mapBackground) {
    mapEl.style.setProperty('--map-bg-image', 'url(' + cfg.images.mapBackground + ')');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Site config hydration (driven by config.js) ---------- */
  applySiteConfig();

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll shadow ---------- */
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Estimate form: validation + submit notification ---------- */
  var form = document.getElementById('estimateForm');
  var formNote = document.getElementById('formNote');
  var submitBtn = document.getElementById('submitBtn');

  function setNote(message, type) {
    if (!formNote) return;
    formNote.textContent = message;
    formNote.className = 'form-note' + (type ? ' ' + type : '');
  }

  function validateField(field) {
    var group = field.closest('.form-group');
    var valid = field.checkValidity();
    if (group) group.classList.toggle('invalid', !valid);
    return valid;
  }

  if (form) {
    var requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
    });

    form.addEventListener('submit', function (e) {
      var allValid = true;
      requiredFields.forEach(function (field) {
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) {
        e.preventDefault();
        setNote('Please fill in all required fields before submitting.', 'error');
        return;
      }

      setNote('Sending your request...', '');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      /* Form proceeds to FormSubmit.co via normal POST for file upload support */
    });
  }
});
