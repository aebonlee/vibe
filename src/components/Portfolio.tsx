const PROJECTS = [
  {
    title: '커뮤니티 플랫폼',
    category: 'Web App',
    desc: 'Supabase 기반 실시간 커뮤니티',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    title: 'AI 챗봇 서비스',
    category: 'AI',
    desc: 'ChatGPT API 활용 고객상담 봇',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    title: '맛집 추천 지도',
    category: 'Web App',
    desc: '위치 기반 맛집 큐레이션 서비스',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    title: '포트폴리오 사이트',
    category: 'Design',
    desc: '개인 브랜딩을 위한 반응형 사이트',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    title: 'Todo & 습관 트래커',
    category: 'Web App',
    desc: '일정 관리와 습관 형성 도우미',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    title: '온라인 쇼핑몰',
    category: 'E-Commerce',
    desc: '결제 연동 포함 풀스택 쇼핑몰',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">수강생 프로젝트</h2>
          <p className="section-desc">
            8주 과정을 마친 수강생들의 실제 결과물입니다
          </p>
        </div>

        <div className="portfolio__grid">
          {PROJECTS.map((p, i) => (
            <div key={i} className="portfolio__card">
              <div className="portfolio__preview" style={{ background: p.gradient }}>
                <span className="portfolio__badge">{p.category}</span>
              </div>
              <div className="portfolio__info">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
