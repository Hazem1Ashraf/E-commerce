import getProducts from "@/api/products.api"
import SearchClientWrapper from "../SearchClientWrapper/SearchClientWrapper" // 👈 ملف صغير client هنشرحه تحت

export default async function AllProducts() {
  const data = await getProducts()

  return (
    <div className="container w-[80%] mx-auto my-12">

      <SearchClientWrapper products={data} />
    </div>
  )
}
