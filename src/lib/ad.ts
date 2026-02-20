import prisma from "./prisma";
import { Ad } from "@/types/ad";

export interface AdFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  tag?: string;
}

export async function getArticleById(id: number): Promise<Ad | null> {
  return prisma.ad.findUnique({
    where: { id },
  });
}

export async function getArticles(filters: AdFilters = {}): Promise<Ad[]> {
  const { search, minPrice, maxPrice, tag } = filters;

  return prisma.ad.findMany({
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
        tag ? { tags: { has: tag } } : {},
      ],
    },
  });
}
