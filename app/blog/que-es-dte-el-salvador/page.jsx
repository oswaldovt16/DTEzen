import BlogPost from '../../../components/BlogPost'

export const metadata = {
  title: '¿Qué es un DTE en El Salvador? Guía completa 2026 | DTEzen',
  description: 'Descubre qué es un DTE (Documento Tributario Electrónico) en El Salvador, para qué sirve, cuáles son los tipos de DTEs y por qué tu empresa debe emitirlos. Guía completa 2026.',
  keywords: ['DTE El Salvador', 'qué es DTE', 'Documento Tributario Electrónico El Salvador', 'factura electrónica El Salvador', 'tipos de DTE El Salvador'],
  alternates: { canonical: 'https://www.dtezen.com/blog/que-es-dte-el-salvador' },
  openGraph: {
    title: '¿Qué es un DTE en El Salvador? Guía completa 2026',
    description: 'Todo lo que necesitas saber sobre los Documentos Tributarios Electrónicos en El Salvador.',
    url: 'https://www.dtezen.com/blog/que-es-dte-el-salvador',
    type: 'article',
  },
}

const meta = {
  title: '¿Qué es un DTE en El Salvador? Guía completa 2026',
  excerpt: 'Todo lo que necesitas saber sobre los Documentos Tributarios Electrónicos: qué son, para qué sirven, cuáles son los tipos y por qué tu empresa ya debe emitirlos.',
  category: 'Fundamentos',
  categoryColor: '#2563eb',
  readTime: '6 min',
  date: '2026-07-15',
  toc: [
    { id: 'que-es', title: '¿Qué es un DTE?' },
    { id: 'tipos', title: 'Tipos de DTEs en El Salvador' },
    { id: 'obligatoriedad', title: '¿Es obligatorio?' },
    { id: 'diferencias', title: 'DTE vs factura tradicional' },
    { id: 'como-emitir', title: '¿Cómo empiezo a emitir?' },
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
            "author": { "@type": "Organization", "name": "DTEzen" },
            "publisher": { "@type": "Organization", "name": "DTEzen", "url": "https://www.dtezen.com" },
            "mainEntityOfPage": "https://www.dtezen.com/blog/que-es-dte-el-salvador",
          }),
        }}
      />

      <h2 id="que-es">¿Qué es un DTE?</h2>
      <p>
        Un <strong>DTE (Documento Tributario Electrónico)</strong> es la versión digital y oficial de los documentos fiscales que las empresas emiten en El Salvador. Reemplaza a la factura, comprobante de crédito fiscal, nota de remisión y demás documentos físicos que antes se imprimían en papel.
      </p>
      <p>
        A diferencia de un simple PDF o correo electrónico, un DTE es un archivo en formato <strong>JSON firmado digitalmente</strong> que se transmite en tiempo real al <strong>Ministerio de Hacienda de El Salvador</strong> para su validación y registro. Esto significa que cada transacción queda registrada en el sistema tributario nacional de forma inmediata.
      </p>

      <div className="info-box">
        <p><strong>En términos simples:</strong> un DTE es como una factura tradicional, pero digital, firmada electrónicamente y enviada a Hacienda en el momento de emitirla. Sin papel, sin sellos, sin filas.</p>
      </div>

      <h2 id="tipos">Tipos de DTEs en El Salvador</h2>
      <p>El Ministerio de Hacienda reconoce distintos tipos de Documentos Tributarios Electrónicos según el tipo de transacción:</p>

      <table className="comparison-table">
        <thead>
          <tr>
            <th>Tipo de DTE</th>
            <th>¿Cuándo se usa?</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><strong>Factura de Consumidor Final</strong></td><td>Ventas a personas sin NIT</td><td>01</td></tr>
          <tr><td><strong>Comprobante de Crédito Fiscal</strong></td><td>Ventas entre contribuyentes (B2B)</td><td>03</td></tr>
          <tr><td><strong>Nota de Remisión</strong></td><td>Traslado de mercancías</td><td>04</td></tr>
          <tr><td><strong>Nota de Crédito</strong></td><td>Devoluciones o descuentos</td><td>05</td></tr>
          <tr><td><strong>Nota de Débito</strong></td><td>Ajustes por cobros adicionales</td><td>06</td></tr>
          <tr><td><strong>Comprobante de Retención</strong></td><td>Retenciones de IVA o renta</td><td>07</td></tr>
          <tr><td><strong>Comprobante de Liquidación</strong></td><td>Consignaciones y agencias</td><td>08</td></tr>
          <tr><td><strong>Factura de Exportación</strong></td><td>Ventas al exterior</td><td>11</td></tr>
          <tr><td><strong>Factura de Sujeto Excluido</strong></td><td>Compras a no contribuyentes</td><td>14</td></tr>
        </tbody>
      </table>

      <h2 id="obligatoriedad">¿Es obligatorio emitir DTEs en El Salvador?</h2>
      <p>
        <strong>Sí, es obligatorio.</strong> Desde mayo de 2025, el Ministerio de Hacienda extendió la obligatoriedad de la facturación electrónica a <em>todos los contribuyentes</em> de El Salvador, sin excepción. Esto incluye grandes empresas, PYMEs, emprendedores y personas naturales con actividad económica.
      </p>

      <div className="warning-box">
        <p><strong>⚠️ Importante:</strong> Las empresas que sigan emitiendo facturas en papel o que no se integren al sistema de facturación electrónica del Ministerio de Hacienda están expuestas a multas y sanciones tributarias. No esperes a que te llegue una notificación.</p>
      </div>

      <h2 id="diferencias">DTE vs factura tradicional: ¿cuál es la diferencia?</h2>

      <table className="comparison-table">
        <thead>
          <tr>
            <th>Aspecto</th>
            <th>Factura tradicional</th>
            <th>DTE</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Formato</td><td>Papel físico impreso</td><td>Archivo JSON digital</td></tr>
          <tr><td>Validación Hacienda</td><td>Manual, posterior</td><td>Automática, en tiempo real</td></tr>
          <tr><td>Firma</td><td>Sello y firma física</td><td>Certificado digital</td></tr>
          <tr><td>Almacenamiento</td><td>Físico (riesgo de pérdida)</td><td>Digital en la nube</td></tr>
          <tr><td>Envío al cliente</td><td>Entrega física o escáner</td><td>Correo electrónico automático</td></tr>
          <tr><td>Costo de emisión</td><td>Impresión + archivo físico</td><td>Costo de plataforma digital</td></tr>
          <tr><td>Legalidad actual</td><td>No válida (desde 2025)</td><td>Obligatoria y válida ✓</td></tr>
        </tbody>
      </table>

      <h2 id="como-emitir">¿Cómo empieza a emitir DTEs mi empresa?</h2>
      <p>Para emitir DTEs en El Salvador necesitas completar estos pasos:</p>

      <div className="step-card">
        <div className="step-num">1</div>
        <div>
          <h4>Obtener tu certificado digital</h4>
          <p>El certificado digital es tu firma electrónica oficial. DTEzen te ayuda a tramitarlo ante el Ministerio de Hacienda sin complicaciones. Incluido en todos los planes.</p>
        </div>
      </div>
      <div className="step-card">
        <div className="step-num">2</div>
        <div>
          <h4>Configurar tu empresa en la plataforma</h4>
          <p>Registra los datos de tu empresa, tus sucursales, tu NRC y NIT. DTEzen lo hace guiado, en menos de 10 minutos.</p>
        </div>
      </div>
      <div className="step-card">
        <div className="step-num">3</div>
        <div>
          <h4>Emitir tu primer DTE</h4>
          <p>Selecciona el tipo de documento, ingresa los datos del cliente y el monto. El sistema envía el DTE a Hacienda automáticamente y le envía el PDF y JSON a tu cliente por correo.</p>
        </div>
      </div>
      <div className="step-card">
        <div className="step-num">4</div>
        <div>
          <h4>Listo, ya cumples con Hacienda</h4>
          <p>Cada DTE emitido queda registrado, almacenado y disponible para tu contador desde el Portal Mi Contador de DTEzen.</p>
        </div>
      </div>

      <div className="success-box">
        <p><strong>✓ Con DTEzen</strong>, el trámite del certificado digital y la configuración inicial están incluidos en todos los planes. No necesitas conocimientos técnicos para empezar.</p>
      </div>

    </BlogPost>
  )
}
