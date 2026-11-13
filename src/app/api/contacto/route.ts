import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Nombre muy corto").max(80, "Nombre demasiado largo"),
  email: z.string().email("Correo inválido").max(100, "Correo demasiado largo"),
  service: z.string().min(2, "Servicio requerido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(1000, "Mensaje demasiado largo"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validación estricta en servidor
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, service, message } = result.data;

    // 2. Envío de notificación por correo (Gratis con Resend)
    await resend.emails.send({
      from: 'Florece Studio <onboarding@resend.dev>', // Usar este remitente por defecto en el plan gratis
      to: ['tu-correo@gmail.com'], // Coloca tu casilla de correo personal o del estudio
      subject: `Nuevo mensaje de contacto: ${name}`,
      html: `
        <h2>Nueva consulta recibida en Florece Studio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${service}</p>
        <p><strong>Mensaje:</strong></p>
        <p style="background: #f4f4f4; padding: 12px; border-radius: 8px;">${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Consulta validada y mail enviado correctamente",
      data: result.data,
    });
  } catch (err) {
    console.error("Error en /api/contacto:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}