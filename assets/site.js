(function () {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open', !open);
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
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
