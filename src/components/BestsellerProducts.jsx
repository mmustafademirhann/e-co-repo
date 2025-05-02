import React from 'react';
import { Link } from 'react-router-dom';

// Debug helper function
const logImageError = (e, product) => {
  console.error('Error loading image for product:', product);
  e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
};

const BestsellerProducts = ({ bestsellerProducts }) => {
  console.log('Rendering BestsellerProducts with data:', bestsellerProducts);
  
  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-[#252B42] md:text-left text-center">BESTSELLER PRODUCTS</h2>
        
        {/* Mobile View */}
        <div className="md:hidden flex justify-center">
          <div className="grid grid-cols-1 gap-4 max-w-xs">
            {bestsellerProducts.slice(0, 4).map((item) => (
              <div key={item.id} className="border border-gray-200">
                <div className="w-full h-64 bg-gray-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => logImageError(e, item)}
                  />
                </div>
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
              <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => logImageError(e, item)}
                />
              </div>
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
  );
};

export default BestsellerProducts; 