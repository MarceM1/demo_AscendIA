import { Skeleton } from "@/components/ui/skeleton";

export function NewInterviewFormSkeleton() {
  return (
    <div className="space-y-8 max-w-[1092px] w-full mx-auto flex flex-col gap-8">

      {/* AREA */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" /> {/* Label */}
        <Skeleton className="h-4 w-72" /> {/* Description */}

        <div className="flex gap-2 flex-wrap mt-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-fit flex items-center space-x-3 border border-base-border rounded-md bg-background-light p-4"
            >
              <Skeleton className="h-4 w-4 rounded-full" /> {/* Radio */}
              <Skeleton className="h-4 w-20" /> {/* Label */}
            </div>
          ))}
        </div>
      </div>

      {/* INTERVIEWER */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-96" />

        <div className="flex gap-2 flex-wrap mt-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-fit flex items-center space-x-3 border border-base-border rounded-md bg-background-light p-4"
            >
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* POSITION */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-80" />

        <Skeleton className="h-32 w-full rounded-md border border-base-border bg-background-base" />
      </div>

      {/* ACTIONS */}
      <div className="flex w-full flex-col gap-2 items-end">
        <div className="flex gap-2 w-fit">
          <Skeleton className="h-10 w-40 rounded-md" /> {/* Submit */}
          <Skeleton className="h-10 w-28 rounded-md" /> {/* Back */}
        </div>
        <Skeleton className="h-3 w-64" /> {/* Small footer text */}
      </div>

    </div>
  );
}
