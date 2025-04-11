const HeroSection = ({ image, season, title, description, primaryBtn, secondaryBtn }) => {
    return (
      <section className="w-full m-0 p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
  
          {/* Image (desktop: left, mobile: bottom) */}
          <div className="order-2 md:order-1">
            <img src={image} alt="hero" className="w-full h-full object-cover" />
          </div>
  
          {/* Text content */}
          <div className="order-1 md:order-2 flex flex-col justify-center items-center md:items-start text-center md:text-left p-6 md:px-16 py-12">
            <p className="uppercase text-sm text-gray-400 mb-2">{season}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{title}</h2>
            <p className="text-gray-600 text-base md:text-lg mb-6 max-w-md">{description}</p>
  
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                {primaryBtn}
              </button>
              <button className="border border-green-500 text-green-500 px-6 py-2 rounded hover:bg-green-50">
                {secondaryBtn}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;
  