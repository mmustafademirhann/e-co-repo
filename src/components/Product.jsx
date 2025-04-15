export const Product = ({ products }) => {
    const colors = ['bg-blue-500', 'bg-teal-500', 'bg-orange-500', 'bg-black'];
  
    return (
      <>
        {/* Desktop görünüm */}
        <div className="hidden md:grid grid-cols-4 gap-6 mb-12">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-2 flex flex-col border border-gray-200"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-[427px] object-cover rounded mb-4"
              />
  
              <div className="flex-1 flex flex-col items-center text-center px-2">
                <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
  
                <div className="text-sm mb-4">
                  <span className="text-gray-400 line-through mr-2">₺{(item.price * 1.5).toFixed(2)}</span>
                  <span className="text-green-600 font-bold">₺{item.price.toFixed(2)}</span>
                </div>
  
                <div className="flex justify-center gap-2 mt-auto">
                  {colors.map((c, i) => (
                    <span key={i} className={`${c} w-4 h-4 rounded-full`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Mobil görünüm */}
        <div className="grid md:hidden grid-cols-1 gap-6 mb-12">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-2 flex flex-col border border-gray-200"
            >
              <img
                src={item.src}
                alt={item.title}
                 className="w-full h-[700px] object-cover rounded mb-4"
              />
  
              <div className="flex-1 flex flex-col items-center text-center px-2">
                <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
  
                <div className="text-sm mb-4">
                  <span className="text-gray-400 line-through mr-2">₺{(item.price * 1.5).toFixed(2)}</span>
                  <span className="text-green-600 font-bold">₺{item.price.toFixed(2)}</span>
                </div>
  
                <div className="flex justify-center gap-2 mt-auto">
                  {colors.map((c, i) => (
                    <span key={i} className={`${c} w-4 h-4 rounded-full`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  