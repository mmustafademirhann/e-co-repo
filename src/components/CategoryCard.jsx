import React from 'react';

// Yeniden Kullanılabilir Kategori Kartı Bileşeni
const CategoryCard = ({ category, className = "", imgClassName = "" }) => (
    <div className={`relative cursor-pointer overflow-hidden group ${className}`}>
        {/* Kategori verisi varsa resmi göster */}
        {category?.src && category?.title && (
            <img
                src={category.src}
                alt={category.title}
                // Resmin kartı doldurması ve ölçeklenmesi için gerekli sınıflar
                className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${imgClassName}`}
            />
        )}
        {/* Kategori başlığı */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 md:px-6 md:py-2 shadow text-black text-xs sm:text-sm font-semibold tracking-wider uppercase whitespace-nowrap">
            {/* Kategori başlığı yoksa varsayılan metin */}
            {category?.title || 'Kategori'}
        </div>
    </div>
);

export default CategoryCard