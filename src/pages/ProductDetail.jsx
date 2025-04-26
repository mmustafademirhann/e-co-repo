import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Eye } from 'lucide-react';


const ProductDetail = () => {
  const location = useLocation();
  const selectedProduct = location.state?.selectedProduct;
  
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Use the selected product from location state or fall back to mock data
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    if (selectedProduct) {
      // Transform the incoming product data to match our detail structure
      setProduct({
        id: selectedProduct.id,
        name: selectedProduct.title,
        price: selectedProduct.price,
        rating: 4.5, // Default value or could be part of the product data
        reviewCount: 10, // Default value or could be part of the product data
        description: selectedProduct.description || "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
        availability: "In Stock",
        sku: `PROD-${selectedProduct.id}`,
        colors: ['#2091F9', '#2DC071', '#E77C40', '#252B42'],
        images: [
          selectedProduct.src, // Main image
          // Fallback to some default additional images if needed
          'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91',
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97'
        ]
      });
    } else {
      // Fallback mock data if no product is provided
      setProduct({
        id: 1,
        name: "Floating Phone",
        price: 1139.33,
        rating: 4.5,
        reviewCount: 10,
        description: "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.",
        availability: "In Stock",
        sku: "PHONE-YLW-2023",
        colors: ['#2091F9', '#2DC071', '#E77C40', '#252B42'],
        images: [
          'https://images.unsplash.com/photo-1607477083000-782c0bbede32',
          'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91',
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97'
        ]
      });
    }
  }, [selectedProduct]);

  // Mock bestseller products
  const bestsellerProducts = [
    { id: 1, name: 'Graphic Design', price: 16.48, image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0', department: 'English Department' },
    { id: 2, name: 'Graphic Design', price: 16.48, image: 'https://images.unsplash.com/photo-1577937927133-61d09c5644b3', department: 'English Department' },
    { id: 3, name: 'Graphic Design', price: 16.48, image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0', department: 'English Department' },
    { id: 4, name: 'Graphic Design', price: 16.48, image: 'https://images.unsplash.com/photo-1577937927133-61d09c5644b3', department: 'English Department' },
    { id: 5, name: 'Graphic Design', price: 16.48, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91', department: 'English Department' },
    { id: 6, name: 'Graphic Design', price: 16.48, image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1', department: 'English Department' },
    { id: 7, name: 'Graphic Design', price: 16.48, image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0', department: 'English Department' },
    { id: 8, name: 'Graphic Design', price: 16.48, image: 'https://images.unsplash.com/photo-1577937927133-61d09c5644b3', department: 'English Department' },
  ];

  const [mainImage, setMainImage] = useState('');
  
  useEffect(() => {
    // Set main image when product changes
    if (product && product.images && product.images.length > 0) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  // Helper function to render the rating stars
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipPath="url(#half-star)"></path></svg>);
      } else {
        stars.push(<svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>);
      }
    }
    
    return stars;
  };

  if (!product) {
    return <p className="p-4">Loading product details...</p>;
    }
  
    return (
    <div className="bg-white">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative">
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10">
            <ChevronLeft size={20} />
          </button>
          <img src={mainImage} alt={product.name} className="w-full h-[400px] object-cover" />
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center gap-4 mt-4 mb-6 px-4">
          {product.images.slice(0, 2).map((image, index) => (
            <div 
              key={index} 
              className={`w-[80px] h-[80px] cursor-pointer border ${mainImage === image ? 'border-blue-500' : 'border-gray-200'}`}
              onClick={() => setMainImage(image)}
            >
              <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="px-4 pb-8">
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

            <div className="flex space-x-2">
              <button className="flex-1 bg-[#23A6F0] text-white py-3 rounded-md text-sm font-bold">
                Select Options
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
        
        {/* Mobile Product Tabs */}
        <div className="md:hidden border-t border-gray-200 mt-6">
          <div className="px-4 py-6">
            <div className="border-b border-gray-200 mb-4">
              <div className="flex space-x-4 text-sm overflow-x-auto">
                <button
                  className={`pb-2 font-medium whitespace-nowrap ${activeTab === 'description' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button
                  className={`pb-2 font-medium whitespace-nowrap ${activeTab === 'additional' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('additional')}
                >
                  Additional Information
                </button>
                <button
                  className={`pb-2 font-medium whitespace-nowrap ${activeTab === 'reviews' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews ({product.reviewCount})
                </button>
              </div>
            </div>

            {activeTab === 'description' && (
              <div>
                <div className="mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace" 
                    alt="Product feature" 
                    className="w-full h-48 object-cover mb-4"
                  />
                  
                  <h3 className="text-lg font-bold mb-2 text-[#252B42]">the quick fox jumps over</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                  </p>

                  <h3 className="text-lg font-bold mb-2 mt-6 text-[#252B42]">the quick fox jumps over</h3>
                  
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((item) => (
                      <details key={item} className="group text-sm">
                        <summary className="flex items-center text-gray-600 cursor-pointer">
                          <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform" />
                          <span className="ml-1">the quick fox jumps over the lazy dog</span>
                        </summary>
                      </details>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold mb-2 mt-6 text-[#252B42]">the quick fox jumps over</h3>
                  
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((item) => (
                      <details key={`b-${item}`} className="group text-sm">
                        <summary className="flex items-center text-gray-600 cursor-pointer">
                          <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform" />
                          <span className="ml-1">the quick fox jumps over the lazy dog</span>
                        </summary>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'additional' && (
              <div className="text-gray-600">
                <h3 className="text-lg font-bold mb-4">Additional Information</h3>
                <p>Weight, dimensions, materials, etc. would go here.</p>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-bold mb-2">Customer Reviews</h3>
                <p className="text-gray-600 mb-4">No reviews yet. Be the first to review this product.</p>
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="relative">
              <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10">
                <ChevronLeft size={20} />
              </button>
              <img src={mainImage} alt={product.name} className="w-full h-[450px] object-cover" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="flex gap-4 mt-4">
              {product.images.slice(0, 2).map((image, index) => (
                <div 
                  key={index} 
                  className={`w-20 h-20 cursor-pointer border ${mainImage === image ? 'border-blue-500' : 'border-gray-200'}`}
                  onClick={() => setMainImage(image)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
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

              <div className="flex space-x-4">
                <button className="px-10 bg-[#23A6F0] text-white py-3 rounded hover:bg-[#1d8fcf] font-medium">
                  Select Options
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
        <div className="mt-16 border-t border-gray-200">
          <div className="flex space-x-6 pt-4">
            <button
              className={`py-3 px-4 text-sm font-medium ${activeTab === 'description' ? 'text-[#252B42] border-b-2 border-[#23A6F0]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`py-3 px-4 text-sm font-medium ${activeTab === 'additional' ? 'text-[#252B42] border-b-2 border-[#23A6F0]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('additional')}
            >
              Additional Information
            </button>
            <button
              className={`py-3 px-4 text-sm font-medium ${activeTab === 'reviews' ? 'text-[#252B42] border-b-2 border-[#23A6F0]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="flex gap-10">
                <div className="w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace" 
                    alt="Product feature" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="w-2/3 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#252B42]">the quick fox jumps over</h3>
                    <p className="text-gray-600">
                      Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                    <p className="text-gray-600 mt-2">
                      Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                    <p className="text-gray-600 mt-2">
                      Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#252B42]">the quick fox jumps over</h3>
                    
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center text-gray-600">
                          <ChevronRight size={16} className="text-gray-400 mr-1" />
                          <span>the quick fox jumps over the lazy dog</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'additional' && (
              <div className="text-gray-600">
                <h3 className="text-lg font-bold mb-4 text-[#252B42]">Additional Information</h3>
                <p>Weight, dimensions, materials, etc. would go here.</p>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#252B42]">the quick fox jumps over</h3>
                  <ul className="space-y-2 text-gray-600">
                    {[1, 2, 3, 4].map((item) => (
                      <li key={item} className="flex items-center">
                        <ChevronRight size={16} className="text-gray-400 mr-1" />
                        <span>the quick fox jumps over the lazy dog</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#252B42]">the quick fox jumps over</h3>
                  <ul className="space-y-2 text-gray-600">
                    {[1, 2, 3, 4].map((item) => (
                      <li key={`b-${item}`} className="flex items-center">
                        <ChevronRight size={16} className="text-gray-400 mr-1" />
                        <span>the quick fox jumps over the lazy dog</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bestseller Products Section */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[#252B42] md:text-left text-center">BESTSELLER PRODUCTS</h2>
          
          {/* Mobile View */}
          <div className="md:hidden flex justify-center">
            <div className="grid grid-cols-1 gap-4 max-w-xs">
              {bestsellerProducts.slice(0, 4).map((item) => (
                <div key={item.id} className="border border-gray-200">
                  <img src={item.image} alt={item.name} className="w-full" />
                  <div className="px-4 pt-4 pb-5">
                    <h3 className="text-[#252B42] font-medium text-left mb-2">{item.name}</h3>
                    <p className="text-gray-500 text-sm text-left mb-3">{item.department}</p>
                    <div className="flex space-x-2">
                      <span className="text-gray-400 line-through">${(item.price * 1.2).toFixed(2)}</span>
                      <span className="text-[#2DC071] font-medium">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-4 gap-6">
            {bestsellerProducts.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200">
                <img src={item.image} alt={item.name} className="w-full aspect-square object-cover" />
                <div className="p-5">
                  <h3 className="text-[#252B42] font-medium text-left">{item.name}</h3>
                  <p className="text-[#737373] text-sm text-left mt-1">{item.department}</p>
                  <div className="flex space-x-2 mt-2">
                    <span className="text-gray-400 line-through">${(item.price * 1.2).toFixed(2)}</span>
                    <span className="text-[#2DC071] font-medium">${item.price.toFixed(2)}</span>
                  </div>
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
  