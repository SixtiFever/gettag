import React, { useState } from 'react';
import './NewLandingPage.css';

const SUBMIT_EMAIL_URL = 'https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail';

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function TagLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });

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
    <div className="new-landing">
      {/* Conversation/debate visual metaphor - flowing dialogue bubbles */}
      <div className="new-landing__bg">
        <div className="new-landing__bubble new-landing__bubble--1 animate-float-1"></div>
        <div className="new-landing__bubble new-landing__bubble--slate-700 new-landing__bubble--2 animate-float-2"></div>
        <div className="new-landing__bubble new-landing__bubble--3 animate-float-3"></div>
        <div className="new-landing__bubble new-landing__bubble--slate-700 new-landing__bubble--4 animate-float-4"></div>
        <div className="new-landing__bubble new-landing__bubble--5 animate-float-5"></div>
        <div className="new-landing__bubble new-landing__bubble--slate-700 new-landing__bubble--6 animate-float-6"></div>
        <div className="new-landing__bubble new-landing__bubble--7 animate-float-7"></div>
        <div className="new-landing__bubble new-landing__bubble--slate-700 new-landing__bubble--8 animate-float-8"></div>

        {/* Subtle connecting lines suggesting back-and-forth — evenly split left/right */}
        <svg className="new-landing__svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          {/* Left side: curve from left toward center */}
          <path
            d="M 50 120 Q 350 180 550 150"
            stroke="#1e293b"
            strokeWidth="2"
            fill="none"
            className="animate-draw-1"
          />
          {/* Right side: curve from right toward center */}
          <path
            d="M 950 220 Q 650 280 450 260"
            stroke="#334155"
            strokeWidth="2"
            fill="none"
            className="animate-draw-2"
          />
          {/* Center: diagonal crossing left to right */}
          <path
            d="M 150 420 Q 500 480 850 400"
            stroke="#475569"
            strokeWidth="2"
            fill="none"
            className="animate-draw-3"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="new-landing__content">
        {/* Logo/App Name */}
        <div className="new-landing__logo-wrap animate-fade-in">
          <h1 className="new-landing__logo">Tag</h1>
          <div className="new-landing__logo-line"></div>
        </div>

        {/* Tagline */}
        {/* <h2 className="new-landing__tagline animate-fade-in-delay-1">
          Turn-based video debates
        </h2> */}
        <h2 className="new-landing__tagline animate-fade-in-delay-1">
          Social Debating App
        </h2>

        {/* Description */}
        {/* <p className="new-landing__description animate-fade-in-delay-2">
          Start a hot take. Tag someone to respond.
          Build public debates, 6 seconds at a time.
        </p> */}

        <p className="new-landing__description animate-fade-in-delay-2">
          Record your take. Tag someone to respond.<br></br> Watch the debate grow.
        </p>

        {/* Email signup */}
        {!submitted ? (
          <div className="animate-fade-in-delay-3">
            <p className="new-landing__form-label">Looking for Beta testers</p>
            <form onSubmit={handleSubmit} className="new-landing__form">
              <div className="new-landing__form-row">
                <input
                  type="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  disabled={status.type === 'loading'}
                  className="new-landing__input"
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
                <p className="new-landing__error" role="alert">{status.message}</p>
              )}
            </form>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="new-landing__success-box">
              <div className="new-landing__success-icon">✓</div>
              <h3 className="new-landing__success-title">You're on the list</h3>
              <p className="new-landing__success-text">We'll notify you when beta is launching.</p>
            </div>
          </div>
        )}

        {/* Subtext */}
        <p className="new-landing__subtext animate-fade-in-delay-4">
          Launching soon on <b>App Store</b> & <b>Google Play</b>
        </p>
      </div>
    </div>
  );
}