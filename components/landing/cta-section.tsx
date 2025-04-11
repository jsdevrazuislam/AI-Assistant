import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-emerald-50 dark:bg-emerald-950/20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Daily Life?</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
          Join thousands of users who are already using our AI Assistant to improve their productivity, finances, meals,
          work, and local experiences.
        </p>
        <Link href="/register">
          <Button size="lg" className="px-8">
            Get Started for Free
          </Button>
        </Link>
      </div>
    </section>
  )
}
