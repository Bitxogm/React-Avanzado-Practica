"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type ArticleOrder = "asc" | "desc";

interface AdsFiltersProps {
  initialQuery: string;
  initialOrder: ArticleOrder;
}

export default function AdsFilters({
  initialQuery,
  initialOrder,
}: AdsFiltersProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [order, setOrder] = useState(initialOrder);
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const [tagInput, setTagInput] = useState(searchParams.get("tag") ?? "");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Tags disponibles
  const availableTags = [
    "tecnología",
    "periféricos",
    "cables",
    "cámara",
    "audio",
    "almacenamiento",
    "accesorios",
    "hogar",
    "iluminación",
    "electricidad",
    "libros",
    "programación",
    "mochila",
    "papelería",
    "libreta",
    "muebles",
    "botella",
  ];

  const filteredTags = availableTags.filter((t) =>
    t.toLowerCase().includes(tagInput.toLowerCase())
  );

  function submitFilters() {
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    if (order) {
      params.set("order", order);
    } else {
      params.delete("order");
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    if (tagInput) {
      params.set("tag", tagInput);
    } else {
      params.delete("tag");
    }

    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitFilters();
  }

  function handleClear() {
    setQuery("");
    setOrder("asc");
    setMinPrice("");
    setMaxPrice("");
    setTagInput("");
    router.replace(pathname);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitFilters();
    }
  }

  return (
    <div className="w-full mb-6">
      {/* Header desplegable */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between rounded border border-border p-4 bg-card hover:bg-accent/50 transition-colors"
      >
        <span className="font-semibold">🔍 Buscar y filtrar</span>
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Formulario desplegable */}
      {isExpanded && (
        <form onSubmit={handleSubmit} className="rounded-b border border-t-0 border-border p-4 bg-card">
          <div className="grid gap-4">
            {/* Búsqueda */}
            <div>
              <label htmlFor="query" className="text-sm font-medium block mb-2">
                Buscar
              </label>
              <input
                id="query"
                type="text"
                name="query"
                placeholder="Ej: Laptop, iPhone..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded border border-border p-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Precios */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="minPrice" className="text-sm font-medium block mb-2">
                  Precio mínimo
                </label>
                <input
                  id="minPrice"
                  type="number"
                  placeholder="Mín."
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded border border-border p-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="text-sm font-medium block mb-2">
                  Precio máximo
                </label>
                <input
                  id="maxPrice"
                  type="number"
                  placeholder="Máx."
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded border border-border p-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tag" className="text-sm font-medium block mb-2">
                Categoría/Tag
              </label>
              <div className="relative">
                <input
                  id="tag"
                  type="text"
                  placeholder="Buscar categoría..."
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    setShowTagDropdown(true);
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowTagDropdown(true)}
                  className="w-full rounded border border-border p-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {tagInput && (
                  <button
                    type="button"
                    onClick={() => setTagInput("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
                  >
                    ✕
                  </button>
                )}
                {showTagDropdown && filteredTags.length > 0 && (
                  <div className="absolute top-full mt-1 w-full border rounded border-t-0 bg-background shadow-lg z-10 max-h-48 overflow-y-auto">
                    {filteredTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setTagInput(tag);
                          setShowTagDropdown(false);
                        }}
                        className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors border-b border-border last:border-b-0"
                      >
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="capitalize">{tag}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Ordenamiento */}
            <div>
              <label htmlFor="order" className="text-sm font-medium block mb-2">
                Ordenar por precio
              </label>
              <select
                id="order"
                name="order"
                value={order}
                onChange={(e) => setOrder(e.target.value as ArticleOrder)}
                className="w-full rounded border border-border p-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="asc">💰 Precio: menor a mayor</option>
                <option value="desc">💸 Precio: mayor a menor</option>
              </select>
            </div>

            {/* Botones */}
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button type="submit" className="flex-1">
                ✓ Buscar
              </Button>
              <Button
                type="button"
                onClick={handleClear}
                variant="outline"
                className="flex-1"
              >
                ↻ Limpiar
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
