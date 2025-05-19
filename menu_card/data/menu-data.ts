import type { Category, MenuItem } from "@/types/menu"

// Sample menu data
const categories: Category[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    description: "Start your meal with these delicious small plates",
  },
  {
    id: "main-courses",
    name: "Main Courses",
    description: "Hearty and satisfying entrées for every taste",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Sweet treats to end your meal on a high note",
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Refreshing drinks to complement your meal",
  },
]

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Bruschetta",
    description: "Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil",
    price:8.82,
    categoryId: "appetizers",
    imagePath: "/images/bruschetta.png?height=300&width=400&text=Bruschetta",
    ingredients: ["Bread", "Tomatoes", "Basil", "Garlic", "Olive Oil"],
  },
  {
    id: "2",
    name: "Calamari",
    description: "Crispy fried squid served with marinara sauce and lemon wedges",
    price: 12.99,
    categoryId: "appetizers",
    imagePath: "/images/calamari.png?height=200&width=100&text=Calamari",
    ingredients: ["Squid", "Flour", "Marinara Sauce", "Lemon"],
  },
  {
    id: "3",
    name: "Aloo Gobi",
    description:
      "8oz center-cut beef tenderloin grilled to perfection, served with roasted potatoes and seasonal vegetables",
    price: 34.99,
    categoryId: "main-courses",
    imagePath: "/images/aloogobi.png?height=300&width=400&text=Filet+Mignon",
    ingredients: ["Beef Tenderloin", "Potatoes", "Seasonal Vegetables", "Herbs", "Butter"],
  },
  {
    id: "4",
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon fillet grilled with lemon and herbs, served with wild rice and asparagus",
    price: 26.99,
    categoryId: "main-courses",
    imagePath: "/images/grilledsalmon.png?height=300&width=400&text=Grilled+Salmon",
    ingredients: ["Salmon", "Lemon", "Herbs", "Wild Rice", "Asparagus"],
  },
  {
    id: "5",
    name: "Mushroom Risotto",
    description: "Creamy Arborio rice slowly cooked with mushrooms, white wine, and Parmesan cheese",
    price: 18.99,
    categoryId: "main-courses",
    imagePath: "/images/Risotto-Mushroom.png?height=300&width=400&text=Mushroom+Risotto",
    ingredients: ["Arborio Rice", "Mushrooms", "White Wine", "Parmesan", "Butter", "Onion"],
  },
  {
    id: "6",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
    price: 9.99,
    categoryId: "desserts",
    imagePath: "/images/chocolatelavacake.png?height=300&width=400&text=Chocolate+Lava+Cake",
    ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Vanilla Ice Cream"],
  },
  {
    id: "7",
    name: "Tiramisu",
    description: "Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream",
    price: 8.99,
    categoryId: "desserts",
    imagePath: "/images/tiramisu.png?height=300&width=400&text=Tiramisu",
    ingredients: ["Ladyfingers", "Mascarpone", "Coffee", "Cocoa", "Eggs"],
  },
  {
    id: "8",
    name: "Craft Beer",
    description: "Selection of local craft beers",
    price: 7.99,
    categoryId: "beverages",
    imagePath: "/images/craftbeer.png?height=300&width=400&text=Craft+Beer",
  },
  {
    id: "9",
    name: "Wine",
    description: "Glass of house red or white wine",
    price: 9.99,
    categoryId: "beverages",
    imagePath: "/images/Red wine.jpg?height=300&width=400&text=Wine",
  },
]

export const menuData = {
  categories,
  menuItems,
}
