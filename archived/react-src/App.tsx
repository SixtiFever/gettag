import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DataHandlingPage from './components/legal/DataHandlingPage';
import PrivacyPage from './components/legal/PrivacyPage';
import TermsPage from './components/legal/TermsPage';
import PipeLandingPage from './components/landing-pages/PipeLandingPage';

function App() {
  useEffect(() => {
    document.documentElement.dataset.prerenderReady = 'true';
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PipeLandingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/your-data" element={<DataHandlingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
