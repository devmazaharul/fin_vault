"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { LogOut, X } from "lucide-react"

interface LogoutConfirmProps {
  onPrompt: (text: string) => void
}

export default function LogoutConfirm({ onPrompt }: LogoutConfirmProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  return (
    <div className="bg-white border border-[#dde8e3] rounded-[14px] p-4 mt-2 w-full max-w-[300px]">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 bg-[#FCEBEB] rounded-full flex items-center justify-center">
          <LogOut size={14} className="text-[#A32D2D]" />
        </div>
        <p className="text-[13px] font-bold text-[#0a3d2e] font-display">Sign out?</p>
      </div>

      <p className="text-[12px] text-[#8a9e96] leading-relaxed mb-4">
        You'll need to sign in again to access your dashboard.
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onPrompt("Cancel logout, stay signed in")}
          className="flex-1 h-[38px] border border-[#dde8e3] rounded-[9px] text-[12px] font-semibold text-[#5a7568] hover:bg-[#f6faf8] flex items-center justify-center gap-1 transition-colors"
        >
          <X size={12} /> Cancel
        </button>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex-1 h-[38px] bg-[#7f1d1d] hover:bg-[#991b1b] text-white text-[12px] font-semibold rounded-[9px] flex items-center justify-center gap-1.5 disabled:opacity-60 transition-colors"
        >
          <LogOut size={12} />
          {loading ? "Signing out..." : "Yes, sign out"}
        </button>
      </div>
    </div>
  )
}