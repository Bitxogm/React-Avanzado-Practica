import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { PlusIcon, SignInIcon, HomeIcon } from "@primer/octicons-react";

export const Header = () => {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          Marketplace
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
            <HomeIcon size={16} />
            Anuncios
          </Link>
          <Link href="/ads/create" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
            <PlusIcon size={16} />
            Publicar
          </Link>
          <ThemeToggle />
          <Button asChild size="sm" className="flex items-center gap-2">
            <Link href="/login">
              <SignInIcon size={16} />
              Login
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};