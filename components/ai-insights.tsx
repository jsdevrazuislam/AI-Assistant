"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, RefreshCw, Clock, Lightbulb } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"


interface AIInsightsProps {
  schedule: string[]
  productivityTip: string
  isLoading: boolean
  onRefresh: () => void
}

export default function AIInsights({ schedule, productivityTip, isLoading, onRefresh }: AIInsightsProps) {

  return (
    <>
      {/* AI Schedule Recommendations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg font-medium">AI Schedule Optimizer</CardTitle>
            <CardDescription>Recommended schedule for today</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Brain className="h-12 w-12 text-slate-300 animate-pulse mb-4" />
              <p className="text-slate-500 text-sm">AI is analyzing your tasks...</p>
            </div>
          ) : schedule.length > 0 ? (
            <ScrollArea className="h-[250px]">
              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start"
                  >
                    <Clock className="h-5 w-5 text-slate-500 mr-3 mt-0.5" />
                    <p className="flex-1">{item}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-slate-500 text-sm">No schedule recommendations yet</p>
              <Button variant="link" onClick={onRefresh} className="mt-2">
                Generate recommendations
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Productivity Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center"><Lightbulb className="h-5 w-5 text-amber-500 mr-3 mt-0.5 mb-2" /> Productivity Insight </CardTitle>
          <CardDescription>AI-generated tips for better focus</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Brain className="h-5 w-5 text-slate-300 animate-pulse mr-2" />
              <p className="text-slate-500 text-sm">Generating insight...</p>
            </div>
          ) : productivityTip ? (
            <div  dangerouslySetInnerHTML={{ __html: productivityTip }} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col items-start" />
              
          ) : (
            <p className="text-slate-500 text-sm text-center py-4">No productivity tips available</p>
          )}
        </CardContent>
      </Card>
    </>
  )
}
