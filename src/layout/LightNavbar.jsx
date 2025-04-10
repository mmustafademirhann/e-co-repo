import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  Menu,
  User,
  Search,
  ShoppingCart
} from 'lucide-react'

const LightNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text[24px]">
          Bandage
        </Link>

        {/* Sağdaki ikonlar ve hamburger butonu */}
        <div className="flex items-center gap-6 sm:gap-3 text-[#2E2E2E]">
          <User className="sm:hidden w-6 h-6 cursor-pointer" />
          <Search className="sm:hidden w-6 h-6 cursor-pointer" />
          <ShoppingCart className="sm:hidden w-6 h-6 cursor-pointer" />

          <button
            className="sm:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>


        {/* Menü linkleri (masaüstü) */}
        <div className="hidden sm:flex gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/shop" className="text-gray-700 hover:text-blue-600">Shop</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
          <Link to="/team" className="text-gray-700 hover:text-blue-600">Team</Link>
        </div>
      </div>

      {/* Menü linkleri (mobilde açılır) */}
      {isOpen && (
        <div className="sm:hidden bg-white flex flex-col items-center pt-16 pb-8 gap-6 text-[#737373] text-[30px] leading-[45px] tracking-[0.2px] text-center font-semibold">
          <Link to="/" className="hover:font-normal transition-all duration-200">Home</Link>
          <Link to="/shop" className="hover:font-normal transition-all duration-200">Product</Link>
          <Link to="/pricing" className="hover:font-normal transition-all duration-200">Pricing</Link>
          <Link to="/contact" className="mb-8 hover:font-normal transition-all duration-200">Contact</Link>
        </div>
      )}
    </nav>
  )
}

export default LightNavbar
