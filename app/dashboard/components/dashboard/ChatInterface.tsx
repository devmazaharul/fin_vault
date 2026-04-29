"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Loader2 } from "lucide-react"
import BalanceCard from "./chat-components/BalanceCard"
import TransactionTable from "./chat-components/TransactionTable"
import SendMoneyForm from "./chat-components/SendMoneyForm"
import SpendingChart from "./chat-components/SpendingChart"
import SettingsForm from "./chat-components/SettingsForm"
import LogoutConfirm from "./chat-components/LogoutConfirm"

type ComponentType = "balance" | "transactions" | "send" | "analytics" | "settings" | "logout" | null

interface Message {
  id: string
  role: "user" | "ai"
  text: string
  component?: ComponentType
  prefillRecipient?: string
  prefillAmount?: number
}

function detectIntent(text: string): {
  component: ComponentType
  reply: string
  prefillRecipient?: string
  prefillAmount?: number
} {
  const t = text.toLowerCase()

  if (t.includes("logout") || t.includes("sign out"))
    return { component: "logout", reply: "Sure — ready to sign you out." }

  if (t.includes("setting") || t.includes("profile") || t.includes("passcode"))
    return { component: "settings", reply: "Here are your account settings:" }

  if (t.includes("analytic") || t.includes("chart") || (t.includes("spend") && !t.includes("send")))
    return { component: "analytics", reply: "Here's your spending breakdown for the last 6 months:" }

  if (t.includes("send") || t.includes("transfer") || t.includes("pay") || t.includes("tk") || t.includes("taka")) {
    const amountMatch = text.match(/\d[\d,]*/)
    const amount = amountMatch ? parseInt(amountMatch[0].replace(",", "")) : undefined
    const recipientMatch = text.match(/(?:to|for)\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)/i)
    const recipient = recipientMatch?.[1] ?? ""
    return {
      component: "send",
      reply: amount && recipient
        ? `Setting up ৳ ${amount.toLocaleString()} to ${recipient}. Confirm below:`
        : "Fill in the transfer details below:",
      prefillRecipient: recipient,
      prefillAmount: amount,
    }
  }

  if (t.includes("history") || t.includes("transaction") || t.includes("recent"))
    return { component: "transactions", reply: "Here are your recent transactions:" }

  if (t.includes("balance") || t.includes("overview") || t.includes("account"))
    return { component: "balance", reply: "Here's your current balance overview:" }

  if (t.includes("successful") || t.includes("saved"))
    return { component: "balance", reply: text }

  if (t.includes("cancel") || t.includes("stay"))
    return { component: null, reply: "No problem! What else can I help you with?" }

  return {
    component: null,
    reply: "I can help with: balance, transactions, send money, analytics, settings, or logout.",
  }
}

interface ChatInterfaceProps {
  externalPrompt?: string | null
}

export default function ChatInterface({ externalPrompt }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      text: "Welcome back, Mazaharul! Ask me anything — balance, send money, transactions, analytics, settings, or logout.",
      component: "balance",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (externalPrompt) sendMessage(externalPrompt)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalPrompt])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setInput("")

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", text: trimmed },
    ])
    setLoading(true)
    await new Promise((r) => setTimeout(r, 480))

    const { component, reply, prefillRecipient, prefillAmount } = detectIntent(trimmed)
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: reply,
        component,
        prefillRecipient,
        prefillAmount,
      },
    ])
    setLoading(false)
  }

  const renderComponent = (msg: Message) => {
    switch (msg.component) {
      case "balance":      return <BalanceCard onPrompt={sendMessage} />
      case "transactions": return <TransactionTable />
      case "send":         return <SendMoneyForm prefillRecipient={msg.prefillRecipient} prefillAmount={msg.prefillAmount} onPrompt={sendMessage} />
      case "analytics":    return <SpendingChart />
      case "settings":     return <SettingsForm onPrompt={sendMessage} />
      case "logout":       return <LogoutConfirm onPrompt={sendMessage} />
      default:             return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5 ${msg.role === "ai" ? "bg-[#0a3d2e] text-[#5DCAA5]" : "bg-[#1d9e75] text-white"}`}>
              {msg.role === "ai" ? "AI" : "M"}
            </div>
            <div className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"} max-w-[78%]`}>
              <div className={`px-3.5 py-2.5 rounded-[12px] text-[13px] leading-relaxed ${msg.role === "ai" ? "bg-white border border-[#e8efeb] text-[#1a2e26] rounded-tl-[3px]" : "bg-[#0a3d2e] text-white rounded-tr-[3px]"}`}>
                {msg.text}
              </div>
              {msg.role === "ai" && renderComponent(msg)}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#0a3d2e] flex items-center justify-center text-[10px] font-bold text-[#5DCAA5]">AI</div>
            <div className="bg-white border border-[#e8efeb] rounded-[12px] rounded-tl-[3px] px-4 py-3 flex items-center gap-2">
              <Loader2 size={13} className="text-[#8a9e96] animate-spin" />
              <span className="text-[12px] text-[#8a9e96]">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 pb-4 flex-shrink-0">
        <div className="bg-white border border-[#dde8e3] rounded-[13px] flex items-center gap-2.5 px-4 py-2.5 focus-within:border-[#1d9e75] focus-within:shadow-[0_0_0_3px_rgba(29,158,117,0.1)] transition-all">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
            placeholder="Ask anything — 'Send 500 TK to Rahim', 'Show my balance'..."
            className="flex-1 text-[13px] text-[#1a2e26] bg-transparent outline-none placeholder:text-[#b5c9c1]"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-8 h-8 bg-[#0a3d2e] hover:bg-[#0f5c44] disabled:opacity-40 rounded-[9px] flex items-center justify-center flex-shrink-0 transition-colors"
          >
            <Send size={13} className="text-white" />
          </button>
        </div>
        <p className="text-[10px] text-[#b5c9c1] text-center mt-2">
          All financial actions require your confirmation before executing
        </p>
      </div>
    </div>
  )
}