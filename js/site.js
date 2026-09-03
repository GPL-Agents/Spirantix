(function () {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      menu.classList.toggle('open', !open);
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        menu.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        menu.classList.remove('open');
        toggle.focus();
      }
    });
  }

  const inquiryInputs = document.querySelectorAll('input[name="inquiryType"]');
  const conditionalGroups = document.querySelectorAll('[data-inquiry-fields]');

  function updateInquiryFields() {
    const selected = document.querySelector('input[name="inquiryType"]:checked');
    const value = selected ? selected.value : '';

    conditionalGroups.forEach(function (group) {
      const show = group.getAttribute('data-inquiry-fields') === value;
      group.hidden = !show;
      group.querySelectorAll('input, select, textarea').forEach(function (field) {
        field.disabled = !show;
      });
    });
  }

  inquiryInputs.forEach(function (input) {
    input.addEventListener('change', updateInquiryFields);
  });
  if (inquiryInputs.length) updateInquiryFields();

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const params = new URLSearchParams(window.location.search);
    const requestedType = params.get('type');
    if (requestedType) {
      const requestedInput = contactForm.querySelector('input[name="inquiryType"][value="' + CSS.escape(requestedType) + '"]');
      if (requestedInput) {
        requestedInput.checked = true;
        updateInquiryFields();
      }
    }

    contactForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const status = contactForm.querySelector('[data-form-status]');
      const submit = contactForm.querySelector('button[type="submit"]');
      status.className = 'form-status';
      status.textContent = 'Sending your message...';
      submit.disabled = true;

      const payload = Object.fromEntries(new FormData(contactForm).entries());

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(function () { return {}; });

        if (!response.ok || !result.ok) {
          throw new Error(result.error || 'We could not send your message.');
        }

        contactForm.reset();
        updateInquiryFields();
        status.className = 'form-status success';
        status.textContent = 'Thank you. Your message has been sent.';
      } catch (error) {
        status.className = 'form-status error';
        status.textContent = error.message + ' You can also email hello@spirantix.ai.';
      } finally {
        submit.disabled = false;
      }
    });
  }
})();

(function () {
  var triggers = document.querySelectorAll('[data-lightbox]');
  if (!triggers.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Enlarged image');
  overlay.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Close enlarged image">\u00d7</button>' +
    '<div class="lightbox-content"><img alt=""><p class="lightbox-caption"></p></div>';
  document.body.appendChild(overlay);

  var lightboxImg = overlay.querySelector('img');
  var caption = overlay.querySelector('.lightbox-caption');
  var closeBtn = overlay.querySelector('.lightbox-close');
  var lastFocused = null;

  function openLightbox(trigger) {
    var fullSrc = trigger.getAttribute('data-full');
    var triggerImg = trigger.querySelector('img');
    var figure = trigger.closest('figure');
    var figcaption = figure ? figure.querySelector('figcaption') : null;

    lightboxImg.src = fullSrc || (triggerImg ? triggerImg.src : '');
    lightboxImg.alt = triggerImg ? triggerImg.alt : '';
    caption.textContent = figcaption ? figcaption.textContent : '';

    lastFocused = document.activeElement;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      openLightbox(trigger);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && overlay.classList.contains('open')) closeLightbox();
  });
})();
