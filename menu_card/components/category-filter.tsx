"use client"

import { Button } from "@/components/ui/button"
import type { Category } from "@/types/menu"

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string | null
  onSelectCategory: (categoryId: string | null) => void
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onSelectCategory(null)}
        className={selectedCategory === null ? "bg-amber-500 hover:bg-amber-600" : ""}
      >
        All
      </Button>

      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          onClick={() => onSelectCategory(category.id)}
          className={selectedCategory === category.id ? "bg-amber-500 hover:bg-amber-600" : ""}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )
}
