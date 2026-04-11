import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Curriculum from './components/Curriculum'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Header scrolled={scrolled} />
      <main>
        <Hero />
        <About />
        <Curriculum />
        <Process />
        <Portfolio />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
