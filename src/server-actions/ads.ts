"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdSchema } from "@/lib/validations";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function createAdAction(prevState: unknown, formData: FormData) {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    tags: formData.get("tags"),
    image: formData.get("image"),
  };

  const result = createAdSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      message: "Revisa los campos marcados",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await getSession();

  if (!session) {
    return {
      success: false,
      message: "No estás autenticado",
      errors: { general: ["No estás autenticado"] },
    };
  }

  await prisma.ad.create({
    data: {
      title: result.data.title,
      description: result.data.description,
      price: result.data.price,
      tags: result.data.tags,
      image: result.data.image || null,
      userId: session.userId,
    },
  });

  revalidatePath("/");
  redirect("/");
}
