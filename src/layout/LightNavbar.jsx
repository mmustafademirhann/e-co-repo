import { Link } from 'react-router-dom'
import { useState } from 'react'

const LightNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          E-Shop
        </Link>

        {/* Hamburger button (mobilde) */}
        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Menü linkleri (masaüstü) */}
        <div className="hidden sm:flex space-x-4">
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
        <div className="sm:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/shop" className="block text-gray-700 hover:text-blue-600">Shop</Link>
          <Link to="/about" className="block text-gray-700 hover:text-blue-600">About</Link>
          <Link to="/blog" className="block text-gray-700 hover:text-blue-600">Blog</Link>
          <Link to="/contact" className="block text-gray-700 hover:text-blue-600">Contact</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
          <Link to="/team" className="text-gray-700 hover:text-blue-600">Team</Link>
        </div>
      )}
    </nav>
  )
}

export default LightNavbar
