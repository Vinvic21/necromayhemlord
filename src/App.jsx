import { useEffect, useMemo, useState, useCallback } from 'react'
import { SHOP, SOCIALS, HOURS, WORK, SERVICES, REVIEWS, MAPS_LINK, MAPS_EMBED } from './config'

const wa = (text) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`

const QUICK_MESSAGE =
  `Hi NecroMayhemlord! 👋\nI'd like to book a tattoo appointment.\n\nI'll send my idea and reference photos here. What days are open?`

/* ---------- icons ---------- */
const Ic = {
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8V6.5c0-.8.2-1.2 1.3-1.2H17V2.2C16.600 2.150 15.600 2 14.500 2 12 2 10.300 3.500 10.300 6.300V8H7.500v3.500h2.800V22H14V11.500h2.800L17.300 8H14z" /></svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.600 5.800A4.300 4.300 0 0 1 15.500 3h-3.100v12.400a2.600 2.600 0 1 1-2.600-2.600c.3 0 .5 0 .8.1V9.700a5.700 5.700 0 1 0 4.900 5.700V9.200a7.300 7.300 0 0 0 4.200 1.300V7.400a4.300 4.300 0 0 1-3.100-1.600z" /></svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9.500v5l4.500-2.500z" fill="currentColor" /></svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s7-6.200 7-12a7 7 0 1 0-14 0c0 5.800 7 12 7 12z" /><circle cx="12" cy="10" r="2.500" /></svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.900v3a2 2 0 0 1-2.200 2 19.800 19.800 0 0 1-8.600-3.100 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8.100 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.300 1.800.6 2.800.7a2 2 0 0 1 1.700 2z" /></svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.100 6.300 6.900 1-5 4.900 1.200 6.800L12 17.700 5.800 21l1.200-6.800-5-4.900 6.900-1z" /></svg>
  ),
  close: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>),
  menu: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>),
  prev: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>),
  next: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>),
}

/* ---------- open / closed (New York time) ---------- */
function useOpenStatus() {
  const calc = () => {
    const p = Object.fromEntries(
      new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'long', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
        .formatToParts(new Date()).map((x) => [x.type, x.value]),
    )
    const now = Number(p.hour) + Number(p.minute) / 60
    const todays = HOURS.find(([d]) => d === p.weekday)?.[1]
    const open = !!todays && now >= todays[0] && now < todays[1]
    return { today: p.weekday, open, closes: todays?.[1] }
  }
  const [s, setS] = useState(calc)
  useEffect(() => { const id = setInterval(() => setS(calc()), 60000); return () => clearInterval(id) }, [])
  return s
}
const fmt = (h) => `${h % 12 || 12}${h < 12 ? ' AM' : ' PM'}`

/* ---------- header ---------- */
function Header() {
  const [open, setOpen] = useState(false)
  const links = [['work', 'Work'], ['services', 'Services'], ['reviews', 'Reviews'], ['book', 'Book'], ['visit', 'Visit']]
  return (
    <header className="header">
      <a className="brand" href="#top" aria-label={`${SHOP.name} home`}>{SHOP.name}</a>
      <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Main">
        {links.map(([id, l]) => (<a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{l}</a>))}
        <a className="btn btn-wa nav-cta" href={wa(QUICK_MESSAGE)} target="_blank" rel="noopener noreferrer">{Ic.whatsapp}Book on WhatsApp</a>
      </nav>
      <button className="burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
        {open ? Ic.close : Ic.menu}
      </button>
    </header>
  )
}

/* ---------- hero (the one orchestrated moment) ---------- */
function Hero() {
  const name = SHOP.name.split('')
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="hero-kicker">Tattoo & piercing studio · Newark, NJ</p>
        <h1 aria-label={SHOP.name}>
          {name.map((c, i) => (<span key={i} aria-hidden="true" style={{ '--i': i }} className="ch">{c}</span>))}
        </h1>
        <span className="ink-line" aria-hidden="true" />
        <p className="hero-sub">Custom ink at fair prices. Black & grey, color, Japanese, realism and more. Message us on WhatsApp to book.</p>
        <div className="hero-actions">
          <a className="btn btn-wa btn-lg" href={wa(QUICK_MESSAGE)} target="_blank" rel="noopener noreferrer">{Ic.whatsapp}Book on WhatsApp</a>
          <a className="btn btn-ghost btn-lg" href="#work">See the work</a>
        </div>
        <p className="rating"><span className="stars">{Ic.star}{Ic.star}{Ic.star}{Ic.star}{Ic.star}</span><strong>{SHOP.rating}</strong> from {SHOP.reviewCount} Google reviews</p>
      </div>
      <div className="hero-art" aria-hidden="true">
        <img className="art-a" src="/images/dragon.png" alt="" />
        <img className="art-b" src="/images/owl.png" alt="" />
      </div>
    </section>
  )
}

/* ---------- gallery + lightbox ---------- */
function Work() {
  const [filter, setFilter] = useState('all')
  const [idx, setIdx] = useState(null)
  const items = useMemo(() => WORK.filter((w) => filter === 'all' || w.tag === filter), [filter])
  const step = useCallback((d) => setIdx((i) => (i + d + items.length) % items.length), [items.length])
  useEffect(() => {
    if (idx === null) return
    const k = (e) => { if (e.key === 'Escape') setIdx(null); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', k)
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [idx, step])
  const cur = idx !== null ? items[idx] : null
  return (
    <section className="section" id="work">
      <h2>Recent work</h2>
      <p className="lead">Healed and fresh pieces from the studio. Tap any photo to enlarge.</p>
      <div className="chips" role="group" aria-label="Filter work">
        {[['all', 'All'], ['grey', 'Black & grey'], ['color', 'Color']].map(([v, l]) => (
          <button key={v} className={`chip ${filter === v ? 'on' : ''}`} aria-pressed={filter === v} onClick={() => setFilter(v)}>{l}</button>
        ))}
      </div>
      <div className="grid">
        {items.map((w, i) => (
          <button key={w.src} className="tile" onClick={() => setIdx(i)} aria-label={`Open ${w.title}`}>
            <img src={`/images/${w.src}.png`} alt={w.alt} loading="lazy" />
            <span>{w.title}</span>
          </button>
        ))}
      </div>
      {cur && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={cur.title} onClick={() => setIdx(null)}>
          <button className="lb-btn lb-close" onClick={() => setIdx(null)} aria-label="Close">{Ic.close}</button>
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous">{Ic.prev}</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={`/images/${cur.src}.png`} alt={cur.alt} />
            <figcaption>
              <span>{cur.title}</span>
              <a className="btn btn-wa" href={wa(`Hi NecroMayhemlord! I love your "${cur.title}" work. I'd like a tattoo in a similar style. Can we book?`)} target="_blank" rel="noopener noreferrer">{Ic.whatsapp}I want something like this</a>
            </figcaption>
          </figure>
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next">{Ic.next}</button>
        </div>
      )}
    </section>
  )
}

function Services() {
  return (
    <section className="section alt" id="services">
      <h2>What we do</h2>
      <div className="services">
        {SERVICES.map((s) => (<article key={s.t}><h3>{s.t}</h3><p>{s.d}</p></article>))}
      </div>
    </section>
  )
}

function Reviews() {
  return (
    <section className="section" id="reviews">
      <h2>What clients say</h2>
      <p className="lead"><strong>{SHOP.rating}</strong> stars across {SHOP.reviewCount} Google reviews.</p>
      <div className="reviews">
        {REVIEWS.map((r) => (
          <blockquote key={r.q}><p>{r.q}</p><footer>{r.n}</footer></blockquote>
        ))}
      </div>
    </section>
  )
}

/* ---------- booking: builds the WhatsApp message live ---------- */
const DAYS_OPEN = ['Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
function Book() {
  const [f, setF] = useState({ name: '', service: 'Tattoo', idea: '', place: '', size: 'Not sure yet', day: 'Any open day' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const msg = useMemo(() => [
    'Hi NecroMayhemlord! 👋',
    `I'd like to book an appointment.`,
    '',
    `Name: ${f.name.trim() || '(my name)'}`,
    `Service: ${f.service}`,
    `Idea: ${f.idea.trim() || '(I will describe it here)'}`,
    `Placement: ${f.place.trim() || '(not sure yet)'}`,
    `Size: ${f.size}`,
    `Preferred day: ${f.day}`,
    '',
    `I'll send reference photos in this chat. Thank you!`,
  ].join('\n'), [f])
  return (
    <section className="section alt" id="book">
      <h2>Book on WhatsApp</h2>
      <p className="lead">Fill in what you know. Your message is written for you. Press send in WhatsApp and attach your reference photos.</p>
      <div className="book">
        <div className="form">
          <label>Your name<input value={f.name} onChange={set('name')} autoComplete="name" placeholder="e.g. Maria" /></label>
          <label>Service
            <select value={f.service} onChange={set('service')}>
              <option>Tattoo</option><option>Piercing</option><option>Cover-up</option><option>Touch-up</option><option>Design consultation</option>
            </select>
          </label>
          <label className="full">Your idea<textarea rows="3" value={f.idea} onChange={set('idea')} placeholder="e.g. Black & grey lion with roses" /></label>
          <label>Placement<input value={f.place} onChange={set('place')} placeholder="e.g. Forearm" /></label>
          <label>Size
            <select value={f.size} onChange={set('size')}>
              <option>Not sure yet</option><option>Small (palm or less)</option><option>Medium (hand to forearm)</option><option>Large (half sleeve, ribs, thigh)</option><option>Full sleeve or back piece</option>
            </select>
          </label>
          <label className="full">Preferred day
            <select value={f.day} onChange={set('day')}>
              <option>Any open day</option>{DAYS_OPEN.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
        </div>
        <div className="phone">
          <p className="phone-top">Message preview</p>
          <div className="bubble" aria-live="polite">{msg}</div>
          <a className="btn btn-wa btn-lg" href={wa(msg)} target="_blank" rel="noopener noreferrer">{Ic.whatsapp}Send on WhatsApp</a>
          <p className="fine">Opens WhatsApp with this message ready to send to {SHOP.whatsappDisplay}.</p>
        </div>
      </div>
    </section>
  )
}

function Visit() {
  const { today, open, closes } = useOpenStatus()
  return (
    <section className="section" id="visit">
      <h2>Visit the studio</h2>
      <div className="visit">
        <div>
          <p className={`status ${open ? 'is-open' : ''}`}><i />{open ? `Open now · closes ${fmt(closes)}` : 'Closed now'}</p>
          <ul className="hours">
            {HOURS.map(([d, h]) => (
              <li key={d} className={d === today ? 'today' : ''}><span>{d}</span><span>{h ? `${fmt(h[0])} to ${fmt(h[1])}` : 'Closed'}</span></li>
            ))}
          </ul>
          <p className="contact">
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">{Ic.pin}{SHOP.address}</a>
            <a href={`tel:${SHOP.phoneHref}`}>{Ic.phone}{SHOP.phone}</a>
          </p>
          <a className="btn btn-ghost" href={MAPS_LINK} target="_blank" rel="noopener noreferrer">Get directions</a>
        </div>
        <iframe title="Map to NecroMayhemlord" src={MAPS_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </section>
  )
}

function Footer() {
  const socials = SOCIALS.filter((s) => s.url)
  return (
    <footer className="footer">
      <p className="brand">{SHOP.name}</p>
      <div className="socials">
        <a href={wa(QUICK_MESSAGE)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{Ic.whatsapp}</a>
        {socials.map((s) => (<a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{Ic[s.id]}</a>))}
      </div>
      <p className="fine">© {new Date().getFullYear()} {SHOP.name}. Must be 18+ for tattoos and piercings. Valid ID required.</p>
    </footer>
  )
}

function FloatingWhatsApp() {
  return (
    <a className="fab" href={wa(QUICK_MESSAGE)} target="_blank" rel="noopener noreferrer" aria-label="Book on WhatsApp">
      <span className="fab-label">Book on WhatsApp</span>
      <span className="fab-icon">{Ic.whatsapp}</span>
    </a>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#work">Skip to content</a>
      <Header />
      <main>
        <Hero /><Work /><Services /><Reviews /><Book /><Visit />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
