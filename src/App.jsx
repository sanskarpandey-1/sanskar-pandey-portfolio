import React, { useState } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Resume from './components/Resume'
import TechStack from './components/TechStack'
import Education from './components/Education'
import Projects from './components/Projects'

import Preloader from './components/Preloader'
import Contact from './components/contact'

const App = () => {
  const [revealed, setRevealed] = useState(false)
  const [loaderDone, setLoaderDone] = useState(false)

  return (
    <div>
      <Hero key={revealed ? 'live' : 'idle'} />
      <div></div>
      <About />
      <Resume />
      <TechStack />
      <Education />
      <Projects />
      <Contact />

      {!loaderDone && (
        <Preloader
          onReveal={() => setRevealed(true)}
          onComplete={() => setLoaderDone(true)}
        />
      )}
    </div>
  )
}

export default App