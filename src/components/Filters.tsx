"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <input
        type="text"
        placeholder="Buscar..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => updateFilter("search", e.target.value)}
        className="border rounded px-3 py-2 text-sm flex-1 min-w-[200px]"
      />
      <input
        type="number"
        placeholder="Precio mínimo"
        defaultValue={searchParams.get("minPrice") ?? ""}
        onChange={(e) => updateFilter("minPrice", e.target.value)}
        className="border rounded px-3 py-2 text-sm w-36"
      />
      <input
        type="number"
        placeholder="Precio máximo"
        defaultValue={searchParams.get("maxPrice") ?? ""}
        onChange={(e) => updateFilter("maxPrice", e.target.value)}
        className="border rounded px-3 py-2 text-sm w-36"
      />
      <input
        type="text"
        placeholder="Tag"
        defaultValue={searchParams.get("tag") ?? ""}
        onChange={(e) => updateFilter("tag", e.target.value)}
        className="border rounded px-3 py-2 text-sm w-36"
      />
    </div>
  );
}