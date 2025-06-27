import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/router';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const item = cart.items.find(item => item.product.id === productId);
    if (newQuantity <= 0) {
      removeFromCart(productId);
      if (item) {
        showToast('info', `${item.product.title} removed from cart`);
      }
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    const item = cart.items.find(item => item.product.id === productId);
    removeFromCart(productId);
    if (item) {
      showToast('info', `${item.product.title} removed from cart`);
    }
  };

  const handleClearCart = () => {
    clearCart();
    showToast('info', 'Cart cleared');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="container mx-auto py-8 px-4">
          <button 
            onClick={() => router.push('/')}
            className="mb-6 bg-gray-200 text-text-dark px-4 py-2 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
            aria-label="Go back to homepage"
          >
            <ArrowLeft size={16} />
            Back to Shopping
          </button>

          <div className="text-center py-12">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-text-dark mb-2">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link 
              href="/"
              className="bg-primary text-text-light px-6 py-3 rounded-lg hover:bg-blue-900 transition inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 max-md:flex-col max-md:gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/')}
              className="bg-gray-200 text-text-dark px-4 py-2 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 max-sm:px-1 max-sm:py-1"
              aria-label="Go back to homepage"
            >
              <ArrowLeft size={16} />
              Back to Shopping
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-text-dark max-sm:text-xl">
              Shopping Cart ({cart.items.length} items)
            </h1>
          </div>
          
          {cart.items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-800 transition text-sm flex items-center gap-1"
              aria-label={`Clear all ${cart.items.length} items from cart`}
            >
              <Trash2 size={16} />
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-lg shadow-md p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Product Image */}
                  <Link href={`/product/${item.product.id}`} aria-label={`View ${item.product.title} details`}>
                    <Image
                      src={item.product.images[0]}
                      alt={`${item.product.title} - ${item.product.brand}`}
                      width={96}
                      height={96}
                      className="w-full md:w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 space-y-2">
                    <Link href={`/product/${item.product.id}`}>
                      <h3 className="font-semibold text-text-dark hover:text-primary transition cursor-pointer">
                        {item.product.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600">{item.product.brand}</p>
                    <p className="text-lg font-bold text-text-dark">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition"
                        aria-label={`Decrease quantity of ${item.product.title}`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 min-w-[3rem] text-center" aria-label={`Quantity: ${item.quantity}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition"
                        aria-label={`Increase quantity of ${item.product.title}`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-red-600 hover:text-red-800 transition p-2"
                      aria-label={`Remove ${item.product.title} from cart`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-text-dark">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-text-dark mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.totalItems} items):</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${(cart.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${(cart.total + cart.total * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button 
                className="w-full bg-primary text-text-light py-3 rounded-lg hover:bg-blue-900 transition font-medium"
                aria-label={`Proceed to checkout with ${cart.totalItems} items totaling $${(cart.total + cart.total * 0.08).toFixed(2)}`}
              >
                Proceed to Checkout
              </button>

              <Link 
                href="/"
                className="w-full bg-gray-200 text-text-dark py-3 rounded-lg hover:bg-gray-300 transition font-medium mt-3 block text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 