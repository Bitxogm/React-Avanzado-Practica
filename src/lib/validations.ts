import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "Mínimo 4 caracteres"),
});

export const createAdSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  description: z.string().min(10, "Mínimo 10 caracteres"),
  price: z.coerce.number().positive("El precio debe ser positivo"),
  tags: z.string().transform((val) =>
    val
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  ),
  imageUrl: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val) return true; // Optional
        if (val.includes("unsplash.com/photos/")) return false; // Reject unsplash.com/photos/ URLs
        return true;
      },
      {
        message:
          "URL de Unsplash inválida. Copia la URL de la imagen, no el enlace de la página",
      },
    )
    .refine(
      (val) => {
        if (!val) return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "URL no válida" },
    ),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateAdInput = z.infer<typeof createAdSchema>;
