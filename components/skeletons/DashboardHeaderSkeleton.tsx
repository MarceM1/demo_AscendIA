import { Skeleton } from "@/components/ui/skeleton";

export function DashboardHeaderSkeleton() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-base-border px-4">
      <div className="flex gap-2 items-center">

        {/* SidebarTrigger placeholder */}
        <Skeleton className="h-8 w-8 rounded-md" />

        {/* Vertical separator */}
        <span className="w-px h-4 bg-base-border mx-2" />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          {/* Path (hidden in md in real version, but we show skeleton anyway) */}
          <Skeleton className="h-4 w-20 hidden md:block" />

          {/* Separator */}
          <Skeleton className="h-4 w-3 hidden md:block" />

          {/* Subpath */}
          <Skeleton className="h-4 w-28" />
        </div>

      </div>
    </header>
  );
}
