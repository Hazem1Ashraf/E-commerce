"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { forgotPasswordApi } from "@/api/forgotPassword.api"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await forgotPasswordApi(email)
      router.push(`/verify-reset-code?email=${encodeURIComponent(email)}`)
    } catch {
      setError("Try again later")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow w-full max-w-md mx-auto mt-10"
    >
      <h2 className="text-xl font-bold mb-4">Enter your email</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded mb-3"
        placeholder="example@mail.com"
        required
      />

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Sending..." : "Send Code"}
      </button>
    </form>
  )
}