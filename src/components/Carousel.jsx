import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) =>{
        return (prev + 1) % images.length} );
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const image = images[current];

  return (
    <div
      className="relative w-full h-[753px] bg-cover bg-center text-white transition-all duration-500"
      style={{
        backgroundImage: `url(${image.src})`
      }}
    >
      {/* Hafif renk overlay */}


      {/* İçerik */}
      <div className="flex z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <p className="uppercase text-[40px] mb-2">SUMMER 2020</p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{image.caption}</h2>
        <p className="text-md mb-6 max-w-md">{image.description}</p>
        <button className="bg-green-400 text-white px-6 py-3 font-semibold rounded hover:bg-green-500 transition">
          SHOP NOW
        </button>
      </div>

      {/* Oklar */}
      <button
        onClick = {() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-[40px] top-1/2 transform -translate-y-1/2 z-20"
      >
        <ChevronLeft className="w-6 h-[44px] text-white" strokeWidth={1.5} />
      </button>
      <button  
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        className="absolute right-[40px] top-1/2 transform -translate-y-1/2 z-20"
      >
        <ChevronRight className="w-6 h-[44px] text-white" strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default Carousel;