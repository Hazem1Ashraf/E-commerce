"use server";

import getMyToken from "@/utilities/getMyToken";

const removeFromWishlistApi = async (productId: string) => {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Please login first");
  }

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: { token },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to remove from wishlist");
  }

  return res.json();
};

export default removeFromWishlistApi;
