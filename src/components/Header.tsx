import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          Marketplace
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm hover:text-primary transition-colors">
            Anuncios
          </Link>
          <Link href="/ads/create" className="text-sm hover:text-primary transition-colors">
            Publicar
          </Link>
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};