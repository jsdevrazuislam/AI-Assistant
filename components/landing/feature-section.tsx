import { Calendar, DollarSign, Utensils, FileText, MapPin } from "lucide-react"

export function FeatureSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Five Powerful AI Tools in One Platform</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Our AI-powered tools help you manage every aspect of your life with ease and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="flex flex-col items-start">
            <div className="w-14 h-14 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-5">
              <Calendar className="h-7 w-7 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Daily Planner</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              AI-powered planning that analyzes your habits and deadlines to create the perfect schedule. Add tasks with
              voice commands and get personalized productivity tips.
            </p>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              "কাল সকাল ১০টায় ডাক্তারের অ্যাপয়েন্টমেন্ট সেট করো"
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-start">
            <div className="w-14 h-14 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-5">
              <DollarSign className="h-7 w-7 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Personal Finance Helper</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Track your income and expenses with our AI financial advisor. Get automatic savings suggestions and
              personalized tips to optimize your budget.
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              "এই মাসে তুমি ২০% বেশি খরচ করেছ ফুডে, পরের মাসে কমানোর টিপস..."
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-start">
            <div className="w-14 h-14 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-5">
              <Utensils className="h-7 w-7 text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Meal Planner</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Create personalized meal plans based on your dietary preferences, budget, and available time. Get
              automatic grocery lists for your recipes.
            </p>
            <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
              "এই রেসিপির জন্য তোমার লাগবে: পেঁয়াজ, টমেটো, চিকেন..."
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-start">
            <div className="w-14 h-14 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-5">
              <FileText className="h-7 w-7 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Work Helper</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Scan documents, emails, and files for AI-powered suggestions. Get help with code, math, and science
              problems, plus assistance with emails and presentations.
            </p>
            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">"এই অংকটা স্টেপ বাই স্টেপ সমাধান করো"</p>
          </div>

          {/* Feature 5 */}
          <div className="flex flex-col items-start md:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 rounded-lg bg-rose-100 dark:bg-rose-900 flex items-center justify-center mb-5">
              <MapPin className="h-7 w-7 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Local Assistant</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Get location-based recommendations for services and businesses near you. Use voice or chat to find exactly
              what you need in your area.
            </p>
            <p className="text-sm text-rose-600 dark:text-rose-400 font-medium">"আমার কাছে সস্তায় ল্যাপটপ রিপেয়ার করে কে?"</p>
          </div>
        </div>
      </div>
    </section>
  )
}
