import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct, clearSingleProductError } from '../redux/actions/productActions';
import { addProductToCart } from '../redux/actions/shoppingCartActions';
import { toast } from 'react-toastify';

// Import components
import ProductTabs from '../components/ProductTabs';

const ProductDetail = () => {
  // Extract all params from URL
  const { gender, categoryName, categoryId, productNameSlug, productId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  
  // Get product from Redux store
  const singleProduct = useSelector(state => state.product?.singleProduct);
  const singleProductLoading = useSelector(state => state.product?.singleProductLoading);
  const error = useSelector(state => state.product?.error);
  const cart = useSelector(state => state.shoppingCart?.cart);
  
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Sayfa yüklendiğinde en üste kaydırma
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch product data when component mounts or productId changes
  useEffect(() => {
    if (productId) {
      console.log("Fetching product with ID:", productId);
      dispatch(fetchSingleProduct(productId));
      // Ürün değiştiğinde de en üste kaydır
      window.scrollTo(0, 0);
    }
  }, [dispatch, productId]);

  // Set main image when product data is loaded
  useEffect(() => {
    if (singleProduct && singleProduct.images && singleProduct.images.length > 0) {
      // Check the structure of images to determine how to access the URL
      if (typeof singleProduct.images[0] === 'string') {
        setMainImage(singleProduct.images[0]);
      } else if (singleProduct.images[0].url) {
        setMainImage(singleProduct.images[0].url);
      }
      console.log("Set main image:", singleProduct.images[0]);
    }
  }, [singleProduct]);

  // Sepete ekleme fonksiyonu
  const handleAddToCart = () => {
    if (singleProduct) {
      dispatch(addProductToCart(singleProduct, quantity));
      
      toast.success(`${singleProduct.name || 'Ürün'} sepete eklendi!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Sepetteki ürün sayısını ve toplam ürün tutarını göster
      console.log("Cart updated:", {
        itemCount: getCartItemCount(),
        totalPrice: getCartTotalPrice()
      });
    }
  };

  // Sepetteki toplam ürün sayısını hesapla
  const getCartItemCount = () => {
    return cart?.reduce((total, item) => total + item.count, 0) || 0;
  };

  // Sepetteki ürünlerin toplam fiyatını hesapla
  const getCartTotalPrice = () => {
    return cart?.reduce((total, item) => total + (item.product.price * item.count), 0) || 0;
  };

  // Miktarı artır/azalt
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  console.log("Product Detail - current state:", { singleProduct, singleProductLoading, error, mainImage });

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    
    return stars;
  };

  const handleBackButton = () => {
    history.goBack();
  };

  // Show loading spinner
  if (singleProductLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Ürün Yüklenemedi</h2>
        <p className="text-red-500 mb-4">Hata: {error}</p>
        <p className="text-gray-600 mb-4">Ürün yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin veya farklı bir ürün seçin.</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleBackButton}
        >
          Geri Dön
        </button>
      </div>
    );
  }

  // If no product data yet
  if (!singleProduct) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg mb-4">Ürün detayları yükleniyor...</p>
        <div className="animate-spin mx-auto rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Prepare product data for components
  const product = {
    id: singleProduct.id,
    name: singleProduct.name || singleProduct.title,
    price: singleProduct.price || 0,
    rating: singleProduct.rating || 0,
    reviewCount: singleProduct.sell_count || 0,
    description: singleProduct.description || "No description available",
    availability: singleProduct.stock > 0 ? "In Stock" : "Out of Stock",
    sku: `PROD-${singleProduct.id}`,
    colors: ['#2091F9', '#2DC071', '#E77C40', '#252B42'], 
    images: singleProduct.images?.map(img => typeof img === 'string' ? img : img.url) || []
  };

  console.log("Prepared product data:", product);

  return (
    <div className="bg-white">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <button 
          onClick={handleBackButton}
          className="flex items-center text-gray-600 hover:text-blue-500"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Mobile View */}
      <div className="md:hidden px-4">
        {/* Product Image */}
        <div className="relative">
          <div className="h-[400px] bg-gray-100 flex items-center justify-center mb-4 rounded overflow-hidden">
            {mainImage ? (
              <img 
                src={mainImage} 
                alt={product.name} 
                className="h-full w-full object-contain" 
              />
            ) : (
              <div className="text-gray-400">No image available</div>
            )}
          </div>
          
          {/* Image navigation */}
          {product.images && product.images.length > 1 && (
            <div className="flex justify-center space-x-2 mb-6">
              {product.images.slice(0, 3).map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`w-16 h-16 rounded overflow-hidden border-2 ${mainImage === image ? 'border-blue-500' : 'border-transparent'}`}
                >
                  <img 
                    src={image} 
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
              {product.images.length > 3 && (
                <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                  +{product.images.length - 3}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="pb-6">
          <h1 className="text-2xl font-medium text-[#252B42] mb-2">{product.name}</h1>
          <div className="flex items-center mb-2">
            <div className="flex">{renderRatingStars(product.rating)}</div>
            <span className="ml-2 text-sm text-gray-600">{product.reviewCount} Reviews</span>
          </div>
          
          <p className="text-2xl font-bold text-[#252B42] mb-2">${product.price.toFixed(2)}</p>
          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-600 mr-2">Availability:</span>
            <span className="text-sm text-blue-500 font-medium">{product.availability}</span>
          </div>

          <p className="text-sm text-gray-600 mb-6">{product.description}</p>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex space-x-3 mb-6">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full ${selectedColor === index ? 'ring-2 ring-offset-1 ring-gray-500' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(index)}
                  aria-label={`Color option ${index + 1}`}
                />
              ))}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-gray-700 mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button 
                  onClick={decreaseQuantity} 
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 border-l border-r border-gray-300">{quantity}</span>
                <button 
                  onClick={increaseQuantity} 
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-2">
              <button 
                className="flex-1 bg-[#23A6F0] text-white py-3 rounded-md text-sm font-bold flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
              <button className="bg-white border border-gray-300 p-3 rounded-md">
                <Heart size={20} className="text-gray-700" />
              </button>
              <button className="bg-white border border-gray-300 p-3 rounded-md">
                <Eye size={20} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Product Tabs - Mobile */}
        <div className="border-t border-gray-200 pt-6 pb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'description' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('additional')}
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'additional' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
            >
              Additional Info
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'reviews' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
            >
              Reviews
            </button>
          </div>

          <div className="pt-4">
            {activeTab === 'description' && (
              <div className="text-sm text-gray-600">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'additional' && (
              <div className="text-sm text-gray-600">
                <p>SKU: {product.sku}</p>
                <p>Category: {categoryName || 'General'}</p>
                <p>Tags: Premium, Quality</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="text-sm text-gray-600">
                <p>No reviews yet. Be the first to review this product.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex space-x-2 text-sm mb-8 text-gray-600">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span className="text-gray-400">›</span>
          <Link to="/shop" className="hover:text-gray-900">Shop</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="mb-4 bg-gray-100 rounded overflow-hidden">
              <div className="h-[500px] flex items-center justify-center">
                {mainImage ? (
                  <img 
                    src={mainImage} 
                    alt={product.name} 
                    className="h-full w-full object-contain" 
                  />
                ) : (
                  <div className="text-gray-400">No image available</div>
                )}
              </div>
            </div>
            
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`aspect-square rounded overflow-hidden border-2 ${mainImage === image ? 'border-blue-500' : 'border-transparent'}`}
                  >
                    <img 
                      src={image} 
                      alt={`Product thumbnail ${index + 1}`}
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-medium text-[#252B42]">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">{renderRatingStars(product.rating)}</div>
              <span className="ml-2 text-sm text-gray-600">{product.reviewCount} Reviews</span>
            </div>
            
            <p className="text-2xl font-bold mt-6 text-[#252B42]">${product.price.toFixed(2)}</p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600 mr-2">Availability :</span>
              <span className="text-sm text-[#23A6F0] font-medium">In Stock</span>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="mt-6">
              <div className="flex space-x-3 mb-6">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full ${selectedColor === index ? 'ring-2 ring-offset-1 ring-gray-500' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(index)}
                    aria-label={`Color option ${index + 1}`}
                  />
                ))}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center mb-6">
                <span className="text-sm font-medium text-gray-700 mr-4">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button 
                    onClick={decreaseQuantity} 
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-l border-r border-gray-300">{quantity}</span>
                  <button 
                    onClick={increaseQuantity} 
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  className="px-10 bg-[#23A6F0] text-white py-3 rounded hover:bg-[#1d8fcf] font-medium flex items-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
                <button className="bg-white border border-gray-300 p-3 rounded-md">
                  <Heart size={20} className="text-gray-700" />
                </button>
                <button className="bg-white border border-gray-300 p-3 rounded-md">
                  <ShoppingCart size={20} className="text-gray-700" />
                </button>
                <button className="bg-white border border-gray-300 p-3 rounded-md">
                  <Eye size={20} className="text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs - Desktop */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'description' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('additional')}
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'additional' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
            >
              Additional Information
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'reviews' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div className="text-gray-600 max-w-3xl">
                <p className="mb-4">{product.description}</p>
                <p>Our products are crafted with the highest quality materials to ensure durability and comfort. We take pride in our manufacturing process and stand behind every item we sell.</p>
              </div>
            )}
            {activeTab === 'additional' && (
              <div className="text-gray-600">
                <table className="min-w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 w-1/4 font-medium">Color</td>
                      <td className="py-3">Blue, Red, Green, Black</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 w-1/4 font-medium">SKU</td>
                      <td className="py-3">{product.sku}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 w-1/4 font-medium">Category</td>
                      <td className="py-3">{categoryName || 'General'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="text-gray-600">
                <p className="mb-4">No reviews yet. Be the first to review this product.</p>
                <button className="px-6 py-2 bg-blue-500 text-white rounded">Write a Review</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bestseller Products Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Bestseller Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="h-64 bg-gray-100">
                  <img 
                    src={`https://source.unsplash.com/random/300x400?product=${item}`} 
                    alt={`Product ${item}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">Sample Product {item}</h3>
                  <p className="text-sm text-gray-600 mb-2">Category</p>
                  <p className="font-bold text-[#23856D]">$16.48</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
  