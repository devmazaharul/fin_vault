"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Layers,
  LayoutDashboard,
  CreditCard,
  ArrowLeftRight,
  Send,
  BarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  X,
  Menu,
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",    prompt: null,                        href: "/dashboard" },
  { icon: CreditCard,      label: "Balance",      prompt: "Show my balance overview",  href: null },
  { icon: ArrowLeftRight,  label: "Transactions", prompt: "Show transaction history",  href: null },
  { icon: Send,            label: "Send money",   prompt: "I want to send money",      href: null },
  { icon: BarChart2,       label: "Analytics",    prompt: "Show spending analytics",   href: null },
  { icon: Settings,        label: "Settings",     prompt: "Open account settings",     href: null },
  { icon: LogOut,          label: "Logout",       prompt: "Logout",                    href: null },
]

interface SidebarProps {
  onPrompt: (text: string) => void
}

export default function Sidebar({ onPrompt }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (item: typeof navItems[0]) => {
    setMobileOpen(false)
    if (item.prompt) onPrompt(item.prompt)
  }

  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={`flex flex-col h-full bg-[#0a3d2e] transition-all duration-200 ${
        !mobile && collapsed ? "w-[60px]" : "w-[220px]"
      }`}
    >
      {/* Logo */}
      <div className="px-4 py-4 border-b border-white/[0.07]">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-[30px] h-[30px] bg-[#1d9e75] rounded-[8px] flex items-center justify-center flex-shrink-0">
            <Layers size={14} className="text-white" />
          </div>
          {(!collapsed || mobile) && (
            <span className="font-display text-white text-[15px] font-bold whitespace-nowrap">
              FinVault
            </span>
          )}
        </div>
      </div>

      {/* Collapse toggle — desktop only */}
      {!mobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mx-auto my-2 w-7 h-7 flex items-center justify-center bg-white/[0.07] hover:bg-white/[0.12] rounded-[6px] text-[#6fa890] transition-colors"
        >
          <ChevronLeft
            size={13}
            className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-1 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const active = item.href ? pathname === item.href : false
          const isLogout = item.label === "Logout"
          return (
            <button
              key={item.label}
              onClick={() => handleNav(item)}
              className={`flex items-center gap-2.5 px-2.5 py-[9px] rounded-[8px] w-full text-left transition-all ${
                active
                  ? "bg-white/[0.12] text-white"
                  : isLogout
                  ? "text-[#6fa890] hover:bg-red-900/20 hover:text-red-300"
                  : "text-[#6fa890] hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              <item.icon size={15} className="flex-shrink-0" />
              {(!collapsed || mobile) && (
                <span className="text-[12px] font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* User info */}
      <div className="px-3 py-3 border-t border-white/[0.07] flex items-center gap-2.5 overflow-hidden">
        <div className="w-[30px] h-[30px] rounded-full bg-[#1d9e75] flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
          MA
        </div>
        {(!collapsed || mobile) && (
          <div className="overflow-hidden">
            <p className="text-[11px] font-semibold text-white whitespace-nowrap">Mazaharul</p>
            <p className="text-[10px] text-[#6fa890] whitespace-nowrap">Free account</p>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-screen sticky top-0 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3.5 left-4 z-50 w-8 h-8 flex items-center justify-center bg-[#0a3d2e] text-white rounded-[8px]"
      >
        <Menu size={15} />
      </button>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 h-full">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-[-36px] w-7 h-7 flex items-center justify-center bg-white/10 rounded-full text-white"
            >
              <X size={13} />
            </button>
            <SidebarContent mobile />
          </div>
        </div>
      )}
    </>
  )
}