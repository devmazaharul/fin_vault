"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Sparkles, Layers } from "lucide-react"
import PinInput from "../components/PinInput"

interface FormData {
  name: string
  email: string
  address: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({ name: "", email: "", address: "" })
  const [pin, setPin] = useState(["", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const passcode = pin.join("")
    if (!form.name.trim()) return setError("Full name is required.")
    if (!form.email.trim()) return setError("Email is required.")
    if (!form.address.trim()) return setError("Address is required.")
    if (passcode.length !== 4) return setError("Please set your full 4-digit passcode.")
    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, passcode }),
      })
      const data = await res.json()
      if (!res.ok) return setError(data.message || "Registration failed.")
      router.push("/dashboard")
    } catch {
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    "h-[44px] w-full border-[1.5px] border-[#dde8e3] rounded-[10px] px-4 text-[14px] text-[#1a2e26] bg-[#f6faf8] placeholder:text-[#b5c9c1] outline-none transition-all focus:border-[#1d9e75] focus:shadow-[0_0_0_3px_rgba(29,158,117,0.12)] focus:bg-white"

  return (
    <div className="min-h-screen bg-[#EEF2F0] flex items-center justify-center p-4">
      <div className="w-full max-w-[860px] flex rounded-[20px] overflow-hidden border border-[#dde8e3]">

        {/* Left panel */}
        <div className="hidden lg:flex lg:w-[42%] bg-[#0a3d2e] flex-col justify-between p-10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#1d9e75]/15" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-[#1d9e75]/10" />

          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2.5 mb-10">
              <div className="w-8 h-8 bg-[#1d9e75] rounded-[9px] flex items-center justify-center">
                <Layers size={15} className="text-white" />
              </div>
              <span className="text-white text-[17px] font-bold tracking-tight font-display">
                FinVault
              </span>
            </Link>

            <h2 className="text-white text-[30px] font-bold leading-[1.15] tracking-[-0.5px] mb-3 font-display">
              Start your{" "}
              <em className="text-[#5DCAA5] not-italic">journey.</em>
            </h2>
            <p className="text-[#6fa890] text-[13px] leading-relaxed">
              Open a free account in under 2 minutes.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "AI chat banking assistant",
                "Instant money transfers",
                "Full transaction history",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5DCAA5]" />
                  <span className="text-[13px] text-[#9FE1CB]">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-[12px] px-4 py-3">
              <p className="text-[11px] text-[#6fa890] font-semibold tracking-wide uppercase mb-1">
                Setup time
              </p>
              <p className="text-white text-[22px] font-bold font-display">
                &lt; 2 <span className="text-[16px] text-[#5DCAA5]">minutes</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex-1 bg-white px-10 py-9 overflow-y-auto">

          {/* Mobile logo */}
          <Link href="/" className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-7 h-7 bg-[#0a3d2e] rounded-[8px] flex items-center justify-center">
              <Layers size={13} className="text-[#5DCAA5]" />
            </div>
            <span className="text-[#0a3d2e] text-[16px] font-bold font-display">FinVault</span>
          </Link>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-[#0a3d2e] text-[24px] font-bold tracking-[-0.3px] font-display">
                Create account
              </h1>
              <p className="text-[#8a9e96] text-[13px] mt-1">Fill in your details below</p>
            </div>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#085041] bg-[#E1F5EE] border border-[#9FE1CB] px-3 py-1.5 rounded-full">
              <Sparkles size={12} />
              Free
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10.5px] font-semibold text-[#6b8a7a] tracking-[0.7px] uppercase">
                  Full name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange("name")}
                  placeholder="Mazaharul Islam"
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10.5px] font-semibold text-[#6b8a7a] tracking-[0.7px] uppercase">
                  Email address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] font-semibold text-[#6b8a7a] tracking-[0.7px] uppercase">
                Home address
              </label>
              <input
                type="text"
                value={form.address}
                onChange={handleChange("address")}
                placeholder="House 12, Road 5, Jessore, Bangladesh"
                required
                className={inputClass}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-[#e8efeb] my-1" />

            {/* Passcode */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] font-semibold text-[#6b8a7a] tracking-[0.7px] uppercase">
                Set your 4-digit passcode
              </label>
              <PinInput pin={pin} setPin={setPin} id="reg-pin" />
              <p className="text-[11.5px] text-[#b5c9c1] mt-0.5">
                You&apos;ll use this PIN to sign in. Keep it safe.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] px-4 py-3 rounded-[10px]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 h-[46px] bg-[#0a3d2e] hover:bg-[#0f5c44] active:scale-[0.99] text-white text-[14px] font-semibold rounded-[11px] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? "Creating account..." : "Create my account"}
              {!loading && (
                <span className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center">
                  <ArrowRight size={11} />
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-[13px] text-[#8a9e96] mt-5">
            Already a member?{" "}
            <Link href="/login" className="text-[#1d9e75] font-semibold hover:underline">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}