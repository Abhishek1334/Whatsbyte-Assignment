import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import products from '@/data/products';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAdding(true);
    addToCart(product, quantity);
    
    // Show toast notification
    showToast('success', `${quantity} x ${product.title} added to cart`);
    
    // Show feedback for a brief moment
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
                  <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-dark mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the product you&apos;re looking for. It may have been removed or doesn&apos;t exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/')}
              className="bg-gray-200 text-text-dark px-6 py-3 rounded-lg hover:bg-gray-300 transition flex items-center justify-center gap-2"
              aria-label="Go back to homepage"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
            <button 
              onClick={() => router.push('/')}
              className="bg-primary text-text-light px-6 py-3 rounded-lg hover:bg-blue-900 transition"
              aria-label="Browse all products"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto py-4 md:py-8 px-4">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/')}
          className="mb-6 bg-gray-200 text-text-dark px-4 py-2 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
          aria-label="Go back to homepage"
        >
          <ArrowLeft size={16} />
          Back to Shopping
        </button>
        
        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Image Section (Left) */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="aspect-square bg-white rounded-xl overflow-hidden shadow-md">
              <Image
                src={product.images[selectedImageIndex]}
                alt={`${product.title} by ${product.brand} - Main view`}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            
            {/* Image Carousel - Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-primary shadow-md scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    aria-label={`View ${product.title} image ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - View ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section (Right) */}
          <div className="space-y-6">
            
            {/* Product Title */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-dark leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div className="border-b border-gray-200 pb-4">
              <p className="text-3xl md:text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            {/* Category */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-2">Category</h3>
              <span className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-text-dark mb-3">Quantity</h3>
              <div className="flex items-center" role="group" aria-label="Quantity selector">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 border border-gray-300 rounded-l-lg hover:bg-gray-100 transition flex items-center justify-center"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <div className="w-16 h-10 border-t border-b border-gray-300 flex items-center justify-center bg-white">
                  <span className="text-lg font-medium" aria-label={`Quantity: ${quantity}`}>{quantity}</span>
                </div>
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 border border-gray-300 rounded-r-lg hover:bg-gray-100 transition flex items-center justify-center"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
              <button 
                className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-3 text-lg font-semibold ${
                  isAdding 
                    ? 'bg-green-600 text-white' 
                    : 'bg-primary text-text-light hover:bg-blue-900 shadow-md hover:shadow-lg'
                }`}
                onClick={handleAddToCart}
                disabled={isAdding}
                aria-label={
                  isAdding 
                    ? `Adding ${quantity} ${product.title} to cart`
                    : `Add ${quantity} ${product.title} to cart for $${(product.price * quantity).toFixed(2)}`
                }
              >
                {isAdding ? (
                  <>
                    <span>✓</span>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 