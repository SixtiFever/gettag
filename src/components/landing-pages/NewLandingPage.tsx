import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Earth,
  Link2,
  Mic,
  Send,
  Share2,
  Timer,
  TrendingUp,
  UsersRound,
} from 'lucide-react';
import './NewLandingPage.css';
import splashHero from '../../assets/icons/splash-icon-light.png';
import TitleLogo from './TitleLogo';
import { HowWorksStepIcon } from './HowWorksStepIcon';

const SUBMIT_EMAIL_URL = 'https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail';

/** Ordered scroll targets for scroll-spy and prev/next arrows */
const SCROLL_SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'problem', label: 'Problem' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'why-it-works', label: 'Why it works' },
] as const;

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
      {nextSection && (
        <button
          type="button"
          className="new-landing__scroll-arrow new-landing__scroll-arrow--next"
          aria-label={`Next section: ${nextSection.label}`}
          onClick={() => scrollToSection(nextSection.id)}
        >
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
                  The Global
                  <br />
                  <span className="new-landing__hero-heading-accent">Debate Studio</span>
                  <br />
                </h1>
                <p className="new-landing__hero-lede animate-fade-in-delay-1">
                  Video debates that reward logic, not loudness
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
              <img
                src={splashHero}
                alt="Tag app splash screen on a phone"
                className="new-landing__hero-img animate-fade-in-delay-1"
                width={640}
                height={640}
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section
          id="problem"
          className="new-landing__section new-landing__section--split"
          aria-labelledby="new-landing-problem-heading"
        >
          <div className="new-landing__split-intro">
            <h2 id="new-landing-problem-heading" className="new-landing__split-heading">
              Live video debating is broken
            </h2>
            <p className="new-landing__split-subheading">
            Scheduling limits participation. Real-time rewards the loudest.
            </p>
          </div>
          <div className="new-landing__split-main">
            <div className="new-landing__split-body-col">
              <p>
              Traditional debate is gated by schedules, dominated by interruptions, and often won by volume. Tag transforms debate through flexible 20-second takes — making participation easier, responses sharper, and every voice accountable.
              </p>
            </div>
            <figure className="new-landing__split-figure">
              <div className="new-landing__split-image-slot" aria-hidden="true" />
            </figure>
          </div>
        </section>

        <section
          id="how-it-works"
          className="new-landing__section new-landing__section--how"
          aria-labelledby="new-landing-how-heading"
        >
          <div className="new-landing__split-intro">
            <h2 id="new-landing-how-heading" className="new-landing__split-heading">
              How Tag Works
            </h2>
            <p className="new-landing__split-subheading">
              {/* Chain user takes into a single debate video and post it anywhere */}
              {/* Build debates by chaining user takes into a single video */}
              Build video debates take by take. Post anywhere.
            </p>
          </div>
          <div className="new-landing__how-steps-wrap">
            <ol className="new-landing__how-steps">
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={Mic} />
                <span className="new-landing__how-keyword">Record</span>
                <p className="new-landing__how-desc">Make your point in a 20-second video</p>
              </li>
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={Send} />
                <span className="new-landing__how-keyword">Tag</span>
                <p className="new-landing__how-desc">Invite someone to respond</p>
              </li>
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={TrendingUp} />
                <span className="new-landing__how-keyword">Grow</span>
                <p className="new-landing__how-desc">The debate grows as more people are tagged in</p>
              </li>
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={Earth} />
                <span className="new-landing__how-keyword">Post</span>
                <p className="new-landing__how-desc">Share debates and takes across platforms</p>
              </li>
            </ol>
          </div>
        </section>

        <section
          id="why-it-works"
          className="new-landing__section new-landing__section--how new-landing__section--last"
          aria-labelledby="new-landing-why-heading"
        >
          <div className="new-landing__split-intro">
            <h2 id="new-landing-why-heading" className="new-landing__split-heading">
              Key Features
            </h2>
            <p className="new-landing__split-subheading">
              Sharp takes, clear structure, flexible turns, and publishing where your audience already is.
            </p>
          </div>
          <div className="new-landing__how-steps-wrap">
            <ul className="new-landing__how-steps">
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={Timer} />
                <span className="new-landing__how-keyword">Bite-sized takes</span>
                <p className="new-landing__how-desc">
                  20-second takes keep every argument sharp and focused — rewarding clarity over verbosity.
                </p>
              </li>
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={Link2} />
                <span className="new-landing__how-keyword">Debate chains</span>
                <p className="new-landing__how-desc">
                  Takes link together into a linear, easy-to-follow debate structure — distinct points, no interruptions.
                </p>
              </li>
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={UsersRound} />
                <span className="new-landing__how-keyword">Tagging system</span>
                <p className="new-landing__how-desc">
                  An asynchronous turn structure means anyone can contribute whenever and wherever suits them.
                </p>
              </li>
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={Share2} />
                <span className="new-landing__how-keyword">Cross-platform posting</span>
                <p className="new-landing__how-desc">
                  Post an entire debate or individual takes directly to the platforms where your audience already is.
                </p>
              </li>
            </ul>
          </div>
          <footer className="new-landing__footer">
            <nav className="new-landing__footer-nav" aria-label="Footer">
              <span className="new-landing__footer-domain">tag-social.com</span>
              <span className="new-landing__footer-sep" aria-hidden="true">
                ·
              </span>
              <a href="/privacy" className="new-landing__footer-link">
                Privacy
              </a>
              <span className="new-landing__footer-sep" aria-hidden="true">
                ·
              </span>
              <a href="/terms" className="new-landing__footer-link">
                Terms
              </a>
            </nav>
          </footer>
        </section>
      </div>
    </div>
  );
}
