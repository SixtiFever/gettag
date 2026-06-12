import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarOff,
  ChevronRight,
  Clock,
  GitMerge,
  Link2,
  Play,
  Share2,
  Smartphone,
  Sparkles,
  UserPlus,
  Users,
  Video,
} from 'lucide-react';
import PageMeta from '../PageMeta';
import DebatePhoneMockup from './DebatePhoneMockup';
import debatePlayingLeft from '../../assets/screenshots/debate_playing_screenshot-left.png';
import feedScreenshot from '../../assets/screenshots/feed_screenshot-portrait.png';

const SUBMIT_EMAIL_URL = 'https://us-central1-tag-lp-cloudfunction.cloudfunctions.net/submitEmail';
const SUPPORT_EMAIL = 'hello@tag-social.com';

type FormStatus = 'idle' | 'loading' | 'error';

export default function PipeLandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email');
      return;
    }
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email');
      return;
    }
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch(SUBMIT_EMAIL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSubmitted(true);
        setStatus('idle');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit email');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 overflow-hidden">
      <PageMeta
        title="Tag — Short Form Video Debating That Captivates Your Audience"
        description="Tag is the mobile tool for content creators to build structured, short-form video debates that captivate audiences across social channels."
      />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-extrabold tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
            Tag
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Contact Us
          </a>
        </nav>

        <section className="max-w-7xl mx-auto px-6 pt-14 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-4 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span>The new format for social video</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-[1.12] max-w-5xl mx-auto lg:mx-0">
                Short Form Video Debating That{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400">
                  Captivates Your Audience
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed mb-6">
                Tag is the mobile tool for content creators to build structured, short-form video debates that can be
                instantly posted across all your social channels.
              </p>

              {!submitted && !showEmailForm ? (
                <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(true)}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-white/10"
                  >
                    Get Early Access <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              ) : !submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center lg:items-start justify-center lg:justify-start gap-4 max-w-md mx-auto lg:mx-0"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    disabled={status === 'loading'}
                    autoComplete="email"
                    autoFocus
                    className="w-full px-5 py-4 rounded-full bg-slate-900/80 border border-slate-700 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-white/10 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Get Early Access'}
                    {status !== 'loading' && <ChevronRight className="w-5 h-5" />}
                  </button>
                  {status === 'error' && (
                    <p className="text-sm text-red-400 text-center lg:text-left" role="alert">
                      {errorMessage}
                    </p>
                  )}
                </form>
              ) : (
                <p className="text-lg text-indigo-300 font-medium">
                  Thanks! We&apos;ll be in touch soon with early access details.
                </p>
              )}
            </div>

            <div className="flex items-start justify-center lg:justify-end lg:pt-1">
              <div className="flex flex-row items-start justify-center lg:justify-end gap-2 sm:gap-4 lg:gap-6 w-full translate-x-1 lg:translate-x-2">
                <img
                  src={feedScreenshot}
                  alt="Tag app My Debates feed on a phone"
                  className="block w-auto max-w-[calc(50%-0.5rem)] sm:max-w-[calc(50%-1rem)] lg:max-w-none h-[min(38.4vh,21.6rem)] lg:h-[min(62.4vh,36rem)] object-contain"
                  width={1419}
                  height={2796}
                  decoding="async"
                />
                <img
                  src={debatePlayingLeft}
                  alt="Tag app playing a debate take on a phone"
                  className="block w-auto max-w-[calc(50%-0.5rem)] sm:max-w-[calc(50%-1rem)] lg:max-w-none h-[min(38.4vh,21.6rem)] lg:h-[min(62.4vh,36rem)] object-contain"
                  width={1857}
                  height={3096}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">The Debate Chain</h2>
              <p className="text-xl text-slate-400 mb-12">
                In Tag you build Debate Chains, a new format of social video content.
              </p>

              <div className="space-y-10">
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner shadow-indigo-500/10">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">30-Second Takes</h3>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      Make your points in 30-second takes. Snappy, quick fire debates that reward concision over
                      rambling.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 shadow-inner shadow-fuchsia-500/10">
                    <GitMerge className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Turn-Based Structure</h3>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      Our tagging system creates a linear, easy-to-follow conversation for both participants and
                      viewers.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner shadow-blue-500/10">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Create on the Go</h3>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      All you need is your phone, 30 seconds, and an opinion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DebatePhoneMockup />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">Building Debate Chains</h2>
          </div>

          <ol className="grid md:grid-cols-3 gap-8">
            <li className="relative bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 shadow-inner shadow-indigo-500/10">
                <Video className="w-7 h-7" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-3 block">Step 1</span>
              <p className="text-slate-400 leading-relaxed text-lg">
                Record a 30-second take and tag someone to respond.
              </p>
            </li>

            <li className="relative bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8">
              <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-6 shadow-inner shadow-fuchsia-500/10">
                <UserPlus className="w-7 h-7" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-fuchsia-400 mb-3 block">Step 2</span>
              <p className="text-slate-400 leading-relaxed text-lg">
                They record their response and tag you back or someone else.
              </p>
            </li>

            <li className="relative bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 shadow-inner shadow-blue-500/10">
                <Link2 className="w-7 h-7" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3 block">Step 3</span>
              <p className="text-slate-400 leading-relaxed text-lg">
                Each response extends the chain, building a collaborative debate one take at a time.
              </p>
            </li>
          </ol>

          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
              Debate in Tag.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Share Everywhere.
              </span>
            </h3>
            <div className="mt-6 flex gap-5 items-center text-left bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-emerald-500/5 backdrop-blur-md border border-emerald-500/20 rounded-2xl px-8 py-6 shadow-lg shadow-emerald-500/5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner shadow-emerald-500/10">
                <Share2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">
                Share the full debate chain or individual takes directly to your socials.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">Built For Content Creators</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 hover:bg-slate-800/60 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-indigo-500/10">
                <CalendarOff className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-100 mb-4">No Scheduling Required</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                No podcasts to coordinate, no Zoom links, no time-zone math. Record your point asynchronously, tag
                someone to respond, and go about your day.
              </p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 hover:bg-slate-800/60 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-fuchsia-500/5">
              <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-fuchsia-500/10">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-100 mb-4">Reach New Audiences</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Every time a co-creator shares a Debate Chain, you tap directly into their follower base for
                effortless, organic growth.
              </p>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 hover:bg-slate-800/60 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-blue-500/10">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-100 mb-4">Fresh Content, New Format</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Debate chains are inherently collaborative, making every debate unique, exciting and unpredictable.
                Ideal social media content.
              </p>
            </div>
          </div>
        </section>

        <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 flex flex-col items-center gap-6 text-slate-500">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-slate-300">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center opacity-80">
                <Play className="w-3 h-3 text-white fill-white" />
              </div>
              Tag
            </div>
            <p className="text-sm">© {new Date().getFullYear()} Tag. All rights reserved.</p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm" aria-label="Footer">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/your-data" className="hover:text-slate-300 transition-colors">
              Your Data
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
