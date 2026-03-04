"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function buildPages(currentPage: number, totalPages: number): number[] {
  const pages = new Set<number>();

  // Siempre mostrar primera y última página
  pages.add(1);
  pages.add(totalPages);

  // Siempre mostrar página actual
  pages.add(currentPage);

  // Mostrar páginas adyacentes (anterior y siguiente)
  pages.add(Math.max(1, currentPage - 1));
  pages.add(Math.min(totalPages, currentPage + 1));

  // Si tenemos muchas páginas, mostrar más contexto alrededor de la actual
  if (totalPages > 10) {
    pages.add(Math.max(1, currentPage - 2));
    pages.add(Math.min(totalPages, currentPage + 2));
  }

  return [...pages].sort((a, b) => a - b);
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function goToPage(page: number) {
    const safePage = Math.max(1, Math.min(totalPages, page));
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(safePage));
    replace(`${pathname}?${params.toString()}`);
  }

  const pages = buildPages(currentPage, totalPages);

  console.log("pages", { pages, currentPage, totalPages });

  return (
    <nav
      aria-label="Paginación de proyectos"
      className="mt-6 flex flex-wrap items-center gap-2"
    >
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded border border-border px-3 py-2 text-sm hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Anterior
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => goToPage(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`rounded px-3 py-2 text-sm hover:cursor-pointer ${page === currentPage
            ? "bg-primary text-primary-foreground"
            : "border border-border"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded border border-border px-3 py-2 text-sm hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Siguiente
      </button>

      <p className="ml-2 text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </p>
    </nav>
  );
}
