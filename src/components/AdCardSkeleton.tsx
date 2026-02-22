import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function AdCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image */}
      <div className="w-full h-48 animate-pulse bg-gray-200 dark:bg-gray-700" />
      <CardHeader>
        <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </CardHeader>
      <CardContent>
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-700 mt-1" />
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-6 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </CardFooter>
    </Card>
  );
}