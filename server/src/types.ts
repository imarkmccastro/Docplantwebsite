export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  seller: string;
  image: string;
  category: 'Tropical' | 'Succulents' | 'Indoor' | 'Outdoor' | 'Low Light';
  updated_at?: string;
}
