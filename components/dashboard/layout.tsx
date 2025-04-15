"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, Calendar, DollarSign, Utensils, FileText, MapPin, Menu, LogOut, MessageSquare } from "lucide-react"
import { useUser, useClerk } from '@clerk/nextjs'


interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { signOut } = useClerk()
  const { user } = useUser()

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Brain,
      current: pathname === "/dashboard",
    },
    {
      name: "AI Chat",
      href: "/dashboard/chat",
      icon: MessageSquare,
      current: pathname === "/dashboard/chat",
    },
    {
      name: "Smart Planner",
      href: "/dashboard/planner",
      icon: Calendar,
      current: pathname === "/dashboard/planner",
    },
    {
      name: "Finance Helper",
      href: "/dashboard/finance",
      icon: DollarSign,
      current: pathname === "/dashboard/finance",
    },
    {
      name: "Meal Planner",
      href: "/dashboard/meals",
      icon: Utensils,
      current: pathname === "/dashboard/meals",
    },
    {
      name: "Work Helper",
      href: "/dashboard/work",
      icon: FileText,
      current: pathname === "/dashboard/work",
    },
    {
      name: "Local Assistant",
      href: "/dashboard/local",
      icon: MapPin,
      current: pathname === "/dashboard/local",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <Brain className="h-6 w-6 text-emerald-500" />
                <span className="font-bold text-xl">AI Assistant</span>
              </div>
            </div>
            <div className="flex-1 py-2">
              <nav className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      item.current
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-500"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <Button onClick={() => signOut({ redirectUrl: '/login' })} variant="ghost" className="w-full justify-start text-red-500">
                <LogOut className="mr-3 h-5 w-5" />
                Log out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex items-center flex-shrink-0 px-4 space-x-3 mb-5">
              <Brain className="h-6 w-6 text-emerald-500" />
              <span className="font-bold text-xl">AI Assistant</span>
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    item.current
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-500"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-slate-200 dark:border-slate-700 p-4">
            <div className="flex items-center">
              <div>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                    {user?.firstName?.slice(0,1)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {`${user?.firstName} ${user?.lastName}`}
                </p>
                <Button onClick={() => signOut({ redirectUrl: '/login' })} variant="ghost" className="px-0 py-1 h-auto text-xs text-red-500">
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 md:hidden">
          <Button
            variant="ghost"
            className="px-4 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex items-center">
              <Brain className="h-6 w-6 text-emerald-500" />
              <span className="font-bold text-xl ml-2">AI Assistant</span>
            </div>
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
              <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                    {user?.firstName?.slice(0,1)}
                  </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
