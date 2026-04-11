export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__logo">V</span>
            <span className="footer__name">VIBE CODING</span>
          </div>
          <div className="footer__links">
            <a href="https://www.dreamitbiz.com" target="_blank" rel="noopener noreferrer">DreamIT Biz</a>
            <a href="https://edu-hub.dreamitbiz.com" target="_blank" rel="noopener noreferrer">교육 허브</a>
            <a href="https://ai-hub.dreamitbiz.com" target="_blank" rel="noopener noreferrer">AI 허브</a>
          </div>
          <p className="footer__copy">&copy; {new Date().getFullYear()} VIBE CODING by DreamIT Biz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
