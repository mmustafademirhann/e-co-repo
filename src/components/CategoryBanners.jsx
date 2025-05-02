import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const CategoryBanners = () => {
  const history = useHistory();
  // Get categories from Redux store
  const categories = useSelector(state => state.product.categories);
  
  const getGenderText = (gender) => {
    return gender === 'k' ? 'kadin' : 'erkek';
  };

  const handleCategoryClick = (category) => {
    const genderText = getGenderText(category.gender);
    // Use URL-friendly title (lowercase, replace Turkish chars if needed)
    const titleSlug = category.title.toLowerCase().replace('ı', 'i').replace('ş', 's');
    history.push(`/shop/${genderText}/${titleSlug}/${category.id}`);
  };

  // Get the first 5 categories from the store
  const getTop5Categories = () => {
    return Array.isArray(categories) ? categories.slice(0, 5) : [];
  };

  // Function to get image, handling potential errors
  const getCategoryImage = (category) => {
    // Default placeholder image
    const placeholder = 'https://via.placeholder.com/600x600?text=No+Image';
    
    if (!category || !category.img) {
      return placeholder;
    }
    
    // Return the image URL from the category object
    return category.img;
  };

  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop if placeholder also fails
    e.target.src = 'https://via.placeholder.com/600x600?text=Load+Error';
  };

  const top5Categories = getTop5Categories();

  return (
    <div className="w-full my-8">
      {/* Mobile view - vertical stack */}
      <div className="flex flex-col gap-4 md:hidden w-full px-4">
        {top5Categories.map((category) => (
          <div 
            key={category.id} 
            className="w-full relative cursor-pointer overflow-hidden rounded-md border border-gray-200 shadow-sm"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={getCategoryImage(category)} 
                alt={category.title} 
                className="w-full h-full object-cover block" // Ensure image is displayed
                loading="lazy"
                onError={handleImageError} // Add error handler
              />
              {/* Lighter overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-t from-black/30 to-transparent hover:from-black/50 transition-all">
                <h3 className="text-xl font-bold text-white uppercase tracking-wide drop-shadow-lg px-2">{category.title}</h3>
                <p className="text-sm text-white mt-1 drop-shadow-lg">Rating: {category.rating || 'N/A'}</p> {/* Handle missing rating */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - horizontal row */}
      <div className="hidden md:grid md:grid-cols-5 w-full gap-4 px-4">
        {top5Categories.map((category) => (
          <div 
            key={category.id} 
            className="relative cursor-pointer overflow-hidden rounded-md border border-gray-200 shadow-sm group"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={getCategoryImage(category)} 
                alt={category.title} 
                className="w-full h-full object-cover block group-hover:scale-105 transition-transform duration-300" // Ensure image is displayed
                loading="lazy"
                onError={handleImageError} // Add error handler
              />
              {/* Lighter overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/50 transition-all">
                <h3 className="text-xl font-bold text-white uppercase tracking-wide drop-shadow-lg px-2">{category.title}</h3>
                <p className="text-sm text-white mt-1 drop-shadow-lg">Rating: {category.rating || 'N/A'}</p> {/* Handle missing rating */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
