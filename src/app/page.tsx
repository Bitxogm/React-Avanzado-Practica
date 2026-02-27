import { getArticles } from "@/lib/ad";
import { AdCard } from "@/components/AdCard";
import { Filters } from "@/components/Filters";

interface HomeProps {
  searchParams: Promise<{
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    price?: string;
    tag?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  let articles;

  try {
    const params = await searchParams;

    articles = await getArticles({
      search: params.search,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice || params.price ? Number(params.maxPrice || params.price) : undefined,
      tag: params.tag,
    });
  } catch (error) {
    console.error("[page.tsx] Error loading articles:", error);
    throw error;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Anuncios disponibles</h1>
      <Filters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}