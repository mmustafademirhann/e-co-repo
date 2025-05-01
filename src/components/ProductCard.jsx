import React from 'react';
import { useHistory } from 'react-router-dom';

const ProductCard = ({ product, gender = 'all', categoryName = 'product' }) => {
  const history = useHistory();

  // Create a URL-friendly slug from the product name
  const createSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single
  };

  const handleProductClick = () => {
    // Make sure category_id exists and is a number
    const categoryId = product.category_id || 1;
    
    // Format URL as: shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
    const productNameSlug = createSlug(product.name || 'product');
    const url = `/shop/${gender}/${categoryName}/${categoryId}/${productNameSlug}/${product.id}`;
    
    // Debug logs
    console.log("Product clicked:", product);
    console.log("Navigating to URL:", url);
    
    // Navigate to the product detail page
    history.push(url);
  };

  return (
    <div 
      className="bg-white border border-gray-200 transition-all duration-300 hover:shadow-lg cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="relative overflow-hidden group">
        <img 
          src={product.images && product.images.length > 0 ? product.images[0].url : '/placeholder-image.jpg'} 
          alt={product.name} 
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-medium text-[#252B42] mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {product.store && product.store.name || 'Department Store'}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <span className="text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
            <span className="text-[#2DC071] font-medium">${product.price.toFixed(2)}</span>
          </div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
  