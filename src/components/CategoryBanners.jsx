import { categoriesForShopPage } from '../data'
export const CategoryBanners = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 px-2 mx-10">
        {categoriesForShopPage.map((category) => (
          <div key={category.id} className="relative group cursor-pointer overflow-hidden">
            <div className="aspect-[3/4] relative overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                <h3 className="text-xl font-bold">{category.name}</h3>
                {category.subtext && <p className="text-sm">{category.subtext}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
}
