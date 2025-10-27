/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Spinner } from './ui/spinner'
import { useAuthFeedback } from '@/hooks/useAuthFeedback'
import { AlertCircle } from 'lucide-react'

declare global {
    interface Window {
        google: any
    }
}



export default function CustomGoogleAuth({ path }: { path: string }) {

    const [isLoading, setIsLoading] = useState(false)

    const { signIn } = useSignIn()
    const { signUp } = useSignUp()

    const { handleClerkError, message } = useAuthFeedback()

    // const { authenticateWithGoogleOneTap, handleGoogleOneTapCallback } = useClerk()
    // const router = useRouter()

    // const [debugInfo, setDebugInfo] = useState<string[]>([])
    // const isDev = process.env.NODE_ENV !== 'production'

    //OAUTH REDIRECT    
    const authMethod = path === '/sign-in' ? signIn : signUp
    const handleGoogleOAuth = async () => {
        try {


            setIsLoading(true)

            // setDebugInfo((prev) => [...prev, ' Iniciando flujo OAuth redirect con Google...'])
            await authMethod?.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/dashboard',
            })


        } catch (err) {
            handleClerkError(err)
            console.error(' Error en OAuth Google:', err)
            // setDebugInfo((prev) => [...prev, ' Error en flujo OAuth clásico.'])
        }finally{
            setIsLoading(false)
        }
    }


    // TODO: Mover la inicialización de One Tap a un hook (useGoogleOneTap)
    //TODO: Mostrar “Iniciando sesión…” o “Autenticado” según progreso.
    // TODO: Si FedCM falla, mostrar un fallback UI claro (“Tu navegador bloqueó el inicio rápido”). 

    //TODO: Controlar Entorno:
    //     const isFedCMAvailable = typeof window.IdentityCredential !== 'undefined'
    // if (isFedCMAvailable) initOneTap()
    // else fallbackToOAuth()

    // TODO: Login avanzado solo en dev: Logs a consola en NODE_ENV=development o a Sentry en producción.

    ///GOOGLE ONE TAP 
    {/*
    useEffect(() => {
        console.log('Inicializando Google One Tap...')
        const initializeOneTap = async () => {
            const { google } = window
            if (!google) {
                return
            }

            console.log('Google One Tap disponible, inicializando...')
            console.log('Client ID:', process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID)

            if (!window.google?.accounts?.id) {
                console.error("⚠️ GSI Client no está disponible aún.");
            } else {
                console.log("✅ GSI Client cargado correctamente.");
            }


            console.log('Google: ', google)

            google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!,
                callback: async (response: any) => {
                    console.log('Inicializando Google One Tap con client_id...')

                    try {
                        console.log('Google One Tap callback recibido:', response)
                        const res = await authenticateWithGoogleOneTap({ token: response.credential })
                        console.log('token:', response.credential)

                        await handleGoogleOneTapCallback(res, {
                            signInFallbackRedirectUrl: '/',
                        })

                        router.push('/')
                    } catch (error) {
                        console.error('Error en One Tap callback:', error)
                        router.push('/sign-in')
                    }
                },
                ux_mode: 'popup',
                cancel_on_tap_outside: false,
            })

            google.accounts.id.prompt((notification: any) => {

                if (notification.isDismissedMoment()) {
                    const reason = notification.getDismissedReason()
                    console.warn('One Tap cerrado:', reason)
                }
            })
        }
        const timeout = setTimeout(() => initializeOneTap(), 1500)
        return () => clearTimeout(timeout)
    }, [authenticateWithGoogleOneTap, handleGoogleOneTapCallback, router])
    */}

    return (
        <>
            <Button
                type="button"
                onClick={handleGoogleOAuth}
                className="w-full flex items-center gap-2 group bg-background-light gradient-hover shadow_sm-hover"
                disabled={isLoading}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26ñ 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                {
                    !isLoading && (<p className="text-foreground-muted group-hover:text-foreground-base">
                        {path === '/sign-in' ? 'Inicia con Google' : 'Regístrate con Google'}
                    </p>)
                }
                {
                    isLoading && (
                        <>
                            <p className="text-foreground-muted group-hover:text-foreground-base">
                                Iniciando sesión

                            </p>
                            <Spinner
                                color='#4d4d4d'
                            />
                        </>
                    )
                }
            </Button>
            {message && (
                <div className="flex items-top justify-start gap-2">
                    <AlertCircle className='size-5 m-0 p-0 text-destructive ' />
                    <p className='text-xs text-destructive'>{message}</p>
                </div>
            )}
        </>

    )
}
