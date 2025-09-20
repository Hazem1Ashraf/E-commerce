import { Category } from "@/types/categoriesAndSup.type";
import Image from "next/image";

interface Props {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryCard({ category, isSelected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white rounded-2xl overflow-hidden 
        transform hover:scale-105 transition duration-300 
        shadow-md hover:shadow-xl flex flex-col justify-center 
        items-center border ${
          isSelected ? "ring-2 ring-indigo-500" : "border-transparent"
        }`}
    >
      <div className="w-full h-40 flex justify-center items-center overflow-hidden bg-gray-50">
        <Image
          src={category.image}
          alt={category.name}
          width={80}
          height={80}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-4 text-center">
        <h2 className="font-semibold text-gray-800">{category.name}</h2>
      </div>
    </div>
  );
}
