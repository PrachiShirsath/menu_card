export interface Category {
  id: string
  name: string
  description: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  imagePath?: string
  ingredients?: string[]
}
