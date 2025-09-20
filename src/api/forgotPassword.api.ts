"use server"

export async function forgotPasswordApi(email: string) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  )

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data?.message || "Email not found")
  }

  return await res.json()
}