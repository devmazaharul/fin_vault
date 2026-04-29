"use client"

import { useState } from "react"
import { ArrowRight, ShieldCheck, X } from "lucide-react"

interface SendMoneyFormProps {
  prefillRecipient?: string
  prefillAmount?: number
  onPrompt: (text: string) => void
}

export default function SendMoneyForm({
  prefillRecipient = "",
  prefillAmount,
  onPrompt,
}: SendMoneyFormProps) {
  const [recipient, setRecipient] = useState(prefillRecipient)
  const [amount, setAmount] = useState(prefillAmount?.toString() ?? "")
  const [note, setNote] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)
  const [sending, setSending] = useState(false)

  const inputClass =
    "h-[38px] w-full border-[1.5px] border-[#dde8e3] rounded-[9px] px-3 text-[13px] text-[#1a2e26] bg-[#f6faf8] placeholder:text-[#b5c9c1] outline-none transition-all focus:border-[#1d9e75] focus:shadow-[0_0_0_3px_rgba(29,158,117,0.1)] focus:bg-white"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!recipient.trim() || !amount) return
    setShowConfirm(true)
  }

  const handleConfirm = async () => {
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false)
    setShowConfirm(false)
    onPrompt(
      `Transfer of ৳ ${Number(amount).toLocaleString()} to ${recipient} was successful. Show updated balance.`
    )
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[#dde8e3] rounded-[14px] p-4 mt-2 w-full max-w-[340px]"
      >
        <p className="text-[13px] font-bold text-[#0a3d2e] font-display mb-3">
          Send money
        </p>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-[10px] font-semibold text-[#6b8a7a] uppercase tracking-[0.6px] block mb-1">
              Recipient
            </label>
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Name or account number"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-[#6b8a7a] uppercase tracking-[0.6px] block mb-1">
              Amount (BDT)
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-[#6b8a7a] uppercase tracking-[0.6px] block mb-1">
              Note (optional)
            </label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. rent, food, loan..."
              className={inputClass}
            />
          </div>

          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={() => onPrompt("Cancel transfer")}
              className="flex-1 h-[38px] border border-[#dde8e3] rounded-[9px] text-[12px] font-semibold text-[#5a7568] hover:bg-[#f6faf8] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-[38px] bg-[#0a3d2e] hover:bg-[#0f5c44] text-white text-[12px] font-semibold rounded-[9px] flex items-center justify-center gap-1.5 transition-colors"
            >
              Review <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </form>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[18px] border border-[#dde8e3] p-6 w-full max-w-[320px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E1F5EE] rounded-full flex items-center justify-center">
                  <ShieldCheck size={15} className="text-[#085041]" />
                </div>
                <p className="text-[14px] font-bold text-[#0a3d2e] font-display">
                  Confirm transfer
                </p>
              </div>
              <button
                onClick={() => setShowConfirm(false)}
                className="w-6 h-6 flex items-center justify-center text-[#8a9e96] hover:text-[#0a3d2e]"
              >
                <X size={14} />
              </button>
            </div>

            <div className="bg-[#f6faf8] border border-[#e8efeb] rounded-[10px] p-4 mb-4">
              <div className="flex justify-between text-[12px] mb-2">
                <span className="text-[#8a9e96]">To</span>
                <span className="font-semibold text-[#1a2e26]">{recipient}</span>
              </div>
              <div className="flex justify-between text-[12px] mb-2">
                <span className="text-[#8a9e96]">Amount</span>
                <span className="font-bold text-[#0a3d2e] text-[15px] font-display">
                  ৳ {Number(amount).toLocaleString()}
                </span>
              </div>
              {note && (
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#8a9e96]">Note</span>
                  <span className="text-[#1a2e26]">{note}</span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-[#8a9e96] text-center mb-4">
              This action cannot be undone. Please confirm to proceed.
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 h-[40px] border border-[#dde8e3] rounded-[9px] text-[12px] font-semibold text-[#5a7568] hover:bg-[#f6faf8]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={sending}
                className="flex-1 h-[40px] bg-[#0a3d2e] hover:bg-[#0f5c44] text-white text-[12px] font-semibold rounded-[9px] disabled:opacity-60 transition-colors"
              >
                {sending ? "Sending..." : "Confirm send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}