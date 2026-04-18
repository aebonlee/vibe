import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase, setSharedSession, getSharedSession, clearSharedSession } from '../config/supabase'
import { ADMIN_EMAILS } from '../config/admin'
import { useIdleTimeout } from '../hooks/useIdleTimeout';
import ProfileCompleteModal from '../components/ProfileCompleteModal';

interface AuthContextType {
  session: Session | null
  user: User | null
  loading: boolean
  isAdmin: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signInWithGoogle: () => Promise<void>
  signInWithKakao: () => Promise<void>
  resetPassword: (email: string) => Promise<any>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  
  // ─── 프로필 완성 체크용 user_profiles 로드 ───
  const _loadUserProfile = useCallback(async (uid: string) => {
    try {
      const { data } = await supabase!.from('user_profiles').select('name,phone').eq('id', uid).maybeSingle();
      _setUserProfile(data);
    } catch { _setUserProfile(null); }
  }, []);

  const ensureProfile = useCallback(async (authUser: User) => {
    if (!supabase) return
    const { data: existing } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', authUser.id)
      .maybeSingle()

    if (!existing) {
      const meta = authUser.user_metadata || {}
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: authUser.id,
          email: authUser.email || '',
          display_name: meta.full_name || meta.name || meta.preferred_username || '',
          avatar_url: meta.avatar_url || meta.picture || '',
          provider: meta.provider || authUser.app_metadata?.provider || 'email',
          role: 'member',
          signup_domain: window.location.hostname,
          visited_sites: [window.location.hostname],
        }, { onConflict: 'id' })
      if (error) {
        console.error('ensureProfile upsert error:', error)
      }
    } else {
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('visited_sites')
        .eq('id', authUser.id)
        .maybeSingle()

      const sites = Array.isArray(profileData?.visited_sites) ? profileData.visited_sites as string[] : []
      const hostname = window.location.hostname
      if (!sites.includes(hostname)) {
        supabase.from('user_profiles')
          .update({
            visited_sites: [...sites, hostname],
            last_sign_in_at: new Date().toISOString(),
          })
          .eq('id', authUser.id)
          .then(() => {})
      }
    }

    try {
      await supabase.rpc('check_user_status', {
        target_user_id: authUser.id,
        current_domain: window.location.hostname,
      })
    } catch {
      // check_user_status 미존재 시 무시
    }
    await _loadUserProfile(authUser.id);
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    let mounted = true

    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      if (!mounted) return
      setSession(s)
      if (s?.user) {
        if (s.refresh_token) setSharedSession(s.refresh_token)
        await ensureProfile(s.user)
        await _loadUserProfile(s.user.id)
      } else {
        // SSO 쿠키로 세션 복원 시도
        const rt = getSharedSession()
        if (rt) {
          try {
            const { data } = await supabase!.auth.refreshSession({ refresh_token: rt })
            if (data.session) {
              setSession(data.session)
              await ensureProfile(data.session.user)
              await _loadUserProfile(data.session.user.id)
            } else {
              clearSharedSession()
            }
          } catch {
            clearSharedSession()
          }
        }
      }
      if (mounted) setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return
      setSession(session)
      if (session?.refresh_token) setSharedSession(session.refresh_token)
      if (_event === 'SIGNED_OUT') clearSharedSession()
      if (session?.user) {
        await ensureProfile(session.user)
        await _loadUserProfile(session.user.id)
      }
      if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') {
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [ensureProfile])

  const noSupabaseError = { error: { message: 'Supabase가 설정되지 않았습니다.' } }

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!supabase) return noSupabaseError
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/',
        data: { full_name: fullName }
      }
    })
    if (error) throw error
    if (data?.user) {
      await supabase.from('user_profiles').upsert({
        id: data.user.id,
        email: data.user.email,
        display_name: fullName || '',
        signup_domain: window.location.hostname,
        visited_sites: [window.location.hostname],
      }, { onConflict: 'id' })
    }
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) return noSupabaseError
    return await supabase.auth.signInWithPassword({ email, password })
  }

  const signInWithGoogle = async () => {
    if (!supabase) return
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    })
  }

  const signInWithKakao = async () => {
    if (!supabase) return
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: window.location.origin,
        scopes: 'profile_nickname profile_image account_email',
      }
    })
  }

  const resetPassword = async (email: string) => {
    if (!supabase) return noSupabaseError
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/login',
    })
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut({ scope: 'local' })
    clearSharedSession()
  }

  const user = session?.user ?? null
  const allEmails = [
    user?.email,
    user?.user_metadata?.email as string | undefined,
    (user?.identities?.[0]?.identity_data as Record<string, unknown> | undefined)?.email as string | undefined,
  ].filter((e): e is string => Boolean(e)).map((e) => e.toLowerCase())
  const isAdmin = allEmails.some((e) => ADMIN_EMAILS.includes(e))

  const value: AuthContextType = {
    session,
    user,
    loading,
    isAdmin,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithKakao,
    resetPassword,
    signOut,
  }


  // 10분 무동작 세션 타임아웃
  useIdleTimeout({
  enabled: !!user,
  onTimeout: () => {
  clearSharedSession();
  const [_userProfile, _setUserProfile] = useState<any>(null);
  },
  });
  const refreshProfile = useCallback(async () => { if (user) await _loadUserProfile(user.id); }, [user, _loadUserProfile]);
  const needsProfileCompletion = !!user && !!_userProfile && (!_userProfile.name || !_userProfile.phone);


  return (
    <AuthContext.Provider value={value}>
      {children}
      {needsProfileCompletion && user && (
        <ProfileCompleteModal user={user} onComplete={refreshProfile} />
      )}
    </AuthContext.Provider>
  )
}
