'use client'
import { useEffect, useRef, useState } from 'react'

const SIGNUP_URL  = 'https://app.dtezen.com/registro?view=signup'
const LOGIN_URL   = 'https://app.dtezen.com/registro?view=login'

// Precios de tu código original
const PRICING_DATA = {
  essential: {
    quarterly: { monthly: "$11.00", total: "Total 3 meses: $33.00 + IVA" },
    semiannual: { monthly: "$9.90", total: "Ahorra 5% · 6 meses x $62.70 + IVA" },
    annual: { monthly: "$8.75", total: "15% de descuento · 1 año x $118.80 + IVA" }
  },
  pyme: {
    quarterly: { monthly: "$22.00", total: "Total 3 meses: $66.00 + IVA" },
    semiannual: { monthly: "$19.80", total: "Ahorra 5% · 6 meses x $125.40 + IVA" },
    annual: { monthly: "$17.60", total: "15% de descuento · 1 año x $237.60 + IVA" }
  },
  maxima: {
    quarterly: { monthly: "$45.00", total: "Total 3 meses: $135.00 + IVA" },
    semiannual: { monthly: "$40.50", total: "Ahorra 5% · 6 meses x $256.00 + IVA" },
    annual: { monthly: "$36.00", total: "15% de descuento · 1 año x $486.00 + IVA" }
  }
}

export default function Home() {
  const [period, setPeriod]           = useState('quarterly')
  const [expanded, setExpanded]       = useState({})
  const [formStatus, setFormStatus]   = useState('')
  
  const [viewMode, setViewMode]       = useState('landing')
  const [menuOpen, setMenuOpen]       = useState(false)

  const changeView = (view) => {
    setViewMode(view)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  // Animaciones de la píldora nativas
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

  // Carrusel nativo
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

  // Reveal en Scroll
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.14 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [viewMode])

  const toggleExpand = plan => setExpanded(p => ({ ...p, [plan]: !p[plan] }))

  // Manejo de Resend via API
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
      setFormStatus('No pudimos enviar la solicitud. Intenta nuevamente.')
    }
  }

  // Tarjeta de Precios (Fiel a tu diseño y textos)
  const PlanCard = ({ plan, label, desc, featured, badge, setupNote, setupClass = 'setup-note', features }) => {
    const data = PRICING_DATA[plan][period]
    const visible = 5
    const isExpanded = expanded[plan]
    return (
      <article className={`price-card${featured ? ' featured' : ''}`} data-plan={plan}>
        {badge && <span className="badge">{badge}</span>}
        <h3>{label}</h3>
        <p>{desc}</p>
        <div className="price">
          <strong data-price>{data.monthly}</strong><span>/mes</span>
        </div>
        <div className="period-total" data-total>{data.total}</div>
        
        <div className={setupClass} dangerouslySetInnerHTML={{ __html: setupNote }} />
        
        <ul className="feature-list" data-visible-items="5">
          {features.map((f, i) => (
            <li key={i} className={!isExpanded && i >= visible ? 'is-hidden' : ''}>{f}</li>
          ))}
        </ul>
        
        {features.length > visible && (
          <button className="show-more-btn" onClick={() => toggleExpand(plan)}>
            {isExpanded ? 'Ver menos' : 'Ver más'}
          </button>
        )}
        <br />
        <button className={featured ? 'btn-soft' : 'btn-pink'} onClick={() => window.location.href = SIGNUP_URL}>
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
        {/* LIQUID GLASS HEADER */}
        <nav className="nav">
          <div className="nav-inner">
            <button onClick={() => changeView('landing')} className="logo-btn">
              <img src="/logo.png" alt="DTEzen" className="logo-img" />
            </button>
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
            
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
              <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
              <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
            </button>
          </div>
          
          {menuOpen && (
            <div className="mobile-menu">
              <button onClick={() => changeView('landing')} className="mob-link">Facturación DTE</button>
              <button onClick={() => changeView('red-contable')} className="mob-link nav-accent">Red Contable</button>
              <a href={LOGIN_URL} className="btn-dark" style={{textAlign: 'center', display: 'block'}}>Inicia Sesión</a>
            </div>
          )}
        </nav>

        {viewMode === 'landing' && (
          <div className="view-transition">
            
            <header className="hero">
              <div className="hero-content reveal">
                <h1 className="hero-title">
                  <span className="static-text2">Facturación digital</span>
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
                  La forma más simple y moderna de emitir DTEs, operar tu negocio y cumplir con Hacienda.
                </p>
                <div className="hero-actions">
                  <button className="btn-dark" onClick={() => window.location.href = SIGNUP_URL}>Comienza Hoy →</button>
                  <button className="btn-pink" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>Ver planes</button>
                </div>
              </div>
            </header>

            <section className="section">
              <div className="section-header reveal">
                <span className="eyebrow">Más que facturación</span>
                <h2>Administra tu empresa desde un solo lugar</h2>
                <p>DTEzen combina facturación electrónica, inventario, clientes, proveedores, cotizaciones y acceso contable en una experiencia simple y moderna.</p>
              </div>

              <div className="erp-showcase reveal">
                <div className="glow glow-one" />
                <div className="glow glow-two" />

                <div className="carousel-shell">
                  <button className="carousel-arrow left" type="button" onClick={() => window.moveErpCarousel?.(-1)}>‹</button>
                  <div className="erp-carousel" ref={carouselRef}>
                    <div className="erp-track" ref={trackRef}>
                      <article className="erp-card accountant">
                        <div className="erp-icon">📊</div>
                        <h3>Portal Mi Contador</h3>
                        <p>Comparte información fiscal y documentos clave con tu contador.</p>
                      </article>
                      <article className="erp-card">
                        <div className="erp-icon">📦</div>
                        <h3>Inventario</h3>
                        <p>Controla productos, existencias y movimientos sin complicaciones.</p>
                      </article>
                      <article className="erp-card">
                        <div className="erp-icon">👥</div>
                        <h3>Clientes</h3>
                        <p>Centraliza tu cartera de clientes y agiliza cada emisión.</p>
                      </article>
                      <article className="erp-card">
                        <div className="erp-icon">🧑‍💼</div>
                        <h3>Empleados</h3>
                        <p>Administra usuarios, permisos y actividad dentro de tu empresa.</p>
                      </article>
                      <article className="erp-card">
                        <div className="erp-icon">📝</div>
                        <h3>Cotizaciones</h3>
                        <p>Crea propuestas profesionales antes de convertirlas en DTEs.</p>
                      </article>
                      <article className="erp-card">
                        <div className="erp-icon">🚚</div>
                        <h3>Proveedores</h3>
                        <p>Organiza compras, contactos y operaciones clave de tu negocio.</p>
                      </article>
                    </div>
                  </div>
                  <button className="carousel-arrow right" type="button" onClick={() => window.moveErpCarousel?.(1)}>›</button>
                </div>

                <div className="accountant-spotlight">
                  <div>
                    <span className="tag-new">NUEVO</span>
                    <h3>Portal Mi Contador</h3>
                    <p>Dale acceso ordenado a tu contador para consultar DTEs, documentos, ventas, compras y reportes sin pedirte archivos por WhatsApp ni físicos.</p>
                  </div>
                  <div className="mini-dashboard">
                    <div className="mini-top"></div>
                    <div className="mini-row"></div>
                    <div className="mini-row short"></div>
                    <div className="mini-grid">
                      <b>$12,450</b>
                      <b>128 DTEs</b>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: 24, textAlign: 'center', alignSelf: 'center' }}>
                  <button className="show-more-btn2" onClick={() => changeView('red-contable')} style={{ cursor: 'pointer' }}>
                    Conocer la Red Contable →
                  </button>
                </div>
              </div>
            </section>

            <section className="smart-ops-section">
              <div className="smart-ops-header">
                <h2>Todo tu negocio, asistido por tecnología más inteligente</h2>
                <p>DTEzen combina facturación electrónica, operación empresarial y asistencia con IA para ayudarte a trabajar con más orden, velocidad y claridad.</p>
              </div>

              <div className="smart-ops-grid">
                <article className="smart-card smart-card-large">
                  <div className="card-text">
                    <h3>Gestión empresarial completa</h3>
                    <p>Factura, administra clientes, proveedores, empleados e inventario desde una sola plataforma.</p>
                  </div>
                  <div className="visual-container ecosystem-visual">
                    <div className="ecosystem-center">Empresa</div>
                    <div className="eco-node eco-1">Facturación</div>
                    <div className="eco-node eco-2">Clientes</div>
                    <div className="eco-node eco-3">Proveedores</div>
                    <div className="eco-node eco-4">Empleados</div>
                    <div className="eco-node eco-5">Inventario</div>
                    <svg className="eco-lines" viewBox="0 0 200 200">
                      <line x1="100" y1="100" x2="100" y2="35" />
                      <line x1="100" y1="100" x2="40" y2="75" />
                      <line x1="100" y1="100" x2="60" y2="155" />
                      <line x1="100" y1="100" x2="140" y2="155" />
                      <line x1="100" y1="100" x2="160" y2="75" />
                    </svg>
                  </div>
                </article>

                <article className="smart-card ai-card">
                  <div className="card-text">
                    <h3>Procesos impulsados por IA</h3>
                    <p>Optimiza tus flujos operativos de extremo a extremo con el respaldo de nuestro asistente virtual inteligente.</p>
                  </div>
                  <div className="visual-container ai-visual-modern">
                    <div className="ai-glow-orbit">
                      <div className="ai-center-core">
                        <span className="ai-text-brand">IA</span>
                      </div>
                      <span className="sparkle sp-1">✦</span>
                      <span className="sparkle sp-2">✦</span>
                    </div>
                  </div>
                </article>

                <article className="smart-card">
                  <div className="card-text">
                    <h3>DTEs seguros</h3>
                    <p>Emisión digital lista para cumplimiento fiscal y almacenamiento ordenado.</p>
                  </div>
                  <div className="visual-container dte-visual-modern">
                    <div className="invoice-sheet">
                      <div className="sheet-header"></div>
                      <div className="sheet-body">
                        <div className="sheet-line"></div>
                        <div className="sheet-line w-70"></div>
                      </div>
                      <div className="format-json">✓ JSON</div>
                    </div>
                  </div>
                </article>

                <article className="smart-card">
                  <div className="card-text">
                    <h3>Automatización</h3>
                    <p>Reduce pasos manuales en reportes, respaldos y seguimiento operativo.</p>
                  </div>
                  <div className="visual-container workflow-visual">
                    <svg className="wf-svg-container" viewBox="0 0 200 100">
                      <path d="M 40 70 L 100 30 L 160 70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" strokeLinecap="round"/>
                      <path className="worm-path" d="M 40 70 L 100 30 L 160 70" fill="none" stroke="url(#worm-gradient)" strokeWidth="3" strokeLinecap="round"/>
                      <defs>
                        <linearGradient id="worm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ff2f6d" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="wf-node wf-1"><div className="wf-pulse step-1"></div></div>
                    <div className="wf-node wf-2"><div className="wf-pulse step-2"></div></div>
                    <div className="wf-node wf-3"><div className="wf-pulse step-3"></div></div>
                  </div>
                </article>

                <article className="smart-card">
                  <div className="card-text">
                    <h3>Reportes claros</h3>
                    <p>Consulta actividad, ventas y documentos desde vistas limpias y accionables.</p>
                  </div>
                  <div className="visual-container chart-visual-modern">
                    <div className="chart-bars">
                      <div className="bar" style={{ "--h": "40%", "--c": "#4f46e5" }}></div>
                      <div className="bar" style={{ "--h": "85%", "--c": "#ff2f6d" }}></div>
                      <div className="bar" style={{ "--h": "60%", "--c": "#2563eb" }}></div>
                    </div>
                  </div>
                </article>

                <article className="smart-card">
                  <div className="card-text">
                    <h3>Acceso contable</h3>
                    <p>Tu contador puede consultar todo sin pedirte capturas o carpetas sueltas.</p>
                  </div>
                  <div className="visual-container sync-visual-modern">
                    <div className="mockup-panel">
                      <div className="mockup-row"><span className="m-dot m-green"></span><div className="m-line long"></div></div>
                      <div className="mockup-row"><span className="m-dot m-blue"></span><div className="m-line mid"></div></div>
                      <div className="mockup-row"><span className="m-dot m-pink"></span><div className="m-line short"></div></div>
                    </div>
                    <div className="sync-arrows-container">
                      <span className="arrow-icon to-right">→</span>
                      <span className="arrow-icon to-left">←</span>
                    </div>
                    <div className="mockup-panel">
                      <div className="mockup-row"><span className="m-dot m-green"></span><div className="m-line long"></div></div>
                      <div className="mockup-row"><span className="m-dot m-blue"></span><div className="m-line mid"></div></div>
                      <div className="mockup-row"><span className="m-dot m-pink"></span><div className="m-line short"></div></div>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <section className="country-section">
              <div className="country-inner reveal">
                <h2>Tu solución moderna de facturación electrónica en <span>El Salvador 🇸🇻</span></h2>
                <p>Diseñada para pequeñas, medianas y grandes empresas que quieren cumplir con Hacienda sin complicarse.</p>

                <div className="doc-orbit">
                  <div className="doc-card"></div>
                  <div className="doc-card"></div>
                  <div className="doc-card"></div>
                </div>
              </div>
            </section>

            <section className="section pricing" id="pricing">
              <div className="section-header reveal">
                <span className="eyebrow">Planes</span>
                <h2>Planes que crecen con tu negocio</h2>
                <p>Precios transparentes para iniciar con orden y escalar cuando lo necesites.</p>
              </div>

              <div className="billing-toggle">
                {[['quarterly','Trimestral',null],['semiannual','Semestral','5% Ahorro'],['annual','Anual','Mejor Valor ✨']].map(([p,label,badge]) => (
                  <button key={p} className={`billing-option ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>
                    {label} {badge && <span>{badge}</span>}
                  </button>
                ))}
              </div>

              <div className="pricing-grid reveal">
                <PlanCard
                  plan="essential" label="Esencial Zen" desc="Ideal para emprendedores"
                  setupNote="Implementación y activación: $145 + IVA<br><span>Único pago de configuración inicial</span>"
                  features={['Hasta 2 usuarios','160 DTEs al mes ($0.10 por DTE adicional)','Trámite y gestión de certificado y pruebas requeridas (para nuevos emisores)','Control de inventario, clientes, empleados y proveedores.','Anulación de DTEs','Almacenamiento seguro en AWS hasta x 10 años o más','Sistema de contingencia automático','Logo personalizado en tus DTEs','Correo automático con (PDF Y JSON) a tus clientes','Gestión de sucursales']}
                />
                <PlanCard
                  plan="pyme" label="PYME Zen" desc="Perfecto para pymes en expansión" featured badge="Más popular"
                  setupNote="Implementación y activación: $89 + IVA<br><span>Único pago de configuración inicial</span>"
                  features={['Hasta 6 usuarios','400 DTEs al mes ($0.08 por DTE adicional)','Trámite y gestión de certificado y pruebas requeridas (para nuevos emisores)','Control de inventario, clientes, empleados y proveedores.','Anulación de DTEs','Almacenamiento seguro en AWS hasta x 10 años o más','Sistema de contingencia automático','Logo personalizado en tus DTEs','Correo automático con (PDF Y JSON) a tus clientes','Gestión de sucursales','Sistema de alertas de inventario','Reporte de ventas','Portal "MI CONTADOR"','Sistema de control de actividad de empleados']}
                />
                <PlanCard
                  plan="maxima" label="Máxima Zen" desc="Para empresas más consolidadas y de alto flujo"
                  setupNote="Implementación prioritaria incluida<br><span>Sin pago adicional de activación</span>" setupClass="setup-note-max"
                  features={['Usuarios ilimitados','DTEs ilimitados','Trámite y gestión de certificado y pruebas requeridas (para nuevos emisores)','Control de inventario, clientes, empleados y proveedores.','Anulación de DTEs','Almacenamiento seguro en AWS hasta x 10 años o más','Sistema de contingencia automático','Logo personalizado en tus DTEs','Correo automático con (PDF Y JSON) a tus clientes','Gestión de sucursales','Sistema de alertas de inventario','Reporte de ventas','Portal "MI CONTADOR"','Sistema de control de actividad de empleados','Sistema de Creación y Envío de Cotizaciones','Procesos Mejorados con Inteligencia Artificial','Asistencia personalizada']}
                />
              </div>
            </section>
          </div>
        )}

        {/* ── VISTA SIMULADA: RED CONTABLE ── */}
        {viewMode === 'red-contable' && (
          <div className="view-transition" style={{ minHeight: '80vh', padding: '120px 24px 60px' }}>
             <div className="section-header reveal">
                <span className="eyebrow">Red Contable DTEzen</span>
                <h2 style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}>Sincronización total con tu Contador</h2>
                <p>Una infraestructura digital que automatiza la relación fiscal entre tu negocio y el despacho. Adiós correos sueltos y mensajes de WhatsApp a fin de mes.</p>
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                  <button className="btn-dark" onClick={() => changeView('landing')}>← Volver a Facturación</button>
                </div>
              </div>
          </div>
        )}

        {/* ── FOOTER Y CONTACTO (GLOBAL) ── */}
        <section className="contact-section" id="contacto">
          <div className="contact-wrap">
            <div className="contact-copy reveal">
              <h2>¿Listo para empezar?</h2>
              <p>Escríbenos y te ayudamos a configurar tu empresa para emitir DTEs desde el primer día.</p>
            </div>
            <div className="contact-form reveal">
              <form className="form-grid" id="contactForm" onSubmit={handleContact}>
                <div className="field">
                  <label htmlFor="contact-name">Nombre</label>
                  <input id="contact-name" name="name" type="text" required />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Correo electrónico</label>
                  <input id="contact-email" name="email" type="email" required />
                </div>
                <div className="field">
                  <label htmlFor="contact-msg">Mensaje</label>
                  <textarea id="contact-msg" name="message" required />
                </div>
                <button type="submit" className="btn-dark" style={{ width: '100%' }}>
                  Enviar mensaje →
                </button>
                {formStatus && <p className="form-status" id="formStatus">{formStatus}</p>}
              </form>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-inner">
            <div>
              <img src="/logo.png" alt="DTEzen" style={{ height: '32px', filter: 'brightness(0) invert(1)', marginBottom: 12 }} />
              <p className="footer-copy">© 2026 DTEzen. Todos los derechos reservados.</p>
            </div>
            <div className="footer-col">
              <h4>Pagos procesados con</h4>
              <span className="footer-wompi"><strong>Wompi</strong></span>
            </div>
            <div className="footer-col">
              <h4>Contacto</h4>
              <a href="mailto:contacto@dtezen.com">contacto@dtezen.com</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="/terminos">Términos y Condiciones</a>
              <a href="/privacidad">Política de privacidad</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
