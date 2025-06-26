"use client";

import { ShoppingCart, Search, User } from "lucide-react";
import { useFilters } from "@/context/FilterContext";

export default function Header() {
  const { filters, setSearchQuery } = useFilters();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <header className="bg-primary text-text-light py-6 px-100 flex w-full items-center justify-between gap-30">
      <div className="text-4xl font-bold ">Whatsbyte</div>
      <div className="flex items-center bg-primary rounded-lg px-4 py-3  border-[1.6px] border-gray-400 w-full">
          <Search className="text-text-light w-6 h-6 mr-3 " />
          <input
            type="text"
            placeholder="Search for products..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="w-full text-white  placeholder:text-white outline-none h-full bg-transparent"
          />
        </div>
      <div className="mx-6 max-w-xl flex flex-1  items-center justify-between gap-10 ">
        <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center bg-secondary rounded-lg px-8 py-3">
          <ShoppingCart />
          
          <div className="text-white font-semibold">Cart</div>
       </div>
       <div className="text-white font-semibold bg-secondary rounded-lg px-4 py-3">
          <User />
       </div>
       </div>
      </div>
      
    </header>
  );
}
