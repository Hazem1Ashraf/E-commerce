"use client"

import { useState, useMemo } from "react"
import SearchBar from "../SearchBar/SearchBar"
import SingleProduct from "../SingleProduct/SingleProduct"
import type { ProductType } from "@/types/products.type"

export default function SearchClientWrapper({ products }: { products: ProductType[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      (product.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm])

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />

      <div className="flex flex-wrap">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <SingleProduct key={product._id} id={product._id} product={product} />
          ))
        ) : (
          <p className="text-center w-full text-gray-500 text-lg">No products found.</p>
        )}
      </div>
    </>
  )
}
