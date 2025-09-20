"use client";

import { useState, type MouseEvent } from "react";
import { Heart } from "lucide-react";
import { addToWishlistApi } from "@/api/addToWishlist.api";
import removeFromWishlistApi from "@/api/removeFromWishlist.api";
import { toast } from "sonner";

interface WishlistBtnProps {
  productId: string;
  isInWishlist?: boolean;
}

export default function WishlistBtn({
  productId,
  isInWishlist = false,
}: WishlistBtnProps) {
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist);
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlistToggle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isWishlisted) {
        await removeFromWishlistApi(productId);
        setIsWishlisted(false);
        toast.success("Removed from wishlist", {
          duration: 1800,
          position: "top-center",
        });
      } else {
        await addToWishlistApi(productId);
        setIsWishlisted(true);
        toast.success("Added to wishlist", {
          duration: 1800,
          position: "top-center",
        });
      }
    } catch {
      toast.error("Something went wrong. Try again!", {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={isLoading}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={`
        absolute top-3 right-3 z-10
        p-2 rounded-full shadow-md backdrop-blur-md
        bg-white/90 hover:bg-white
        transition-all duration-300
        ${isLoading ? "opacity-50 pointer-events-none" : "hover:scale-110"}
      `}
    >
      <Heart
        className={`w-5 h-5 transition-colors duration-300 ${
          isWishlisted
            ? "fill-red-500 text-red-500 drop-shadow-md"
            : "text-gray-600 hover:text-red-500"
        }`}
      />
    </button>
  );
}
