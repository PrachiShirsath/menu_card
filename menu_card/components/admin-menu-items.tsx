"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import { MenuItemForm } from "@/components/menu-item-form"
import type { MenuItem, Category } from "@/types/menu"

interface AdminMenuItemsProps {
  menuItems: MenuItem[]
  categories: Category[]
}

export function AdminMenuItems({ menuItems, categories }: AdminMenuItemsProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setEditingItem(null)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingItem(null)
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || "Unknown"
  }

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-semibold">Menu Items</h2>
        <Button onClick={handleAdd} className="flex items-center gap-1">
          <PlusCircle size={16} />
          Add Item
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{getCategoryName(item.categoryId)}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(item)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="outline" size="icon" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isFormOpen && <MenuItemForm item={editingItem} categories={categories} onClose={handleFormClose} />}
    </div>
  )
}
