import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'

type Mode = 'login' | 'signup' | 'reset'

export default function Login() {
  const { user, signIn, signUp, signInWithGoogle, signInWithKakao, resetPassword } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (user) {
    navigate('/', { replace: true })
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'reset') {
        await resetPassword(email)
        showToast('비밀번호 재설정 이메일을 발송했습니다.', 'success')
        setMode('login')
      } else if (mode === 'signup') {
        if (!fullName.trim()) { setError('이름을 입력해주세요.'); setLoading(false); return }
        const { error: err } = await signUp(email, password, fullName)
        if (err) { setError(err.message); setLoading(false); return }
        showToast('회원가입 완료! 이메일을 확인해주세요.', 'success')
        setMode('login')
      } else {
        const { error: err } = await signIn(email, password)
        if (err) { setError(err.message); setLoading(false); return }
        navigate('/')
      }
    } catch (err: any) {
      setError(err.message || '오류가 발생했습니다.')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <span className="nav__logo-icon">V</span>
          <span>VIBE CODING</span>
        </Link>

        <h2 className="auth-title">
          {mode === 'login' ? '로그인' : mode === 'signup' ? '회원가입' : '비밀번호 재설정'}
        </h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="auth-field">
              <label htmlFor="fullName">이름</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="이름을 입력하세요"
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          {mode !== 'reset' && (
            <div className="auth-field">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                minLength={6}
              />
            </div>
          )}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? '처리 중...' :
              mode === 'login' ? '로그인' :
              mode === 'signup' ? '회원가입' : '재설정 이메일 발송'}
          </button>
        </form>

        <div className="auth-divider"><span>또는</span></div>

        <div className="auth-social">
          <button className="auth-social-btn auth-social-btn--google" onClick={signInWithGoogle}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google 로그인
          </button>
          <button className="auth-social-btn auth-social-btn--kakao" onClick={signInWithKakao}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#3C1E1E" d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67l-1.19 4.36a.35.35 0 00.53.38l5.07-3.35c.3.02.61.04.93.04 5.52 0 10-3.58 10-7.94S17.52 3 12 3z"/></svg>
            Kakao 로그인
          </button>
        </div>

        <div className="auth-switch">
          {mode === 'login' ? (
            <>
              계정이 없으신가요? <button onClick={() => { setMode('signup'); setError('') }}>회원가입</button>
              <br />
              <button onClick={() => { setMode('reset'); setError('') }}>비밀번호를 잊으셨나요?</button>
            </>
          ) : (
            <>
              이미 계정이 있으신가요? <button onClick={() => { setMode('login'); setError('') }}>로그인</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
