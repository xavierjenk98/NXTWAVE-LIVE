'use client'

export default function PartnersPage() {
  return (
    <main className="pt-16">
      {/* ── Hero ── */}
      <section className="py-32 px-5 text-center bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">PARTNERSHIPS</div>
          <h1 className="font-display font-black text-6xl md:text-8xl tracking-tight text-[#f0f0f0] mb-6 leading-none">
            Partner with the<br />
            <span className="text-neon">next wave</span><br />
            of culture
          </h1>
          <p className="text-muted text-base md:text-xl max-w-xl mx-auto">
            Connect your brand with emerging artists, comedians, and audiences through live touring experiences.
          </p>
        </div>
      </section>

      {/* ── Why Sponsor + What You Get ── */}
      <section className="py-24 px-5 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-4">WHY SPONSOR</div>
            <h2 className="font-display font-black text-4xl tracking-tight text-[#f0f0f0] mb-6">
              Reach culture<br />at the source.
            </h2>
            <div className="flex flex-col gap-4">
              {[
                { icon: '🎯', text: 'Direct access to Gen Z and Millennial audiences actively discovering new music and comedy.' },
                { icon: '🌆', text: 'Multi-city presence in NYC, Atlanta, and Chicago — expanding fast.' },
                { icon: '🔥', text: 'Align with artists before they blow up. Your brand leads, not follows.' },
                { icon: '📲', text: 'Organic social amplification from artists, fans, and press.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-muted text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-4">WHAT YOU GET</div>
            <h2 className="font-display font-black text-4xl tracking-tight text-[#f0f0f0] mb-6">
              Real value.<br />Real reach.
            </h2>
            <div className="flex flex-col gap-3">
              {[
                'Logo placement on all event marketing',
                'Stage and venue branding opportunities',
                'Social media shoutouts and content',
                'Access to artist collaborations',
                'VIP experiences for your team',
                'Post-event coverage and recap content',
                'Direct introductions to emerging talent',
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-center border-b border-border pb-3">
                  <span className="text-neon font-bold">✓</span>
                  <span className="text-sm text-[#f0f0f0]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sponsorship Types ── */}
      <section className="py-24 px-5 bg-surface border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">PARTNERSHIP OPTIONS</div>
            <h2 className="font-display font-black text-5xl tracking-tight text-[#f0f0f0]">SPONSORSHIP TYPES</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🚌',
                title: 'TOUR PARTNER',
                desc: 'Full tour sponsorship across all cities. Maximum brand visibility and exclusivity.',
                features: ['All-city presence', 'Exclusive category', 'Custom activations'],
              },
              {
                icon: '🎟',
                title: 'EVENT SPONSOR',
                desc: 'Single-event sponsorship for one city. Great for local brands.',
                features: ['One city', 'Stage branding', 'Social mentions'],
              },
              {
                icon: '⚡',
                title: 'EXPERIENCE PARTNER',
                desc: 'Create and brand unique fan experiences at our events.',
                features: ['Custom experience', 'Fan engagement', 'Content creation'],
              },
              {
                icon: '🎥',
                title: 'CONTENT PARTNER',
                desc: 'Sponsor our content output — live streams, recaps, artist features.',
                features: ['Video content', 'Social media', 'Artist stories'],
              },
            ].map(card => (
              <div key={card.title} className="bg-surface2 border border-border rounded-xl p-6 hover:border-neon transition-colors flex flex-col gap-4">
                <div className="text-4xl">{card.icon}</div>
                <div className="font-display font-black text-xl tracking-wide text-neon">{card.title}</div>
                <p className="text-muted text-sm leading-relaxed flex-1">{card.desc}</p>
                <ul className="flex flex-col gap-1.5">
                  {card.features.map(f => (
                    <li key={f} className="flex gap-2 items-center text-sm text-[#f0f0f0]">
                      <span className="text-neon text-xs">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inquiry Form ── */}
      <section className="py-24 px-5 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">GET IN TOUCH</div>
          <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight text-[#f0f0f0]">
            Partner with the<br />next wave.
          </h2>
        </div>
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="text-sm text-muted">Complete the form below and our team will reach out within 48 hours.</div>
          </div>
          <div className="relative" style={{ minHeight: '600px' }}>
            <iframe
              src="https://airtable.com/embed/appeelJ8gPIe2MO2J/shrbZQKNZn68OW9SZ"
              width="100%"
              height="600"
              style={{ background: 'transparent', border: 0 }}
              title="Partner Inquiry Form"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
