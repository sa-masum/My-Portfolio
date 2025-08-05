import { useState } from 'react'
import './App.css'
import { } from './utils/dataLoader';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Education from './components/Education';
import Skills from './components/Skills';
import ProblemSolving from './components/ProblemSolving';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <Navbar />

        <main>
          {/* Home Section */}
          <Home />
          <Education />
          <Skills />
          <ProblemSolving />
          <Projects />
          <Contact />
        </main>

      </div>
    </>
  )
}

export default App
