import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Menu,
  User,
  Search,
  ShoppingCart,
  Heart,
  ChevronDown,
  Trash2,
  Plus,
  Minus,
  X,
  LogOut
} from 'lucide-react'
import Gravatar from 'react-gravatar'
import { fetchCategories } from '../redux/actions/productActions'
import { removeFromCart, updateCartItem, handleLogout, saveCartForUser } from '../redux/actions/shoppingCartActions'
import { toast } from 'react-toastify'

const LightNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const user = useSelector(state => state.client.user)
  const categories = useSelector(state => state.product.categories)
  const cart = useSelector((state) => state.shoppingCart.cart)
  const cartRef = useRef(cart)
  const dispatch = useDispatch()
  const history = useHistory()
  const cartDropdownRef = useRef(null)
  const userMenuRef = useRef(null)

  // Update cartRef when cart changes
  useEffect(() => {
    cartRef.current = cart;
    
    // If user is logged in, save cart to localStorage whenever it changes
    if (user?.id) {
      saveCartForUser(user.id, cart);
    }
  }, [cart, user]);

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  // Cart dropdown dışında bir yere tıklandığında dropdown'ı kapat
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setIsCartOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [cartDropdownRef, userMenuRef])

  const handleCategoryClick = (category) => {
    const genderText = category.gender === 'k' ? 'kadin' : 'erkek';
    history.push(`/shop/${genderText}/${category.title.toLowerCase()}/${category.id}`);
    setIsDropdownOpen(false);
  }

  const getTop5Categories = () => {
    return categories.slice(0, 5);
  }

  const getCategoriesByGender = (gender) => {
    return categories.filter(cat => cat.gender === gender);
  }

  const handleRemoveFromCart = (productId, event) => {
    event.stopPropagation();
    dispatch(removeFromCart(productId));
  }

  const handleIncreaseQuantity = (productId, currentCount, event) => {
    event.stopPropagation();
    dispatch(updateCartItem(productId, currentCount + 1));
  }

  const handleDecreaseQuantity = (productId, currentCount, event) => {
    event.stopPropagation();
    if (currentCount > 1) {
      dispatch(updateCartItem(productId, currentCount - 1));
    } else {
      dispatch(removeFromCart(productId));
    }
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.count, 0);
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.count), 0).toFixed(2);
  }

  const handleGoToCart = () => {
    setIsCartOpen(false);
    history.push('/cart');
  }

  const handleProductClick = (product) => {
    setIsCartOpen(false);
    history.push(`/product/${product.id}`);
  }

  // Ürün resminin URL'sini doğru şekilde alma
  const getProductImageUrl = (product) => {
    if (!product || !product.images || product.images.length === 0) {
      return 'https://via.placeholder.com/100';
    }
    
    const firstImage = product.images[0];
    // Eğer resim doğrudan string bir URL ise
    if (typeof firstImage === 'string') {
      return firstImage;
    }
    // Eğer resim bir nesne ve url özelliği varsa
    else if (firstImage && firstImage.url) {
      return firstImage.url;
    }
    // Hiçbiri değilse placeholder kullan
    return 'https://via.placeholder.com/100';
  }

  // Add a logout handler function
  const handleUserLogout = () => {
    dispatch(handleLogout());
    toast.success('Başarıyla çıkış yapıldı');
    window.location.href = '/';
  }

  // Add handler for user menu clicks
  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  // Add handler for order history
  const handleOrderHistory = () => {
    setIsUserMenuOpen(false)
    history.push('/my-orders') // This would link to the order history page
  }

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          {user ? user.name : 'Bandage'}
        </Link>
        
        <div className="hidden lg:flex flex-1 items-center justify-between ml-8">
          <div className="flex gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Categories <ChevronDown size={16} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-white shadow-lg rounded-md p-4 z-50">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Kadın Kategorileri */}
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-gray-800">Kadın</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {getCategoriesByGender('k').map(category => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                            className="text-left text-gray-600 hover:text-blue-600 py-1"
                          >
                            {category.title}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Erkek Kategorileri */}
                    <div>
                      <h3 className="font-bold text-lg mb-3 text-gray-800">Erkek</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {getCategoriesByGender('e').map(category => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                            className="text-left text-gray-600 hover:text-blue-600 py-1"
                          >
                            {category.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top 5 Categories */}
                  <div className="mt-6 pt-4 border-t">
                    <h3 className="font-bold text-lg mb-3 text-gray-800">Popular Categories</h3>
                    <div className="grid grid-cols-5 gap-4">
                      {getTop5Categories().map(category => (
                        <div 
                          key={category.id}
                          className="cursor-pointer group"
                          onClick={() => handleCategoryClick(category)}
                        >
                          <div className="aspect-square rounded-lg overflow-hidden mb-2">
                            <img 
                              src={category.img || 'https://via.placeholder.com/100'} 
                              alt={category.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <p className="text-sm text-center text-gray-700 group-hover:text-blue-600">
                            {category.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Rest of the navigation links */}
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
            <Link to="/team" className="text-gray-700 hover:text-blue-600">Team</Link>
          </div>
          
          <div className="flex items-center gap-4 text-blue-500">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                  onClick={handleUserMenuClick}
                >
                  {user.email ? (
                    <Gravatar 
                      email={user.email} 
                      size={32} 
                      default="retro" 
                      className="rounded-full" 
                    />
                  ) : (
                    <User size={20} />
                  )}
                  <span>{user.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 z-50">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button 
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                      onClick={handleOrderHistory}
                    >
                      Order History
                    </button>
                    <button 
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      onClick={handleUserLogout}
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                <User size={20} />
                Login / Register
              </Link>
            )}

            <button className="p-2 hover:bg-blue-50 rounded-full">
              <Search size={20} />
            </button>

            {/* Alışveriş Sepeti */}
            <div className="relative" ref={cartDropdownRef}>
              <button 
                className="relative p-2 hover:bg-blue-50 rounded-full"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {getCartItemCount()}
                  </span>
                )}
              </button>

              {/* Sepet Dropdown Menüsü */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg overflow-hidden z-50">
                  <div className="p-4 border-b bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-800">Alışveriş Sepeti</h3>
                      <span className="text-sm text-gray-600">{getCartItemCount()} ürün</span>
                    </div>
                  </div>

                  {cart.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="flex flex-col items-center py-4">
                        <ShoppingCart size={40} className="text-gray-300 mb-2" />
                        <p>Sepetiniz boş</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-80 overflow-y-auto">
                        {cart.map(item => (
                          <div 
                            key={item.product.id}
                            className="flex p-3 border-b hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => handleProductClick(item.product)}
                          >
                            <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden mr-3">
                              <img 
                                src={getProductImageUrl(item.product)} 
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-800 truncate mb-1">{item.product.name}</h4>
                              <p className="text-xs text-gray-500 mb-2">${item.product.price?.toFixed(2) || '0.00'}</p>
                              <div className="flex items-center">
                                <button 
                                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                                  onClick={(e) => handleDecreaseQuantity(item.product.id, item.count, e)}
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="mx-2 text-sm">{item.count}</span>
                                <button 
                                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                                  onClick={(e) => handleIncreaseQuantity(item.product.id, item.count, e)}
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                            <div className="ml-2 flex flex-col items-end">
                              <p className="text-sm font-medium text-gray-900">${(item.product.price * item.count).toFixed(2)}</p>
                              <button 
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors mt-2"
                                onClick={(e) => handleRemoveFromCart(item.product.id, e)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium text-gray-700">Toplam:</span>
                          <span className="font-bold text-blue-600">${getCartTotal()}</span>
                        </div>
                        <button 
                          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
                          onClick={handleGoToCart}
                        >
                          Sepete Git
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <button className="relative p-2 hover:bg-blue-50 rounded-full">
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                1
              </span>
            </button>
          </div>
        </div>
        
        {/* Mobile menu button and icons */}
        <div className="flex lg:hidden items-center gap-6 lg:gap-3 text-[#2E2E2E]">
          {user ? (
            <div className="flex items-center gap-4">
              {user.email ? (
                <Gravatar 
                  email={user.email} 
                  size={24} 
                  default="retro" 
                  className="rounded-full" 
                />
              ) : (
                <User size={20} className="text-gray-700" />
              )}
              <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
              <LogOut 
                className="w-5 h-5 text-red-500 cursor-pointer" 
                onClick={handleUserLogout}
              />
            </div>
          ) : (
            <Link to="/login">
              <User className="lg:hidden w-6 h-6 cursor-pointer" />
            </Link>
          )}
          <Search className="lg:hidden w-6 h-6 cursor-pointer" />
          
          {/* Mobil sepet ikonu */}
          <div className="relative">
            <ShoppingCart 
              className="lg:hidden w-6 h-6 cursor-pointer" 
              onClick={() => setIsCartOpen(!isCartOpen)}
            />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {getCartItemCount()}
              </span>
            )}
            
            {/* Mobil sepet dropdown (tam ekran) */}
            {isCartOpen && (
              <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
                <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                  <h2 className="text-lg font-bold">Alışveriş Sepeti ({getCartItemCount()})</h2>
                  <button onClick={() => setIsCartOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
                
                {cart.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="flex flex-col items-center py-8">
                      <ShoppingCart size={64} className="text-gray-300 mb-4" />
                      <p className="mb-4">Sepetiniz boş</p>
                      <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        onClick={() => {
                          setIsCartOpen(false);
                          history.push('/shop');
                        }}
                      >
                        Alışverişe Başla
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {cart.map(item => (
                      <div 
                        key={item.product.id}
                        className="p-4 border-b"
                      >
                        <div className="flex">
                          <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden mr-4">
                            <img 
                              src={getProductImageUrl(item.product)} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-gray-800 mb-1">{item.product.name}</h4>
                              <button 
                                className="text-gray-400 hover:text-red-500"
                                onClick={(e) => handleRemoveFromCart(item.product.id, e)}
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">${item.product.price?.toFixed(2) || '0.00'}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center border rounded overflow-hidden">
                                <button 
                                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                  onClick={(e) => handleDecreaseQuantity(item.product.id, item.count, e)}
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="px-3 py-1 text-center min-w-[40px]">{item.count}</span>
                                <button 
                                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                  onClick={(e) => handleIncreaseQuantity(item.product.id, item.count, e)}
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <p className="font-medium text-gray-900">${(item.product.price * item.count).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-4 bg-gray-50 sticky bottom-0">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium text-gray-700">Toplam:</span>
                        <span className="font-bold text-blue-600 text-xl">${getCartTotal()}</span>
                      </div>
                      <button 
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700"
                        onClick={() => {
                          setIsCartOpen(false);
                          history.push('/cart');
                        }}
                      >
                        Sepete Git
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            className="lg:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white flex flex-col items-center pt-16 pb-8 gap-6 text-[#737373] text-[30px] leading-[45px] tracking-[0.2px] text-center font-semibold">
          <Link to="/" className="hover:font-normal transition-all duration-200">Home</Link>
          <Link to="/shop" className="hover:font-normal transition-all duration-200">Product</Link>
          <Link to="/pricing" className="hover:font-normal transition-all duration-200">Pricing</Link>
          <Link to="/contact" className="mb-8 hover:font-normal transition-all duration-200">Contact</Link>
          
          {user && (
            <>
              <div className="flex items-center gap-2 py-2">
                {user.email ? (
                  <Gravatar 
                    email={user.email} 
                    size={32} 
                    default="retro" 
                    className="rounded-full" 
                  />
                ) : (
                  <User size={20} />
                )}
                <span>{user.name}</span>
              </div>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600 py-2 pl-2 text-sm">Profile</Link>
              <button 
                className="text-left text-gray-700 hover:text-blue-600 py-2 pl-2 text-sm"
                onClick={() => {
                  handleOrderHistory();
                  setIsOpen(false);
                }}
              >
                Order History
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default LightNavbar
