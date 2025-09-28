"use server"
import getMyToken from "@/utilities/getMyToken";

export default async function getLoggedUserCart() {
  const token = await getMyToken()
  if (!token) {
    throw new Error("pls login")
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "GET",
    cache: "no-store",
    next: { revalidate: 0 },
    headers: {
      token,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error("Cart API Error:", res.status, errorText)
    throw new Error(`Cart API failed with status ${res.status}`)
  }

  const contentType = res.headers.get("content-type")
  if (!contentType?.includes("application/json")) {
    const text = await res.text()
    console.error("Cart API Invalid Response:", text)
    throw new Error("Cart API returned non-JSON response")
  }

  const payload = await res.json()
  return payload
}
