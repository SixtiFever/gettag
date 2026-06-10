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
          This page describes how <strong>Tag</strong> — the app listed as &quot;Tag&quot; on the
          App Store and Google Play — handles your data, including how to delete your account and
          what is removed or kept when you do. Tag is a mobile app for collaborative video debates.
          We collect only what we need to run the service. We do not sell or pass on your data, and
          we do not retain data unnecessarily.
        </p>

        <section className="legal-page__section" aria-labelledby="data-delete-steps">
          <h2 className="legal-page__section-title" id="data-delete-steps">
            How to Delete Your Tag Account
          </h2>
          <p className="legal-page__paragraph">
            You can delete your Tag account at any time, directly from inside the app:
          </p>
          <ol className="legal-page__list">
            <li>Open the Tag app and sign in.</li>
            <li>
              Go to <strong>Profile → Account Settings</strong>.
            </li>
            <li>
              Tap <strong>Delete Account</strong>.
            </li>
            <li>
              Confirm your password when prompted, then tap <strong>Delete Account</strong> again
              to confirm.
            </li>
          </ol>
          <p className="legal-page__paragraph">
            If you cannot access the app (for example, you have lost your password and cannot reset
            it), you can also request deletion by emailing{' '}
            <a className="legal-page__link" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>{' '}
            from the email address on your account. We will verify your identity and process the
            deletion within 30 days.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="data-what-we-collect">
          <h2 className="legal-page__section-title" id="data-what-we-collect">
            What We Collect
          </h2>
          <p className="legal-page__paragraph">
            Account info (email, username, date of birth, profile photo) for sign-up and age
            verification. Video takes you record. An optional device push token for notifications
            when you are tagged or a debate updates. Optional OAuth tokens, only if you link Tag to
            your other socials for cross-platform posting. These are all securely stored server
            side.
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
            Account Deletion — Data That Is Deleted
          </h2>
          <p className="legal-page__paragraph">
            When you delete your account, the following data is permanently removed from our live
            systems:
          </p>
          <ul className="legal-page__list">
            <li>Your Firebase login (email and authentication credentials)</li>
            <li>Your profile photo stored on our servers</li>
            <li>Notifications sent to you</li>
            <li>Block records involving you</li>
            <li>
              Solo debates and takes (debates you created alone with no other participants)
            </li>
            <li>
              Your linked-platform OAuth tokens (YouTube, TikTok, etc.) — these are cleared as soon
              as you unlink or delete your account
            </li>
            <li>
              Identifying profile fields: your email, bio, profile photo URL, and push token are
              cleared, and your username is replaced with &quot;[Deleted User]&quot;
            </li>
          </ul>
          <p className="legal-page__paragraph">
            Deletion requires password confirmation before any changes. If a step fails, completed
            steps are rolled back so your account is not left in a partial state. Once deletion
            completes you cannot recover your account or sign in again.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="data-deletion-retained">
          <h2 className="legal-page__section-title" id="data-deletion-retained">
            Account Deletion — Data That Is Kept (and For How Long)
          </h2>
          <p className="legal-page__paragraph">
            Tag is collaborative, and some information must be kept so the rest of the platform
            keeps working. After deletion, the following data is retained:
          </p>
          <ul className="legal-page__list">
            <li>
              <strong>Video takes in multi-person debates</strong> — kept so other participants’
              debates remain playable, shown with your name as &quot;[Deleted User].&quot; Retained
              for as long as the debate exists.
            </li>
            <li>
              <strong>Debate metadata</strong> (title, turn order) for multi-person debates — kept
              alongside the videos above.
            </li>
            <li>
              <strong>Cloudflare-hosted video files</strong> for those multi-person debates — kept
              with the debate; removed if the debate is deleted.
            </li>
            <li>
              <strong>Date of birth</strong> — kept on the anonymized profile record for age
              verification and to prevent re-registration by underage users.
            </li>
            <li>
              <strong>Abuse and moderation reports</strong> — retained as long as needed to enforce
              our Terms and Community Guidelines and to comply with legal obligations.
            </li>
            <li>
              <strong>Encrypted backups and system logs</strong> — your data may persist in
              routine, encrypted backups for up to <strong>30 days</strong> after deletion, after
              which it is overwritten on the normal backup rotation.
            </li>
          </ul>
          <p className="legal-page__paragraph">
            Open debates where you were the active responder are closed automatically as part of
            deletion.
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
