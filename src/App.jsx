import { useState } from 'react'
import './App.css'
import { } from './utils/dataLoader';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Education from './components/Education';

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
        </main>

      </div>
    </>
  )
}

export default App
