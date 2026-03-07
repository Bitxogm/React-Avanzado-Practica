import { getArticleById, getArticles } from "@/lib/ad";
import { AdImageContainer } from "@/components/AdImageContainer";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import DeleteAdButton from "@/components/DeleteAdButton";

interface AdPageProps {
  params: Promise<{ id: string }>;
}

function parseAdId(rawId: string): number | null {
  if (!/^\d+$/.test(rawId)) {
    return null;
  }

  const parsedId = Number(rawId);

  if (!Number.isSafeInteger(parsedId) || parsedId < 1) {
    return null;
  }

  return parsedId;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const result = await getArticles();
  return result.items.map((ad) => ({
    id: String(ad.id),
  }));
}

export async function generateMetadata({ params }: AdPageProps) {
  const { id: rawId } = await params;
  const adId = parseAdId(rawId);

  if (!adId) {
    return { title: "Anuncio no encontrado" };
  }

  const ad = await getArticleById(adId);

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
  const { id: rawId } = await params;
  const adId = parseAdId(rawId);

  if (!adId) {
    notFound();
  }

  const [ad, session] = await Promise.all([
    getArticleById(adId),
    getSession(),
  ]);

  if (!ad) notFound();

  const isOwner = session?.userId === ad.userId;

  return (
    <div className="max-w-2xl mx-auto">
      <AdImageContainer imageUrl={ad.image} title={ad.title} priority={true} />
      <h1 className="text-3xl font-bold mb-4 mt-6">{ad.title}</h1>
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
      {isOwner && <DeleteAdButton adId={ad.id} />}
    </div>
  );
}