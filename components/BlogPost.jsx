'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const SIGNUP_URL = 'https://app.dtezen.com/registro?view=signup'
const LOGIN_URL  = 'https://app.dtezen.com/registro?view=login'

export default function BlogPost({ meta, children }) {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setProgress(Math.min(pct, 100))
      setScrolled(el.scrollTop > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Aura */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#f0f0f5', overflow: 'hidden' }} aria-hidden="true">
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', filter: 'blur(90px)', opacity: .45, background: 'radial-gradient(circle, rgba(174,147,255,.6), transparent)', top: '-10%', left: '-5%', animation: 'bf 20s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', filter: 'blur(90px)', opacity: .35, background: 'radial-gradient(circle, rgba(118,226,246,.5), transparent)', bottom: '5%', right: '-5%', animation: 'bf 16s ease-in-out infinite reverse' }} />
      </div>

      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 2000, background: 'rgba(228,228,231,.4)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #ff2f6d, #2563eb)', transition: 'width .1s linear', borderRadius: '0 2px 2px 0' }} />
      </div>

      {/* Nav */}
      <nav className="nav" aria-label="Navegación">
        <div className="nav-inner">
          <img src="/logo.png" alt="DTEzen" style={{ height: '62px', filter: 'brightness(0) invert(1)', marginBottom: 12 }} />
          <div className="nav-links">
            <a href="/#red-contable" style={{ color: '#ff2f6d', fontWeight: 700, textDecoration: 'none', padding: '8px 14px', fontSize: 14 }}>Red Contable</a>
            <a href="/blog" style={{ color: '#71717a', fontWeight: 700, textDecoration: 'none', padding: '8px 14px', fontSize: 14 }}>Blog</a>
            <a href="/#pricing" style={{ color: '#71717a', fontWeight: 700, textDecoration: 'none', padding: '8px 14px', fontSize: 14 }}>Planes</a>
          </div>
          <a href={SIGNUP_URL} className="btn-dark">Comienza Hoy</a>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 1, paddingTop: 110 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 120px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 60, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article">
            <meta itemProp="author" content="DTEzen" />
            <meta itemProp="publisher" content="DTEzen" />

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 13, fontWeight: 600, color: '#a1a1aa' }}>
              <a href="/" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Inicio</a>
              <span>›</span>
              <a href="/blog" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Blog</a>
              <span>›</span>
              <span style={{ color: '#20202a' }}>{meta.category}</span>
            </nav>

            {/* Header */}
            <header style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ background: `${meta.categoryColor}15`, color: meta.categoryColor, border: `1px solid ${meta.categoryColor}30`, padding: '5px 14px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                  {meta.category}
                </span>
                <span style={{ color: '#a1a1aa', fontSize: 13, fontWeight: 600 }}>{meta.readTime} de lectura</span>
              </div>
              <h1 itemProp="name headline" style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.08, margin: '0 0 24px', color: '#0f172a' }}>
                {meta.title}
              </h1>
              <p style={{ fontSize: 20, color: '#475569', lineHeight: 1.6, margin: '0 0 28px', fontWeight: 500 }}>
                {meta.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 24, borderTop: '1px solid rgba(228,228,231,.8)' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #ff2f6d, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#20202a' }}>Equipo DTEzen</div>
                  <time dateTime={meta.date} itemProp="datePublished" style={{ fontSize: 13, color: '#a1a1aa', fontWeight: 600 }}>
                    {new Date(meta.date).toLocaleDateString('es-SV', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="prose" itemProp="articleBody">
              {children}
            </div>

            {/* Bottom CTA */}
            <div style={{ marginTop: 64, background: '#18181b', borderRadius: 28, padding: '44px 40px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: -60, background: 'radial-gradient(circle at 20% 20%, rgba(255,47,109,.3), transparent 28%), radial-gradient(circle at 80% 80%, rgba(37,99,235,.25), transparent 28%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ color: 'white', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, letterSpacing: '-1px', margin: '0 0 12px' }}>
                  ¿Listo para emitir tu primer DTE?
                </h2>
                <p style={{ color: 'rgba(255,255,255,.7)', margin: '0 0 28px', fontSize: 16, lineHeight: 1.5 }}>
                  DTEzen te configura en minutos. Sin complicaciones, sin errores.
                </p>
                <a href={SIGNUP_URL} className="btn-dark" style={{ background: '#ff2f6d', display: 'inline-flex', padding: '14px 32px', fontSize: 15 }}>
                  Comenzar gratis →
                </a>
              </div>
            </div>

            {/* Related */}
            <div style={{ marginTop: 48 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, color: '#20202a' }}>Más artículos</h3>
              <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#2563eb', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
                ← Ver todos los artículos
              </a>
            </div>
          </article>

          {/* Sticky sidebar */}
          <aside style={{ position: 'sticky', top: 100 }}>
            {/* TOC */}
            {meta.toc && meta.toc.length > 0 && (
              <div style={{ background: 'rgba(255,255,255,.82)', border: '1px solid rgba(228,228,231,.9)', borderRadius: 24, padding: 28, backdropFilter: 'blur(18px)', marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#a1a1aa', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 16 }}>En este artículo</div>
                <nav aria-label="Tabla de contenidos">
                  {meta.toc.map((item, i) => (
                    <a key={i} href={`#${item.id}`} style={{ display: 'block', color: '#71717a', textDecoration: 'none', fontSize: 14, fontWeight: 600, padding: '7px 0', borderBottom: i < meta.toc.length - 1 ? '1px solid rgba(228,228,231,.6)' : 'none', transition: 'color .15s' }}
                      onMouseEnter={e => e.target.style.color = '#2563eb'}
                      onMouseLeave={e => e.target.style.color = '#71717a'}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Sidebar CTA */}
            <div style={{ background: 'linear-gradient(180deg, #2c2d4a, #41457c)', borderRadius: 24, padding: 28, color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: -40, background: 'radial-gradient(circle at 50% 0%, rgba(255,47,109,.3), transparent 50%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>⚡</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 10px', letterSpacing: '-.4px' }}>Empieza hoy</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.75)', margin: '0 0 20px', lineHeight: 1.5 }}>
                  Desde $11/mes. Configuración en minutos.
                </p>
                <a href={SIGNUP_URL} style={{ display: 'block', background: '#ff2f6d', color: 'white', textDecoration: 'none', textAlign: 'center', padding: '12px 20px', borderRadius: 14, fontWeight: 900, fontSize: 14, transition: '.2s' }}>
                  Crear cuenta
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-inner">
          <div>
            <img src="/logo.png" alt="DTEzen" style={{ height: '62px', filter: 'brightness(0) invert(1)', marginBottom: 12 }} />
            <p className="footer-copy">© 2026 DTEzen. Todos los derechos reservados.</p>
          </div>
          <div className="footer-col"><h4>Pagos</h4><span style={{ color: '#a1a1aa', fontWeight: 800 }}>Wompi</span></div>
          <div className="footer-col"><h4>Contacto</h4><a href="mailto:contacto@dtezen.com">contacto@dtezen.com</a></div>
          <div className="footer-col">
              <h4>Legal</h4>
              <a href="https://app.dtezen.com/terminos">Términos y Condiciones</a>
              <a href="https://app.dtezen.com/privacidad">Política de privacidad</a>
            </div>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">Software de facturación electrónica DTE para El Salvador · Ministerio de Hacienda homologado</div>
      </footer>

      <style>{`
        @keyframes bf { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-40px)} }

        .prose { font-size: 17px; line-height: 1.75; color: #334155; }
        .prose h2 { font-size: clamp(22px, 3vw, 30px); font-weight: 800; letter-spacing: -.8px; color: #0f172a; margin: 52px 0 20px; padding-top: 8px; }
        .prose h3 { font-size: 20px; font-weight: 800; color: #0f172a; margin: 36px 0 14px; letter-spacing: -.4px; }
        .prose p { margin: 0 0 20px; }
        .prose ul, .prose ol { padding-left: 0; margin: 0 0 24px; list-style: none; display: grid; gap: 10px; }
        .prose li { display: flex; gap: 12px; align-items: flex-start; }
        .prose ul li::before { content: "✓"; color: #2563eb; font-weight: 900; flex-shrink: 0; margin-top: 2px; }
        .prose ol { counter-reset: li; }
        .prose ol li::before { counter-increment: li; content: counter(li); background: #0f172a; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; flex-shrink: 0; margin-top: 2px; }
        .prose strong { color: #0f172a; font-weight: 800; }
        .prose a { color: #2563eb; font-weight: 700; }

        .info-box { background: rgba(37,99,235,.05); border: 1px solid rgba(37,99,235,.15); border-left: 4px solid #2563eb; border-radius: 0 16px 16px 0; padding: 20px 24px; margin: 28px 0; }
        .info-box p { margin: 0; color: #1e40af; font-size: 15px; line-height: 1.6; }
        .info-box strong { color: #1e3a8a; }

        .warning-box { background: rgba(255,47,109,.05); border: 1px solid rgba(255,47,109,.15); border-left: 4px solid #ff2f6d; border-radius: 0 16px 16px 0; padding: 20px 24px; margin: 28px 0; }
        .warning-box p { margin: 0; color: #9f1239; font-size: 15px; line-height: 1.6; }

        .success-box { background: rgba(16,185,129,.05); border: 1px solid rgba(16,185,129,.15); border-left: 4px solid #10b981; border-radius: 0 16px 16px 0; padding: 20px 24px; margin: 28px 0; }
        .success-box p { margin: 0; color: #065f46; font-size: 15px; line-height: 1.6; }

        .step-card { background: rgba(255,255,255,.82); border: 1px solid rgba(228,228,231,.9); border-radius: 20px; padding: 24px 28px; margin: 16px 0; backdrop-filter: blur(18px); display: flex; gap: 20px; align-items: flex-start; box-shadow: 0 4px 20px rgba(20,20,20,.05); }
        .step-num { width: 40px; height: 40px; border-radius: 14px; background: #0f172a; color: white; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 900; flex-shrink: 0; }
        .step-card h4 { margin: 0 0 6px; font-size: 16px; font-weight: 800; color: #0f172a; }
        .step-card p { margin: 0; color: #64748b; font-size: 14px; line-height: 1.5; }

        .comparison-table { width: 100%; border-collapse: collapse; margin: 28px 0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(20,20,20,.06); }
        .comparison-table th { background: #0f172a; color: white; padding: 14px 18px; text-align: left; font-size: 13px; font-weight: 700; letter-spacing: .04em; }
        .comparison-table td { padding: 14px 18px; font-size: 14px; border-bottom: 1px solid rgba(228,228,231,.6); background: white; color: #334155; font-weight: 600; }
        .comparison-table tr:last-child td { border-bottom: none; }
        .comparison-table tr:nth-child(even) td { background: #f8fafc; }

        @media (max-width: 900px) {
          main > div { grid-template-columns: 1fr !important; }
          aside { position: static !important; }
        }
      `}</style>
    </>
  )
}
