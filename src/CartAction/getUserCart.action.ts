"use server"
import getMyToken from "@/utilities/getMyToken";

export default async function getLoggedUserCart() {
  try {
    const token = await getMyToken()
    if (!token) {
      return { success: false, message: "❌ Please login to view cart", data: null }
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
      return {
        success: false,
        message: `❌ Cart API failed (${res.status})`,
        data: null,
      }
    }

    const contentType = res.headers.get("content-type")
    if (!contentType?.includes("application/json")) {
      return {
        success: false,
        message: "❌ Cart API returned invalid response",
        data: null,
      }
    }

    const payload = await res.json()
    return { success: true, message: "✅ Cart loaded successfully", data: payload }

  } catch (error: any) {
    return {
      success: false,
      message: `❌ ${error.message || "Unknown error"}`,
      data: null,
    }
  }
}
