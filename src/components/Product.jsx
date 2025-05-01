import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Product = ({ products }) => {
    const history = useHistory();
    const categories = useSelector(state => state.product.categories);
    
    const handleProductClick = (product) => {
        console.log("Product clicked:", product);
        
        try {
            // Doğrudan basit yönlendirme kullanarak sorunu çöz
            console.log("Directly navigating to product ID:", product.id);
            // Format: /product/:productId
            history.push(`/product/${product.id}`);
        } catch (error) {
            console.error("Navigation error:", error);
            
            // Yedek olarak karmaşık URL'yi dene
            try {
                // Get category details from product's category
                const category = categories.find(c => c.id === product.category_id);
                console.log("Found category:", category);
                
                const gender = category?.gender === 'k' ? 'kadin' : 'erkek';
                const categoryName = category?.title?.toLowerCase().replace(/\s+/g, '-') || 'products';
                const categoryId = product.category_id || '0';
                const productSlug = (product.name || product.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                
                console.log("URL params:", { gender, categoryName, categoryId, productSlug, productId: product.id });
                
                const targetUrl = `/shop/${gender}/${categoryName}/${categoryId}/${productSlug}/${product.id}`;
                console.log("Navigating to:", targetUrl);
                
                // Navigate to product detail page using the proper route format
                // Format: /shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
                history.push(targetUrl);
            } catch (backupError) {
                console.error("Backup navigation error:", backupError);
                // Son çare: ana sayfaya dön
                history.push('/shop');
            }
        }
    };

    if (!products || !Array.isArray(products)) return null;

    return (
        <>
            {/* Desktop view */}
            <div className="hidden md:grid grid-cols-4 gap-6 mb-12">
                {products.map((item) => {
                    const image = item.images?.[0]?.url || item.src;
                    const title = item.name || item.title;
                    const price = item.price || 0;
                    const rating = item.rating || 0;
                    const sellCount = item.sell_count || 0;

                    return (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-2 flex flex-col border border-gray-200 cursor-pointer"
                            onClick={() => handleProductClick(item)}
                        >
                            <div 
                                className="relative pt-[100%]"
                            >
                                <img
                                    src={image || 'https://via.placeholder.com/300x400'}
                                    alt={title}
                                    className="absolute top-0 left-0 w-full h-full object-cover rounded"
                                />
                            </div>

                            <div className="p-4">
                                <h3 
                                    className="text-[#252B42] font-bold mb-2 line-clamp-2 cursor-pointer"
                                >{title}</h3>
                                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#23856D] font-bold">${price.toFixed(2)}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-400">★</span>
                                        <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
                                        <span className="text-sm text-gray-400">({sellCount})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mobile view */}
            <div className="grid md:hidden grid-cols-1 gap-6 mb-12">
                {products.map((item) => {
                    const image = item.images?.[0]?.url || item.src;
                    const title = item.name || item.title;
                    const price = item.price || 0;
                    const rating = item.rating || 0;
                    const sellCount = item.sell_count || 0;

                    return (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 p-2 flex flex-col border border-gray-200 cursor-pointer"
                            onClick={() => handleProductClick(item)}
                        >
                            <div 
                                className="relative pt-[100%]"
                            >
                                <img
                                    src={image || 'https://via.placeholder.com/300x400'}
                                    alt={title}
                                    className="absolute top-0 left-0 w-full h-full object-cover rounded"
                                />
                            </div>

                            <div className="p-4">
                                <h3 
                                    className="text-[#252B42] font-bold mb-2 cursor-pointer"
                                >{title}</h3>
                                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#23856D] font-bold">${price.toFixed(2)}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-400">★</span>
                                        <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
                                        <span className="text-sm text-gray-400">({sellCount})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

