import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await register(form)
    setLoading(false)
    if (result.ok) {
      navigate('/dashboard', { replace: true })
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-24">
      <h1 className="text-2xl font-bold text-white">Create an account</h1>
      <p className="mt-1 text-sm text-slate-400">
        Sign up to message Saqib directly and manage your profile.
      </p>

      <form onSubmit={submit} className="card mt-8 space-y-4 p-6">
        <div>
          <label className="label" htmlFor="name">Name</label>
          <input
            id="name"
            className="input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
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
            minLength={8}
            className="input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <p className="mt-1 text-xs text-slate-500">Minimum 8 characters.</p>
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-accent hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}