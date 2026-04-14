import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMessageSquare, FiClock, FiChevronDown } from 'react-icons/fi';

export default function Footer(): React.ReactElement {
  const [familySiteOpen, setFamilySiteOpen] = useState<boolean>(false);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-company">
            <span style={{ color: '#F1F5F9' }}>Dream</span>
            <span style={{ background: 'linear-gradient(90deg, #A78BFA, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>IT</span>
            {' '}
            <span style={{ color: '#94A3B8' }}>Biz</span>
          </div>
          <h3>
            <span style={{ color: '#A78BFA' }}>VIBE</span>{' '}
            CODING
          </h3>
          <p>
            바이브코딩(Vibe Coding) 학습에 필요한 모든 것을 체계적으로 배울 수 있는 교육 플랫폼입니다.
            AI Cursor, Claude Code, Codex 등 최신 AI 코딩 도구를 실전에서 활용하는 방법을 다룹니다.
          </p>
          <div className="family-site">
            <button
              className="family-site-btn"
              onClick={() => setFamilySiteOpen(!familySiteOpen)}
            >
              Family Site <FiChevronDown size={14} style={{ transform: familySiteOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
            </button>
            {familySiteOpen && (
              <div className="family-site-dropdown open">
                <a href="https://www.dreamitbiz.com" target="_blank" rel="noopener noreferrer">DreamIT Biz</a>
                <a href="https://edu-hub.dreamitbiz.com" target="_blank" rel="noopener noreferrer">교육 허브</a>
                <a href="https://ai-hub.dreamitbiz.com" target="_blank" rel="noopener noreferrer">AI 허브</a>
                <a href="https://reactstudy.dreamitbiz.com" target="_blank" rel="noopener noreferrer">React Study</a>
                <a href="https://claude.dreamitbiz.com" target="_blank" rel="noopener noreferrer">Claude 학습</a>
              </div>
            )}
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="footer-links-grid">
            <Link to="/basics" className="footer-link">바이브코딩 기초</Link>
            <Link to="/cursor" className="footer-link">AI Cursor</Link>
            <Link to="/claude-code" className="footer-link">Claude Code</Link>
            <Link to="/codex" className="footer-link">Codex & Others</Link>
            <Link to="/projects" className="footer-link">실전 프로젝트</Link>
            <Link to="/qna" className="footer-link">Q&A</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4>연락처</h4>
          <div className="footer-contact-item">
            <FiMail size={14} />
            <span>aebon@dreamitbiz.com</span>
          </div>
          <div className="footer-contact-item">
            <FiPhone size={14} />
            <span>010-3700-0629</span>
          </div>
          <div className="footer-contact-item">
            <FiMessageSquare size={14} />
            <span>카카오톡: aebon</span>
          </div>
          <div className="footer-contact-item" style={{ marginTop: '4px', fontSize: '13px', opacity: 0.8 }}>
            <FiClock size={14} />
            <span>평일: 09:00 ~ 18:00</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="footer-bottom-item">&copy; 2025 드림아이티비즈(DreamIT Biz). All rights reserved.</span>
          <span className="footer-bottom-sep">|</span>
          <span className="footer-bottom-item">Designed by Ph.D Aebon Lee</span>
          <span className="footer-bottom-sep">|</span>
          <span className="footer-bottom-item">대표이사: 이애본</span>
          <span className="footer-bottom-sep">|</span>
          <span className="footer-bottom-item">사업자등록번호: 601-45-20154</span>
          <span className="footer-bottom-sep">|</span>
          <span className="footer-bottom-item">통신판매신고번호: 제2024-수원팔달-0584호</span>
          <span className="footer-bottom-sep">|</span>
          <span className="footer-bottom-item">출판사 신고번호: 제2026-000026호</span>
        </div>
      </div>
    </footer>
  );
}
