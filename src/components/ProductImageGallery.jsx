import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageWithFallback = ({ src, alt, className, fallbackSrc = '/placeholder-image.jpg', ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className} 
      onError={handleError}
      {...props}
    />
  );
};

const ProductImageGallery = ({ images = [], productName = "Product", onImageChange, initialImage }) => {
  const [currentImage, setCurrentImage] = useState(initialImage || (images.length > 0 ? images[0] : null));
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update current image when initialImage prop changes
  useEffect(() => {
    if (initialImage) {
      setCurrentImage(initialImage);
      // Find index of initialImage in images array
      const index = images.findIndex(img => img === initialImage);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [initialImage, images]);

  // Safety check for empty images array
  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-2 mb-4 flex justify-center items-center" style={{ minHeight: "400px" }}>
        <p className="text-gray-500">Ürün görseli bulunamadı</p>
      </div>
    );
  }

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setCurrentImage(images[newIndex]);
    if (onImageChange) onImageChange(images[newIndex]);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setCurrentImage(images[newIndex]);
    if (onImageChange) onImageChange(images[newIndex]);
  };

  const handleThumbnailClick = (image, index) => {
    setCurrentImage(image);
    setCurrentIndex(index);
    if (onImageChange) onImageChange(image);
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="relative">
          <button 
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md z-10">
            <ChevronLeft size={16} />
          </button>
          <div className="bg-gray-50 rounded-lg p-2 mb-4 flex justify-center items-center" style={{ minHeight: "400px" }}>
            <ImageWithFallback 
              src={currentImage} 
              alt={productName} 
              className="w-full h-auto object-contain rounded-lg" 
              style={{ maxHeight: "380px" }} 
            />
          </div>
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md z-10">
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex justify-center gap-4 mt-4 mb-6 px-4">
          {images.slice(0, 2).map((image, index) => (
            <div 
              key={index} 
              className={`w-[80px] h-[80px] cursor-pointer border-2 p-1 rounded-lg ${currentImage === image ? 'border-blue-500' : 'border-gray-200'}`}
              onClick={() => handleThumbnailClick(image, index)}
            >
              <ImageWithFallback 
                src={image} 
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded-lg" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="relative">
          <button 
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10">
            <ChevronLeft size={20} />
          </button>
          <div className="bg-gray-50 rounded-lg p-2 mb-4 flex justify-center items-center" style={{ minHeight: "500px" }}>
            <ImageWithFallback 
              src={currentImage} 
              alt={productName} 
              className="w-full h-auto object-contain rounded-lg" 
              style={{ maxHeight: "480px" }} 
            />
          </div>
          <button 
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex gap-4 mt-4 overflow-x-auto">
          {images.slice(0, 4).map((image, index) => (
            <div 
              key={index} 
              className={`flex-shrink-0 w-20 h-20 border-2 p-1 rounded-lg ${currentImage === image ? 'border-blue-500' : 'border-gray-200'}`}
              onClick={() => handleThumbnailClick(image, index)}
            >
              <ImageWithFallback 
                src={image} 
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded-lg" 
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImageGallery; 