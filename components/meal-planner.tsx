"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Utensils, ShoppingCart, Clock, Brain, Loader2 } from "lucide-react"
import { generateMealPlanAi, generateNutritionTipsPrompt, generateRecipeSuggestionsPrompt } from "@/lib/ai-helpers"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function MealPlanner() {
  const [activeTab, setActiveTab] = useState("meal-plan")
  const [dietType, setDietType] = useState("any")
  const [budget, setBudget] = useState("medium")
  const [timeConstraint, setTimeConstraint] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSuggestions, setIsSuggestion] = useState(false)
  const [nutritionLoading, setNutritionLoading] = useState(false)
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null)
  const [suggestions, setSuggestion] = useState<Suggestions[]>([])
  const [groceryList, setGroceryList] = useState<string[]>([])
  const [nutritionTips, setNutritionTips] = useState<string[]>([])

  const generateMealPlan = async () => {
    setIsGenerating(true)
    const { mealPlan, groceryList } = await generateMealPlanAi(dietType, budget, timeConstraint)
    setMealPlan(mealPlan)
    setGroceryList(groceryList)
    setIsGenerating(false)
  }

  const generateRecipeSuggestions = async () => {
    setIsSuggestion(true)
    const data = await generateRecipeSuggestionsPrompt()
    setSuggestion(data)
    setIsSuggestion(false)
  }

  const generateRecipeNutritionTips = async () => {
    setNutritionLoading(true)
    const data = await generateNutritionTipsPrompt()
    setNutritionTips(data)
    setNutritionLoading(false)
  }

  useEffect(() =>{
    generateRecipeSuggestions()
    generateRecipeNutritionTips()
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">AI Meal Planner</h1>
        <p className="text-slate-500 dark:text-slate-400">Create personalized meal plans and grocery lists</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Meal Plan</CardTitle>
              <CardDescription>Personalized recipes based on your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
                  <TabsTrigger value="grocery-list">Grocery List</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="meal-plan">
                  {mealPlan ? (
                    <div className="space-y-6">
                      {mealPlan.days.map((day: any, dayIndex: number) => (
                        <div key={dayIndex}>
                          <h3 className="text-lg font-medium mb-3">{day.day}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {day.meals.map((meal: any, mealIndex: number) => (
                              <Card key={mealIndex}>
                                <CardHeader className="pb-2">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">{meal.type}</CardTitle>
                                    {meal.vegetarian && (
                                      <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                                        Vegetarian
                                      </div>
                                    )}
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <p className="font-medium mb-2">{meal.name}</p>
                                  <div className="flex items-center text-sm text-slate-500">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span>{meal.time}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Utensils className="h-12 w-12 text-slate-300 mb-4" />
                      <p className="text-slate-500 mb-4">
                        No meal plan generated yet. Set your preferences and generate a plan.
                      </p>
                      <Button onClick={generateMealPlan} disabled={isGenerating}>
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          "Generate Meal Plan"
                        )}
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="grocery-list">
                  {groceryList.length > 0 ? (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Shopping List</h3>
                        <Button variant="outline" size="sm">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Print List
                        </Button>
                      </div>
                      <div className="border rounded-md p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {groceryList.map((item, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <Checkbox id={`item-${index}`} />
                              <Label htmlFor={`item-${index}`} className="font-normal">
                                {item}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 mt-4">
                        এই রেসিপির জন্য তোমার লাগবে উপরের সামগ্রীগুলো। বাজারে যাওয়ার আগে চেক করো তোমার কাছে কোনটা আছে।
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <ShoppingCart className="h-12 w-12 text-slate-300 mb-4" />
                      <p className="text-slate-500 mb-4">No grocery list available. Generate a meal plan first.</p>
                      <Button onClick={() => setActiveTab("meal-plan")}>Go to Meal Plan</Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="preferences">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="diet-type">Diet Type</Label>
                      <Select value={dietType} onValueChange={setDietType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select diet type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget</Label>
                      <Select value={budget} onValueChange={setBudget}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (Budget-friendly)</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High (Premium ingredients)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Time Constraint</Label>
                      <Select value={timeConstraint} onValueChange={setTimeConstraint}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time constraint" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quick">Quick (Under 30 minutes)</SelectItem>
                          <SelectItem value="medium">Medium (30-60 minutes)</SelectItem>
                          <SelectItem value="any">Any (No time constraint)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4">
                      <Button onClick={generateMealPlan} disabled={isGenerating} className="w-full">
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          "Generate Meal Plan"
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Recipe Suggestions</CardTitle>
              <CardDescription>Personalized recipe ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">

              {isSuggestions ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Brain className="h-12 w-12 text-slate-300 animate-pulse mb-4" />
                  <p className="text-slate-500 text-sm">AI is analyzing your suggestions...</p>
                </div>
              ) : suggestions?.length > 0 ? (
                <ScrollArea className="h-[250px]">
                  <div className="space-y-3">
                    {
                      suggestions?.map((item) => (
                        <div key={item.title} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start">
                          <Brain className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium mb-1">{item.title}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-slate-500 text-sm">No meal suggestions recommendations yet</p>
                </div>
              )} 
          
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nutrition Tips</CardTitle>
              <CardDescription>Healthy eating advice</CardDescription>
            </CardHeader>
            <CardContent>
              {nutritionLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Brain className="h-12 w-12 text-slate-300 animate-pulse mb-4" />
                  <p className="text-slate-500 text-sm">AI is analyzing your nutrition...</p>
                </div>
              ) : nutritionTips.length > 0 ? (
                <ScrollArea className="h-[250px]">
                  <div className="space-y-3">
                    {nutritionTips.map((item) => (
                      <div key={item} className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                        <p className="text-sm">
                          {item.replace(/"/g, '')}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-slate-500 text-sm">No meal planner recommendations yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


