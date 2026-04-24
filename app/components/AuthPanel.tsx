import { Layers } from "lucide-react"

interface AuthPanelProps {
  heading: string
  headingItalic: string
  sub: string
  features: string[]
  badge: string
}

export default function AuthPanel({
  heading,
  headingItalic,
  sub,
  features,
  badge,
}: AuthPanelProps) {
  return (
    <div className="hidden lg:flex lg:w-[38%] bg-[#1a1a1a] p-9 flex-col justify-between relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-14 -left-14 w-56 h-56 rounded-full bg-[#d4a359]/10 pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-[#d4a359]/7 pointer-events-none" />

      {/* Top section */}
      <div className="relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 bg-[#d4a359] rounded-[9px] flex items-center justify-center">
            <Layers size={16} className="text-white" />
          </div>
          <span
            className="text-white text-xl tracking-[0.2px]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            FinVault
          </span>
        </div>

        {/* Heading */}
        <h2
          className="text-white text-[28px] leading-[1.25] font-normal mb-3"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {heading}
          <br />
          <em className="text-[#d4a359]">{headingItalic}</em>
        </h2>
        <p className="text-[#888] text-[12.5px] leading-relaxed">{sub}</p>
      </div>

      {/* Feature card */}
      <div className="relative z-10 bg-white/[0.04] border border-white/[0.08] rounded-xl p-4">
        <p className="text-[10.5px] uppercase tracking-[0.8px] text-[#666] mb-3">
          {badge}
        </p>
        <div className="flex flex-col gap-[7px]">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-[12.5px] text-[#bbb]">
              <div className="w-[5px] h-[5px] rounded-full bg-[#d4a359] flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}