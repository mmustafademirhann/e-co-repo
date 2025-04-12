import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const image = images[current];

  return (
    <div
      className="relative h-[800px] md:h-[900px] bg-no-repeat bg-cover bg-center md:bg-top transition-all duration-500"
      style={{ backgroundImage: `url(${image.src})` }}
    >
      {/* İçerik */}
      <div className="flex z-10 h-full flex-col justify-center items-center md:items-start text-center md:text-left px-4 md:px-20 max-w-7xl mx-auto">
        <p className="uppercase text-xs md:text-sm text-white tracking-wide mb-1 md:mb-2">{image.season || 'SUMMER 2020'}</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">{image.caption}</h2>
        <p className="text-sm md:text-md text-white mb-5 md:mb-6 max-w-md">{image.description}</p>
        <button className="bg-green-500 text-white px-6 py-3 font-semibold rounded hover:bg-green-600 transition">
          SHOP NOW
        </button>
      </div>

      {/* Oklar */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-4 md:left-[40px] top-1/2 transform -translate-y-1/2 z-20"
      >
        <ChevronLeft className="w-8 h-8 text-white" strokeWidth={1.5} />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        className="absolute right-4 md:right-[40px] top-1/2 transform -translate-y-1/2 z-20"
      >
        <ChevronRight className="w-8 h-8 text-white" strokeWidth={1.5} />
      </button>

      {/* Göstergeler - sadece desktop */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 gap-2 z-20">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-1 ${index === current ? 'w-12 bg-white' : 'w-6 bg-white/50'} transition-all duration-300`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
