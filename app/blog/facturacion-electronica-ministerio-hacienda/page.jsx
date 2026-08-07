import BlogPost from '../../../components/BlogPost'

export const metadata = {
  title: 'Facturación Electrónica y el Ministerio de Hacienda en El Salvador (2026) | DTEzen',
  description: 'Todo sobre la obligatoriedad de la facturación electrónica en El Salvador según el Ministerio de Hacienda. Plazos, sanciones, requisitos técnicos y cómo cumplir sin complicaciones en 2026.',
  keywords: [
    'facturación electrónica Ministerio de Hacienda El Salvador',
    'obligatoriedad factura electrónica El Salvador',
    'sistema facturación electrónica El Salvador',
    'DTE Ministerio de Hacienda',
    'sanciones facturación electrónica El Salvador',
    'ley facturación electrónica El Salvador 2026',
  ],
  alternates: { canonical: 'https://www.dtezen.com/blog/facturacion-electronica-ministerio-hacienda' },
  openGraph: {
    title: 'Facturación Electrónica y el Ministerio de Hacienda en El Salvador (2026)',
    description: 'Todo sobre la obligatoriedad, plazos y sanciones de la facturación electrónica en El Salvador.',
    url: 'https://www.dtezen.com/blog/facturacion-electronica-ministerio-hacienda',
    type: 'article',
  },
}

const meta = {
  title: 'Facturación Electrónica y el Ministerio de Hacienda en El Salvador (2026)',
  excerpt: 'Todo sobre la obligatoriedad de la facturación electrónica en El Salvador: qué exige Hacienda, plazos, sanciones por incumplimiento y la forma más simple de cumplir desde hoy.',
  category: 'Regulación',
  categoryColor: '#ff2f6d',
  readTime: '7 min',
  date: '2026-07-29',
  toc: [
    { id: 'contexto', title: '¿Por qué Hacienda lo exige?' },
    { id: 'obligatoriedad', title: 'Quiénes están obligados' },
    { id: 'requisitos', title: 'Requisitos técnicos' },
    { id: 'sanciones', title: 'Sanciones por incumplimiento' },
    { id: 'contingencia', title: 'Sistema de contingencia' },
    { id: 'cumplir', title: 'Cómo cumplir hoy' },
  ],
}

export default function Page() {
  return (
    <BlogPost meta={meta}>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": meta.title,
            "description": meta.excerpt,
            "datePublished": meta.date,
            "dateModified": "2026-07-29",
            "author": { "@type": "Organization", "name": "DTEzen" },
            "publisher": { "@type": "Organization", "name": "DTEzen", "url": "https://www.dtezen.com" },
            "mainEntityOfPage": "https://www.dtezen.com/blog/facturacion-electronica-ministerio-hacienda",
            "about": {
              "@type": "Thing",
              "name": "Facturación electrónica El Salvador",
              "description": "Sistema de Documentos Tributarios Electrónicos del Ministerio de Hacienda de El Salvador",
            },
          }),
        }}
      />

      <p>
        La <strong>facturación electrónica en El Salvador</strong> dejó de ser optativa. El Ministerio de Hacienda implementó el sistema de <strong>Documentos Tributarios Electrónicos (DTEs)</strong> como obligatorio para todos los contribuyentes, y el incumplimiento tiene consecuencias reales para tu empresa.
      </p>
      <p>
        En este artículo te explicamos exactamente qué exige la ley, quiénes están obligados, qué pasa si no cumples, y cuál es la forma más práctica de ponerte al día hoy mismo.
      </p>

      <h2 id="contexto">¿Por qué el Ministerio de Hacienda exige la facturación electrónica?</h2>
      <p>
        El sistema de facturación electrónica en El Salvador tiene tres objetivos principales desde la perspectiva del Ministerio de Hacienda:
      </p>
      <ul>
        <li><strong>Combatir la evasión fiscal</strong> — Al registrar cada transacción en tiempo real, se elimina la posibilidad de facturar en negro o no declarar ventas.</li>
        <li><strong>Modernizar la administración tributaria</strong> — Hacienda puede cruzar información entre emisores y receptores automáticamente, detectando inconsistencias.</li>
        <li><strong>Reducir la carga administrativa</strong> — Tanto para el Estado como para las empresas, el proceso digital es más eficiente que el papel.</li>
      </ul>

      <div className="info-box">
        <p><strong>Contexto regional:</strong> El Salvador sigue la tendencia de países como México, Chile, Brasil y Colombia, donde la facturación electrónica obligatoria ya lleva años implementada y ha demostrado aumentar significativamente la recaudación fiscal sin elevar la carga impositiva.</p>
      </div>

      <h2 id="obligatoriedad">¿Quiénes están obligados a emitir DTEs?</h2>
      <p>
        Desde mayo de 2025, la obligatoriedad aplica a <strong>todos los contribuyentes del IVA en El Salvador</strong>, independientemente del tamaño o giro de su empresa. Esto incluye:
      </p>

      <table className="comparison-table">
        <thead>
          <tr>
            <th>Tipo de contribuyente</th>
            <th>¿Está obligado?</th>
            <th>Desde cuándo</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Grandes empresas</td><td>✓ Sí</td><td>Fase inicial (2023)</td></tr>
          <tr><td>Medianas empresas</td><td>✓ Sí</td><td>Fase 2 (2024)</td></tr>
          <tr><td>Pequeñas empresas</td><td>✓ Sí</td><td>Mayo 2025</td></tr>
          <tr><td>Microempresas y emprendedores</td><td>✓ Sí</td><td>Mayo 2025</td></tr>
          <tr><td>Personas naturales con actividad económica</td><td>✓ Sí</td><td>Mayo 2025</td></tr>
          <tr><td>Contribuyentes del régimen de exclusión</td><td>Parcial</td><td>Según resolución</td></tr>
        </tbody>
      </table>

      <div className="warning-box">
        <p><strong>⚠️ Si todavía estás emitiendo facturas en papel</strong>, ya estás fuera de cumplimiento. La factura física ya no tiene validez tributaria para los contribuyentes obligados a emitir DTEs.</p>
      </div>

      <h2 id="requisitos">Requisitos técnicos exigidos por el Ministerio de Hacienda</h2>
      <p>Para poder emitir DTEs, el Ministerio de Hacienda exige que tu sistema cumpla con estas especificaciones técnicas:</p>
      <ul>
        <li><strong>Formato JSON estructurado</strong> — Los DTEs deben generarse en el esquema JSON oficial definido por Hacienda, con todos los campos requeridos según el tipo de documento.</li>
        <li><strong>Firma electrónica válida</strong> — Cada DTE debe estar firmado con un certificado digital emitido por una entidad certificadora autorizada en El Salvador.</li>
        <li><strong>Transmisión en tiempo real</strong> — El sistema debe enviar cada DTE al API del Ministerio de Hacienda en el momento de la emisión y recibir la respuesta de aceptación o rechazo.</li>
        <li><strong>Sistema de contingencia</strong> — En caso de falla de conectividad, el sistema debe poder operar en modo contingencia y transmitir los documentos pendientes cuando se restablezca la conexión.</li>
        <li><strong>Almacenamiento de documentos</strong> — Los DTEs emitidos deben conservarse por al menos 10 años según el Código Tributario.</li>
        <li><strong>Ambiente de pruebas aprobado</strong> — Antes de operar en producción, el sistema debe pasar las pruebas técnicas de Hacienda.</li>
      </ul>

      <h2 id="sanciones">Sanciones por incumplimiento en facturación electrónica</h2>
      <p>
        El Código Tributario de El Salvador establece sanciones para los contribuyentes que incumplan con sus obligaciones de facturación. Estas son las principales consecuencias de no emitir DTEs:
      </p>

      <div className="step-card">
        <div className="step-num" style={{ background: '#ff2f6d' }}>!</div>
        <div>
          <h4>Multas por emisión de documentos no autorizados</h4>
          <p>Emitir facturas físicas cuando debes emitir DTEs equivale a emitir documentos tributarios no autorizados, lo que puede resultar en multas de hasta el 50% del monto de la operación.</p>
        </div>
      </div>
      <div className="step-card">
        <div className="step-num" style={{ background: '#ff2f6d' }}>!</div>
        <div>
          <h4>Cierre temporal del establecimiento</h4>
          <p>En casos de incumplimiento reiterado, el Ministerio de Hacienda tiene facultad para ordenar el cierre temporal del establecimiento comercial.</p>
        </div>
      </div>
      <div className="step-card">
        <div className="step-num" style={{ background: '#ff2f6d' }}>!</div>
        <div>
          <h4>Pérdida de crédito fiscal</h4>
          <p>Las compras respaldadas con facturas físicas cuando debía emitirse un DTE podrían no ser reconocidas como crédito fiscal deducible.</p>
        </div>
      </div>
      <div className="step-card">
        <div className="step-num" style={{ background: '#ff2f6d' }}>!</div>
        <div>
          <h4>Auditorías y fiscalizaciones</h4>
          <p>Los contribuyentes que no figuren en el sistema de DTEs de Hacienda quedan expuestos a auditorías tributarias con mayor facilidad.</p>
        </div>
      </div>

      <h2 id="contingencia">¿Qué es el sistema de contingencia en DTEs?</h2>
      <p>
        El Ministerio de Hacienda reconoce que puede haber momentos en que el sistema falle — sea por problemas de internet, mantenimiento del sistema de Hacienda, o fallas técnicas. Para estos casos existe el <strong>modo de contingencia</strong>.
      </p>
      <p>
        En modo de contingencia, tu sistema puede seguir emitiendo DTEs localmente, almacenarlos temporalmente, y transmitirlos a Hacienda cuando la conectividad se restablezca. Los documentos emitidos en contingencia tienen validez legal siempre que sean transmitidos dentro del plazo establecido.
      </p>

      <div className="success-box">
        <p><strong>DTEzen tiene sistema de contingencia automático</strong> incluido en todos los planes. Si falla la conexión, el sistema detecta la situación automáticamente y opera en contingencia sin que tengas que hacer nada manualmente.</p>
      </div>

      <h2 id="cumplir">Cómo cumplir con Hacienda hoy mismo</h2>
      <p>Si tu empresa todavía no está emitiendo DTEs, este es el camino más rápido para ponerte al día:</p>
      <ul>
        <li><strong>Elige una plataforma autorizada</strong> que gestione todo el proceso técnico — certificado digital, pruebas con Hacienda y emisión en producción.</li>
        <li><strong>No esperes a ser auditado.</strong> El proceso de implementación toma días, no semanas, con la plataforma correcta.</li>
        <li><strong>Informa a tus clientes y proveedores</strong> que comenzarás a emitir DTEs. Ellos también deben estar preparados para recibirlos.</li>
        <li><strong>Capacita a tu equipo</strong> en el uso del sistema. Con DTEzen, la curva de aprendizaje es de horas, no de días.</li>
      </ul>

      <div className="info-box">
        <p><strong>DTEzen gestiona todo:</strong> el trámite del certificado digital, las pruebas ante el Ministerio de Hacienda y la configuración completa de tu empresa. Desde $11/mes, sin costos ocultos. La implementación prioritaria está incluida en el plan Máxima Zen.</p>
      </div>

    </BlogPost>
  )
}
