"use client"

import type React from "react"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Eye } from "lucide-react"
import { useCart } from "@/context/cart-context"
import type { MenuItem } from "@/types/menu"

interface MenuItemCardProps {
  item: MenuItem
  onClick: () => void
}

export function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(item)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg" onClick={onClick}>
      <div className="relative h-48 w-full cursor-pointer">
        <Image
          src={item.imagePath || "/placeholder.svg?height=300&width=400"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <span className="font-medium text-amber-600">${item.price.toFixed(2)}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
            variant="outline"
            className="flex-1 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white"
          >
            <Eye size={16} className="mr-2" />
            Details
          </Button>
          <Button onClick={handleAddToCart} className="flex-1 bg-amber-500 hover:bg-amber-600">
            <ShoppingCart size={16} className="mr-2" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
