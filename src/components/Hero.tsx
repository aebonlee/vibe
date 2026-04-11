export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="hero__content">
        <div className="hero__badge">AI 시대의 새로운 코딩 교육</div>
        <h1 className="hero__title">
          아이디어만 있으면<br />
          <span className="hero__title--gradient">코드는 AI가 써줍니다</span>
        </h1>
        <p className="hero__desc">
          프롬프트로 대화하고, AI가 코드를 생성하고, 당신은 창작에 집중하세요.<br />
          바이브 코딩은 코딩의 진입장벽을 완전히 바꿉니다.
        </p>
        <div className="hero__actions">
          <a
            href="https://forms.gle/Ddj742DqPZ5Eb8j79"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
          >
            무료 체험 신청
          </a>
          <a href="#about" className="btn btn--outline" onClick={(e) => {
            e.preventDefault()
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            자세히 알아보기
          </a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <strong>500+</strong>
            <span>수강생</span>
          </div>
          <div className="hero__stat">
            <strong>98%</strong>
            <span>만족도</span>
          </div>
          <div className="hero__stat">
            <strong>50+</strong>
            <span>프로젝트</span>
          </div>
        </div>
      </div>

      <div className="hero__visual">
        <div className="hero__code-window">
          <div className="hero__code-header">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
            <span className="hero__code-title">vibe-project</span>
          </div>
          <div className="hero__code-body">
            <code>
              <span className="code-comment">{'// AI에게 요청하세요'}</span>{'\n'}
              <span className="code-keyword">prompt</span>:{' '}
              <span className="code-string">"쇼핑몰 메인 페이지를{'\n'}  반응형으로 만들어줘"</span>{'\n\n'}
              <span className="code-comment">{'// AI가 코드를 생성합니다'}</span>{'\n'}
              <span className="code-keyword">{'function'}</span>{' '}
              <span className="code-func">ShopMain</span>() {'{\n'}
              {'  '}<span className="code-keyword">return</span> {'<'}<span className="code-tag">Layout</span>{' />\n'}
              {'}'}
            </code>
          </div>
        </div>
      </div>
    </section>
  )
}
