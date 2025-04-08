import { Link } from 'react-router-dom'
import { useState } from 'react'

const DarkNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-black border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          E-Shop
        </Link>

        {/* Hamburger button (mobilde) */}
        <button
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Menü linkleri (masaüstü) */}
        <div className="hidden sm:flex space-x-4">
          <Link to="/" className="text-white hover:text-blue-600">Home</Link>
          <Link to="/shop" className="text-white hover:text-blue-600">Shop</Link>
          <Link to="/about" className="text-white hover:text-blue-600">About</Link>
          <Link to="/blog" className="text-white hover:text-blue-600">Blog</Link>
          <Link to="/contact" className="text-white hover:text-blue-600">Contact</Link>
          <Link to="/pricing" className="text-white hover:text-blue-600">Pricing</Link>
        </div>
      </div>

      {/* Menü linkleri (mobilde açılır) */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/shop" className="block text-gray-700 hover:text-blue-600">Shop</Link>
          <Link to="/about" className="block text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/blog" className="block text-gray-700 hover:text-blue-600">Blog</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-blue-600">Contact</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
        </div>
      )}
    </nav>
  )
}

export default DarkNavbar
