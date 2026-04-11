const WEEKS = [
  {
    week: 'Week 1-2',
    title: 'AI 코딩 기초',
    topics: ['프롬프트 엔지니어링 기초', 'ChatGPT / Claude 활용법', 'HTML·CSS 핵심 이해', '첫 웹페이지 만들기'],
    color: '#7C3AED',
  },
  {
    week: 'Week 3-4',
    title: 'JavaScript & React',
    topics: ['JavaScript 핵심 문법', 'React 컴포넌트 설계', 'AI로 UI 빠르게 생성', '인터랙티브 웹앱 제작'],
    color: '#06B6D4',
  },
  {
    week: 'Week 5-6',
    title: '풀스택 개발',
    topics: ['데이터베이스 연동 (Supabase)', '사용자 인증 시스템', 'API 설계 및 연동', '결제·알림 기능 구현'],
    color: '#10B981',
  },
  {
    week: 'Week 7-8',
    title: '프로젝트 & 배포',
    topics: ['개인 프로젝트 기획', 'AI 활용 빠른 개발', '실제 도메인 배포', '포트폴리오 발표회'],
    color: '#F59E0B',
  },
]

export default function Curriculum() {
  return (
    <section id="curriculum" className="curriculum">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Curriculum</span>
          <h2 className="section-title">8주 완성 커리큘럼</h2>
          <p className="section-desc">
            체계적인 로드맵으로 AI 코딩 역량을 단계별로 쌓아갑니다
          </p>
        </div>

        <div className="curriculum__timeline">
          {WEEKS.map((w, i) => (
            <div key={i} className="curriculum__item">
              <div className="curriculum__marker" style={{ background: w.color }}>
                <span>{i + 1}</span>
              </div>
              <div className="curriculum__card">
                <span className="curriculum__week" style={{ color: w.color }}>{w.week}</span>
                <h3 className="curriculum__card-title">{w.title}</h3>
                <ul className="curriculum__topics">
                  {w.topics.map((t, j) => (
                    <li key={j}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
