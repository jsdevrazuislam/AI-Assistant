import type React from "react"
import { SignUp } from '@clerk/nextjs'

export default function LoginPage() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
       <SignUp afterSignUpUrl='/dashboard' />
    </div>
  )
}
