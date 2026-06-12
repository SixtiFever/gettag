import { useState } from 'react';
import jaseSpeech from '../../assets/debate-demo/jase_speech.mp4';
import jaseAvatar from '../../assets/debate-demo/jase.webp';
import rosieAvatar from '../../assets/debate-demo/rosieavatar.webp';
import rosieSpeech from '../../assets/debate-demo/hayley_speech.mp4';
import reedSpeech from '../../assets/debate-demo/reid_speech.mp4';
import reedAvatar from '../../assets/debate-demo/jeremy.webp';

const takes = [
  { video: jaseSpeech, avatar: jaseAvatar, username: '@jase' },
  { video: rosieSpeech, avatar: rosieAvatar, username: '@rosie' },
  { video: reedSpeech, avatar: reedAvatar, username: '@reed' },
];

export default function DebatePhoneMockup() {
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
                  <p className="text-sm text-slate-200 drop-shadow-md">&quot;Why AI won&apos;t replace developers...&quot;</p>
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
