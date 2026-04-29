import { TrendingUp, TrendingDown, Send, History, BarChart2 } from "lucide-react"

interface BalanceCardProps {
  onPrompt: (text: string) => void
}

export default function BalanceCard({ onPrompt }: BalanceCardProps) {
  return (
    <div className="bg-white border border-[#dde8e3] rounded-[14px] p-4 mt-2 w-full max-w-[340px]">

      {/* Main balance */}
      <div className="bg-[#f6faf8] border border-[#e8efeb] rounded-[10px] p-4 mb-3">
        <p className="text-[10px] font-semibold text-[#8a9e96] tracking-widest uppercase mb-1">
          Total balance
        </p>
        <p className="font-display text-[30px] font-bold text-[#0a3d2e] leading-none mb-3">
          ৳ 84,220
        </p>
        <div className="flex items-center gap-1.5">
          <TrendingUp size={12} className="text-[#1d9e75]" />
          <span className="text-[11px] font-semibold text-[#085041] bg-[#E1F5EE] px-2 py-0.5 rounded-full">
            +2.4% this month
          </span>
        </div>
      </div>

      {/* Income / Spent */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-[#f6faf8] border border-[#e8efeb] rounded-[10px] p-3">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp size={11} className="text-[#1d9e75]" />
            <span className="text-[10px] font-semibold text-[#8a9e96] uppercase tracking-wide">
              Income
            </span>
          </div>
          <p className="font-display text-[18px] font-bold text-[#0a3d2e]">৳ 42k</p>
        </div>
        <div className="bg-[#f6faf8] border border-[#e8efeb] rounded-[10px] p-3">
          <div className="flex items-center gap-1 mb-1">
            <TrendingDown size={11} className="text-[#c0392b]" />
            <span className="text-[10px] font-semibold text-[#8a9e96] uppercase tracking-wide">
              Spent
            </span>
          </div>
          <p className="font-display text-[18px] font-bold text-[#0a3d2e]">৳ 12k</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { icon: Send,    label: "Send",     prompt: "I want to send money" },
          { icon: History, label: "History",  prompt: "Show transaction history" },
          { icon: BarChart2, label: "Analytics", prompt: "Show spending analytics" },
        ].map((a) => (
          <button
            key={a.label}
            onClick={() => onPrompt(a.prompt)}
            className="flex flex-col items-center gap-1 py-2.5 bg-[#f6faf8] hover:bg-[#E1F5EE] border border-[#dde8e3] rounded-[9px] transition-colors"
          >
            <a.icon size={13} className="text-[#0a3d2e]" />
            <span className="text-[10px] font-semibold text-[#3d5248]">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}