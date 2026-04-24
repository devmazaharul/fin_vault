"use client"

interface PinInputProps {
  pin: string[]
  setPin: (pin: string[]) => void
  id: string
}

export default function PinInput({ pin, setPin, id }: PinInputProps) {
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return
    const updated = [...pin]
    updated[index] = value
    setPin(updated)
    if (value && index < 3) {
      document.getElementById(`${id}-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      document.getElementById(`${id}-${index - 1}`)?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4)
    const updated = [...pin]
    pasted.split("").forEach((char, i) => {
      if (i < 4) updated[i] = char
    })
    setPin(updated)
    const lastIndex = Math.min(pasted.length, 3)
    document.getElementById(`${id}-${lastIndex}`)?.focus()
  }

  return (
    <div className="flex gap-3">
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          id={`${id}-${i}`}
          type="password"
          inputMode="numeric"
          maxLength={1}
          value={pin[i]}
          placeholder="·"
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className="
            w-[52px] h-[52px] text-center text-[22px] font-semibold
            text-[#1a1a1a] placeholder:text-[#d0ccc6]
            border-[1.5px] border-[#eae8e4] rounded-[11px]
            bg-[#fafaf9] outline-none
            transition-all duration-150
            focus:border-[#d4a359] focus:shadow-[0_0_0_3px_rgba(212,163,89,0.12)] focus:bg-white
            tracking-widest
          "
        />
      ))}
    </div>
  )
}