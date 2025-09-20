import axios from "axios";

export async function createCashOrder(
  userId: string,
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  }
) {
  try {
    const res = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${userId}`,
      { shippingAddress },
      {
        headers: {
          token: localStorage.getItem("token") || "",
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to create order");
    }
    throw new Error("Failed to create order");
  }
}
