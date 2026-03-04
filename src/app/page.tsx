import { getArticles } from "@/lib/ad";
import { AdCard } from "@/components/AdCard";
import AdsFiltersForm from "@/components/forms/AdsFiltersForm";

interface HomeProps {
  searchParams: Promise<{
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    price?: string;
    tag?: string;
    order?: string;
    page?: string;
  }>;
}

// Tipos para los parámetros de búsqueda de la URL (querystrings como ?sort=desc)
type SearchParamValue = string | string[] | undefined;

function getSingleSearchParam(value: SearchParamValue) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}
export default async function Home({ searchParams }: HomeProps) {
  let articles;
  let query: string | undefined;
  let order: "asc" | "desc" = "desc";

  try {
    const params = await searchParams;

    // Extraer y parsear los parámetros de búsqueda de la URL
    query = getSingleSearchParam(params.search) as string | undefined;
    order = (getSingleSearchParam(params.order) as "asc" | "desc") || "desc";

    articles = await getArticles({
      search: params.search,
      minPrice: params.minPrice ? Number(params.minPrice) : undefined,
      maxPrice: params.maxPrice || params.price ? Number(params.maxPrice || params.price) : undefined,
      tag: params.tag,
      order: order,
    });
  } catch (error) {
    console.error("[page.tsx] Error loading articles:", error);
    throw error;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Anuncios disponibles</h1>
      <AdsFiltersForm initialQuery={query ?? ""} initialOrder={order} />

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No se encontraron anuncios
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-500">
              {query && <p>📝 Búsqueda: "{query}"</p>}
              {query && <p>↓</p>}
              <p>💡 Prueba con palabras clave diferentes o rango de precios más amplio</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}