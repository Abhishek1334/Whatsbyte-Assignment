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
      {/* Product Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-text-dark">
            <p className="text-lg sm:text-xl mb-2">No products found</p>
            <p className="text-gray-500 text-sm sm:text-base">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2">
          {/* Previous Button */}
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center px-3 py-2 rounded-lg transition text-sm w-full sm:w-auto justify-center ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-primary text-text-light hover:bg-blue-900"
            }`}
          >
            <ChevronLeft size={16} />
            <span className="ml-1">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-1 overflow-x-auto w-full sm:w-auto justify-center">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`px-3 py-2 rounded-lg transition text-sm min-w-[40px] ${
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
            className={`flex items-center px-3 py-2 rounded-lg transition text-sm w-full sm:w-auto justify-center ${
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
      <div className="text-center mt-4 text-text-dark text-xs sm:text-sm">
        Showing {filteredProducts.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
      </div>
    </div>
  );
}
