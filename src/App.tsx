import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DataHandlingPage from './components/legal/DataHandlingPage';
import PrivacyPage from './components/legal/PrivacyPage';
import TermsPage from './components/legal/TermsPage';
import NewLandingPage from './components/landing-pages/NewLandingPage';
import TagDebateLP from './components/landing-pages/TagDebateLP';

type LandingPageVariant = 'newLanding' | 'tagDebate';

function App() {
  const variant: LandingPageVariant = 'newLanding';

  const landingPage = variant === 'newLanding' ? <NewLandingPage /> : <TagDebateLP />;

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={landingPage} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/your-data" element={<DataHandlingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
