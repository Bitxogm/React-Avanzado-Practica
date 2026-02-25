import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Ad } from "@/types/ad";
import { TagIcon, PackageIcon } from "@primer/octicons-react";

interface AdCardProps {
  ad: Ad;
}

export function AdCard({ ad }: AdCardProps) {
  return (
    <Link href={`/ads/${ad.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
        {ad.image && (
          <div className="relative w-full h-48">
            <Image
              src={ad.image}
              alt={ad.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle>{ad.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{ad.description}</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {ad.tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1"
              >
                <TagIcon size={12} />
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-primary font-bold text-lg flex items-center gap-1">
            <PackageIcon size={18} />
            {ad.price}€
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}