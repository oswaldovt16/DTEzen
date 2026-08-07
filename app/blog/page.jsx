import Link from 'next/link'

export const metadata = {
  title: 'Blog — Facturación Electrónica en El Salvador | DTEzen',
  description: 'Guías, tutoriales y todo lo que necesitas saber sobre facturación electrónica DTE en El Salvador. Aprende a cumplir con el Ministerio de Hacienda.',
  alternates: { canonical: 'https://www.dtezen.com/blog' },
  openGraph: {
    title: 'Blog DTEzen — Todo sobre Facturación Electrónica en El Salvador',
    description: 'Guías y tutoriales sobre DTE, Ministerio de Hacienda y facturación electrónica para empresas salvadoreñas.',
    url: 'https://www.dtezen.com/blog',
  },
}

const posts = [
  {
    slug: 'que-es-dte-el-salvador',
    title: '¿Qué es un DTE en El Salvador? Guía completa 2026',
    excerpt: 'Todo lo que necesitas saber sobre los Documentos Tributarios Electrónicos: qué son, para qué sirven, y por qué tu empresa debe emitirlos desde ya.',
    category: 'Fundamentos',
    categoryColor: '#2563eb',
    readTime: '6 min',
    date: '2026-07-15',
  },
  {
    slug: 'como-emitir-dte-el-salvador',
    title: 'Cómo emitir un DTE en El Salvador paso a paso',
    excerpt: 'Guía práctica para emitir tu primera factura electrónica en El Salvador. Desde el certificado digital hasta el envío al Ministerio de Hacienda.',
    category: 'Tutorial',
    categoryColor: '#10b981',
    readTime: '8 min',
    date: '2026-07-22',
  },
  {
    slug: 'facturacion-electronica-ministerio-hacienda',
    title: 'Facturación electrónica y el Ministerio de Hacienda en El Salvador',
    excerpt: 'Todo sobre la obligatoriedad de la facturación electrónica en El Salvador, plazos, sanciones y cómo cumplir sin complicaciones.',
    category: 'Regulación',
    categoryColor: '#ff2f6d',
    readTime: '7 min',
    date: '2026-07-29',
  },
]

export default function BlogIndex() {
  return (
    <>
      <div className="blog-aura" aria-hidden="true">
        <div className="blog-aura-blob b1" />
        <div className="blog-aura-blob b2" />
      </div>

      <nav className="nav" aria-label="Navegación">
        <div className="nav-inner">
          <a href="/">
  <img src="/logo.png" alt="DTEzen" className="logo-img" />
</a>
          <div className="nav-links">
            <a href="/#red-contable" style={{ color: '#ff2f6d', fontWeight: 700, textDecoration: 'none', padding: '8px 14px', fontSize: 14 }}>Red Contable</a>
            <a href="/#pricing" style={{ color: '#71717a', fontWeight: 700, textDecoration: 'none', padding: '8px 14px', fontSize: 14 }}>Planes</a>
            <a href="/blog" style={{ color: '#20202a', fontWeight: 700, textDecoration: 'none', padding: '8px 14px', fontSize: 14 }}>Blog</a>
          </div>
          <a href="https://app.dtezen.com/registro?view=signup" className="btn-dark">Comienza Hoy</a>
        </div>
      </nav>

      <main style={{ paddingTop: 110, minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px 120px' }}>

          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <span className="eyebrow">Recursos</span>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 800, letterSpacing: '-3px', lineHeight: 1.05, margin: '16px 0 20px' }}>
              Todo sobre facturación<br />
              <span style={{ background: 'linear-gradient(135deg, #2563eb, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                electrónica en El Salvador
              </span>
            </h1>
            <p style={{ color: '#71717a', fontSize: 18, lineHeight: 1.6, maxWidth: 560, margin: '0 auto' }}>
              Guías prácticas para que tu empresa cumpla con Hacienda sin estrés.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 24 }}>
            {posts.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-post-card">
                <article>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <span style={{ background: `${post.categoryColor}15`, color: post.categoryColor, border: `1px solid ${post.categoryColor}30`, padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                      {post.category}
                    </span>
                    <span style={{ color: '#a1a1aa', fontSize: 13, fontWeight: 600 }}>{post.readTime} lectura</span>
                    <span style={{ color: '#a1a1aa', fontSize: 13 }}>·</span>
                    <time style={{ color: '#a1a1aa', fontSize: 13, fontWeight: 600 }} dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('es-SV', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                  </div>
                  <h2 style={{ margin: '0 0 12px', fontSize: i === 0 ? 30 : 22, fontWeight: 800, letterSpacing: '-0.8px', color: '#20202a', lineHeight: 1.2 }}>
                    {post.title}
                  </h2>
                  <p style={{ margin: 0, color: '#71717a', fontSize: 16, lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>
                </article>
                <div style={{ color: '#2563eb', fontSize: 24, fontWeight: 700, flexShrink: 0 }}>→</div>
              </Link>
            ))}
          </div>

          <div style={{
            marginTop: 72,
            background: '#18181b',
            borderRadius: 32,
            padding: '52px 48px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: -80, background: 'radial-gradient(circle at 30% 30%, rgba(255,47,109,.3), transparent 28%), radial-gradient(circle at 70% 70%, rgba(37,99,235,.25), transparent 28%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ color: 'white', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', margin: '0 0 16px' }}>
                ¿Listo para emitir DTEs sin estrés?
              </h2>
              <p style={{ color: 'rgba(255,255,255,.7)', fontSize: 18, margin: '0 0 32px', lineHeight: 1.5 }}>
                Empieza hoy. Configuración en minutos, soporte incluido.
              </p>
              <a href="https://www.dtezen.com/version-test/registro?view=signup" className="btn-dark" style={{ background: '#ff2f6d', display: 'inline-flex', fontSize: 16, padding: '16px 36px' }}>
                Comenzar hoy →
              </a>
            </div>
          </div>

        </div>
      </main>

      <style>{`
        .blog-aura { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: #f0f0f5; overflow: hidden; }
        .blog-aura-blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: .5; }
        .b1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(174,147,255,.6), transparent); top: -10%; left: -5%; animation: bf1 18s ease-in-out infinite; }
        .b2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(118,226,246,.5), transparent); bottom: 10%; right: -5%; animation: bf1 22s ease-in-out infinite reverse; }
        @keyframes bf1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-40px)} }

        .blog-post-card {
          text-decoration: none;
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(228,228,231,0.9);
          border-radius: 28px;
          padding: 36px 40px;
          backdrop-filter: blur(18px);
          box-shadow: 0 8px 40px rgba(20,20,20,0.06);
          display: flex;
          gap: 20px;
          align-items: center;
          transition: transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s;
        }
        .blog-post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(20,20,20,0.1);
        }
        .blog-post-card article { flex: 1; }
      `}</style>
    </>
  )
}
