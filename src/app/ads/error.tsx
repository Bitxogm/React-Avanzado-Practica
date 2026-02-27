"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ExclamationIcon } from "@primer/octicons-react";

/**
 * ERROR BOUNDARY PARA SECCIÓN DE ANUNCIOS
 * Atrapa errores generales en la sección /ads
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(`[ads/error]`, error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="space-y-6 max-w-lg">
        <div className="relative">
          <ExclamationIcon size={64} className="mx-auto text-amber-500 dark:text-amber-400" />
          <div className="bg-amber-500 px-3 text-xs font-bold rounded-full rotate-12 absolute top-0 left-1/2 transform -translate-x-1/2 p-1 text-white select-none shadow-lg">
            Algo salió mal
          </div>
        </div>

        <h1 className="text-7xl font-extrabold text-amber-600 dark:text-amber-500 tracking-widest drop-shadow-sm">
          ⚠️
        </h1>

        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Problemas en la sección de Anuncios
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 wrap-break-word">
          {error.message || "Ocurrió un problema inesperado. Por favor intenta de nuevo."}
        </p>

        {error.digest && (
          <p className="text-xs text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
            Digest: {error.digest}
          </p>
        )}

        <div className="pt-6 flex gap-3 justify-center flex-wrap">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-md bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 transition-all duration-200"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-gray-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-all duration-200"
          >
            Ir a Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
