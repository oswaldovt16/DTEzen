import { Resend } from 'resend'

// Instancia Resend usando la variable de entorno que configurarás en Vercel
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { name, email, message } = await request.json()

    const data = await resend.emails.send({
      from: 'DTEzen Web <notificaciones@dtezen.com>', // Cambia esto por tu dominio verificado en Resend si ya lo tienes
      to: 'contacto@dtezen.com',
      subject: `Nuevo Lead Landing: ${name}`,
      html: `
        <h2>Nuevo contacto desde la web</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br/>${message}</p>
      `
    })

    return Response.json({ success: true, data })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
