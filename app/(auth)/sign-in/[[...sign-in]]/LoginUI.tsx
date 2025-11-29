import AsideLoginForm from '@/components/AsideLoginForm'
import IconLoginPage from '@/components/IconLoginPage'
import { LoginForm } from '@/components/login-form'

export default function LoginUI () {
  return (
   <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-background-dark">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium max-md:text-3xl">
            <div className="bg-background-light flex size-6 max-md:size-8 items-center justify-center rounded-md">
              <IconLoginPage />
            </div>
            <p className="font-kodchasan text-foreground-base">Ascend<span className="text-accent">IA</span></p>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="hidden items-center justify-center relative lg:flex lg-flex-col bg-background-base">
        <AsideLoginForm />
      </div>
    </div>
  )
}
