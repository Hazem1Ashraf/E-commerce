"use server"

export async function verifyResetCodeApi(code: string) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetCode: code }),
    }
  )

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data?.message || "Invalid code")
  }

  return await res.json()
}
