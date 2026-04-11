export default function CTA() {
  return (
    <section className="cta">
      <div className="cta__bg">
        <div className="cta__orb cta__orb--1" />
        <div className="cta__orb cta__orb--2" />
      </div>
      <div className="container">
        <div className="cta__content">
          <h2 className="cta__title">
            지금 시작하면,<br />
            <span>8주 후 당신은 개발자입니다</span>
          </h2>
          <p className="cta__desc">
            코딩 경험 제로에서 나만의 웹 서비스를 만들어 배포하기까지.<br />
            AI와 함께라면 누구나 가능합니다.
          </p>
          <div className="cta__actions">
            <a
              href="https://forms.gle/Ddj742DqPZ5Eb8j79"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--lg"
            >
              무료 체험 수업 신청하기
            </a>
          </div>
          <p className="cta__note">선착순 20명 | 매월 새 기수 모집</p>
        </div>
      </div>
    </section>
  )
}
