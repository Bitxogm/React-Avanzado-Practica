import { getArticles } from "@/lib/ad";
import { AdCard } from "@/components/AdCard";

export default async function Home() {
  const articles = await getArticles();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Anuncios disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}