import prisma from "./prisma";
import { Ad } from "@/types/ad";

export async function getArticles(): Promise<Ad[]> {
  return prisma.ad.findMany();
}