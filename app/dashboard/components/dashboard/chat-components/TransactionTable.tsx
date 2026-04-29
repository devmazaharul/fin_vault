"use client"

import { useState } from "react"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

const mockTx = [
  { id: "1", name: "Rahim Ahmed",     date: "Today, 2:30 PM",    amount: -500,   type: "sent" },
  { id: "2", name: "Salary received", date: "Yesterday, 9:00 AM", amount: 25000, type: "received" },
  { id: "3", name: "Karim Hossain",  date: "2 days ago",         amount: -1200,  type: "sent" },
  { id: "4", name: "Nadia Islam",    date: "3 days ago",         amount: -800,   type: "sent" },
  { id: "5", name: "Refund",         date: "4 days ago",         amount: 350,    type: "received" },
]

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
}

const colors = [
  { bg: "#E1F5EE", text: "#085041" },
  { bg: "#E6F1FB", text: "#185FA5" },
  { bg: "#FAEEDA", text: "#633806" },
  { bg: "#EEEDFE", text: "#534AB7" },
  { bg: "#FCEBEB", text: "#A32D2D" },
]

export default function TransactionTable() {
  const [filter, setFilter] = useState<"all" | "sent" | "received">("all")

  const filtered = mockTx.filter((t) =>
    filter === "all" ? true : t.type === filter
  )

  return (
    <div className="bg-white border border-[#dde8e3] rounded-[14px] p-4 mt-2 w-full max-w-[380px]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[13px] font-bold text-[#0a3d2e] font-display">Recent transactions</p>
        <div className="flex gap-1">
          {(["all", "sent", "received"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-full capitalize transition-colors ${
                filter === f
                  ? "bg-[#0a3d2e] text-white"
                  : "bg-[#f6faf8] text-[#5a7568] hover:bg-[#e8f3ee]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((tx, i) => {
          const color = colors[i % colors.length]
          const positive = tx.amount > 0
          return (
            <div
              key={tx.id}
              className="flex items-center justify-between py-2 border-b border-[#f0f5f2] last:border-0"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                  style={{ background: color.bg, color: color.text }}
                >
                  {getInitials(tx.name)}
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#1a2e26]">{tx.name}</p>
                  <p className="text-[10px] text-[#8a9e96]">{tx.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {positive ? (
                  <ArrowDownLeft size={12} className="text-[#1d9e75]" />
                ) : (
                  <ArrowUpRight size={12} className="text-[#c0392b]" />
                )}
                <span
                  className={`text-[13px] font-bold ${
                    positive ? "text-[#1d9e75]" : "text-[#c0392b]"
                  }`}
                >
                  {positive ? "+" : ""}৳ {Math.abs(tx.amount).toLocaleString()}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}