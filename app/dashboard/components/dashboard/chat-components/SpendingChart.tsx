"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

const data = [
  { month: "Nov", spent: 8400,  income: 30000 },
  { month: "Dec", spent: 15200, income: 32000 },
  { month: "Jan", spent: 10500, income: 30000 },
  { month: "Feb", spent: 13800, income: 30000 },
  { month: "Mar", spent: 9200,  income: 30000 },
  { month: "Apr", spent: 12450, income: 30000 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-[#dde8e3] rounded-[10px] px-3 py-2 text-[11px]">
      <p className="font-bold text-[#0a3d2e] mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name === "spent" ? "Spent" : "Income"}: ৳ {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export default function SpendingChart() {
  const totalSpent = data.reduce((s, d) => s + d.spent, 0)
  const avgSpent = Math.round(totalSpent / data.length)
  const thisMonth = data[data.length - 1].spent

  return (
    <div className="bg-white border border-[#dde8e3] rounded-[14px] p-4 mt-2 w-full max-w-[400px]">
      <p className="text-[13px] font-bold text-[#0a3d2e] font-display mb-1">
        Spending analytics
      </p>
      <p className="text-[11px] text-[#8a9e96] mb-4">Last 6 months overview</p>

      {/* Mini stat row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "This month", value: `৳ ${thisMonth.toLocaleString()}` },
          { label: "Monthly avg", value: `৳ ${avgSpent.toLocaleString()}` },
          { label: "6-mo total",  value: `৳ ${totalSpent.toLocaleString()}` },
        ].map((s) => (
          <div key={s.label} className="bg-[#f6faf8] border border-[#e8efeb] rounded-[9px] p-2.5">
            <p className="text-[9px] font-semibold text-[#8a9e96] uppercase tracking-wide mb-1">
              {s.label}
            </p>
            <p className="text-[13px] font-bold text-[#0a3d2e] font-display">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} barGap={3} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f5f2" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: "#8a9e96" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#8a9e96" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f6faf8" }} />
          <Bar dataKey="income" fill="#9FE1CB" radius={[3, 3, 0, 0]} />
          <Bar dataKey="spent"  fill="#0a3d2e" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-[3px] bg-[#9FE1CB]" />
          <span className="text-[10px] text-[#8a9e96]">Income</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-[3px] bg-[#0a3d2e]" />
          <span className="text-[10px] text-[#8a9e96]">Spent</span>
        </div>
      </div>
    </div>
  )
}