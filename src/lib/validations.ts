import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const createAdSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  description: z.string().min(10, "Mínimo 10 caracteres"),
  price: z.coerce.number().positive("El precio debe ser positivo"),
  tags: z.string().transform((val) => val.split(",").map((t) => t.trim()).filter(Boolean)),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateAdInput = z.infer<typeof createAdSchema>;