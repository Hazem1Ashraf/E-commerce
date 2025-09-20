"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { getWishlistApi, removeFromWishlistApi, type Product } from "@/api/wishlist.api";
import { toast } from "sonner";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlistApi();
      setWishlist(data);
    } catch {
      toast.error("Failed to fetch wishlist", {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      setRemoving(productId);
      await removeFromWishlistApi(productId);
      setWishlist((prev) => prev.filter((item) => item.id !== productId));

      toast.success("Removed from wishlist", {
        duration: 2000,
        position: "top-center",
      });
    } catch {
      toast.error("Failed to remove item", {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setRemoving(null);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading)
    return (
      <p className="text-center text-lg font-semibold mt-10 animate-pulse">
        Loading wishlist...
      </p>
    );

  if (wishlist.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
        <p className="text-xl font-medium">Your wishlist is empty 🛒</p>
      </div>
    );

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6">
      {wishlist.map((item) => (
        <Card
          key={item.id}
          className="group relative rounded-3xl overflow-hidden border border-gray-200 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <CardContent className="p-0">

            <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <Image
                src={item.imageCover}
                alt={item.title}
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              />


              <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {item.category?.name}
              </span>
            </div>


            <div className="p-5 flex flex-col justify-between h-[190px]">
              <div>
                <h2 className="font-bold text-lg text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                  {item.title}
                </h2>


                <div className="mt-3">
                  {item.priceAfterDiscount ? (
                    <p className="text-base">
                      <span className="line-through text-gray-400 mr-2">
                        {item.price} EGP
                      </span>
                      <span className="text-green-600 font-bold text-lg">
                        {item.priceAfterDiscount} EGP
                      </span>
                    </p>
                  ) : (
                    <p className="text-gray-900 font-bold text-lg">
                      {item.price} EGP
                    </p>
                  )}
                </div>
              </div>


              <Button
                variant="destructive"
                size="sm"
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                onClick={() => handleRemove(item.id)}
                disabled={removing === item.id}
              >
                {removing === item.id ? (
                  <span className="animate-pulse">Removing...</span>
                ) : (
                  <>
                    <Trash2 size={16} /> Remove
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}