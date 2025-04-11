import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  Menu,
  User,
  Search,
  ShoppingCart,
  Heart
} from 'lucide-react'

const LightNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Bandage
        </Link>
        
        {/* Main content wrapper to fix the layout */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-8">
          {/* Menü linkleri (masaüstü) */}
          <div className="flex gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-blue-600">Shop</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
            <Link to="/team" className="text-gray-700 hover:text-blue-600">Team</Link>
          </div>
          
          <div className="flex items-center gap-4 text-blue-500">
            {/* Login / Register */}
            <button className="flex items-center space-x-2 hover:text-blue-600">
              <User size={20} />
              <span className="font-semibold">Login / Register</span>
            </button>

            {/* Search */}
            <button className="p-2 hover:bg-blue-50 rounded-full">
              <Search size={20} />
            </button>

            {/* Cart */}
            <button className="relative p-2 hover:bg-blue-50 rounded-full">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                1
              </span>
            </button>

            {/* Favorites */}
            <button className="relative p-2 hover:bg-blue-50 rounded-full">
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                1
              </span>
            </button>
          </div>
        </div>
        
        {/* Sağdaki ikonlar ve hamburger butonu */}
        <div className="flex lg:hidden items-center gap-6 lg:gap-3 text-[#2E2E2E]">
          <User className="lg:hidden w-6 h-6 cursor-pointer" />
          <Search className="lg:hidden w-6 h-6 cursor-pointer" />
          <ShoppingCart className="lg:hidden w-6 h-6 cursor-pointer" />

          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Menü linkleri (mobilde açılır) */}
      {isOpen && (
        <div className="lg:hidden bg-white flex flex-col items-center pt-16 pb-8 gap-6 text-[#737373] text-[30px] leading-[45px] tracking-[0.2px] text-center font-semibold">
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
