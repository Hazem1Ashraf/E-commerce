import { Category, SubCategory } from "@/types/categoriesAndSup.type";


export async function getCategories(): Promise<Category[]>
{
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data;
}

export async function getSubCategories(): Promise<SubCategory[]> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch subcategories");
  const data = await res.json();
  return data.data;
}
