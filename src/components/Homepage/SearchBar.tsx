"use client";

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import products from '@/data/products';
import { Product } from '@/types';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter products based on search query
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = products.filter(product => {
        const searchTerm = query.toLowerCase();
        return (
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
        );
      }).slice(0, 6); // Limit to 6 results
      
      setFilteredProducts(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredProducts([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to homepage with search filter
      router.push({
        pathname: '/',
        query: { search: query.trim() }
      });
      setIsOpen(false);
    }
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
    setQuery('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  const highlightMatch = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200 font-semibold">{part}</span> : 
        part
    );
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() && setIsOpen(filteredProducts.length > 0)}
            placeholder="Search products, brands, categories..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary "
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
              >
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {highlightMatch(product.title, query)}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {highlightMatch(product.brand, query)} • {highlightMatch(product.category, query)}
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* View All Results Button */}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={() => {
                  router.push({
                    pathname: '/',
                    query: { search: query.trim() }
                  });
                  setIsOpen(false);
                }}
                className="w-full text-left p-3 hover:bg-gray-50 text-sm text-primary font-medium rounded-lg transition-colors"
              >
                View all results for &quot;{query}&quot;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 