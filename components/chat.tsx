"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      role: "assistant",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        role: "assistant",
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Simple mock AI response function
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    if (input.includes("hello") || input.includes("hi")) {
      return "Hello there! How can I assist you today?"
    } else if (input.includes("help")) {
      return "I'm here to help! You can ask me questions, and I'll do my best to provide useful information."
    } else if (input.includes("thank")) {
      return "You're welcome! Is there anything else you'd like to know?"
    } else {
      return "That's an interesting question. I'm processing your request and will provide more information soon. Is there anything specific you'd like to know about this topic?"
    }
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn("flex items-start gap-3 max-w-[80%] mb-4", message.role === "user" ? "ml-auto" : "mr-auto")}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                  message.role === "user"
                    ? "bg-slate-700 dark:bg-slate-600 order-2"
                    : "bg-emerald-500 dark:bg-emerald-600",
                )}
              >
                {message.role === "user" ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>
              <div
                className={cn(
                  "rounded-lg px-4 py-2 shadow-sm",
                  message.role === "user"
                    ? "bg-slate-700 text-white dark:bg-slate-600"
                    : "bg-white dark:bg-slate-700 dark:text-slate-100 border border-slate-200 dark:border-slate-600",
                )}
              >
                {message.role === "assistant" ? <TypewriterEffect text={message.content} /> : message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 max-w-[80%] mb-4"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-emerald-500 dark:bg-emerald-600">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="rounded-lg px-4 py-2 shadow-sm bg-white dark:bg-slate-700 dark:text-slate-100 border border-slate-200 dark:border-slate-600">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                <span className="text-slate-500 dark:text-slate-400">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
      >
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 focus-visible:ring-emerald-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

// Typewriter effect component for AI responses
function TypewriterEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 15) // Speed of typing

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  // Reset when text changes
  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  return <div>{displayedText}</div>
}
