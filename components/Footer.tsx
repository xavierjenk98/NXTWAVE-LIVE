import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div>
            <div className="font-display font-black text-3xl tracking-widest text-neon mb-2">NXTWAVE</div>
            <p className="text-muted text-sm">Music. Comedy. Touring city to city.</p>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link href="/#shows" className="text-sm uppercase tracking-wider text-muted hover:text-neon transition-colors">Shows</Link>
            <Link href="/#lineups" className="text-sm uppercase tracking-wider text-muted hover:text-neon transition-colors">Lineup</Link>
            <Link href="/#about" className="text-sm uppercase tracking-wider text-muted hover:text-neon transition-colors">About</Link>
            <Link href="/#apply" className="text-sm uppercase tracking-wider text-muted hover:text-neon transition-colors">Apply</Link>
            <Link href="/partners" className="text-sm uppercase tracking-wider text-muted hover:text-neon transition-colors">Partners</Link>
          </nav>
        </div>
        <div className="border-t border-border pt-8 text-center text-muted text-sm">
          © 2026 NXTWAVE. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
