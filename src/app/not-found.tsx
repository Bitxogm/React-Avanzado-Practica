import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <h2 className="text-2xl font-semibold">Página no encontrada</h2>
      <p className="text-muted-foreground">El anuncio que buscas no existe.</p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
      >
        Volver al inicio
      </Link>
    </div>
  );
}