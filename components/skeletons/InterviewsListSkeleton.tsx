import InterviewCardSkeleton from "./InterviewCardSkeleton";

export function InterviewsListSkeleton() {
  return (
    <div className="space-y-4 max-w-full w-4xl mx-auto">
      <InterviewCardSkeleton />
      <InterviewCardSkeleton />
      <InterviewCardSkeleton />
      <InterviewCardSkeleton />
    </div>
  );
}
