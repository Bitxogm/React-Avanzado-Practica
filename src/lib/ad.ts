import prisma from "./prisma";
import { Ad } from "@/types/ad";

export async function getArticles(): Promise<Ad[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return prisma.ad.findMany();
}