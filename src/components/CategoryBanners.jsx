import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const CategoryBanners = () => {
  const history = useHistory();
  const categories = useSelector(state => state.product.categories);
  
  const getGenderText = (gender) => {
    return gender === 'k' ? 'kadin' : 'erkek';
  };

  const handleCategoryClick = (category) => {
    const genderText = getGenderText(category.gender);
    history.push(`/shop/${genderText}/${category.title.toLowerCase()}/${category.id}`);
  };

  const getTop5Categories = () => {
    return categories.slice(0, 5);
  };

  return (
    <div className="w-full">
      {/* Mobile view - vertical stack */}
      <div className="flex flex-col gap-4 md:hidden w-full px-4">
        {getTop5Categories().map((category) => (
          <div 
            key={category.id} 
            className="w-full relative cursor-pointer overflow-hidden rounded-none"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={category.img || 'https://via.placeholder.com/600x600?text=Category'} 
                alt={category.title} 
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x600?text=Image+Not+Found';
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-40">
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">{category.title}</h3>
                <p className="text-sm text-white mt-1">Rating: {category.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - horizontal row */}
      <div className="hidden md:grid md:grid-cols-5 w-full gap-2">
        {getTop5Categories().map((category) => (
          <div 
            key={category.id} 
            className="relative cursor-pointer overflow-hidden rounded-none group"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={category.img || 'https://via.placeholder.com/600x600?text=Category'} 
                alt={category.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/600x600?text=Image+Not+Found';
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all">
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">{category.title}</h3>
                <p className="text-sm text-white mt-1">Rating: {category.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
