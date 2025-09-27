'use client'

import { LogInIcon } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { usePathname } from "next/navigation"
import AsideLoginForm from "@/components/AsideLoginForm"

export default function LoginPage() {
  const pathname = usePathname()
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-background-secondary">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium max-md:text-3xl">
            <div className="bg-primary text-primary-foreground flex size-6 max-md:size-8 items-center justify-center rounded-md">
              <LogInIcon className="size-4 text-accent-muted" />
            </div>
            <p className="font-kodchasan">Ascend<span className="text-accent">IA</span></p>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm path={pathname} />
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-center relative lg:flex  lg-flex-col">
        <AsideLoginForm />
      </div>
    </div>
  )
}
