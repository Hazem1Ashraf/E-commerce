"use client";

import { Order } from "@/types/allOrders.type";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/orders/");
        const data = await res.json();
        setOrders(data.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="animate-pulse text-lg text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">📦 All Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6"
        >
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h3 className="text-lg font-semibold">
              Order <span className="text-blue-600">#{order._id}</span>
            </h3>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              Total: ${order.totalOrderPrice}
            </span>
          </div>

          <div className="space-y-1 text-sm text-gray-700 mb-3">
            <p>
              👤 Customer:
              <span className="font-medium">{order.user?.name || "N/A"}</span>
              ({order.user?.email || "N/A"})
            </p>
            <p>
              🏠 Address: {order.shippingAddress?.city || "N/A"},
              {order.shippingAddress?.details || "N/A"} | 📞
              {order.shippingAddress?.phone || "N/A"}
            </p>
            <p>
              💳 Payment:
              <span className="capitalize">{order.paymentMethodType}</span> |
              Paid:
              <span
                className={`${
                  order.isPaid ? "text-green-600" : "text-red-600"
                } font-medium`}
              >
                {order.isPaid ? "Yes ✅" : "No ❌"}
              </span>
              | Delivered:
              <span
                className={`${
                  order.isDelivered ? "text-green-600" : "text-red-600"
                } font-medium`}
              >
                {order.isDelivered ? "Yes ✅" : "No ❌"}
              </span>
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {order.cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 items-center bg-gray-50 border rounded-lg p-3 hover:bg-gray-100 transition"
              >
            <Image
  src={item.product.imageCover}
  alt={item.product.title}
  width={64}   
  height={64}  
  className="object-cover rounded-md shadow"
/>

                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.product.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    Qty: {item.count} | Price: ${item.price}
                  </p>
                  <p className="text-xs text-gray-500">
                    ⭐ {item.product.ratingsAverage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}