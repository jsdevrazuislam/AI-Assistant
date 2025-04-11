"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText, Mail, Calculator, Code, Upload, Loader2 } from "lucide-react"

export default function WorkHelper() {
  const [activeTab, setActiveTab] = useState("document")
  const [documentText, setDocumentText] = useState("")
  const [mathProblem, setMathProblem] = useState("")
  const [emailPrompt, setEmailPrompt] = useState("")
  const [codePrompt, setCodePrompt] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const processRequest = () => {
    setIsProcessing(true)
    setResult(null)

    // Simulate AI processing
    setTimeout(() => {
      let response = ""

      switch (activeTab) {
        case "document":
          response = `
# Document Analysis

## Summary
The provided text appears to be about project management methodologies, specifically comparing Agile and Waterfall approaches.

## Key Points
- Agile methodology focuses on iterative development
- Waterfall is a linear sequential approach
- The document recommends Agile for projects with changing requirements
- There's a section about team collaboration that could be expanded

## Suggestions
1. Add more specific examples of successful Agile implementations
2. Include a comparison table for easier reference
3. Consider adding a section on hybrid approaches
4. The conclusion could be strengthened with more concrete recommendations
          `
          break

        case "math":
          if (mathProblem.includes("2x + 3 = 7")) {
            response = `
# Step-by-Step Solution

## Original equation:
2x + 3 = 7

## Step 1: Subtract 3 from both sides
2x + 3 - 3 = 7 - 3
2x = 4

## Step 2: Divide both sides by 2
2x ÷ 2 = 4 ÷ 2
x = 2

## Answer:
x = 2

## Verification:
2(2) + 3 = 7
4 + 3 = 7
7 = 7 ✓
            `
          } else {
            response = `
# Step-by-Step Solution

এই অংকটা স্টেপ বাই স্টেপ সমাধান:

## Step 1: Identify the key variables and equations

## Step 2: Apply the appropriate mathematical principles

## Step 3: Solve step by step

## Answer:
The solution is [calculated answer]

## Explanation:
[Detailed explanation of the solution process]
            `
          }
          break

        case "email":
          response = `
Subject: Meeting Follow-up and Next Steps

Dear Team,

I hope this email finds you well. I'm writing to follow up on our meeting yesterday regarding the project timeline.

As discussed, we've agreed to the following action items:

1. Sarah will finalize the design mockups by Friday, April 15
2. John will set up the development environment by Monday, April 18
3. The team will review the initial prototype during our next meeting on Wednesday, April 20

Please let me know if you have any questions or concerns about these deadlines. I've attached the meeting minutes for your reference.

Looking forward to our continued collaboration.

Best regards,
[Your Name]
          `
          break

        case "code":
          response = `
\`\`\`python
def fibonacci(n):
    """
    Calculate the Fibonacci sequence up to the nth term.
    
    Args:
        n: A positive integer
        
    Returns:
        A list containing the Fibonacci sequence up to the nth term
    """
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    
    return fib

# Example usage
result = fibonacci(10)
print(result)  # Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

This function calculates the Fibonacci sequence up to the nth term. The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.

You can modify this function to start with different values or to return only the nth term if needed.
          `
          break

        default:
          response = "Please select a category and provide input for analysis."
      }

      setResult(response)
      setIsProcessing(false)
    }, 2000)
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
                      <Button variant="outline" type="button">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload File
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
                      Upload or paste documents for AI to analyze, summarize, and provide suggestions.
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
