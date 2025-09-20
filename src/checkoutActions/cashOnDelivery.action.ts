"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function cashPayment(
  cartId: string,
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  }
) {
  const token = await getMyToken();
  if (!token) throw new Error("You are not logged in. Please login first.");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ shippingAddress }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create cash order");
  }

  return await res.json();
}
