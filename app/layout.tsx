import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { dark } from '@clerk/themes'



const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "AI-powered tools for daily life, finances, meals, work, and local needs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" suppressHydrationWarning>
      <ClerkProvider appearance={{
        baseTheme: dark
      }}>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}


import './globals.css'