import { Category } from "@/types/categoriesAndSup.type";
import CategoriesCart from "./CategoriesCart";

interface Props {
  categories: Category[];
  selectedId: string | null;
  onSelect: (cat: Category) => void;
}

export default function Categories({ categories, selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {categories.map((cat) => (
        <CategoriesCart
          key={cat._id}
          category={cat}
          isSelected={selectedId === cat._id}
          onClick={() => onSelect(cat)}
        />
      ))}
    </div>
  );
}
