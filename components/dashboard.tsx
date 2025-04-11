"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mic, Plus, CalendarIcon, Clock } from "lucide-react"
import TaskList from "@/components/task-list"
import VoiceCommandModal from "@/components/voice-command-modal"
import AIInsights from "@/components/ai-insights"
import type { Task } from "@/lib/types"
import { generateAISchedule, generateProductivityTip } from "@/lib/ai-helpers"

export default function Dashboard() {
  const [date, setDate] = useState<Date>(new Date())
  const [tasks, setTasks] = useState<Task[]>([])
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false)
  const [newTaskText, setNewTaskText] = useState("")
  const [aiSchedule, setAiSchedule] = useState<string[]>([])
  const [productivityTip, setProductivityTip] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Load tasks for the selected date
  useEffect(() => {
    loadTasksForDate(date)
    generateAIRecommendations()
  }, [date])

  const loadTasksForDate = (selectedDate: Date) => {
    // In a real app, this would fetch from an API or database
    // For demo, we'll generate some sample tasks
    const formattedDate = selectedDate.toISOString().split("T")[0]

    // Sample tasks - in a real app, these would come from a database
    const sampleTasks: Task[] = [
      {
        id: "1",
        title: "Team meeting",
        completed: false,
        priority: "high",
        dueDate: formattedDate,
        time: "10:00 AM",
      },
      {
        id: "2",
        title: "Complete project proposal",
        completed: false,
        priority: "medium",
        dueDate: formattedDate,
        time: "2:00 PM",
      },
      {
        id: "3",
        title: "Review client feedback",
        completed: true,
        priority: "low",
        dueDate: formattedDate,
        time: "4:30 PM",
      },
    ]

    setTasks(sampleTasks)
  }

  const generateAIRecommendations = async () => {
    setIsLoading(true)

    try {
      // In a real app, these would be API calls to an AI service
      const schedule = await generateAISchedule(tasks)
      const tip = await generateProductivityTip(tasks)

      setAiSchedule(schedule)
      setProductivityTip(tip)
    } catch (error) {
      console.error("Error generating AI recommendations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTask = () => {
    if (!newTaskText.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskText,
      completed: false,
      priority: "medium",
      dueDate: date.toISOString().split("T")[0],
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setTasks([...tasks, newTask])
    setNewTaskText("")

    // Regenerate AI recommendations when tasks change
    generateAIRecommendations()
  }

  const handleVoiceCommand = (command: string) => {
    // Process voice command and add as a task
    if (command) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: command,
        completed: false,
        priority: "medium",
        dueDate: date.toISOString().split("T")[0],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setTasks([...tasks, newTask])

      // Regenerate AI recommendations when tasks change
      generateAIRecommendations()
    }
  }

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    setTasks(updatedTasks)

    // Regenerate AI recommendations when tasks change
    generateAIRecommendations()
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="py-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Smart Daily Planner</h1>
        <p className="text-slate-500 dark:text-slate-400">AI-powered planning to optimize your day</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar and Tasks Section */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Schedule</CardTitle>
              <CardDescription>Manage your calendar and tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="calendar">
                <TabsList className="mb-4">
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                </TabsList>

                <TabsContent value="calendar" className="space-y-4">
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      className="rounded-md border"
                    />
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      Events for {date.toLocaleDateString()}
                    </h3>
                    <ScrollArea className="h-[200px]">
                      {tasks.length > 0 ? (
                        <div className="space-y-2">
                          {tasks.map((task) => (
                            <div
                              key={task.id}
                              className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                            >
                              <div className="flex items-center">
                                <div className="mr-3">
                                  <Clock className="h-4 w-4 text-slate-500" />
                                </div>
                                <div>
                                  <p className={`font-medium ${task.completed ? "line-through text-slate-400" : ""}`}>
                                    {task.title}
                                  </p>
                                  <p className="text-sm text-slate-500">{task.time}</p>
                                </div>
                              </div>
                              <Badge
                                variant={
                                  task.priority === "high"
                                    ? "destructive"
                                    : task.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {task.priority}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-slate-500 py-4">No events scheduled for this day</p>
                      )}
                    </ScrollArea>
                  </div>
                </TabsContent>

                <TabsContent value="tasks">
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a new task..."
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                        className="flex-1"
                      />
                      <Button onClick={handleAddTask}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                      <Button variant="outline" onClick={() => setIsVoiceModalOpen(true)}>
                        <Mic className="h-4 w-4" />
                        <span className="sr-only">Voice Command</span>
                      </Button>
                    </div>

                    <TaskList tasks={tasks} onToggleComplete={toggleTaskCompletion} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Section */}
        <div className="space-y-6">
          <AIInsights
            schedule={aiSchedule}
            productivityTip={productivityTip}
            isLoading={isLoading}
            onRefresh={generateAIRecommendations}
          />
        </div>
      </div>

      {/* Voice Command Modal */}
      <VoiceCommandModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onCommand={handleVoiceCommand}
      />
    </div>
  )
}
