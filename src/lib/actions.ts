"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginSchema, createAdSchema } from "./validations";
import prisma from "./prisma";

export async function loginAction(prevState: unknown, formData: FormData) {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(raw);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const user = await prisma.user.findUnique({
    where: { email: result.data.email },
  });

  if (!user || user.password !== result.data.password) {
    return { errors: { email: ["Credenciales incorrectas"] } };
  }

  redirect("/");
}

export async function createAdAction(prevState: unknown, formData: FormData) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    tags: formData.get("tags"),
  };

  const result = createAdSchema.safeParse(raw);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  await prisma.ad.create({
    data: {
      ...result.data,
      userId: 1, // temporal hasta tener auth real
    },
  });

  revalidatePath("/");
  redirect("/");
}