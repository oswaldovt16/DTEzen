import BlogPost from '../../../components/BlogPost'

export const metadata = {
  title: 'Cómo emitir un DTE en El Salvador paso a paso (2026) | DTEzen',
  description: 'Guía completa para emitir tu primera factura electrónica DTE en El Salvador. Desde el certificado digital hasta el envío al Ministerio de Hacienda. Incluye requisitos y errores comunes.',
  keywords: ['emitir DTE El Salvador', 'cómo emitir factura electrónica El Salvador', 'proceso DTE El Salvador', 'certificado digital DTE', 'factura electrónica paso a paso El Salvador'],
  alternates: { canonical: 'https://www.dtezen.com/blog/como-emitir-dte-el-salvador' },
  openGraph: {
    title: 'Cómo emitir un DTE en El Salvador paso a paso (2026)',
    description: 'Guía práctica para emitir tu primera factura electrónica en El Salvador.',
    url: 'https://www.dtezen.com/blog/como-emitir-dte-el-salvador',
    type: 'article',
  },
}

const meta = {
  title: 'Cómo emitir un DTE en El Salvador paso a paso (2026)',
  excerpt: 'Guía práctica para emitir tu primera factura electrónica en El Salvador. Desde el certificado digital hasta el envío al Ministerio de Hacienda, sin términos técnicos.',
  category: 'Tutorial',
  categoryColor: '#10b981',
  readTime: '8 min',
  date: '2026-07-22',
  toc: [
    { id: 'requisitos', title: 'Requisitos previos' },
    { id: 'certificado', title: 'Obtener el certificado digital' },
    { id: 'ambiente-pruebas', title: 'Ambiente de pruebas' },
    { id: 'emitir', title: 'Emitir tu primer DTE' },
    { id: 'errores', title: 'Errores comunes' },
    { id: 'anulacion', title: 'Cómo anular un DTE' },
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
            "@type": "HowTo",
            "name": "Cómo emitir un DTE en El Salvador",
            "description": "Pasos para emitir un Documento Tributario Electrónico en El Salvador",
            "step": [
              { "@type": "HowToStep", "position": 1, "name": "Obtener NRC y NIT activos", "text": "Verifica que tu empresa tenga NRC y NIT vigentes ante el Ministerio de Hacienda." },
              { "@type": "HowToStep", "position": 2, "name": "Obtener certificado digital", "text": "Tramita tu certificado digital de firma electrónica ante una entidad autorizada." },
              { "@type": "HowToStep", "position": 3, "name": "Pasar ambiente de pruebas", "text": "Completa las pruebas técnicas requeridas por el Ministerio de Hacienda." },
              { "@type": "HowToStep", "position": 4, "name": "Emitir el primer DTE en producción", "text": "Una vez aprobado en pruebas, ya puedes emitir DTEs reales a tus clientes." },
            ],
            "author": { "@type": "Organization", "name": "DTEzen" },
          }),
        }}
      />

      <p>
        Emitir un <strong>DTE en El Salvador</strong> puede parecer complicado al principio, pero el proceso está bien definido. En esta guía te lo explicamos paso a paso, desde cero, para que tu empresa empiece a facturar electrónicamente sin tropiezos.
      </p>

      <h2 id="requisitos">Requisitos previos antes de emitir DTEs</h2>
      <p>Antes de emitir tu primer documento tributario electrónico, necesitas tener estos documentos y registros activos:</p>
      <ul>
        <li><strong>NIT activo</strong> — Número de Identificación Tributaria de tu empresa o persona natural</li>
        <li><strong>NRC activo</strong> — Número de Registro de Contribuyente ante el Ministerio de Hacienda</li>
        <li><strong>Actividad económica registrada</strong> — Tu giro comercial debe estar declarado en Hacienda</li>
        <li><strong>Correo electrónico empresarial</strong> — Para recibir notificaciones y comunicaciones oficiales</li>
        <li><strong>Datos de tus sucursales</strong> — Dirección, código de punto de venta (si aplica)</li>
      </ul>

      <div className="info-box">
        <p><strong>Si eres nuevo contribuyente:</strong> DTEzen incluye en todos sus planes el trámite y gestión del certificado digital y las pruebas requeridas. No necesitas hacer este proceso solo.</p>
      </div>

      <h2 id="certificado">Paso 1: Obtener tu certificado digital</h2>
      <p>
        El <strong>certificado digital</strong> es el equivalente electrónico de tu firma y sello en los documentos físicos. Sin él, no puedes firmar ni emitir DTEs válidos ante el Ministerio de Hacienda.
      </p>
      <p>Este certificado lo emiten entidades certificadoras autorizadas en El Salvador. El proceso incluye:</p>
      <ul>
        <li>Presentación de documentos de constitución de la empresa</li>
        <li>Verificación de identidad del representante legal</li>
        <li>Generación del par de claves criptográficas (pública y privada)</li>
        <li>Instalación del certificado en tu sistema de facturación</li>
      </ul>

      <div className="warning-box">
        <p><strong>⚠️ Cuidado:</strong> Tu clave privada del certificado digital es secreta. Nunca la compartas con nadie. DTEzen la almacena de forma encriptada y segura; ningún colaborador nuestro puede acceder a ella.</p>
      </div>

      <h2 id="ambiente-pruebas">Paso 2: Pasar el ambiente de pruebas de Hacienda</h2>
      <p>
        Antes de poder emitir DTEs reales, el Ministerio de Hacienda exige que tu sistema pase un <strong>ambiente de pruebas</strong>. Este proceso valida que tu software puede generar documentos en el formato JSON correcto, firmarlos digitalmente y transmitirlos al sistema de Hacienda sin errores.
      </p>
      <p>Las pruebas incluyen la emisión exitosa de al menos:</p>
      <ul>
        <li>Una Factura de Consumidor Final (tipo 01)</li>
        <li>Un Comprobante de Crédito Fiscal (tipo 03)</li>
        <li>Una Nota de Crédito o Débito (tipo 05 o 06)</li>
        <li>Un Comprobante de Retención (tipo 07), si aplica</li>
      </ul>

      <div className="success-box">
        <p><strong>Con DTEzen, este proceso está completamente gestionado.</strong> Nuestro equipo hace las pruebas por ti y te avisamos cuando ya estás aprobado para emitir en producción. Sin tecnicismos, sin stress.</p>
      </div>

      <h2 id="emitir">Paso 3: Emitir tu primer DTE real</h2>
      <p>Una vez aprobado en el ambiente de pruebas, ya puedes emitir documentos reales. El flujo en DTEzen es así:</p>

      <div className="step-card">
        <div className="step-num">1</div>
        <div>
          <h4>Selecciona el tipo de documento</h4>
          <p>¿Le vendes a una persona sin NIT? → Factura de Consumidor Final. ¿Le vendes a otra empresa? → Comprobante de Crédito Fiscal.</p>
        </div>
      </div>
      <div className="step-card">
        <div className="step-num">2</div>
        <div>
          <h4>Ingresa los datos del receptor</h4>
          <p>Nombre o razón social, NIT/DUI, dirección. Si ya tienes al cliente guardado en tu cartera de clientes, se autocompleta.</p>
        </div>
      </div>
      <div className="step-card">
        <div className="step-num">3</div>
        <div>
          <h4>Agrega los productos o servicios</h4>
          <p>Descripción, cantidad, precio unitario. Si tienes inventario configurado en DTEzen, selecciona directamente del catálogo.</p>
        </div>
      </div>
      <div className="step-card">
        <div className="step-num">4</div>
        <div>
          <h4>Emite y listo</h4>
          <p>DTEzen firma el documento, lo envía a Hacienda en tiempo real y le manda el PDF y el JSON a tu cliente por correo automáticamente. Todo en segundos.</p>
        </div>
      </div>

      <h2 id="errores">Errores comunes al emitir DTEs en El Salvador</h2>
      <p>Estos son los errores más frecuentes que cometen las empresas al comenzar a facturar electrónicamente:</p>

      <table className="comparison-table">
        <thead>
          <tr>
            <th>Error</th>
            <th>Por qué ocurre</th>
            <th>Cómo evitarlo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DTE rechazado por Hacienda</td>
            <td>NIT del receptor incorrecto o empresa inactiva</td>
            <td>Verificar NIT antes de emitir</td>
          </tr>
          <tr>
            <td>Certificado vencido</td>
            <td>Los certificados tienen vigencia limitada</td>
            <td>DTEzen te notifica antes del vencimiento</td>
          </tr>
          <tr>
            <td>Tipo de documento incorrecto</td>
            <td>Usar factura consumidor final para una empresa</td>
            <td>Verificar si el receptor tiene NIT activo</td>
          </tr>
          <tr>
            <td>Falla en la transmisión</td>
            <td>Problemas de conexión o sistema de Hacienda</td>
            <td>DTEzen tiene sistema de contingencia automático</td>
          </tr>
          <tr>
            <td>DTE emitido con datos erróneos</td>
            <td>Error en monto, descripción o datos del receptor</td>
            <td>Anular y re-emitir (ver sección siguiente)</td>
          </tr>
        </tbody>
      </table>

      <h2 id="anulacion">¿Cómo anular un DTE en El Salvador?</h2>
      <p>
        Si emitiste un DTE con un error, <strong>no puedes editarlo</strong> — los DTEs son documentos inmutables una vez firmados y enviados a Hacienda. Lo que debes hacer es anularlo y emitir uno nuevo correcto.
      </p>
      <p>Para anular un DTE en El Salvador:</p>
      <ul>
        <li>Debes hacerlo dentro de las <strong>24 horas siguientes</strong> a la emisión</li>
        <li>La anulación también se envía a Hacienda y queda registrada</li>
        <li>Necesitas especificar el motivo de la anulación</li>
        <li>Después de anular, puedes emitir el documento correcto</li>
      </ul>

      <div className="info-box">
        <p><strong>En DTEzen</strong>, la anulación de DTEs está incluida en todos los planes. Se hace desde el historial de documentos en dos clics, sin llamadas ni trámites adicionales.</p>
      </div>

    </BlogPost>
  )
}
