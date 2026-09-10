import { useEffect, useState } from 'react'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, refreshUser } = useAuth()
  const [profile, setProfile] = useState({ name: '', title: '', bio: '', location: '' })
  const [profileMsg, setProfileMsg] = useState('')
  const [password, setPassword] = useState({ old_password: '', new_password: '' })
  const [pwMsg, setPwMsg] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPw, setSavingPw] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        title: user.title || '',
        bio: user.bio || '',
        location: user.location || '',
      })
    }
  }, [user])

  useEffect(() => {
    if (user?.is_superuser) {
      api.get('/contacts/messages').then((res) => setMessages(res.data)).catch(() => {})
    }
  }, [user])

  const saveProfile = async (e) => {
    e.preventDefault()
    setProfileMsg('')
    setSavingProfile(true)
    try {
      await api.put('/auth/me', profile)
      await refreshUser()
      setProfileMsg('Profile updated.')
    } catch {
      setProfileMsg('Failed to update profile.')
    } finally {
      setSavingProfile(false)
    }
  }

  const changePassword = async (e) => {
    e.preventDefault()
    setPwMsg('')
    setSavingPw(true)
    try {
      await api.post('/auth/change-password', password)
      setPassword({ old_password: '', new_password: '' })
      setPwMsg('Password changed.')
    } catch (err) {
      setPwMsg(err.response?.data?.detail || 'Could not change password.')
    } finally {
      setSavingPw(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">
        Signed in as <span className="text-accent">{user?.email}</span>
        {user?.is_superuser && <span className="ml-2 rounded bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300">Admin</span>}
      </p>

      {user?.is_superuser && (
        <div className="card mt-10 p-6">
          <h2 className="text-lg font-bold text-white">Contact Messages ({messages.length})</h2>
          {messages.length === 0 ? (
            <p className="mt-3 text-sm text-slate-400">No messages yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {messages.map((m) => (
                <li key={m.id} className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-semibold text-white">{m.subject}</p>
                    <span className="shrink-0 font-mono text-xs text-slate-500">
                      {new Date(m.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {m.name} · {m.email}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm text-slate-300">{m.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <form onSubmit={saveProfile} className="card space-y-4 p-6">
          <h2 className="text-lg font-bold text-white">Profile</h2>
          <div>
            <label className="label" htmlFor="name">Name</label>
            <input
              id="name"
              className="input"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="title">Title</label>
            <input
              id="title"
              className="input"
              placeholder="e.g. Full Stack Developer"
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            />
          </div>
          <div>
            <label className="label" htmlFor="location">Location</label>
            <input
              id="location"
              className="input"
              placeholder="City, Country"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            />
          </div>
          <div>
            <label className="label" htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              rows="3"
              className="input resize-none"
              placeholder="Short introduction"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>
          {profileMsg && (
            <p className="text-sm text-emerald-400">{profileMsg}</p>
          )}
          <button type="submit" className="btn-primary w-full" disabled={savingProfile}>
            {savingProfile ? 'Saving…' : 'Save Profile'}
          </button>
        </form>

        <form onSubmit={changePassword} className="card space-y-4 p-6">
          <h2 className="text-lg font-bold text-white">Change Password</h2>
          <div>
            <label className="label" htmlFor="old_password">Current password</label>
            <input
              id="old_password"
              type="password"
              className="input"
              value={password.old_password}
              onChange={(e) => setPassword({ ...password, old_password: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="new_password">New password</label>
            <input
              id="new_password"
              type="password"
              minLength={8}
              className="input"
              value={password.new_password}
              onChange={(e) => setPassword({ ...password, new_password: e.target.value })}
              required
            />
          </div>
          {pwMsg && (
            <p className={`text-sm ${pwMsg === 'Password changed.' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {pwMsg}
            </p>
          )}
          <button type="submit" className="btn-ghost w-full" disabled={savingPw}>
            {savingPw ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}