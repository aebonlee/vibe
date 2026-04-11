import { useState } from 'react'

interface HeaderProps {
  scrolled: boolean
}

const NAV_ITEMS = [
  { label: '소개', href: '#about' },
  { label: '커리큘럼', href: '#curriculum' },
  { label: '진행방식', href: '#process' },
  { label: '포트폴리오', href: '#portfolio' },
]

export default function Header({ scrolled }: HeaderProps) {
  const [open, setOpen] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <nav className="nav">
        <a href="#" className="nav__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span className="nav__logo-icon">V</span>
          <span>VIBE CODING</span>
        </a>

        <ul className={`nav__links${open ? ' nav__links--open' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={(e) => handleClick(e, item.href)}>{item.label}</a>
            </li>
          ))}
          <li>
            <a
              href="https://forms.gle/Ddj742DqPZ5Eb8j79"
              target="_blank"
              rel="noopener noreferrer"
              className="nav__cta"
            >
              수강신청
            </a>
          </li>
        </ul>

        <button
          className="nav__hamburger"
          onClick={() => setOpen(!open)}
          aria-label="메뉴 열기"
        >
          <span className={`nav__hamburger-line${open ? ' open' : ''}`} />
          <span className={`nav__hamburger-line${open ? ' open' : ''}`} />
          <span className={`nav__hamburger-line${open ? ' open' : ''}`} />
        </button>
      </nav>
    </header>
  )
}
