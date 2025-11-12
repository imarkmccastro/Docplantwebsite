import { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  seller: string;
  image: string;
  category: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    price: 2299,
    rating: 4.8,
    seller: 'Green Gardens',
    image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tropical',
  },
  {
    id: 2,
    name: 'Succulent Collection',
    price: 1499,
    rating: 4.9,
    seller: 'Desert Blooms',
    image: 'https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzYyNTgzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Succulents',
  },
  {
    id: 3,
    name: 'Indoor Plant Bundle',
    price: 4499,
    rating: 4.7,
    seller: 'Urban Jungle',
    image: 'https://images.unsplash.com/photo-1615420733059-0d97cf9ed9e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50cyUyMGluZG9vcnxlbnwxfHx8fDE3NjI2NTg1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor',
  },
  {
    id: 4,
    name: 'Potted Plants Mix',
    price: 2649,
    rating: 4.6,
    seller: 'Plant Paradise',
    image: 'https://images.unsplash.com/photo-1598838073192-05c942ede858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBwbGFudCUyMHN0b3JlfGVufDF8fHx8MTc2MjY1ODUzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor',
  },
  {
    id: 5,
    name: 'Bird of Paradise',
    price: 3299,
    rating: 4.9,
    seller: 'Green Gardens',
    image: 'https://images.unsplash.com/photo-1626929252164-27c26d107b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50fGVufDF8fHx8MTc2MjU2NzY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tropical',
  },
  {
    id: 6,
    name: 'Snake Plant',
    price: 1799,
    rating: 4.7,
    seller: 'Urban Jungle',
    image: 'https://images.unsplash.com/photo-1615420733059-0d97cf9ed9e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50cyUyMGluZG9vcnxlbnwxfHx8fDE3NjI2NTg1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Low Light',
  },
  {
    id: 7,
    name: 'Jade Plant',
    price: 1249,
    rating: 4.8,
    seller: 'Desert Blooms',
    image: 'https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzYyNTgzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Succulents',
  },
  {
    id: 8,
    name: 'Lavender Plant',
    price: 1449,
    rating: 4.6,
    seller: 'Garden Delights',
    image: 'https://images.unsplash.com/photo-1598838073192-05c942ede858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBwbGFudCUyMHN0b3JlfGVufDF8fHx8MTc2MjY1ODUzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outdoor',
  },
];

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, { ...product, id: newId }]);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, ...updates } : p
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
