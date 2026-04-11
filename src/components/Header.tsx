import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface HeaderProps {
  scrolled: boolean
}

export default function Header({ scrolled }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const { user, signOut } = useAuth()
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
