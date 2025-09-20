"use client";
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


      toast.success("✅ Product added to cart!", { duration: 4000 , position: "top-center" });
      setnumberOfCartitem(numberOfCartitem+1)
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add product", { duration: 4000 , position: "top-center" });
    }
  }

  const isLoading = loadingId !== null;

  return (
    <Button
      onClick={() => checkAddProduct(id)}
      disabled={isLoading}
      className={`w-[80%] mx-auto cursor-pointer ${
        isLoading ? "bg-gray-600 cursor-not-allowed" : ""
      }`}
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
