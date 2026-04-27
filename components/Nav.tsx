'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function scrollToAnchor(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const targetTop = el.getBoundingClientRect().top + window.scrollY - 124
  window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    setOpen(false)
    if (pathname === '/') {
      e.preventDefault()
      scrollToAnchor(id)
    }
  }

  const anchorHref = (id: string) => pathname === '/' ? `#${id}` : `/#${id}`

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-[1000] flex items-center px-5 justify-between">
      <Link href="/" className="font-display font-black text-2xl tracking-widest text-neon uppercase">
        NXTWAVE
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6">
        <a href={anchorHref('shows')} onClick={e => handleAnchorClick(e, 'shows')}
          className="text-sm font-semibold uppercase tracking-wider text-[#f0f0f0] hover:text-neon transition-colors">
          Shows
        </a>
        <a href={anchorHref('lineups')} onClick={e => handleAnchorClick(e, 'lineups')}
          className="text-sm font-semibold uppercase tracking-wider text-[#f0f0f0] hover:text-neon transition-colors">
          Lineup
        </a>
        <a href={anchorHref('apply')} onClick={e => handleAnchorClick(e, 'apply')}
          className="text-sm font-bold uppercase tracking-wider bg-neon text-bg px-4 py-2 rounded hover:bg-neon-hover transition-colors">
          APPLY
        </a>
        <a href={anchorHref('about')} onClick={e => handleAnchorClick(e, 'about')}
          className="text-sm font-semibold uppercase tracking-wider text-[#f0f0f0] hover:text-neon transition-colors">
          About
        </a>
        <Link href="/partners"
          className="text-sm font-semibold uppercase tracking-wider text-[#f0f0f0] hover:text-neon transition-colors">
          Partners
        </Link>
      </nav>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
        onClick={() => setOpen(o => !o)}
      >
        <span className={`block w-6 h-0.5 bg-[#f0f0f0] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-[#f0f0f0] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-[#f0f0f0] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-surface z-[999] flex flex-col items-center justify-center gap-8">
          <a href={anchorHref('shows')} onClick={e => handleAnchorClick(e, 'shows')}
            className="text-3xl font-display font-black uppercase tracking-widest text-[#f0f0f0] hover:text-neon transition-colors">
            Shows
          </a>
          <a href={anchorHref('lineups')} onClick={e => handleAnchorClick(e, 'lineups')}
            className="text-3xl font-display font-black uppercase tracking-widest text-[#f0f0f0] hover:text-neon transition-colors">
            Lineup
          </a>
          <a href={anchorHref('about')} onClick={e => handleAnchorClick(e, 'about')}
            className="text-3xl font-display font-black uppercase tracking-widest text-[#f0f0f0] hover:text-neon transition-colors">
            About
          </a>
          <Link href="/partners" onClick={() => setOpen(false)}
            className="text-3xl font-display font-black uppercase tracking-widest text-[#f0f0f0] hover:text-neon transition-colors">
            Partners
          </Link>
          <a href={anchorHref('apply')} onClick={e => handleAnchorClick(e, 'apply')}
            className="text-2xl font-bold uppercase tracking-wider bg-neon text-bg px-8 py-3 rounded hover:bg-neon-hover transition-colors">
            APPLY
          </a>
          <a href={anchorHref('shows')} onClick={e => handleAnchorClick(e, 'shows')}
            className="text-2xl font-bold uppercase tracking-wider border-2 border-neon text-neon px-8 py-3 rounded hover:bg-neon hover:text-bg transition-colors">
            GET TICKETS
          </a>
        </div>
      )}
    </header>
  )
}
