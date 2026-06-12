(function () {
  const SUBMIT_EMAIL_URL = 'https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail';

  const cta = document.getElementById('early-access-cta');
  const form = document.getElementById('early-access-form');
  const success = document.getElementById('early-access-success');
  const emailInput = document.getElementById('email-input');
  const submitBtn = document.getElementById('email-submit');
  const errorEl = document.getElementById('email-error');

  if (!cta || !form || !success || !emailInput || !submitBtn) {
    return;
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
})();
