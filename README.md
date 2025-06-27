# 🛒 WhatBytes E-commerce Platform

A modern, responsive e-commerce application built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates advanced React patterns, state management, and user experience design.

## 🚀 Live Demo

**🔗 Deployment URL:** [Coming Soon - Deploy to Vercel]

## ✨ Features

### 🏠 **Homepage - Product Listing**
- **Responsive Product Grid**: 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
- **Advanced Search**: Real-time search with dropdown suggestions
- **Smart Filtering**: Category, brand, and price range filters
- **URL Synchronization**: Filters persist in URL (`?category=electronics&price=0-500`)
- **Pagination**: Smooth product navigation with page controls

### 🛍️ **Product Detail Pages**
- **Dynamic Routing**: SEO-friendly URLs (`/product/[id]`)
- **Image Carousel**: Multiple product views with thumbnail navigation
- **Interactive Controls**: Quantity selector and add-to-cart functionality
- **Responsive Design**: Optimized for all screen sizes

### 🛒 **Shopping Cart**
- **Persistent Storage**: Cart state saved in localStorage
- **Quantity Management**: Increase, decrease, and remove items
- **Price Calculations**: Subtotal, tax, and total with real-time updates
- **Toast Notifications**: User feedback for all cart actions

### 🎨 **User Experience**
- **Smooth Animations**: Framer Motion powered transitions
- **Accessibility First**: ARIA labels, keyboard navigation, screen reader support
- **Mobile Optimized**: Touch-friendly interface with responsive design
- **Error Handling**: Custom 404 page and graceful error states

## 🛠️ Technology Stack

- **Framework**: Next.js 15.3.4 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Image Optimization**: Next.js Image component

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhishek1334/Whatsbyte-Assignment.git
   cd whatbytes-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── Layout.tsx      # Page layout wrapper
│   └── Homepage/       # Homepage-specific components
│       ├── ProductCard.tsx
│       ├── ProductGrid.jsx
│       ├── FilterSidebar.tsx
│       └── SearchBar.tsx
├── context/            # React Context providers
│   ├── CartContext.tsx    # Shopping cart state
│   ├── FilterContext.tsx  # Filter & search state
│   └── ToastContext.tsx   # Notification system
├── data/
│   └── products.ts     # Product data
├── pages/              # Next.js pages
│   ├── index.tsx       # Homepage
│   ├── cart.tsx        # Shopping cart
│   ├── 404.tsx         # Error page
│   └── product/
│       └── [id].tsx    # Product detail pages
├── styles/
│   └── globals.css     # Global styles
└── types/
    └── index.ts        # TypeScript definitions
```

## 🎯 Key Features Implementation

### **State Management**
- **Cart Context**: Manages shopping cart with localStorage persistence
- **Filter Context**: Handles search, categories, brands, and price filters
- **URL Synchronization**: Filters reflect in browser URL for bookmarking

### **Responsive Design**
- **Mobile-First**: Designed for mobile, enhanced for desktop
- **Breakpoint System**: Tailwind CSS responsive utilities
- **Touch Optimization**: Mobile-friendly interactive elements

### **Performance Optimizations**
- **Image Optimization**: Next.js Image component with Unsplash integration
- **Code Splitting**: Automatic code splitting with Next.js
- **Static Generation**: Optimized build with static page generation

### **Accessibility Features**
- **Semantic HTML**: Proper HTML5 structure with ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Comprehensive screen reader compatibility
- **Focus Management**: Proper focus indicators and tab order


## 🎨 Design System

### **Color Palette**
- **Primary**: `#0758A8` (Blue)
- **Secondary**: `#002A59` (Dark Blue)
- **Accent**: `#365983` (Medium Blue)
- **Surface**: `#FEFEFE` (Off White)
- **Text Light**: `#FAFDFE` (Light Text)
- **Text Dark**: `#031F45` (Dark Text)

### **Typography**
- **Font Family**: System font stack with Arial fallback
- **Responsive Scale**: Fluid typography using Tailwind CSS

## 📝 Development Approach

This project follows modern React and Next.js best practices:

- **Component-Driven Development**: Reusable, maintainable components
- **TypeScript First**: Type safety throughout the application
- **Context Pattern**: Efficient state management without external libraries
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Git Workflow**: Feature-based commits with clear history


**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
