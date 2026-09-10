import axios from 'axios'

const api = axios.create({ baseURL: '/api' })
const TOKEN_KEY = 'saqib_tokens'

export function getTokens() {
  try {
    return JSON.parse(localStorage.getItem(TOKEN_KEY))
  } catch {
    return null
  }
}

export function storeTokens(tokens) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens))
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getToken() {
  return getTokens()?.access_token || null
}

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let refreshing = null

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { response, config } = error
    const isAuthRoute =
      config?.url?.includes('/auth/login') || config?.url?.includes('/auth/register')

    if (response?.status === 401 && !config?._retry && !isAuthRoute) {
      config._retry = true
      const tokens = getTokens()
      if (tokens?.refresh_token) {
        refreshing =
          refreshing ||
          axios.post('/api/auth/refresh', { refresh_token: tokens.refresh_token })
        try {
          const { data } = await refreshing
          storeTokens(data)
          config.headers.Authorization = `Bearer ${data.access_token}`
          return api(config)
        } catch {
          clearTokens()
          window.dispatchEvent(new Event('auth:logout'))
        } finally {
          refreshing = null
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api