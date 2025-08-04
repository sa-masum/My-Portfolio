import { useState } from 'react'
import './App.css'
import { } from './utils/dataLoader';
import Navbar from './components/Navbar';
import Home from './components/Home';

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
        </main>

      </div>
    </>
  )
}

export default App
