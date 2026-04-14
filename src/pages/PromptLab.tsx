import React, { useState, useCallback } from 'react';
import Hero from '../components/Hero';
import CodeBlock from '../components/CodeBlock';
import { promptLabTopics } from '../data/learningData';
import type { Topic, ContentSection } from '../data/learningData';

// ===== Types =====
interface CriteriaScore {
  label: string;
  score: number;
  max: number;
  feedback: string;
  tip: string;
}

interface EvalResult {
  total: number;
  grade: string;
  gradeColor: string;
  criteria: CriteriaScore[];
  timestamp: number;
  prompt: string;
  scenarioTitle?: string;
}

interface Scenario {
  id: string;
  title: string;
  category: string;
  icon: string;
  mission: string;
  hint: string;
}

// ===== Grading Logic =====
const VAGUE_WORDS = ['뭔가', '적당히', '좀', '대충', '아무거나', '그냥', '알아서', '적절하게', '어떤'];
const TECH_KEYWORDS = [
  'react', 'typescript', 'javascript', 'python', 'java', 'html', 'css', 'vue', 'angular', 'next',
  'node', 'express', 'supabase', 'firebase', 'mongodb', 'postgresql', 'mysql', 'redis',
  'docker', 'github', 'git', 'api', 'rest', 'graphql', 'json', 'xml', 'webpack', 'vite',
  'tailwind', 'scss', 'sass', 'vercel', 'aws', 'gcp', 'azure', 'linux', 'nginx',
  'useState', 'useEffect', 'useCallback', 'useMemo', 'useRef', 'useContext',
  'component', 'hook', 'state', 'props', 'interface', 'type', 'async', 'await',
  'fetch', 'axios', 'npm', 'yarn', 'pnpm', 'bun', 'tsx', 'jsx',
];
const CONTEXT_KEYWORDS = [
  '환경', '프로젝트', '기술스택', '프레임워크', '버전', '라이브러리', '플랫폼',
  '운영체제', '브라우저', '서버', '클라이언트', '프론트엔드', '백엔드', '풀스택',
  '데이터베이스', '배포', '개발', '운영', '테스트', '스테이징',
];
const FORMAT_KEYWORDS = [
  '코드로', '표로', 'JSON', 'json', '마크다운', 'markdown', '목록으로', '리스트로',
  '형태로', '형식으로', '포맷으로', '구조로', 'TypeScript', 'typescript', '예시로',
  '다이어그램', '주석', '설명과 함께', '코드 블록',
];
const CONSTRAINT_KEYWORDS = [
  '하지 마', '하지마', '없이', '만 사용', '만사용', '최대', '최소', '이내',
  '반드시', '필수', '금지', '제외', '제한', '이하', '이상', '까지만',
  '~만', '오직', '절대', '불가',
];
const STEP_KEYWORDS = [
  '1.', '2.', '3.', '4.', '5.', '첫째', '둘째', '셋째', '먼저', '그 다음',
  '그다음', '마지막으로', '단계별', '순서대로', '다음으로', '이후에', '그리고 나서',
  '첫 번째', '두 번째', '세 번째',
];
const ROLE_KEYWORDS = [
  '역할로', '전문가로서', '처럼', '관점에서', '입장에서', '로서',
  '시니어', '주니어', '리뷰어', '아키텍트', '디자이너', '멘토',
  '선생님', '코치', '컨설턴트', 'expert', 'senior',
];

function countMatches(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  return keywords.filter(kw => lower.includes(kw.toLowerCase())).length;
}

function gradePrompt(text: string): CriteriaScore[] {
  const len = text.trim().length;

  // 1. Clarity
  const vagueCount = countMatches(text, VAGUE_WORDS);
  let clarityScore = 0;
  if (len >= 50 && len <= 500) clarityScore = 12;
  else if (len >= 30 && len <= 700) clarityScore = 8;
  else if (len >= 10) clarityScore = 4;
  clarityScore = Math.max(0, clarityScore - vagueCount * 3);
  if (text.includes('?') || text.includes('.') || text.includes('해줘') || text.includes('해주세요') || text.includes('작성')) clarityScore = Math.min(15, clarityScore + 3);

  // 2. Specificity
  const techCount = countMatches(text, TECH_KEYWORDS);
  const hasNumbers = /\d+/.test(text);
  const hasFileNames = /\.\w{2,4}/.test(text) || /[A-Z][a-z]+\.[A-Z]/.test(text);
  let specificScore = Math.min(15, techCount * 3 + (hasNumbers ? 3 : 0) + (hasFileNames ? 3 : 0));

  // 3. Context
  const contextCount = countMatches(text, CONTEXT_KEYWORDS);
  const techContextCount = countMatches(text, TECH_KEYWORDS);
  let contextScore = Math.min(15, contextCount * 4 + Math.min(techContextCount, 3) * 2);

  // 4. Format
  const formatCount = countMatches(text, FORMAT_KEYWORDS);
  let formatScore = Math.min(15, formatCount * 5);

  // 5. Constraints
  const constraintCount = countMatches(text, CONSTRAINT_KEYWORDS);
  let constraintScore = Math.min(15, constraintCount * 5);

  // 6. Steps
  const stepCount = countMatches(text, STEP_KEYWORDS);
  let stepScore = Math.min(15, stepCount * 4);

  // 7. Role
  const roleCount = countMatches(text, ROLE_KEYWORDS);
  let roleScore = Math.min(10, roleCount * 5);

  return [
    { label: '명확성', score: clarityScore, max: 15, feedback: clarityScore >= 12 ? '의도가 명확합니다!' : clarityScore >= 8 ? '조금 더 명확하게 표현하면 좋겠습니다.' : '모호한 표현을 줄이고 구체적으로 작성하세요.', tip: '적절한 길이(50~500자)를 유지하고, "뭔가", "적당히" 같은 표현을 피하세요.' },
    { label: '구체성', score: specificScore, max: 15, feedback: specificScore >= 12 ? '구체적인 정보가 잘 포함되어 있습니다!' : specificScore >= 8 ? '기술 키워드나 구체적 수치를 더 추가해보세요.' : '기술명, 파일명, 숫자 등 구체적 정보를 포함하세요.', tip: 'React, TypeScript 등 기술 키워드와 파일명, 숫자를 포함하세요.' },
    { label: '맥락 제공', score: contextScore, max: 15, feedback: contextScore >= 12 ? '충분한 맥락 정보를 제공하고 있습니다!' : contextScore >= 8 ? '개발 환경이나 프로젝트 배경을 더 추가하면 좋겠습니다.' : '기술스택, 환경, 배경 정보를 포함하세요.', tip: '"React 19 + Vite 환경에서", "기존 프로젝트에 추가" 등의 맥락을 제공하세요.' },
    { label: '출력 형식', score: formatScore, max: 15, feedback: formatScore >= 10 ? '원하는 출력 형식이 잘 지정되어 있습니다!' : formatScore >= 5 ? '출력 형식을 더 명확히 지정하면 좋겠습니다.' : '원하는 결과의 형태를 지정하세요.', tip: '"코드로 작성해줘", "표로 정리해줘", "JSON 형태로" 등을 추가하세요.' },
    { label: '제약조건', score: constraintScore, max: 15, feedback: constraintScore >= 10 ? '적절한 제약조건이 포함되어 있습니다!' : constraintScore >= 5 ? '제한사항을 더 명시하면 품질이 올라갑니다.' : '제약조건이 없습니다. 제한사항을 추가하세요.', tip: '"~하지 마", "최대 N줄", "반드시 ~해" 등의 제약을 추가하세요.' },
    { label: '단계적 지시', score: stepScore, max: 15, feedback: stepScore >= 10 ? '단계별 지시가 잘 되어 있습니다!' : stepScore >= 5 ? '복잡한 작업은 단계를 나누면 좋습니다.' : '순차적 지시가 없습니다. 단계를 나누어 보세요.', tip: '"1. 먼저 ~", "2. 그 다음 ~" 형태로 단계를 나누세요.' },
    { label: '역할 부여', score: roleScore, max: 10, feedback: roleScore >= 7 ? '역할 부여가 잘 되어 있습니다!' : roleScore >= 3 ? 'AI에게 역할을 더 명확히 지정하면 좋겠습니다.' : '역할 부여가 없습니다. 페르소나를 지정해보세요.', tip: '"시니어 개발자로서", "코드 리뷰어 역할로" 등의 역할을 부여하세요.' },
  ];
}

function getGrade(total: number): { grade: string; color: string } {
  if (total >= 90) return { grade: 'S', color: '#D4A017' };
  if (total >= 80) return { grade: 'A', color: 'var(--primary)' };
  if (total >= 70) return { grade: 'B', color: '#059669' };
  if (total >= 60) return { grade: 'C', color: '#EA580C' };
  return { grade: 'D', color: '#DC2626' };
}

// ===== Scenarios =====
const scenarios: Scenario[] = [
  { id: 'code-gen', title: '코드 생성', category: '기능 구현', icon: '💻', mission: 'React + TypeScript로 할 일 목록(Todo) 앱의 핵심 기능을 구현하는 프롬프트를 작성하세요. 추가, 삭제, 완료 토글, 필터링 기능이 포함되어야 합니다.', hint: '기술스택, 컴포넌트 구조, 상태 관리 방식을 명시하면 좋습니다.' },
  { id: 'bug-fix', title: '버그 수정', category: '디버깅', icon: '🐛', mission: 'React 컴포넌트에서 무한 렌더링이 발생하는 버그를 수정하도록 AI에게 요청하는 프롬프트를 작성하세요. useEffect 의존성 배열 문제가 원인입니다.', hint: '에러 상황, 예상 동작, 현재 동작을 구체적으로 설명하세요.' },
  { id: 'refactor', title: '리팩토링', category: '코드 개선', icon: '🔧', mission: '500줄짜리 모놀리식 React 컴포넌트를 작은 단위로 분리하도록 AI에게 요청하는 프롬프트를 작성하세요.', hint: '분리 기준(관심사, 재사용성), 원하는 구조, 제약조건을 포함하세요.' },
  { id: 'api', title: 'API 연동', category: '백엔드 연동', icon: '🔗', mission: 'Supabase를 사용하여 게시판 CRUD API를 구현하는 프롬프트를 작성하세요. 인증된 사용자만 작성/수정/삭제가 가능해야 합니다.', hint: '테이블 구조, RLS 정책, 에러 처리 방식을 명시하세요.' },
  { id: 'test', title: '테스트 작성', category: '품질 보증', icon: '🧪', mission: '로그인 폼 컴포넌트의 단위 테스트를 작성하도록 AI에게 요청하는 프롬프트를 작성하세요. 정상 케이스와 에러 케이스를 모두 포함해야 합니다.', hint: '테스트 프레임워크, 테스트 케이스 목록, 모킹 전략을 포함하세요.' },
];

// ===== Radar Chart SVG =====
function RadarChart({ criteria }: { criteria: CriteriaScore[] }): React.ReactElement {
  const cx = 150, cy = 150, r = 110;
  const n = criteria.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, ratio: number): { x: number; y: number } => {
    const angle = startAngle + index * angleStep;
    return { x: cx + r * ratio * Math.cos(angle), y: cy + r * ratio * Math.sin(angle) };
  };

  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const gridPaths = gridLevels.map(level => {
    const points = criteria.map((_, i) => getPoint(i, level));
    return points.map(p => `${p.x},${p.y}`).join(' ');
  });

  const dataPoints = criteria.map((c, i) => getPoint(i, c.score / c.max));
  const dataPath = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  const axisLines = criteria.map((_, i) => {
    const p = getPoint(i, 1);
    return { x1: cx, y1: cy, x2: p.x, y2: p.y };
  });

  const labels = criteria.map((c, i) => {
    const p = getPoint(i, 1.22);
    return { x: p.x, y: p.y, text: c.label };
  });

  return (
    <svg viewBox="0 0 300 300" className="radar-chart">
      {gridPaths.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="var(--border-color)" strokeWidth="0.8" opacity={0.5} />
      ))}
      {axisLines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="var(--border-color)" strokeWidth="0.5" opacity={0.4} />
      ))}
      <polygon points={dataPath} fill="rgba(var(--primary-rgb), 0.2)" stroke="var(--primary)" strokeWidth="2" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--primary)" />
      ))}
      {labels.map((l, i) => (
        <text key={i} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle" fill="var(--text-secondary)" fontSize="11" fontWeight="600">
          {l.text}
        </text>
      ))}
    </svg>
  );
}

// ===== Sidebar Menus =====
type MenuKey = 'criteria' | 'examples' | 'free' | 'scenario' | 'history';

const sidebarMenus: { key: MenuKey; label: string; icon: string }[] = [
  { key: 'criteria', label: '평가 기준 학습', icon: '📏' },
  { key: 'examples', label: '좋은/나쁜 예시', icon: '✅' },
  { key: 'free', label: '자유 실습', icon: '✍️' },
  { key: 'scenario', label: '시나리오 실습', icon: '🎯' },
  { key: 'history', label: '평가 히스토리', icon: '📊' },
];

// ===== Topic Viewer (reusable for criteria & examples) =====
function TopicViewer({ topic }: { topic: Topic }): React.ReactElement {
  return (
    <div className="topic-card">
      <div className="topic-card-header">
        <div className="topic-card-icon">{topic.icon}</div>
        <div className="topic-card-title">{topic.title}</div>
      </div>
      <div className="topic-card-body">
        <p>{topic.description}</p>
        {topic.content.map((section: ContentSection, idx: number) => (
          <div key={idx}>
            {section.subtitle && <h4>{section.subtitle}</h4>}
            {section.text && <p>{section.text}</p>}
            {section.items && (
              <ul>
                {section.items.map((item: string, j: number) => <li key={j}>{item}</li>)}
              </ul>
            )}
          </div>
        ))}
        {topic.code && <CodeBlock code={topic.code} language={topic.codeLang || 'javascript'} />}
      </div>
    </div>
  );
}

// ===== Score Result Component =====
function ScoreResult({ result, prevResult }: { result: EvalResult; prevResult?: EvalResult }): React.ReactElement {
  return (
    <div className="score-result">
      <div className="score-result-header">
        <div className="score-total">
          <span className="score-number">{result.total}</span>
          <span className="score-max">/100</span>
        </div>
        <span className="score-badge" style={{ background: result.gradeColor }}>
          {result.grade}
        </span>
        {prevResult && (
          <div className="score-comparison">
            <span className="score-comparison-label">이전</span>
            <span className="score-comparison-prev">{prevResult.total}점</span>
            <span className="score-comparison-arrow">→</span>
            <span className="score-comparison-curr">{result.total}점</span>
            <span className={`score-comparison-diff ${result.total >= prevResult.total ? 'up' : 'down'}`}>
              ({result.total >= prevResult.total ? '+' : ''}{result.total - prevResult.total})
            </span>
          </div>
        )}
      </div>

      <RadarChart criteria={result.criteria} />

      <div className="score-details">
        {result.criteria.map((c, i) => (
          <div key={i} className="score-detail">
            <div className="score-detail-header">
              <span className="score-detail-label">{c.label}</span>
              <span className="score-detail-value">{c.score}/{c.max}</span>
            </div>
            <div className="score-detail-bar">
              <div className="score-detail-fill" style={{ width: `${(c.score / c.max) * 100}%` }} />
            </div>
            <p className="score-detail-feedback">{c.feedback}</p>
            {c.score < c.max * 0.7 && <p className="score-detail-tip">💡 {c.tip}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Main Component =====
export default function PromptLab(): React.ReactElement {
  const [activeMenu, setActiveMenu] = useState<MenuKey>('criteria');
  const [promptText, setPromptText] = useState('');
  const [currentResult, setCurrentResult] = useState<EvalResult | null>(null);
  const [prevResult, setPrevResult] = useState<EvalResult | null>(null);
  const [history, setHistory] = useState<EvalResult[]>([]);
  const [isEditing, setIsEditing] = useState(true);
  // Scenario
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [scenarioPrompt, setScenarioPrompt] = useState('');
  const [scenarioResult, setScenarioResult] = useState<EvalResult | null>(null);
  const [scenarioPrevResult, setScenarioPrevResult] = useState<EvalResult | null>(null);
  const [scenarioEditing, setScenarioEditing] = useState(true);

  const evaluatePrompt = useCallback((text: string, scenarioTitle?: string): EvalResult => {
    const criteria = gradePrompt(text);
    const total = criteria.reduce((s, c) => s + c.score, 0);
    const { grade, color } = getGrade(total);
    return { total, grade, gradeColor: color, criteria, timestamp: Date.now(), prompt: text, scenarioTitle };
  }, []);

  const handleEvaluate = (): void => {
    if (!promptText.trim()) return;
    const result = evaluatePrompt(promptText);
    if (currentResult) setPrevResult(currentResult);
    setCurrentResult(result);
    setHistory(prev => [result, ...prev]);
    setIsEditing(false);
  };

  const handleRetry = (): void => {
    setIsEditing(true);
  };

  const handleScenarioEvaluate = (): void => {
    if (!scenarioPrompt.trim() || !selectedScenario) return;
    const result = evaluatePrompt(scenarioPrompt, selectedScenario.title);
    if (scenarioResult) setScenarioPrevResult(scenarioResult);
    setScenarioResult(result);
    setHistory(prev => [result, ...prev]);
    setScenarioEditing(false);
  };

  const handleScenarioRetry = (): void => {
    setScenarioEditing(true);
  };

  const handleSelectScenario = (sc: Scenario): void => {
    setSelectedScenario(sc);
    setScenarioPrompt('');
    setScenarioResult(null);
    setScenarioPrevResult(null);
    setScenarioEditing(true);
  };

  const renderContent = (): React.ReactElement => {
    switch (activeMenu) {
      case 'criteria':
        return <TopicViewer topic={promptLabTopics[0]} />;

      case 'examples':
        return <TopicViewer topic={promptLabTopics[1]} />;

      case 'free':
        return (
          <div className="topic-card">
            <div className="topic-card-header">
              <div className="topic-card-icon">✍️</div>
              <div className="topic-card-title">자유 실습</div>
            </div>
            <div className="topic-card-body">
              <p>자유롭게 프롬프트를 작성하고, 7가지 기준으로 자동 채점 받으세요. 수정 후 재평가하여 점수 변화를 확인할 수 있습니다.</p>
              {isEditing ? (
                <div className="prompt-practice">
                  <textarea
                    className="prompt-textarea"
                    value={promptText}
                    onChange={e => setPromptText(e.target.value)}
                    placeholder="AI에게 보낼 프롬프트를 작성하세요...&#10;&#10;예: 시니어 React 개발자로서, TypeScript 환경에서 사용자 인증 컴포넌트를 만들어줘..."
                    rows={8}
                  />
                  <div className="prompt-actions">
                    <span className="prompt-char-count">{promptText.length}자</span>
                    <button className="prompt-eval-btn" onClick={handleEvaluate} disabled={!promptText.trim()}>
                      평가하기
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="prompt-practice">
                    <div className="prompt-submitted">
                      <strong>작성한 프롬프트:</strong>
                      <p>{currentResult?.prompt}</p>
                    </div>
                    <button className="prompt-retry-btn" onClick={handleRetry}>수정하기</button>
                  </div>
                  {currentResult && <ScoreResult result={currentResult} prevResult={prevResult ?? undefined} />}
                </>
              )}
            </div>
          </div>
        );

      case 'scenario':
        return (
          <div className="topic-card">
            <div className="topic-card-header">
              <div className="topic-card-icon">🎯</div>
              <div className="topic-card-title">시나리오 실습</div>
            </div>
            <div className="topic-card-body">
              <p>주어진 미션에 맞는 프롬프트를 작성하고 채점 받으세요. 실전 상황별 프롬프트 작성 연습입니다.</p>

              {!selectedScenario ? (
                <div className="scenario-grid">
                  {scenarios.map(sc => (
                    <button key={sc.id} className="scenario-card" onClick={() => handleSelectScenario(sc)}>
                      <div className="scenario-card-icon">{sc.icon}</div>
                      <div className="scenario-card-title">{sc.title}</div>
                      <div className="scenario-card-category">{sc.category}</div>
                      <div className="scenario-card-mission">{sc.mission.slice(0, 60)}...</div>
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <div className="scenario-mission-box">
                    <div className="scenario-mission-header">
                      <span className="scenario-mission-icon">{selectedScenario.icon}</span>
                      <span className="scenario-mission-title">{selectedScenario.title} 미션</span>
                      <button className="scenario-back-btn" onClick={() => setSelectedScenario(null)}>목록으로</button>
                    </div>
                    <p className="scenario-mission-text">{selectedScenario.mission}</p>
                    <p className="scenario-mission-hint">💡 힌트: {selectedScenario.hint}</p>
                  </div>

                  {scenarioEditing ? (
                    <div className="prompt-practice">
                      <textarea
                        className="prompt-textarea"
                        value={scenarioPrompt}
                        onChange={e => setScenarioPrompt(e.target.value)}
                        placeholder="미션에 맞는 프롬프트를 작성하세요..."
                        rows={8}
                      />
                      <div className="prompt-actions">
                        <span className="prompt-char-count">{scenarioPrompt.length}자</span>
                        <button className="prompt-eval-btn" onClick={handleScenarioEvaluate} disabled={!scenarioPrompt.trim()}>
                          평가하기
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="prompt-practice">
                        <div className="prompt-submitted">
                          <strong>작성한 프롬프트:</strong>
                          <p>{scenarioResult?.prompt}</p>
                        </div>
                        <button className="prompt-retry-btn" onClick={handleScenarioRetry}>수정하기</button>
                      </div>
                      {scenarioResult && <ScoreResult result={scenarioResult} prevResult={scenarioPrevResult ?? undefined} />}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="topic-card">
            <div className="topic-card-header">
              <div className="topic-card-icon">📊</div>
              <div className="topic-card-title">평가 히스토리</div>
            </div>
            <div className="topic-card-body">
              <p>이번 세션에서의 프롬프트 실습 이력입니다. 점수 변화를 추적하여 성장 과정을 확인하세요.</p>
              {history.length === 0 ? (
                <div className="history-empty">
                  <p>아직 평가 이력이 없습니다.</p>
                  <p>자유 실습 또는 시나리오 실습에서 프롬프트를 평가해보세요!</p>
                </div>
              ) : (
                <div className="history-list">
                  {history.map((item, i) => (
                    <div key={i} className="history-item">
                      <div className="history-item-header">
                        <span className="score-badge" style={{ background: item.gradeColor, fontSize: '0.85rem', padding: '2px 10px' }}>
                          {item.grade}
                        </span>
                        <span className="history-item-score">{item.total}점</span>
                        {item.scenarioTitle && <span className="history-item-tag">{item.scenarioTitle}</span>}
                        <span className="history-item-time">{new Date(item.timestamp).toLocaleTimeString('ko-KR')}</span>
                      </div>
                      <p className="history-item-prompt">{item.prompt.length > 120 ? item.prompt.slice(0, 120) + '...' : item.prompt}</p>
                      <div className="history-item-criteria">
                        {item.criteria.map((c, j) => (
                          <span key={j} className="history-criteria-chip">
                            {c.label} {c.score}/{c.max}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Hero
        title="프롬프트 LAB"
        subtitle="프롬프트 작성 기준을 학습하고, 자동 채점으로 실력을 키워보세요. 수정 → 재평가 반복으로 프롬프트 엔지니어링을 마스터합니다."
      />

      <div className="sidebar-layout">
        <aside className="sidebar">
          <nav className="sidebar-menu">
            {sidebarMenus.map(menu => (
              <button
                key={menu.key}
                className={`sidebar-item${activeMenu === menu.key ? ' active' : ''}`}
                onClick={() => setActiveMenu(menu.key)}
              >
                <span style={{ marginRight: 8 }}>{menu.icon}</span>
                {menu.label}
              </button>
            ))}
          </nav>
        </aside>
        <div className="sidebar-content">
          {renderContent()}
        </div>
      </div>
    </>
  );
}
