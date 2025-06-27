"use client";

import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import SearchBar from './Homepage/SearchBar';
import Link from 'next/link';

export default function Header() {
  const { getCartItemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = getCartItemCount();

  return (
    <header className="bg-primary text-text-light shadow-lg" role="banner">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" aria-label="WhatBytes - Go to homepage">
              <h1 className="text-2xl font-bold cursor-pointer hover:text-gray-300 transition">
                WhatBytes
              </h1>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            <Link href="/" className="hover:text-gray-300 transition" aria-label="Browse all products">
              Products
            </Link>
            <Link href="/cart" className="relative hover:text-gray-300 transition" aria-label={`Shopping cart with ${cartItemCount} items`}>
              <div className="flex items-center space-x-1">
                <ShoppingCart size={24} aria-hidden="true" />
                <span className="hidden lg:inline">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" aria-label={`${cartItemCount} items in cart`}>
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>
            <button className="hover:text-gray-300 transition" aria-label="User account">
              <div className="flex items-center space-x-1">
                <User size={24} aria-hidden="true" />
              </div>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <SearchBar />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2" role="navigation" aria-label="Mobile navigation" id="mobile-menu">
            <Link 
              href="/" 
              className="block py-2 hover:text-gray-300 transition"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Browse all products"
            >
              Products
            </Link>
            <Link 
              href="/cart"
              className="flex items-center space-x-2 py-2 hover:text-gray-300 transition"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={`Shopping cart with ${cartItemCount} items`}
            >
              <ShoppingCart size={20} aria-hidden="true" />
              <span>Cart ({cartItemCount})</span>
            </Link>
            <button
              className="flex items-center space-x-2 py-2 hover:text-gray-300 transition"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="User account"
            >
              <User size={20} aria-hidden="true" />
              <span>Account</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
