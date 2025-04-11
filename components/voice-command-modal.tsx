"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"

interface VoiceCommandModalProps {
  isOpen: boolean
  onClose: () => void
  onCommand: (command: string) => void
}

export default function VoiceCommandModal({ isOpen, onClose, onCommand }: VoiceCommandModalProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTranscript("")
      setIsListening(false)
      setIsProcessing(false)
    }
  }, [isOpen])

  const startListening = () => {
    setIsListening(true)
    setTranscript("")

    // Simulate voice recognition (in a real app, use Web Speech API)
    setTimeout(() => {
      setIsListening(false)
      // Generate a sample transcript based on time of day
      const hour = new Date().getHours()
      let sampleTranscript = ""

      if (hour < 12) {
        sampleTranscript = "কাল সকাল ১০টায় ডাক্তারের অ্যাপয়েন্টমেন্ট সেট করো"
      } else if (hour < 17) {
        sampleTranscript = "আজ বিকেল ৪টায় টিম মিটিং"
      } else {
        sampleTranscript = "আগামীকাল সকাল ৯টায় জগিং এর রিমাইন্ডার সেট করো"
      }

      setTranscript(sampleTranscript)
    }, 3000)
  }

  const handleSubmit = () => {
    if (!transcript) return

    setIsProcessing(true)

    // Process the voice command (in a real app, this would involve NLP)
    setTimeout(() => {
      onCommand(transcript)
      setIsProcessing(false)
      onClose()
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Voice Command</DialogTitle>
          <DialogDescription>Speak your task or command clearly</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 space-y-6">
          <div className="relative">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center border-2 ${
                isListening
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              {isListening ? (
                <div className="relative">
                  <Mic className="h-10 w-10 text-emerald-500" />
                  <div className="absolute inset-0 rounded-full animate-ping-slow bg-emerald-500/20"></div>
                </div>
              ) : (
                <Mic className="h-10 w-10 text-slate-400" />
              )}
            </div>

            {isListening && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                Listening...
              </div>
            )}
          </div>

          {transcript && (
            <div className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <p className="text-center">{transcript}</p>
            </div>
          )}

          <div className="flex space-x-3">
            {!isListening && !isProcessing && (
              <Button onClick={startListening} variant="outline" className="flex items-center" disabled={isProcessing}>
                <Mic className="mr-2 h-4 w-4" />
                Start Listening
              </Button>
            )}

            {isListening && (
              <Button
                onClick={() => setIsListening(false)}
                variant="outline"
                className="flex items-center text-red-500"
              >
                <MicOff className="mr-2 h-4 w-4" />
                Stop Listening
              </Button>
            )}

            {transcript && !isProcessing && (
              <Button onClick={handleSubmit} className="flex items-center">
                Add Task
              </Button>
            )}

            {isProcessing && (
              <Button disabled className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
