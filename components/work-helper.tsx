"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText, Mail, Calculator, Code, Upload, Loader2 } from "lucide-react"
import { analyzeTextDocument, generateCodeWithExplanation, generateEmailFromPrompt, solveMathProblem } from "@/lib/ai-helpers"

export default function WorkHelper() {
  const [activeTab, setActiveTab] = useState("document")
  const [documentText, setDocumentText] = useState("")
  const [mathProblem, setMathProblem] = useState("")
  const [emailPrompt, setEmailPrompt] = useState("")
  const [codePrompt, setCodePrompt] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const processRequest = async () => {
    setIsProcessing(true)
    setResult(null)

    let response =  await analyzeTextDocument(documentText)

    switch (activeTab) {
        case "document":
          response = await analyzeTextDocument(documentText) 
          break
        case "math":
            response = await solveMathProblem(mathProblem) 
             break
        case "email":
          response =  await generateEmailFromPrompt(emailPrompt) 
          break

        case "code":
          response = await generateCodeWithExplanation(codePrompt) 
          break

        default:
          response = "Please select a category and provide input for analysis."
    }

    setResult(response)
    setIsProcessing(false)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">AI Work Helper</h1>
        <p className="text-slate-500 dark:text-slate-400">Get help with documents, math problems, emails, and code</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Work Assistant</CardTitle>
              <CardDescription>Select a category and provide input for AI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="document">
                    <FileText className="h-4 w-4 mr-2" />
                    Document
                  </TabsTrigger>
                  <TabsTrigger value="math">
                    <Calculator className="h-4 w-4 mr-2" />
                    Math
                  </TabsTrigger>
                  <TabsTrigger value="email">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="code">
                    <Code className="h-4 w-4 mr-2" />
                    Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="document">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="document-text">Paste your document text</Label>
                      <Textarea
                        id="document-text"
                        placeholder="Paste the text from your document here for analysis..."
                        value={documentText}
                        onChange={(e) => setDocumentText(e.target.value)}
                        className="min-h-[200px]"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button onClick={processRequest} disabled={isProcessing || !documentText.trim()}>
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze Document"
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="math">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="math-problem">Enter your math problem</Label>
                      <Textarea
                        id="math-problem"
                        placeholder="Enter a math problem (e.g., 2x + 3 = 7, solve for x)"
                        value={mathProblem}
                        onChange={(e) => setMathProblem(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button onClick={processRequest} disabled={isProcessing || !mathProblem.trim()}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Solving...
                        </>
                      ) : (
                        "Solve Problem"
                      )}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="email">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-prompt">Describe the email you need</Label>
                      <Textarea
                        id="email-prompt"
                        placeholder="Describe the email you need (e.g., 'Write a follow-up email after a meeting')"
                        value={emailPrompt}
                        onChange={(e) => setEmailPrompt(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button onClick={processRequest} disabled={isProcessing || !emailPrompt.trim()}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Drafting...
                        </>
                      ) : (
                        "Draft Email"
                      )}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="code">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="code-prompt">Describe the code you need</Label>
                      <Textarea
                        id="code-prompt"
                        placeholder="Describe the code you need (e.g., 'Write a function to calculate Fibonacci numbers')"
                        value={codePrompt}
                        onChange={(e) => setCodePrompt(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    <Button onClick={processRequest} disabled={isProcessing || !codePrompt.trim()}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Coding...
                        </>
                      ) : (
                        "Generate Code"
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {result && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Result</CardTitle>
                <CardDescription>AI-generated response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-md p-4 whitespace-pre-wrap font-mono text-sm">
                  {result}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>AI-powered work assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Document Analysis</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Paste documents for AI to analyze, summarize, and provide suggestions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Calculator className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Math Problem Solver</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Get step-by-step solutions to math problems, from basic arithmetic to advanced calculus.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Assistant</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Draft professional emails for various purposes, from follow-ups to formal requests.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Code className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Code Generator</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Generate code snippets and functions in various programming languages.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Queries</CardTitle>
              <CardDescription>Your recent AI work helper requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Calculator className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="font-medium">Math Problem</span>
                    </div>
                    <span className="text-xs text-slate-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Solve the quadratic equation: x² - 5x + 6 = 0
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="font-medium">Email Draft</span>
                    </div>
                    <span className="text-xs text-slate-500">Yesterday</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Write a professional email requesting a deadline extension
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-purple-500 mr-2" />
                      <span className="font-medium">Document Analysis</span>
                    </div>
                    <span className="text-xs text-slate-500">3 days ago</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Analyze project proposal document and provide feedback
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
