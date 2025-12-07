import { Skeleton } from "@/components/ui/skeleton";

export function DashSidebarSkeleton() {
  return (
    <aside className="h-screen flex !bg-background-base border-r border-base-border">

      {/* LEFT BAR – icon-only menu */}
      <div className="flex flex-col items-center justify-between w-[68px] bg-background-light border-r border-base-border rounded-xl ml-3 mt-2 mb-2 py-4 shadow-xl">

        {/* Top nav icons */}
        <div className="flex flex-col items-center gap-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-6 rounded-md" />
          ))}
        </div>

        {/* Bottom nav icons */}
        <div className="flex flex-col items-center gap-6 mb-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-6 rounded-md" />
          ))}
        </div>
      </div>

      {/* Vertical Separator */}
      <div className="w-px bg-base-border mx-1" />

      {/* RIGHT COLUMN – project name + section title + subitems */}
      <div className="flex flex-col flex-1 mt-2 pl-3 pr-4 w-[270px]">

        {/* HEADER: App name + selected nav */}
        <div className="border-b border-base-border pb-4 mb-2">
          <Skeleton className="h-6 w-36 mb-2" />  {/* AscendIA */}
          <Skeleton className="h-4 w-28" />       {/* selectedNavItem */}
        </div>

        {/* Subitems */}
        <div className="flex flex-col gap-3 mt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-md" />  {/* icon */}
              <Skeleton className="h-4 w-32" />            {/* title */}
            </div>
          ))}
        </div>

        {/* Push footer down */}
        <div className="flex-1" />

        {/* UserNav */}
        <div className="border-t border-base-border pt-4 pb-2 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />  {/* avatar */}
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-32" /> {/* name */}
            <Skeleton className="h-3 w-24" /> {/* email */}
          </div>
        </div>

      </div>

    </aside>
  );
}
