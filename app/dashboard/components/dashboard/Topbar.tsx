"use client"

import { Bell } from "lucide-react"

interface TopbarProps {
  title?: string
}

export default function Topbar({ title = "AI Dashboard" }: TopbarProps) {
  return (
    <header className="h-[52px] bg-white border-b border-[#e8efeb] flex items-center justify-between px-5 flex-shrink-0">
      <h1 className="font-display text-[#0a3d2e] text-[16px] font-bold tracking-tight">
        {title}
      </h1>

      <div className="flex items-center gap-2.5">
        {/* Notification bell */}
        <button className="relative w-[30px] h-[30px] flex items-center justify-center bg-[#f6faf8] border border-[#dde8e3] rounded-[8px] text-[#5a7568] hover:bg-[#e8f3ee] transition-colors">
          <Bell size={14} />
          <span className="absolute top-[7px] right-[7px] w-1.5 h-1.5 bg-[#1d9e75] rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-[30px] h-[30px] rounded-full bg-[#0a3d2e] flex items-center justify-center text-[10px] font-bold text-[#5DCAA5]">
          MA
        </div>
      </div>
    </header>
  )
}