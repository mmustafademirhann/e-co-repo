import React from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';

const ProductInfo = ({ product, selectedColor, setSelectedColor, renderRatingStars }) => {
  // Eğer renderRatingStars fonksiyonu prop olarak gelmezse kendi içinde oluşturuyoruz
  const renderStars = renderRatingStars || ((rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-${i <= rating ? 'yellow-500' : 'gray-300'}`}>
          ★
        </span>
      );
    }
    return stars;
  });

  if (!product) return null;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
      
      <div className="flex items-center mb-4">
        <div className="flex">{renderStars(product.rating || 0)}</div>
        <span className="ml-2 text-sm text-gray-600">{product.reviews?.length || 0} Reviews</span>
      </div>
      
      <p className="text-xl font-semibold text-gray-900 mb-4">${product.price?.toFixed(2) || '0.00'}</p>
      
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-700">Availability: </span>
        <span className="text-sm font-medium text-blue-600">
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      
      <p className="text-gray-700 mb-6">{product.description}</p>
      
      {product.colors && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Colors</h3>
          <div className="flex space-x-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full border border-gray-300 ${selectedColor === index ? 'ring-2 ring-offset-1 ring-gray-900' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor && setSelectedColor(index)}
                aria-label={`Color ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="flex space-x-2 mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700">
          Add to Cart
        </button>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-100">
          <Heart size={20} className="text-gray-700" />
        </button>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-100">
          <ShoppingCart size={20} className="text-gray-700" />
        </button>
        <button className="p-2 border border-gray-300 rounded hover:bg-gray-100">
          <Eye size={20} className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;