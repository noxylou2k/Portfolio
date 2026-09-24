import { useEffect, useState } from 'react'
import MotionCursor from './MotionCursor.jsx'
import './App.css'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
]

const SERVICES = [
  'Video Editing',
  'Color Grading',
  'Motion Graphics',
  'Sound Design',
]

const TOOLS = [
  { name: 'CapCut', icon: 'hourglass' },
  { name: 'Premiere Pro', icon: 'ring' },
]

const MARQUEE_HALF = Array.from({ length: 4 }, () => TOOLS).flat()

const STATS = [
  { value: '2', label: 'Years editing' },
  { value: '90+', label: 'Videos delivered' },
  { value: '90K+', label: 'Total views' },
]

const SKILLS = [
  { name: 'Short-form / Reels', level: 92 },
  { name: 'Color Grading', level: 70 },
  { name: 'Motion Graphics', level: 82 },
  { name: 'Sound Design & Mixing', level: 80 },
  { name: 'Storytelling & Pacing', level: 70 },
]

const PROJECTS = [
  {
    title: 'iShowSpeed Gets Blessed by Apple',
    category: 'Stream Clip',
    youtube: 'https://youtube.com/shorts/Q7AG36MEv3g',
    tone: 'warm',
  },
  {
    title: 'Gaethje vs. Paddy’s Strength',
    category: 'Podcast Clip',
    youtube: 'https://youtube.com/shorts/RtgGR9oqB6M',
    tone: 'mono',
  },
  {
    title: 'Kai Cenat: He Actually Said It',
    category: 'Stream Clip',
    youtube: 'https://youtube.com/shorts/VbFi-9F8D7U',
    tone: 'dusk',
  },
  {
    title: 'Isaiah Rashad at Tiny Desk',
    category: 'Music Clip',
    tiktok: 'https://www.tiktok.com/@peakmode82/video/7688545433848728840',
    thumbnail: `${import.meta.env.BASE_URL}thumbs/tiktok-7688545433848728840.jpg`,
    tone: 'warm',
  },
]

const SOCIALS = [
  { label: 'YouTube', href: 'https://www.youtube.com/@peakmode04' },
  { label: 'Instagram', href: 'https://www.instagram.com/tyler.chua04' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kedrick-tyler-chua-117360331' },
]

const EMAIL = 'kedricktylerchua@gmail.com'

function parseVideo(project) {
  if (project.tiktok) {
    const match = project.tiktok.match(/\/video\/(\d+)/)
    if (!match) return null
    return {
      embed: `https://www.tiktok.com/embed/v2/${match[1]}`,
      thumb: project.thumbnail,
      vertical: true,
      label: 'TikTok',
    }
  }

  if (project.youtube) {
    const match = project.youtube.match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/)
    if (!match) return null
    const id = match[1]
    const vertical = project.youtube.includes('/shorts/')
    return {
      embed: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
      thumb: `https://i.ytimg.com/vi/${id}/${vertical ? 'oar2.jpg' : 'hqdefault.jpg'}`,
      vertical,
      label: vertical ? 'Shorts' : null,
    }
  }

  return null
}

function ArrowIcon() {
  return (
    <span className="arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  )
}

function ToolIcon({ type }) {
  return <span className={`tool-icon tool-icon--${type}`} aria-hidden="true" />
}

function AvailabilityBadge() {
  return (
    <span className="badge">
      <span className="badge-dot" aria-hidden="true" />
      Available for remote · Part-time
    </span>
  )
}

function scrollToTop(e) {
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
  history.replaceState(null, '', window.location.pathname)
}

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="#home" className="logo" onClick={scrollToTop}>
        TylerCuts
      </a>
      <nav className="nav-links">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="btn btn--light">
          Get in touch
          <ArrowIcon />
        </a>
      </nav>
    </header>
  )
}

function HeroMonitor() {
  return (
    <div className="monitor" aria-hidden="true">
      <div className="monitor-screen">
        <span className="rec">● REC</span>
        <span className="timecode">00:01:24:12</span>
        <div className="play">
          <PlayIcon />
        </div>
      </div>
      <div className="timeline">
        <div className="track track--v">
          <span style={{ width: '22%' }} />
          <span style={{ width: '34%' }} />
          <span style={{ width: '18%' }} />
          <span style={{ width: '26%' }} />
        </div>
        <div className="track track--a">
          <span style={{ width: '48%' }} />
          <span style={{ width: '52%' }} />
        </div>
        <div className="playhead" />
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-body">
        <div className="hero-title">
          <p className="hero-greet">Hey, I'm Tyler, a</p>
          <h1>
            Video
            <br />
            Editor
          </h1>
        </div>
        <HeroMonitor />
        <div className="hero-tagline">
          <AvailabilityBadge />
          <h3>Great edits should feel invisible.</h3>
          <p>From raw footage to final cut, I craft stories that hook, hold and convert.</p>
        </div>
      </div>
      <ul className="services">
        {SERVICES.map((service, i) => (
          <li key={service}>
            <span className="num">
              <span className="hash">#</span>0{i + 1}
            </span>
            {service}
          </li>
        ))}
      </ul>
    </section>
  )
}

function Tools() {
  return (
    <section className="tools">
      <p className="tools-label">Tools I cut, grade &amp; animate with</p>
      <div className="tools-marquee">
        <div className="tools-track">
          {[...MARQUEE_HALF, ...MARQUEE_HALF].map((tool, i) => (
            <span key={i} className="tool">
              <ToolIcon type={tool.icon} />
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="about-head">
        <div>
          <p className="eyebrow">About Me</p>
          <h2>Shaping Stories That Keep People Watching</h2>
        </div>
        <div className="about-copy">
          <p className="lead">
            I'm <span className="hash">Kedrick Tyler Chua</span>, a STEM graduate and IT student
            specializing in video editing.
          </p>
          <p className="muted">
            I focus on pacing, rhythm and hooks, turning long streams, podcasts and performances
            into short-form clips that keep people watching. Every frame earns its place.
          </p>
          <div className="about-cta">
            <span className="muted small">
              Let's cut something
              <br />
              worth watching together
            </span>
            <a href="#contact" className="btn btn--accent">
              Get in touch
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="stats">
        {STATS.map((stat) => (
          <div key={stat.label} className="stat">
            <span className="stat-value">{stat.value}</span>
            <span className="muted">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section skills">
      <p className="eyebrow">Skills</p>
      <h2>What I Bring to the Timeline</h2>
      <div className="skills-grid">
        {SKILLS.map((skill, i) => (
          <div key={skill.name} className="skill">
            <div className="skill-head">
              <span>
                <span className="hash">#</span>0{i + 1}
              </span>
              <span className="muted">{skill.level}%</span>
            </div>
            <h3>{skill.name}</h3>
            <div className="bar">
              <span style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function VideoModal({ video, title, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div
        className={`modal-player${video.vertical ? ' modal-player--vertical' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close video">
          ×
        </button>
        <iframe
          src={video.embed}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  )
}

function Projects() {
  const [active, setActive] = useState(null)

  return (
    <section id="projects" className="section projects">
      <div className="projects-head">
        <div>
          <p className="eyebrow">Selected Work</p>
          <h2>Recent Projects</h2>
        </div>
        <p className="muted">Short-form clips I've cut for streams, podcasts and music, built to hook in the first second.</p>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((project) => {
          const video = parseVideo(project)
          const badge = project.duration ?? video?.label
          return (
            <article key={project.title} className={`project${video ? ' project--playable' : ''}`}>
              <button
                type="button"
                className={`thumb thumb--${project.tone}${video?.vertical ? ' thumb--vertical' : ''}`}
                style={
                  video?.thumb ? { backgroundImage: `url(${video.thumb})` } : undefined
                }
                onClick={() => video && setActive({ video, title: project.title })}
                disabled={!video}
                aria-label={video ? `Play ${project.title}` : `${project.title} (video coming soon)`}
              >
                {badge && <span className="duration">{badge}</span>}
                <span className="thumb-play">
                  <PlayIcon />
                </span>
              </button>
              <div className="project-info">
                <span className="eyebrow small">{project.category}</span>
                <h3>{project.title}</h3>
              </div>
            </article>
          )
        })}
      </div>
      {active && (
        <VideoModal video={active.video} title={active.title} onClose={() => setActive(null)} />
      )}
    </section>
  )
}

function Contact() {
  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = encodeURIComponent(`Project inquiry from ${data.get('name')}`)
    const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-info">
        <p className="eyebrow eyebrow--light">Contact</p>
        <h2>Got Footage? Let's Make It Unforgettable.</h2>
        <p className="contact-lead">
          Sitting on hours of streams, podcasts or raw clips that never saw the light of day? Drop
          me the files and your vision, and I'll cut them into scroll-stopping edits your audience
          actually watches till the end.
        </p>
        <p className="contact-note">
          Currently available for <strong>remote, part-time</strong> editing work.
        </p>
        <a href={`mailto:${EMAIL}`} className="contact-email">
          {EMAIL}
        </a>
        <ul className="socials">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Your name" required />
        <input name="email" type="email" placeholder="Your email" required />
        <textarea name="message" rows="5" placeholder="Tell me about your project" required />
        <button type="submit" className="btn btn--light">
          Send message
          <ArrowIcon />
        </button>
      </form>
    </section>
  )
}

function App() {
  return (
    <div className="page">
      <MotionCursor />
      <Header />
      <Hero />
      <Tools />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <footer className="footer">
        <span>© {new Date().getFullYear()} TylerCuts. All rights reserved.</span>
        <a href="#home" onClick={scrollToTop}>
          Back to top ↑
        </a>
      </footer>
    </div>
  )
}

export default App
