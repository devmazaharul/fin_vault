import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#EEF2F0] overflow-hidden">
      {/*
        Sidebar needs onPrompt — but layout is a server component.
        We handle this via ChatInterface managing its own state.
        Sidebar nav items send prompts via URL search params or
        a shared context (see note below).
      */}
      <div className="flex flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}