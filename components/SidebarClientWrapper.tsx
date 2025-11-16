"use client"

import { SidebarProvider } from "@/components/ui/sidebar"

export function SidebarClientWrapper({ children }: { children: React.ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>
}
