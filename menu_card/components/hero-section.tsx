import { Button } from "@/components/ui/button"
import { UtensilsCrossed } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative bg-[url('/images/bg.png?height=800&width=1800')]  bg-center py-55 text-white">
      <div className="absolute inset-0 bg-black/60" />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 text-3xl font-bold text-amber-400">
          <UtensilsCrossed size={32} />
          <h1>Gourmet Delights</h1>
        </div>
        <p className="mt-4 text-xl">Exquisite Cuisine for Every Palate</p>
        <div className="mt-8 flex justify-center gap-8">
          <Button className="bg-amber-500 hover:bg-amber-600">Reserve a Table</Button>
          <Button  className="bg-amber-500 hover:bg-amber-600">
            Order Online
          </Button>
        </div>
      </div>
    </div>
  )
}


