"use client"

import { CheckCircle2, Circle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Task } from "@/lib/types"
import { motion } from "framer-motion"

interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (taskId: string) => void
}

export default function TaskList({ tasks, onToggleComplete }: TaskListProps) {
  // Group tasks by completion status
  const pendingTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-6">
        {/* Pending Tasks */}
        <div>
          <h3 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Pending Tasks</h3>
          {pendingTasks.length > 0 ? (
            <div className="space-y-2">
              {pendingTasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} />
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm py-2">No pending tasks</p>
          )}
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h3 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Completed</h3>
            <div className="space-y-2 opacity-70">
              {completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggleComplete={onToggleComplete} />
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}

function TaskItem({ task, onToggleComplete }: { task: Task; onToggleComplete: (taskId: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between"
    >
      <div className="flex items-center">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="mr-3 text-slate-500 hover:text-emerald-500 transition-colors"
        >
          {task.completed ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5" />}
        </button>
        <div>
          <p className={`font-medium ${task.completed ? "line-through text-slate-400" : ""}`}>{task.title}</p>
          <p className="text-sm text-slate-500">{task.time}</p>
        </div>
      </div>
      <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}>
        {task.priority}
      </Badge>
    </motion.div>
  )
}
