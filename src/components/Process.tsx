const STEPS = [
  {
    num: '01',
    title: '아이디어 정리',
    desc: '만들고 싶은 서비스를 한 줄로 설명하세요. "나만의 TODO 앱", "동네 맛집 지도" 등',
    icon: '💡',
  },
  {
    num: '02',
    title: 'AI에게 요청',
    desc: '프롬프트로 AI에게 코드를 요청합니다. "로그인 페이지를 깔끔하게 만들어줘"',
    icon: '💬',
  },
  {
    num: '03',
    title: '코드 이해 & 수정',
    desc: 'AI가 생성한 코드를 이해하고, 원하는 대로 커스터마이징합니다.',
    icon: '🔧',
  },
  {
    num: '04',
    title: '배포 & 공유',
    desc: '완성된 서비스를 실제 인터넷에 배포하고, 세상에 공유합니다.',
    icon: '🌍',
  },
]

export default function Process() {
  return (
    <section id="process" className="process">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">How It Works</span>
          <h2 className="section-title">이렇게 진행됩니다</h2>
          <p className="section-desc">
            아이디어부터 배포까지, 4단계로 나만의 서비스를 만듭니다
          </p>
        </div>

        <div className="process__grid">
          {STEPS.map((s, i) => (
            <div key={i} className="process__card">
              <div className="process__num">{s.num}</div>
              <div className="process__icon">{s.icon}</div>
              <h3 className="process__card-title">{s.title}</h3>
              <p className="process__card-desc">{s.desc}</p>
              {i < STEPS.length - 1 && <div className="process__arrow" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
