"use server";

import { z } from "zod";

// Definimos la estructura del estado que devuelve la Server Action
export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]> | null;
};

// Esquema de validación con Zod
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(80, "El nombre es demasiado largo."),
  email: z
    .string()
    .email("Por favor, introduce un correo electrónico válido.")
    .max(100, "El correo es demasiado largo."),
  service: z.string().optional(),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(1000, "El mensaje no puede superar los 1000 caracteres."),
});

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    service: formData.get("service"),
    message: formData.get("message"),
  };

  const validatedFields = contactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, corrige los errores en el formulario.",
    };
  }

  const { name, email, service, message } = validatedFields.data;

  try {
    // Log para verificar los datos validados del lado del servidor
    console.log("Datos de contacto validados:", { name, email, service, message });

    return {
      success: true,
      errors: null,
      message: "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
    };
  } catch (err) {
    console.error("Error en submitContactForm:", err);
    return {
      success: false,
      errors: null,
      message: "Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.",
    };
  }
}