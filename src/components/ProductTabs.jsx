import React from 'react';
import { ChevronRight } from 'lucide-react';

const ProductTabs = ({ activeTab, setActiveTab, product }) => {
  return (
    <>
      {/* Mobile Product Tabs */}
      <div className="md:hidden border-t border-gray-200 mt-6">
        <div className="px-4 py-6">
          <div className="border-b border-gray-200 mb-4">
            <div className="flex space-x-4 text-sm overflow-x-auto">
              <button
                id="mobile-tab-description"
                className={`pb-2 font-medium whitespace-nowrap ${activeTab === 'description' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                id="mobile-tab-additional"
                className={`pb-2 font-medium whitespace-nowrap ${activeTab === 'additional' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('additional')}
              >
                Additional Information
              </button>
              <button
                id="mobile-tab-reviews"
                className={`pb-2 font-medium whitespace-nowrap ${activeTab === 'reviews' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviewCount})
              </button>
            </div>
          </div>

          {activeTab === 'description' && (
            <div>
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace" 
                  alt="Product feature" 
                  className="w-full h-48 object-cover mb-4"
                />
                
                <h3 className="text-lg font-bold mb-2 text-[#252B42]">the quick fox jumps over</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                </p>

                <h3 className="text-lg font-bold mb-2 mt-6 text-[#252B42]">the quick fox jumps over</h3>
                
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <details key={item} className="group text-sm">
                      <summary className="flex items-center text-gray-600 cursor-pointer">
                        <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform" />
                        <span className="ml-1">the quick fox jumps over the lazy dog</span>
                      </summary>
                    </details>
                  ))}
                </div>

                <h3 className="text-lg font-bold mb-2 mt-6 text-[#252B42]">the quick fox jumps over</h3>
                
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <details key={`b-${item}`} className="group text-sm">
                      <summary className="flex items-center text-gray-600 cursor-pointer">
                        <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform" />
                        <span className="ml-1">the quick fox jumps over the lazy dog</span>
                      </summary>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'additional' && (
            <div className="text-gray-600">
              <h3 className="text-lg font-bold mb-4">Additional Information</h3>
              <p>Weight, dimensions, materials, etc. would go here.</p>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <h3 className="text-lg font-bold mb-2">Customer Reviews</h3>
              <p className="text-gray-600 mb-4">No reviews yet. Be the first to review this product.</p>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Product Tabs */}
      <div className="hidden md:block mt-16 border-t border-gray-200">
        <div className="flex space-x-6 pt-4">
          <button
            id="desktop-tab-description"
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'description' ? 'text-[#252B42] border-b-2 border-[#23A6F0]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            id="desktop-tab-additional"
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'additional' ? 'text-[#252B42] border-b-2 border-[#23A6F0]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('additional')}
          >
            Additional Information
          </button>
          <button
            id="desktop-tab-reviews"
            className={`py-3 px-4 text-sm font-medium ${activeTab === 'reviews' ? 'text-[#252B42] border-b-2 border-[#23A6F0]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviewCount})
          </button>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="flex gap-10">
              <div className="w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace" 
                  alt="Product feature" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="w-2/3 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#252B42]">the quick fox jumps over</h3>
                  <p className="text-gray-600">
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                  </p>
                  <p className="text-gray-600 mt-2">
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                  </p>
                  <p className="text-gray-600 mt-2">
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#252B42]">the quick fox jumps over</h3>
                  
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex items-center text-gray-600">
                        <ChevronRight size={16} className="text-gray-400 mr-1" />
                        <span>the quick fox jumps over the lazy dog</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'additional' && (
            <div className="text-gray-600">
              <h3 className="text-lg font-bold mb-4 text-[#252B42]">Additional Information</h3>
              <p>Weight, dimensions, materials, etc. would go here.</p>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#252B42]">the quick fox jumps over</h3>
                <ul className="space-y-2 text-gray-600">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item} className="flex items-center">
                      <ChevronRight size={16} className="text-gray-400 mr-1" />
                      <span>the quick fox jumps over the lazy dog</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#252B42]">the quick fox jumps over</h3>
                <ul className="space-y-2 text-gray-600">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={`b-${item}`} className="flex items-center">
                      <ChevronRight size={16} className="text-gray-400 mr-1" />
                      <span>the quick fox jumps over the lazy dog</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductTabs; 