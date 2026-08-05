import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://www.dtezen.com'),
  title: {
    default: 'DTEzen — Facturación Electrónica en El Salvador | Software DTE',
    template: '%s | DTEzen',
  },
  description: 'DTEzen es el software de facturación electrónica más moderno de El Salvador. Emite DTEs, gestiona inventario, clientes y cumple con el Ministerio de Hacienda desde un solo lugar. Desde $11/mes.',
  keywords: [
    'facturación electrónica El Salvador',
    'software DTE El Salvador',
    'sistema DTE El Salvador',
    'factura electrónica El Salvador',
    'emitir DTE El Salvador',
    'Ministerio de Hacienda facturación',
    'software factura electrónica pequeñas empresas El Salvador',
    'sistema facturación electrónica pyme El Salvador',
    'DTEzen',
  ],
  authors: [{ name: 'DTEzen', url: 'https://www.dtezen.com' }],
  creator: 'DTEzen',
  publisher: 'DTEzen',
  openGraph: {
    type: 'website',
    locale: 'es_SV',
    url: 'https://www.dtezen.com',
    siteName: 'DTEzen',
    title: 'DTEzen — Facturación Electrónica en El Salvador',
    description: 'La forma más simple y moderna de emitir DTEs, operar tu negocio y cumplir con Hacienda. Desde $11/mes.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DTEzen - Facturación Electrónica El Salvador' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DTEzen — Facturación Electrónica en El Salvador',
    description: 'La forma más simple y moderna de emitir DTEs y cumplir con Hacienda.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: 'https://www.dtezen.com' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-SV" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "DTEzen",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "description": "Software de facturación electrónica DTE para El Salvador. Emite DTEs, gestiona inventario y clientes cumpliendo con el Ministerio de Hacienda.",
              "url": "https://www.dtezen.com",
              "offers": [
                { "@type": "Offer", "name": "Esencial Zen", "price": "11.00", "priceCurrency": "USD", "priceValidUntil": "2027-12-31", "availability": "https://schema.org/InStock" },
                { "@type": "Offer", "name": "PYME Zen", "price": "22.00", "priceCurrency": "USD", "priceValidUntil": "2027-12-31", "availability": "https://schema.org/InStock" },
                { "@type": "Offer", "name": "Máxima Zen", "price": "45.00", "priceCurrency": "USD", "priceValidUntil": "2027-12-31", "availability": "https://schema.org/InStock" },
              ],
              "provider": {
                "@type": "Organization",
                "name": "DTEzen",
                "url": "https://www.dtezen.com",
                "email": "contacto@dtezen.com",
                "areaServed": { "@type": "Country", "name": "El Salvador" },
                "sameAs": ["https://www.dtezen.com"],
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}