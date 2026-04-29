"use client"

import { useState, useCallback } from "react"
import Sidebar from "./components/dashboard/Sidebar"
import Topbar from "./components/dashboard/Topbar"
import ChatInterface from "./components/dashboard/ChatInterface"

export default function DashboardPage() {
  const [externalPrompt, setExternalPrompt] = useState<string | null>(null)

  const handleSidebarPrompt = useCallback((text: string) => {
    setExternalPrompt(text)
    // Reset after ChatInterface picks it up
    setTimeout(() => setExternalPrompt(null), 100)
  }, [])

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#EEF2F0]">
      <Sidebar onPrompt={handleSidebarPrompt} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-hidden p-3">
          <div className="h-full bg-[#f6faf8] border border-[#dde8e3] rounded-[16px] overflow-hidden">
            <ChatInterface externalPrompt={externalPrompt} />
          </div>
        </main>
      </div>
    </div>
  )
}