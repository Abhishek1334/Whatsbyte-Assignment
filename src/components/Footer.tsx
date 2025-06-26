import { BiLogoFacebook } from "react-icons/bi";
import { IoLogoTwitter } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-10 px-100 grid grid-cols-3 gap-4  pb-4">
      <div>
        <h3 className="font-semibold text-xl mb-2">Filters</h3>
        <ul className="grid grid-cols-2 gap-2 max-w-48  text-text-light font-light">
          <li>All</li>
          <li>Electronics</li>
          <li>Clothing</li>
          <li>Home</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2 text-xl">About Us</h3>
        <ul className="flex flex-col gap-2">
          <li className="text-text-light font-light">About Us</li>
          <li className="text-text-light font-light">Contact</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2 text-lg">Follow Us</h3>
        <div className="flex gap-2">
          <BiLogoFacebook className="w-8 h-8 p-1 bg-primary rounded-full" />
          <IoLogoTwitter className="w-8 h-8 p-1 bg-primary rounded-full" />
          <FaInstagram className="w-8 h-8 p-1 bg-primary rounded-full" />
        </div>
        
      </div>
      <div className="text-text-light font-light pt-10" >&copy; 2025 Whatsbyte. All rights reserved.</div>
    </footer>
  );
}
