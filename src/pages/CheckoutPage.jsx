import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCart } from '../redux/actions/shoppingCartActions';
import { 
  CreditCard, 
  Truck, 
  ShoppingBag, 
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  DollarSign
} from 'lucide-react';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cart } = useSelector(state => state.shoppingCart);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  // Calculate totals
  const subtotal = cart.reduce((total, item) => 
    total + (item.product.price * item.count), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (cart.length === 0) {
      history.push('/cart');
      toast.info('Your cart is empty');
    }
    
    // Scroll to top on step change
    window.scrollTo(0, 0);
  }, [cart.length, history, step]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateShippingForm = () => {
    const { firstName, lastName, email, phone, address, city, state, zipCode } = shippingDetails;
    if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zipCode) {
      toast.error('Please fill all required fields');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const validatePaymentForm = () => {
    if (paymentMethod === 'credit-card') {
      const { cardNumber, cardName, expiryDate, cvv } = cardDetails;
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast.error('Please fill all card details');
        return false;
      }
      
      // Basic card validation
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        toast.error('Card number should be 16 digits');
        return false;
      }
      
      if (cvv.length < 3) {
        toast.error('CVV should be at least 3 digits');
        return false;
      }
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateShippingForm()) return;
    if (step === 2 && !validatePaymentForm()) return;
    
    setStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep(prev => prev - 1);
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      
      // Simulate API call for order placement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      dispatch(clearCart());
      setLoading(false);
      setStep(4); // Move to success step
    } catch (error) {
      setLoading(false);
      toast.error('Error placing order. Please try again.');
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col items-center">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                step >= item ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 text-gray-500'
              }`}>
                {step > item ? <Check size={20} /> : item}
              </div>
              <div className="text-xs mt-2 text-gray-600">
                {item === 1 ? 'Shipping' : item === 2 ? 'Payment' : 'Review'}
              </div>
            </div>
          ))}
        </div>
        <div className="relative flex items-center justify-between mt-4">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200"></div>
          <div className={`absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-0.5 ${step >= 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
          <div className={`absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-0.5 ${step >= 3 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
        </div>
      </div>
    );
  };

  const renderShippingForm = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <MapPin className="mr-2" size={20} />
          Shipping Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={shippingDetails.firstName}
              onChange={handleShippingChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={shippingDetails.lastName}
              onChange={handleShippingChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              value={shippingDetails.email}
              onChange={handleShippingChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleShippingChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
            <input
              type="text"
              name="address"
              value={shippingDetails.address}
              onChange={handleShippingChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
            <input
              type="text"
              name="city"
              value={shippingDetails.city}
              onChange={handleShippingChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
            <input
              type="text"
              name="state"
              value={shippingDetails.state}
              onChange={handleShippingChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code *</label>
            <input
              type="text"
              name="zipCode"
              value={shippingDetails.zipCode}
              onChange={handleShippingChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
            <select
              name="country"
              value={shippingDetails.country}
              onChange={handleShippingChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentForm = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <DollarSign className="mr-2" size={20} />
          Payment Method
        </h2>
        
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div
              onClick={() => setPaymentMethod('credit-card')}
              className={`border p-4 rounded-md flex items-center cursor-pointer ${
                paymentMethod === 'credit-card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <input
                type="radio"
                id="credit-card"
                checked={paymentMethod === 'credit-card'}
                onChange={() => {}}
                className="mr-2"
              />
              <label htmlFor="credit-card" className="flex items-center cursor-pointer">
                <CreditCard size={20} className="mr-2" />
                <span>Credit/Debit Card</span>
              </label>
            </div>
            
            <div
              onClick={() => setPaymentMethod('paypal')}
              className={`border p-4 rounded-md flex items-center cursor-pointer ${
                paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <input
                type="radio"
                id="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => {}}
                className="mr-2"
              />
              <label htmlFor="paypal" className="flex items-center cursor-pointer">
                <span className="font-bold text-blue-800 mr-1">Pay</span>
                <span className="font-bold text-blue-500">Pal</span>
              </label>
            </div>
          </div>
        </div>
        
        {paymentMethod === 'credit-card' && (
          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardChange}
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength="19"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name *</label>
              <input
                type="text"
                name="cardName"
                value={cardDetails.cardName}
                onChange={handleCardChange}
                placeholder="John Doe"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleCardChange}
                  placeholder="MM/YY"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  maxLength="5"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  placeholder="123"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  maxLength="4"
                  required
                />
              </div>
            </div>
          </div>
        )}
        
        {paymentMethod === 'paypal' && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md text-center">
            <p className="text-gray-600 mb-4">You will be redirected to PayPal to complete your payment.</p>
            <div className="flex justify-center">
              <img src="/paypal-logo.png" alt="PayPal" className="h-12" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderOrderSummary = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <ShoppingBag className="mr-2" size={20} />
          Order Summary
        </h2>
        
        <div className="border-b pb-4 mb-4">
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden mr-4">
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
                <div>
                  <div className="font-medium">{item.product.title}</div>
                  <div className="text-sm text-gray-500">Qty: {item.count}</div>
                </div>
              </div>
              <div className="font-medium">${(item.product.price * item.count).toFixed(2)}</div>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (7%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <div className="border-t pt-2 mt-2 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-xl">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Shipping Address</h3>
          <div className="text-gray-700">
            <p>{shippingDetails.firstName} {shippingDetails.lastName}</p>
            <p>{shippingDetails.address}</p>
            <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}</p>
            <p>{shippingDetails.country}</p>
            <p>{shippingDetails.email}</p>
            <p>{shippingDetails.phone}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-2">Payment Method</h3>
          <div className="text-gray-700 flex items-center">
            {paymentMethod === 'credit-card' ? (
              <>
                <CreditCard size={20} className="mr-2" />
                <span>
                  Credit Card ending in {cardDetails.cardNumber.slice(-4)}
                </span>
              </>
            ) : (
              <>
                <span className="font-bold text-blue-800 mr-1">Pay</span>
                <span className="font-bold text-blue-500">Pal</span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderOrderSuccess = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={32} />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
          You will receive a confirmation email shortly.
        </p>
        
        <div className="max-w-sm mx-auto mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="text-left">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Order ID:</span>
              <span>#{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Payment Method:</span>
              <span>{paymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {step < 4 && (
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Checkout</h1>
            <Link 
              to="/cart" 
              className="flex items-center text-gray-600 hover:text-blue-500 transition"
            >
              <ChevronLeft size={20} />
              <span>Back to Cart</span>
            </Link>
          </div>
        )}

        {step < 4 && renderStepIndicator()}
        
        {step === 1 && renderShippingForm()}
        {step === 2 && renderPaymentForm()}
        {step === 3 && renderOrderSummary()}
        {step === 4 && renderOrderSuccess()}
        
        {step < 4 && (
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                onClick={handlePreviousStep}
                className="flex items-center px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
              >
                <ChevronLeft size={18} className="mr-1" />
                Back
              </button>
            ) : (
              <div></div> // Empty div to maintain flex justify-between
            )}
            
            {step < 3 ? (
              <button
                onClick={handleNextStep}
                className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Next
                <ChevronRight size={18} className="ml-1" />
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className={`flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Processing...' : 'Place Order'}
                {!loading && <Truck size={18} className="ml-2" />}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage; 