import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Practice from './pages/Practice'
import Challenge from './pages/Challenge'
import Register from './pages/Register'
import Result from './pages/Result'
import Ranking from './pages/Ranking'

function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [hash, pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/register" element={<Register />} />
        <Route path="/result" element={<Result />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
