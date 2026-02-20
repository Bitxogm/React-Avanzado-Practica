import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ad } from "@/types/ad";

interface AdCardProps {
  ad: Ad;
}

export function AdCard({ ad }: AdCardProps) {
  return (
    <Link href={`/ads/${ad.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle>{ad.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{ad.description}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {ad.tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-primary font-bold text-lg">{ad.price}€</p>
        </CardFooter>
      </Card>
    </Link>
  );
}