"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationBannerProps {
  message: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
  onClose?: () => void
}

export function NotificationBanner({ message, type = "success", duration = 5000, onClose }: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  if (!isVisible) return null

  const bgColor = {
    success: "bg-green-100 border-green-500 text-green-800",
    error: "bg-red-100 border-red-500 text-red-800",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-800",
    info: "bg-blue-100 border-blue-500 text-blue-800",
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex w-full max-w-md items-center justify-between rounded-md border-l-4 p-4 shadow-md ${bgColor[type]}`}
    >
      <div className="flex-1">{message}</div>
      <Button variant="ghost" size="icon" onClick={handleClose} className="h-6 w-6 rounded-full p-0">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  )
}
