export function TestimonialSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Thousands of people are using our AI Assistant to improve their daily lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-500 font-bold mr-4">
                RS
              </div>
              <div>
                <h4 className="font-bold">Rahul Sharma</h4>
                <p className="text-sm text-slate-500">Product Manager</p>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              "The Smart Daily Planner has completely transformed how I manage my time. The AI suggestions are
              surprisingly accurate and have helped me become much more productive."
            </p>
            <div className="flex text-amber-400">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 font-bold mr-4">
                AP
              </div>
              <div>
                <h4 className="font-bold">Ananya Patel</h4>
                <p className="text-sm text-slate-500">Student</p>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              "As a student, the Work Helper has been invaluable. It helps me solve complex math problems and gives me
              step-by-step explanations that make learning much easier."
            </p>
            <div className="flex text-amber-400">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-500 font-bold mr-4">
                MK
              </div>
              <div>
                <h4 className="font-bold">Mohammed Khan</h4>
                <p className="text-sm text-slate-500">Chef</p>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              "The Meal Planner is a game-changer for me. It suggests creative recipes based on what I have in my
              kitchen, and the grocery lists save me so much time every week."
            </p>
            <div className="flex text-amber-400">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
