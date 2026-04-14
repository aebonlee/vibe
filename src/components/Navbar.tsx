import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
  path: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/basics', label: '기초' },
  { path: '/cursor', label: 'Cursor' },
  { path: '/claude-code', label: 'Claude Code' },
  { path: '/codex', label: 'Codex' },
  { path: '/projects', label: '프로젝트' },
  { path: '/qna', label: 'Q&A' },
  { path: '/education', label: '교육과정' },
  { path: '/prompt-lab', label: '프롬프트 LAB' },
  { path: '/community', label: '커뮤니티' },
];

const colorMap: Record<string, string> = {
  purple: '#7C3AED',
  blue: '#0046C8',
  red: '#DC2626',
  green: '#059669',
  orange: '#EA580C',
};

export default function Navbar(): React.ReactElement {
  const location = useLocation();
  const { isDark, toggleTheme, colorTheme, setColorTheme, COLORS, setSearchOpen, setMobileMenuOpen } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-main">VIBE</span>
          <span className="brand-accent">CODING</span>
          <span className="brand-sub">바이브코딩</span>
        </Link>

        <div className="navbar-links">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <button className="nav-action-btn" onClick={() => setSearchOpen(true)} title="검색 (Ctrl+K)">
            <FiSearch />
          </button>

          <button className="nav-action-btn" onClick={toggleTheme} title={isDark ? '라이트 모드' : '다크 모드'}>
            {isDark ? <FiSun /> : <FiMoon />}
          </button>

          <div className="color-picker">
            {COLORS.map(color => (
              <button
                key={color}
                className={`color-dot ${colorTheme === color ? 'active' : ''}`}
                style={{ background: colorMap[color] || '#0046C8' }}
                onClick={() => setColorTheme(color)}
                title={color}
              />
            ))}
          </div>

          {user ? (
            <>
              <span className="nav-user-name">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
              <button className="nav-auth-btn nav-auth-btn--logout" onClick={signOut}>로그아웃</button>
            </>
          ) : (
            <Link to="/login" className="nav-auth-btn nav-auth-btn--login">로그인</Link>
          )}

          <button className="hamburger-btn" onClick={() => setMobileMenuOpen(true)}>
            <FiMenu />
          </button>
        </div>
      </div>
    </nav>
  );
}

export { navItems };
export type { NavItem };
