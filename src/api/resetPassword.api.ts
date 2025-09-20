"use server"

export async function resetPasswordApi(email: string, newPassword: string) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    }
  )

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data?.message || "Failed to reset password")
  }

  return await res.json()
}
