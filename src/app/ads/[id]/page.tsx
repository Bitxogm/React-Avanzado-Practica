import { getArticleById, getArticles } from "@/lib/ad";
import Image from "next/image";

interface AdPageProps {
  params: Promise<{ id: string }>;
}

// Solo permitir IDs que existen en la BD (no generar dinámicamente)
export const dynamicParams = false;

export async function generateStaticParams() {
  const ads = await getArticles();
  return ads.map((ad) => ({
    id: String(ad.id),
  }));
}

export async function generateMetadata({ params }: AdPageProps) {
  const { id } = await params;

  const ad = await getArticleById(Number(id));

  if (!ad) return { title: "Anuncio no encontrado" };

  return {
    title: `${ad.title} - ${ad.price}€`,
    description: ad.description,
    openGraph: {
      title: `${ad.title} - ${ad.price}€`,
      description: ad.description,
      images: ad.image ? [ad.image] : [],
    },
  };
}

export default async function AdPage({ params }: AdPageProps) {
  const { id } = await params;

  const ad = await getArticleById(Number(id));

  if (!ad) throw new Error("El anuncio no existe o ha sido eliminado");

  return (
    <div className="max-w-2xl mx-auto">
      {ad.image && (
        <div className="relative w-full h-72 mb-6 rounded-lg overflow-hidden">
          <Image
            src={ad.image}
            alt={ad.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{ad.title}</h1>
      <p className="text-muted-foreground mb-6">{ad.description}</p>
      <div className="flex gap-2 flex-wrap mb-6">
        {ad.tags.map((tag) => (
          <span
            key={tag}
            className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-2xl font-bold text-primary">{ad.price}€</p>
      <p className="text-sm text-muted-foreground mt-2">
        {ad.sold ? "Vendido" : "Disponible"}
      </p>
    </div>
  );
}