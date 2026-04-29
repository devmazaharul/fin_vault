"use client"

import { useState } from "react"
import { Check } from "lucide-react"

interface SettingsFormProps {
  onPrompt: (text: string) => void
}

export default function SettingsForm({ onPrompt }: SettingsFormProps) {
  const [form, setForm] = useState({
    name: "Mazaharul Islam",
    email: "maz@example.com",
    address: "Jessore, Bangladesh",
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const inputClass =
    "h-[38px] w-full border-[1.5px] border-[#dde8e3] rounded-[9px] px-3 text-[13px] text-[#1a2e26] bg-[#f6faf8] placeholder:text-[#b5c9c1] outline-none transition-all focus:border-[#1d9e75] focus:shadow-[0_0_0_3px_rgba(29,158,117,0.1)] focus:bg-white"

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 900))
    setSaving(false)
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onPrompt("Settings saved successfully. What else can I help you with?")
    }, 1200)
  }

  return (
    <form
      onSubmit={handleSave}
      className="bg-white border border-[#dde8e3] rounded-[14px] p-4 mt-2 w-full max-w-[340px]"
    >
      <p className="text-[13px] font-bold text-[#0a3d2e] font-display mb-3">
        Account settings
      </p>

      <div className="flex flex-col gap-3">
        {[
          { key: "name",    label: "Full name",     type: "text",  placeholder: "Your name" },
          { key: "email",   label: "Email address", type: "email", placeholder: "you@example.com" },
          { key: "address", label: "Home address",  type: "text",  placeholder: "Your address" },
        ].map((f) => (
          <div key={f.key}>
            <label className="text-[10px] font-semibold text-[#6b8a7a] uppercase tracking-[0.6px] block mb-1">
              {f.label}
            </label>
            <input
              type={f.type}
              value={form[f.key as keyof typeof form]}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [f.key]: e.target.value }))
              }
              placeholder={f.placeholder}
              className={inputClass}
            />
          </div>
        ))}

        {/* Divider */}
        <div className="border-t border-dashed border-[#e8efeb] my-1" />

        {/* Change passcode hint */}
        <button
          type="button"
          onClick={() => onPrompt("I want to change my passcode")}
          className="text-[12px] text-[#1d9e75] font-semibold text-left hover:underline"
        >
          Change passcode →
        </button>

        <div className="flex gap-2 mt-1">
          <button
            type="button"
            onClick={() => onPrompt("Cancel settings")}
            className="flex-1 h-[38px] border border-[#dde8e3] rounded-[9px] text-[12px] font-semibold text-[#5a7568] hover:bg-[#f6faf8] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || saved}
            className="flex-1 h-[38px] bg-[#0a3d2e] hover:bg-[#0f5c44] text-white text-[12px] font-semibold rounded-[9px] flex items-center justify-center gap-1.5 disabled:opacity-70 transition-colors"
          >
            {saved ? (
              <>
                <Check size={12} /> Saved!
              </>
            ) : saving ? (
              "Saving..."
            ) : (
              "Save changes"
            )}
          </button>
        </div>
      </div>
    </form>
  )
}