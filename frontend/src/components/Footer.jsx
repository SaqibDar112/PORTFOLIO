import { portfolio } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} {portfolio.name}. Built with React, Vite &amp; FastAPI.
        </p>
        <div className="flex gap-4 text-sm">
          <a
            href={portfolio.contact.github}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 transition hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={portfolio.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 transition hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${portfolio.contact.email}`}
            className="text-slate-400 transition hover:text-accent"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}