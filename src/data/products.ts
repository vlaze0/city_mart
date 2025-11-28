export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
};

const data: Product[] = [
  {
    id: "p1",
    name: "Fresh Tomatoes",
    description: "Organic, locally grown tomatoes. Perfect for salads and sauces.",
    category: "Fresh Produce",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80",
  },
  {
    id: "p2",
    name: "Bananas",
    description: "Fresh bananas from local farms. Rich in potassium.",
    category: "Fresh Produce",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e37d?w=800&q=80",
  },
  {
    id: "p3",
    name: "Sourdough Bread",
    description: "Artisan sourdough bread baked fresh daily.",
    category: "Bakery",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1546549030-7b7305b38d6e?w=800&q=80",
  },
  {
    id: "p4",
    name: "Croissants",
    description: "Buttery, flaky croissants made with premium ingredients.",
    category: "Bakery",
    price: 4.5,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
  },
  {
    id: "p5",
    name: "Milk",
    description: "Fresh milk from local dairies.",
    category: "Dairy",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1582719478185-0c3a3a5c6c9b?w=800&q=80",
  },
  {
    id: "p6",
    name: "Cheese",
    description: "Assorted local cheeses — creamy and flavorful.",
    category: "Dairy",
    price: 6.49,
    image: "https://images.unsplash.com/photo-1585238342022-6e4a2f7f6b2b?w=800&q=80",
  },
  {
    id: "p7",
    name: "Honey",
    description: "Raw city honey sourced from local beekeepers.",
    category: "Groceries",
    price: 12.0,
    image: "https://images.unsplash.com/photo-1505576391880-4a1f8c8e9c8a?w=800&q=80",
  },
  {
    id: "p8",
    name: "Olive Oil",
    description: "Premium cold-pressed olive oil.",
    category: "Groceries",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1585238342023-1a1e1f6c6b3a?w=800&q=80",
  },
];

export default data;