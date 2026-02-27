"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginSchema, createAdSchema } from "./validations";
import prisma from "./prisma";
import { getSession } from "./auth";

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

  // Guardar sesión en cookie
  const cookieStore = await cookies();
  cookieStore.set("session", String(user.id), {
    httpOnly: true, // no accesible desde JS del cliente
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 horas
    path: "/",
  });

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

  const session = await getSession();

  if (!session) {
    return { errors: { general: ["No estás autenticado"] } };
  }

  await prisma.ad.create({
    data: {
      ...result.data,
      userId: session.userId,
    },
  });

  revalidatePath("/");
  redirect("/");
}
