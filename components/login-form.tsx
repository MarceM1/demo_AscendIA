import { useSignIn, useSignUp } from '@clerk/nextjs'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

interface LoginFormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  path: string;
}

export function LoginForm({
  className,
  path,
  ...props
}: LoginFormProps) {

  const { isLoaded, setActive, signUp } = useSignUp()
  const { isLoaded: isLoadedSignIn, signIn, setActive: setActiveSignIn } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [code, setCode] = useState('')

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoaded) return

    try {
      // console.log('Form submitted with:', { emailAddress, password });

      await signUp.create({
        emailAddress: (event.target as HTMLFormElement).email.value,
        password: (event.target as HTMLFormElement).password.value,
        
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerifying(true)

    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }

  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isLoadedSignIn) return

    try {
      const signInAttempt = await signIn?.create({
        identifier: (event.target as HTMLFormElement).email.value,
        password: (event.target as HTMLFormElement).password.value,
      })

      if (signInAttempt?.status === 'complete') {
        await setActiveSignIn({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask)
              return
            }
            await router.push('/')
          }
        })
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2))

    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })


      if (signUpAttempt.status === 'complete') {
        await setActive({
          session: signUpAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {

              console.log(session?.currentTask)
              return
            }

            await router.push('/')
          },
        })
      } else {

        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }


  if (verifying) {

    return (
      <form onSubmit={handleVerify}>
        <Card className='bg-background-dark !outline-foreground-muted'>
          <CardHeader>
            <CardTitle className='text-foreground-base'>Verificá tu correo</CardTitle>
            <CardDescription className='text-foreground-muted'>Ingresa tu código de verificación</CardDescription>
          </CardHeader>
          <CardContent>
            <InputOTP maxLength={6} value={code} id="code" name="code" onChange={(value) => setCode(value)} >
              <InputOTPGroup className='font-inter font-bold text-accent'>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup className='font-inter font-bold text-accent-muted'>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full text-foreground-base bg-foreground-light hover:bg-background-base transition-all duration-300">
              Verify
            </Button>
          </CardFooter>
        </Card>
      </form>
    )
  }



  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={path === '/sign-in' ? handleSubmit : handleSignUp}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-foreground-base">{path === '/sign-in' ? 'Ingresa a tu cuenta' : 'Crea una nueva cuenta'}</h1>
        <p className="text-foreground-muted text-sm text-balance">
          {path === '/sign-in' ? 'Ingresa tu email debajo para iniciar sesión' : 'Ingresa tu email para crear una nueva cuenta'}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email" className='text-foreground-base'>Email</Label>
          <Input
            id="email"
            type="email"
            name='email'
            placeholder="m@ejemplo.com"
            required
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className='!bg-background-base border-base-border'
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className='text-foreground-base'>Contraseña</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline text-foreground-muted"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='!bg-background-base border-base-border'
          />
        </div>
        <Button type="submit" className="w-full text-foreground-base bg-background-light gradient-hover shadow_sm-hover">
          {path === '/sign-in' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </Button>
        <div className="after:border-base-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t ">
          <span className="bg-background-dark relative z-10 px-2">
            O continua con
          </span>
        </div>

        <Button className="w-full flex items-center gap-2 group bg-background-light gradient-hover shadow_sm-hover ">

          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"  >
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>

          <p className='text-foreground-muted group-hover:text-foreground-base'>{path === '/sign-in' ? 'Inicio' : 'Registro'} con Google</p>

        </Button>
      </div>
      
      <div className="text-center text-sm text-foreground-muted">
        {path === '/sign-in' ? '¿No tienés una cuenta?' : '¿Ya tenés una cuenta?'}{" "}
        <Link href={path === '/sign-in' ? '/sign-up' : '/sign-in'} className="underline underline-offset-4  hover:text-foreground-base">
          {path === '/sign-in' ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </Link>
      </div>
    </form>
  )
}
