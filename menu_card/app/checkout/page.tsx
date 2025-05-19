"use client"

import type React from "react"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart } = useCart()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + tax + shipping

  if (cartItems.length === 0 && !isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <ShoppingCart size={48} className="text-gray-400" />
        </div>
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mb-8 text-gray-600">You need to add items to your cart before checking out.</p>
        <Link href="/">
          <Button className="bg-amber-500 hover:bg-amber-600">Browse Menu</Button>
        </Link>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mb-4 text-2xl font-bold">Order Confirmed!</h1>
        <p className="mb-2 text-gray-600">Thank you for your order. We've sent a confirmation to your email.</p>
        <p className="mb-8 text-gray-600">Your order will be ready for pickup in approximately 30 minutes.</p>
        <Link href="/">
          <Button className="bg-amber-500 hover:bg-amber-600">Return to Menu</Button>
        </Link>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    clearCart()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">Contact Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" required />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">Order Type</h2>
                <RadioGroup defaultValue="pickup">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup">Pickup</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery">Delivery</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
                <RadioGroup defaultValue="card">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash on Pickup</Label>
                  </div>
                </RadioGroup>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="expMonth">Expiration Month</Label>
                      <Input id="expMonth" placeholder="MM" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expYear">Expiration Year</Label>
                      <Input id="expYear" placeholder="YYYY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-semibold">Special Instructions</h2>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Additional Notes</Label>
                  <Input id="instructions" placeholder="Any special requests or instructions?" />
                </div>
              </div>

              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">
                Place Order
              </Button>
            </div>
          </form>
        </div>

        <div>
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

            <div className="max-h-80 space-y-4 overflow-y-auto">
              {cartItems.map((cartItem) => (
                <div key={cartItem.item.id} className="flex justify-between">
                  <div>
                    <span className="font-medium">{cartItem.quantity} × </span>
                    <span>{cartItem.item.name}</span>
                  </div>
                  <span>${(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
