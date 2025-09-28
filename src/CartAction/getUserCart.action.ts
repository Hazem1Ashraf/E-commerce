"use server";
import getMyToken from "@/utilities/getMyToken";
import { toast } from "sonner";

// حدد نوع الريسبونس المتوقع
interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
}

interface CartResponse {
  status: string;
  cartId: string;
  data: {
    products: CartProduct[];
  };
}

export default async function getLoggedUserCart(): Promise<CartResponse | null> {
  try {
    const token = await getMyToken();
    if (!token) {
      toast.error("❌ Please login first", {
        duration: 2000,
        position: "top-center",
      });
      return null;
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "GET",
      cache: "no-store",
      next: { revalidate: 0 },
      headers: {
        token,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      toast.error(`❌ Cart API failed with status ${res.status}`, {
        duration: 2000,
        position: "top-center",
      });
      return null;
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text(); // نقرأ الرد كـ نص عشان نفهم المشكلة
      toast.error("❌ Cart API returned invalid response", {
        duration: 2000,
        position: "top-center",
      });
      console.warn("Invalid Cart API Response:", text); // للديباج
      return null;
    }

    const payload: CartResponse = await res.json();
    return payload;
  } catch (error) {
    toast.error("❌ Error fetching cart", {
      duration: 2000,
      position: "top-center",
    });
    return null;
  }
}
