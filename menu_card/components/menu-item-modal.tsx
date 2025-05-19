
"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import type { MenuItem } from "@/types/menu"

interface MenuItemModalProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
}

export function MenuItemModal({ item, isOpen, onClose }: MenuItemModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  if (!item) return null

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(item)
    }
    onClose()
    setQuantity(1) // Reset quantity after adding to cart
  }

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{item.name}</DialogTitle>
          <DialogDescription className="text-right text-lg font-medium text-amber-600">
            ${item.price.toFixed(2)}
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-2 h-56 w-full overflow-hidden rounded-md">
          <Image
            src={item.imagePath || "/placeholder.svg?height=400&width=500"}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-4">
          <p className="text-gray-700">{item.description}</p>

          {item.ingredients && (
            <div className="mt-4">
              <h4 className="mb-2 font-semibold">Ingredients:</h4>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4 flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={decreaseQuantity}
            >
              <Minus size={16} />
            </Button>
            <div className="flex h-8 w-10 items-center justify-center border-y bg-white text-center">{quantity}</div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={increaseQuantity}
            >
              <Plus size={16} />
            </Button>
          </div>
          <Button className="bg-amber-500 hover:bg-amber-600" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
