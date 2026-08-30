import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      {/* 1. Cold open — full-bleed hero */}
      <div
        className="w-full"
        style={{ height: '100vh', background: 'linear-gradient(150deg, #c9b294, #7A4B32)' }}
      />

      {/* Pause — intro statement */}
      <section style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', padding: '120px 24px' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7A4B32', marginBottom: 22 }}>
          Our Story
        </p>
        <p className="font-serif" style={{ fontWeight: 400, fontSize: 26, lineHeight: 1.7, color: '#211D19' }}>
          A British house built on the belief that a beautiful bag should last a lifetime — not a season.
        </p>
      </section>

      {/* 2. The name — small inset portrait + text */}
      <div style={{ padding: '20px 5vw 130px', display: 'flex', alignItems: 'center', gap: '5vw', flexWrap: 'wrap' }}>
        <div style={{ width: 420, maxWidth: '42vw', marginLeft: '9vw', flexShrink: 0 }}>
          <div style={{ width: '100%', height: 560, background: 'linear-gradient(150deg, #d8c8ae, #8a6540)' }} />
        </div>
        <div style={{ maxWidth: 340, paddingBottom: 20 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7A4B32', marginBottom: 14 }}>
            The name
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(33,29,25,0.7)', maxWidth: 320 }}>
            Hegētt — from the Old English word for "to hold." A name chosen to carry weight: the weight of craft, of care, of something made to be kept.
          </p>
        </div>
      </div>

      {/* 3. The story — wide image, light background */}
      <section style={{ background: '#F5F2EC', color: '#211D19', padding: '130px 5vw' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto 60px' }}>
          <div style={{ width: '100%', height: 560, background: 'linear-gradient(150deg, #c9b294, #3a2416)' }} />
        </div>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7A4B32', marginBottom: 22 }}>
            The story
          </p>
          <p className="font-serif" style={{ fontStyle: 'italic', fontSize: 24, lineHeight: 1.7 }}>
            Founded in London in 2013, Hegētt was born from a frustration with fast fashion and a love of things made properly. We make bags for women who buy once and keep forever.
          </p>
        </div>
      </section>

      {/* 4. The founder — portrait beside note */}
      <div style={{ maxWidth: 1680, margin: '0 auto', padding: '140px 6vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '9vw' }}>
        <div style={{ width: 380, maxWidth: '42vw', flexShrink: 0 }}>
          <div style={{ width: '100%', height: 300, background: 'linear-gradient(150deg, #b7c2ac, #545B45)' }} />
        </div>
        <div style={{ flex: 1, minWidth: 280, maxWidth: 620, paddingTop: 6 }}>
          <p className="font-serif" style={{ fontWeight: 300, fontSize: 26, lineHeight: 1.6, marginBottom: 18, color: '#211D19', fontStyle: 'italic' }}>
            I started Hegētt because I couldn't find what I was looking for — something genuinely well-made, without the logo tax.
          </p>
          <p className="font-sans" style={{ fontWeight: 500, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7A4B32', margin: '26px 0 22px' }}>
            The Founder
          </p>
          <p className="font-serif" style={{ fontWeight: 300, fontSize: 26, lineHeight: 1.6, color: '#211D19', fontStyle: 'italic' }}>
            Ten years of working in leather goods — ateliers in Florence, suppliers in Scotland — went into the first four bags. Everything we make starts with the leather.
          </p>
          <p className="font-serif" style={{ marginTop: 24, fontSize: 22, opacity: 0.7, color: '#211D19', fontStyle: 'italic' }}>
            The Hegētt Team
          </p>
        </div>
      </div>

      {/* 5. The idea — wide landscape strip */}
      <div style={{ padding: '0 8vw 130px' }}>
        <div style={{ width: '100%', height: 440, background: 'linear-gradient(150deg, #d9cdb8, #211D19)' }} />
        <div style={{ maxWidth: 560, margin: '24px auto 0', textAlign: 'center' }}>
          <h2 className="font-serif" style={{ fontWeight: 400, fontSize: 22, marginBottom: 12, color: '#211D19' }}>
            The idea
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(33,29,25,0.7)' }}>
            Every Hegētt bag is designed in London and made in small batches by hand. We work with tanneries that have been operating for over a century, and we never rush the process. A bag that takes three weeks to make should take three seconds to decide to keep.
          </p>
        </div>
      </div>

      {/* 6. Closing duo — two images side by side */}
      <div style={{ display: 'flex', gap: 16, width: '100%', height: '70vh', padding: '0 5vw', margin: '60px 0' }}>
        <div style={{ flex: 1, background: 'linear-gradient(150deg, #8a6540, #4A5240)' }} />
        <div style={{ flex: 1, background: 'linear-gradient(150deg, #d8c8ae, #211D19)' }} />
      </div>

      {/* Closing statement */}
      <section style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', padding: '120px 24px 140px' }}>
        <p className="font-serif" style={{ fontSize: 20, lineHeight: 1.6, marginBottom: 10, color: '#211D19' }}>
          Hegētt launches with its founding collection, August 2026.
        </p>
        <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7A4B32' }}>
          Four bags. One idea.
        </span>
      </section>

      <Footer />
    </>
  )
}
