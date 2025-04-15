"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Utensils, FileText, MapPin, ArrowRight, MessageSquare } from "lucide-react"
import { useUser } from '@clerk/nextjs'

export default function DashboardOverview() {

  const { user } = useUser()

  const features = [
    {
      name: "AI Chat",
      description: "Chat with your AI assistant about anything",
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      href: "/dashboard/chat",
    },
    {
      name: "Smart Daily Planner",
      description: "Manage your schedule with AI-powered planning",
      icon: Calendar,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
      href: "/dashboard/planner",
    },
    {
      name: "Personal Finance Helper",
      description: "Track expenses and get savings suggestions",
      icon: DollarSign,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      href: "/dashboard/finance",
    },
    {
      name: "Meal Planner",
      description: "Create meal plans and grocery lists",
      icon: Utensils,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      href: "/dashboard/meals",
    },
    {
      name: "Work Helper",
      description: "Get help with documents, code, and math",
      icon: FileText,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      href: "/dashboard/work",
    },
    {
      name: "Local Assistant",
      description: "Find services and businesses near you",
      icon: MapPin,
      color: "text-rose-500",
      bgColor: "bg-rose-100 dark:bg-rose-900/30",
      href: "/dashboard/local",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {`${user?.firstName} ${user?.lastName}`}!</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Here's an overview of your AI Assistant tools and recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.name} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <CardTitle>{feature.name}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={feature.href}>
                <Button variant="outline" className="w-full">
                  Open
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>Personalized recommendations for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="font-medium mb-2">Productivity Tip</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Based on your schedule, try using the Pomodoro technique for your work sessions today.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="font-medium mb-2">Budget Alert</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  You've spent 20% more on dining this month. Consider cooking at home more often.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <p className="font-medium mb-2">Meal Suggestion</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Try our new vegetarian recipes that match your dietary preferences.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}
