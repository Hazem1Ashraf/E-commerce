import { SubCategory, Category } from "@/types/categoriesAndSup.type";

interface Props {
  subcategories: SubCategory[];
  selectedCategory: Category | null;
}

export default function SubCategories({ subcategories, selectedCategory }: Props) {
  if (!selectedCategory) return null;

  const filteredSubs = subcategories.filter(
    (sub) => sub.category === selectedCategory._id
  );

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-6 text-indigo-600 text-center">
        Subcategories of {selectedCategory.name}
      </h2>

      {filteredSubs.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSubs.map((sub) => (
            <div
              key={sub._id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl 
                         text-center transform hover:scale-105 transition"
            >
              <h3 className="font-medium text-gray-700">{sub.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No subcategories for this category.
        </p>
      )}
    </div>
  );
}
