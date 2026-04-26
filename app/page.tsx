'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { validateEmail } from '@/lib/utils'

// ─── Data ────────────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = ['NEW YORK', 'ATLANTA', 'CHICAGO', 'MUSIC', 'COMEDY', 'LIVE SHOWS']

const SHOWS = [
  {
    id: 'nyc',
    city: 'NEW YORK CITY',
    date: 'MAY 12',
    venue: 'Webster Hall',
    price: '$25',
    badge: 'Selling Fast',
    badgeColor: 'bg-orange text-white',
    lineup: {
      music: ['Jordan Ray', 'SAVII', 'Melo Vibe'],
      comedy: ['Dom Torres', 'Nia Fields'],
    },
  },
  {
    id: 'atl',
    city: 'ATLANTA',
    date: 'MAY 18',
    venue: 'The Masquerade',
    price: '$20',
    badge: 'Limited',
    badgeColor: 'bg-blue text-bg',
    lineup: {
      music: ['Cali Fitz', 'DeShawn Waves', 'Luna K'],
      comedy: ['Marcus Bell', 'Simone Layne'],
    },
  },
  {
    id: 'chi',
    city: 'CHICAGO',
    date: 'MAY 25',
    venue: 'Thalia Hall',
    price: '$22',
    badge: 'On Sale Now',
    badgeColor: 'bg-neon text-bg',
    lineup: {
      music: ['Ayo Beats', 'Kezia Moon', 'THEO'],
      comedy: ['Big Remy', 'Priya Soni'],
    },
  },
]

const EXPERIENCE = [
  { icon: '🎵', title: 'LIVE MUSIC', desc: 'Emerging artists performing original sets before they blow up.' },
  { icon: '🎤', title: 'COMEDY', desc: 'Next-generation stand-up comics bringing raw, unfiltered energy.' },
  { icon: '🌆', title: 'MULTI-CITY SHOWS', desc: 'NYC, ATL, CHI — and growing. Culture moves with us.' },
  { icon: '⚡', title: 'CROWD ENERGY', desc: 'Real audiences. Real energy. No filters, no fillers.' },
]

const TALENT_MUSIC = [
  { name: 'Jordan Ray', genre: 'Alt-R&B', from: 'Brooklyn' },
  { name: 'SAVII', genre: 'Hip-Hop', from: 'Bronx' },
  { name: 'Cali Fitz', genre: 'Trap Soul', from: 'Atlanta' },
  { name: 'Luna K', genre: 'Pop Fusion', from: 'ATL' },
  { name: 'HEADLINER SLOT', genre: 'TBA', from: '' },
]

const TALENT_COMEDY = [
  { name: 'Dom Torres', genre: 'Observational', from: 'NYC' },
  { name: 'Nia Fields', genre: 'Storytelling', from: 'Brooklyn' },
  { name: 'Marcus Bell', genre: 'Crowd Work', from: 'ATL' },
  { name: 'Simone Layne', genre: 'Alt Comedy', from: 'Decatur' },
  { name: 'HEADLINER SLOT', genre: 'TBA', from: '' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'APPLY OR GET SCOUTED', desc: 'Submit your work or get discovered by our talent team.' },
  { step: '02', title: 'HIT THE STAGE', desc: 'Perform in front of real audiences who came to discover new talent.' },
  { step: '03', title: 'TOUR ACROSS CITIES', desc: 'The best acts move through every city on the tour.' },
]

const FAQS = [
  {
    q: 'How do tickets work?',
    a: 'Tickets are available online through our platform. Purchase in advance for the best prices — shows often sell out. All tickets are mobile-friendly and scannable at the door.',
  },
  {
    q: 'How do performers get booked?',
    a: 'Artists and comedians can apply through our Apply section. Our talent team reviews submissions and scouts live. We prioritize emerging talent with strong potential.',
  },
  {
    q: 'Is this 21+? What about accessibility?',
    a: 'Most venues are 18+ with a bar section. All ages are welcome unless noted otherwise. Venues are ADA accessible — reach out if you need specific accommodations.',
  },
]

const PARTNERS = [
  'Partner Venue', 'Media', 'Community', 'Booking Partner', 'Press', 'Sponsor',
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const targetTop = el.getBoundingClientRect().top + window.scrollY - 124
  window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ShowCard({ show }: { show: typeof SHOWS[0] }) {
  const [open, setOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    card.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative bg-surface2 border border-border rounded-xl p-6 overflow-hidden transition-transform hover:-translate-y-1"
      style={{
        background: 'radial-gradient(circle 200px at var(--mx, 50%) var(--my, 50%), rgba(232,255,0,0.06), transparent 70%), #1a1a1a',
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="font-display font-black text-2xl tracking-widest text-neon">{show.city}</div>
          <div className="text-muted text-sm mt-1">{show.date} · {show.venue}</div>
        </div>
        <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${show.badgeColor}`}>{show.badge}</span>
      </div>
      <div className="text-3xl font-display font-black text-[#f0f0f0] mb-4">{show.price}</div>
      <div className="flex gap-3 flex-wrap">
        <button className="bg-neon text-bg font-bold uppercase text-sm px-4 py-2 rounded hover:bg-neon-hover transition-colors">
          GET TICKETS
        </button>
        <button
          onClick={() => setOpen(o => !o)}
          className="border border-border text-[#f0f0f0] font-semibold text-sm px-4 py-2 rounded hover:border-neon hover:text-neon transition-colors"
        >
          {open ? 'Hide lineup ▲' : 'View lineup ▼'}
        </button>
      </div>
      {open && (
        <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neon mb-2">🎵 Music</div>
            {show.lineup.music.map(a => (
              <div key={a} className="text-sm text-[#f0f0f0] py-1 border-b border-border/50">{a}</div>
            ))}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue mb-2">🎤 Comedy</div>
            {show.lineup.comedy.map(a => (
              <div key={a} className="text-sm text-[#f0f0f0] py-1 border-b border-border/50">{a}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function TalentCard({ talent }: { talent: { name: string; genre: string; from: string } }) {
  return (
    <div className="bg-surface2 border border-border rounded-xl p-5 hover:border-neon transition-colors">
      <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center text-xl font-display font-black text-neon mb-3">
        {talent.name[0]}
      </div>
      <div className="font-display font-black text-lg tracking-wide text-[#f0f0f0]">{talent.name}</div>
      <div className="text-muted text-sm mt-1">{talent.genre}{talent.from ? ` · ${talent.from}` : ''}</div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const [pastHero, setPastHero] = useState(false)
  const [qabScrolled, setQabScrolled] = useState(false)
  const [talentTab, setTalentTab] = useState<'music' | 'comedy'>('music')
  const [applyTab, setApplyTab] = useState<'music' | 'comedy'>('music')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [stickyDismissed, setStickyDismissed] = useState(false)

  // Email form
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailSuccess, setEmailSuccess] = useState(false)

  // Music apply form
  const [musicForm, setMusicForm] = useState({ name: '', email: '', genre: '', city: '', links: '', bio: '' })
  const [musicErrors, setMusicErrors] = useState<Record<string, string>>({})
  const [musicSuccess, setMusicSuccess] = useState(false)

  // Comedy apply form
  const [comedyForm, setComedyForm] = useState({ name: '', email: '', style: '', city: '', links: '', bio: '' })
  const [comedyErrors, setComedyErrors] = useState<Record<string, string>>({})
  const [comedySuccess, setComedySuccess] = useState(false)

  const onScroll = useCallback(() => {
    const hero = heroRef.current
    if (hero) {
      const bottom = hero.getBoundingClientRect().bottom
      setPastHero(bottom < 64)
    }
    setQabScrolled(window.scrollY > 10)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
    setEmailSuccess(true)
  }

  function validateMusicForm() {
    const errs: Record<string, string> = {}
    if (!musicForm.name.trim()) errs.name = 'Name is required.'
    if (!validateEmail(musicForm.email)) errs.email = 'Valid email required.'
    if (!musicForm.genre.trim()) errs.genre = 'Genre is required.'
    if (!musicForm.city.trim()) errs.city = 'City is required.'
    if (!musicForm.bio.trim()) errs.bio = 'Bio is required.'
    return errs
  }

  function handleMusicSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validateMusicForm()
    if (Object.keys(errs).length) { setMusicErrors(errs); return }
    setMusicErrors({})
    setMusicSuccess(true)
  }

  function validateComedyForm() {
    const errs: Record<string, string> = {}
    if (!comedyForm.name.trim()) errs.name = 'Name is required.'
    if (!validateEmail(comedyForm.email)) errs.email = 'Valid email required.'
    if (!comedyForm.style.trim()) errs.style = 'Comedy style is required.'
    if (!comedyForm.city.trim()) errs.city = 'City is required.'
    if (!comedyForm.bio.trim()) errs.bio = 'Bio is required.'
    return errs
  }

  function handleComedySubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validateComedyForm()
    if (Object.keys(errs).length) { setComedyErrors(errs); return }
    setComedyErrors({})
    setComedySuccess(true)
  }

  const inputCls = "w-full bg-surface border border-border rounded px-4 py-3 text-[#f0f0f0] text-sm placeholder-muted focus:outline-none focus:border-neon transition-colors"
  const labelCls = "block text-xs font-bold uppercase tracking-wider text-muted mb-1.5"
  const errorCls = "text-orange text-xs mt-1"

  return (
    <main className="pt-16">
      {/* ── Marquee ── */}
      <div className="bg-neon overflow-hidden py-2.5">
        <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
          {[...Array(3)].flatMap(() => MARQUEE_ITEMS).map((item, i) => (
            <span key={i} className="font-display font-black text-sm tracking-widest text-bg mx-6 uppercase">
              {item} •
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 animate-hero-pulse"
        style={{ paddingTop: '64px' }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(232,255,0,0.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-block bg-neon text-bg font-display font-black text-xs tracking-[0.2em] px-4 py-2 mb-8 uppercase">
            LIVE ACROSS AMERICA
          </div>
          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tight text-[#f0f0f0] leading-none mb-6">
            THE NEXT WAVE<br />
            <span className="text-neon">IS LIVE.</span>
          </h1>
          <p className="text-muted text-base md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Music. Comedy. Touring city to city—before the world catches up.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => scrollToSection('shows')}
              className="bg-neon text-bg font-display font-black text-base uppercase tracking-widest px-8 py-4 rounded hover:bg-neon-hover transition-colors"
            >
              GET TICKETS
            </button>
            <button
              onClick={() => scrollToSection('apply')}
              className="border-2 border-neon text-neon font-display font-black text-base uppercase tracking-widest px-8 py-4 rounded hover:bg-neon hover:text-bg transition-colors"
            >
              APPLY TO PERFORM
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-xs uppercase tracking-widest animate-bounce">
          <span>Scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* ── Quick Action Bar ── */}
      <div
        id="quick-action-bar"
        className={`sticky z-[900] flex items-center justify-center gap-2 md:gap-6 px-4 py-3 transition-all duration-300 ${
          qabScrolled
            ? 'bg-surface/95 backdrop-blur border-b border-border shadow-lg shadow-black/50'
            : 'bg-surface border-b border-border'
        }`}
        style={{ top: '64px' }}
      >
        {[
          { label: 'VIEW SHOWS', id: 'shows' },
          { label: 'SEE LINEUPS', id: 'lineups' },
          { label: 'APPLY', id: 'apply' },
          { label: 'JOIN COMMUNITY', id: 'community' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="text-xs font-bold uppercase tracking-wider text-muted hover:text-neon transition-colors px-3 py-1.5 rounded hover:bg-surface2"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ── Shows ── */}
      <section id="shows" className="py-24 px-5 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">UPCOMING SHOWS</div>
          <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight text-[#f0f0f0]">
            WE&rsquo;RE COMING<br />TO YOUR CITY
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SHOWS.map(show => <ShowCard key={show.id} show={show} />)}
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="py-24 px-5 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">THE EXPERIENCE</div>
            <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight text-[#f0f0f0]">
              WHAT YOU GET
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERIENCE.map(card => (
              <div key={card.title} className="bg-surface2 border border-border rounded-xl p-6 text-center hover:border-neon transition-colors">
                <div className="text-4xl mb-4">{card.icon}</div>
                <div className="font-display font-black text-xl tracking-wide text-neon mb-3">{card.title}</div>
                <p className="text-muted text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture Statement ── */}
      <section className="bg-neon py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="font-display font-black text-4xl md:text-6xl tracking-tight text-bg leading-tight">
            &ldquo;We don&rsquo;t wait for artists to blow up.<br />
            We put them on stage first.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── Talent / Lineups ── */}
      <section id="lineups" className="py-24 px-5 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">THE TALENT</div>
          <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight text-[#f0f0f0]">
            MEET THE LINEUP
          </h2>
        </div>
        <div className="flex gap-4 mb-10 justify-center">
          {(['music', 'comedy'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setTalentTab(tab)}
              className={`font-display font-black text-sm uppercase tracking-widest px-6 py-3 rounded border transition-colors ${
                talentTab === tab
                  ? 'bg-neon text-bg border-neon'
                  : 'bg-transparent text-muted border-border hover:border-neon hover:text-neon'
              }`}
            >
              {tab === 'music' ? '🎵 MUSIC' : '🎤 COMEDY'}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {(talentTab === 'music' ? TALENT_MUSIC : TALENT_COMEDY).map(t => (
            <TalentCard key={t.name} talent={t} />
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-5 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">THE PROCESS</div>
            <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight text-[#f0f0f0]">
              HOW IT WORKS
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(step => (
              <div key={step.step} className="text-center">
                <div className="font-display font-black text-7xl text-neon/20 mb-4">{step.step}</div>
                <div className="font-display font-black text-2xl tracking-wide text-[#f0f0f0] mb-3">{step.title}</div>
                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For The People ── */}
      <section id="about" className="py-24 px-5 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">FOR THE PEOPLE</div>
          <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight text-[#f0f0f0]">
            WHO&rsquo;S THIS FOR?
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'FOR FANS', icon: '🎟', desc: "Experience the next wave of talent live before everyone else knows their names.", cta: 'GET TICKETS', id: 'shows' as const },
            { title: 'FOR ARTISTS & COMEDIANS', icon: '🎤', desc: "Ready to perform? We're always looking for the next voice. Apply to be on stage.", cta: 'APPLY NOW', id: 'apply' as const },
            { title: 'FOR INDUSTRY', icon: '🤝', desc: 'Talent scouts, managers, and brands — connect with emerging talent before the buzz.', cta: 'CONNECT', href: '/partners' },
          ].map(card => (
            <div key={card.title} className="bg-surface border border-border rounded-xl p-8 flex flex-col gap-4 hover:border-neon transition-colors">
              <div className="text-4xl">{card.icon}</div>
              <div className="font-display font-black text-2xl tracking-wide text-neon">{card.title}</div>
              <p className="text-muted text-sm leading-relaxed flex-1">{card.desc}</p>
              {'href' in card ? (
                <Link href={card.href!} className="inline-block bg-neon text-bg font-bold text-sm uppercase tracking-wider px-5 py-2.5 rounded hover:bg-neon-hover transition-colors text-center">
                  {card.cta}
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection(card.id)}
                  className="bg-neon text-bg font-bold text-sm uppercase tracking-wider px-5 py-2.5 rounded hover:bg-neon-hover transition-colors"
                >
                  {card.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Partners Strip ── */}
      <section className="py-16 px-5 bg-surface border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="font-display font-black text-xs tracking-[0.3em] text-muted uppercase">PARTNERS &amp; PRESS</div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {PARTNERS.map(p => (
              <div key={p} className="bg-surface2 border border-border rounded-lg px-6 py-3 text-muted text-sm font-semibold uppercase tracking-wider hover:border-neon hover:text-neon transition-colors">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-5 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">GOT QUESTIONS?</div>
          <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight text-[#f0f0f0]">FAQ</h2>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-6 py-5 flex justify-between items-center font-semibold text-[#f0f0f0] hover:text-neon transition-colors"
              >
                {faq.q}
                <span className={`text-neon transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-muted text-sm leading-relaxed border-t border-border pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Apply ── */}
      <section id="apply" className="py-24 px-5 bg-surface">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">JOIN THE WAVE</div>
            <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight text-[#f0f0f0]">
              APPLY TO PERFORM
            </h2>
          </div>
          <div className="flex gap-4 mb-10 justify-center">
            {(['music', 'comedy'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setApplyTab(tab)}
                className={`font-display font-black text-sm uppercase tracking-widest px-6 py-3 rounded border transition-colors ${
                  applyTab === tab
                    ? 'bg-neon text-bg border-neon'
                    : 'bg-transparent text-muted border-border hover:border-neon hover:text-neon'
                }`}
              >
                {tab === 'music' ? '🎵 MUSIC ARTIST' : '🎤 COMEDY'}
              </button>
            ))}
          </div>

          {applyTab === 'music' && (
            musicSuccess ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎵</div>
                <div className="font-display font-black text-3xl text-neon mb-2">APPLICATION RECEIVED!</div>
                <p className="text-muted">We&rsquo;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleMusicSubmit} className="flex flex-col gap-5" noValidate>
                <div>
                  <label className={labelCls}>Artist Name *</label>
                  <input className={inputCls} placeholder="Your stage name" value={musicForm.name}
                    onChange={e => setMusicForm(f => ({ ...f, name: e.target.value }))} />
                  {musicErrors.name && <p className={errorCls}>{musicErrors.name}</p>}
                </div>
                <div>
                  <label className={labelCls}>Email *</label>
                  <input type="email" className={inputCls} placeholder="your@email.com" value={musicForm.email}
                    onChange={e => setMusicForm(f => ({ ...f, email: e.target.value }))} />
                  {musicErrors.email && <p className={errorCls}>{musicErrors.email}</p>}
                </div>
                <div>
                  <label className={labelCls}>Genre *</label>
                  <input className={inputCls} placeholder="e.g. Hip-Hop, R&B, Pop" value={musicForm.genre}
                    onChange={e => setMusicForm(f => ({ ...f, genre: e.target.value }))} />
                  {musicErrors.genre && <p className={errorCls}>{musicErrors.genre}</p>}
                </div>
                <div>
                  <label className={labelCls}>City *</label>
                  <input className={inputCls} placeholder="Where are you based?" value={musicForm.city}
                    onChange={e => setMusicForm(f => ({ ...f, city: e.target.value }))} />
                  {musicErrors.city && <p className={errorCls}>{musicErrors.city}</p>}
                </div>
                <div>
                  <label className={labelCls}>Links (Spotify, Instagram, etc.)</label>
                  <input className={inputCls} placeholder="https://" value={musicForm.links}
                    onChange={e => setMusicForm(f => ({ ...f, links: e.target.value }))} />
                </div>
                <div>
                  <label className={labelCls}>Short Bio *</label>
                  <textarea className={inputCls} rows={4} placeholder="Tell us about yourself and your music..."
                    value={musicForm.bio}
                    onChange={e => setMusicForm(f => ({ ...f, bio: e.target.value }))} />
                  {musicErrors.bio && <p className={errorCls}>{musicErrors.bio}</p>}
                </div>
                <button type="submit" className="bg-neon text-bg font-display font-black text-base uppercase tracking-widest py-4 rounded hover:bg-neon-hover transition-colors">
                  SUBMIT APPLICATION
                </button>
              </form>
            )
          )}

          {applyTab === 'comedy' && (
            comedySuccess ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🎤</div>
                <div className="font-display font-black text-3xl text-neon mb-2">APPLICATION RECEIVED!</div>
                <p className="text-muted">We&rsquo;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleComedySubmit} className="flex flex-col gap-5" noValidate>
                <div>
                  <label className={labelCls}>Your Name *</label>
                  <input className={inputCls} placeholder="Your name / stage name" value={comedyForm.name}
                    onChange={e => setComedyForm(f => ({ ...f, name: e.target.value }))} />
                  {comedyErrors.name && <p className={errorCls}>{comedyErrors.name}</p>}
                </div>
                <div>
                  <label className={labelCls}>Email *</label>
                  <input type="email" className={inputCls} placeholder="your@email.com" value={comedyForm.email}
                    onChange={e => setComedyForm(f => ({ ...f, email: e.target.value }))} />
                  {comedyErrors.email && <p className={errorCls}>{comedyErrors.email}</p>}
                </div>
                <div>
                  <label className={labelCls}>Comedy Style *</label>
                  <input className={inputCls} placeholder="e.g. Stand-up, Improv, Sketch" value={comedyForm.style}
                    onChange={e => setComedyForm(f => ({ ...f, style: e.target.value }))} />
                  {comedyErrors.style && <p className={errorCls}>{comedyErrors.style}</p>}
                </div>
                <div>
                  <label className={labelCls}>City *</label>
                  <input className={inputCls} placeholder="Where are you based?" value={comedyForm.city}
                    onChange={e => setComedyForm(f => ({ ...f, city: e.target.value }))} />
                  {comedyErrors.city && <p className={errorCls}>{comedyErrors.city}</p>}
                </div>
                <div>
                  <label className={labelCls}>Links (YouTube, Instagram, etc.)</label>
                  <input className={inputCls} placeholder="https://" value={comedyForm.links}
                    onChange={e => setComedyForm(f => ({ ...f, links: e.target.value }))} />
                </div>
                <div>
                  <label className={labelCls}>Short Bio *</label>
                  <textarea className={inputCls} rows={4} placeholder="Tell us about yourself and your comedy..."
                    value={comedyForm.bio}
                    onChange={e => setComedyForm(f => ({ ...f, bio: e.target.value }))} />
                  {comedyErrors.bio && <p className={errorCls}>{comedyErrors.bio}</p>}
                </div>
                <button type="submit" className="bg-neon text-bg font-display font-black text-base uppercase tracking-widest py-4 rounded hover:bg-neon-hover transition-colors">
                  SUBMIT APPLICATION
                </button>
              </form>
            )
          )}
        </div>
      </section>

      {/* ── Community / Email ── */}
      <section id="community" className="py-24 px-5 max-w-2xl mx-auto text-center">
        <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">STAY CLOSE</div>
        <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight text-[#f0f0f0] mb-4">
          STAY CLOSE TO<br />WHAT&rsquo;S NEXT
        </h2>
        <p className="text-muted text-sm mb-10">Get early access to tickets, lineups, and announcements before anyone else.</p>
        {emailSuccess ? (
          <div className="bg-neon text-bg font-display font-black text-2xl py-6 rounded">
            YOU&rsquo;RE IN THE WAVE! 🌊
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} noValidate>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                className={`${inputCls} flex-1`}
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button type="submit" className="bg-neon text-bg font-display font-black text-sm uppercase tracking-widest px-8 py-3 rounded hover:bg-neon-hover transition-colors whitespace-nowrap">
                JOIN THE WAVE
              </button>
            </div>
            {emailError && <p className={`${errorCls} mt-2 text-center`}>{emailError}</p>}
          </form>
        )}
      </section>

      {/* ── Sponsor / Partner ── */}
      <section className="py-24 px-5 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">WORK WITH US</div>
          <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight text-[#f0f0f0] mb-6">
            Partner with us.
          </h2>
          <p className="text-muted text-base mb-8 max-w-xl mx-auto">
            Connect your brand with emerging artists, comedians, and audiences through live touring experiences.
          </p>
          <Link href="/partners" className="inline-block bg-neon text-bg font-display font-black text-base uppercase tracking-widest px-8 py-4 rounded hover:bg-neon-hover transition-colors">
            LEARN MORE
          </Link>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 px-5 text-center animate-hero-pulse">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-black text-7xl md:text-9xl tracking-tight text-[#f0f0f0] mb-8 leading-none">
            BE THERE<br />
            <span className="text-neon">FIRST.</span>
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => scrollToSection('shows')}
              className="bg-neon text-bg font-display font-black text-base uppercase tracking-widest px-8 py-4 rounded hover:bg-neon-hover transition-colors"
            >
              GET TICKETS
            </button>
            <button
              onClick={() => scrollToSection('apply')}
              className="border-2 border-neon text-neon font-display font-black text-base uppercase tracking-widest px-8 py-4 rounded hover:bg-neon hover:text-bg transition-colors"
            >
              APPLY TO PERFORM
            </button>
          </div>
        </div>
      </section>

      {/* ── Sticky Desktop CTA Bar ── */}
      {pastHero && !stickyDismissed && (
        <div className="hidden md:flex fixed bottom-0 left-0 right-0 z-[800] bg-neon text-bg items-center justify-center gap-4 px-6 py-3">
          <span className="font-display font-black text-sm uppercase tracking-widest">
            GET TICKETS: NYC | ATL | CHI
          </span>
          <button
            onClick={() => scrollToSection('shows')}
            className="bg-bg text-neon font-bold text-xs uppercase tracking-wider px-5 py-2 rounded hover:bg-surface transition-colors"
          >
            GET TICKETS
          </button>
          <button
            onClick={() => setStickyDismissed(true)}
            aria-label="Dismiss"
            className="ml-2 text-bg/60 hover:text-bg font-bold text-lg leading-none"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Sticky Mobile CTA Bar ── */}
      {pastHero && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[800] bg-surface border-t border-border flex items-center justify-between px-4 py-3">
          <span className="font-display font-black text-xs uppercase tracking-wider text-muted">NYC | ATL | CHI</span>
          <button
            onClick={() => scrollToSection('shows')}
            className="bg-neon text-bg font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded hover:bg-neon-hover transition-colors"
          >
            GET TICKETS
          </button>
        </div>
      )}
    </main>
  )
}

