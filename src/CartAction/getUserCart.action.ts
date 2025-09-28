"use server"
import getMyToken from "@/utilities/getMyToken"
import { toast } from "sonner"

export default async function getLoggedUserCart() {
  try {
    const token = await getMyToken()
    if (!token) {
      toast.error("❌ Please login first", {
        duration: 2000,
        position: "top-center",
      })
      throw new Error("No token found")
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
      toast.error(`❌ Error loading cart: ${res.status}`, {
        duration: 2000,
        position: "top-center",
      })
      throw new Error(`Cart API failed: ${errorText}`)
    }

    const contentType = res.headers.get("content-type")
    if (!contentType?.includes("application/json")) {
      const text = await res.text()
      toast.error("❌ Cart API returned invalid response", {
        duration: 2000,
        position: "top-center",
      })
      throw new Error(`Invalid response: ${text}`)
    }

    const payload = await res.json()
    return payload
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "❌ Unknown error"

    toast.error(`Failed to load cart: ${message}`, {
      duration: 2000,
      position: "top-center",
    })
    throw error
  }
}
