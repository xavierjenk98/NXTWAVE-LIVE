'use client'

import { useState, useRef } from 'react'
import { validateEmail } from '@/lib/utils'

const PARTNERSHIP_OPTIONS = [
  'Touring Partner',
  'Single Event Sponsor',
  'Brand Activation / Pop-Up',
  'Content / Media Collaboration',
  'Not Sure Yet',
] as const

type PartnershipOption = typeof PARTNERSHIP_OPTIONS[number] | ''

const inputCls =
  'w-full bg-surface border border-border rounded px-4 py-3 text-[#f0f0f0] text-sm placeholder-muted focus:outline-none focus:border-neon transition-colors'
const labelCls = 'block text-xs font-bold uppercase tracking-wider text-muted mb-1.5'
const errorCls = 'text-orange text-xs mt-1'

interface FormState {
  companyName: string
  contactName: string
  email: string
  phoneNumber: string
  partnershipInterest: PartnershipOption
  brandMessage: string
}

const EMPTY_FORM: FormState = {
  companyName: '',
  contactName: '',
  email: '',
  phoneNumber: '',
  partnershipInterest: '',
  brandMessage: '',
}

function PartnerInquiryForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [success, setSuccess] = useState(false)

  const companyNameRef = useRef<HTMLInputElement>(null)
  const contactNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const partnershipInterestRef = useRef<HTMLSelectElement>(null)
  const brandMessageRef = useRef<HTMLTextAreaElement>(null)

  function set(key: keyof FormState, value: string) {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }))
  }

  function validate(): Partial<Record<keyof FormState, string>> {
    const errs: Partial<Record<keyof FormState, string>> = {}
    if (!form.companyName.trim()) errs.companyName = 'Company name is required.'
    if (!form.contactName.trim()) errs.contactName = 'Contact name is required.'
    if (!form.email.trim() || !validateEmail(form.email)) errs.email = 'Valid email is required.'
    if (!form.partnershipInterest) errs.partnershipInterest = 'Please select a partnership interest.'
    if (!form.brandMessage.trim()) errs.brandMessage = 'Please tell us about your brand.'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Focus the first invalid field
      if (errs.companyName) companyNameRef.current?.focus()
      else if (errs.contactName) contactNameRef.current?.focus()
      else if (errs.email) emailRef.current?.focus()
      else if (errs.partnershipInterest) partnershipInterestRef.current?.focus()
      else if (errs.brandMessage) brandMessageRef.current?.focus()
      return
    }
    setErrors({})
    setSubmitError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setSubmitError(data?.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🤝</div>
        <div className="font-display font-black text-3xl text-neon mb-2">INQUIRY RECEIVED.</div>
        <p className="text-muted">We&rsquo;ll reach out if it&rsquo;s a fit.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls} htmlFor="companyName">Company Name *</label>
          <input
            id="companyName"
            ref={companyNameRef}
            className={inputCls}
            placeholder="Your company"
            value={form.companyName}
            onChange={e => set('companyName', e.target.value)}
          />
          {errors.companyName && <p className={errorCls}>{errors.companyName}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="contactName">Contact Name *</label>
          <input
            id="contactName"
            ref={contactNameRef}
            className={inputCls}
            placeholder="Your name"
            value={form.contactName}
            onChange={e => set('contactName', e.target.value)}
          />
          {errors.contactName && <p className={errorCls}>{errors.contactName}</p>}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls} htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            ref={emailRef}
            className={inputCls}
            placeholder="you@company.com"
            value={form.email}
            onChange={e => set('email', e.target.value)}
          />
          {errors.email && <p className={errorCls}>{errors.email}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            className={inputCls}
            placeholder="+1 (000) 000-0000"
            value={form.phoneNumber}
            onChange={e => set('phoneNumber', e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor="partnershipInterest">Partnership Interest *</label>
        <select
          id="partnershipInterest"
          ref={partnershipInterestRef}
          className={inputCls}
          value={form.partnershipInterest}
          onChange={e => set('partnershipInterest', e.target.value)}
        >
          <option value="" disabled>Select an option…</option>
          {PARTNERSHIP_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.partnershipInterest && <p className={errorCls}>{errors.partnershipInterest}</p>}
      </div>
      <div>
        <label className={labelCls} htmlFor="brandMessage">Tell us about your brand and what you&apos;re looking to do *</label>
        <textarea
          id="brandMessage"
          ref={brandMessageRef}
          className={inputCls}
          rows={5}
          placeholder="Tell us about your brand, goals, and what kind of partnership you have in mind…"
          value={form.brandMessage}
          onChange={e => set('brandMessage', e.target.value)}
        />
        {errors.brandMessage && <p className={errorCls}>{errors.brandMessage}</p>}
      </div>
      {submitError && (
        <p className="text-orange text-sm text-center">{submitError}</p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="bg-neon text-bg font-display font-black text-base uppercase tracking-widest py-4 rounded hover:bg-neon-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting…' : 'Submit Inquiry'}
      </button>
    </form>
  )
}

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
          <p className="text-muted text-base md:text-xl max-w-xl mx-auto mb-10">
            Connect your brand with emerging artists, comedians, and audiences through live touring experiences.
          </p>
          <a
            href="#partner-form"
            className="inline-block border-2 border-neon text-neon font-display font-black text-base uppercase tracking-widest px-8 py-4 rounded hover:bg-neon hover:text-bg transition-colors"
          >
            Submit an Inquiry
          </a>
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
      <section id="partner-form" className="py-24 px-5 max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-display font-black text-xs tracking-[0.3em] text-neon uppercase mb-3">GET IN TOUCH</div>
          <h2 className="font-display font-black text-5xl md:text-6xl tracking-tight text-[#f0f0f0]">
            Partner with the<br />next wave.
          </h2>
        </div>
        <PartnerInquiryForm />
      </section>
    </main>
  )
}
