'use client'

import { GalleryVerticalEnd } from "lucide-react"

import { usePathname } from "next/navigation"
import { LoginForm } from "@/components/login-form"
import AsideLoginForm from "@/components/AsideLoginForm"

export default function LoginPage() {
  const pathname = usePathname()

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-background-dark">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium ">
            <div className="bg-background-light flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4 text-accent" />
            </div>
            <p className="font-kodchasan text-foreground-base ">Ascend<span className="text-accent">IA</span></p>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm path={pathname} />
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-center relative lg:flex  lg-flex-col bg-background-base">
        <AsideLoginForm />
      </div>
    </div>
  )
}
