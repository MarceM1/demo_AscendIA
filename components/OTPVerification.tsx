'use client'

import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card"
import {
  InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot
} from "@/components/ui/input-otp"
import { Button } from './ui/button'
import React from 'react'
import { OTPProps } from '@/types/types'



export default function OTPVerification({ code, setCode }: OTPProps) {
  const { isLoaded, setActive, signUp } = useSignUp()
  const router = useRouter()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return

    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code })

      if (attempt.status === 'complete') {
        await setActive({
          session: attempt.createdSessionId,
          navigate: () => router.push('/sso-callback')
        })
      } else {
        console.error("Verification incomplete", attempt)
      }
    } catch (err) {
      console.error("Verification error:", err)
    }
  }

  return (
    <form onSubmit={handleVerify}>
      <Card className='bg-background-dark !outline-foreground-muted'>
        <CardHeader>
          <CardTitle className='text-foreground-base'>Verificá tu correo</CardTitle>
          <CardDescription className='text-foreground-muted'>
            Ingresá tu código de verificación
          </CardDescription>
        </CardHeader>

        <CardContent>
          <InputOTP maxLength={6} value={code} onChange={setCode}>
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
          <Button type="submit" className="w-full">Verify</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
