const FEATURES = [
  {
    icon: '🤖',
    title: 'AI 페어 프로그래밍',
    desc: 'ChatGPT, Claude, Copilot 등 AI 도구와 함께 코딩합니다. 혼자 고민하지 마세요.',
  },
  {
    icon: '🚀',
    title: '아이디어 → 서비스',
    desc: '수업 첫날부터 실제 서비스를 만듭니다. 이론이 아닌 결과물 중심 교육.',
  },
  {
    icon: '🎯',
    title: '제로 베이스 OK',
    desc: '코딩 경험이 전혀 없어도 괜찮습니다. 프롬프트 작성법부터 시작합니다.',
  },
  {
    icon: '💼',
    title: '포트폴리오 완성',
    desc: '수료 후 나만의 웹 서비스 3개를 포트폴리오로 가져갑니다.',
  },
  {
    icon: '🧑‍🏫',
    title: '1:1 멘토링',
    desc: '현업 개발자 멘토가 매주 1:1로 코드 리뷰와 방향을 잡아줍니다.',
  },
  {
    icon: '🌐',
    title: '실제 배포까지',
    desc: '만든 서비스를 실제 도메인으로 배포합니다. 누구나 볼 수 있는 나만의 사이트.',
  },
]

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Why Vibe Coding?</span>
          <h2 className="section-title">바이브 코딩이 다른 이유</h2>
          <p className="section-desc">
            AI 시대에 맞는 완전히 새로운 코딩 교육 방식을 경험하세요
          </p>
        </div>

        <div className="about__grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="about__card">
              <div className="about__icon">{f.icon}</div>
              <h3 className="about__card-title">{f.title}</h3>
              <p className="about__card-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
