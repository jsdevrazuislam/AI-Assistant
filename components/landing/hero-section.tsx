import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your Personal <span className="text-emerald-500">AI Assistant</span> for Everything
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-lg">
              Five powerful AI tools to help you manage your daily life, finances, meals, work, and local needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-10">
            <div className="relative">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-400">AI Assistant</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold mr-3">
                        A
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 max-w-[80%]">
                        <p className="text-slate-800 dark:text-slate-200">
                          Hello! I'm your AI Assistant. How can I help you today?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-end">
                      <div className="bg-emerald-500 text-white rounded-lg p-3 max-w-[80%]">
                        <p>I need help managing my schedule for tomorrow.</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold ml-3">
                        U
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold mr-3">
                        A
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 max-w-[80%]">
                        <p className="text-slate-800 dark:text-slate-200">
                          I'll help you organize your day! Based on your calendar, I recommend starting with a focus
                          session at 9 AM, followed by your team meeting at 11 AM. Would you like me to create a
                          complete schedule?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
