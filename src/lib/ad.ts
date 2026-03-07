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

  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;

  const safePageSize = Number.isNaN(perPage) || perPage < 1 ? 10 : perPage;

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

  if (safePage > totalPages && totalPages > 0) {
    return { items: [], totalPages, currentPage };
  }

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

  let filtered = ads;
  if (normalizedTag) {
    filtered = ads.filter((ad) =>
      ad.tags.some((t) => t.toLowerCase().includes(normalizedTag)),
    );
  }

  const paginatedAds = filtered.slice(skip, skip + safePageSize);

  return { items: paginatedAds, totalPages, currentPage };
}
