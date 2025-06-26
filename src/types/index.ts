export interface Product {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  brand: string;
  price: number;
  rating?: number;
}
