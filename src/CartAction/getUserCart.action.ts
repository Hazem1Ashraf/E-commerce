"use server";
import getMyToken from "@/utilities/getMyToken";

export interface Product {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface CartResponse {
  status: "success" | "error";
  data?: {
    products: Product[];
  };
  cartId?: string;
  message?: string;
}

export default async function getLoggedUserCart(): Promise<CartResponse> {
  try {
    const token = await getMyToken();
    if (!token) {
      return { status: "error", message: "Please login first." };
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "GET",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return {
        status: "error",
        message: `Failed to fetch cart (status ${res.status})`,
      };
    }

    const payload: CartResponse = await res.json();

    if (payload?.status === "success") {
      return payload;
    }

    return { status: "error", message: payload?.message || "Unknown error" };
  } catch (err) {
    return { status: "error", message: "Unexpected error occurred" };
  }
}
