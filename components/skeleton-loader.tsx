import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectSkeleton() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">
          <Skeleton className="h-10 w-40" />
        </h1>
        <Skeleton className="h-6 w-16" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-lg overflow-hidden bg-bg-gray-900 border border-border"
          >
            <Skeleton className="h-48 w-full bg-gray-900" />
            <div className="p-5 space-y-4">
              <Skeleton className="h-7 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="flex justify-between pt-2 bg-gray-900">
                <Skeleton className="h-8 w-20 bg-gray-950" />
                <Skeleton className="h-8 w-20 bg-gray-950" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
