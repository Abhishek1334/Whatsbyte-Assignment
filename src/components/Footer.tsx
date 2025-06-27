import { BiLogoFacebook } from "react-icons/bi";
import { IoLogoTwitter } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-6 sm:pt-10 px-4 sm:px-6 lg:px-8" role="contentinfo">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-4">
        <div className="sm:col-span-1">
          <h3 className="font-semibold text-lg sm:text-xl mb-2">Filters</h3>
          <nav aria-label="Product categories">
            <ul className="grid grid-cols-2 gap-2 text-text-light font-light">
              <li><Link href="/?category=all" className="hover:text-white transition">All</Link></li>
              <li><Link href="/?category=electronics" className="hover:text-white transition">Electronics</Link></li>
              <li><Link href="/?category=clothing" className="hover:text-white transition">Clothing</Link></li>
              <li><Link href="/?category=home" className="hover:text-white transition">Home</Link></li>
            </ul>
          </nav>
        </div>
        <div className="sm:col-span-1">
          <h3 className="font-semibold mb-2 text-lg sm:text-xl">About Us</h3>
          <ul className="flex flex-col gap-2">
            <li className="text-text-light font-light">About Us</li>
            <li className="text-text-light font-light">Contact</li>
          </ul>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="font-semibold mb-2 text-lg">Follow Us</h3>
          <div className="flex gap-2 mb-4">
            <BiLogoFacebook className="w-8 h-8 p-1 bg-primary rounded-full" />
            <IoLogoTwitter className="w-8 h-8 p-1 bg-primary rounded-full" />
            <FaInstagram className="w-8 h-8 p-1 bg-primary rounded-full" />
          </div>
        </div>
      </div>
      <div className="text-text-light font-light py-4 border-t border-gray-600 text-center sm:text-left">
        &copy; 2025 Whatsbyte. All rights reserved.
      </div>
    </footer>
  );
}
