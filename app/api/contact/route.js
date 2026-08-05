import { Resend } from 'resend'

export async function POST(request) {
  // Movimos la inicialización ADENTRO de la función. 
  // Así no rompe el build de Vercel y solo se ejecuta cuando hay un POST real.
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    return Response.json({ success: false, error: 'API Key no configurada en el servidor' }, { status: 500 })
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, message } = await request.json()

    const data = await resend.emails.send({
      from: 'DTEzen Web <notificaciones@dtezen.com>', // Tu correo de salida verificado en Resend
      to: 'contacto@dtezen.com',                  // A dónde llegarán los leads
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
