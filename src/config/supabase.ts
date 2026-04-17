import { createClient, SupabaseClient } from '@supabase/supabase-js'

const PREFIX = 'VITE_SUPABASE_'

const supabaseUrl = import.meta.env[`${PREFIX}URL`]
const supabaseAnonKey = import.meta.env[`${PREFIX}ANON_KEY`]

let supabase: SupabaseClient | null = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: true,
      autoRefreshToken: true,
      persistSession: true,
    }
  })
} else {
  console.warn(
    'Supabase 환경 변수가 설정되지 않았습니다.\n' +
    `.env 파일에 ${PREFIX}URL 과 ${PREFIX}ANON_KEY 를 설정하세요.\n` +
    '인증 기능이 비활성화됩니다.'
  )
}

export { supabase }

/* ── SSO 크로스도메인 쿠키 헬퍼 ── */
const SSO_KEY = 'dreamit_sso'
const _isLocal = typeof window !== 'undefined' &&
  (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
const _cookieDomain = _isLocal ? '' : ';domain=.dreamitbiz.com'

export function setSharedSession(rt: string): void {
  document.cookie = `${SSO_KEY}=${rt}${_cookieDomain};path=/;max-age=2592000;SameSite=Lax${_isLocal ? '' : ';Secure'}`
}
export function getSharedSession(): string | null {
  const m = document.cookie.match(/(^| )dreamit_sso=([^;]+)/)
  return m ? m[2] : null
}
export function clearSharedSession(): void {
  document.cookie = `${SSO_KEY}=${_cookieDomain};path=/;max-age=0`
}
