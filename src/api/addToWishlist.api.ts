"use server"
import getMyToken from "@/utilities/getMyToken"
 
export const addToWishlistApi = async (productId: string) => {
  const token = await getMyToken()

  if (!token) {
    throw new Error("pls login")
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  })

  const payload = await res.json()
  return payload
}

export default addToWishlistApi
