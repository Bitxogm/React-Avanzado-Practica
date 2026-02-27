"use client";

import Link from "next/link";
import { useEffect } from "react";
import { SearchIcon } from "@primer/octicons-react";

/**
 * ERROR BOUNDARY PARA DETALLES DE ANUNCIO
 * Atrapa errores específicos al cargar un anuncio por ID
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(`[ads/[id]/error]`, error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="space-y-6 max-w-lg">
        <div className="relative">
          <SearchIcon size={64} className="mx-auto text-violet-500 dark:text-violet-400" />
          <div className="bg-violet-500 px-3 text-xs font-bold rounded-full rotate-12 absolute top-0 left-1/2 transform -translate-x-1/2 p-1 text-white select-none shadow-lg">
            No encontrado
          </div>
        </div>

        <h1 className="text-7xl font-extrabold text-violet-600 dark:text-violet-500 tracking-widest drop-shadow-sm">
          404
        </h1>

        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          El anuncio no existe
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 wrap-break-word">
          {error.message || "El anuncio que buscas no existe, fue eliminado o no tienes acceso a él."}
        </p>

        {error.digest && (
          <p className="text-xs text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
            Digest: {error.digest}
          </p>
        )}

        <div className="pt-6 flex gap-3 justify-center flex-wrap">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-md bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-violet-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-all duration-200"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-gray-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-gray-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-all duration-200"
          >
            Volver a Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
