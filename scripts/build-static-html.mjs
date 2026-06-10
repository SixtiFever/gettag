import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SUPPORT_EMAIL = 'hello@tag-social.com';

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function extractSvgFromTsx(tsxPath) {
  const content = read(tsxPath);
  const match = content.match(/<svg[\s\S]*?<\/svg>/);
  if (!match) throw new Error(`No SVG in ${tsxPath}`);
  return match[0]
    .replace(/\{\.\.\.props\}/g, '')
    .replace(/xmlnsXlink="http:\/\/www\.w3\.org\/1999\/xlink"/g, 'xmlns:xlink="http://www.w3.org/1999/xlink"')
    .replace(/opacity=\{([^}]+)\}/g, 'opacity="$1"')
    .replace(/style=\{\{[\s\S]*?\}\}/g, '')
    .replace(/className=/g, 'class=');
}

const logoSvg = extractSvgFromTsx('src/components/landing-pages/logo.tsx')
  .replace(/width=\{110\}/, 'width="46"')
  .replace(/height=\{135\}/, 'height="56"');

const recordSvg = extractSvgFromTsx('src/assets/svg/RecordSeflie.tsx').replace(
  '<svg',
  '<svg class="new-landing__how-step-illustration"'
);
const tagSvg = extractSvgFromTsx('src/assets/svg/TagSomeone.tsx').replace(
  '<svg',
  '<svg class="new-landing__how-step-illustration"'
);
const growSvg = extractSvgFromTsx('src/assets/svg/GrowGlobal.tsx').replace(
  '<svg',
  '<svg class="new-landing__how-step-illustration"'
);

function titleLogoHtml() {
  return `<a href="/" class="title-logo" aria-label="Tag home">
  ${logoSvg}
  <span class="title-logo__text">Tag.</span>
</a>`;
}

function landingCss() {
  let css = read('src/App.css') + '\n' + read('src/components/landing-pages/NewLandingPage.css');
  css = css.replace(/\/\* Entry animations \*\/[\s\S]*$/, '');
  css += `
/* Static HTML: use document scroll for anchor links and crawlers */
.new-landing {
  height: auto;
  max-height: none;
  min-height: 100dvh;
  overflow-y: visible;
}
.title-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  text-decoration: none;
  color: inherit;
}
.title-logo__text {
  color: #0f172a;
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
}
.new-landing__scroll-link {
  text-decoration: none;
  color: inherit;
}
.new-landing__scroll-link:visited {
  color: inherit;
}
`;
  return css;
}

function legalCssBlock() {
  return read('src/App.css') + '\n' + read('src/components/legal/LegalPage.css') + `
.title-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  text-decoration: none;
  color: inherit;
}
.title-logo__text {
  color: #0f172a;
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
}
.legal-page__list--ordered {
  list-style: decimal;
}
`;
}

function legalFooter(active) {
  const links = [
    { href: '/privacy.html', label: 'Privacy Policy', key: 'privacy' },
    { href: '/terms.html', label: 'Terms of Service', key: 'terms' },
    { href: '/your-data.html', label: 'Your Data', key: 'your-data' },
  ];
  const items = links
    .map(
      (l) =>
        `<a href="${l.href}" class="legal-page__footer-link"${active === l.key ? ' aria-current="page"' : ''}>${l.label}</a>`
    )
    .join('\n          <span class="legal-page__footer-sep" aria-hidden="true">·</span>\n          ');
  return `<footer class="legal-page__footer">
        <nav class="legal-page__footer-nav" aria-label="Footer">
          <span class="legal-page__footer-domain">tag-social.com</span>
          <span class="legal-page__footer-sep" aria-hidden="true">·</span>
          ${items}
        </nav>
      </footer>`;
}

function landingFooter() {
  return `<footer class="new-landing__footer">
            <nav class="new-landing__footer-nav" aria-label="Footer">
              <span class="new-landing__footer-domain">tag-social.com</span>
              <span class="new-landing__footer-sep" aria-hidden="true">·</span>
              <a href="/privacy.html" class="new-landing__footer-link">Privacy Policy</a>
              <span class="new-landing__footer-sep" aria-hidden="true">·</span>
              <a href="/terms.html" class="new-landing__footer-link">Terms of Service</a>
              <span class="new-landing__footer-sep" aria-hidden="true">·</span>
              <a href="/your-data.html" class="new-landing__footer-link">Your Data</a>
            </nav>
          </footer>`;
}

const iconShare = `<svg class="new-landing__why-card-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>`;
const iconTimer = `<svg class="new-landing__why-card-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>`;
const iconLink = `<svg class="new-landing__why-card-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" x2="16" y1="12" y2="12"/></svg>`;
const iconUsers = `<svg class="new-landing__why-card-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>`;

const emailFormScript = `<script>
(function () {
  var endpoint = 'https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail';
  function validateEmail(email) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  }
  function bindForm(form) {
    if (!form || form.dataset.bound) return;
    form.dataset.bound = '1';
    var input = form.querySelector('input[type="email"]');
    var btn = form.querySelector('button[type="submit"]');
    var errorEl = form.querySelector('.new-landing__error');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (input.value || '').trim();
      if (!email) {
        if (errorEl) { errorEl.hidden = false; errorEl.textContent = 'Please enter your email'; }
        return;
      }
      if (!validateEmail(email)) {
        if (errorEl) { errorEl.hidden = false; errorEl.textContent = 'Please enter a valid email'; }
        return;
      }
      if (errorEl) errorEl.hidden = true;
      btn.disabled = true;
      btn.textContent = 'Submitting...';
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      }).then(function (r) {
        if (r.ok) {
          document.querySelectorAll('.new-landing__form').forEach(function (f) { f.hidden = true; });
          document.querySelectorAll('.new-landing__form-success').forEach(function (el) { el.hidden = false; });
        } else {
          return r.json().then(function (d) { throw new Error(d.error || 'Failed'); });
        }
      }).catch(function () {
        btn.disabled = false;
        btn.textContent = btn.dataset.label || 'Join Beta';
        if (errorEl) { errorEl.hidden = false; errorEl.textContent = 'Something went wrong. Please try again.'; }
      });
    });
    input.addEventListener('input', function () {
      if (errorEl) errorEl.hidden = true;
    });
  }
  document.querySelectorAll('.new-landing__form').forEach(bindForm);
  document.querySelectorAll('.new-landing__btn').forEach(function (b) {
    b.dataset.label = b.textContent;
  });
})();
</script>`;

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Tag is a mobile video debate app. Record 30-second takes, tag others to respond, and grow global debate chains from your phone." />
  <title>Tag — Global Video Debate From Your Phone</title>
  <link rel="icon" type="image/png" href="/assets/icons/speech.png" />
  <style>
${landingCss()}
  </style>
</head>
<body>
  <div class="new-landing">
    <a href="#how-it-works" class="new-landing__scroll-arrow new-landing__scroll-arrow--next new-landing__scroll-link" aria-label="See how Tag works">
      <span class="new-landing__scroll-next-text">See how Tag works</span>
      <svg class="new-landing__scroll-arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </a>

    <div class="new-landing__top-left-logo">
      ${titleLogoHtml()}
    </div>

    <div class="new-landing__body">
      <section id="hero" class="new-landing__hero-frame" aria-labelledby="new-landing-hero-heading">
        <div class="new-landing__hero-layout">
          <div class="new-landing__hero-copy-col">
            <div class="new-landing__hero-copy-inner">
              <h1 id="new-landing-hero-heading" class="new-landing__hero-heading">
                Global Video Debate<br />
                <span class="new-landing__hero-heading-accent">From Your Phone</span><br />
              </h1>
              <p class="new-landing__hero-lede">
                Tag is where people can have global debates that fit into daily life. No scheduling needed. All you need is your phone, something to say, and 30 seconds.
              </p>

              <div class="new-landing__hero-cta">
                <form class="new-landing__form" action="#" method="post">
                  <div class="new-landing__form-row">
                    <input type="email" name="email" placeholder="Enter your email" class="new-landing__input" autocomplete="email" required />
                    <button type="submit" class="new-landing__btn">Join Beta</button>
                  </div>
                  <p class="new-landing__error" role="alert" hidden></p>
                </form>
                <div class="new-landing__form-success" hidden>
                  <div class="new-landing__success-box">
                    <div class="new-landing__success-icon" aria-hidden="true">✓</div>
                    <h2 class="new-landing__success-title">You're on the list</h2>
                    <p class="new-landing__success-text">We'll notify you when beta is launching.</p>
                  </div>
                </div>
              </div>

              <p class="new-landing__hero-footnote">
                Launching soon on <strong>App Store</strong> &amp; <strong>Google Play</strong>
              </p>
            </div>
          </div>

          <div class="new-landing__hero-visual-col">
            <div class="new-landing__hero-visual-phones">
              <img src="/assets/screenshots/feed_screenshot-portrait.png" alt="Tag app My Debates feed on a phone" class="new-landing__hero-img" width="1419" height="2796" decoding="async" />
              <img src="/assets/screenshots/debate_playing_screenshot-left.png" alt="Tag app playing a debate take on a phone" class="new-landing__hero-img" width="1857" height="3096" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" class="new-landing__section new-landing__section--how" aria-labelledby="new-landing-how-heading">
        <header class="new-landing__how-intro">
          <p class="new-landing__how-eyebrow">How it works</p>
          <h2 id="new-landing-how-heading" class="new-landing__how-heading">How Tag Works</h2>
          <p class="new-landing__how-subtitle">Tag makes debating convenient for everyone whilst rewarding logic, not loudness</p>
        </header>
        <div class="new-landing__how-steps-wrap new-landing__how-steps-wrap--with-bridge">
          <ol class="new-landing__how-steps">
            <li class="new-landing__how-step new-landing__how-step--with-visual">
              <div class="new-landing__how-step-icon-wrap new-landing__how-step-icon-wrap--circle" aria-hidden="true">${recordSvg}</div>
              <span class="new-landing__how-keyword">Record</span>
              <p class="new-landing__how-desc">Make your point in a 30-second clip</p>
            </li>
            <li class="new-landing__how-step new-landing__how-step--with-visual">
              <div class="new-landing__how-step-icon-wrap new-landing__how-step-icon-wrap--circle" aria-hidden="true">${tagSvg}</div>
              <span class="new-landing__how-keyword">Tag</span>
              <p class="new-landing__how-desc">Tag someone to respond. Their clip gets appended to yours.</p>
            </li>
            <li class="new-landing__how-step new-landing__how-step--with-visual">
              <div class="new-landing__how-step-icon-wrap new-landing__how-step-icon-wrap--circle" aria-hidden="true">${growSvg}</div>
              <span class="new-landing__how-keyword">Grow</span>
              <p class="new-landing__how-desc">The debate chain grows as more people are tagged in</p>
            </li>
          </ol>
        </div>
        <div class="new-landing__how-bridge">
          <p class="new-landing__how-bridge-text">Share individual takes or full debate chains to any platform.</p>
        </div>
      </section>

      <section id="why-it-works" class="new-landing__section new-landing__section--how new-landing__section--last" aria-labelledby="new-landing-why-heading">
        <div class="new-landing__why">
          <header class="new-landing__why-intro">
            <p class="new-landing__why-eyebrow">Key features</p>
            <h2 id="new-landing-why-heading" class="new-landing__why-heading">Why Tag is different</h2>
            <p class="new-landing__why-subtitle">Sharp takes, clear structure, flexible turns, and publishing where your audience already is.</p>
          </header>
          <ul class="new-landing__why-grid">
            <li class="new-landing__why-card">
              <div class="new-landing__why-card-icon-wrap" aria-hidden="true">${iconShare}</div>
              <h3 class="new-landing__why-card-title">Cross-platform posting</h3>
              <p class="new-landing__why-card-desc">Post an entire debate or individual takes directly to the platforms where your audience already is.</p>
            </li>
            <li class="new-landing__why-card">
              <div class="new-landing__why-card-icon-wrap" aria-hidden="true">${iconTimer}</div>
              <h3 class="new-landing__why-card-title">Bite-sized takes</h3>
              <p class="new-landing__why-card-desc">30-second takes keep every argument sharp and focused, rewarding clarity over verbosity.</p>
            </li>
            <li class="new-landing__why-card">
              <div class="new-landing__why-card-icon-wrap" aria-hidden="true">${iconLink}</div>
              <h3 class="new-landing__why-card-title">Debate chains</h3>
              <p class="new-landing__why-card-desc">Takes link together into a linear, easy-to-follow debate structure — distinct points, no interruptions.</p>
            </li>
            <li class="new-landing__why-card">
              <div class="new-landing__why-card-icon-wrap" aria-hidden="true">${iconUsers}</div>
              <h3 class="new-landing__why-card-title">Tagging system</h3>
              <p class="new-landing__why-card-desc">An asynchronous turn structure means anyone can contribute whenever and wherever suits them.</p>
            </li>
          </ul>
        </div>

        <div class="new-landing__key-features-signup" aria-labelledby="new-landing-features-signup-heading">
          <h3 id="new-landing-features-signup-heading" class="new-landing__key-features-signup-heading">Join the beta</h3>
          <form class="new-landing__form" action="#" method="post">
            <div class="new-landing__form-row">
              <input type="email" name="email" placeholder="Enter your email" class="new-landing__input" autocomplete="email" required />
              <button type="submit" class="new-landing__btn" data-label="Join">Join</button>
            </div>
            <p class="new-landing__error" role="alert" hidden></p>
          </form>
          <div class="new-landing__form-success" hidden>
            <div class="new-landing__success-box">
              <div class="new-landing__success-icon" aria-hidden="true">✓</div>
              <p class="new-landing__success-title">You're on the list</p>
              <p class="new-landing__success-text">We'll notify you when beta is launching.</p>
            </div>
          </div>
        </div>

        ${landingFooter()}
      </section>
    </div>
  </div>
  ${emailFormScript}
</body>
</html>`;

function legalPageShell({ title, active, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Tag</title>
  <link rel="icon" type="image/png" href="/assets/icons/speech.png" />
  <style>
${legalCssBlock()}
  </style>
</head>
<body>
  <article class="legal-page">
    <header class="legal-page__header">
      ${titleLogoHtml().replace('class="title-logo"', 'class="legal-page__home-link title-logo"')}
    </header>
    <div class="legal-page__content">
${body}
    </div>
    ${legalFooter(active)}
  </article>
</body>
</html>`;
}

const privacyHtml = legalPageShell({
  title: 'Privacy Policy',
  active: 'privacy',
  body: `      <h1 class="legal-page__title">Privacy Policy</h1>
      <p class="legal-page__effective-date">Effective Date: April 2026</p>
      <p class="legal-page__intro">This Privacy Policy explains how Tag ("we," "us," or "our") collects, uses, and protects your information when you use our mobile application ("the App").</p>
      <section class="legal-page__section" aria-labelledby="privacy-info-collect">
        <h2 class="legal-page__section-title" id="privacy-info-collect">1. Information We Collect</h2>
        <p class="legal-page__paragraph"><strong>Account Information:</strong> When you create an account, we collect your email address, username, and optional profile photo.</p>
        <p class="legal-page__paragraph"><strong>User Content:</strong> We collect the video content, debate titles, and other content you create and post through the App.</p>
        <p class="legal-page__paragraph"><strong>Device Information:</strong> We collect device identifiers needed to deliver push notifications (such as an Expo push token). We do not collect device advertising identifiers (IDFA).</p>
        <p class="legal-page__paragraph"><strong>Usage Data:</strong> We may collect information about how you interact with the App, such as which debates you view, to improve the service.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="privacy-how-we-use">
        <h2 class="legal-page__section-title" id="privacy-how-we-use">2. How We Use Your Information</h2>
        <p class="legal-page__paragraph">We use your information to:</p>
        <ul class="legal-page__list">
          <li>Provide, operate, and maintain the App</li>
          <li>Create and manage your account</li>
          <li>Deliver push notifications you have opted into</li>
          <li>Display your content to other users as part of the debate platform</li>
          <li>Respond to your support requests</li>
          <li>Enforce our Terms of Service and Community Guidelines</li>
          <li>Improve and develop new features</li>
        </ul>
        <p class="legal-page__paragraph">We do not sell your personal data.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="privacy-data-storage">
        <h2 class="legal-page__section-title" id="privacy-data-storage">3. Data Storage and Security</h2>
        <p class="legal-page__paragraph">Your account data is stored using Firebase (Google Cloud Platform), which provides industry-standard encryption in transit and at rest. Video content is stored and delivered via Cloudflare Stream. We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="privacy-third-party">
        <h2 class="legal-page__section-title" id="privacy-third-party">4. Third-Party Service Providers</h2>
        <p class="legal-page__paragraph">We share data with the following categories of service providers, who are contractually obligated to protect your data:</p>
        <ul class="legal-page__list">
          <li>Firebase (Google Cloud) — authentication, database, and file storage</li>
          <li>Cloudflare Stream — video hosting and delivery</li>
          <li>Expo — push notification delivery</li>
        </ul>
        <p class="legal-page__paragraph">We do not share your personal data with third parties for advertising purposes.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="privacy-data-sharing">
        <h2 class="legal-page__section-title" id="privacy-data-sharing">5. Data Sharing and Disclosure</h2>
        <p class="legal-page__paragraph">We do not sell or rent your personal information. We may disclose your information if:</p>
        <ul class="legal-page__list">
          <li>Required by law, regulation, or legal process</li>
          <li>Necessary to protect the rights, property, or safety of Tag, our users, or the public</li>
          <li>Related to a merger, acquisition, or sale of assets (you would be notified)</li>
        </ul>
      </section>
      <section class="legal-page__section" aria-labelledby="privacy-your-rights">
        <h2 class="legal-page__section-title" id="privacy-your-rights">6. Your Rights</h2>
        <p class="legal-page__paragraph">You have the right to:</p>
        <ul class="legal-page__list">
          <li>Access your personal data through your profile in the App</li>
          <li>Update your email, username, profile photo, and bio through Account Settings</li>
          <li>Delete your account at any time through Account Settings</li>
          <li>Request a copy of your data by contacting us at <a class="legal-page__link" href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></li>
          <li>Withdraw consent for push notifications through your device settings</li>
        </ul>
        <p class="legal-page__paragraph">When you delete your account, your identity is anonymized. Your video contributions may remain for debate continuity, but will no longer be associated with your identity.</p>
        <p class="legal-page__paragraph">If you are located in the European Economic Area (EEA), you may also have the right to data portability, the right to restrict processing, and the right to lodge a complaint with your local data protection authority.</p>
        <p class="legal-page__paragraph">If you are a California resident, you have the right to know what personal information we collect, request deletion, and opt out of the sale of personal information (we do not sell personal information).</p>
      </section>
      <section class="legal-page__section" aria-labelledby="privacy-data-retention">
        <h2 class="legal-page__section-title" id="privacy-data-retention">7. Data Retention</h2>
        <p class="legal-page__paragraph">We retain your personal data while your account is active. After account deletion, we remove your personal identifiers. Anonymized content references may remain for debate continuity. Abuse reports and moderation records may be retained as necessary to enforce our policies and comply with legal obligations.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="privacy-children">
        <h2 class="legal-page__section-title" id="privacy-children">8. Children's Privacy</h2>
        <p class="legal-page__paragraph">Tag is not intended for users under 13 years of age. We do not knowingly collect personal data from children under 13. If we become aware that we have collected data from a child under 13, we will take steps to delete that information promptly. If you believe a child under 13 has provided us with personal data, please contact us at <a class="legal-page__link" href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="privacy-changes">
        <h2 class="legal-page__section-title" id="privacy-changes">9. Changes to This Policy</h2>
        <p class="legal-page__paragraph">We may update this Privacy Policy from time to time. We will notify you of significant changes through the App. Continued use of the App after changes take effect constitutes acceptance of the revised policy. The "Effective Date" at the top will be updated accordingly.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="privacy-contact">
        <h2 class="legal-page__section-title" id="privacy-contact">10. Contact</h2>
        <p class="legal-page__paragraph">For privacy questions or to exercise your rights, use the Contact Us option in the App or email us at <a class="legal-page__link" href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></p>
      </section>`,
});

const termsHtml = legalPageShell({
  title: 'Terms of Service',
  active: 'terms',
  body: `      <h1 class="legal-page__title">Terms of Service</h1>
      <section class="legal-page__section" aria-labelledby="terms-acceptance">
        <h2 class="legal-page__section-title" id="terms-acceptance">1. Acceptance of Terms</h2>
        <p class="legal-page__paragraph">By accessing or using Tag ("the App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, do not use the App. You must be at least 13 years old to create an account and use Tag.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="terms-description">
        <h2 class="legal-page__section-title" id="terms-description">2. Description of Service</h2>
        <p class="legal-page__paragraph">Tag is a video debate platform. Users create and participate in debates by recording short video takes and tagging others to respond. The service is provided on an "as-is" and "as-available" basis.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="terms-user-content">
        <h2 class="legal-page__section-title" id="terms-user-content">3. User Content</h2>
        <p class="legal-page__paragraph">You retain ownership of the content you create. By posting content on Tag, you grant us a worldwide, non-exclusive, royalty-free license to host, display, reproduce, and distribute your content in connection with operating and improving the service. You are solely responsible for your content. You must not post anything that is illegal, harmful, infringes on others' intellectual property rights, or violates these Terms or our Community Guidelines.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="terms-acceptable-use">
        <h2 class="legal-page__section-title" id="terms-acceptable-use">4. Acceptable Use</h2>
        <p class="legal-page__paragraph">You agree to follow our Community Guidelines, which are available in the App under Help &gt; Community Guidelines. You agree not to:</p>
        <ul class="legal-page__list">
          <li>Harass, bully, intimidate, or threaten other users</li>
          <li>Impersonate any person or entity</li>
          <li>Post spam, fraudulent, or misleading content</li>
          <li>Post sexually explicit, pornographic, or obscene material</li>
          <li>Post content that promotes violence, hate speech, or discrimination</li>
          <li>Use the service for any illegal purpose</li>
          <li>Attempt to gain unauthorized access to other users' accounts or our systems</li>
        </ul>
        <p class="legal-page__paragraph">We may remove content and suspend or terminate accounts that violate these Terms or the Community Guidelines without prior notice.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="terms-ip-dmca">
        <h2 class="legal-page__section-title" id="terms-ip-dmca">5. Intellectual Property and DMCA</h2>
        <p class="legal-page__paragraph">If you believe content on Tag infringes your copyright, please contact us at <a class="legal-page__link" href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a> with: (a) a description of the copyrighted work, (b) identification of the infringing content, (c) your contact information, and (d) a statement that you have a good-faith belief the use is unauthorized. We will review and respond to valid takedown requests in accordance with applicable law.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="terms-account-termination">
        <h2 class="legal-page__section-title" id="terms-account-termination">6. Account Termination</h2>
        <p class="legal-page__paragraph">You may delete your account at any time through Account Settings. We reserve the right to suspend or terminate accounts that violate these Terms, the Community Guidelines, or applicable law. Upon termination, your identity may be anonymized while your contributions may remain for debate continuity.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="terms-disclaimers">
        <h2 class="legal-page__section-title" id="terms-disclaimers">7. Disclaimers</h2>
        <p class="legal-page__paragraph">THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="terms-liability">
        <h2 class="legal-page__section-title" id="terms-liability">8. Limitation of Liability</h2>
        <p class="legal-page__paragraph">TO THE MAXIMUM EXTENT PERMITTED BY LAW, TAG AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE APP.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="terms-indemnification">
        <h2 class="legal-page__section-title" id="terms-indemnification">9. Indemnification</h2>
        <p class="legal-page__paragraph">You agree to indemnify and hold harmless Tag and its affiliates from any claims, damages, losses, or expenses (including reasonable legal fees) arising from your use of the App, your content, or your violation of these Terms.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="terms-changes">
        <h2 class="legal-page__section-title" id="terms-changes">10. Changes to These Terms</h2>
        <p class="legal-page__paragraph">We may update these Terms from time to time. We will notify you of significant changes through the App. Continued use of the App after changes take effect constitutes acceptance of the revised Terms.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="terms-governing-law">
        <h2 class="legal-page__section-title" id="terms-governing-law">11. Governing Law</h2>
        <p class="legal-page__paragraph">These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Tag operates, without regard to conflict of law principles.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="terms-contact">
        <h2 class="legal-page__section-title" id="terms-contact">12. Contact</h2>
        <p class="legal-page__paragraph">For questions about these Terms, use the Contact Us option in the App or email us at <a class="legal-page__link" href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></p>
      </section>`,
});

const yourDataHtml = legalPageShell({
  title: 'Your Data',
  active: 'your-data',
  body: `      <h1 class="legal-page__title">Your Data</h1>
      <p class="legal-page__intro">This page describes how <strong>Tag</strong> — the app listed as "Tag" on the App Store and Google Play — handles your data, including how to delete your account and what is removed or kept when you do. Tag is a mobile app for collaborative video debates. We collect only what we need to run the service. We do not sell or pass on your data, and we do not retain data unnecessarily.</p>
      <section class="legal-page__section" aria-labelledby="data-delete-steps">
        <h2 class="legal-page__section-title" id="data-delete-steps">How to Delete Your Tag Account</h2>
        <p class="legal-page__paragraph">You can delete your Tag account at any time, directly from inside the app:</p>
        <ol class="legal-page__list legal-page__list--ordered">
          <li>Open the Tag app and sign in.</li>
          <li>Go to <strong>Profile → Account Settings</strong>.</li>
          <li>Tap <strong>Delete Account</strong>.</li>
          <li>Confirm your password when prompted, then tap <strong>Delete Account</strong> again to confirm.</li>
        </ol>
        <p class="legal-page__paragraph">If you cannot access the app (for example, you have lost your password and cannot reset it), you can also request deletion by emailing <a class="legal-page__link" href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a> from the email address on your account. We will verify your identity and process the deletion within 30 days.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="data-what-we-collect">
        <h2 class="legal-page__section-title" id="data-what-we-collect">What We Collect</h2>
        <p class="legal-page__paragraph">Account info (email, username, date of birth, profile photo) for sign-up and age verification. Video takes you record. An optional device push token for notifications when you are tagged or a debate updates. Optional OAuth tokens, only if you link Tag to your other socials for cross-platform posting. These are all securely stored server side.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="data-your-controls">
        <h2 class="legal-page__section-title" id="data-your-controls">Your Controls</h2>
        <p class="legal-page__paragraph">Update your profile in Account Settings. Turn off push notifications in device settings or in the app. Unlink YouTube or TikTok from Profile → Linked Platforms — this immediately deletes the stored OAuth token for that platform. Delete your account from Account Settings (password confirmation required). Email <a class="legal-page__link" href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a> to request a copy of your data.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="data-deletion-removed">
        <h2 class="legal-page__section-title" id="data-deletion-removed">Account Deletion — Data That Is Deleted</h2>
        <p class="legal-page__paragraph">When you delete your account, the following data is permanently removed from our live systems:</p>
        <ul class="legal-page__list">
          <li>Your Firebase login (email and authentication credentials)</li>
          <li>Your profile photo stored on our servers</li>
          <li>Notifications sent to you</li>
          <li>Block records involving you</li>
          <li>Solo debates and takes (debates you created alone with no other participants)</li>
          <li>Your linked-platform OAuth tokens (YouTube, TikTok, etc.) — these are cleared as soon as you unlink or delete your account</li>
          <li>Identifying profile fields: your email, bio, profile photo URL, and push token are cleared, and your username is replaced with "[Deleted User]"</li>
        </ul>
        <p class="legal-page__paragraph">Deletion requires password confirmation before any changes. If a step fails, completed steps are rolled back so your account is not left in a partial state. Once deletion completes you cannot recover your account or sign in again.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="data-deletion-retained">
        <h2 class="legal-page__section-title" id="data-deletion-retained">Account Deletion — Data That Is Kept (and For How Long)</h2>
        <p class="legal-page__paragraph">Tag is collaborative, and some information must be kept so the rest of the platform keeps working. After deletion, the following data is retained:</p>
        <ul class="legal-page__list">
          <li><strong>Video takes in multi-person debates</strong> — kept so other participants' debates remain playable, shown with your name as "[Deleted User]." Retained for as long as the debate exists.</li>
          <li><strong>Debate metadata</strong> (title, turn order) for multi-person debates — kept alongside the videos above.</li>
          <li><strong>Cloudflare-hosted video files</strong> for those multi-person debates — kept with the debate; removed if the debate is deleted.</li>
          <li><strong>Date of birth</strong> — kept on the anonymized profile record for age verification and to prevent re-registration by underage users.</li>
          <li><strong>Abuse and moderation reports</strong> — retained as long as needed to enforce our Terms and Community Guidelines and to comply with legal obligations.</li>
          <li><strong>Encrypted backups and system logs</strong> — your data may persist in routine, encrypted backups for up to <strong>30 days</strong> after deletion, after which it is overwritten on the normal backup rotation.</li>
        </ul>
        <p class="legal-page__paragraph">Open debates where you were the active responder are closed automatically as part of deletion.</p>
      </section>
      <section class="legal-page__section" aria-labelledby="data-contact">
        <h2 class="legal-page__section-title" id="data-contact">Questions</h2>
        <p class="legal-page__paragraph">For privacy or data requests, email <a class="legal-page__link" href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.</p>
      </section>`,
});

fs.writeFileSync(path.join(root, 'index.html'), indexHtml);
fs.writeFileSync(path.join(root, 'privacy.html'), privacyHtml);
fs.writeFileSync(path.join(root, 'terms.html'), termsHtml);
fs.writeFileSync(path.join(root, 'your-data.html'), yourDataHtml);

console.log('Generated index.html, privacy.html, terms.html, your-data.html');
