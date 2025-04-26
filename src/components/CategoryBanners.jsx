import React from 'react';
import { categoriesForShopPage } from '../data'

export const CategoryBanners = () => {
  return (
    <div className="w-full">
      {/* Mobile view - vertical stack */}
      <div className="flex flex-col gap-4 md:hidden w-full px-4">
        {categoriesForShopPage.map((category) => (
          <div key={category.id} className="w-full relative cursor-pointer overflow-hidden rounded-none">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x600?text=Image+Not+Found';
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">CLOTHS</h3>
                <p className="text-sm text-white mt-1">5 items</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - horizontal row */}
      <div className="hidden md:grid md:grid-cols-5 w-full gap-2">
        {categoriesForShopPage.map((category) => (
          <div key={category.id} className="relative cursor-pointer overflow-hidden rounded-none">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x600?text=Image+Not+Found';
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">CLOTHS</h3>
                <p className="text-sm text-white mt-1">5 items</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryBanners;
