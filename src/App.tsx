import './App.css'
import NewLandingPage from './components/landing-pages/NewLandingPage'
import TagDebateLP from './components/landing-pages/TagDebateLP'

type LandingPageVariant = 'newLanding' | 'tagDebate'

function App() {
  const variant: LandingPageVariant = 'newLanding'

  const pages = {
    newLanding: <NewLandingPage />,
    tagDebate: <TagDebateLP />,
  } as const

  return (
    <div className="app-container">
      {pages[variant]}
    </div>
  )
}

export default App
