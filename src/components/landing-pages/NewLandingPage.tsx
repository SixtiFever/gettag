import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Mic,
  Share2,
  Tag,
  Timer,
  TrendingUp,
  UsersRound,
} from 'lucide-react';
import './NewLandingPage.css';
import splashHero from '../../assets/icons/splash-icon-light.png';
import TitleLogo from './TitleLogo';
import { HowWorksStepIcon } from './HowWorksStepIcon';

const SUBMIT_EMAIL_URL = 'https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail';

/** Ordered scroll targets (hero → footer) for scroll-spy and prev/next arrows */
const SCROLL_SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'why-it-works', label: 'Why it works' },
  { id: 'footer', label: 'Footer' },
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
              How it works
            </h2>
            <p className="new-landing__split-subheading">
              Record your point. Tag someone to respond. Watch the debate grow.
            </p>
          </div>
          <div className="new-landing__how-steps-wrap">
            <ol className="new-landing__how-steps">
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={Mic} />
                <span className="new-landing__how-keyword">Record</span>
                <p className="new-landing__how-desc">Make your point in a 20-second take.</p>
              </li>
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={Tag} />
                <span className="new-landing__how-keyword">Tag</span>
                <p className="new-landing__how-desc">Invite someone to respond when it works for them.</p>
              </li>
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={TrendingUp} />
                <span className="new-landing__how-keyword">Grow</span>
                <p className="new-landing__how-desc">Watch the debate grow as more people weigh in.</p>
              </li>
            </ol>
          </div>
        </section>

        <section
          id="solution"
          className="new-landing__section new-landing__section--split"
          aria-labelledby="new-landing-solution-heading"
        >
          <div className="new-landing__split-intro">
            <h2 id="new-landing-solution-heading" className="new-landing__split-heading">
              Debate on your timeline
            </h2>
            <p className="new-landing__split-subheading">
              Record takes, tag responses, and share chains—without locking anyone into the same live slot.
            </p>
          </div>
          <div className="new-landing__split-main">
            <div className="new-landing__split-body-col">
              <p className="new-landing__split-body">
                Tag is a debate app where you build, join, and share asynchronous video debates. Post takes and full chains to the platforms your audience already uses—no studio calendar required.
              </p>
              <p className="new-landing__split-accent">Logistics out. Threads in.</p>
            </div>
            <figure className="new-landing__split-figure">
              {/* <img className="new-landing__split-img" src="" alt="" /> */}
              <div className="new-landing__split-image-slot" aria-hidden="true" />
            </figure>
          </div>
        </section>

        <section
          id="why-it-works"
          className="new-landing__section new-landing__section--how"
          aria-labelledby="new-landing-why-heading"
        >
          <div className="new-landing__split-intro">
            <h2 id="new-landing-why-heading" className="new-landing__split-heading">
              Why it works
            </h2>
            <p className="new-landing__split-subheading">
              Tagging, tight takes, and publishing wherever your audience already is.
            </p>
          </div>
          <div className="new-landing__how-steps-wrap">
            <ul className="new-landing__how-steps">
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={UsersRound} />
                <span className="new-landing__how-keyword">Tagging system</span>
                <p className="new-landing__how-desc">
                  Invite anyone into a debate to have their say, at a time convenient for them.
                </p>
              </li>
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={Timer} />
                <span className="new-landing__how-keyword">Bite-sized takes</span>
                <p className="new-landing__how-desc">
                  20-second takes keep points sharp and concise.
                </p>
              </li>
              <li className="new-landing__how-step new-landing__how-step--with-visual">
                <HowWorksStepIcon icon={Share2} />
                <span className="new-landing__how-keyword">Cross platform posting</span>
                <p className="new-landing__how-desc">
                  Share individual takes or full debate chains to any platform.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <footer id="footer" className="new-landing__footer">
          <div className="new-landing__footer-wordmark">
            <TitleLogo />
          </div>
          <p className="new-landing__footer-domain">tagdebate.com</p>
          <nav className="new-landing__footer-nav" aria-label="Footer">
            <a href="/privacy" className="new-landing__footer-link">Privacy</a>
            <span className="new-landing__footer-sep" aria-hidden="true">·</span>
            <a href="/terms" className="new-landing__footer-link">Terms</a>
          </nav>
        </footer>
      </div>
    </div>
  );
}
