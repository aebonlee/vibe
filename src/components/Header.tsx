import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

interface HeaderProps {
  scrolled: boolean
}

export default function Header({ scrolled }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { mode, toggleTheme } = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    if (isHome) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/' + href
    }
  }

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <nav className="nav">
        <Link to="/" className="nav__logo" onClick={() => setOpen(false)}>
          <span className="nav__logo-icon">V</span>
          <span>VIBE CODING</span>
        </Link>

        <ul className={`nav__links${open ? ' nav__links--open' : ''}`}>
          <li>
            <a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>소개</a>
          </li>
          <li>
            <a href="#curriculum" onClick={(e) => handleAnchorClick(e, '#curriculum')}>커리큘럼</a>
          </li>
          <li>
            <Link to="/community" onClick={() => setOpen(false)}>커뮤니티</Link>
          </li>
          {user ? (
            <>
              <li>
                <span className="nav__user">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
              </li>
              <li>
                <button className="nav__cta nav__cta--outline" onClick={() => { signOut(); setOpen(false) }}>
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="nav__cta" onClick={() => setOpen(false)}>
                로그인
              </Link>
            </li>
          )}
        </ul>

        <button
          className="nav__theme-toggle"
          onClick={toggleTheme}
          aria-label={mode === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
        >
          {mode === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

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
