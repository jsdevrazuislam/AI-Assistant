import {
    Bot,
    Sparkles,
  } from "lucide-react"

export const availableModels: AIModel[] = [
    {
      id: "arliai/qwq-32b-arliai-rpr-v1:free",
      name: "ArliAI",
      description: "Most powerful model for complex tasks",
      icon: <Sparkles className="h-4 w-4" />,
      color: "text-purple-500",
    },
    {
      id: "agentica-org/deepcoder-14b-preview:free",
      name: "Agentica",
      description: "Fast and efficient for most tasks",
      icon: <Bot className="h-4 w-4" />,
      color: "text-emerald-500",
    },
    {
      id: "deepseek/deepseek-v3-base:free",
      name: "DeepSeek",
      description: "Excellent for creative and detailed responses",
      icon: <Sparkles className="h-4 w-4" />,
      color: "text-amber-500",
    },
    {
      id: "allenai/molmo-7b-d:free",
      name: "AllenAI",
      description: "Google's advanced AI model",
      icon: <Sparkles className="h-4 w-4" />,
      color: "text-blue-500",
    },
    {
      id: "meta-llama/llama-4-maverick:free",
      name: "Llama 4",
      description: "Open source model with strong capabilities",
      icon: <Bot className="h-4 w-4" />,
      color: "text-rose-500",
    },
]