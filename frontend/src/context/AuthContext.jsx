import { createContext, useContext, useCallback, useEffect, useState } from 'react'
import api, { clearTokens, getToken, storeTokens } from '../lib/api'

const AuthContext = createContext(null)

function readableError(err) {
  const detail = err.response?.data?.detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) return detail.map((d) => d.msg).join(', ')
  return 'Something went wrong. Please try again.'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    if (!getToken()) {
      setUser(null)
      setLoading(false)
      return null
    }
    try {
      const { data } = await api.get('/auth/me')
      setUser(data)
      return data
    } catch {
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshUser()
    const onLogout = () => setUser(null)
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [refreshUser])

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password })
      storeTokens({ access_token: data.access_token, refresh_token: data.refresh_token })
      setUser(data.user)
      return { ok: true, user: data.user }
    } catch (err) {
      return { ok: false, error: readableError(err) }
    }
  }

  const register = async (payload) => {
    try {
      const { data } = await api.post('/auth/register', payload)
      storeTokens({ access_token: data.access_token, refresh_token: data.refresh_token })
      setUser(data.user)
      return { ok: true, user: data.user }
    } catch (err) {
      return { ok: false, error: readableError(err) }
    }
  }

  const logout = () => {
    clearTokens()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}