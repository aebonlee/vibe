// ============================================================
// VIBE CODING - 학습 콘텐츠 데이터
// ============================================================

// ===== 타입 정의 =====
export interface SearchItem {
  title: string;
  category: string;
  path: string;
  icon: string;
}

export interface ContentSection {
  subtitle?: string;
  text?: string;
  items?: string[];
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  description: string;
  content: ContentSection[];
  code: string;
  codeLang: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EducationCourse {
  id: string;
  level: string;
  title: string;
  description: string;
  topics: string[];
}

// ===== 1. 검색 데이터 =====
export const searchData: SearchItem[] = [
  // 바이브코딩 기초
  { title: '바이브코딩 개념', category: '바이브코딩 기초', path: '/basics', icon: '🎵' },
  { title: 'AI 코딩 도구 소개', category: '바이브코딩 기초', path: '/basics', icon: '🤖' },
  { title: '프롬프트 엔지니어링', category: '바이브코딩 기초', path: '/basics', icon: '💬' },
  { title: '코드 리뷰와 이해', category: '바이브코딩 기초', path: '/basics', icon: '🔍' },
  { title: 'AI 코딩 워크플로우', category: '바이브코딩 기초', path: '/basics', icon: '🔄' },
  { title: '개발 환경 설정', category: '바이브코딩 기초', path: '/basics', icon: '⚙️' },
  // AI Cursor
  { title: 'Cursor IDE 설치', category: 'AI Cursor', path: '/cursor', icon: '📦' },
  { title: 'Tab 자동완성', category: 'AI Cursor', path: '/cursor', icon: '⌨️' },
  { title: 'Cmd+K 인라인 편집', category: 'AI Cursor', path: '/cursor', icon: '✏️' },
  { title: 'Chat & Composer', category: 'AI Cursor', path: '/cursor', icon: '💭' },
  { title: 'Rules 설정', category: 'AI Cursor', path: '/cursor', icon: '📋' },
  { title: '멀티파일 편집', category: 'AI Cursor', path: '/cursor', icon: '📂' },
  // Claude Code
  { title: 'CLI 설치 및 설정', category: 'Claude Code', path: '/claude-code', icon: '🖥️' },
  { title: '에이전틱 코딩', category: 'Claude Code', path: '/claude-code', icon: '🤖' },
  { title: 'CLAUDE.md 활용', category: 'Claude Code', path: '/claude-code', icon: '📄' },
  { title: 'MCP 서버', category: 'Claude Code', path: '/claude-code', icon: '🔌' },
  { title: '멀티파일 작업', category: 'Claude Code', path: '/claude-code', icon: '📁' },
  { title: '프로젝트 관리', category: 'Claude Code', path: '/claude-code', icon: '📊' },
  // Codex & Others
  { title: 'OpenAI Codex CLI', category: 'Codex & Others', path: '/codex', icon: '🧠' },
  { title: 'GitHub Copilot', category: 'Codex & Others', path: '/codex', icon: '🐙' },
  { title: 'Windsurf', category: 'Codex & Others', path: '/codex', icon: '🏄' },
  { title: 'Bolt / Lovable', category: 'Codex & Others', path: '/codex', icon: '⚡' },
  { title: 'AI 도구 비교', category: 'Codex & Others', path: '/codex', icon: '📊' },
  // 실전 프로젝트
  { title: '프로젝트 설계', category: '실전 프로젝트', path: '/projects', icon: '🏗️' },
  { title: '프론트엔드 구축', category: '실전 프로젝트', path: '/projects', icon: '🎨' },
  { title: '백엔드 연동', category: '실전 프로젝트', path: '/projects', icon: '🔗' },
  { title: '배포 자동화', category: '실전 프로젝트', path: '/projects', icon: '🚀' },
  { title: '포트폴리오 완성', category: '실전 프로젝트', path: '/projects', icon: '💼' },
  // Q&A
  { title: '자주 묻는 질문', category: 'Q&A', path: '/qna', icon: '❓' },
  // 교육과정
  { title: '교육과정 안내', category: '교육과정', path: '/education', icon: '🎓' },
  // 커뮤니티
  { title: '커뮤니티', category: '커뮤니티', path: '/community', icon: '👥' },
];

// ===== 2. 바이브코딩 기초 =====
export const basicsTopics: Topic[] = [
  {
    id: 'concept',
    title: '바이브코딩 개념',
    icon: '🎵',
    description: '바이브코딩(Vibe Coding)은 AI에게 자연어로 원하는 기능을 설명하면 AI가 코드를 작성해주는 새로운 개발 방식입니다. 개발자의 역할이 "코드 작성자"에서 "AI 디렉터"로 변화합니다.',
    content: [
      { subtitle: '바이브코딩이란?', text: '바이브코딩은 Andrej Karpathy가 2025년 2월에 제안한 개념으로, "분위기(vibe)에 맞춰 코딩한다"는 의미입니다. 개발자가 직접 코드를 한 줄씩 작성하는 대신, AI에게 원하는 결과를 자연어로 설명하고 AI가 생성한 코드를 검토·수정하는 방식으로 개발합니다.' },
      { subtitle: '핵심 원칙', items: ['자연어로 의도를 명확히 전달하기', 'AI가 생성한 코드를 이해하고 검증하기', '반복적 대화로 코드를 개선하기', '프로젝트 컨텍스트를 AI에게 충분히 제공하기'] },
      { subtitle: '전통 코딩 vs 바이브코딩', items: ['전통: 문법 암기 → 코드 작성 → 디버깅', '바이브: 요구사항 정리 → AI에게 지시 → 검토/수정', '전통: 수 시간 ~ 수 일 소요', '바이브: 수 분 ~ 수 시간으로 단축'] },
    ],
    code: `// 전통 코딩 방식
// 개발자가 직접 모든 코드를 작성
function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

// 바이브코딩 방식
// AI에게 지시: "장바구니 아이템의 총 금액을 계산하는 함수를 만들어줘.
// 할인율도 적용하고, 세금(10%)도 포함해줘."
// → AI가 아래 코드를 생성:
function calculateTotal(items, discountRate = 0) {
  const subtotal = items.reduce((sum, item) =>
    sum + item.price * item.quantity, 0);
  const discounted = subtotal * (1 - discountRate);
  const tax = discounted * 0.1;
  return Math.round(discounted + tax);
}`,
    codeLang: 'javascript',
  },
  {
    id: 'ai-tools',
    title: 'AI 코딩 도구 소개',
    icon: '🤖',
    description: '바이브코딩에 사용되는 주요 AI 코딩 도구들을 소개합니다. 각 도구의 특징과 장단점을 비교하여 자신에게 맞는 도구를 선택하세요.',
    content: [
      { subtitle: 'IDE 통합형', items: ['Cursor: VS Code 기반, AI-first IDE. Tab 완성, Chat, Composer 기능', 'Windsurf (Codeium): Cascade 기능으로 멀티파일 편집, 무료 플랜 제공', 'GitHub Copilot: VS Code/JetBrains 확장, 가장 널리 사용'] },
      { subtitle: 'CLI 에이전트형', items: ['Claude Code: Anthropic의 CLI 도구, 에이전틱 코딩, CLAUDE.md 기반 프로젝트 관리', 'OpenAI Codex CLI: OpenAI의 터미널 기반 코딩 에이전트', 'Aider: 오픈소스 CLI 코딩 어시스턴트'] },
      { subtitle: '웹 기반 빌더', items: ['Bolt.new: 브라우저에서 바로 풀스택 앱 생성', 'Lovable: 디자인 중심의 웹앱 빌더', 'v0 by Vercel: UI 컴포넌트 생성 특화'] },
    ],
    code: `// AI 도구별 사용 예시

// 1. Cursor - IDE에서 Cmd+K로 인라인 편집
// 선택한 코드 범위에서 Cmd+K → "이 함수에 에러 처리 추가"

// 2. Claude Code - CLI에서 자연어로 지시
// $ claude "로그인 페이지를 만들어줘.
//   이메일/비밀번호 입력, 소셜 로그인(Google, Kakao) 포함"

// 3. GitHub Copilot - 주석으로 의도 전달
// 사용자의 나이를 검증하는 함수
// 18세 이상이어야 하고, 150세 이하여야 한다
function validateAge(age: number): boolean {
  return age >= 18 && age <= 150;
}`,
    codeLang: 'typescript',
  },
  {
    id: 'prompt-engineering',
    title: '프롬프트 엔지니어링',
    icon: '💬',
    description: 'AI에게 효과적으로 지시하는 방법을 배웁니다. 좋은 프롬프트는 바이브코딩의 핵심이며, AI의 출력 품질을 결정합니다.',
    content: [
      { subtitle: '좋은 프롬프트의 조건', items: ['구체적이고 명확한 요구사항 전달', '기술 스택과 환경 정보 포함', '예상되는 입출력 예시 제공', '제약 조건과 예외 상황 명시'] },
      { subtitle: '프롬프트 작성 패턴', items: ['역할 부여: "너는 시니어 React 개발자야"', '컨텍스트 제공: "현재 프로젝트는 React + TypeScript + Supabase를 사용해"', '단계별 지시: "1단계: 타입 정의, 2단계: 컴포넌트 작성, 3단계: API 연동"', '출력 형식 지정: "TypeScript로 작성하고, JSDoc 주석을 포함해"'] },
      { subtitle: '피해야 할 패턴', items: ['너무 모호한 지시: "좋은 코드 만들어줘"', '한 번에 너무 많은 요구: 작은 단위로 나누기', '컨텍스트 없는 요청: 프로젝트 구조/기술 스택 미제공', '결과 검증 없이 바로 적용'] },
    ],
    code: `// 나쁜 프롬프트 예시
// "회원가입 만들어줘" ❌

// 좋은 프롬프트 예시 ✅
// "React + TypeScript로 회원가입 컴포넌트를 만들어줘.
//
// 요구사항:
// - 이름, 이메일, 비밀번호, 비밀번호 확인 필드
// - 이메일 형식 검증 (정규식)
// - 비밀번호: 8자 이상, 영문+숫자+특수문자
// - 비밀번호 확인 일치 검증
// - Supabase Auth의 signUp 함수 사용
// - 에러 메시지는 필드 아래에 빨간색으로 표시
// - 로딩 중일 때 버튼 비활성화
// - 성공 시 /login 페이지로 이동
//
// 기술 스택: React 19, TypeScript, Supabase v2"`,
    codeLang: 'text',
  },
  {
    id: 'code-review',
    title: '코드 리뷰와 이해',
    icon: '🔍',
    description: 'AI가 생성한 코드를 효과적으로 리뷰하고 이해하는 방법을 배웁니다. 바이브코딩에서 개발자의 가장 중요한 역할은 코드 검증입니다.',
    content: [
      { subtitle: 'AI 코드 리뷰 체크리스트', items: ['코드가 요구사항을 정확히 구현했는가?', '보안 취약점(XSS, SQL 인젝션 등)은 없는가?', '에러 처리가 적절한가?', '성능 문제가 있는 코드는 없는가?', '기존 코드베이스의 패턴/컨벤션과 일치하는가?'] },
      { subtitle: 'AI에게 설명 요청하기', items: ['"이 코드의 각 부분이 어떤 역할을 하는지 설명해줘"', '"이 알고리즘의 시간 복잡도는 어떻게 되나?"', '"이 패턴을 사용한 이유가 뭐야?"', '"잠재적인 버그나 개선점이 있나?"'] },
      { subtitle: '점진적 이해 전략', items: ['전체 구조부터 파악 (import, 함수 시그니처)', '핵심 로직 이해 (주요 비즈니스 로직)', '엣지 케이스 확인 (예외 처리, 경계값)', '테스트로 동작 검증'] },
    ],
    code: `// AI가 생성한 코드를 리뷰하는 과정 예시

// 1. AI에게 요청: "사용자 인증 미들웨어 만들어줘"
// 2. AI가 생성한 코드:
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '토큰이 없습니다' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: '유효하지 않은 토큰' });
  }
}

// 3. 리뷰 포인트:
// ✅ Bearer 토큰 파싱 정상
// ✅ 토큰 없을 때 401 반환
// ⚠️ JWT_SECRET이 undefined일 경우 처리 필요
// ⚠️ 토큰 만료 vs 위변조 에러 구분 필요`,
    codeLang: 'javascript',
  },
  {
    id: 'workflow',
    title: 'AI 코딩 워크플로우',
    icon: '🔄',
    description: '바이브코딩의 효율적인 작업 흐름을 배웁니다. 계획 → 지시 → 검토 → 반복의 사이클을 최적화하세요.',
    content: [
      { subtitle: '바이브코딩 워크플로우', items: ['1단계: 프로젝트 계획 및 구조 설계', '2단계: AI에게 컨텍스트 제공 (CLAUDE.md, .cursorrules 등)', '3단계: 기능 단위로 AI에게 지시', '4단계: 생성된 코드 리뷰 및 수정', '5단계: 테스트 및 검증', '6단계: 반복 및 개선'] },
      { subtitle: '효율적인 작업 단위', items: ['한 번에 하나의 기능/컴포넌트 단위로 작업', '큰 기능은 작은 단계로 나누어 진행', '이전 대화 컨텍스트를 활용', '일관된 코딩 스타일 유지를 위한 규칙 파일 사용'] },
      { subtitle: '버전 관리 전략', items: ['Git으로 각 기능 단위 커밋', 'AI 작업 전 현재 상태 커밋 (롤백 포인트)', '브랜치 전략으로 안전하게 실험', 'AI가 생성한 코드도 반드시 리뷰 후 커밋'] },
    ],
    code: `# 바이브코딩 워크플로우 예시

# 1. 프로젝트 초기 설정
$ mkdir my-app && cd my-app
$ npm create vite@latest . -- --template react-ts

# 2. AI에게 프로젝트 컨텍스트 설정
# CLAUDE.md 또는 .cursorrules 파일 작성
# - 기술 스택, 코딩 컨벤션, 프로젝트 구조 명시

# 3. 기능 단위 개발 (예: Claude Code 사용)
$ claude "사용자 인증 기능을 구현해줘.
  Supabase Auth를 사용하고,
  이메일/비밀번호 + Google OAuth를 지원해."

# 4. 코드 리뷰
$ claude "방금 만든 인증 코드를 리뷰해줘.
  보안 취약점이나 개선사항이 있나?"

# 5. 테스트
$ npm run build  # 빌드 확인
$ npm run dev    # 로컬 테스트

# 6. 커밋
$ git add -A && git commit -m "feat: 사용자 인증 구현"`,
    codeLang: 'bash',
  },
  {
    id: 'env-setup',
    title: '개발 환경 설정',
    icon: '⚙️',
    description: '바이브코딩을 위한 개발 환경을 설정합니다. Node.js, IDE, AI 도구 설치와 기본 설정 방법을 안내합니다.',
    content: [
      { subtitle: '필수 설치 항목', items: ['Node.js 20+ (LTS 버전 권장)', 'Git (버전 관리)', 'VS Code 또는 Cursor IDE', 'npm 또는 pnpm 패키지 매니저'] },
      { subtitle: 'AI 도구 설치', items: ['Cursor: cursor.com에서 다운로드, VS Code 설정 자동 마이그레이션', 'Claude Code: npm install -g @anthropic-ai/claude-code', 'GitHub Copilot: VS Code 확장 설치 후 GitHub 계정 연동', 'Codex CLI: npm install -g @openai/codex'] },
      { subtitle: '프로젝트 초기화', items: ['Vite로 React + TypeScript 프로젝트 생성', 'ESLint, Prettier 설정', '.env 파일로 API 키 관리 (절대 Git에 포함하지 않기)', 'CLAUDE.md 또는 .cursorrules로 AI 컨텍스트 설정'] },
    ],
    code: `# 개발 환경 설정 가이드

# 1. Node.js 설치 확인
$ node --version  # v20.x.x 이상
$ npm --version   # 10.x.x 이상

# 2. Vite 프로젝트 생성
$ npm create vite@latest my-project -- --template react-ts
$ cd my-project
$ npm install

# 3. AI 도구 설치
$ npm install -g @anthropic-ai/claude-code  # Claude Code
$ npm install -g @openai/codex              # Codex CLI

# 4. 프로젝트 설정 파일 생성
$ echo "VITE_SUPABASE_URL=your-url" > .env
$ echo "VITE_SUPABASE_ANON_KEY=your-key" >> .env
$ echo ".env" >> .gitignore

# 5. CLAUDE.md 생성 (프로젝트 컨텍스트)
$ cat > CLAUDE.md << 'EOF'
# 프로젝트 개요
React 19 + TypeScript + Vite + Supabase

## 코딩 컨벤션
- 함수형 컴포넌트 사용
- TypeScript strict mode
- CSS Modules 사용
EOF`,
    codeLang: 'bash',
  },
];

// ===== 3. AI Cursor 토픽 =====
export const cursorTopics: Topic[] = [
  {
    id: 'cursor-install',
    title: 'Cursor IDE 설치',
    icon: '📦',
    description: 'Cursor는 VS Code를 기반으로 한 AI-first IDE입니다. 설치부터 기본 설정까지 알아봅니다.',
    content: [
      { subtitle: '설치 방법', items: ['cursor.com에서 OS에 맞는 버전 다운로드', 'VS Code 설정/확장 자동 마이그레이션 지원', '무료 플랜: 월 2,000회 자동완성, 50회 프리미엄 요청', 'Pro 플랜: $20/월, 무제한 자동완성 + 500회 프리미엄 요청'] },
      { subtitle: 'VS Code와의 차이점', items: ['AI 기능이 IDE에 네이티브로 통합', 'Tab 자동완성이 코드 전체 맥락을 이해', 'Cmd+K로 인라인 AI 편집', 'Chat/Composer로 대화형 개발', '프로젝트 전체를 이해하는 코드베이스 인덱싱'] },
      { subtitle: '초기 설정', items: ['Settings → Models에서 사용할 AI 모델 선택', 'Claude 3.5 Sonnet 또는 GPT-4o 권장', '.cursorrules 파일로 프로젝트별 AI 규칙 설정', 'Privacy Mode 설정으로 코드 보안 관리'] },
    ],
    code: `// .cursorrules 파일 예시 (프로젝트 루트에 생성)

You are a senior React developer.

Tech Stack:
- React 19 + TypeScript
- Vite for bundling
- Supabase for backend
- React Router v7

Coding Conventions:
- Use functional components with hooks
- Use TypeScript strict mode
- Component files: PascalCase.tsx
- Utility files: camelCase.ts
- CSS: Use CSS Modules or CSS-in-JS
- Always add proper error handling
- Write JSDoc comments for complex functions

Project Structure:
src/
  components/  - Reusable UI components
  pages/       - Route pages
  contexts/    - React contexts
  hooks/       - Custom hooks
  services/    - API service functions
  types/       - TypeScript type definitions`,
    codeLang: 'text',
  },
  {
    id: 'cursor-tab',
    title: 'Tab 자동완성',
    icon: '⌨️',
    description: 'Cursor의 Tab 자동완성은 단순한 코드 스니펫이 아닌, 프로젝트 전체 맥락을 이해한 지능적인 코드 제안을 제공합니다.',
    content: [
      { subtitle: 'Tab 자동완성 특징', items: ['현재 파일뿐 아니라 프로젝트 전체 컨텍스트 이해', '여러 줄의 코드를 한 번에 제안', '코딩 패턴을 학습하여 일관된 코드 생성', 'Tab으로 수락, Esc로 거절'] },
      { subtitle: '효과적 활용법', items: ['함수 시그니처를 먼저 작성하면 본문을 자동 생성', '주석을 먼저 작성하면 해당 로직을 구현', '패턴이 반복되면 자동으로 다음 패턴 제안', '타입 정의를 먼저 하면 구현부를 자동 생성'] },
    ],
    code: `// Tab 자동완성 활용 예시

// 1. 함수 시그니처만 작성 → Tab으로 본문 자동 생성
function formatCurrency(amount: number, currency: string = 'KRW')
// Tab 누르면 →
function formatCurrency(amount: number, currency: string = 'KRW'): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency,
  }).format(amount);
}

// 2. 주석 작성 → 구현 자동 생성
// 이메일 유효성을 검사하는 함수
// Tab 누르면 →
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

// 3. 패턴 반복 자동 인식
const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  // Tab 누르면 다음 라우트 자동 제안
];`,
    codeLang: 'typescript',
  },
  {
    id: 'cursor-cmd-k',
    title: 'Cmd+K 인라인 편집',
    icon: '✏️',
    description: 'Cmd+K(Windows: Ctrl+K)를 사용하여 선택한 코드를 AI가 즉시 수정합니다. 리팩토링, 버그 수정, 기능 추가에 효과적입니다.',
    content: [
      { subtitle: '기본 사용법', items: ['코드 선택 → Cmd+K → 원하는 수정 사항 입력', '선택 없이 Cmd+K → 현재 위치에 새 코드 생성', '여러 줄 선택 가능 → 복잡한 리팩토링에 유용', 'Accept(수락) 또는 Reject(거절) 선택'] },
      { subtitle: '활용 시나리오', items: ['에러 처리 추가: "try-catch로 에러 처리 추가해줘"', '타입 추가: "TypeScript 타입을 추가해줘"', '리팩토링: "이 코드를 커스텀 훅으로 분리해줘"', '최적화: "이 컴포넌트를 메모이제이션해줘"', '변환: "이 class 컴포넌트를 함수형으로 변환해줘"'] },
    ],
    code: `// Cmd+K 인라인 편집 활용 예시

// Before: 기본 fetch 코드 선택 후
// Cmd+K → "에러 처리와 로딩 상태 추가해줘"
const data = await fetch('/api/users');
const users = await data.json();

// After: AI가 수정한 결과
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  fetchUsers();
}, []);`,
    codeLang: 'typescript',
  },
  {
    id: 'cursor-chat',
    title: 'Chat & Composer',
    icon: '💭',
    description: 'Chat은 코드에 대한 질문과 답변, Composer는 여러 파일에 걸친 대규모 코드 생성/수정에 사용됩니다.',
    content: [
      { subtitle: 'Chat (Cmd+L)', items: ['코드에 대한 질문과 설명 요청', '디버깅 도움 받기', '특정 파일/함수를 @mention으로 참조', '코드 리뷰 요청'] },
      { subtitle: 'Composer (Cmd+I)', items: ['여러 파일을 동시에 생성/수정', '프로젝트 구조를 한 번에 셋업', '대규모 리팩토링 작업', 'Agent 모드: AI가 자동으로 필요한 파일을 찾아 수정'] },
      { subtitle: '@mention 활용', items: ['@file: 특정 파일 참조', '@folder: 폴더 전체 참조', '@codebase: 프로젝트 전체 검색', '@web: 웹 검색 결과 참조', '@docs: 공식 문서 참조'] },
    ],
    code: `// Chat 활용 예시
// Cmd+L → "이 컴포넌트의 성능 문제를 분석해줘"
// @src/components/UserList.tsx

// Composer 활용 예시 (Cmd+I)
// "다음 구조로 인증 시스템을 만들어줘:
// 1. src/contexts/AuthContext.tsx - 인증 컨텍스트
// 2. src/pages/Login.tsx - 로그인 페이지
// 3. src/pages/Register.tsx - 회원가입 페이지
// 4. src/components/ProtectedRoute.tsx - 인증 라우트 가드
// Supabase Auth 사용, Google OAuth 포함"

// Agent 모드 (Composer에서 활성화)
// AI가 자동으로:
// 1. 프로젝트 구조 분석
// 2. 필요한 패키지 설치 (npm install)
// 3. 여러 파일 생성/수정
// 4. 터미널 명령 실행
// 5. 에러 발생 시 자동 수정`,
    codeLang: 'text',
  },
  {
    id: 'cursor-rules',
    title: 'Rules 설정',
    icon: '📋',
    description: '.cursorrules 파일을 통해 Cursor AI의 동작을 프로젝트에 맞게 커스터마이징합니다.',
    content: [
      { subtitle: 'Rules 파일이란?', text: '.cursorrules 파일은 프로젝트 루트에 위치하며, AI가 코드를 생성할 때 따라야 할 규칙을 정의합니다. CLAUDE.md와 유사한 역할을 합니다.' },
      { subtitle: '포함해야 할 내용', items: ['프로젝트 기술 스택 및 버전', '코딩 컨벤션 (네이밍, 파일 구조)', '선호하는 패턴 (함수형 vs 클래스형)', '금지 사항 (특정 라이브러리 사용 금지 등)', '프로젝트별 특수 규칙'] },
      { subtitle: '효과적인 Rules 작성 팁', items: ['구체적인 예시를 포함하면 AI가 더 잘 이해', '프로젝트 구조를 명시하면 올바른 위치에 파일 생성', 'DO와 DON\'T를 구분하여 작성', '점진적으로 규칙을 추가/수정'] },
    ],
    code: `// .cursorrules 파일 실전 예시

You are an expert React + TypeScript developer.

## Project Context
- This is a Vibe Coding learning platform
- Uses React 19, TypeScript, Vite, Supabase
- Deployed to GitHub Pages

## Code Style
DO:
- Use functional components with TypeScript
- Use named exports for components
- Add return type annotations
- Use CSS classes (no inline styles for layout)
- Handle loading and error states
- Use async/await for async operations

DON'T:
- Don't use class components
- Don't use \`any\` type
- Don't use var (use const/let)
- Don't leave console.log in production code
- Don't use index as key for dynamic lists

## Component Pattern
\`\`\`tsx
interface Props {
  title: string;
  onAction: () => void;
}

export default function MyComponent({ title, onAction }: Props): React.ReactElement {
  return <div onClick={onAction}>{title}</div>;
}
\`\`\``,
    codeLang: 'text',
  },
  {
    id: 'cursor-multifile',
    title: '멀티파일 편집',
    icon: '📂',
    description: 'Cursor의 Composer와 Agent 모드를 활용하여 여러 파일에 걸친 대규모 작업을 효율적으로 수행합니다.',
    content: [
      { subtitle: 'Composer 멀티파일 편집', items: ['여러 파일을 한 번에 생성하고 수정', '파일 간 import/export 관계 자동 처리', '프로젝트 구조를 이해하고 적절한 위치에 파일 배치', '변경사항 미리보기로 안전하게 적용'] },
      { subtitle: 'Agent 모드', items: ['AI가 자율적으로 프로젝트 탐색 및 수정', 'npm install 등 터미널 명령 실행 가능', '에러 발생 시 자동으로 디버깅 시도', '여러 단계의 작업을 연속으로 수행'] },
      { subtitle: '실전 활용 팁', items: ['큰 작업은 단계별로 나누어 진행', 'Checkpoint 기능으로 작업 지점 저장', '변경사항 diff를 꼼꼼히 확인 후 적용', 'Git commit을 자주 하여 롤백 가능하게 유지'] },
    ],
    code: `// Composer 멀티파일 작업 예시

// 프롬프트: "게시판 CRUD 기능을 만들어줘"
// AI가 한 번에 생성하는 파일들:

// 1. src/services/boardService.ts
export async function getPosts(page: number) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .range((page-1)*10, page*10-1)
    .order('created_at', { ascending: false });
  return { data, error };
}

// 2. src/pages/BoardList.tsx
// 3. src/pages/BoardWrite.tsx
// 4. src/pages/BoardDetail.tsx
// 5. src/components/Pagination.tsx

// Agent 모드가 자동으로:
// - 라우터에 새 경로 추가
// - 네비게이션에 메뉴 항목 추가
// - Supabase 타입 생성
// - 빌드 에러 발생 시 자동 수정`,
    codeLang: 'typescript',
  },
];

// ===== 4. Claude Code 토픽 =====
export const claudeCodeTopics: Topic[] = [
  {
    id: 'claude-install',
    title: 'CLI 설치 및 설정',
    icon: '🖥️',
    description: 'Claude Code는 Anthropic의 공식 CLI 기반 AI 코딩 도구입니다. 터미널에서 자연어로 코드를 작성하고 프로젝트를 관리합니다.',
    content: [
      { subtitle: '설치 방법', items: ['Node.js 18+ 필요', 'npm install -g @anthropic-ai/claude-code', '설치 후 claude 명령어로 실행', '첫 실행 시 Anthropic API 키 또는 OAuth 인증'] },
      { subtitle: '기본 사용법', items: ['claude: 대화형 모드 시작', 'claude "질문이나 지시": 원샷 모드', 'claude -p "프롬프트": 파이프 모드 (스크립트 연동)', '/help: 도움말, /clear: 대화 초기화, /compact: 컨텍스트 압축'] },
      { subtitle: '권한 설정', items: ['파일 읽기/쓰기 권한 관리', '터미널 명령 실행 권한', '자동 승인 설정 (--dangerously-skip-permissions)', 'allowedTools 설정으로 세밀한 권한 제어'] },
    ],
    code: `# Claude Code 설치 및 기본 사용

# 설치
$ npm install -g @anthropic-ai/claude-code

# 대화형 모드
$ claude
> React로 카운터 컴포넌트를 만들어줘

# 원샷 모드
$ claude "package.json에서 사용하지 않는 의존성을 찾아줘"

# 파이프 모드 (CI/CD 연동)
$ echo "이 코드를 리뷰해줘" | claude -p

# 유용한 슬래시 명령어
> /help          # 도움말
> /clear         # 대화 초기화
> /compact       # 컨텍스트 압축
> /cost          # 토큰 사용량 확인
> /init          # CLAUDE.md 생성`,
    codeLang: 'bash',
  },
  {
    id: 'agentic-coding',
    title: '에이전틱 코딩',
    icon: '🤖',
    description: 'Claude Code의 에이전틱 코딩은 AI가 자율적으로 코드베이스를 탐색하고, 파일을 수정하며, 명령어를 실행하는 방식입니다.',
    content: [
      { subtitle: '에이전틱 코딩이란?', text: 'AI가 단순히 코드를 생성하는 것을 넘어, 프로젝트 구조를 이해하고 여러 파일을 탐색·수정하며, 빌드/테스트 명령을 실행하고, 에러를 자동으로 수정하는 자율적 개발 방식입니다.' },
      { subtitle: '에이전틱 워크플로우', items: ['1. 프로젝트 컨텍스트 분석 (파일 구조, 설정 파일)', '2. 관련 파일 탐색 (Grep, Glob, Read)', '3. 수정 계획 수립', '4. 코드 수정 (Write, Edit)', '5. 빌드/테스트 실행 (Bash)', '6. 에러 발생 시 자동 수정 반복'] },
      { subtitle: 'Extended Thinking', items: ['복잡한 문제에 대해 AI가 깊이 사고', 'budget_tokens로 사고 시간 제어', '아키텍처 설계, 복잡한 디버깅에 효과적'] },
    ],
    code: `# 에이전틱 코딩 실전 예시

# Claude Code에게 복잡한 작업 요청
$ claude
> 현재 프로젝트의 모든 TypeScript 에러를 수정해줘.
> tsc --noEmit으로 확인하고, 하나씩 수정해.

# Claude가 자율적으로 수행하는 작업:
# 1. tsc --noEmit 실행하여 에러 목록 확인
# 2. 각 에러 파일을 읽어 문제 파악
# 3. 타입 수정, import 추가/수정
# 4. 수정 후 다시 tsc 실행하여 검증
# 5. 모든 에러가 해결될 때까지 반복

# Extended Thinking 활용
> /think 이 프로젝트의 인증 시스템을 분석하고
> 보안 취약점을 찾아서 수정 계획을 세워줘.
# → AI가 심층적으로 분석 후 체계적인 계획 제시`,
    codeLang: 'bash',
  },
  {
    id: 'claude-md',
    title: 'CLAUDE.md 활용',
    icon: '📄',
    description: 'CLAUDE.md는 Claude Code에게 프로젝트 컨텍스트를 제공하는 핵심 설정 파일입니다. AI의 작업 품질을 크게 향상시킵니다.',
    content: [
      { subtitle: 'CLAUDE.md란?', text: 'CLAUDE.md는 프로젝트 루트에 위치하는 마크다운 파일로, Claude Code가 프로젝트를 이해하는 데 필요한 모든 정보를 포함합니다. Cursor의 .cursorrules와 유사한 역할입니다.' },
      { subtitle: '포함해야 할 내용', items: ['프로젝트 개요 및 목적', '기술 스택 및 주요 라이브러리', '프로젝트 구조 (디렉토리 설명)', '빌드/테스트/배포 명령어', '코딩 컨벤션 및 스타일 가이드', '알려진 이슈나 주의사항'] },
      { subtitle: 'CLAUDE.md 범위', items: ['프로젝트 루트: 해당 프로젝트에 적용', '~/.claude/CLAUDE.md: 모든 프로젝트에 전역 적용', '하위 폴더: 해당 폴더의 작업에만 적용', '/init 명령으로 자동 생성 가능'] },
    ],
    code: `# CLAUDE.md 실전 예시

# 프로젝트 개요
바이브코딩 학습 플랫폼 (vibe.dreamitbiz.com)

## 기술 스택
- React 19 + TypeScript + Vite
- Supabase (인증, 데이터베이스)
- React Router v7
- GitHub Pages 배포

## 주요 명령어
- \`npm run dev\`: 개발 서버 (포트 5173)
- \`npm run build\`: 프로덕션 빌드
- \`npx gh-pages -d dist\`: 배포

## 프로젝트 구조
src/
  components/  → 재사용 UI 컴포넌트
  pages/       → 라우트 페이지
  contexts/    → React Context (Auth, Theme, Toast)
  services/    → Supabase 서비스 함수
  data/        → 정적 학습 데이터

## 코딩 규칙
- 함수형 컴포넌트 + TypeScript
- CSS 클래스 기반 스타일링 (index.css)
- default export 사용
- 한국어 UI, 영문 코드`,
    codeLang: 'markdown',
  },
  {
    id: 'mcp-server',
    title: 'MCP 서버',
    icon: '🔌',
    description: 'MCP(Model Context Protocol)는 Claude Code에 외부 도구와 데이터 소스를 연결하는 프로토콜입니다.',
    content: [
      { subtitle: 'MCP란?', text: 'MCP는 AI 모델이 외부 도구, 데이터베이스, API 등과 상호작용할 수 있게 해주는 표준 프로토콜입니다. Claude Code에 MCP 서버를 연결하면 AI의 능력을 확장할 수 있습니다.' },
      { subtitle: '주요 MCP 서버', items: ['Filesystem: 파일 시스템 접근', 'GitHub: Pull Request, Issue 관리', 'PostgreSQL: 데이터베이스 직접 쿼리', 'Slack: 메시지 읽기/보내기', 'Notion: 문서 읽기/수정', 'Browser: 웹 브라우징'] },
      { subtitle: '설정 방법', items: ['claude mcp add <name> <command>: MCP 서버 추가', '프로젝트별 또는 전역 설정 가능', '.mcp.json 파일로 팀 공유', 'claude mcp list: 등록된 서버 확인'] },
    ],
    code: `# MCP 서버 설정 예시

# 1. GitHub MCP 서버 추가
$ claude mcp add github npx -y @modelcontextprotocol/server-github
# → PR 생성, Issue 관리, 코드 리뷰 등이 가능

# 2. PostgreSQL MCP 서버 추가
$ claude mcp add postgres npx -y @modelcontextprotocol/server-postgres \\
  --connection-string "postgresql://user:pass@host/db"
# → AI가 직접 DB 쿼리 가능

# 3. Notion MCP 서버 추가
$ claude mcp add notion npx -y @modelcontextprotocol/server-notion
# → Notion 페이지 읽기/수정

# 4. 등록된 MCP 서버 확인
$ claude mcp list

# 5. .mcp.json 설정 파일 (프로젝트 루트)
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}`,
    codeLang: 'bash',
  },
  {
    id: 'claude-multifile',
    title: '멀티파일 작업',
    icon: '📁',
    description: 'Claude Code는 프로젝트의 여러 파일을 동시에 탐색하고 수정할 수 있습니다. 대규모 리팩토링과 기능 추가에 효과적입니다.',
    content: [
      { subtitle: '파일 탐색 도구', items: ['Glob: 패턴으로 파일 찾기 (e.g., **/*.tsx)', 'Grep: 코드 내 키워드 검색', 'Read: 파일 내용 읽기', 'LS: 디렉토리 구조 파악'] },
      { subtitle: '파일 수정 도구', items: ['Write: 새 파일 생성 또는 전체 덮어쓰기', 'Edit: 특정 부분만 정밀하게 수정', 'Bash: 터미널 명령 실행 (npm, git 등)'] },
      { subtitle: '멀티파일 작업 팁', items: ['먼저 프로젝트 구조를 AI에게 설명', '한 번에 하나의 기능 단위로 작업', '수정 사항을 Git으로 추적', 'AI가 수정한 파일 목록을 확인하고 리뷰'] },
    ],
    code: `# Claude Code 멀티파일 작업 예시

$ claude
> 모든 페이지 컴포넌트에서 공통으로 사용하는
> Hero 섹션을 별도 컴포넌트로 분리해줘.

# Claude가 자동으로 수행:
# 1. src/pages/*.tsx 파일들을 모두 읽기
# 2. 공통 Hero 패턴 식별
# 3. src/components/Hero.tsx 생성
# 4. 각 페이지에서 기존 Hero 코드를
#    새 컴포넌트 import로 교체
# 5. 빌드 확인

> 전체 프로젝트에서 console.log를 모두 제거해줘.
# → Grep으로 검색 → Edit으로 제거 → 빌드 검증

> src/services/ 폴더의 모든 API 함수에
> 에러 처리를 추가해줘.
# → 각 파일을 순회하며 try-catch 추가`,
    codeLang: 'bash',
  },
  {
    id: 'claude-project',
    title: '프로젝트 관리',
    icon: '📊',
    description: 'Claude Code를 활용한 프로젝트 관리 전략입니다. 초기화부터 배포까지의 전체 워크플로우를 다룹니다.',
    content: [
      { subtitle: '프로젝트 초기화', items: ['/init 명령으로 CLAUDE.md 자동 생성', 'AI가 프로젝트 구조를 분석하고 문서화', '빌드/테스트 명령어 자동 감지', '기술 스택 정보 수집'] },
      { subtitle: 'Git 연동', items: ['Claude Code가 자동으로 git 명령 실행', '커밋 메시지 자동 생성', '브랜치 생성 및 전환', 'PR 생성 (GitHub MCP 서버 연동 시)'] },
      { subtitle: '협업 워크플로우', items: ['CLAUDE.md를 팀원과 공유 (Git에 포함)', '일관된 코딩 스타일 유지', 'CI/CD 파이프라인에 Claude Code 통합', '코드 리뷰 자동화'] },
    ],
    code: `# 프로젝트 관리 워크플로우

# 1. 프로젝트 초기화
$ cd my-project
$ claude /init
# → CLAUDE.md 자동 생성

# 2. 새 기능 개발
$ claude "사용자 프로필 편집 기능을 만들어줘.
> - 프로필 이미지 업로드 (Supabase Storage)
> - 닉네임, 자기소개 수정
> - 변경사항 실시간 반영"

# 3. 코드 리뷰
$ claude "방금 만든 코드를 리뷰하고
> 개선사항을 적용해줘"

# 4. 테스트 및 빌드
$ claude "빌드가 성공하는지 확인하고
> TypeScript 에러가 있으면 수정해줘"

# 5. 커밋 및 배포
$ claude "/commit"  # 자동 커밋 메시지 생성
$ npx gh-pages -d dist  # 배포`,
    codeLang: 'bash',
  },
];

// ===== 5. Codex & Others 토픽 =====
export const codexTopics: Topic[] = [
  {
    id: 'codex-cli',
    title: 'OpenAI Codex CLI',
    icon: '🧠',
    description: 'OpenAI의 Codex CLI는 터미널에서 GPT 모델을 활용하여 코드를 생성하고 프로젝트를 관리하는 도구입니다.',
    content: [
      { subtitle: '설치 및 설정', items: ['npm install -g @openai/codex', 'OpenAI API 키 설정 필요', '기본 모델: codex-mini (빠르고 경제적)', 'codex-1 모델: 더 복잡한 작업에 적합'] },
      { subtitle: '주요 기능', items: ['자연어로 코드 생성 및 수정', '샌드박스 환경에서 코드 실행', '파일 읽기/쓰기 자동 처리', 'Git 연동 및 자동 커밋'] },
      { subtitle: '자율성 수준 설정', items: ['suggest: 모든 변경을 사용자가 승인', 'auto-edit: 파일 수정 자동, 명령 실행은 승인', 'full-auto: 모든 작업 자동 수행 (주의 필요)'] },
    ],
    code: `# OpenAI Codex CLI 사용법

# 설치
$ npm install -g @openai/codex

# 기본 사용 (suggest 모드)
$ codex "React로 할 일 목록 앱을 만들어줘"

# auto-edit 모드 (파일 수정 자동)
$ codex --approval-mode auto-edit \\
  "모든 컴포넌트에 TypeScript 타입을 추가해줘"

# full-auto 모드 (완전 자동)
$ codex --approval-mode full-auto \\
  "프로젝트를 빌드하고 에러를 수정해줘"

# 특정 모델 사용
$ codex --model codex-1 \\
  "이 프로젝트의 아키텍처를 분석해줘"`,
    codeLang: 'bash',
  },
  {
    id: 'copilot',
    title: 'GitHub Copilot',
    icon: '🐙',
    description: 'GitHub Copilot은 가장 널리 사용되는 AI 코딩 어시스턴트로, VS Code와 JetBrains IDE에서 실시간 코드 제안을 제공합니다.',
    content: [
      { subtitle: '설정 방법', items: ['VS Code 확장 마켓에서 "GitHub Copilot" 설치', 'GitHub 계정으로 인증', '무료 플랜: 월 2,000회 자동완성, 50회 채팅', 'Pro 플랜: $10/월, 무제한 자동완성'] },
      { subtitle: '주요 기능', items: ['인라인 코드 제안 (Tab으로 수락)', 'Copilot Chat: 코드에 대한 질문/답변', 'Ghost Text: 입력하면서 실시간 제안', '여러 제안 중 선택 (Alt+]로 전환)'] },
      { subtitle: 'Copilot Chat 활용', items: ['Cmd+I: 인라인 수정 요청', '/explain: 코드 설명', '/fix: 버그 수정', '/tests: 테스트 코드 생성'] },
    ],
    code: `// GitHub Copilot 활용 예시

// 1. 주석으로 의도 전달 → 자동완성
// 두 날짜 사이의 일수를 계산하는 함수
function daysBetween(start: Date, end: Date): number {
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// 2. Copilot Chat (/explain)
// 선택한 코드에 대해 "이 코드가 뭘 하는 건가요?" 질문

// 3. Copilot Chat (/fix)
// 에러가 있는 코드를 선택 → /fix → 자동 수정

// 4. Copilot Chat (/tests)
// 함수를 선택 → /tests → 테스트 코드 자동 생성
describe('daysBetween', () => {
  it('should return correct days', () => {
    const start = new Date('2025-01-01');
    const end = new Date('2025-01-10');
    expect(daysBetween(start, end)).toBe(9);
  });
});`,
    codeLang: 'typescript',
  },
  {
    id: 'windsurf',
    title: 'Windsurf',
    icon: '🏄',
    description: 'Windsurf(구 Codeium)는 Cascade 기능을 통해 멀티파일 에이전틱 편집을 지원하는 AI IDE입니다.',
    content: [
      { subtitle: '특징', items: ['VS Code 기반 AI IDE', 'Cascade: 멀티파일 에이전틱 편집', 'Flows: AI가 자동으로 컨텍스트 수집', '무료 플랜 제공 (제한적)'] },
      { subtitle: 'Cascade 기능', items: ['여러 파일을 동시에 분석하고 수정', 'AI가 관련 파일을 자동으로 탐색', '코드 변경의 영향 범위를 파악', '터미널 명령 실행 가능'] },
      { subtitle: 'Cursor와 비교', items: ['Windsurf: 무료 플랜 있음, Cascade가 강점', 'Cursor: 더 세밀한 제어, 다양한 모델 선택', '둘 다 VS Code 기반으로 마이그레이션 쉬움', '프로젝트 규모와 예산에 따라 선택'] },
    ],
    code: `// Windsurf Cascade 활용 예시

// Cascade에게 지시:
// "이 프로젝트에 다크모드를 추가해줘"

// Cascade가 자동으로:
// 1. 현재 스타일링 방식 분석 (CSS/Tailwind/Styled)
// 2. ThemeContext 생성
// 3. CSS 변수 추가 (라이트/다크)
// 4. 모든 컴포넌트에 테마 적용
// 5. 토글 버튼 추가
// 6. localStorage로 설정 저장

// Windsurf Flows 예시:
// "이 에러를 수정해줘" 라고만 하면
// AI가 자동으로:
// - 에러 로그 분석
// - 관련 파일 탐색
// - 원인 파악
// - 수정 코드 제안
// - 테스트 실행으로 검증`,
    codeLang: 'text',
  },
  {
    id: 'bolt-lovable',
    title: 'Bolt / Lovable',
    icon: '⚡',
    description: '웹 브라우저에서 바로 풀스택 애플리케이션을 만들 수 있는 AI 웹 빌더입니다. 코딩 경험 없이도 앱을 만들 수 있습니다.',
    content: [
      { subtitle: 'Bolt.new', items: ['StackBlitz 기반 브라우저 IDE', '프롬프트 하나로 풀스택 앱 생성', 'React, Next.js, Vue 등 다양한 프레임워크 지원', '실시간 미리보기 및 배포'] },
      { subtitle: 'Lovable', items: ['디자인 중심의 웹앱 빌더', 'Figma 디자인을 코드로 변환', '반응형 디자인 자동 적용', 'Supabase 백엔드 자동 연동'] },
      { subtitle: '활용 시나리오', items: ['빠른 프로토타이핑 및 MVP 개발', '디자인 시안을 즉시 코드로 변환', '비개발자의 아이디어 검증', '해커톤이나 빠른 데모 제작'] },
    ],
    code: `// Bolt.new 사용 예시

// 프롬프트 입력:
// "소셜 미디어 대시보드를 만들어줘.
//  - 게시물 목록 (카드 형태)
//  - 좋아요/댓글 카운트
//  - 새 게시물 작성 폼
//  - 반응형 디자인
//  - 다크모드 지원"

// → Bolt가 즉시 생성:
// - React + Vite 프로젝트
// - 모든 컴포넌트 코드
// - CSS 스타일링
// - 실시간 미리보기

// Lovable 사용 예시:
// 1. 디자인 설명 또는 Figma URL 입력
// 2. AI가 React 코드로 변환
// 3. Supabase 백엔드 자동 설정
// 4. 한 클릭으로 배포

// ⚠️ 주의사항:
// - 복잡한 비즈니스 로직에는 한계
// - 생성된 코드의 품질 검토 필요
// - 커스터마이징이 필요하면 로컬로 export`,
    codeLang: 'text',
  },
  {
    id: 'tool-comparison',
    title: 'AI 도구 비교',
    icon: '📊',
    description: '주요 AI 코딩 도구들의 특징, 장단점, 가격을 비교하여 자신에게 맞는 도구를 선택하세요.',
    content: [
      { subtitle: 'IDE 통합형 비교', items: ['Cursor: 가장 다양한 AI 기능, $20/월 Pro', 'Windsurf: Cascade 기능 강점, 무료 플랜 있음', 'GitHub Copilot: 가장 널리 사용, $10/월', 'VS Code + Extensions: 유연한 조합 가능'] },
      { subtitle: 'CLI 에이전트형 비교', items: ['Claude Code: 에이전틱 코딩 최강, CLAUDE.md 기반', 'Codex CLI: OpenAI 모델 활용, 샌드박스 실행', 'Aider: 오픈소스, 다양한 모델 지원', '선택 기준: 프로젝트 규모, 선호 모델, 예산'] },
      { subtitle: '선택 가이드', items: ['입문자: Bolt/Lovable로 시작 → Cursor로 전환', '개인 개발자: Cursor 또는 Claude Code', '팀 개발: GitHub Copilot Business + Claude Code', '프로토타이핑: Bolt.new 또는 v0'] },
    ],
    code: `// AI 코딩 도구 비교 요약

// ┌─────────────┬──────────┬───────────┬──────────┐
// │ 도구         │ 유형     │ 가격/월   │ 추천 대상 │
// ├─────────────┼──────────┼───────────┼──────────┤
// │ Cursor      │ IDE      │ $20 Pro   │ 개인/팀   │
// │ Copilot     │ 확장     │ $10 Pro   │ 팀 개발   │
// │ Windsurf    │ IDE      │ 무료~$15  │ 입문자    │
// │ Claude Code │ CLI      │ 사용량    │ 파워유저  │
// │ Codex CLI   │ CLI      │ 사용량    │ OpenAI팬  │
// │ Bolt.new    │ 웹 빌더  │ 무료~$20  │ 프로토타입│
// │ Lovable     │ 웹 빌더  │ 무료~$25  │ 디자이너  │
// └─────────────┴──────────┴───────────┴──────────┘

// 추천 조합:
// 1. Cursor + Claude Code (최강 조합)
// 2. VS Code + Copilot + Claude Code (경제적)
// 3. Windsurf + Bolt.new (무료로 시작)`,
    codeLang: 'text',
  },
];

// ===== 6. 실전 프로젝트 토픽 =====
export const projectsTopics: Topic[] = [
  {
    id: 'project-design',
    title: '프로젝트 설계',
    icon: '🏗️',
    description: 'AI와 함께 프로젝트를 설계하는 방법을 배웁니다. 요구사항 정리부터 기술 스택 선정, 폴더 구조 설계까지 다룹니다.',
    content: [
      { subtitle: '프로젝트 설계 프로세스', items: ['1. 아이디어 구체화 (핵심 기능 3-5개 정리)', '2. 기술 스택 선정 (프론트엔드, 백엔드, DB)', '3. 페이지/라우트 구조 설계', '4. 데이터 모델 설계 (테이블, 관계)', '5. UI/UX 흐름 정리'] },
      { subtitle: 'AI에게 설계 요청하기', items: ['"이런 앱을 만들고 싶은데, 기술 스택을 추천해줘"', '"이 요구사항으로 데이터베이스 스키마를 설계해줘"', '"페이지별 와이어프레임을 구성해줘"', '"MVP에 필요한 최소 기능을 정리해줘"'] },
      { subtitle: 'CLAUDE.md / .cursorrules 작성', items: ['설계 결과를 AI 컨텍스트 파일에 정리', '기술 스택, 폴더 구조, 코딩 컨벤션 명시', '개발 중 AI가 일관된 코드를 생성하도록 유도'] },
    ],
    code: `// AI에게 프로젝트 설계를 요청하는 프롬프트 예시

// "커뮤니티 게시판 웹앱을 만들려고 해.
//
// 핵심 기능:
// 1. 회원가입/로그인 (이메일 + 소셜)
// 2. 게시글 CRUD (카테고리별 분류)
// 3. 댓글 기능
// 4. 관리자 페이지
//
// 기술 스택: React + TypeScript + Supabase
//
// 다음을 설계해줘:
// - 폴더 구조
// - Supabase 테이블 스키마
// - 라우트 구조
// - 주요 컴포넌트 목록"

// AI가 생성하는 설계 문서를 CLAUDE.md에 저장하여
// 이후 개발 시 AI가 참조하도록 합니다.`,
    codeLang: 'text',
  },
  {
    id: 'frontend-build',
    title: '프론트엔드 구축',
    icon: '🎨',
    description: 'AI와 함께 React 프론트엔드를 구축합니다. 컴포넌트 설계, 라우팅, 상태관리, 스타일링을 다룹니다.',
    content: [
      { subtitle: 'AI와 컴포넌트 개발', items: ['페이지 단위로 AI에게 요청 (한 번에 하나씩)', 'UI 컴포넌트를 먼저 만들고 로직 추가', '반복되는 패턴은 공통 컴포넌트로 분리', '타입 정의를 먼저 하면 AI가 더 정확한 코드 생성'] },
      { subtitle: '효율적인 작업 순서', items: ['1. 레이아웃 (Navbar, Footer, Layout)', '2. 라우팅 설정 (React Router)', '3. 정적 페이지 (Home, About)', '4. 인증 (Login, Register)', '5. 동적 페이지 (게시판, 프로필)'] },
      { subtitle: '스타일링 전략', items: ['CSS Variables로 테마 시스템 구축', '다크/라이트 모드 + 컬러 테마', '반응형 디자인 (모바일 first)', 'AI에게 일관된 디자인 시스템 적용 요청'] },
    ],
    code: `// AI와 프론트엔드 구축 예시

// 1단계: AI에게 레이아웃 요청
// "React Router를 사용한 앱 레이아웃을 만들어줘.
//  Navbar(상단), 콘텐츠 영역, Footer(하단) 구조로."

// 2단계: 페이지 컴포넌트 요청
// "Home 페이지를 만들어줘.
//  Hero 섹션, 카테고리 카드 그리드, 로드맵 포함."

// 3단계: 스타일 요청
// "다크/라이트 모드를 지원하는 CSS를 만들어줘.
//  CSS Variables를 사용하고, 보라색을 기본 테마로."

// AI가 생성한 컴포넌트 구조 예시:
interface HomeProps {}

export default function Home(): React.ReactElement {
  return (
    <>
      <Hero title="제목" subtitle="설명" />
      <div className="main-section">
        <div className="card-grid">
          {categories.map(cat => (
            <Link to={cat.path} key={cat.id} className="card">
              <div className="card-icon">{cat.icon}</div>
              <div className="card-title">{cat.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}`,
    codeLang: 'tsx',
  },
  {
    id: 'backend-integration',
    title: '백엔드 연동',
    icon: '🔗',
    description: 'Supabase를 활용한 백엔드 연동 방법을 배웁니다. 인증, 데이터베이스, 스토리지, 실시간 기능을 다룹니다.',
    content: [
      { subtitle: 'Supabase 설정', items: ['supabase.com에서 프로젝트 생성', 'npm install @supabase/supabase-js', '.env에 URL과 ANON_KEY 설정', 'supabase.ts 클라이언트 설정 파일 생성'] },
      { subtitle: 'CRUD 구현', items: ['AI에게 서비스 함수 작성 요청', 'Supabase SDK로 select, insert, update, delete', 'RLS(Row Level Security) 정책 설정', '에러 처리와 로딩 상태 관리'] },
      { subtitle: 'AI 활용 팁', items: ['"Supabase로 게시판 CRUD를 만들어줘" 형태로 요청', '테이블 스키마를 AI에게 먼저 보여주면 정확도 향상', '인증과 RLS를 함께 요청', '타입을 자동 생성 요청 (supabase gen types)'] },
    ],
    code: `// Supabase 백엔드 연동 예시

// 1. 클라이언트 설정 (src/config/supabase.ts)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// 2. 서비스 함수 (src/services/postService.ts)
export async function getPosts(page: number = 1) {
  const pageSize = 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;
  return { posts: data, total: count };
}

// 3. 인증 (Supabase Auth)
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email, password
  });
  if (error) throw error;
  return data;
}`,
    codeLang: 'typescript',
  },
  {
    id: 'deployment',
    title: '배포 자동화',
    icon: '🚀',
    description: '개발한 프로젝트를 GitHub Pages로 배포하는 방법과 CI/CD 자동화를 배웁니다.',
    content: [
      { subtitle: 'GitHub Pages 배포', items: ['npm run build로 프로덕션 빌드', 'npx gh-pages -d dist로 배포', 'CNAME 파일로 커스텀 도메인 설정', 'vite.config.ts에서 base 경로 설정'] },
      { subtitle: 'SPA 라우팅 처리', items: ['GitHub Pages는 기본적으로 SPA를 지원하지 않음', '404.html에 리다이렉트 스크립트 추가', 'index.html에 라우트 복원 스크립트 추가', 'HashRouter 대안 (비권장)'] },
      { subtitle: 'CI/CD 자동화', items: ['GitHub Actions로 자동 배포', 'main 브랜치 push 시 자동 빌드/배포', '환경 변수를 GitHub Secrets에 설정', 'AI에게 workflow 파일 작성 요청'] },
    ],
    code: `# GitHub Pages 배포 가이드

# 1. 빌드
$ npm run build

# 2. gh-pages로 배포
$ npx gh-pages -d dist

# 3. CNAME 파일 설정 (커스텀 도메인)
$ echo "myapp.dreamitbiz.com" > public/CNAME

# 4. 404.html SPA 리다이렉트 (public/404.html)
# <!DOCTYPE html>
# <script>
#   var path = window.location.pathname;
#   window.location.replace(
#     window.location.origin + '/?p=' + path
#   );
# </script>

# 5. GitHub Actions 자동 배포 (.github/workflows/deploy.yml)
# name: Deploy
# on:
#   push:
#     branches: [main]
# jobs:
#   deploy:
#     runs-on: ubuntu-latest
#     steps:
#       - uses: actions/checkout@v4
#       - uses: actions/setup-node@v4
#       - run: npm ci && npm run build
#       - uses: peaceiris/actions-gh-pages@v4
#         with:
#           github_token: \${{ secrets.GITHUB_TOKEN }}
#           publish_dir: ./dist`,
    codeLang: 'bash',
  },
  {
    id: 'portfolio',
    title: '포트폴리오 완성',
    icon: '💼',
    description: 'AI와 함께 만든 프로젝트를 포트폴리오로 정리하는 방법을 배웁니다. README 작성, 데모 사이트, 프로젝트 문서화를 다룹니다.',
    content: [
      { subtitle: '포트폴리오 프로젝트 요건', items: ['실제 동작하는 배포된 웹사이트', '깔끔한 README.md (스크린샷 포함)', '깃허브 커밋 히스토리 (개발 과정)', 'CRUD 기능 + 인증 + 반응형 디자인'] },
      { subtitle: 'AI로 문서화', items: ['"이 프로젝트의 README.md를 작성해줘"', '기술 스택, 주요 기능, 설치 방법 포함', '스크린샷/GIF 가이드 생성', '라이브 데모 링크 포함'] },
      { subtitle: '포트폴리오 발표 팁', items: ['프로젝트 배경과 목적 설명', '사용한 AI 도구와 워크플로우 공유', '기술적 도전과 해결 과정', '성과 수치 (배포, 사용자, 성능 등)'] },
    ],
    code: `# 포트폴리오 README.md 템플릿

# 🎵 프로젝트 이름

> 한 줄 설명

## 📸 스크린샷
![홈페이지](./screenshots/home.png)
![대시보드](./screenshots/dashboard.png)

## 🛠️ 기술 스택
- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Supabase (Auth, Database, Storage)
- **Deploy**: GitHub Pages
- **AI Tools**: Claude Code, Cursor IDE

## ✨ 주요 기능
- ✅ 회원가입/로그인 (이메일 + Google OAuth)
- ✅ 게시판 CRUD (카테고리 분류)
- ✅ 댓글 및 좋아요
- ✅ 다크/라이트 모드
- ✅ 반응형 디자인

## 🚀 실행 방법
\\\`\\\`\\\`bash
git clone https://github.com/user/project
cd project
npm install
npm run dev
\\\`\\\`\\\`

## 📝 배운 점
AI 도구를 활용한 바이브코딩으로
기존 대비 3배 빠르게 개발할 수 있었습니다.`,
    codeLang: 'markdown',
  },
];

// ===== 7. Q&A (FAQ) =====
export const faqData: FaqItem[] = [
  {
    question: '바이브코딩을 배우려면 코딩을 먼저 알아야 하나요?',
    answer: '기본적인 프로그래밍 개념(변수, 함수, 조건문 등)을 알면 도움이 되지만, 필수는 아닙니다. 바이브코딩은 자연어로 AI에게 지시하는 방식이므로, AI가 생성한 코드를 이해하고 검증하는 능력이 더 중요합니다. 입문 단계에서는 HTML/CSS의 기초와 JavaScript 기본 문법 정도만 알면 시작할 수 있습니다.',
  },
  {
    question: 'Cursor와 Claude Code 중 어떤 것을 먼저 배워야 하나요?',
    answer: 'Cursor를 먼저 배우는 것을 권장합니다. Cursor는 VS Code와 유사한 GUI 환경이라 진입 장벽이 낮고, Tab 자동완성과 Cmd+K 같은 기능을 직관적으로 사용할 수 있습니다. 이후 CLI 환경에 익숙해지면 Claude Code를 추가로 학습하여 에이전틱 코딩의 강력한 기능을 활용하세요. 두 도구를 함께 사용하면 시너지가 큽니다.',
  },
  {
    question: 'AI가 생성한 코드의 품질을 어떻게 검증하나요?',
    answer: 'AI 코드 검증은 여러 단계로 진행합니다: 1) 코드가 요구사항을 정확히 구현하는지 확인, 2) 보안 취약점(XSS, SQL Injection 등) 점검, 3) 에러 처리가 적절한지 확인, 4) TypeScript 타입 체크 (tsc --noEmit), 5) 빌드 테스트 (npm run build), 6) 실제 동작 테스트. AI에게 "이 코드를 리뷰해줘"라고 요청하면 자체 검토도 가능합니다.',
  },
  {
    question: '바이브코딩으로 실제 서비스를 만들 수 있나요?',
    answer: '네, 가능합니다. 실제로 많은 SaaS, 웹 앱, 모바일 앱이 AI 코딩 도구를 활용하여 개발되고 있습니다. 다만, 프로덕션 수준의 서비스를 위해서는 보안, 성능, 확장성에 대한 검토가 필요하며, AI가 생성한 코드에 대한 철저한 리뷰가 중요합니다. 단순한 CRUD 앱부터 시작하여 점진적으로 복잡도를 높여가는 것을 권장합니다.',
  },
  {
    question: 'AI 코딩 도구의 비용은 어느 정도인가요?',
    answer: 'Cursor Pro: $20/월, GitHub Copilot Pro: $10/월, Windsurf: 무료~$15/월, Claude Code와 Codex CLI는 API 사용량 기반 과금입니다. 무료로 시작하려면 Windsurf 무료 플랜이나 GitHub Copilot Free(월 2,000회 자동완성)를 활용하세요. 학습 단계에서는 무료 플랜으로도 충분하며, 실무에서는 Cursor Pro + Claude Code 조합이 가장 효율적입니다.',
  },
  {
    question: '프롬프트를 어떻게 작성해야 좋은 결과를 얻나요?',
    answer: '좋은 프롬프트의 핵심은 구체성과 맥락입니다. 1) 기술 스택을 명시 (React + TypeScript + Supabase), 2) 구체적인 요구사항 나열, 3) 예상 입출력 설명, 4) 제약 조건 명시. 예를 들어 "로그인 만들어줘" 대신 "React + TypeScript로 이메일/비밀번호 로그인 폼을 만들어줘. Supabase Auth를 사용하고, 에러 처리를 포함해"와 같이 작성하세요.',
  },
  {
    question: 'AI가 만든 코드에 저작권 문제가 있나요?',
    answer: 'AI 생성 코드의 저작권은 아직 법적으로 명확하지 않은 영역입니다. 일반적으로 AI 도구 약관에서 사용자에게 생성물의 권리를 부여합니다. 다만, AI가 학습 데이터에서 가져온 코드를 그대로 출력할 가능성이 있으므로, 중요한 프로젝트에서는 코드의 유사성을 점검하는 것이 좋습니다. 오픈소스 라이선스 준수에도 주의하세요.',
  },
  {
    question: '바이브코딩 실력을 어떻게 향상시킬 수 있나요?',
    answer: '바이브코딩 실력 향상의 핵심은 실전 경험입니다. 1) 매일 작은 프로젝트를 AI와 함께 만들기, 2) 다양한 AI 도구를 번갈아 사용해보기, 3) AI가 생성한 코드를 꼼꼼히 분석하며 학습하기, 4) 프롬프트를 다양하게 실험하기, 5) 커뮤니티에서 다른 사람의 프롬프트와 워크플로우 참고하기. 코딩 실력이 늘수록 AI에게 더 정확한 지시를 할 수 있으며, 생성된 코드의 품질도 높아집니다.',
  },
];

// ===== 8. 교육과정 =====
export const educationData: EducationCourse[] = [
  {
    id: 'beginner',
    level: '입문',
    title: '바이브코딩 입문',
    description: 'AI 코딩의 기본 개념을 이해하고, 첫 번째 프로젝트를 만들어보는 과정입니다. 코딩 경험이 없어도 시작할 수 있습니다.',
    topics: [
      '바이브코딩 개념 이해',
      'AI 코딩 도구 설치 (Cursor)',
      '프롬프트 작성 기초',
      'HTML/CSS 기초 이해',
      '첫 번째 웹페이지 만들기',
      'GitHub 기본 사용법',
    ],
  },
  {
    id: 'elementary',
    level: '초급',
    title: '바이브코딩 초급',
    description: 'Cursor와 Claude Code를 활용하여 React 기반 웹 애플리케이션을 개발하는 과정입니다.',
    topics: [
      'JavaScript/TypeScript 핵심 문법',
      'React 컴포넌트 개발',
      'Cursor Tab/Cmd+K/Chat 마스터',
      'Claude Code CLI 기초',
      '프롬프트 엔지니어링 실전',
      'AI 코드 리뷰 방법',
    ],
  },
  {
    id: 'intermediate',
    level: '중급',
    title: '바이브코딩 중급',
    description: '풀스택 애플리케이션을 개발하고, 여러 AI 도구를 조합하여 효율적인 개발 워크플로우를 구축합니다.',
    topics: [
      'Supabase 백엔드 연동',
      '인증 시스템 구현',
      '게시판 CRUD 개발',
      'CLAUDE.md / .cursorrules 작성',
      '멀티파일 에이전틱 코딩',
      'GitHub Pages 배포',
    ],
  },
  {
    id: 'advanced',
    level: '고급',
    title: '바이브코딩 고급',
    description: '실전 프로젝트를 완성하고 포트폴리오를 구축합니다. MCP 서버, CI/CD, 성능 최적화 등 고급 주제를 다룹니다.',
    topics: [
      'MCP 서버 활용',
      'CI/CD 자동화 (GitHub Actions)',
      '성능 최적화 및 코드 스플리팅',
      '실전 프로젝트 개발 (3개)',
      '포트폴리오 사이트 제작',
      '프로젝트 발표 및 피드백',
    ],
  },
];
