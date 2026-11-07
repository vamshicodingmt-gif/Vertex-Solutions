(() => {
  const year = new Date().getFullYear();
  document.querySelectorAll('[data-current-year]').forEach((node) => { node.textContent = String(year); });

  document.querySelectorAll('[data-copy-enquiry]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const message = [
        'Vertex Solutions enquiry',
        `Name: ${data.get('name') || ''}`,
        `Email: ${data.get('email') || ''}`,
        `Company / project: ${data.get('company') || 'Not provided'}`,
        '',
        'Requirement:',
        data.get('message') || ''
      ].join('\n');
      const status = form.querySelector('[data-form-status], .form-status');
      const fallback = form.querySelector('[data-copy-fallback]');
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(message);
        if (status) status.textContent = 'Enquiry copied. Paste it into your preferred email or messaging app to send.';
        if (fallback) fallback.hidden = true;
      } catch (_) {
        if (fallback) {
          fallback.value = message;
          fallback.hidden = false;
          fallback.style.display = 'block';
          fallback.focus();
          fallback.select();
        }
        if (status) status.textContent = 'Copy is unavailable here. The enquiry text is shown below for you to select and copy.';
      }
    });
  });
})();
