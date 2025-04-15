"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Calendar, DollarSign, Utensils, FileText, MapPin } from "lucide-react"
import { HeroSection } from "@/components/landing/hero-section"
import { FeatureSection } from "@/components/landing/feature-section"
import { TestimonialSection } from "@/components/landing/testimonial-section"
import { CTASection } from "@/components/landing/cta-section"
import { useUser } from '@clerk/nextjs'

export default function HomePage() {

  const { user } = useUser()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-emerald-500" />
            <span className="font-bold text-xl">AI Assistant</span>
          </div>
          <div className="flex items-center space-x-4">
            {
              user ? <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link> : <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </>
            }
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeatureSection />

        {/* AI Tools Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our AI Tools</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Powerful AI-powered tools to help you manage your daily life, finances, meals, work, and local needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Tool 1 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-emerald-500" />
                  </div>
                  <CardTitle>Smart Daily Planner</CardTitle>
                  <CardDescription>AI-powered planning and task management</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Auto-schedule generator based on your habits and deadlines</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Voice command task addition</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Personalized productivity tips</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Tool 2 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-blue-500" />
                  </div>
                  <CardTitle>Personal Finance Helper</CardTitle>
                  <CardDescription>AI-powered financial management</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Income and expense tracking with automatic savings suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>AI financial advisor with personalized tips</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Budget optimization recommendations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Tool 3 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-4">
                    <Utensils className="h-6 w-6 text-amber-500" />
                  </div>
                  <CardTitle>Meal Planner</CardTitle>
                  <CardDescription>AI-powered meal planning and grocery lists</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Personalized meal plans based on dietary preferences</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Automatic grocery list generation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Budget-friendly recipe recommendations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Tool 4 */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-purple-500" />
                  </div>
                  <CardTitle>Work Helper</CardTitle>
                  <CardDescription>AI-powered work and study assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Document scanning with AI suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Code, math, and science problem solver</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Email and presentation assistance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Tool 5 */}
              <Card className="hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-900 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-rose-500" />
                  </div>
                  <CardTitle>Local Assistant</CardTitle>
                  <CardDescription>AI-powered local recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Location-based service recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Voice and chat-based local search</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Personalized local business suggestions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-emerald-500" />
                <span className="font-bold text-xl">AI Assistant</span>
              </div>
              <p className="text-slate-400">
                AI-powered tools to help you manage your daily life, finances, meals, work, and local needs.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Features</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Smart Daily Planner</li>
                <li>Personal Finance Helper</li>
                <li>Meal Planner</li>
                <li>Work Helper</li>
                <li>Local Assistant</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} AI Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
