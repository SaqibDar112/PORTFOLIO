import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-slate-800 text-accent' : 'text-slate-300 hover:text-white'
  }`

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div
        className="h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-mono text-lg font-bold text-white" onClick={() => setOpen(false)}>
          saqib<span className="text-accent">.dev</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <a href="/#about" className={linkClass({ isActive: false })}>About</a>
          <a href="/#skills" className={linkClass({ isActive: false })}>Skills</a>
          <a href="/#experience" className={linkClass({ isActive: false })}>Experience</a>
          <a href="/#projects" className={linkClass({ isActive: false })}>Projects</a>
          <a href="/#contact" className={linkClass({ isActive: false })}>Contact</a>
          {user ? (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              <button onClick={handleLogout} className="btn-ghost !px-3 !py-1.5">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className="btn-primary !px-3 !py-1.5">
                Sign up
              </NavLink>
            </>
          )}
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-300 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="text-lg leading-none">{open ? '✕' : '☰'}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {[
              ['About', '/#about'],
              ['Skills', '/#skills'],
              ['Experience', '/#experience'],
              ['Projects', '/#projects'],
              ['Contact', '/#contact'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            {user ? (
              <>
                <NavLink to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>
                  Dashboard
                </NavLink>
                <button onClick={handleLogout} className="btn-ghost mt-1 w-full">
                  Logout
                </button>
              </>
            ) : (
              <div className="mt-2 flex gap-2">
                <NavLink to="/login" className={`btn-ghost flex-1`} onClick={() => setOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/register" className="btn-primary flex-1" onClick={() => setOpen(false)}>
                  Sign up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}