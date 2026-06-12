import { useState } from 'react';
import { Clock, GitMerge, Smartphone, CalendarOff, Users, Sparkles, Play, ChevronRight } from 'lucide-react';
import jaseSpeech from './assets/jase_speech.mp4';
import jaseAvatar from './assets/jase.webp';
import rosieAvatar from './assets/rosieavatar.webp';
import rosieSpeech from './assets/hayley_speech.mp4';
import reedSpeech from './assets/reid_speech.mp4';
import reedAvatar from './assets/jeremy.webp';

const takes = [
  { video: jaseSpeech, avatar: jaseAvatar, username: '@jase' },
  { video: rosieSpeech, avatar: rosieAvatar, username: '@rosie' },
  { video: reedSpeech, avatar: reedAvatar, username: '@reed' },
];

function DebatePhoneMockup() {
  const [activeTake, setActiveTake] = useState(0);
  const current = takes[activeTake];

  return (
    <div className="relative mx-auto w-full max-w-[340px] lg:ml-auto">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 blur-3xl opacity-20 rounded-full" />

      <div className="relative bg-slate-950 border-[8px] border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-500/10 aspect-[9/19]">
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-30">
          <div className="w-32 h-6 bg-slate-950 rounded-b-3xl" />
        </div>

        <div className="absolute inset-0 bg-slate-900 flex flex-col">
          <div className="relative flex-1 bg-slate-800">
            <video
              key={activeTake}
              src={current.video}
              autoPlay
              muted
              playsInline
              onEnded={() => setActiveTake((prev) => (prev + 1) % takes.length)}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-950/95" />

            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-xs font-medium text-white/80 whitespace-nowrap">
              AI demo content
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 z-20">
              <div className="flex items-end justify-between mb-5">
                <div className="pr-4">
                  <h4 className="font-bold text-white text-lg mb-1 drop-shadow-md">{current.username}</h4>
                  <p className="text-sm text-slate-200 drop-shadow-md">"Why AI won't replace developers..."</p>
                </div>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Debate Chain</div>
                  <div className="text-xs font-medium text-slate-400">{takes.length} takes</div>
                </div>
                <div className="flex items-center gap-2">
                  {takes.map((take, index) => (
                    <div key={take.username} className="flex items-center gap-2">
                      {index > 0 && (
                        <div
                          className={`w-4 h-[2px] rounded-full ${
                            activeTake >= index ? 'bg-indigo-500/50' : 'bg-slate-700'
                          }`}
                        />
                      )}
                      <div
                        className={`w-10 h-10 rounded-full overflow-hidden border-2 z-10 relative transition-colors ${
                          activeTake === index
                            ? 'bg-indigo-500 border-indigo-400 shadow-sm shadow-indigo-500/50'
                            : 'bg-slate-700 border-slate-600 shadow-sm'
                        }`}
                      >
                        <img
                          src={take.avatar}
                          alt={take.username}
                          className={`w-full h-full object-cover ${activeTake === index ? '' : 'opacity-70'}`}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="w-4 h-[2px] bg-slate-700 rounded-full" />
                  <div className="w-10 h-10 rounded-full bg-slate-800/50 border-2 border-slate-600 border-dashed flex items-center justify-center hover:bg-slate-800 transition-colors cursor-pointer">
                    <span className="text-slate-400 text-lg font-light">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* Background ambient glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Navigation (Minimal) */}
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-2xl font-extrabold tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
            Tag
          </div>
          <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Contact Us
          </button>
        </nav>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>The new format for social video</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.15] max-w-5xl mx-auto">
            Short Form Video Debating That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400">
              Captivates Your Audience
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
            Tag is the mobile tool for content creators to build structured, short-form video debates that can be instantly posted across all your social channels.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 shadow-xl shadow-white/10">
              Get Early Access <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Section 1: How it works */}
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">The Debate Chain</h2>
              <p className="text-xl text-slate-400 mb-12">
                In Tag you build Debate Chains, a new format of social video content.
              </p>
              
              <div className="space-y-10">
                {/* Point 1 */}
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner shadow-indigo-500/10">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">30-Second Takes</h3>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      Make your points in 30-second takes. Snappy, quick fire debates that reward concision over rambling.
                    </p>
                  </div>
                </div>
                {/* Point 2 */}
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 shadow-inner shadow-fuchsia-500/10">
                    <GitMerge className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-200 mb-2">Turn-Based Structure</h3>
                    <p className="text-slate-400 leading-relaxed text-lg">
                      Our tagging system creates a linear, easy-to-follow conversation for both participants and viewers.
                    </p>
                  </div>
                </div>
                {/* Point 3 */}
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

        {/* Section 2: Why Creators Love Tag */}
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">Why Creators Love Tag</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 hover:bg-slate-800/60 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-indigo-500/10">
                <CalendarOff className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-100 mb-4">No Scheduling Required</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                No podcasts to coordinate, no Zoom links, no time-zone math. Record your point asynchronously, tag someone to respond, and go about your day.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 hover:bg-slate-800/60 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-fuchsia-500/5">
              <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-fuchsia-500/10">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-100 mb-4">Reach New Audiences</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Every time a co-creator shares a Debate Chain, you tap directly into their follower base for effortless, organic growth.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 hover:bg-slate-800/60 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-8 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-blue-500/10">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-100 mb-4">Fresh Content, New Format</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Debate chains are inherently collaborative, making every debate unique, exciting and unpredictable. Ideal social media content.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center opacity-80">
              <Play className="w-3 h-3 text-white fill-white" />
            </div>
            Tag
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Tag. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
