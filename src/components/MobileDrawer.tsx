import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { navItems } from './Navbar';

export default function MobileDrawer(): React.ReactElement | null {
  const { mobileMenuOpen, setMobileMenuOpen } = useTheme();
  const location = useLocation();
  const { user, signOut } = useAuth();

  if (!mobileMenuOpen) return null;

  const handleSignOut = (): void => {
    signOut();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
      <div className="mobile-drawer">
        <div className="mobile-drawer-header">
          <span style={{ fontWeight: 700, fontSize: 18 }}>메뉴</span>
          <button className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)}>
            <FiX />
          </button>
        </div>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <div className="mobile-drawer-divider" />
        {user ? (
          <>
            <div style={{ padding: '8px 16px', fontSize: 14, color: 'var(--primary-light)', fontWeight: 600 }}>
              {user.user_metadata?.full_name || user.email?.split('@')[0]}
            </div>
            <button
              className="mobile-nav-link"
              onClick={handleSignOut}
              style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-family)' }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className={`mobile-nav-link ${location.pathname === '/login' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            로그인
          </Link>
        )}
      </div>
    </>
  );
}
