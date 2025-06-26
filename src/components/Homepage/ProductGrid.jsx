"use client";

import { useState, useEffect } from "react";
import products from "@/data/products";
import ProductCard from "@/components/Homepage/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFilters } from "@/context/FilterContext";

export default function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const { getFilteredProducts } = useFilters();
  
  // Get filtered products
  const filteredProducts = getFilteredProducts(products);
  
  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);
  
  // Calculate pagination based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-text-dark">
            <p className="text-xl mb-2">No products found</p>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center px-3 py-2 rounded-lg transition ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-text-light hover:bg-blue-900"
            }`}
          >
            <ChevronLeft size={16} />
            <span className="ml-1">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`px-3 py-2 rounded-lg transition ${
                    currentPage === page
                      ? "bg-primary text-text-light"
                      : "bg-gray-200 text-text-dark hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center px-3 py-2 rounded-lg transition ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-text-light hover:bg-blue-900"
            }`}
          >
            <span className="mr-1">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center mt-4 text-text-dark">
        Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
      </div>
    </div>
  );
}
