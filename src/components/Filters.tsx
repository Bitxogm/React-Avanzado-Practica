"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import {
  SearchIcon,
  PackageIcon,
  TagIcon,
  XIcon,
} from "@primer/octicons-react";

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tagInput, setTagInput] = useState(searchParams.get("tag") ?? "");

  // Debounce para el filtro de tags
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (tagInput) {
        params.set("tag", tagInput);
      } else {
        params.delete("tag");
      }
      router.push(`/?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [tagInput, router, searchParams]);

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

  // Tags disponibles en los datos
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

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Buscar..."
            defaultValue={searchParams.get("search") ?? ""}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="border rounded px-8 py-2 text-sm w-full"
          />
        </div>
        <div className="relative w-36">
          <PackageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="number"
            placeholder="Mín."
            defaultValue={searchParams.get("minPrice") ?? ""}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="border rounded px-8 py-2 text-sm w-full"
          />
        </div>
        <div className="relative w-36">
          <PackageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="number"
            placeholder="Máx."
            defaultValue={searchParams.get("maxPrice") ?? ""}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="border rounded px-8 py-2 text-sm w-full"
          />
        </div>
        <div className="relative w-40">
          <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Buscar tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="border rounded px-8 py-2 text-sm w-full"
          />
          {tagInput && (
            <button
              onClick={() => setTagInput("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <XIcon size={16} />
            </button>
          )}
          {tagInput && filteredTags.length > 0 && (
            <div className="absolute top-full mt-1 w-full border rounded bg-white dark:bg-slate-900 shadow-lg z-10">
              {filteredTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setTagInput(tag)}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  <TagIcon size={14} className="text-blue-500" />
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {tagInput && (
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <TagIcon size={16} className="text-blue-500" />
          Buscando por tag: <span className="font-semibold text-blue-600 dark:text-blue-400">{tagInput}</span>
        </div>
      )}
    </div>
  );
}