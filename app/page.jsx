'use client'
import { useEffect, useRef, useState } from 'react'

const SIGNUP_URL  = 'https://app.dtezen.com/registro?view=signup'
const LOGIN_URL   = 'https://app.dtezen.com/registro?view=login'
const CONTACT_URL = 'https://app.dtezen.com/api/1.1/wf/contacto-dtezen'

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

  // Animated word / pill color sync
  useEffect(() => {
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
  }, [])

  // Packet animation for Red Contable
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

  // Carousel infinite scroll
  const carouselRef = useRef(null)
  const trackRef    = useRef(null)
  useEffect(() => {
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
    setTimeout(() => { c.scrollLeft = seg(); requestAnimationFrame(scroll) }, 120)
    c.addEventListener('mouseenter', () => hovering = true)
    c.addEventListener('mouseleave', () => { hovering = false; dragging = false; c.classList.remove('dragging') })
    c.addEventListener('mousedown', e => { dragging = true; c.classList.add('dragging'); startX = e.pageX; startScroll = c.scrollLeft })
    window.addEventListener('mouseup', () => { dragging = false; c.classList.remove('dragging') })
    window.addEventListener('mousemove', e => { if (!dragging) return; e.preventDefault(); c.scrollLeft = startScroll - (e.pageX - startX) * 1.3; norm() })
    c.addEventListener('touchstart', e => { dragging = true; startX = e.touches[0].pageX; startScroll = c.scrollLeft }, { passive: true })
    c.addEventListener('touchend', () => (dragging = false))
    c.addEventListener('touchmove', e => { if (!dragging) return; c.scrollLeft = startScroll - (e.touches[0].pageX - startX) * 1.2; norm() }, { passive: true })
    window.moveErpCarousel = dir => {
      dragging = true; c.scrollBy({ left: dir * 340, behavior: 'smooth' })
      setTimeout(() => { norm(); dragging = false }, 700)
    }
  }, [])

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.12 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const toggleExpand = plan => setExpanded(p => ({ ...p, [plan]: !p[plan] }))

  const handleContact = async e => {
    e.preventDefault()
    const f = e.target
    setFormStatus('Enviando...')
    try {
      const r = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: f.email?.value, name: f.name?.value, message: f.message?.value, source: 'landing_dtezen' }),
      })
      if (!r.ok) throw new Error()
      setFormStatus('¡Mensaje enviado! Te contactamos pronto.')
      f.reset()
    } catch {
      setFormStatus('No pudimos enviar. Intenta de nuevo.')
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
        <nav className="nav" aria-label="Navegación principal">
          <div className="nav-inner">
            <a href="/" className="logo" aria-label="DTEzen inicio">
              <span className="logo-dte"><strong>DTE</strong></span>
              <span className="logo-zen">zen</span>
            </a>
            <div className="nav-links">
              <a href="#red-contable" className="nav-accent">Red Contable</a>
              <a href="#pricing">Comienza Hoy</a>
              <a href="#contacto">Contacto</a>
            </div>
            <a href={LOGIN_URL} className="btn-dark">Inicia Sesión</a>
          </div>
        </nav>

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
              <button className="show-more-btn2" onClick={() => document.getElementById('red-contable')?.scrollIntoView({ behavior: 'smooth' })}>
                Conocer más →
              </button>
            </div>
          </div>
        </section>

        <section className="smart-ops-section" aria-labelledby="smartops-heading">
          <div className="smart-ops-header">
            <span className="badge-pill">Plataforma inteligente</span>
            <h2 id="smartops-heading">Todo tu negocio, asistido por tecnología más inteligente</h2>
            <p>DTEzen combina facturación electrónica, operación empresarial y asistencia con IA para ayudarte a trabajar con más orden, velocidad y claridad.</p>
          </div>
          <div className="smart-ops-grid">
            <article className="smart-card smart-card-large">
              <div className="card-text">
                <h3>Gestión empresarial completa</h3>
                <p>Factura, administra clientes, proveedores, empleados e inventario desde una sola plataforma.</p>
              </div>
              <div className="visual-container ecosystem-visual" aria-hidden="true">
                <div className="ecosystem-center">Empresa</div>
                <div className="eco-node eco-1">Facturación</div>
                <div className="eco-node eco-2">Clientes</div>
                <div className="eco-node eco-3">Proveedores</div>
                <div className="eco-node eco-4">Empleados</div>
                <div className="eco-node eco-5">Inventario</div>
                <svg className="eco-lines" viewBox="0 0 200 200" aria-hidden="true">
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
              <div className="visual-container ai-visual-modern" aria-hidden="true">
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
              <div className="visual-container" aria-hidden="true">
                <div className="invoice-sheet">
                  <div className="sheet-header" />
                  <div className="sheet-line" />
                  <div className="sheet-line w-70" />
                  <div className="format-json">✓ JSON</div>
                </div>
              </div>
            </article>
            <article className="smart-card">
              <div className="card-text">
                <h3>Automatización</h3>
                <p>Reduce pasos manuales en reportes, respaldos y seguimiento operativo.</p>
              </div>
              <div className="visual-container workflow-visual" aria-hidden="true">
                <svg className="wf-svg-container" viewBox="0 0 200 100">
                  <path d="M 40 70 L 100 30 L 160 70" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="3" strokeLinecap="round" />
                  <path className="worm-path" d="M 40 70 L 100 30 L 160 70" fill="none" stroke="url(#worm-gradient)" strokeWidth="3" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="worm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ff2f6d" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="wf-node wf-1"><div className="wf-pulse step-1" /></div>
                <div className="wf-node wf-2"><div className="wf-pulse step-2" /></div>
                <div className="wf-node wf-3"><div className="wf-pulse step-3" /></div>
              </div>
            </article>
            <article className="smart-card">
              <div className="card-text">
                <h3>Reportes claros</h3>
                <p>Consulta actividad, ventas y documentos desde vistas limpias y accionables.</p>
              </div>
              <div className="visual-container" aria-hidden="true">
                <div className="chart-bars">
                  {[['40%','#4f46e5'],['85%','#ff2f6d'],['60%','#2563eb'],['70%','#10b981'],['50%','#8b5cf6']].map(([h,c],i) => (
                    <div key={i} className="bar" style={{ '--h': h, '--c': c }} />
                  ))}
                </div>
              </div>
            </article>
            <article className="smart-card">
              <div className="card-text">
                <h3>Acceso contable</h3>
                <p>Tu contador puede consultar todo sin pedirte capturas o carpetas sueltas.</p>
              </div>
              <div className="visual-container sync-visual-modern" aria-hidden="true">
                <div className="mockup-panel">
                  <div className="mockup-row"><span className="m-dot m-green"/><div className="m-line long"/></div>
                  <div className="mockup-row"><span className="m-dot m-blue"/><div className="m-line mid"/></div>
                  <div className="mockup-row"><span className="m-dot m-pink"/><div className="m-line short-line"/></div>
                </div>
                <div className="sync-arrows-container">
                  <span className="arrow-icon to-right">→</span>
                  <span className="arrow-icon to-left">←</span>
                </div>
                <div className="mockup-panel">
                  <div className="mockup-row"><span className="m-dot m-green"/><div className="m-line long"/></div>
                  <div className="mockup-row"><span className="m-dot m-blue"/><div className="m-line mid"/></div>
                  <div className="mockup-row"><span className="m-dot m-pink"/><div className="m-line short-line"/></div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="country-section" aria-labelledby="country-heading">
          <div className="country-inner reveal">
            <h2 id="country-heading">Tu solución moderna de facturación electrónica en <span>El Salvador 🇸🇻</span></h2>
            <p>Diseñada para pequeñas, medianas y grandes empresas que quieren cumplir con Hacienda sin complicarse.</p>
            <div className="doc-orbit" aria-hidden="true">
              <div className="doc-card" />
              <div className="doc-card" />
              <div className="doc-card" />
            </div>
          </div>
        </section>

        <section className="red-contable-section" id="red-contable" aria-labelledby="rc-heading">
          <div className="rc-header reveal">
            <span className="rc-eyebrow">Red Contable DTEzen</span>
            <h2 id="rc-heading">Sincronización total entre empresas y despachos contables</h2>
            <p>Una infraestructura digital que automatiza la relación fiscal entre tus clientes y tu despacho. Disponible en planes PYME y Máxima.</p>
          </div>
          <div className="rc-grid reveal">
            <div className="rc-text">
              <span className="rc-plan-tag">Módulo exclusivo</span>
              <h3>Opera con claridad. Incentiva el cumplimiento.</h3>
              <p>DTEzen transforma la relación entre contadores y empresas. Al activar la Red Contable, creas un ecosistema interconectado donde la información fluye sin fricciones.</p>
              <div className="rc-bullets">
                <div className="rc-bullet">
                  <div className="rc-bullet-icon blue">🔗</div>
                  <div className="rc-bullet-text">
                    <strong>Código único de aliado</strong>
                    <span>Cada empresa registrada con tu código queda enlazada automáticamente a tu panel de control.</span>
                  </div>
                </div>
                <div className="rc-bullet">
                  <div className="rc-bullet-icon pink">📄</div>
                  <div className="rc-bullet-text">
                    <strong>Cumplimiento fiscal automatizado</strong>
                    <span>Tu contador accede directamente a DTEs emitidos, archivos JSON de Hacienda y reportes mensuales, sin pedirte nada.</span>
                  </div>
                </div>
                <div className="rc-bullet">
                  <div className="rc-bullet-icon green">🌿</div>
                  <div className="rc-bullet-text">
                    <strong>100% digital, cero papel</strong>
                    <span>Toda la información fiscal disponible en línea al instante. Sin impresiones, sin entregas físicas.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="rc-visual">
              <div className="code-card">
                <div className="code-card-top">
                  <div className="code-dots"><span/><span/><span/></div>
                  <span className="code-title-bar">Red Contable DTEzen — Activación</span>
                </div>
                <div className="code-body">
                  <span className="code-badge">RED CONTABLE ACTIVA</span>
                  <div className="code-value-box">
                    <span className="code-value-label">Tu código de aliado</span>
                    <div className="code-value">DTEZEN-AL026</div>
                  </div>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, marginBottom: 20 }}>
                    Comparte este código con tus clientes durante su activación para vincularlos automáticamente a tu despacho.
                  </p>
                  <div className="code-divider" />
                  <div className="code-meta">
                    <div className="code-meta-item">
                      <span className="cm-label">Clientes activos</span>
                      <span className="cm-value green">10</span>
                    </div>
                    <div className="code-meta-item">
                      <span className="cm-label">Estado</span>
                      <span className="cm-value blue">Sincronizado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rc-animation-section" aria-labelledby="rc-anim-heading">
          <div className="rc-header">
            <span className="rc-eyebrow">Flujo en tiempo real</span>
            <h2 id="rc-anim-heading">La anatomía de la automatización</h2>
            <p>Mira cómo viajan los datos tributarios y se procesan los balances en automático, de empresa a contador.</p>
          </div>
          <div className="anim-workspace reveal">
            <div className="anim-panel">
              <div className="anim-panel-header">
                <div className="anim-dot blue" />
                <span className="anim-panel-title">Dashboard Empresa</span>
              </div>
              <div className="anim-metric">
                <span className="anim-metric-label">Emisión mensual</span>
                <span className="anim-metric-value">128 DTEs</span>
              </div>
              <div className="anim-bars">
                <div className="anim-bar-row"><div className="anim-bar-fill" style={{ width: '80%' }} /></div>
                <div className="anim-bar-row"><div className="anim-bar-fill" style={{ width: '60%' }} /></div>
              </div>
              <div className="anim-file">
                <span id="active-file-label">{fileLabel}</span>
                <span className="anim-file-ok">✓ Enviado</span>
              </div>
            </div>
            <div className="anim-pipeline" aria-hidden="true">
              <span className="pipeline-label">Transmitiendo</span>
              <div className="pipeline-line">
                <div className="pipeline-worm" />
              </div>
              <div className="packet-badge" style={{ background: packetFmt.bg }}>{packetFmt.text}</div>
              <div className="pipeline-line">
                <div className="pipeline-worm" style={{ animationDelay: '1s' }} />
              </div>
              <span className="pipeline-label">Seguro</span>
            </div>
            <div className="anim-panel">
              <div className="anim-panel-header">
                <div className="anim-dot green" />
                <span className="anim-panel-title">Portal Red Contable</span>
              </div>
              <div className="anim-client-row">
                <div className="anim-avatar">👥</div>
                <div>
                  <div className="anim-client-name">Cliente vinculado</div>
                  <div className="anim-client-status">Enlace activo · Código usado</div>
                </div>
              </div>
              <div className="anim-payout">
                <span className="ap-label">Clientes aliados</span>
                <span className="ap-value">10</span>
                <span className="ap-badge">Sincronizado</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section pricing" id="pricing" aria-labelledby="pricing-heading">
          <div className="section-header reveal">
            <span className="eyebrow">Planes</span>
            <h2 id="pricing-heading">Planes que crecen con tu negocio</h2>
            <p>Precios transparentes para iniciar con orden y escalar cuando lo necesites.</p>
          </div>
          <div className="billing-toggle" role="group" aria-label="Período de facturación">
            {[['quarterly','Trimestral',null],['semiannual','Semestral','5% Ahorro'],['annual','Anual','Mejor Valor ✨']].map(([p,label,badge]) => (
              <button key={p} className={`billing-option${period === p ? ' active' : ''}`} onClick={() => setPeriod(p)}>
                {label}{badge && <span>{badge}</span>}
              </button>
            ))}
          </div>
          <div className="pricing-grid reveal">
            <PlanCard
              plan="essential" label="Esencial Zen" desc="Ideal para emprendedores"
              setupNote="Implementación y activación: $145 + IVA<span>Único pago de configuración inicial</span>"
              features={['Hasta 2 usuarios','160 DTEs al mes ($0.10 por DTE adicional)','Trámite y gestión de certificado y pruebas requeridas','Control de inventario, clientes, empleados y proveedores','Anulación de DTEs','Almacenamiento seguro en AWS por 10+ años','Sistema de contingencia automático','Logo personalizado en tus DTEs','Correo automático con PDF y JSON a tus clientes','Gestión de sucursales']}
            />
            <PlanCard
              plan="pyme" label="PYME Zen" desc="Perfecto para pymes en expansión"
              featured badge="Más popular"
              setupNote="Implementación y activación: $89 + IVA<span>Único pago de configuración inicial</span>"
              features={['Hasta 6 usuarios','400 DTEs al mes ($0.08 por DTE adicional)','Trámite y gestión de certificado y pruebas requeridas','Control de inventario, clientes, empleados y proveedores','Anulación de DTEs','Almacenamiento seguro en AWS por 10+ años','Sistema de contingencia automático','Logo personalizado en tus DTEs','Correo automático con PDF y JSON a tus clientes','Gestión de sucursales','Sistema de alertas de inventario','Reporte de ventas','Portal "Mi Contador"','Sistema de control de actividad de empleados']}
            />
            <PlanCard
              plan="maxima" label="Máxima Zen" desc="Para empresas consolidadas y de alto flujo"
              setupNote="Implementación prioritaria incluida<span>Sin pago adicional de activación</span>"
              setupClass="setup-note-max"
              features={['Usuarios ilimitados','DTEs ilimitados','Trámite y gestión de certificado y pruebas requeridas','Control de inventario, clientes, empleados y proveedores','Anulación de DTEs','Almacenamiento seguro en AWS por 10+ años','Sistema de contingencia automático','Logo personalizado en tus DTEs','Correo automático con PDF y JSON a tus clientes','Gestión de sucursales','Sistema de alertas de inventario','Reporte de ventas','Portal "Mi Contador"','Sistema de control de actividad de empleados','Sistema de creación y envío de cotizaciones','Procesos mejorados con Inteligencia Artificial','Asistencia personalizada']}
            />
          </div>
        </section>

        <section className="contact-section" id="contacto" aria-labelledby="contact-heading">
          <div className="contact-wrap">
            <div className="contact-copy reveal">
              <h2 id="contact-heading">¿Listo para empezar?</h2>
              <p>Escríbenos y te ayudamos a configurar tu empresa para emitir DTEs desde el primer día.</p>
            </div>
            <div className="contact-form reveal">
              <form className="form-grid" id="contactForm" onSubmit={handleContact}>
                <div className="field">
                  <label htmlFor="contact-name">Nombre</label>
                  <input id="contact-name" name="name" type="text" placeholder="Tu nombre" required />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Correo electrónico</label>
                  <input id="contact-email" name="email" type="email" placeholder="tu@empresa.com" required />
                </div>
                <div className="field">
                  <label htmlFor="contact-msg">Mensaje</label>
                  <textarea id="contact-msg" name="message" placeholder="¿En qué podemos ayudarte?" required />
                </div>
                <button type="submit" className="btn-dark" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
                  Enviar mensaje →
                </button>
                {formStatus && <p className="form-status" role="status">{formStatus}</p>}
              </form>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-inner">
            <div>
              <a href="/" className="footer-logo"><strong>DTE</strong><span className="zen">zen</span></a>
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
          <div className="footer-divider" />
          <div className="footer-bottom">
            Software de facturación electrónica DTE para El Salvador · Ministerio de Hacienda homologado
          </div>
        </footer>

      </div>
    </>
  )
}
