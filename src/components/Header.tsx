import { ShoppingCart, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-primary text-text-light py-6 px-100 flex items-center justify-between ">
      <div className="text-4xl font-bold ">Whatsbyte</div>
      <div className="mx-6 max-w-xl flex flex-1  items-center justify-between gap-10 ">
        <div className="flex  items-center bg-primary rounded-lg px-4 py-3 w-full border-[1.6px] border-gray-400">
          <Search className="text-text-light w-6 h-6 mr-3 " />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full text-white  placeholder:text-white outline-none h-full"
          />
        </div>
        <div className="flex gap-4 items-center bg-secondary rounded-lg px-8 py-3">
          <ShoppingCart />
          <div className="text-white font-semibold">Cart</div>
       </div>
      </div>
      
    </header>
  );
}
