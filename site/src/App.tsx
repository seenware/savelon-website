import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function LegalDevPlaceholder({
  title,
  liveUrl,
  buildPath,
}: {
  title: string
  liveUrl: string
  buildPath: string
}) {
  return (
    <main className="section">
      <div className="section-inner">
        <h1>{title}</h1>
        <p>The full legal page is generated as static HTML during build.</p>
        <p>
          For local preview, run a production build and open <code>{buildPath}</code>, or view
          the live page at{' '}
          <a href={liveUrl} target="_blank" rel="noreferrer">
            {liveUrl.replace('https://', '')}
          </a>
          .
        </p>
      </div>
    </main>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/privacy"
          element={<LegalDevPlaceholder title="Privacy Policy" buildPath="docs/privacy/index.html" liveUrl="https://savelon.com/privacy" />}
        />
        <Route
          path="/terms"
          element={<LegalDevPlaceholder title="Terms of Service" buildPath="docs/terms/index.html" liveUrl="https://savelon.com/terms" />}
        />
      </Routes>
    </>
  )
}

export default App
