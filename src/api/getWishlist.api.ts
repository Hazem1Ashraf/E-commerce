"use server";

import getMyToken from "@/utilities/getMyToken";
import type { WishlistResponse } from "@/types/wishlist.types";

export const getWishlistApi = async (): Promise<WishlistResponse> => {
  const token = await getMyToken()

  if (!token) {
    throw new Error("pls login")
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: {
      token,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch wishlist")
  }

  const payload = await res.json()
  return payload
}

export default getWishlistApi