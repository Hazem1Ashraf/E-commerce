"use client";

import AddToCart from "@/CartAction/addToCart.action"; // المسار حسب مشروعك
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import React, { useContext, useState } from "react";
import { CartContext } from "@/app/context/CartContext";

export default function AddBtn({ id }: { id: string }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { numberOfCartitem, setnumberOfCartitem } = useContext(CartContext)!;

  async function checkAddProduct(id: string) {
    try {
      setLoadingId(id);

      const res = await AddToCart(id); // استدعاء السيرفر
      if (res.status === "success") {
        toast.success("✅ Product added successfully", { position: "top-center", duration: 2000 });
        setnumberOfCartitem(numberOfCartitem + 1);
      } else {
        toast.error("❌ Can't add product", { position: "top-center", duration: 2000 });
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : undefined;
      toast.error(`❌ ${errorMessage || "Failed to add product"}`, { position: "top-center", duration: 2000 });
    } finally {
      setLoadingId(null);
    }
  }

  const isLoading = loadingId === id;

  return (
    <Button
      onClick={() => checkAddProduct(id)}
      disabled={isLoading}
      className={`w-[80%] mx-auto cursor-pointer ${isLoading ? "bg-gray-600 cursor-not-allowed" : ""}`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </span>
      ) : (
        "Add To Cart"
      )}
    </Button>
  );
}
