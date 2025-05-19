"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, UtensilsCrossed, User } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { CartDropdown } from "@/components/cart-dropdown"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-amber-500">
          <UtensilsCrossed size={24} />
          <span>Gourmet Delights</span>
        </Link>

        <nav className="hidden space-x-6 md:flex">
          <Link href="/" className="text-gray-600 hover:text-amber-500">
            Menu
          </Link>
          <Link href="/reserve" className="text-gray-600 hover:text-amber-500">
            Reservations
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-amber-500">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-amber-500">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="outline" size="icon" className="relative" onClick={() => setIsCartOpen(!isCartOpen)}>
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Button>
            {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="font-medium">{user.name}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/reservations">Reservations</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/analytics">Analytics</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}

          <Link href="/cart">
            <Button className="bg-amber-500 hover:bg-amber-600">Order Now</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
