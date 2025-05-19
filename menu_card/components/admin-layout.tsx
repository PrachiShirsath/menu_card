"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard,
  ShoppingBag,
  CalendarDays,
  BarChart3,
  Settings,
  Menu,
  UtensilsCrossed,
  LogOut,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Reservations", href: "/admin/reservations", icon: CalendarDays },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  const NavLink = ({ href, icon: Icon, name, isMobile = false }: any) => {
    const isActive = typeof window !== "undefined" && window.location.pathname === href

    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
          isActive ? "bg-amber-100 text-amber-900" : "text-gray-600 hover:bg-amber-50 hover:text-amber-900",
          isMobile && "w-full",
        )}
      >
        <Icon size={20} />
        <span>{name}</span>
      </Link>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-64 flex-col border-r bg-white p-6 lg:flex">
        <div className="flex items-center gap-2 pb-6">
          <UtensilsCrossed className="h-6 w-6 text-amber-500" />
          <span className="text-lg font-bold">Gourmet Admin</span>
        </div>

        <Separator className="mb-6" />

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.name} href={item.href} icon={item.icon} name={item.name} />
          ))}
        </nav>

        <div className="mt-auto pt-6">
          <Separator className="mb-6" />
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-gray-600 hover:bg-red-50 hover:text-red-600"
            onClick={logout}
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-16 items-center gap-2 border-b px-6">
                <UtensilsCrossed className="h-6 w-6 text-amber-500" />
                <span className="text-lg font-bold">Gourmet Admin</span>
              </div>
              <nav className="flex flex-col gap-1 p-6">
                {navItems.map((item) => (
                  <NavLink key={item.name} href={item.href} icon={item.icon} name={item.name} isMobile />
                ))}
                <Separator className="my-4" />
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-gray-600 hover:bg-red-50 hover:text-red-600"
                  onClick={logout}
                >
                  <LogOut size={18} />
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-amber-500" />
            <span className="font-semibold">Gourmet Admin</span>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
