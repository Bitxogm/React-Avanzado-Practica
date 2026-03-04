import prisma from "./prisma";
import { Ad } from "@/types/ad";
import { PaginationResponse } from "@/types/pagination";

export interface AdFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  tag?: string;
  order?: "asc" | "desc";
  page: number;
  perPage: number;
}

export async function getArticleById(id: number): Promise<Ad | null> {
  return prisma.ad.findUnique({
    where: { id },
  });
}

export async function getArticles(
  filters: AdFilters = {
    page: 0,
    perPage: 0,
  },
): Promise<PaginationResponse<Ad>> {
  const {
    search,
    minPrice,
    maxPrice,
    tag,
    order = "desc",
    page = 1,
    perPage = 10,
  } = filters;

  // ✅ Proteger page: debe ser número válido y >= 1
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;

  // ✅ Proteger pageSize: debe ser número válido y >= 1
  const safePageSize = Number.isNaN(perPage) || perPage < 1 ? 10 : perPage;

  // Normalizar el tag a minúsculas
  const normalizedTag = tag?.toLowerCase().trim();

  const totalAds = await prisma.ad.count({
    where: {
      AND: [
        search ? { title: { contains: search, mode: "insensitive" } } : {},
        minPrice !== undefined ? { price: { gte: minPrice } } : {},
        maxPrice !== undefined ? { price: { lte: maxPrice } } : {},
      ],
    },
  });

  const totalPages = Math.ceil(totalAds / safePageSize);
  const currentPage = Math.min(safePage, totalPages || 1);

  // Si la página solicitada es mayor que el total de páginas, devolvemos un array vacío
  if (safePage > totalPages && totalPages > 0) {
    return { items: [], totalPages, currentPage };
  }

  // Obtener los anuncios con los filtros básicos y paginación
  const skip = (currentPage - 1) * safePageSize;

  const ads = await prisma.ad.findMany({
    where: {
      AND: [
        search ? { title: { contains: search, mode: "insensitive" } } : {},
        minPrice !== undefined ? { price: { gte: minPrice } } : {},
        maxPrice !== undefined ? { price: { lte: maxPrice } } : {},
      ],
    },
    orderBy: {
      price: order === "asc" ? "asc" : "desc",
    },
  });

  // Filtrar por tags en memoria (case-insensitive)
  let filtered = ads;
  if (normalizedTag) {
    filtered = ads.filter((ad) =>
      ad.tags.some((t) => t.toLowerCase().includes(normalizedTag)),
    );
  }

  // Aplicar paginación al array filtrado
  const paginatedAds = filtered.slice(skip, skip + safePageSize);

  return { items: paginatedAds, totalPages, currentPage };
}
