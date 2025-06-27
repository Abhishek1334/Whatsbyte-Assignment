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

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  totalItems: number;
}
