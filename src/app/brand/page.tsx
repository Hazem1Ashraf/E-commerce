"use client";

import { useEffect, useState } from "react";
import { getBrands } from "@/api/brands.api";
import { Brand } from "@/types/brands.type";
import Image from "next/image";

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Our Brands
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="group flex flex-col items-center p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              {brand.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
