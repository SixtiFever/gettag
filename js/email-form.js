(function () {
  const SUBMIT_EMAIL_URL = 'https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail';

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function initEarlyAccess({ cta, form, success, emailInput, submitBtn, errorEl }) {
    if (!cta || !form || !success || !emailInput || !submitBtn || !errorEl) {
      return;
    }

    function setError(message) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }

    function clearError() {
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
    }

    cta.addEventListener('click', () => {
      cta.classList.add('hidden');
      form.classList.remove('hidden');
      emailInput.focus();
    });

    emailInput.addEventListener('input', () => {
      clearError();
      submitBtn.disabled = false;
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (!email) {
        setError('Please enter your email');
        return;
      }
      if (!validateEmail(email)) {
        setError('Please enter a valid email');
        return;
      }

      clearError();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      try {
        const response = await fetch(SUBMIT_EMAIL_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          form.classList.add('hidden');
          success.classList.remove('hidden');
          return;
        }

        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit email');
      } catch (error) {
        console.error('Error submitting email:', error);
        setError('Something went wrong. Please try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get Early Access';
      }
    });
  }

  initEarlyAccess({
    cta: document.getElementById('early-access-cta'),
    form: document.getElementById('early-access-form'),
    success: document.getElementById('early-access-success'),
    emailInput: document.getElementById('email-input'),
    submitBtn: document.getElementById('email-submit'),
    errorEl: document.getElementById('email-error'),
  });

  initEarlyAccess({
    cta: document.getElementById('closing-early-access-cta'),
    form: document.getElementById('closing-early-access-form'),
    success: document.getElementById('closing-early-access-success'),
    emailInput: document.getElementById('closing-email-input'),
    submitBtn: document.getElementById('closing-email-submit'),
    errorEl: document.getElementById('closing-email-error'),
  });
})();
