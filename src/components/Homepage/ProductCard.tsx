import { Product } from "@/types";
import { useRouter } from "next/router";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  product: Product;
  index?: number;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: "easeOut" as const
    }
  })
};

const hoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut" as const
    }
  }
};

export default function ProductCard({ product, index = 0 }: Props) {
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { showToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking Add to Cart
    setIsAdding(true);
    addToCart(product);
    
    // Show toast notification
    showToast('success', `${product.title} added to cart`);
    
    // Show feedback for a brief moment
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star size={16} className="text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    // Add empty stars to make total of 5
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  const inCart = isInCart(product.id);

  return (
    <motion.div 
      className="bg-surface rounded-xl shadow-md overflow-hidden h-full w-full flex flex-col cursor-pointer transition-shadow"
      onClick={handleCardClick}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      whileTap={{ scale: 0.98 }}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.title} by ${product.brand} for $${product.price.toFixed(2)}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <motion.div variants={hoverVariants}>
        <Image
          src={product.images[0]}
          alt={`${product.title} by ${product.brand}`}
          width={400}
          height={192}
          className="w-full h-48 object-cover flex-shrink-0"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg md:text-xl font-semibold text-text-dark line-clamp-2 mb-1">
            {product.title}
          </h3>
          
          {/* Brand */}
          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          
          {/* Rating Stars */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
            </div>
          )}
          
          <p className="text-text-dark text-lg md:text-xl font-semibold mb-2">
            ${product.price.toFixed(2)}
          </p>
          
          <motion.button 
            className={`w-full py-2 rounded-lg transition mt-auto flex items-center justify-center gap-2 text-sm md:text-base ${
              isAdding 
                ? 'bg-green-600 text-white'
                : inCart
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-primary text-text-light hover:bg-blue-900'
            }`}
            onClick={handleAddToCart}
            disabled={isAdding}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={
              isAdding 
                ? `Adding ${product.title} to cart`
                : inCart 
                ? `${product.title} is already in cart`
                : `Add ${product.title} to cart for $${product.price.toFixed(2)}`
            }
          >
            {isAdding ? (
              <>
                <Check size={16} />
                Added!
              </>
            ) : inCart ? (
              <>
                <ShoppingCart size={16} />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Add to Cart
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
