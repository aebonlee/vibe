import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Curriculum from './components/Curriculum'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Login from './pages/Login'
import CommunityList from './pages/community/CommunityList'
import CommunityWrite from './pages/community/CommunityWrite'
import CommunityView from './pages/community/CommunityView'
import ProtectedRoute from './components/ProtectedRoute'

function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Curriculum />
      <Process />
      <Portfolio />
      <CTA />
    </main>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <Header scrolled={scrolled} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/community" element={<CommunityList />} />
              <Route path="/community/write" element={
                <ProtectedRoute><CommunityWrite /></ProtectedRoute>
              } />
              <Route path="/community/:id" element={<CommunityView />} />
            </Routes>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
