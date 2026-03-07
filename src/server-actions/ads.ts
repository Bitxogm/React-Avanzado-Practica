"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdSchema } from "@/lib/validations";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

type ActionState = {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
};

export async function createAdAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionState> {
  // Extraer imagen: puede venir como base64 (archivo) o como URL
  let imageData: string | null = null;

  const imageBase64 = formData.get("imageBase64");
  const imageUrl = formData.get("imageUrl");

  // Si hay archivo convertido a base64 (enviado desde el cliente)
  if (imageBase64 && typeof imageBase64 === "string" && imageBase64.trim()) {
    imageData = imageBase64;
  }
  // Si hay URL
  else if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
    imageData = imageUrl;
  }

  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    tags: formData.get("tags"),
    imageUrl: imageData,
  };

  const result = createAdSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      message: "Revisa los campos marcados",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
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
      image: result.data.imageUrl || null,
      userId: session.userId,
    },
  });

  revalidatePath("/");
  redirect("/");
}

export async function deleteAdAction(adId: number) {
  const session = await getSession();

  if (!session) {
    return { success: false, message: "No estás autenticado", errors: {} };
  }

  const ad = await prisma.ad.findUnique({
    where: { id: adId },
  });

  if (!ad) {
    return { success: false, message: "Anuncio no encontrado", errors: {} };
  }

  if (ad.userId !== session.userId) {
    return { success: false, message: "No tienes permiso para borrar este anuncio", errors: {} };
  }

  await prisma.ad.delete({
    where: { id: adId },
  });

  revalidatePath("/");
  redirect("/");
}
