import './App.css'
import LandingPageDesign1 from './components/landing-pages/Design1'
import LandingPageDesign2 from './components/landing-pages/Design2'
import LandingPageDesign3 from './components/landing-pages/Design3'

type DesignType = 'design1' | 'design2' | 'design3'

function App() {
  // Easy way to toggle designs - just change the component here
  // To add a new design, create Design3.tsx in components/landing-pages/ and import it
  const currentDesign: DesignType = 'design3'

  const designs = {
    design1: <LandingPageDesign1 />,
    design2: <LandingPageDesign2 />,
    design3: <LandingPageDesign3 />,
  } as const

  const renderDesign = () => {
    return designs[currentDesign] || designs.design1
  }

  return (
    <div className="app-container">
      {renderDesign()}
    </div>
  )
}

export default App
