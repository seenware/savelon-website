import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { TermsOfServicePage } from './pages/TermsOfServicePage'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const location = useLocation()

  // #region agent log
  fetch('http://127.0.0.1:7633/ingest/4af41cf6-1d54-49b2-b57e-a978886c7a7e', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': '691e9a',
    },
    body: JSON.stringify({
      sessionId: '691e9a',
      runId: 'pre-fix',
      hypothesisId: 'H1',
      location: 'App.tsx:App',
      message: 'Render App with location',
      data: { pathname: location.pathname },
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion agent log

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
      </Routes>
    </>
  )
}

export default App
