import { useState, useEffect } from 'react'

import { useSignIn, useSignUp, useClerk } from '@clerk/nextjs'

import { useRouter } from 'next/navigation'
import Link from "next/link"
import Script from 'next/script'


import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
import CustomGoogleAuth from './CustomGoogleAuth'

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
  // const { authenticateWithGoogleOneTap, handleGoogleOneTapCallback } = useClerk()

  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [code, setCode] = useState('')

  // //Inicializa Google One Tap
  // const initGoogleOneTap = async ()=>{
  //   console.log('Initializing Google One Tap...')
  //     const { google } = window
  //   console.log('Google object:', google)
  //     if (!google) return
  //     console.log('client_id:', process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID)
  //     google.accounts.id.initialize({
  //       client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       callback: async (response: any) => {
  //         try {
  //           const res = await authenticateWithGoogleOneTap({
  //             token: response.credential,
  //           })

  //           await handleGoogleOneTapCallback(res, {
  //             signInFallbackRedirectUrl: '/',
  //           })

  //           router.push('/')
  //         } catch (error) {
  //           console.error('Google One Tap Sign-In Error:', error)
  //           router.push('/sign-in')
  //         }
  //       }
  //     })

  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     google.accounts.id.prompt((notification: any) => {
  //       if (notification.isNotDisplayed())
  //         console.error('Google One Tap not displayed:', notification.getNotDisplayedReason())
  //       else if (notification.isSkippedMoment())
  //         console.error('Google One Tap skipped:', notification.getSkippedReason())
  //       else if (notification.isDismissedMoment())
  //         console.error('Google One Tap dismissed:', notification.getDismissedReason())
  //     })
    
  // }

  

  //Registro nuevo usuario
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
      console.error('SignUp Error: ', JSON.stringify(err, null, 2));
    }

  }

  //Inicio de sesión usuario existente
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
        console.error('SignIn incomplete: ', JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error('SignIn Error:', JSON.stringify(err, null, 2))

    }
  }

  //Verificación OTP email
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

        console.error('Verification incomplete: ', JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      console.error('Verification Error:', JSON.stringify(err, null, 2))
    }
  }


  //UI de verificación (2FA)
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


  //Form Principal
  return (<>
    <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />

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

        <CustomGoogleAuth path={path}/>
      </div>

      <div className="text-center text-sm text-foreground-muted">
        {path === '/sign-in' ? '¿No tienés una cuenta?' : '¿Ya tenés una cuenta?'}{" "}
        <Link href={path === '/sign-in' ? '/sign-up' : '/sign-in'} className="underline underline-offset-4  hover:text-foreground-base">
          {path === '/sign-in' ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </Link>
      </div>
    </form>
  </>
  )
}
