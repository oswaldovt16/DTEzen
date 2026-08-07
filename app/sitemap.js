export default function sitemap() {
  const baseUrl = 'https://www.dtezen.com'
  const now = new Date().toISOString()

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/que-es-dte-el-salvador`,
      lastModified: '2026-07-15',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/como-emitir-dte-el-salvador`,
      lastModified: '2026-07-22',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/facturacion-electronica-ministerio-hacienda`,
      lastModified: '2026-07-29',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
