"use client"

import type { Category, MenuItem } from "@/types/menu"
import { MenuItemCard } from "@/components/menu-item-card"

interface MenuCategoryProps {
  category: Category
  items: MenuItem[]
  onItemClick: (item: MenuItem) => void
}

export function MenuCategory({ category, items, onItemClick }: MenuCategoryProps) {
  return (
    <div className="rounded-lg bg-gray-50 p-6">
      <h3 className="mb-2 text-2xl font-semibold text-gray-800">{category.name}</h3>
      <p className="mb-6 text-gray-600">{category.description}</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} onClick={() => onItemClick(item)} />
        ))}
      </div>
    </div>
  )
}
