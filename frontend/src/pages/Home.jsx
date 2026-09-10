import { useState } from 'react'
import { Link } from 'react-router-dom'
import { portfolio, marqueeStack } from '../data/portfolio'
import { useAuth } from '../context/AuthContext'
import useTypewriter from '../hooks/useTypewriter'
import Reveal from '../components/Reveal'
import api from '../lib/api'

function SectionHeading({ index, title, sub }) {
  return (
    <Reveal>
      <p className="font-mono text-sm text-accent">{index}.</p>
      <h2 className="mt-1 text-2xl font-extrabold text-white md:text-3xl">{title}</h2>
      {sub && <p className="mt-3 max-w-2xl text-sm text-slate-400 md:text-base">{sub}</p>}
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-cyan-400 to-blue-600" />
    </Reveal>
  )
}

const terminalRows = [
  { key: 'name', value: "'Saqib Dar'", color: 'text-sky-300' },
  { key: 'role', value: "'Full Stack Developer'", color: 'text-pink-400' },
  { key: 'location', value: "'Anantnag, India'", color: 'text-indigo-300' },
  { key: 'email', value: "'darsaqib4979@gmail.com'", color: 'text-emerald-300' },
  { key: 'openToWork', value: 'true', color: 'text-amber-300' },
  { key: 'stack', value: "[React, Node, FastAPI, Mongo]", color: 'text-cyan-300' },
]

function Hero() {
  const typed = useTypewriter(portfolio.roles)

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid-lg [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 animate-blob rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 animate-blob rounded-full bg-blue-600/20 blur-3xl [animation-delay:4s]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 md:py-28 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {portfolio.openToWork}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-[3.4rem]">
              Hi, I'm <span className="text-gradient">{portfolio.name}.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <h2 className="mt-4 h-10 font-mono text-xl text-slate-300 md:text-2xl">
              <span className="text-accent">&gt;</span> {typed}
              <span className="ml-0.5 inline-block h-6 w-2.5 animate-blink bg-accent align-middle" />
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
              {portfolio.intro}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">
                View my work <span aria-hidden>→</span>
              </a>
              <a href="#contact" className="btn-ghost">
                Get in touch
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-slate-500">
              <a href={`mailto:${portfolio.contact.email}`} className="hover:text-accent">
                @email
              </a>
              <a href={portfolio.contact.github} target="_blank" rel="noreferrer" className="hover:text-accent">
                @github
              </a>
              <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">
                @linkedin
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:justify-self-end lg:w-full">
          <div className="card animate-float overflow-hidden shadow-glow-lg">
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950/70 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-rose-500" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="ml-3 font-mono text-xs text-slate-500">saqib — dev.json</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-sm leading-7">
              <code>
                <span className="text-slate-500">{"{"}</span>
                {terminalRows.map((row, i) => (
                  <div key={row.key}>
                    <span className="select-none text-slate-500">  </span>
                    <span className="text-sky-400">{row.key}</span>
                    <span className="text-slate-500">: </span>
                    <span className={row.color}>{row.value}</span>
                    <span className="text-slate-500">,</span>
                    {i === terminalRows.length - 1 && <span className="sr-only">.</span>}
                  </div>
                ))}
                <span className="text-slate-500">{"}"}</span>
                <div className="mt-2">
                  <span className="text-emerald-400">$ </span>
                  <span className="text-slate-400">npm run deploy</span>
                  <span className="ml-2 animate-blink inline-block h-4 w-2 bg-slate-400 align-middle" />
                </div>
              </code>
            </pre>
          </div>
        </Reveal>
      </div>

      {/* Tech marquee */}
      <div className="relative border-y border-slate-800 bg-slate-950/60 py-4">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
            {[...marqueeStack, ...marqueeStack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="flex items-center gap-8 whitespace-nowrap font-mono text-sm text-slate-500"
              >
                <span className="text-accent">▹</span> {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsBand() {
  return (
    <section className="relative border-b border-slate-800 bg-slate-900/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-4 py-10 md:grid-cols-4">
        {portfolio.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90} className="px-4 py-4 text-center">
            <p className="text-3xl font-extrabold text-gradient md:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading index="01" title="About Me" />
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="card h-full p-6 md:p-8">
              <p className="text-slate-300">{portfolio.intro}</p>
              <p className="mt-4 text-slate-400">
                I have hands-on experience shipping full-stack products — a production-style
                helpdesk, an AI email classifier, and this very portfolio. At Frejun Inc. I work
                across backend systems and observability, keeping WhatsApp messaging infra at
                99.9% uptime.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { k: 'Location', v: 'Anantnag, JK, India' },
                  { k: 'Education', v: 'B.Tech CSE · LPU' },
                  { k: 'Focus', v: 'Full-stack · Backend' },
                ].map((item) => (
                  <div key={item.k} className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                    <p className="font-mono text-xs text-accent">{item.k}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-200">{item.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card flex h-full flex-col p-6 md:p-8">
              <p className="font-mono text-sm text-accent">~/what-i-do</p>
              <ul className="mt-6 space-y-6">
                {[
                  ['Full-stack apps', 'React + Node/FastAPI + SQL/NoSQL, end to end.'],
                  ['Backend & APIs', 'REST, authentication (JWT/OAuth), scalable design.'],
                  ['DevOps basics', 'Docker, AWS, CI/CD pipelines and monitoring.'],
                ].map(([title, text]) => (
                  <li key={title} className="flex gap-4">
                    <span className="mt-1 h-2 w-2 shrink-0 rotate-45 bg-gradient-to-br from-cyan-400 to-blue-600" />
                    <div>
                      <p className="font-semibold text-white">{title}</p>
                      <p className="mt-0.5 text-sm text-slate-400">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading index="02" title="Skills & Tech Stack" sub="The core tools I use daily, plus my broader toolkit." />

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="card h-full p-6 md:p-8">
              <h3 className="font-mono text-sm text-accent">core-stack.conf</h3>
              <div className="mt-6 space-y-5">
                {portfolio.coreStack.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-baseline justify-between text-sm">
                      <span className="font-medium text-slate-200">{skill.name}</span>
                      <span className="font-mono text-xs text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {portfolio.skills.map((group, i) => (
              <Reveal key={group.category} delay={i * 60}>
                <div className="card card-hover h-full p-5">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs font-medium text-slate-300 transition hover:border-accent hover:text-accent"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading index="03" title="Experience" />
        <div className="mt-10">
          {portfolio.experience.map((job, i) => (
            <Reveal key={job.role}>
              <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                <p className="pt-1 font-mono text-sm text-slate-500">{job.period}</p>
                <div className="relative border-l border-slate-800 pl-8">
                  <span className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-slate-950" />
                  <div
                    className={`card card-hover p-6 md:p-7 ${
                      job.current ? 'border-accent/50 shadow-glow !bg-slate-900' : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-white">
                        {job.role} <span className="text-slate-400">· {job.company}</span>
                      </h3>
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                          CURRENT
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.tech.map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                    <ul className="mt-5 space-y-2.5 text-sm text-slate-400">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {i < portfolio.experience.length - 1 && <div className="h-8" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const featured = portfolio.projects.filter((p) => p.featured)
  const more = portfolio.projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          index="04"
          title="Featured Projects"
          sub="Things I've designed, built and shipped. Each one solved a real problem."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.name} delay={i * 80}>
              <article className="card card-hover group flex h-full flex-col overflow-hidden">
                <div className="relative flex h-32 items-center justify-center overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl transition group-hover:bg-cyan-500/25" />
                  <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-600/10 blur-2xl transition group-hover:bg-blue-600/25" />
                  <span className="relative font-mono text-sm text-slate-500 transition group-hover:text-accent">
                    ~/projects/{project.name.toLowerCase().replaceAll(' ', '-')}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-white transition group-hover:text-accent">
                    {project.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-slate-500">{project.tagline}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{project.description}</p>

                  {project.metrics.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {project.metrics.map((m) => (
                        <div key={m} className="rounded-lg border border-slate-800 bg-slate-950/60 px-2 py-2 text-center">
                          <p className="text-[11px] font-medium leading-tight text-slate-300">{m}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <ul className="mt-4 space-y-1.5 text-sm text-slate-400">
                    {project.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex gap-5 border-t border-slate-800 pt-4">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-sm font-semibold text-accent transition hover:text-white"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {more.length > 0 && (
          <>
            <Reveal>
              <h3 className="mt-14 font-mono text-sm text-slate-500">more-work/</h3>
            </Reveal>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {more.map((project, i) => (
                <Reveal key={project.name} delay={i * 60}>
                  <a
                    href={project.links[0]?.url || portfolio.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="card card-hover flex h-full flex-col p-5"
                  >
                    <h4 className="font-bold text-white group-hover:text-accent">{project.name}</h4>
                    <p className="mt-1 font-mono text-[11px] text-slate-500">{project.tagline}</p>
                    <p className="mt-2 text-sm text-slate-400">{project.description}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      {project.tech.map((t) => (
                        <span key={t} className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading index="05" title="Achievements" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 70}>
              <div className="card card-hover h-full p-6">
                <span className="font-mono text-3xl font-extrabold text-gradient">{a.rank}</span>
                <h3 className="mt-4 font-bold text-white">{a.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading index="06" title="Education" />
        <div className="mt-10 max-w-3xl space-y-6">
          {portfolio.education.map((edu, i) => (
            <Reveal key={edu.school} delay={i * 70}>
              <div className="relative border-l border-slate-800 pl-8">
                <span className="absolute -left-[7px] top-2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-slate-950" />
                <div className="card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-bold text-white">{edu.school}</h3>
                    <span className="font-mono text-xs text-slate-500">{edu.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">
                    {edu.degree} <span className="text-slate-600">·</span> {edu.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' })
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setStatus(null)
    setSending(true)
    try {
      await api.post('/contacts/messages', form)
      setStatus({ ok: true, text: "Message sent — Saqib will reply soon." })
      setForm({ name: '', email: '', subject: '', body: '' })
    } catch (err) {
      setStatus({ ok: false, text: err.response?.data?.detail || 'Could not send message.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading index="07" title="Contact" sub="Got a role, project or just want to say hi? Reach out." />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="card h-full p-6 md:p-8">
              <h3 className="font-mono text-sm text-accent">contact.call()</h3>
              <p className="mt-3 text-slate-400">
                I'm actively looking for Software Development Engineer opportunities and fun
                collaborations.
              </p>
              <dl className="mt-8 space-y-4 text-sm">
                {[
                  ['email', portfolio.contact.email, `mailto:${portfolio.contact.email}`],
                  ['phone', portfolio.contact.phone, `tel:${portfolio.contact.phone}`],
                  ['linkedin', 'in/saqib-dar', portfolio.contact.linkedin],
                  ['github', 'SaqibDar112', portfolio.contact.github],
                ].map(([label, value, href]) => (
                  <div key={label} className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-500">{label}</span>
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-slate-200 transition hover:text-accent">
                      {value}
                    </a>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {user ? (
              <form onSubmit={submit} className="card space-y-4 p-6 md:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="label" htmlFor="c-name">Name</label>
                    <input id="c-name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="label" htmlFor="c-email">Email</label>
                    <input id="c-email" type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="label" htmlFor="c-subject">Subject</label>
                  <input id="c-subject" className="input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div>
                  <label className="label" htmlFor="c-body">Message</label>
                  <textarea id="c-body" rows="4" className="input resize-none" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required />
                </div>
                {status && (
                  <p className={`text-sm ${status.ok ? 'text-emerald-400' : 'text-rose-400'}`}>{status.text}</p>
                )}
                <button type="submit" className="btn-primary w-full" disabled={sending}>
                  {sending ? 'Sending…' : 'Send message'}
                </button>
              </form>
            ) : (
              <div className="card flex h-full flex-col items-center justify-center gap-4 p-10 text-center">
                <p className="text-slate-400">Log in to send a message directly from this form.</p>
                <Link to="/login" className="btn-primary">Login to contact</Link>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div>
      <Hero />
      <StatsBand />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Education />
      <Contact />
    </div>
  )
}