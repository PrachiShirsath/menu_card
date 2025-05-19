"use client"

import { useState } from "react"
import { MenuCategory } from "@/components/menu-category"
import { CategoryFilter } from "@/components/category-filter"
import { MenuItemModal } from "@/components/menu-item-modal"
import { menuData } from "@/data/menu-data"
import type { MenuItem } from "@/types/menu"

export function MenuDisplay() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const categories = menuData.categories
  const menuItems = menuData.menuItems

  const filteredItems = selectedCategory ? menuItems.filter((item) => item.categoryId === selectedCategory) : menuItems

  const groupedItems = categories
    .map((category) => ({
      category,
      items: filteredItems.filter((item) => item.categoryId === category.id),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">Our Menu</h2>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="mt-8 space-y-12">
          {groupedItems.map((group) => (
            <MenuCategory
              key={group.category.id}
              category={group.category}
              items={group.items}
              onItemClick={setSelectedItem}
            />
          ))}
        </div>
      </div>

      <MenuItemModal item={selectedItem} isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  )
}
