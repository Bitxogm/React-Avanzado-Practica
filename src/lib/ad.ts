import prisma from "./prisma";
import { Ad } from "@/types/ad";

export interface AdFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  tag?: string;
}

export async function getArticleById(id: string): Promise<Ad | null> {
  return prisma.ad.findUnique({
    where: { id },
  });
}

export async function getArticles(filters: AdFilters = {}): Promise<Ad[]> {
  const { search, minPrice, maxPrice, tag } = filters;

  // Normalizar el tag a minúsculas
  const normalizedTag = tag?.toLowerCase().trim();

  // Primero obtenemos todos los anuncios con los filtros básicos
  const ads = await prisma.ad.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        minPrice !== undefined ? { price: { gte: minPrice } } : {},
        maxPrice !== undefined ? { price: { lte: maxPrice } } : {},
      ],
    },
  });

  // Luego filtramos por tags en memoria (case-insensitive)
  if (normalizedTag) {
    return ads.filter((ad) =>
      ad.tags.some((t) => t.toLowerCase().includes(normalizedTag)),
    );
  }

  return ads;
}
