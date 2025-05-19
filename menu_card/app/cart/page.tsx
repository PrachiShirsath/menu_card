"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")

  const tax = subtotal * 0.08
  const total = subtotal + tax

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <ShoppingCart size={48} className="text-gray-400" />
        </div>
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mb-8 text-gray-600">Looks like you haven't added any items to your cart yet.</p>
        <Link href="/">
          <Button className="bg-amber-500 hover:bg-amber-600">Browse Menu</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-white">
            <div className="p-6">
              <div className="mb-4 flex justify-between border-b pb-4">
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                <span className="text-gray-600">{cartItems.length} Items</span>
              </div>

              <div className="divide-y">
                {cartItems.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex py-6">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={cartItem.item.imagePath || "/placeholder.svg?height=200&width=200"}
                        alt={cartItem.item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium">{cartItem.item.name}</h3>
                        <p className="font-medium">${(cartItem.item.price * cartItem.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-1">{cartItem.item.description}</p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                          >
                            <Minus size={16} />
                          </Button>
                          <div className="flex h-8 w-10 items-center justify-center border-y bg-white text-center">
                            {cartItem.quantity}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => removeFromCart(cartItem.item.id)}
                        >
                          <Trash2 size={16} className="mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => clearCart()}>
                  Clear Cart
                </Button>
                <Link href="/">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 border-b pb-4 text-xl font-semibold">Order Summary</h2>

          <div className="mb-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="promo" className="text-sm font-medium">
                Promo Code
              </label>
            </div>
            <div className="flex gap-2">
              <Input
                id="promo"
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button variant="outline">Apply</Button>
            </div>
          </div>

          <Link href="/checkout">
            <Button className="w-full bg-amber-500 hover:bg-amber-600">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
