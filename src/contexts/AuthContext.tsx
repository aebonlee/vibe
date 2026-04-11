import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '../config/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signInWithGoogle: () => Promise<any>
  signInWithKakao: () => Promise<any>
  resetPassword: (email: string) => Promise<any>
  signOut: () => Promise<any>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null
      setUser(u)

      if (u && event === 'SIGNED_IN') {
        supabase!.from('user_profiles')
          .update({ last_sign_in_at: new Date().toISOString() })
          .eq('id', u.id)
          .then(() => {})

        const hostname = window.location.hostname
        supabase!.from('user_profiles')
          .select('visited_sites')
          .eq('id', u.id)
          .single()
          .then(({ data: profile }) => {
            if (profile) {
              const sites = (profile as any).visited_sites || []
              if (!sites.includes(hostname)) {
                supabase!.from('user_profiles')
                  .update({ visited_sites: [...sites, hostname] })
                  .eq('id', u.id)
                  .then(() => {})
              }
            }
          })
      }

      if (event === 'INITIAL_SESSION') {
        setLoading(false)
      }
    })

    const fallback = setTimeout(() => {
      setLoading(prev => {
        if (prev) console.warn('Auth: INITIAL_SESSION timeout')
        return false
      })
    }, 5000)

    return () => {
      clearTimeout(fallback)
      subscription.unsubscribe()
    }
  }, [])

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
        full_name: fullName || '',
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
    if (!supabase) return noSupabaseError
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin + '/' }
    })
  }

  const signInWithKakao = async () => {
    if (!supabase) return noSupabaseError
    return await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: window.location.origin + '/',
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
    if (!supabase) return noSupabaseError
    return await supabase.auth.signOut({ scope: 'local' })
  }

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithKakao,
    resetPassword,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
