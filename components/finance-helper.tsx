"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, DollarSign, TrendingUp, TrendingDown, Plus, Loader2 } from "lucide-react"
import { generateFinancialTips } from "@/lib/ai-helpers"

const sampleExpenses = [
  { id: 1, category: "Food", amount: 12500, date: "2023-04-01" },
  { id: 2, category: "Transportation", amount: 5000, date: "2023-04-03" },
  { id: 3, category: "Entertainment", amount: 3000, date: "2023-04-05" },
  { id: 4, category: "Utilities", amount: 8000, date: "2023-04-10" },
  { id: 5, category: "Food", amount: 9000, date: "2023-04-15" },
]

const sampleIncome = [
  { id: 1, source: "Salary", amount: 50000, date: "2023-04-01" },
  { id: 2, source: "Freelance", amount: 15000, date: "2023-04-10" },
]

export default function FinanceHelper() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  const [insights, setInsights] = useState<string[]>([])

  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  })

  const totalIncome = sampleIncome.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = sampleExpenses.reduce((sum, item) => sum + item.amount, 0)
  const balance = totalIncome - totalExpenses

  const generateAIInsights = async () => {
    setIsGeneratingInsights(true)

    const data = await generateFinancialTips(sampleIncome, sampleExpenses)

      setInsights(data)
      setIsGeneratingInsights(false)
  }

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding expense:", newExpense)

    // Reset form
    setNewExpense({
      category: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  // Format amount to BDT
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Personal Finance Helper</h1>
        <p className="text-slate-500 dark:text-slate-400">AI-powered financial management and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Financial Dashboard</CardTitle>
              <CardDescription>Track your income, expenses, and savings</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                  <TabsTrigger value="income">Income</TabsTrigger>
                  <TabsTrigger value="add">Add Transaction</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Income</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                              {formatAmount(totalIncome)}
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Expenses</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                              {formatAmount(totalExpenses)}
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <TrendingDown className="h-5 w-5 text-red-500" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Balance</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                              {formatAmount(balance)}
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-blue-500" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Expense Breakdown</h3>
                    <div className="space-y-4">
                      {/* Food */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Food</span>
                          <span className="text-sm font-medium">
                            {formatAmount(
                              sampleExpenses.filter((e) => e.category === "Food").reduce((sum, e) => sum + e.amount, 0),
                            )}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>

                      {/* Transportation */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Transportation</span>
                          <span className="text-sm font-medium">
                            {formatAmount(
                              sampleExpenses
                                .filter((e) => e.category === "Transportation")
                                .reduce((sum, e) => sum + e.amount, 0),
                            )}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                      </div>

                      {/* Entertainment */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Entertainment</span>
                          <span className="text-sm font-medium">
                            {formatAmount(
                              sampleExpenses
                                .filter((e) => e.category === "Entertainment")
                                .reduce((sum, e) => sum + e.amount, 0),
                            )}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                      </div>

                      {/* Utilities */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Utilities</span>
                          <span className="text-sm font-medium">
                            {formatAmount(
                              sampleExpenses
                                .filter((e) => e.category === "Utilities")
                                .reduce((sum, e) => sum + e.amount, 0),
                            )}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="expenses">
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-slate-50 dark:bg-slate-800">
                            <th className="py-3 px-4 text-left font-medium">Date</th>
                            <th className="py-3 px-4 text-left font-medium">Category</th>
                            <th className="py-3 px-4 text-right font-medium">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sampleExpenses.map((expense) => (
                            <tr key={expense.id} className="border-b">
                              <td className="py-3 px-4">{new Date(expense.date).toLocaleDateString()}</td>
                              <td className="py-3 px-4">{expense.category}</td>
                              <td className="py-3 px-4 text-right">{formatAmount(expense.amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="income">
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-slate-50 dark:bg-slate-800">
                            <th className="py-3 px-4 text-left font-medium">Date</th>
                            <th className="py-3 px-4 text-left font-medium">Source</th>
                            <th className="py-3 px-4 text-right font-medium">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sampleIncome.map((income) => (
                            <tr key={income.id} className="border-b">
                              <td className="py-3 px-4">{new Date(income.date).toLocaleDateString()}</td>
                              <td className="py-3 px-4">{income.source}</td>
                              <td className="py-3 px-4 text-right">{formatAmount(income.amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="add">
                  <form onSubmit={handleAddExpense} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newExpense.category}
                        onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Food">Food</SelectItem>
                          <SelectItem value="Transportation">Transportation</SelectItem>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Shopping">Shopping</SelectItem>
                          <SelectItem value="Health">Health</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (BDT)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Expense
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Financial Advisor</CardTitle>
                <Button variant="outline" size="sm" onClick={generateAIInsights} disabled={isGeneratingInsights}>
                  {isGeneratingInsights ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Generate Insights"
                  )}
                </Button>
              </div>
              <CardDescription>AI-powered financial recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              {insights.length > 0 ? (
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start"
                    >
                      <Brain className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <p className="flex-1">{insight?.replace(/"/g, '')}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Brain className="h-12 w-12 text-slate-300 mb-4" />
                  <p className="text-slate-500 mb-4">
                    Click "Generate Insights" to get AI-powered financial recommendations based on your spending
                    patterns.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Savings Goal</CardTitle>
              <CardDescription>Track your progress towards financial goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Emergency Fund</span>
                    <span className="font-medium">৳30,000 / ৳100,000</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">30% complete</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">New Laptop</span>
                    <span className="font-medium">৳50,000 / ৳80,000</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "62.5%" }}></div>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">62.5% complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
