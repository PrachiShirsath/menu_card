"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"
import { useRef, useEffect } from "react"

interface CartDropdownProps {
  onClose: () => void
}

export function CartDropdown({ onClose }: CartDropdownProps) {
  const { cartItems, removeFromCart, subtotal } = useCart()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div ref={dropdownRef} className="absolute right-0 top-12 w-80 rounded-md border bg-white p-4 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Your Cart</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      {cartItems.length === 0 ? (
        <p className="py-4 text-center text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="max-h-60 space-y-3 overflow-y-auto">
            {cartItems.map((cartItem) => (
              <div key={cartItem.item.id} className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <p className="font-medium">{cartItem.item.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      ${cartItem.item.price.toFixed(2)} × {cartItem.quantity}
                    </span>
                    <span className="font-medium">${(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-400 hover:text-red-500"
                  onClick={() => removeFromCart(cartItem.item.id)}
                >
                  <X size={14} />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-3">
            <div className="mb-4 flex items-center justify-between font-medium">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Link href="/cart" className="flex-1" onClick={onClose}>
                <Button variant="outline" className="w-full">
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout" className="flex-1" onClick={onClose}>
                <Button className="w-full bg-amber-500 hover:bg-amber-600">Checkout</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
