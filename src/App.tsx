import './App.css'
import LandingPageDesign3 from './components/landing-pages/Design3'
import TagLanding from './components/landing-pages/LandingPage'

type DesignType = 'design1' | 'design2' | 'design3'

function App() {
  // Easy way to toggle designs - just change the component here
  // To add a new design, create Design3.tsx in components/landing-pages/ and import it
  const currentDesign: DesignType = 'design3'

  const designs = {
    design3: <TagLanding />,
  } as const

  const renderDesign = () => {
    return designs[currentDesign] || designs.design3
  }

  return (
    <div className="app-container">
      {renderDesign()}
    </div>
  )
}

export default App
