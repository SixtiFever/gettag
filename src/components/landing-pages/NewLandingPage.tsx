import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  Link2,
  Share2,
  Timer,
  UsersRound,
} from 'lucide-react';
import './NewLandingPage.css';
import debatePlayingLeft from '../../assets/screenshots/debate_playing_screenshot-left.png';
import feedScreenshot from '../../assets/screenshots/feed_screenshot-portrait.png';
import GrowGlobal from '../../assets/svg/GrowGlobal';
import RecordSelfie from '../../assets/svg/RecordSeflie';
import TagSomeone from '../../assets/svg/TagSomeone';
import TitleLogo from './TitleLogo';

const SUBMIT_EMAIL_URL = 'https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail';

/** Ordered scroll targets for scroll-spy and prev/next arrows */
const SCROLL_SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'why-it-works', label: 'Why it works' },
] as const;

/** Label shown beside the down arrow (next section title / CTA from current viewport) */
const NEXT_SECTION_CTA: Partial<Record<(typeof SCROLL_SECTIONS)[number]['id'], string>> = {
  hero: 'See how Tag works',
  'how-it-works': 'What makes Tag different',
  'why-it-works': 'Key Features',
};

type ScrollSectionId = (typeof SCROLL_SECTIONS)[number]['id'];

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function TagLanding() {
  const landingRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const [activeSectionId, setActiveSectionId] = useState<ScrollSectionId>('hero');

  const updateActiveSection = useCallback(() => {
    const root = landingRef.current;
    if (!root) return;

    const rootRect = root.getBoundingClientRect();
    const midY = rootRect.top + rootRect.height / 2;

    let bestId: ScrollSectionId = SCROLL_SECTIONS[0].id;
    let bestDist = Infinity;

    for (const { id } of SCROLL_SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const cy = r.top + r.height / 2;
      const dist = Math.abs(cy - midY);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = id;
      }
    }

    setActiveSectionId((prev) => (prev === bestId ? prev : bestId));
  }, []);

  useEffect(() => {
    const root = landingRef.current;
    if (!root) return;

    updateActiveSection();
    root.addEventListener('scroll', updateActiveSection, { passive: true });

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateActiveSection) : null;
    ro?.observe(root);

    return () => {
      root.removeEventListener('scroll', updateActiveSection);
      ro?.disconnect();
    };
  }, [updateActiveSection]);

  const scrollToSection = useCallback((id: ScrollSectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    const smooth =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches === false;
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  }, []);

  const scrollIndex = SCROLL_SECTIONS.findIndex((s) => s.id === activeSectionId);
  const activeScrollIndex = scrollIndex === -1 ? 0 : scrollIndex;
  const prevSection = activeScrollIndex > 0 ? SCROLL_SECTIONS[activeScrollIndex - 1] : null;
  const nextSection =
    activeScrollIndex < SCROLL_SECTIONS.length - 1
      ? SCROLL_SECTIONS[activeScrollIndex + 1]
      : null;
  const nextSectionCta = nextSection
    ? NEXT_SECTION_CTA[activeSectionId] ?? nextSection.label
    : null;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email' });
      return;
    }
    if (!validateEmail(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email' });
      return;
    }
    setStatus({ type: 'loading', message: 'Submitting...' });
    try {
      const response = await fetch(SUBMIT_EMAIL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSubmitted(true);
        setStatus({ type: 'idle', message: '' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit email');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setStatus({ type: 'error', message: "Something went wrong. Please try again." });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status.type === 'error') setStatus({ type: 'idle', message: '' });
  };

  return (
    <div ref={landingRef} className="new-landing">
      {prevSection && (
        <button
          type="button"
          className="new-landing__scroll-arrow new-landing__scroll-arrow--prev"
          aria-label={`Previous section: ${prevSection.label}`}
          onClick={() => scrollToSection(prevSection.id)}
        >
          <ChevronUp className="new-landing__scroll-arrow-icon" aria-hidden />
        </button>
      )}
      {nextSection && nextSectionCta && (
        <button
          type="button"
          className="new-landing__scroll-arrow new-landing__scroll-arrow--next"
          onClick={() => scrollToSection(nextSection.id)}
        >
          <span className="new-landing__scroll-next-text">{nextSectionCta}</span>
          <ChevronDown className="new-landing__scroll-arrow-icon" aria-hidden />
        </button>
      )}

      <div className="new-landing__top-left-logo animate-fade-in">
        <TitleLogo />
      </div>

      <div className="new-landing__body">
        <section id="hero" className="new-landing__hero-frame" aria-labelledby="new-landing-hero-heading">
          <div className="new-landing__hero-layout">
            <div className="new-landing__hero-copy-col">
              <div className="new-landing__hero-copy-inner animate-fade-in">
                <h1 id="new-landing-hero-heading" className="new-landing__hero-heading">
                  Global Video Debate
                  <br />
                  <span className="new-landing__hero-heading-accent">From Your Phone</span>
                  <br />
                </h1>
                <p className="new-landing__hero-lede animate-fade-in-delay-1">
                {/* Long-form video debate means planning, scheduling and mediating. Tag makes it easier. Simply record your take, tag someone to respond, and watch the debate chain grow. */}
                Tag is where people can have global debates that fit into daily life. No scheduling needed. All you need is your phone, something to say, and 30 seconds.
                </p>

                {!submitted ? (
                  <div className="new-landing__hero-cta animate-fade-in-delay-2">
                    <form onSubmit={handleSubmit} className="new-landing__form">
                      <div className="new-landing__form-row">
                        <input
                          type="email"
                          value={email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          disabled={status.type === 'loading'}
                          className="new-landing__input"
                          autoComplete="email"
                        />
                        <button
                          type="submit"
                          disabled={status.type === 'loading'}
                          className="new-landing__btn"
                        >
                          {status.type === 'loading' ? 'Submitting...' : 'Join Beta'}
                        </button>
                      </div>
                      {status.type === 'error' && (
                        <p className="new-landing__error" role="alert">
                          {status.message}
                        </p>
                      )}
                    </form>
                  </div>
                ) : (
                  <div className="new-landing__hero-cta new-landing__hero-cta--success animate-fade-in-delay-2">
                    <div className="new-landing__success-box">
                      <div className="new-landing__success-icon">✓</div>
                      <h2 className="new-landing__success-title">You&apos;re on the list</h2>
                      <p className="new-landing__success-text">
                        We&apos;ll notify you when beta is launching.
                      </p>
                    </div>
                  </div>
                )}

                <p className="new-landing__hero-footnote animate-fade-in-delay-5">
                  Launching soon on <strong>App Store</strong> &amp; <strong>Google Play</strong>
                </p>
              </div>
            </div>

            <div className="new-landing__hero-visual-col">
              <div className="new-landing__hero-visual-phones">
                <img
                  src={feedScreenshot}
                  alt="Tag app My Debates feed on a phone"
                  className="new-landing__hero-img animate-fade-in-delay-1"
                  width={1419}
                  height={2796}
                  decoding="async"
                />
                <img
                  src={debatePlayingLeft}
                  alt="Tag app playing a debate take on a phone"
                  className="new-landing__hero-img animate-fade-in-delay-2"
                  width={1857}
                  height={3096}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="new-landing__section new-landing__section--how"
          aria-labelledby="new-landing-how-heading"
        >
          <header className="new-landing__how-intro">
            <p className="new-landing__how-eyebrow">How it works</p>
            <h2 id="new-landing-how-heading" className="new-landing__how-heading">
              How Tag Works
            </h2>
            <p className="new-landing__how-subtitle">
              Tag makes debating convenient for everyone whilst rewarding logic, not loudness
            </p>
          </header>
          <div className="new-landing__how-steps-wrap new-landing__how-steps-wrap--with-bridge">
            <ol className="new-landing__how-steps">
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <div
                  className="new-landing__how-step-icon-wrap new-landing__how-step-icon-wrap--circle"
                  aria-hidden="true"
                >
                  <RecordSelfie props={{ className: 'new-landing__how-step-illustration' }} />
                </div>
                <span className="new-landing__how-keyword">Record</span>
                <p className="new-landing__how-desc">Make your point in a 30-second clip</p>
              </li>
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <div
                  className="new-landing__how-step-icon-wrap new-landing__how-step-icon-wrap--circle"
                  aria-hidden="true"
                >
                  <TagSomeone props={{ className: 'new-landing__how-step-illustration' }} />
                </div>
                <span className="new-landing__how-keyword">Tag</span>
                <p className="new-landing__how-desc">Tag someone to respond. Their clip gets appended to yours.</p>
              </li>
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <div
                  className="new-landing__how-step-icon-wrap new-landing__how-step-icon-wrap--circle"
                  aria-hidden="true"
                >
                  <GrowGlobal props={{ className: 'new-landing__how-step-illustration' }} />
                </div>
                <span className="new-landing__how-keyword">Grow</span>
                <p className="new-landing__how-desc">The debate chain grows as more people are tagged in</p>
              </li>
              {/* <li className="new-landing__how-step new-landing__how-step--with-visual">
                <div
                  className="new-landing__how-step-icon-wrap new-landing__how-step-icon-wrap--circle"
                  aria-hidden="true"
                >
                  <CrossPlatformMale props={{ className: 'new-landing__how-step-illustration' }} />
                </div>
                <span className="new-landing__how-keyword">Post</span>
                <p className="new-landing__how-desc">Share debates and takes across platforms</p>
              </li> */}
            </ol>
          </div>
          <div className="new-landing__how-bridge">
            <p className="new-landing__how-bridge-text">
              Share individual takes or full debate chains to any platform.
            </p>
          </div>
        </section>

        <section
          id="why-it-works"
          className="new-landing__section new-landing__section--how new-landing__section--last"
          aria-labelledby="new-landing-why-heading"
        >
          <div className="new-landing__why">
            <header className="new-landing__why-intro">
              <p className="new-landing__why-eyebrow">Key features</p>
              <h2 id="new-landing-why-heading" className="new-landing__why-heading">
                Why Tag is different
              </h2>
              <p className="new-landing__why-subtitle">
                Sharp takes, clear structure, flexible turns, and publishing where your audience already is.
              </p>
            </header>
            <ul className="new-landing__why-grid">
              <li className="new-landing__why-card">
                <div className="new-landing__why-card-icon-wrap" aria-hidden="true">
                  <Share2 className="new-landing__why-card-icon" strokeWidth={1.75} />
                </div>
                <h3 className="new-landing__why-card-title">Cross-platform posting</h3>
                <p className="new-landing__why-card-desc">
                  Post an entire debate or individual takes directly to the platforms where your audience already is.
                </p>
              </li>
              <li className="new-landing__why-card">
                <div className="new-landing__why-card-icon-wrap" aria-hidden="true">
                  <Timer className="new-landing__why-card-icon" strokeWidth={1.75} />
                </div>
                <h3 className="new-landing__why-card-title">Bite-sized takes</h3>
                <p className="new-landing__why-card-desc">
                  30-second takes keep every argument sharp and focused, rewarding clarity over verbosity.
                </p>
              </li>
              <li className="new-landing__why-card">
                <div className="new-landing__why-card-icon-wrap" aria-hidden="true">
                  <Link2 className="new-landing__why-card-icon" strokeWidth={1.75} />
                </div>
                <h3 className="new-landing__why-card-title">Debate chains</h3>
                <p className="new-landing__why-card-desc">
                  Takes link together into a linear, easy-to-follow debate structure — distinct points, no
                  interruptions.
                </p>
              </li>
              <li className="new-landing__why-card">
                <div className="new-landing__why-card-icon-wrap" aria-hidden="true">
                  <UsersRound className="new-landing__why-card-icon" strokeWidth={1.75} />
                </div>
                <h3 className="new-landing__why-card-title">Tagging system</h3>
                <p className="new-landing__why-card-desc">
                  An asynchronous turn structure means anyone can contribute whenever and wherever suits them.
                </p>
              </li>
            </ul>
          </div>

          <div className="new-landing__key-features-signup" aria-labelledby="new-landing-features-signup-heading">
            <h3 id="new-landing-features-signup-heading" className="new-landing__key-features-signup-heading">
              Join the beta
            </h3>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="new-landing__form">
                <div className="new-landing__form-row">
                  <input
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    disabled={status.type === 'loading'}
                    className="new-landing__input"
                    autoComplete="email"
                    aria-describedby={
                      status.type === 'error' ? 'new-landing-features-signup-error' : undefined
                    }
                  />
                  <button
                    type="submit"
                    disabled={status.type === 'loading'}
                    className="new-landing__btn"
                  >
                    {status.type === 'loading' ? 'Submitting...' : 'Join'}
                  </button>
                </div>
                {status.type === 'error' && (
                  <p id="new-landing-features-signup-error" className="new-landing__error" role="alert">
                    {status.message}
                  </p>
                )}
              </form>
            ) : (
              <div className="new-landing__key-features-signup-success" role="status">
                <div className="new-landing__success-box">
                  <div className="new-landing__success-icon">✓</div>
                  <p className="new-landing__success-title">You&apos;re on the list</p>
                  <p className="new-landing__success-text">
                    We&apos;ll notify you when beta is launching.
                  </p>
                </div>
              </div>
            )}
          </div>

          <footer className="new-landing__footer">
            <nav className="new-landing__footer-nav" aria-label="Footer">
              <span className="new-landing__footer-domain">tag-social.com</span>
              <span className="new-landing__footer-sep" aria-hidden="true">
                ·
              </span>
              <Link to="/privacy" className="new-landing__footer-link">
                Privacy
              </Link>
              <span className="new-landing__footer-sep" aria-hidden="true">
                ·
              </span>
              <Link to="/terms" className="new-landing__footer-link">
                Terms
              </Link>
              <span className="new-landing__footer-sep" aria-hidden="true">
                ·
              </span>
              <Link to="/your-data" className="new-landing__footer-link">
                Your Data
              </Link>
            </nav>
          </footer>
        </section>
      </div>
    </div>
  );
}
