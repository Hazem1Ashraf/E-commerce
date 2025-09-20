import { ProductType } from "@/types/products.type";
import React from "react";
import AddBtn from "../AddBtn/AddBtn";
import Image from "next/image";
import WishlistBtn from "../wishlistbtn/wishlist-btn";

export default function Details({ data }: { data: ProductType }) { 
  return (
    <>
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <h1 className="text-3xl font-extrabold text-center mb-10 text-gray-800">
          Product Details
        </h1>

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="flex justify-center items-center relative">
  <Image
    src={data.imageCover}
    alt={data.title}
    width={80}
    height={80}
    className="w-full max-h-[500px] object-contain rounded-lg"
  />

  {/* زرار الـ Wishlist يتثبت فوق الصورة */}
  <div className="absolute top-4 right-4">
    <WishlistBtn productId={data.id} isInWishlist={false} />
  </div>
</div>


          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              {data.title}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {data.description}
            </p>

            <div className="space-y-3">
              <p className="text-2xl font-bold text-blue-600">
                ${data.price}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold">Category:</span>{" "}
                {data.category.name}
              </p>
              <p className="text-lg font-medium text-gray-700 flex items-center">
                <span className="font-semibold mr-2">Ratings:</span>
                {data.ratingsAverage}
                <i className="fa-solid fa-star text-yellow-400 ml-2"></i>
              </p>
            </div>

            <div className="mt-8 flex space-x-4">
              <AddBtn id={data.id}/>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
