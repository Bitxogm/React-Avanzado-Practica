import Link from "next/link";

export default function AdNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="space-y-6 max-w-lg">
        <h1 className="text-9xl font-extrabold text-violet-600 dark:text-violet-500 tracking-widest drop-shadow-sm">
          404
        </h1>
        <div className="bg-violet-600 px-2 text-sm rounded rotate-12 absolute p-1 text-white select-none">
          Anuncio no encontrado
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Este anuncio no existe
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400">
          El anuncio que buscas no existe, fue eliminado o no está disponible.
        </p>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-violet-600 transition-all duration-200"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
