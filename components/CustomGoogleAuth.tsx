/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useClerk, useSignIn, useSignUp } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

// import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

declare global {
    interface Window {
        google: any
    }
}


export default function CustomGoogleAuth({ path }: { path: string }) {

    const { signIn } = useSignIn()
    const { signUp } = useSignUp()

    const authMethod = path === '/sign-in' ? signIn : signUp
    // const { authenticateWithGoogleOneTap, handleGoogleOneTapCallback } = useClerk()
    // const router = useRouter()

    const [debugInfo, setDebugInfo] = useState<string[]>([])
    const isDev = process.env.NODE_ENV !== 'production'

    //OAUTH REDIRECT
    const handleGoogleOAuth = async () => {
        try {
            setDebugInfo((prev) => [...prev, '🟢 Iniciando flujo OAuth redirect con Google...'])
            await authMethod?.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sso-callback',
                redirectUrlComplete: '/dashboard',
            })
        } catch (err) {
            console.error('❌ Error en OAuth Google:', err)
            setDebugInfo((prev) => [...prev, '❌ Error en flujo OAuth clásico.'])
        }
    }

    // TODO: Implementar mas adelante google one tap login
    //GOOGLE ONE TAP 
    // useEffect(() => {
    //     const initializeOneTap = async () => {
    //         const { google } = window
    //         if (!google) {
    //             setDebugInfo((prev) => [...prev, '⚠️ Google API no cargada todavía.'])
    //             return
    //         }

    //         setDebugInfo((prev) => [...prev, '🚀 Inicializando Google One Tap...'])

    //         google.accounts.id.initialize({
    //             client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!,
    //             callback: async (response: any) => {
    //                 try {
    //                     setDebugInfo((prev) => [...prev, '✅ Token recibido desde One Tap, autenticando en Clerk...'])
    //                     const res = await authenticateWithGoogleOneTap({ token: response.credential })

    //                     await handleGoogleOneTapCallback(res, {
    //                         signInFallbackRedirectUrl: '/',
    //                     })

    //                     setDebugInfo((prev) => [...prev, '✅ Usuario autenticado correctamente con One Tap.'])
    //                     router.push('/')
    //                 } catch (error) {
    //                     console.error('❌ Error en One Tap callback:', error)
    //                     setDebugInfo((prev) => [...prev, '❌ Error durante el callback de Clerk con One Tap.'])
    //                     router.push('/sign-in')
    //                 }
    //             },
    //             ux_mode: 'popup',
    //             cancel_on_tap_outside: false,
    //         })

    //         google.accounts.id.prompt((notification: any) => {
    //             if (notification.isNotDisplayed()) {
    //                 const reason = notification.getNotDisplayedReason()
    //                 console.warn('🚫 One Tap no mostrado:', reason)
    //                 setDebugInfo((prev) => [...prev, `🚫 One Tap no mostrado: ${reason}`])
    //             }
    //             if (notification.isSkippedMoment()) {
    //                 const reason = notification.getSkippedReason()
    //                 console.warn('⏩ One Tap omitido:', reason)
    //                 setDebugInfo((prev) => [...prev, `⏩ One Tap omitido: ${reason}`])
    //             }
    //             if (notification.isDismissedMoment()) {
    //                 const reason = notification.getDismissedReason()
    //                 console.warn('❎ One Tap cerrado:', reason)
    //                 setDebugInfo((prev) => [...prev, `❎ One Tap cerrado: ${reason}`])
    //             }
    //         })
    //     }

    //     const timeout = setTimeout(() => initializeOneTap(), 1500)
    //     return () => clearTimeout(timeout)
    // }, [authenticateWithGoogleOneTap, handleGoogleOneTapCallback, router])

    return (
        <>
            <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />

            <Button
                type="button"
                onClick={handleGoogleOAuth}
                className="w-full flex items-center gap-2 group bg-background-light gradient-hover shadow_sm-hover"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <p className="text-foreground-muted group-hover:text-foreground-base">
                    {path === '/sign-in' ? 'Inicia con Google' : 'Regístrate con Google'}
                </p>
            </Button>
{/* 
            {isDev && debugInfo.length > 0 && (
                <div className="p-3 rounded-md border border-base-border bg-background-dark text-xs font-mono text-foreground-muted overflow-auto max-h-[180px]">
                    <p className="text-foreground-base font-semibold mb-1">🧩 Google One Tap Debug:</p>
                    {debugInfo.map((line, i) => (
                        <p key={i} className="whitespace-pre-wrap">
                            {line}
                        </p>
                    ))}
                </div>
            )} */}
        </>
    )
}
