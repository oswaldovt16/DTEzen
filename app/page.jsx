'use client'
import { useEffect, useRef, useState } from 'react'

const SIGNUP_URL  = 'https://app.dtezen.com/registro?view=signup'
const LOGIN_URL   = 'https://app.dtezen.com/registro?view=login'

// Precios
const PRICING = {
  essential: {
    quarterly:  { monthly: '$11.00', total: 'Total 3 meses: $33.00 + IVA' },
    semiannual: { monthly: '$9.90',  total: 'Ahorra 5% · 6 meses × $62.70 + IVA' },
    annual:     { monthly: '$8.75',  total: '15% descuento · 1 año × $118.80 + IVA' },
  },
  pyme: {
    quarterly:  { monthly: '$22.00', total: 'Total 3 meses: $66.00 + IVA' },
    semiannual: { monthly: '$19.80', total: 'Ahorra 5% · 6 meses × $125.40 + IVA' },
    annual:     { monthly: '$17.60', total: '15% descuento · 1 año × $237.60 + IVA' },
  },
  maxima: {
    quarterly:  { monthly: '$45.00', total: 'Total 3 meses: $135.00 + IVA' },
    semiannual: { monthly: '$40.50', total: 'Ahorra 5% · 6 meses × $256.00 + IVA' },
    annual:     { monthly: '$36.00', total: '15% descuento · 1 año × $486.00 + IVA' },
  },
}

export default function Home() {
  const [period, setPeriod]           = useState('quarterly')
  const [expanded, setExpanded]       = useState({})
  const [formStatus, setFormStatus]   = useState('')
  const [packetFmt, setPacketFmt]     = useState({ text: 'JSON', bg: '#ff2f6d' })
  const [fileLabel, setFileLabel]     = useState('DTE_Emitido.json')
  
  // Nuevos estados
  const [viewMode, setViewMode]       = useState('landing') // 'landing' | 'red-contable'
  const [menuOpen, setMenuOpen]       = useState(false)

  // Cambio de vista con scroll al top
  const changeView = (view) => {
    setViewMode(view)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Animaciones (solo corren si estamos en landing)
  useEffect(() => {
    if (viewMode !== 'landing') return
    const words = document.querySelectorAll('.word')
    let current = 0
    const pill  = document.getElementById('pillContainer')
    const tick = setInterval(() => {
      words.forEach((w, i) => {
        if (parseFloat(getComputedStyle(w).opacity) > 0.8 && current !== i) {
          current = i
          if (pill) pill.className = `animated-text-wrapper color-${i + 1}`
        }
      })
    }, 70)
    return () => clearInterval(tick)
  }, [viewMode])

  useEffect(() => {
    const fmts   = ['JSON', 'XLS', 'PDF']
    const labels = ['DTE_Emitido.json', 'Reporte_Mensual.xls', 'Factura_Fiscal.pdf']
    const colors = ['#ff2f6d', '#10b981', '#2563eb']
    let idx = 0
    const iv = setInterval(() => {
      idx = (idx + 1) % fmts.length
      setPacketFmt({ text: fmts[idx], bg: colors[idx] })
      setFileLabel(labels[idx])
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  // Carrusel
  const carouselRef = useRef(null)
  const trackRef    = useRef(null)
  useEffect(() => {
    if (viewMode !== 'landing') return
    const c = carouselRef.current
    const t = trackRef.current
    if (!c || !t) return
    t.innerHTML = t.innerHTML + t.innerHTML + t.innerHTML
    let dragging = false, hovering = false, startX = 0, startScroll = 0, last = null
    const seg = () => t.scrollWidth / 3
    const norm = () => {
      if (c.scrollLeft >= seg() * 2) c.scrollLeft -= seg()
      if (c.scrollLeft <= 0)         c.scrollLeft += seg()
    }
    const scroll = ts => {
      if (!last) last = ts
      const d = ts - last; last = ts
      if (!dragging && !hovering) { c.scrollLeft += (88 * d) / 1000; norm() }
      requestAnimationFrame(scroll)
    }
    const timeout = setTimeout(() => { c.scrollLeft = seg(); requestAnimationFrame(scroll) }, 120)
    
    c.onmouseenter = () => hovering = true
    c.onmouseleave = () => { hovering = false; dragging = false; c.classList.remove('dragging') }
    c.onmousedown = e => { dragging = true; c.classList.add('dragging'); startX = e.pageX; startScroll = c.scrollLeft }
    window.onmouseup = () => { dragging = false; c.classList.remove('dragging') }
    window.onmousemove = e => { if (!dragging) return; e.preventDefault(); c.scrollLeft = startScroll - (e.pageX - startX) * 1.3; norm() }
    
    window.moveErpCarousel = dir => {
      dragging = true; c.scrollBy({ left: dir * 340, behavior: 'smooth' })
      setTimeout(() => { norm(); dragging = false }, 700)
    }
    return () => clearTimeout(timeout)
  }, [viewMode])

  // Reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [viewMode])

  const toggleExpand = plan => setExpanded(p => ({ ...p, [plan]: !p[plan] }))

  // Manejo de Resend
  const handleContact = async e => {
    e.preventDefault()
    const f = e.target
    setFormStatus('Enviando...')
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: f.email?.value, name: f.name?.value, message: f.message?.value }),
      })
      if (!r.ok) throw new Error()
      setFormStatus('¡Mensaje enviado exitosamente!')
      f.reset()
    } catch {
      setFormStatus('Hubo un error. Por favor intenta de nuevo.')
    }
  }

  const PlanCard = ({ plan, label, desc, featured, badge, setupNote, setupClass = 'setup-note', features }) => {
    const data = PRICING[plan][period]
    const visible = 5
    const isExpanded = expanded[plan]
    return (
      <article className={`price-card${featured ? ' featured' : ''}`} data-plan={plan}>
        {badge && <span className="badge">{badge}</span>}
        <h3>{label}</h3>
        <p>{desc}</p>
        <div className="price">
          <strong>{data.monthly}</strong><span>/mes</span>
        </div>
        <div className="period-total">{data.total}</div>
        <div className={setupClass} dangerouslySetInnerHTML={{ __html: setupNote }} />
        <ul className="feature-list">
          {features.map((f, i) => (
            <li key={i} style={{ display: !isExpanded && i >= visible ? 'none' : 'flex' }}>{f}</li>
          ))}
        </ul>
        {features.length > visible && (
          <button className="show-more-btn" onClick={() => toggleExpand(plan)}>
            {isExpanded ? 'Ver menos' : 'Ver más'}
          </button>
        )}
        <br />
        <button className={featured ? 'btn-soft' : 'btn-pink'} style={{ marginTop: 12 }} onClick={() => window.location.href = SIGNUP_URL}>
          {featured ? 'Elegir PYME' : 'Comenzar'}
        </button>
      </article>
    )
  }

  return (
    <>
      <div className="aura-root" aria-hidden="true">
        <div className="aura-blob aura-blob-1" />
        <div className="aura-blob aura-blob-2" />
        <div className="aura-blob aura-blob-3" />
        <div className="aura-blob aura-blob-4" />
      </div>

      <div className="page-shell">
        {/* NAV LIQUID GLASS */}
        <nav className="nav" aria-label="Navegación principal">
          <div className="nav-inner">
            <button onClick={() => changeView('landing')} className="logo-btn" aria-label="DTEzen inicio">
              <img src="/logo.png" alt="DTEzen" className="logo-img" />
            </button>
            
            {/* Desktop Links */}
            <div className="nav-links">
              {viewMode === 'landing' ? (
                <>
                  <button onClick={() => changeView('red-contable')} className="nav-accent nav-btn">Red Contable</button>
                  <a href="#pricing">Comienza Hoy</a>
                  <a href="#contacto">Contacto</a>
                </>
              ) : (
                <button onClick={() => changeView('landing')} className="nav-btn">← Volver a Facturación</button>
              )}
            </div>
            
            <a href={LOGIN_URL} className="btn-dark desktop-login">Inicia Sesión</a>
            
            {/* Hamburger Icon */}
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
              <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
              <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {menuOpen && (
            <div className="mobile-menu">
              <button onClick={() => changeView('landing')} className="mob-link">Facturación DTE</button>
              <button onClick={() => changeView('red-contable')} className="mob-link nav-accent">Red Contable</button>
              <a href={LOGIN_URL} className="btn-dark">Inicia Sesión</a>
            </div>
          )}
        </nav>

        {/* ─── VISTA: LANDING PAGE ─── */}
        {viewMode === 'landing' && (
          <div className="view-transition">
            <header className="hero">
              <div className="hero-content reveal">
                <h1 className="hero-title">
                  <span style={{ color: '#000' }}>Facturación digital</span>
                  <span className="static-text">que funciona como</span>
                  <span className="animated-text-wrapper color-1" id="pillContainer">
                    <span className="animated-text">
                      <span className="word">Debería 🚀</span>
                      <span className="word">Tu equipo 👥</span>
                      <span className="word">Magia ✨</span>
                      <span className="word">Autopiloto 🎯</span>
                    </span>
                  </span>
                </h1>
                <p className="hero-subtitle">
                  La forma más simple y moderna de emitir DTEs, operar tu negocio y cumplir con el Ministerio de Hacienda en El Salvador.
                </p>
                <div className="hero-actions">
                  <button className="btn-dark" onClick={() => window.location.href = SIGNUP_URL}>Comienza Hoy →</button>
                  <button className="btn-pink" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>Ver planes</button>
                </div>
              </div>
            </header>

            <section className="section" aria-labelledby="erp-heading">
              <div className="section-header reveal">
                <span className="eyebrow">Más que facturación</span>
                <h2 id="erp-heading">Administra tu empresa desde un solo lugar</h2>
                <p>DTEzen combina facturación electrónica, inventario, clientes, proveedores, cotizaciones y acceso contable en una experiencia simple y moderna.</p>
              </div>
              <div className="erp-showcase reveal">
                <div className="glow glow-one" aria-hidden="true" />
                <div className="glow glow-two" aria-hidden="true" />
                <div className="carousel-shell">
                  <button className="carousel-arrow left" onClick={() => window.moveErpCarousel?.(-1)} aria-label="Anterior">‹</button>
                  <div className="erp-carousel" ref={carouselRef}>
                    <div className="erp-track" ref={trackRef}>
                      {[
                        { icon: '📊', title: 'Portal Mi Contador', desc: 'Comparte información fiscal y documentos clave con tu contador.', dark: true },
                        { icon: '📦', title: 'Inventario', desc: 'Controla productos, existencias y movimientos sin complicaciones.' },
                        { icon: '👥', title: 'Clientes', desc: 'Centraliza tu cartera de clientes y agiliza cada emisión.' },
                        { icon: '🧑‍💼', title: 'Empleados', desc: 'Administra usuarios, permisos y actividad dentro de tu empresa.' },
                        { icon: '📝', title: 'Cotizaciones', desc: 'Crea propuestas profesionales antes de convertirlas en DTEs.' },
                        { icon: '🚚', title: 'Proveedores', desc: 'Organiza compras, contactos y operaciones clave de tu negocio.' },
                      ].map((c, i) => (
                        <article key={i} className={`erp-card${c.dark ? ' accountant' : ''}`}>
                          <div className="erp-icon">{c.icon}</div>
                          <h3>{c.title}</h3>
                          <p>{c.desc}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                  <button className="carousel-arrow right" onClick={() => window.moveErpCarousel?.(1)} aria-label="Siguiente">›</button>
                </div>
                <div className="accountant-spotlight">
                  <div>
                    <span className="tag-new">NUEVO</span>
                    <h3>Portal Mi Contador</h3>
                    <p>Dale acceso ordenado a tu contador para consultar DTEs, documentos, ventas, compras y reportes sin pedirte archivos por WhatsApp ni físicos.</p>
                  </div>
                  <div className="mini-dashboard" aria-hidden="true">
                    <div className="mini-top" />
                    <div className="mini-row" />
                    <div className="mini-row short" />
                    <div className="mini-grid">
                      <b>$12,450</b>
                      <b>128 DTEs</b>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 24, textAlign: 'center' }}>
                  <button className="show-more-btn2" onClick={() => changeView('red-contable')}>
                    Conocer la Red Contable →
                  </button>
                </div>
              </div>
            </section>

            <section className="smart-ops-section" aria-labelledby="smartops-heading">
              <div className="smart-ops-header">
                <span className="badge-pill">Plataforma inteligente</span>
                <h2 id="smartops-heading">Todo tu negocio, asistido por tecnología más inteligente</h2>
              </div>
              <div className="smart-ops-grid">
                <article className="smart-card smart-card-large">
                  <div className="card-text">
                    <h3>Gestión empresarial completa</h3>
                    <p>Factura, administra clientes, proveedores, empleados e inventario.</p>
                  </div>
                  <div className="visual-container ecosystem-visual" aria-hidden="true">
                    <div className="ecosystem-center">Empresa</div>
                    <div className="eco-node eco-1">Facturación</div>
                    <div className="eco-node eco-2">Clientes</div>
                    <div className="eco-node eco-3">Proveedores</div>
                    <div className="eco-node eco-4">Empleados</div>
                    <div className="eco-node eco-5">Inventario</div>
                  </div>
                </article>
                <article className="smart-card ai-card">
                  <div className="card-text">
                    <h3>Procesos impulsados por IA</h3>
                  </div>
                  <div className="visual-container ai-visual-modern" aria-hidden="true">
                    <div className="ai-glow-orbit">
                      <div className="ai-center-core"><span className="ai-text-brand">IA</span></div>
                    </div>
                  </div>
                </article>
                <article className="smart-card">
                  <div className="card-text">
                    <h3>DTEs seguros JSON</h3>
                  </div>
                  <div className="visual-container" aria-hidden="true">
                    <div className="invoice-sheet"><div className="format-json">✓ JSON</div></div>
                  </div>
                </article>
              </div>
            </section>

            <section className="country-section" aria-labelledby="country-heading">
              <div className="country-inner reveal">
                <h2 id="country-heading">Solución moderna en <span>El Salvador 🇸🇻</span></h2>
                <div className="doc-orbit" aria-hidden="true">
                  <div className="doc-card" /><div className="doc-card" /><div className="doc-card" />
                </div>
              </div>
            </section>

            <section className="section pricing" id="pricing" aria-labelledby="pricing-heading">
              <div className="section-header reveal">
                <span className="eyebrow">Planes</span>
                <h2 id="pricing-heading">Crecen con tu negocio</h2>
              </div>
              <div className="billing-toggle">
                {[['quarterly','Trimestral',null],['semiannual','Semestral','5% Ahorro'],['annual','Anual','Mejor Valor ✨']].map(([p,label,badge]) => (
                  <button key={p} className={`billing-option${period === p ? ' active' : ''}`} onClick={() => setPeriod(p)}>
                    {label}{badge && <span>{badge}</span>}
                  </button>
                ))}
              </div>
              <div className="pricing-grid reveal">
                <PlanCard
                  plan="essential" label="Esencial Zen" desc="Ideal para emprendedores"
                  setupNote="Implementación: $145 + IVA<span>Único pago inicial</span>"
                  features={['2 usuarios','160 DTEs/mes','Gestión de certificado','Inventario y clientes']}
                />
                <PlanCard
                  plan="pyme" label="PYME Zen" desc="Para pymes en expansión" featured badge="Más popular"
                  setupNote="Implementación: $89 + IVA<span>Único pago inicial</span>"
                  features={['6 usuarios','400 DTEs/mes','Gestión de certificado','Portal Mi Contador', 'Control empleados']}
                />
                <PlanCard
                  plan="maxima" label="Máxima Zen" desc="Empresas consolidadas"
                  setupNote="Implementación prioritaria incluida<span>Sin pago adicional</span>" setupClass="setup-note-max"
                  features={['Ilimitados','DTEs ilimitados','Cotizaciones', 'Inteligencia Artificial']}
                />
              </div>
            </section>
          </div>
        )}

        {/* ─── VISTA: RED CONTABLE (Como si fuera otra página) ─── */}
        {viewMode === 'red-contable' && (
          <div className="view-transition">
            <section className="hero" style={{ minHeight: 'auto', paddingBottom: 40, marginTop: 120 }}>
              <div className="hero-content reveal">
                <span className="rc-eyebrow">Red Contable DTEzen</span>
                <h1 className="hero-title" style={{ fontSize: 'clamp(40px, 6vw, 70px)' }}>Sincronización total con tu Despacho</h1>
                <p className="hero-subtitle">Una infraestructura digital que automatiza la relación fiscal entre clientes y contadores.</p>
              </div>
            </section>

            <section className="red-contable-section" style={{ paddingTop: 60 }}>
              <div className="rc-grid reveal">
                <div className="rc-text">
                  <h3>Opera con claridad. Incentiva el cumplimiento.</h3>
                  <p>Al activar la Red Contable, creas un ecosistema interconectado donde la información fluye sin fricciones.</p>
                  <div className="rc-bullets">
                    <div className="rc-bullet">
                      <div className="rc-bullet-icon blue">🔗</div>
                      <div className="rc-bullet-text">
                        <strong>Código único de aliado</strong>
                        <span>Cada empresa queda enlazada automáticamente a tu panel.</span>
                      </div>
                    </div>
                    <div className="rc-bullet">
                      <div className="rc-bullet-icon pink">📄</div>
                      <div className="rc-bullet-text">
                        <strong>Cumplimiento automatizado</strong>
                        <span>Acceso directo a DTEs y JSON sin pedir archivos.</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rc-visual">
                  <div className="code-card">
                    <div className="code-card-top">
                      <div className="code-dots"><span/><span/><span/></div>
                      <span className="code-title-bar">Activación</span>
                    </div>
                    <div className="code-body">
                      <span className="code-badge">RED CONTABLE ACTIVA</span>
                      <div className="code-value-box">
                        <span className="code-value-label">Tu código de aliado</span>
                        <div className="code-value">DTEZEN-AL026</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="rc-animation-section">
              <div className="rc-header">
                <h2>Anatomía de la automatización</h2>
              </div>
              <div className="anim-workspace reveal">
                <div className="anim-panel">
                  <div className="anim-panel-header">
                    <div className="anim-dot blue" />
                    <span className="anim-panel-title">Dashboard Empresa</span>
                  </div>
                  <div className="anim-file">
                    <span id="active-file-label">{fileLabel}</span>
                    <span className="anim-file-ok">✓ Enviado</span>
                  </div>
                </div>
                <div className="anim-pipeline" aria-hidden="true">
                  <div className="packet-badge" style={{ background: packetFmt.bg }}>{packetFmt.text}</div>
                </div>
                <div className="anim-panel">
                  <div className="anim-panel-header">
                    <div className="anim-dot green" />
                    <span className="anim-panel-title">Portal Red Contable</span>
                  </div>
                  <div className="anim-payout">
                    <span className="ap-label">Clientes aliados</span>
                    <span className="ap-value">10</span>
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: 80 }}>
                <button className="btn-dark" onClick={() => changeView('landing')}>← Volver a Facturación</button>
              </div>
            </section>
          </div>
        )}

        {/* ── CONTACT & FOOTER (Siempre visibles) ── */}
        <section className="contact-section" id="contacto">
          <div className="contact-wrap">
            <div className="contact-copy reveal">
              <h2>¿Listo para empezar?</h2>
              <p>Escríbenos y te ayudamos a configurar tu empresa para emitir DTEs desde el primer día.</p>
            </div>
            <div className="contact-form reveal">
              <form className="form-grid" onSubmit={handleContact}>
                <div className="field">
                  <label htmlFor="contact-name">Nombre</label>
                  <input id="contact-name" name="name" type="text" required />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Correo</label>
                  <input id="contact-email" name="email" type="email" required />
                </div>
                <div className="field">
                  <label htmlFor="contact-msg">Mensaje</label>
                  <textarea id="contact-msg" name="message" required />
                </div>
                <button type="submit" className="btn-dark" style={{ width: '100%', padding: '16px' }}>Enviar mensaje</button>
                {formStatus && <p className="form-status">{formStatus}</p>}
              </form>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-inner">
            <div>
              <img src="/logo.png" alt="DTEzen" style={{ height: '40px', filter: 'brightness(0) invert(1)', marginBottom: 12 }} />
              <p className="footer-copy">© 2026 DTEzen. Todos los derechos reservados.</p>
            </div>
            <div className="footer-col">
              <h4>Pagos</h4>
              <span className="footer-wompi"><strong>Wompi</strong></span>
            </div>
            <div className="footer-col">
              <h4>Contacto</h4>
              <a href="mailto:contacto@dtezen.com">contacto@dtezen.com</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="/terminos">Términos</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
