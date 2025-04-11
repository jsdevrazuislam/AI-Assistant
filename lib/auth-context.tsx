"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  register: (name: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Register a new user
  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would be an API call to your backend
    // For demo purposes, we'll simulate a successful registration

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email is already in use
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
    if (existingUsers.some((u: any) => u.email === email)) {
      throw new Error("Email already in use")
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In a real app, NEVER store passwords in localStorage or client-side
    }

    // Save to "database"
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]))

    // Log user in
    const userData = { id: newUser.id, name: newUser.name, email: newUser.email }
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  // Login a user
  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call to your backend
    // For demo purposes, we'll simulate a successful login

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check credentials
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.email === email && u.password === password)

    if (!user) {
      throw new Error("Invalid email or password")
    }

    // Log user in
    const userData = { id: user.id, name: user.name, email: user.email }
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  // Logout a user
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, loading, register, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
