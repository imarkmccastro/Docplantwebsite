import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchJson } from '../lib/api';

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
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  // Tropical Plants
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
    name: 'Bird of Paradise',
    price: 3299,
    rating: 4.9,
    seller: 'Green Gardens',
    image: 'https://images.unsplash.com/photo-1707993182175-c083ca003f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGhvdXNlcGxhbnR8ZW58MXx8fHwxNzYyOTUxNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tropical',
  },
  {
    id: 3,
    name: 'Philodendron Brasil',
    price: 1899,
    rating: 4.7,
    seller: 'Tropical Paradise',
    image: 'https://images.unsplash.com/photo-1595524147656-eb5d0a63e9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob3MlMjBoYW5naW5nJTIwcGxhbnR8ZW58MXx8fHwxNzYyOTUxNDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tropical',
  },
  {
    id: 4,
    name: 'Alocasia Polly',
    price: 2799,
    rating: 4.6,
    seller: 'Green Gardens',
    image: 'https://images.unsplash.com/photo-1719771886166-871859cc768c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJuJTIwaG91c2VwbGFudHxlbnwxfHx8fDE3NjI4NDg3ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tropical',
  },
  {
    id: 5,
    name: 'Calathea Ornata',
    price: 2199,
    rating: 4.8,
    seller: 'Tropical Paradise',
    image: 'https://images.unsplash.com/photo-1563419837758-e48ef1b731dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwb3R0ZWQlMjBwbGFudHxlbnwxfHx8fDE3NjI5NTE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tropical',
  },
  {
    id: 6,
    name: 'Anthurium Red',
    price: 2499,
    rating: 4.9,
    seller: 'Green Gardens',
    image: 'https://images.unsplash.com/photo-1647592398406-afed0b71be75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZmxvd2VyaW5nJTIwcGxhbnRzfGVufDF8fHx8MTc2Mjk1MTQwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tropical',
  },

  // Succulents
  {
    id: 7,
    name: 'Succulent Collection',
    price: 1499,
    rating: 4.9,
    seller: 'Desert Blooms',
    image: 'https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzYyNTgzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Succulents',
  },
  {
    id: 8,
    name: 'Jade Plant',
    price: 1249,
    rating: 4.8,
    seller: 'Desert Blooms',
    image: 'https://images.unsplash.com/photo-1654609678730-d241a2b2eb8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWN0dXMlMjBzdWNjdWxlbnQlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2Mjk1MTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Succulents',
  },
  {
    id: 9,
    name: 'Echeveria Elegans',
    price: 899,
    rating: 4.7,
    seller: 'Cactus Kingdom',
    image: 'https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzYyNTgzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Succulents',
  },
  {
    id: 10,
    name: 'Aloe Vera',
    price: 799,
    rating: 4.9,
    seller: 'Desert Blooms',
    image: 'https://images.unsplash.com/photo-1737001520770-1409b767fcb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9lJTIwdmVyYSUyMHN1Y2N1bGVudHxlbnwxfHx8fDE3NjI5NTE0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Succulents',
  },
  {
    id: 11,
    name: 'String of Pearls',
    price: 1199,
    rating: 4.6,
    seller: 'Cactus Kingdom',
    image: 'https://images.unsplash.com/photo-1654609678730-d241a2b2eb8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWN0dXMlMjBzdWNjdWxlbnQlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2Mjk1MTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Succulents',
  },
  {
    id: 12,
    name: 'Haworthia Zebra',
    price: 649,
    rating: 4.8,
    seller: 'Desert Blooms',
    image: 'https://images.unsplash.com/photo-1621512367176-03782e847fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjdWxlbnQlMjBwbGFudHN8ZW58MXx8fHwxNzYyNTgzMTA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Succulents',
  },
  {
    id: 13,
    name: 'Crassula Ovata',
    price: 1099,
    rating: 4.7,
    seller: 'Cactus Kingdom',
    image: 'https://images.unsplash.com/photo-1654609678730-d241a2b2eb8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWN0dXMlMjBzdWNjdWxlbnQlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2Mjk1MTQwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Succulents',
  },

  // Indoor Plants
  {
    id: 14,
    name: 'Indoor Plant Bundle',
    price: 4499,
    rating: 4.7,
    seller: 'Urban Jungle',
    image: 'https://images.unsplash.com/photo-1615420733059-0d97cf9ed9e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBsYW50cyUyMGluZG9vcnxlbnwxfHx8fDE3NjI2NTg1MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor',
  },
  {
    id: 15,
    name: 'Potted Plants Mix',
    price: 2649,
    rating: 4.6,
    seller: 'Plant Paradise',
    image: 'https://images.unsplash.com/photo-1598838073192-05c942ede858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBwbGFudCUyMHN0b3JlfGVufDF8fHx8MTc2MjY1ODUzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor',
  },
  {
    id: 16,
    name: 'Peace Lily',
    price: 1599,
    rating: 4.8,
    seller: 'Urban Jungle',
    image: 'https://images.unsplash.com/photo-1621923164562-21d3118adae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZSUyMGxpbHklMjBwbGFudHxlbnwxfHx8fDE3NjI5MjI0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor',
  },
  {
    id: 17,
    name: 'Rubber Plant',
    price: 1999,
    rating: 4.7,
    seller: 'Plant Paradise',
    image: 'https://images.unsplash.com/photo-1623032693199-e9abd35e0a98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydWJiZXIlMjBwbGFudCUyMGZpY3VzfGVufDF8fHx8MTc2Mjk1MTQxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor',
  },
  {
    id: 18,
    name: 'Spider Plant',
    price: 999,
    rating: 4.9,
    seller: 'Urban Jungle',
    image: 'https://images.unsplash.com/photo-1593926694520-58c358939cef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlkZXIlMjBwbGFudCUyMGhhbmdpbmd8ZW58MXx8fHwxNzYyOTMxOTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor',
  },
  {
    id: 19,
    name: 'Pothos Golden',
    price: 899,
    rating: 4.8,
    seller: 'Plant Paradise',
    image: 'https://images.unsplash.com/photo-1595524147656-eb5d0a63e9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob3MlMjBoYW5naW5nJTIwcGxhbnR8ZW58MXx8fHwxNzYyOTUxNDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor',
  },
  {
    id: 20,
    name: 'ZZ Plant',
    price: 1799,
    rating: 4.9,
    seller: 'Urban Jungle',
    image: 'https://images.unsplash.com/photo-1563419837758-e48ef1b731dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwb3R0ZWQlMjBwbGFudHxlbnwxfHx8fDE3NjI5NTE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor',
  },
  {
    id: 21,
    name: 'Dracaena Marginata',
    price: 2299,
    rating: 4.6,
    seller: 'Plant Paradise',
    image: 'https://images.unsplash.com/photo-1719771886166-871859cc768c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJuJTIwaG91c2VwbGFudHxlbnwxfHx8fDE3NjI4NDg3ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor',
  },

  // Low Light Plants
  {
    id: 22,
    name: 'Snake Plant',
    price: 1799,
    rating: 4.7,
    seller: 'Urban Jungle',
    image: 'https://images.unsplash.com/photo-1668426231244-1827c29ef8e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFrZSUyMHBsYW50JTIwaW5kb29yfGVufDF8fHx8MTc2Mjg2Mjc1NXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Low Light',
  },
  {
    id: 23,
    name: 'Cast Iron Plant',
    price: 1499,
    rating: 4.8,
    seller: 'Shade Garden',
    image: 'https://images.unsplash.com/photo-1563419837758-e48ef1b731dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwb3R0ZWQlMjBwbGFudHxlbnwxfHx8fDE3NjI5NTE0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Low Light',
  },
  {
    id: 24,
    name: 'Chinese Evergreen',
    price: 1399,
    rating: 4.9,
    seller: 'Urban Jungle',
    image: 'https://images.unsplash.com/photo-1719771886166-871859cc768c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJuJTIwaG91c2VwbGFudHxlbnwxfHx8fDE3NjI4NDg3ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Low Light',
  },
  {
    id: 25,
    name: 'Parlor Palm',
    price: 1599,
    rating: 4.7,
    seller: 'Shade Garden',
    image: 'https://images.unsplash.com/photo-1707993182175-c083ca003f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGhvdXNlcGxhbnR8ZW58MXx8fHwxNzYyOTUxNDA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Low Light',
  },
  {
    id: 26,
    name: 'Prayer Plant',
    price: 1299,
    rating: 4.6,
    seller: 'Urban Jungle',
    image: 'https://images.unsplash.com/photo-1595524147656-eb5d0a63e9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob3MlMjBoYW5naW5nJTIwcGxhbnR8ZW58MXx8fHwxNzYyOTUxNDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Low Light',
  },
  {
    id: 27,
    name: 'Dieffenbachia',
    price: 1699,
    rating: 4.8,
    seller: 'Shade Garden',
    image: 'https://images.unsplash.com/photo-1621923164562-21d3118adae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZSUyMGxpbHklMjBwbGFudHxlbnwxfHx8fDE3NjI5MjI0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Low Light',
  },

  // Outdoor Plants
  {
    id: 28,
    name: 'Lavender Plant',
    price: 1449,
    rating: 4.6,
    seller: 'Garden Delights',
    image: 'https://images.unsplash.com/photo-1657421873079-ec90d5bdae5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMGZsb3dlcnMlMjBnYXJkZW58ZW58MXx8fHwxNzYyOTUxNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outdoor',
  },
  {
    id: 29,
    name: 'Rosemary Bush',
    price: 999,
    rating: 4.9,
    seller: 'Herb Haven',
    image: 'https://images.unsplash.com/photo-1586161665517-0325578c2784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBoZXJicyUyMHJvc2VtYXJ5fGVufDF8fHx8MTc2Mjk1MTQwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outdoor',
  },
  {
    id: 30,
    name: 'Hibiscus Red',
    price: 1899,
    rating: 4.8,
    seller: 'Garden Delights',
    image: 'https://images.unsplash.com/photo-1647592398406-afed0b71be75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZmxvd2VyaW5nJTIwcGxhbnRzfGVufDF8fHx8MTc2Mjk1MTQwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outdoor',
  },
  {
    id: 31,
    name: 'Geranium Pink',
    price: 799,
    rating: 4.7,
    seller: 'Flower Power',
    image: 'https://images.unsplash.com/photo-1657421873079-ec90d5bdae5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMGZsb3dlcnMlMjBnYXJkZW58ZW58MXx8fHwxNzYyOTUxNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outdoor',
  },
  {
    id: 32,
    name: 'Bougainvillea',
    price: 2199,
    rating: 4.9,
    seller: 'Garden Delights',
    image: 'https://images.unsplash.com/photo-1647592398406-afed0b71be75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZmxvd2VyaW5nJTIwcGxhbnRzfGVufDF8fHx8MTc2Mjk1MTQwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outdoor',
  },
  {
    id: 33,
    name: 'Jasmine White',
    price: 1299,
    rating: 4.8,
    seller: 'Flower Power',
    image: 'https://images.unsplash.com/photo-1586161665517-0325578c2784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBoZXJicyUyMHJvc2VtYXJ5fGVufDF8fHx8MTc2Mjk1MTQwOHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outdoor',
  },
  {
    id: 34,
    name: 'Marigold Mix',
    price: 599,
    rating: 4.6,
    seller: 'Garden Delights',
    image: 'https://images.unsplash.com/photo-1657421873079-ec90d5bdae5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMGZsb3dlcnMlMjBnYXJkZW58ZW58MXx8fHwxNzYyOTUxNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outdoor',
  },
  {
    id: 35,
    name: 'Azalea Bush',
    price: 1999,
    rating: 4.9,
    seller: 'Flower Power',
    image: 'https://images.unsplash.com/photo-1647592398406-afed0b71be75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZmxvd2VyaW5nJTIwcGxhbnRzfGVufDF8fHx8MTc2Mjk1MTQwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outdoor',
  },
];

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  // Load products from API on mount; fallback to initialProducts if API fails
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJson<Product[]>('/products');
        setProducts(data);
      } catch {
        setProducts(initialProducts);
      }
    })();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const created = await fetchJson<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
    setProducts(prev => [...prev, created]);
  };

  const updateProduct = async (id: number, updates: Partial<Product>) => {
    const updated = await fetchJson<Product>(`/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
  };

  const deleteProduct = async (id: number) => {
    await fetchJson<void>(`/products/${id}`, { method: 'DELETE' });
    setProducts(prev => prev.filter(p => p.id !== id));
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
