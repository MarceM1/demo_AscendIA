'use client'
import dynamic from "next/dynamic";
import AsideLoginForm from "@/components/AsideLoginForm";
import IconLoginPage from "@/components/IconLoginPage";
import { Suspense } from "react";
import Loader from "@/components/Loader";
// import { LoginForm } from "@/components/login-form";

const LoginForm = dynamic(() => import("@/components/login-form"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-xs animate-pulse">
      <div className="h-40 bg-surface/30 rounded" />
    </div>
  ),
});

export default function LogupUI () {
        return (
            <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-background-dark">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium ">
            <div className="bg-background-light flex size-6 items-center justify-center rounded-md">
              <IconLoginPage />
            </div>
            <p className="font-kodchasan text-foreground-base ">Ascend<span className="text-accent">IA</span></p>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={<Loader/>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="hidden items-center justify-center relative lg:flex  lg-flex-col bg-background-base">
        <AsideLoginForm />
      </div>
    </div>
        )
         
}