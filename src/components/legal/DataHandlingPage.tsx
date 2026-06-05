import { Link } from 'react-router-dom';
import { SUPPORT_EMAIL } from '../../constants/support';
import TitleLogo from '../landing-pages/TitleLogo';
import './LegalPage.css';

export default function DataHandlingPage() {
  return (
    <article className="legal-page">
      <header className="legal-page__header">
        <Link to="/" className="legal-page__home-link" aria-label="Back to Tag home">
          <TitleLogo />
        </Link>
      </header>

      <div className="legal-page__content">
        <h1 className="legal-page__title">Your Data</h1>

        <p className="legal-page__intro">
          Tag is a mobile app for collaborative video debates. We collect only what we need to run
          the service. We do not sell pass on any data or retain any data unnecessarily.
        </p>

        <section className="legal-page__section" aria-labelledby="data-what-we-collect">
          <h2 className="legal-page__section-title" id="data-what-we-collect">
            What We Collect
          </h2>
          <p className="legal-page__paragraph">
            Account info (email, username, date of birth, profile photo) for sign-up, age
            verification. Video takes you record. An
            optional device push token for notifications when you are tagged or a debate updates.
            Optional OAuth tokens, only if you link Tag to your other socials for cross platform posting.
            These are all securely stored server side.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="data-your-controls">
          <h2 className="legal-page__section-title" id="data-your-controls">
            Your Controls
          </h2>
          <p className="legal-page__paragraph">
            Update your profile in Account Settings. Turn off push notifications in device settings
            or in the app. Unlink YouTube or TikTok from Profile → Linked Platforms — this
            immediately deletes the stored OAuth token for that platform. Delete your account from
            Account Settings (password confirmation required). Email{' '}
            <a className="legal-page__link" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>{' '}
            to request a copy of your data.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="data-deletion-removed">
          <h2 className="legal-page__section-title" id="data-deletion-removed">
            Account Deletion — What Is Removed
          </h2>
          <p className="legal-page__paragraph">
            Deletion permanently removes your Firebase login, profile photo on our servers,
            notifications sent to you, block records involving you, and solo debates and takes
            (debates you created alone with no other participants).
          </p>
          <p className="legal-page__paragraph">
            Your profile is anonymized: username becomes &quot;[Deleted User]&quot;, and your email,
            bio, profile photo URL, and push token are cleared. You cannot recover your account or
            sign in again.
          </p>
          <p className="legal-page__paragraph">
            Deletion requires password confirmation before any changes. If a step fails, completed
            steps are rolled back so your account is not left in a partial state.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="data-deletion-retained">
          <h2 className="legal-page__section-title" id="data-deletion-retained">
            Account Deletion — What May Be Retained
          </h2>
          <p className="legal-page__paragraph">
            Tag is collaborative. To keep debates usable for other participants, video takes in
            multi-person debates remain playable with your name shown as &quot;[Deleted User].&quot;
            Debate metadata (title, turn order) is kept. Open debates where you were the active
            responder are closed automatically.
          </p>
          <p className="legal-page__paragraph">
            Cloudflare-hosted videos, notifications and abuse or moderation reports are not
            modified by account deletion. Date of birth stays on the anonymized profile record for
            age verification.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="data-contact">
          <h2 className="legal-page__section-title" id="data-contact">
            Questions
          </h2>
          <p className="legal-page__paragraph">
            For privacy or data requests, email{' '}
            <a className="legal-page__link" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>

      <footer className="legal-page__footer">
        <nav className="legal-page__footer-nav" aria-label="Footer">
          <span className="legal-page__footer-domain">tag-social.com</span>
          <span className="legal-page__footer-sep" aria-hidden="true">
            ·
          </span>
          <Link to="/privacy" className="legal-page__footer-link">
            Privacy
          </Link>
          <span className="legal-page__footer-sep" aria-hidden="true">
            ·
          </span>
          <Link to="/terms" className="legal-page__footer-link">
            Terms
          </Link>
          <span className="legal-page__footer-sep" aria-hidden="true">
            ·
          </span>
          <Link to="/your-data" className="legal-page__footer-link" aria-current="page">
            Your Data
          </Link>
        </nav>
      </footer>
    </article>
  );
}
