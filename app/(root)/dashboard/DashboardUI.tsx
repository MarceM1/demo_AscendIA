import { SidebarInset } from "@/components/ui/sidebar";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default function DashboardUI() {
    return (
        < section className="w-full h-full pr-2">

      <SidebarInset>
        <Suspense fallback={<Loader/>}>
          
        
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-background-base aspect-video rounded-xl" />
            <div className="bg-background-base aspect-video rounded-xl" />
            <div className="bg-background-base aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
        </Suspense>
      </SidebarInset>
    </section >
    )
}