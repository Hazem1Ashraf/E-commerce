"use server"

import getMyToken from "@/utilities/getMyToken"

export interface Product {
  id: string
  title: string
  price: number
  priceAfterDiscount?: number
  imageCover: string
  category: { name: string }
  brand?: { name: string }
}

export const getWishlistApi = async (): Promise<Product[]> => {
  const token = await getMyToken()
  if (!token) throw new Error("Please login first")

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: { token },
    cache: "no-store",
  })

  if (!res.ok) throw new Error("Failed to fetch wishlist")
  const data = await res.json()
  return data?.data || []
}

export const removeFromWishlistApi = async (productId: string) => {
  const token = await getMyToken()
  if (!token) throw new Error("Please login first")

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: { token },
  })

  if (!res.ok) throw new Error("Failed to remove item")
  return await res.json()
}
