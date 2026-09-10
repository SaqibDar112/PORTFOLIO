import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(form.email, form.password)
    setLoading(false)
    if (result.ok) {
      navigate(location.state?.from || '/', { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-24">
      <h1 className="text-2xl font-bold text-white">Welcome back</h1>
      <p className="mt-1 text-sm text-slate-400">Log in to your account to continue.</p>

      <form onSubmit={submit} className="card mt-8 space-y-4 p-6">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-accent hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}