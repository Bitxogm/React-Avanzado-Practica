import { AdCardSkeleton } from "@/components/AdCardSkeleton";

export default function Loading() {
  return (
    <div>
      <div className="h-9 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <AdCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}