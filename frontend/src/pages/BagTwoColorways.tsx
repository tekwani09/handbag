import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const umber = '#7A4B32'
const ink = '#211D19'
const paper = '#F5F2EC'

const Eyebrow = ({ children }: { children: string }) => (
  <p style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: umber, marginBottom: 18 }}>
    {children}
  </p>
)

export default function BagTwoColorways() {
  return (
    <div style={{ background: paper, color: ink, fontFamily: "'Jost', sans-serif" }}>

      {/* Title block */}
      <section style={{ maxWidth: 720, margin: '90px auto 100px', textAlign: 'center', padding: '0 24px' }}>
        <Eyebrow>No. 001 — The Founding Collection</Eyebrow>
        <h1 className="font-serif" style={{ fontWeight: 400, fontSize: 44, marginBottom: 16, lineHeight: 1.15 }}>
          The Bag Name
        </h1>
        <p className="font-serif" style={{ fontStyle: 'italic', fontSize: 18, color: 'rgba(33,29,25,0.65)' }}>
          Placeholder — a short poetic line, not a description. What this bag is for or the feeling it carries.
        </p>
      </section>

      {/* Hero */}
      <div style={{ width: '100%', aspectRatio: '1536/1024', maxHeight: '82vh', overflow: 'hidden', background: 'linear-gradient(150deg,#c9b294,#3a2a1e)' }} />

      {/* Spread 1 — The idea */}
      <div style={{ maxWidth: 1200, margin: '0 auto 130px', padding: '0 5vw', display: 'flex', alignItems: 'center', gap: '6vw', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 400 }}>
          <Eyebrow>The idea</Eyebrow>
          <p className="font-serif" style={{ fontWeight: 400, fontSize: 23, lineHeight: 1.65 }}>
            Placeholder — one or two sentences on where this bag's shape or silhouette came from. Kept short, the way Hermès tells the Birkin's origin in a couple of plain sentences.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ width: '100%', aspectRatio: '1920/2688', background: 'linear-gradient(150deg,#d8c8ae,#7a6248)', maxHeight: 520, overflow: 'hidden' }} />
        </div>
      </div>

      {/* Spread 2 — The making (reversed) */}
      <div style={{ maxWidth: 1200, margin: '0 auto 130px', padding: '0 5vw', display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', gap: '6vw', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 400 }}>
          <Eyebrow>The making</Eyebrow>
          <p className="font-serif" style={{ fontWeight: 400, fontSize: 23, lineHeight: 1.65 }}>
            Placeholder — how this bag is made. The process, the hands, the place. One paragraph, told simply — not a spec sheet.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ width: '100%', aspectRatio: '4/5', background: 'linear-gradient(150deg,#b7a28e,#3a2a1e)', height: 520, overflow: 'hidden' }} />
        </div>
      </div>

      {/* Colorways — two side by side */}
      <div style={{ maxWidth: 1100, margin: '0 auto 130px', padding: '0 5vw', textAlign: 'center' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: umber, marginBottom: 40 }}>
          Available in two colours
        </p>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { name: 'Black', bg: 'linear-gradient(150deg,#3a3630,#111)' },
            { name: 'Tan', bg: 'linear-gradient(150deg,#d8c8ae,#8a6540)' },
          ].map(({ name, bg }) => (
            <div key={name} style={{ flex: 1, minWidth: 220 }}>
              <div style={{ width: '100%', height: 460, background: bg, marginBottom: 16 }} />
              <p className="font-serif" style={{ fontStyle: 'italic', fontSize: 17 }}>{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div style={{ maxWidth: 1200, margin: '0 auto 130px', padding: '0 5vw', display: 'flex', alignItems: 'center', gap: '6vw', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ width: '100%', height: 480, background: 'linear-gradient(150deg,#c9b29a,#211D19)' }} />
        </div>
        <div style={{ maxWidth: 400 }}>
          <Eyebrow>The leather</Eyebrow>
          <p className="font-serif" style={{ fontWeight: 400, fontSize: 23, lineHeight: 1.65 }}>
            Placeholder — the leather or material used. Where it comes from, why it was chosen, what it feels like. One short paragraph.
          </p>
        </div>
      </div>

      {/* Closing */}
      <section style={{ maxWidth: 520, margin: '60px auto 140px', textAlign: 'center', padding: '0 24px' }}>
        <p className="font-serif" style={{ fontSize: 20, lineHeight: 1.6, marginBottom: 10, color: ink }}>
          Part of the Hegētt founding collection, August 2026.
        </p>
        <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: umber }}>
          Two colours. One bag. Made to last.
        </span>
        <div style={{ marginTop: 40 }}>
          <Link to="/products" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'underline', color: ink }}>
            View the collection
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
