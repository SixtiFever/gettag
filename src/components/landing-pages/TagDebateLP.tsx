import { useState, type FormEvent } from 'react';
import './TagDebateLP.css';
import Logo from './logo';

/* ─────────────────────────────────────────────
   1. NAVBAR
   ───────────────────────────────────────────── */
function Navbar() {
  return (
    <nav className="tdlp__nav">
      <div className="tdlp__nav-logo">
        <Logo width={32} height={39} />
        <span className="tdlp__nav-wordmark">
          {/* TODO: Wordmark text */}
        </span>
      </div>

      <div className="tdlp__nav-links">
        {/* TODO: Optional minimal nav links */}
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   2. HERO
   ───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="tdlp__section tdlp__hero">
      {/* Floating background shapes — same motif as existing page */}
      <div className="tdlp__hero-bg" aria-hidden="true">
        <div className="tdlp__hero-bubble tdlp__hero-bubble--1" />
        <div className="tdlp__hero-bubble tdlp__hero-bubble--alt tdlp__hero-bubble--2" />
        <div className="tdlp__hero-bubble tdlp__hero-bubble--3" />
        <div className="tdlp__hero-bubble tdlp__hero-bubble--alt tdlp__hero-bubble--4" />
      </div>

      <div className="tdlp__hero-content">
        <h1 className="tdlp__hero-headline anim-in">
          {/* TODO: Hero headline */}
        </h1>

        <p className="tdlp__hero-tagline anim-in-d1">
          {/* TODO: Hero tagline */}
        </p>

        <p className="tdlp__hero-sub anim-in-d2">
          {/* TODO: Functional subheading explaining what Tag does */}
        </p>

        <a href="#email-capture" className="tdlp__hero-cta anim-in-d3">
          {/* TODO: CTA button label */}
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   3. PROBLEM
   ───────────────────────────────────────────── */
function Problem() {
  return (
    <section className="tdlp__section tdlp__section--alt">
      <div className="tdlp__section-inner">
        <p className="tdlp__problem-text">
          {/* TODO: Problem statement
              Guidance: Traditional video debating is limited by real-time
              coordination — logistics and scheduling limit participation
              and subsequently the quantity and quality of debates. */}
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   4. SOLUTION
   ───────────────────────────────────────────── */
function Solution() {
  return (
    <section className="tdlp__section">
      <div className="tdlp__section-inner">
        <p className="tdlp__solution-text">
          {/* TODO: Solution statement
              Guidance: Tag lets users build, join, and share asynchronous
              video debates — removing real-time constraints and enabling
              cross-platform posting. */}
        </p>

        <p className="tdlp__solution-tagline">
          {/* TODO: Standalone tagline */}
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   5. HOW IT WORKS
   ───────────────────────────────────────────── */
interface Step {
  title: string;
  description: string;
}

function HowItWorks() {
  const steps: Step[] = [
    {
      title: '',        // TODO: "Record"
      description: '',  // TODO: "Make your point in a 20-second Take"
    },
    {
      title: '',        // TODO: "Tag"
      description: '',  // TODO: "Invite another user to respond to your Take"
    },
    {
      title: '',        // TODO: "Grow"
      description: '',  // TODO: "Watch the debate grow as more people get involved"
    },
  ];

  return (
    <section className="tdlp__section tdlp__section--alt">
      <div className="tdlp__section-inner">
        <h2 className="tdlp__section-heading">
          {/* TODO: Section heading, e.g. "How it works" */}
        </h2>

        <div className="tdlp__steps">
          {steps.map((step, i) => (
            <div className="tdlp__step" key={i}>
              <span className="tdlp__step-number">{i + 1}</span>
              <h3 className="tdlp__step-title">{step.title}</h3>
              <p className="tdlp__step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   6. WHY IT WORKS
   ───────────────────────────────────────────── */
interface Pillar {
  boldWord: string;
  notX: string;
  description: string;
}

function WhyItWorks() {
  const pillars: Pillar[] = [
    {
      boldWord: '',     // TODO: Bold contrast word
      notX: '',         // TODO: "not X" counterpart
      description: '',  // TODO: Description
    },
    {
      boldWord: '',
      notX: '',
      description: '',
    },
    {
      boldWord: '',
      notX: '',
      description: '',
    },
    {
      boldWord: '',
      notX: '',
      description: '',
    },
  ];

  return (
    <section className="tdlp__section">
      <div className="tdlp__section-inner">
        <h2 className="tdlp__section-heading">
          {/* TODO: Section heading, e.g. "Why it works" */}
        </h2>

        <div className="tdlp__pillars">
          {pillars.map((pillar, i) => (
            <div className="tdlp__pillar" key={i}>
              <h3 className="tdlp__pillar-title">
                <strong>{pillar.boldWord}</strong>
                <span>, not {pillar.notX}</span>
              </h3>
              <p className="tdlp__pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   7. EMAIL CAPTURE
   ───────────────────────────────────────────── */
function EmailCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // TODO: Connect to email service / API
    setSubmitted(true);
  };

  return (
    <section id="email-capture" className="tdlp__section tdlp__section--dark">
      <div className="tdlp__section-inner">
        <h2 className="tdlp__email-heading">
          {/* TODO: Email capture heading */}
        </h2>

        {!submitted ? (
          <form className="tdlp__form" onSubmit={handleSubmit}>
            <div className="tdlp__form-row">
              <input
                type="email"
                className="tdlp__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="" // TODO: Placeholder text
                required
                autoComplete="email"
              />
              <button type="submit" className="tdlp__submit">
                {/* TODO: Submit button label */}
              </button>
            </div>

            {error && <p className="tdlp__form-error" role="alert">{error}</p>}

            <p className="tdlp__form-fine-print">
              {/* TODO: Small print / privacy note */}
            </p>
          </form>
        ) : (
          <div className="tdlp__success">
            <div className="tdlp__success-box">
              <div className="tdlp__success-icon">✓</div>
              <h3 className="tdlp__success-title">
                {/* TODO: Confirmation title */}
              </h3>
              <p className="tdlp__success-text">
                {/* TODO: Confirmation message */}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   8. FOOTER
   ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="tdlp__footer">
      <div className="tdlp__footer-wordmark">
        {/* TODO: Tag wordmark / logo */}
      </div>

      <p className="tdlp__footer-domain">
        {/* TODO: Domain, e.g. tagdebate.com */}
      </p>

      <nav className="tdlp__footer-links">
        {/* TODO: Footer links (privacy, terms, social, etc.) */}
      </nav>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   PAGE ASSEMBLY
   ───────────────────────────────────────────── */
export default function TagDebateLP() {
  return (
    <div className="tdlp">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <WhyItWorks />
      <EmailCapture />
      <Footer />
    </div>
  );
}
