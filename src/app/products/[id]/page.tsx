import getSelectedProduct from "@/api/SelectedProduct.api";
import Details from "@/app/_component/Details/Details";
import getRelatedProducts from "@/ProductCategoryActions/relatedProducts.action";
import { ProductType } from "@/types/products.type";
import SingleProductduct from '@/app/_component/SingleProduct/SingleProduct';
import React from "react";
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getSelectedProduct(id);
  const RelatedProducts = await getRelatedProducts(data.category._id)
  if(!data)return <h1>No Products here</h1>
  

  return <>
     <Details data={data} />;

      <div className="container w-[80%] mx-auto my-12">
                   <div className="flex flex-wrap">
                     {RelatedProducts.data.map((product:ProductType) => (
                       <SingleProductduct 
                         key={product._id}
                         id={product._id}
                         product={product} 
                       />
           
                     ))}
                   </div>
              
                 </div>
</>
}