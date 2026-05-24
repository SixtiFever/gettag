import { Link } from 'react-router-dom';
import { SUPPORT_EMAIL } from '../../constants/support';
import TitleLogo from '../landing-pages/TitleLogo';
import './LegalPage.css';

export default function TermsPage() {
  return (
    <article className="legal-page">
      <header className="legal-page__header">
        <Link to="/" className="legal-page__home-link" aria-label="Back to Tag home">
          <TitleLogo />
        </Link>
      </header>

      <div className="legal-page__content">
        <h1 className="legal-page__title">Terms of Service</h1>

        <section className="legal-page__section" aria-labelledby="terms-acceptance">
          <h2 className="legal-page__section-title" id="terms-acceptance">
            1. Acceptance of Terms
          </h2>
          <p className="legal-page__paragraph">
            By accessing or using Tag (&quot;the App&quot;), you agree to be bound by these Terms of
            Service (&quot;Terms&quot;). If you do not agree, do not use the App. You must be at
            least 13 years old to create an account and use Tag.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="terms-description">
          <h2 className="legal-page__section-title" id="terms-description">
            2. Description of Service
          </h2>
          <p className="legal-page__paragraph">
            Tag is a video debate platform. Users create and participate in debates by recording
            short video takes and tagging others to respond. The service is provided on an
            &quot;as-is&quot; and &quot;as-available&quot; basis.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="terms-user-content">
          <h2 className="legal-page__section-title" id="terms-user-content">
            3. User Content
          </h2>
          <p className="legal-page__paragraph">
            You retain ownership of the content you create. By posting content on Tag, you grant us
            a worldwide, non-exclusive, royalty-free license to host, display, reproduce, and
            distribute your content in connection with operating and improving the service. You are
            solely responsible for your content. You must not post anything that is illegal, harmful,
            infringes on others&apos; intellectual property rights, or violates these Terms or our
            Community Guidelines.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="terms-acceptable-use">
          <h2 className="legal-page__section-title" id="terms-acceptable-use">
            4. Acceptable Use
          </h2>
          <p className="legal-page__paragraph">
            You agree to follow our Community Guidelines, which are available in the App under Help
            &gt; Community Guidelines. You agree not to:
          </p>
          <ul className="legal-page__list">
            <li>Harass, bully, intimidate, or threaten other users</li>
            <li>Impersonate any person or entity</li>
            <li>Post spam, fraudulent, or misleading content</li>
            <li>Post sexually explicit, pornographic, or obscene material</li>
            <li>Post content that promotes violence, hate speech, or discrimination</li>
            <li>Use the service for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to other users&apos; accounts or our systems</li>
          </ul>
          <p className="legal-page__paragraph">
            We may remove content and suspend or terminate accounts that violate these Terms or the
            Community Guidelines without prior notice.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="terms-ip-dmca">
          <h2 className="legal-page__section-title" id="terms-ip-dmca">
            5. Intellectual Property and DMCA
          </h2>
          <p className="legal-page__paragraph">
            If you believe content on Tag infringes your copyright, please contact us at{' '}
            <a className="legal-page__link" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>{' '}
            with: (a) a description of the copyrighted work, (b) identification of the infringing
            content, (c) your contact information, and (d) a statement that you have a good-faith
            belief the use is unauthorized. We will review and respond to valid takedown requests
            in accordance with applicable law.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="terms-account-termination">
          <h2 className="legal-page__section-title" id="terms-account-termination">
            6. Account Termination
          </h2>
          <p className="legal-page__paragraph">
            You may delete your account at any time through Account Settings. We reserve the right
            to suspend or terminate accounts that violate these Terms, the Community Guidelines, or
            applicable law. Upon termination, your identity may be anonymized while your
            contributions may remain for debate continuity.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="terms-disclaimers">
          <h2 className="legal-page__section-title" id="terms-disclaimers">
            7. Disclaimers
          </h2>
          <p className="legal-page__paragraph">
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES
            OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES
            OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="terms-liability">
          <h2 className="legal-page__section-title" id="terms-liability">
            8. Limitation of Liability
          </h2>
          <p className="legal-page__paragraph">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, TAG AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND
            AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE APP.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="terms-indemnification">
          <h2 className="legal-page__section-title" id="terms-indemnification">
            9. Indemnification
          </h2>
          <p className="legal-page__paragraph">
            You agree to indemnify and hold harmless Tag and its affiliates from any claims, damages,
            losses, or expenses (including reasonable legal fees) arising from your use of the App,
            your content, or your violation of these Terms.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="terms-changes">
          <h2 className="legal-page__section-title" id="terms-changes">
            10. Changes to These Terms
          </h2>
          <p className="legal-page__paragraph">
            We may update these Terms from time to time. We will notify you of significant changes
            through the App. Continued use of the App after changes take effect constitutes
            acceptance of the revised Terms.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="terms-governing-law">
          <h2 className="legal-page__section-title" id="terms-governing-law">
            11. Governing Law
          </h2>
          <p className="legal-page__paragraph">
            These Terms shall be governed by and construed in accordance with the laws of the
            jurisdiction in which Tag operates, without regard to conflict of law principles.
          </p>
        </section>

        <section className="legal-page__section" aria-labelledby="terms-contact">
          <h2 className="legal-page__section-title" id="terms-contact">
            12. Contact
          </h2>
          <p className="legal-page__paragraph">
            For questions about these Terms, use the Contact Us option in the App or email us at{' '}
            <a className="legal-page__link" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
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
          <Link to="/terms" className="legal-page__footer-link" aria-current="page">
            Terms
          </Link>
        </nav>
      </footer>
    </article>
  );
}
