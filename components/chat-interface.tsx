"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Send,
  Loader2,
  Bot,
  User,
  Plus,
  MoreVertical,
  Trash2,
  Download,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { getAIResponse } from "@/lib/ai-helpers"
import { availableModels } from "@/lib/dump"
import ChatFormatter from "./chat-formater"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

type Chat = {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  modelId: string
}

export default function ChatInterface() {
  const [chats, setChats] = useState<Chat[]>([])

  const [activeChat, setActiveChat] = useState<string>(chats[0]?.id || "")
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat, chats])

  const currentChat = chats.find((chat) => chat.id === activeChat)
  const currentModel = availableModels.find((model) => model.id === currentChat?.modelId) || availableModels[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !activeChat) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: [...chat.messages, userMessage],
          }
        }
        return chat
      }),
    )

    setInput("")
    setIsLoading(true)

    const content = await getAIResponse(input, currentModel.id)
    const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content,
        role: "assistant",
      }

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === activeChat) {
            const updatedChat = {
              ...chat,
              messages: [...chat.messages, aiMessage],
            }

            if (chat.messages.length <= 1 && chat.title === "New Chat") {
              updatedChat.title = generateChatTitle(input)
            }

            return updatedChat
          }
          return chat
        }),
      )

      setIsLoading(false)
  }

  const createNewChat = (modelId = "gpt-4o") => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [
        {
          id: "1",
          content: "Hello! How can I help you today?",
          role: "assistant",
        },
      ],
      createdAt: new Date(),
      modelId: modelId,
    }

    setChats([newChat, ...chats])
    setActiveChat(newChat.id)
    setIsMobileMenuOpen(false)
  }

  const deleteChat = (chatId: string) => {
    setChats(chats.filter((chat) => chat.id !== chatId))

    if (chatId === activeChat) {
      const remainingChats = chats.filter((chat) => chat.id !== chatId)
      if (remainingChats.length > 0) {
        setActiveChat(remainingChats[0].id)
      } else {
        createNewChat()
      }
    }
  }

  const changeModel = (modelId: string) => {
    if (!activeChat) return

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            modelId: modelId,
          }
        }
        return chat
      }),
    )
  }

 

  const generateChatTitle = (message: string): string => {
    if (message.length > 10) {
      return message.substring(0, 27) + "..."
    }
    return message
  }

  const formatDate = (date: Date): string => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return "Today"
    } else if (diffInDays === 1) {
      return "Yesterday"
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getModelById = (modelId: string): AIModel => {
    return availableModels.find((model) => model.id === modelId) || availableModels[0]
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">AI Chat Assistant</h1>
        <p className="text-slate-500 dark:text-slate-400">Chat with your AI assistant about anything</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Chat List - Hidden on mobile */}
        <div className="hidden md:block">
          <Card className="h-[calc(100vh-120px)]">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="p-4 border-b">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      New Chat
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuLabel>Select AI Model</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {availableModels.map((model) => (
                      <DropdownMenuItem key={model.id} onClick={() => createNewChat(model.id)}>
                        <div className={`mr-2 ${model.color}`}>{model.icon}</div>
                        <span>{model.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-2">
                  {chats.map((chat) => {
                    const model = getModelById(chat.modelId)
                    return (
                      <div
                        key={chat.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800",
                          chat.id === activeChat && "bg-slate-100 dark:bg-slate-800",
                        )}
                        onClick={() => setActiveChat(chat.id)}
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <div className={`${model.color} shrink-0`}>{model.icon}</div>
                          <div className="overflow-hidden">
                            <p className="font-medium truncate">{chat.title}</p>
                            <div className="flex items-center">
                              <Badge variant="outline" className="text-xs font-normal">
                                {model.name}
                              </Badge>
                              <p className="text-xs text-slate-500 ml-2">{formatDate(chat.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => deleteChat(chat.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Export
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Chat List Button */}
        <div className="md:hidden mb-4">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              {currentChat?.title || "Select Chat"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Select AI Model</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {availableModels.map((model) => (
                  <DropdownMenuItem key={model.id} onClick={() => createNewChat(model.id)}>
                    <div className={`mr-2 ${model.color}`}>{model.icon}</div>
                    <span>{model.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {isMobileMenuOpen && (
            <Card className="mt-2 absolute z-10 w-[calc(100%-2rem)]">
              <CardContent className="p-2">
                <div className="space-y-2">
                  {chats.map((chat) => {
                    const model = getModelById(chat.modelId)
                    return (
                      <div
                        key={chat.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-md cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800",
                          chat.id === activeChat && "bg-slate-100 dark:bg-slate-800",
                        )}
                        onClick={() => {
                          setActiveChat(chat.id)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <div className={`${model.color} shrink-0`}>{model.icon}</div>
                          <div className="overflow-hidden">
                            <p className="font-medium truncate">{chat.title}</p>
                            <div className="flex items-center">
                              <Badge variant="outline" className="text-xs font-normal">
                                {model.name}
                              </Badge>
                              <p className="text-xs text-slate-500 ml-2">{formatDate(chat.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteChat(chat.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chat Area */}
        <div className="md:col-span-3">
          <Card className="h-[calc(100vh-120px)]">
            <CardContent className="p-0 h-full flex flex-col">
              {currentChat ? (
                <>
                  {/* Model Selector */}
                  <div className="p-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`mr-2 ${currentModel.color}`}>{currentModel.icon}</div>
                      <span className="font-medium">{currentModel.name}</span>
                    </div>
                    <Select value={currentChat.modelId} onValueChange={changeModel}>
                      <SelectTrigger className="w-[380px]">
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>AI Models</SelectLabel>
                          {availableModels.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              <div className="flex items-center">
                                <div className={`mr-2 ${model.color}`}>{model.icon}</div>
                                <div>
                                  <div>{model.name}</div>
                                  <div className="text-xs text-slate-500">{model.description}</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      <AnimatePresence initial={false}>
                        {currentChat.messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                              "flex gap-3 mb-4",
                              message.role === "user" ? "ml-auto items-end justify-end" : "mr-auto  items-start justify-start",
                            )}
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
                                  ? "bg-green-700 text-white dark:bg-green-500"
                                  : "bg-white dark:bg-slate-700 dark:text-slate-100 border border-slate-200 dark:border-slate-600",
                              )}
                            >
                              {message.role === "assistant" ? (
                                <TypewriterEffect text={message.content} />
                              ) : (
                                message.content
                              )}
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
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 min-h-[60px] max-h-[200px] focus-visible:ring-emerald-500"
                        disabled={isLoading}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSubmit(e)
                          }
                        }}
                      />
                      <Button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white self-end h-[60px]"
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        <span className="sr-only">Send message</span>
                      </Button>
                    </form>
                    <p className="text-xs text-slate-500 mt-2">Press Enter to send, Shift+Enter for a new line</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <Bot className="h-12 w-12 text-slate-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Chat Selected</h3>
                  <p className="text-slate-500 mb-4">Select an existing chat or create a new one to get started.</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Chat
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuLabel>Select AI Model</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {availableModels.map((model) => (
                        <DropdownMenuItem key={model.id} onClick={() => createNewChat(model.id)}>
                          <div className={`mr-2 ${model.color}`}>{model.icon}</div>
                          <span>{model.name}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function TypewriterEffect({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 15) 

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  return <ChatFormatter message={displayedText} />
}
