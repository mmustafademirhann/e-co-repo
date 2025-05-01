import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  removeFromCart, 
  updateCartItem, 
  clearCart,
  toggleCartItemCheck
} from '../redux/actions/shoppingCartActions';
import { 
  Trash2, 
  ShoppingCart, 
  Plus, 
  Minus, 
  ChevronLeft
} from 'lucide-react';

const CartPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cart } = useSelector(state => state.shoppingCart);
  const [showConfirm, setShowConfirm] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Calculate total amount for checked items
  const totalAmount = cart
    .filter(item => item.checked)
    .reduce((total, item) => total + (item.product.price * item.count), 0);
  
  // Calculate shipping cost (free for orders over $100)
  const shippingCost = totalAmount > 100 ? 0 : 29.99;
  
  // Calculate grand total
  const grandTotal = totalAmount + shippingCost - discount;

  // Handle quantity change
  const handleQuantityChange = (productId, newCount) => {
    dispatch(updateCartItem(productId, newCount));
  };

  // Handle remove item
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Item removed from cart');
  };

  // Handle toggle check
  const handleToggleCheck = (productId) => {
    dispatch(toggleCartItemCheck(productId));
  };

  // Handle clear cart
  const handleClearCart = () => {
    setShowConfirm(false);
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    // Only proceed if at least one item is checked
    if (cart.some(item => item.checked)) {
      history.push('/checkout/address');
    } else {
      toast.warning('Please select at least one item to checkout');
    }
  };
  
  // Handle apply discount code
  const handleApplyDiscount = () => {
    if (discountCode.trim() === 'DISCOUNT20') {
      const discountAmount = totalAmount * 0.2;
      setDiscount(discountAmount);
      toast.success('Discount applied successfully!');
    } else {
      setDiscount(0);
      toast.error('Invalid discount code');
    }
  };

  useEffect(() => {
    // Console'a cart verilerini yazdır
    if (cart.length > 0) {
      console.log('Cart Items:', cart);
      // İlk ürünü detaylı incelemek için yazdır
      console.log('First product details:', cart[0].product);
    }
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart size={64} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            to="/shop" 
            className="bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <div className="flex gap-3">
          <Link 
            to="/shop" 
            className="flex items-center text-gray-600 hover:text-primary transition"
          >
            <ChevronLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
          {cart.length > 0 && (
            <button 
              onClick={() => setShowConfirm(true)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input 
                        type="checkbox"
                        checked={cart.length > 0 && cart.every(item => item.checked)}
                        onChange={() => {
                          const allChecked = cart.every(item => item.checked);
                          cart.forEach(item => {
                            if (allChecked) {
                              dispatch(toggleCartItemCheck(item.product.id));
                            } else if (!item.checked) {
                              dispatch(toggleCartItemCheck(item.product.id));
                            }
                          });
                        }}
                        className="h-4 w-4 text-primary focus:ring-primary rounded border-gray-300"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr key={item.product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleToggleCheck(item.product.id)}
                          className="h-4 w-4 text-primary focus:ring-primary rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                            <img 
                              src={item.product.images?.[0]?.url || '/placeholder.png'} 
                              alt={item.product.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder.png';
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.product.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {(item.product.category && typeof item.product.category === 'string') 
                                ? item.product.category 
                                : (item.product.categories && item.product.categories.length > 0) 
                                  ? (typeof item.product.categories[0] === 'string' 
                                      ? item.product.categories[0] 
                                      : item.product.categories[0]?.title || item.product.categories[0]?.name)
                                  : item.product.department || item.product.type || ''}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${item.product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => handleQuantityChange(item.product.id, Math.max(1, item.count - 1))}
                            className="px-2 py-1 text-gray-600 hover:text-primary"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center">{item.count}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.product.id, item.count + 1)}
                            className="px-2 py-1 text-gray-600 hover:text-primary"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${(item.product.price * item.count).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Order Summary Box */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-lg font-bold mb-6 pb-2 border-b">Sipariş Özeti</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Ürünün Toplamı</span>
                <span className="font-medium">{totalAmount.toFixed(2)} TL</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Kargo Toplam</span>
                <span className="font-medium">{shippingCost.toFixed(2)} TL</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>İndirim</span>
                  <span>-{discount.toFixed(2)} TL</span>
                </div>
              )}
              
              <div className="flex justify-between border-t border-b py-4 my-2">
                <span className="font-bold">Toplam</span>
                <span className="font-bold text-xl text-primary">{grandTotal.toFixed(2)} TL</span>
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="İNDİRİM KODU GİR" 
                  className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button 
                  onClick={handleApplyDiscount}
                  className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition"
                >
                  Uygula
                </button>
              </div>
              
              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-md transition flex items-center justify-center"
                disabled={totalAmount === 0}
              >
                <span>Sepeti Onayla</span>
                <ChevronLeft size={20} className="transform rotate-180 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-3">Clear Shopping Cart</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to clear all items from your cart?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleClearCart}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 