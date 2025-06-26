import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import products from '@/data/products';
import { Product } from '@/types';

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-dark mb-4">Product Not Found</h1>
          <button 
            onClick={() => router.push('/')}
            className="bg-primary text-text-light px-6 py-2 rounded-lg hover:bg-blue-900 transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto py-8">
        <button 
          onClick={() => router.back()}
          className="mb-6 bg-gray-200 text-text-dark px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back
        </button>
        
        {/* Product Details Content - Left blank for user to implement later */}
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-text-dark mb-4">{product.title}</h1>
          <p className="text-xl text-gray-600 mb-8">${product.price}</p>
          <div className="bg-gray-100 rounded-lg p-8 max-w-md mx-auto">
            <p className="text-gray-500">Product details page content goes here...</p>
            <p className="text-sm text-gray-400 mt-4">
              Product ID: {product.id} | Category: {product.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 