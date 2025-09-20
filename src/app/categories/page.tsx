"use client";

import { useEffect, useState } from "react";
import { Category, SubCategory } from "@/types/categoriesAndSup.type";
import { getCategories, getSubCategories } from "@/api/categories.api";
import Categories from "@/app/_component/Categories/Categories";
import SubCategories from "@/app/_component/subcategories/Subcategories";

export default function CategoriesWithSub() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [cats, subs] = await Promise.all([
          getCategories(),
          getSubCategories(),
        ]);
        setCategories(cats);
        setSubcategories(subs);
      } catch {
        setError( "Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 py-10">Error: {error}</p>
    );

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        Categories
      </h1>
      <Categories
        categories={categories}
        selectedId={selectedCategory?._id || null}
        onSelect={setSelectedCategory}
      />


      <SubCategories
        subcategories={subcategories}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
