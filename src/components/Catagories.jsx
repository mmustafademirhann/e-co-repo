const Catagories = ({categories}) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 mt-8">
          {categories.map((category) => (
            <div key={category.id} className="relative cursor-pointer overflow-hidden group">
              <img
                src={category.src}
                alt={category.title}
                className="w-full h-[400px] object-cover"
                
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 shadow text-black text-sm font-semibold tracking-wider uppercase">
                {category.title}
              </div>
            </div>
          ))}
        </div>
    )
}
export default Catagories