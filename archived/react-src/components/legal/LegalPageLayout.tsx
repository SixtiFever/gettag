import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export type LegalPageId = 'privacy' | 'terms' | 'your-data';

interface LegalPageLayoutProps {
  children: React.ReactNode;
  currentPage?: LegalPageId;
}

export default function LegalPageLayout({ children, currentPage }: LegalPageLayoutProps) {
  const footerLinkClass = (page: LegalPageId) =>
    currentPage === page ? 'text-slate-300' : 'hover:text-slate-300 transition-colors';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <nav className="max-w-7xl mx-auto w-full px-6 py-5 flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tighter text-white flex items-center gap-2"
            aria-label="Back to Tag home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
            Tag
          </Link>
        </nav>

        <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 md:py-12 legal-page">{children}</main>

        <footer className="max-w-7xl mx-auto w-full px-6 py-12 border-t border-slate-800/50 flex flex-col items-center gap-6 text-slate-500">
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
            <Link to="/privacy" className={footerLinkClass('privacy')} aria-current={currentPage === 'privacy' ? 'page' : undefined}>
              Privacy Policy
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms" className={footerLinkClass('terms')} aria-current={currentPage === 'terms' ? 'page' : undefined}>
              Terms of Service
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/your-data" className={footerLinkClass('your-data')} aria-current={currentPage === 'your-data' ? 'page' : undefined}>
              Your Data
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
