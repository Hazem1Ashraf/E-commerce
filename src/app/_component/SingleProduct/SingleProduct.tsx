import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import type { ProductType } from "./../../../types/products.type"
import AddBtn from "../AddBtn/AddBtn"
import WishlistBtn from "@/app/_component/wishlistbtn/wishlist-btn"

interface SingleProductProps {
  product: ProductType
  id: string
}

export default function SingleProduct({ product, id }: SingleProductProps) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5">
      <Card className="gap-4 m-2 hover:scale-105 duration-300 cursor-pointer">
        <Link href={`/products/${id}`}>
          <CardHeader>
            <CardTitle>
              <div className="relative">
                <Image
                  src={product.imageCover || "/placeholder.svg"}
                  alt={product.title}
                  className="object-cover rounded-md"
                  width={300}
                  height={300}
                />
                <WishlistBtn productId={product.id} isInWishlist={false} />
              </div>
            </CardTitle>
            <CardDescription className="text-green-500 font-bold">{product.category.name}</CardDescription>
          </CardHeader>

          <CardContent>
            <CardTitle className="font-bold line-clamp-2">{product.title}</CardTitle>
            <CardDescription className="text-gray-500 line-clamp-2">{product.description}</CardDescription>
          </CardContent>

          <CardFooter>
            <div className="flex justify-between w-full">
              <span>
                <CardDescription className="text-black">${product.price}</CardDescription>
              </span>
              <span>
                <CardDescription className="text-black">
                  {product.ratingsAverage}
                  <i className="fa-solid fa-star text-yellow-300"></i>
                </CardDescription>
              </span>
            </div>
          </CardFooter>
        </Link>
        <AddBtn id={product.id} />
      </Card>
    </div>
  )
}
