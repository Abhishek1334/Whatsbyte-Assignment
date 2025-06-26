import { Product } from "@/types";

const products: Product[] = [
  // Electronics
  {
    id: "1",
    title: "iPhone 15 Pro",
    description: "Latest Apple smartphone with A17 Pro chip and titanium design",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1605236453806-b25e7d3d4cd3?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Electronics",
    brand: "Apple",
    price: 999,
    rating: 4.8,
  },
  {
    id: "2",
    title: "MacBook Pro 14-inch",
    description: "Apple M3 chip, 16GB RAM, 512GB SSD",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Electronics",
    brand: "Apple",
    price: 2499,
    rating: 4.9,
  },
  {
    id: "3",
    title: "Samsung Galaxy Watch 6",
    description: "Advanced smartwatch with health monitoring",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Electronics",
    brand: "Samsung",
    price: 329,
    rating: 4.6,
  },
  {
    id: "4",
    title: "Sony WH-1000XM5",
    description: "Wireless noise-canceling headphones",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Electronics",
    brand: "Sony",
    price: 399,
    rating: 4.7,
  },
  {
    id: "5",
    title: "iPad Air 5th Gen",
    description: "10.9-inch Liquid Retina display with M1 chip",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Electronics",
    brand: "Apple",
    price: 599,
    rating: 4.5,
  },
  {
    id: "6",
    title: "Canon EOS R6 Mark II",
    description: "Full-frame mirrorless camera with 4K video",
    images: [
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Electronics",
    brand: "Canon",
    price: 2499,
    rating: 4.8,
  },
  {
    id: "7",
    title: "Nintendo Switch OLED",
    description: "Gaming console with vibrant 7-inch OLED screen",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Electronics",
    brand: "Nintendo",
    price: 349,
    rating: 4.6,
  },
  {
    id: "8",
    title: "AirPods Pro 2nd Gen",
    description: "Active noise cancellation with spatial audio",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Electronics",
    brand: "Apple",
    price: 249,
    rating: 4.7,
  },

  // Clothing
  {
    id: "9",
    title: "Premium Cotton T-Shirt",
    description: "100% organic cotton, comfortable fit",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Clothing",
    brand: "Uniqlo",
    price: 29.99,
    rating: 4.3,
  },
  {
    id: "10",
    title: "Classic Denim Jeans",
    description: "Slim fit blue denim with stretch comfort",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1506629905607-53e103a0265d?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Clothing",
    brand: "Levi's",
    price: 79.99,
    rating: 4.4,
  },
  {
    id: "11",
    title: "Wool Sweater",
    description: "Soft merino wool pullover sweater",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1566479154-8cfa1f7dfcb8?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1564557287817-3785e38ec0f5?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Clothing",
    brand: "H&M",
    price: 89.99,
    rating: 4.5,
  },
  {
    id: "12",
    title: "Running Sneakers",
    description: "Lightweight athletic shoes for daily training",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Clothing",
    brand: "Nike",
    price: 119.99,
    rating: 4.6,
  },
  {
    id: "13",
    title: "Leather Jacket",
    description: "Genuine leather biker jacket with premium finish",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1506629905607-53e103a0265d?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Clothing",
    brand: "Zara",
    price: 299.99,
    rating: 4.7,
  },
  {
    id: "14",
    title: "Summer Dress",
    description: "Flowy floral print dress perfect for summer",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Clothing",
    brand: "Forever 21",
    price: 59.99,
    rating: 4.2,
  },
  {
    id: "15",
    title: "Business Shirt",
    description: "Formal white cotton shirt for office wear",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&crop=center&bg=white",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&crop=center&bg=white"
    ],
    category: "Clothing",
    brand: "Uniqlo",
    price: 49.99,
    rating: 4.4,
  },
];

export default products;
