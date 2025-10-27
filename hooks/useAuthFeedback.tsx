/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'

/**
 * A custom hook to manage authentication feedback messages.
 * It provides state variables and functions to set success and error messages.
 */
export function useAuthFeedback() {
    // const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>('')

    const handleClerkError = (err: any) => {
        console.error('Clerk Error:', JSON.stringify(err, null, 2))

        const clerkError = err?.errors?.[0]
        const errorCode = clerkError?.code || 'unknown_error'
        const errorMessage = clerkError?.longMessage || clerkError?.message || 'An unknown error occurred.'

        console.log('Error recibido:', errorCode, '-', errorMessage)

        let uiMessage: string
        switch (errorCode) {
            case 'form_identifier_not_found':
            case 'form_password_incorrect':
                uiMessage = 'No se ha encontrado una cuenta con estas credenciales. Por favor, verifica e inténtalo de nuevo.'
                break

            case 'form_identifier_exists':
                uiMessage = 'Ya existe una cuenta asociada a este correo. Iniciá sesión en lugar de registrarte.'
                break

            case 'strategy_for_user_invalid':
                uiMessage = 'Este correo está vinculado a otro método de acceso. Probá iniciar sesión con Google.'
                break

            case 'form_password_length_too_short':
                uiMessage = 'La contraseña es demasiado corta. Probá con una más segura.'
                break

            case 'form_password_length_too_long':
                uiMessage = 'La contraseña es demasiado larga.'
                break

            case 'form_password_not_strong_enough':
                uiMessage = 'La contraseña no es lo suficientemente segura.'
                break
            
                case 'form_password_pwned':
                uiMessage = 'La contraseña ha sido comprometida en recientes ataques. Por seguridad, elegí otra contraseña.'
                break

            case 'token_expired':
                uiMessage = 'El código ha expirado. Solicitá uno nuevo.'
                break

            case 'token_invalid':
                uiMessage = 'El código ingresado no es válido.'
                break

            default:
                uiMessage = 'Ocurrió un error inesperado. Intentalo más tarde.'
                break
        }

        setMessage(uiMessage)
    }
    return {
        handleClerkError,
        message
    }
}



