import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axios';
import { 
  CreditCard, 
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Info,
  ShieldCheck
} from 'lucide-react';
import { 
  fetchCreditCards, 
  createCreditCard, 
  editCreditCard, 
  removeCreditCard 
} from '../redux/actions/cardActions';
import { createOrder } from '../redux/actions/shoppingCartActions';

const CheckoutPaymentPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.shoppingCart);
  const { orderLoading, orderError, checkoutAddress } = useSelector(state => state.shoppingCart);
  const { cards, loading: cardLoading, error: cardError } = useSelector(state => state.card);
  
  // States for form
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [editCardId, setEditCardId] = useState(null);
  const [cardFormData, setCardFormData] = useState({
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: '',
    cvv: ''
  });
  const [useSecure3d, setUseSecure3d] = useState(false);
  const [installmentOptions, setInstallmentOptions] = useState([
    { count: 1, title: 'Tek Çekim', value: 'single' }
  ]);
  const [selectedInstallment, setSelectedInstallment] = useState('single');

  // Calculate totals
  const totalAmount = cart.reduce((total, item) => total + (item.product.price * item.count), 0);
  const shippingCost = totalAmount > 100 ? 0 : 29.99;
  const discount = 0; // Can be updated if discount is applied
  const grandTotal = totalAmount + shippingCost - discount;
  
  useEffect(() => {
    // First check if checkout data exists in Redux state
    console.log('Checkout address from Redux:', checkoutAddress);
    
    if (checkoutAddress && checkoutAddress.shippingAddressId) {
      console.log('Using checkout address from Redux state');
    } else {
      // Fall back to localStorage if not in Redux
      const checkoutDataRaw = localStorage.getItem('checkoutData');
      console.log('Raw checkout data from localStorage:', checkoutDataRaw);
      
      if (!checkoutDataRaw) {
        toast.error('Lütfen önce adres bilgilerinizi girin');
        history.push('/checkout/address');
        return;
      }
      
      try {
        // Parse the data and verify it has the required address ID
        const localCheckoutData = JSON.parse(checkoutDataRaw);
        console.log('Parsed checkout data from localStorage:', localCheckoutData);
        
        if (!localCheckoutData || !localCheckoutData.shippingAddressId) {
          console.error('Missing shippingAddressId in checkout data');
          toast.error('Lütfen adres bilgilerinizi doğru şekilde girin');
          history.push('/checkout/address');
          return;
        }
      } catch (error) {
        console.error('Error parsing checkout data:', error);
        toast.error('Adres bilgileriniz yüklenirken hata oluştu');
        history.push('/checkout/address');
        return;
      }
    }
    
    // Check if we're coming from a successful order
    const lastOrderSuccess = localStorage.getItem('lastOrderSuccess');
    if (lastOrderSuccess) {
      // Clear the lastOrderSuccess flag
      localStorage.removeItem('lastOrderSuccess');
      // Skip other checks if we're coming from successful order
      return;
    }
    

    
    // Check if token exists
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Lütfen önce giriş yapın');
      history.push('/login', { from: location.pathname });
      return;
    }
    
    // Set token for API requests
    axiosInstance.defaults.headers.common['Authorization'] = token;
    
    // Fetch saved cards
    dispatch(fetchCreditCards());
  }, [dispatch, history, cart.length, checkoutAddress]);
  
  // Set selected card when cards are loaded
  useEffect(() => {
    if (cards.length > 0 && !selectedCard) {
      setSelectedCard(cards[0].id);
    }
  }, [cards, selectedCard]);
  
  // Handle card error
  useEffect(() => {
    if (cardError) {
      toast.error(cardError);
    }
  }, [cardError]);
  
  // Handle order error
  useEffect(() => {
    if (orderError) {
      toast.error(orderError);
    }
  }, [orderError]);
  
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === 'card_no') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
      
      setCardFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setCardFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const resetCardForm = () => {
    setCardFormData({
      card_no: '',
      expire_month: '',
      expire_year: '',
      name_on_card: '',
      cvv: ''
    });
    setEditCardId(null);
  };
  
  const handleAddOrUpdateCard = async (e) => {
    e.preventDefault();
    
    try {
      // Format data for validation
      const cardData = {
        card_no: cardFormData.card_no.replace(/\s/g, ''),
        expire_month: cardFormData.expire_month,
        expire_year: cardFormData.expire_year,
        name_on_card: cardFormData.name_on_card
      };
      
      if (editCardId) {
        // Update existing card
        await dispatch(editCreditCard({
          id: editCardId,
          ...cardData
        }));
      } else {
        // Add new card
        await dispatch(createCreditCard(cardData));
      }
      
      // Reset form
      resetCardForm();
      setShowAddCardForm(false);
      
    } catch (error) {
      console.error('Card operation error:', error);
      // Error is already handled in the action creator
    }
  };
  
  const handleEditCard = (card) => {
    setEditCardId(card.id);
    setCardFormData({
      card_no: String(card.card_no).replace(/(\d{4})/g, '$1 ').trim(),
      expire_month: String(card.expire_month),
      expire_year: String(card.expire_year),
      name_on_card: card.name_on_card,
      cvv: ''
    });
    setShowAddCardForm(true);
  };
  
  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Bu kartı silmek istediğinize emin misiniz?')) {
      try {
        await dispatch(removeCreditCard(cardId));
        
        // If the selected card is deleted, clear selection
        if (selectedCard === cardId) {
          setSelectedCard(null);
        }
        
      } catch (error) {
        console.error('Card deletion error:', error);
        // Error is already handled in the action creator
      }
    }
  };
  
  const handleCreateOrder = async () => {
    if (!selectedCard) {
      toast.error('Lütfen bir ödeme yöntemi seçin');
      return;
    }
    
    try {
      // First try to get address from Redux state
      let addressId;
      
      if (checkoutAddress && checkoutAddress.shippingAddressId) {
        addressId = checkoutAddress.shippingAddressId;
        console.log('Using shipping address ID from Redux:', addressId);
      } else {
        // Fall back to localStorage
        const checkoutDataRaw = localStorage.getItem('checkoutData');
        console.log('Raw checkout data before order:', checkoutDataRaw);
        
        if (!checkoutDataRaw) {
          toast.error('Adres bilgileri bulunamadı');
          history.push('/checkout/address');
          return;
        }
        
        const localCheckoutData = JSON.parse(checkoutDataRaw);
        console.log('Parsed checkout data for order:', localCheckoutData);
        
        // Check for shipping address ID
        if (!localCheckoutData || typeof localCheckoutData.shippingAddressId === 'undefined' || localCheckoutData.shippingAddressId === null) {
          console.error('Missing or invalid shippingAddressId in checkout data:', localCheckoutData);
          toast.error('Geçerli bir teslimat adresi seçilmemiş');
          history.push('/checkout/address');
          return;
        }
        
        addressId = localCheckoutData.shippingAddressId;
        console.log('Using shipping address ID from localStorage:', addressId);
      }
      
      // Find the selected card
      const selectedCardData = cards.find(card => card.id === selectedCard);
      
      if (!selectedCardData) {
        toast.error('Seçili kart bulunamadı');
        return;
      }
      
      // Format products for order payload
      const products = cart.map(item => ({
        product_id: item.product.id,
        count: item.count,
        detail: item.product.detail || `${item.product.color || 'default'} - ${item.product.size || 'default'}`
      }));
      
      // Create order payload
      const orderPayload = {
        address_id: addressId,
        order_date: new Date().toISOString(),
        card_no: parseInt(selectedCardData.card_no.replace(/\s/g, '')),
        card_name: selectedCardData.name_on_card,
        card_expire_month: parseInt(selectedCardData.expire_month),
        card_expire_year: parseInt(selectedCardData.expire_year),
        card_ccv: parseInt(cardFormData.cvv || '123'), // Fallback to a default if not provided
        price: grandTotal,
        products: products
      };
      
      console.log('Final order payload:', orderPayload);
      
      // Dispatch create order action
      const result = await dispatch(createOrder(orderPayload));
      
      if (result && result.success) {
        // Set a flag to indicate successful order
        localStorage.setItem('lastOrderSuccess', 'true');
        
        // Navigate to success page
        toast.success('🎉 Tebrikler! Siparişiniz başarıyla oluşturuldu!');
        history.push('/checkout/success');
      } else {
        console.error('Order creation failed with result:', result);
        toast.error('Sipariş oluşturulurken bir hata oluştu');
      }
      
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error(error.message || 'Sipariş oluşturulurken bir hata oluştu');
    }
  };
  
  // Helper to mask card number
  const maskCardNumber = (cardNumber) => {
    const cardStr = String(cardNumber);
    // Keep first 4 and last 4 digits visible, mask the rest
    return cardStr.substring(0, 4) + ' **** **** ' + cardStr.substring(cardStr.length - 4);
  };
  
  // Generate years for dropdown
  const yearOptions = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 15; i++) {
      years.push(currentYear + i);
    }
    return years;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <Link to="/checkout/address" className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-white font-bold">
                  1
                </div>
                <h1 className="ml-4 text-2xl font-bold text-gray-500">Adres Bilgileri</h1>
              </Link>
            </div>
            
            <div className="flex items-center">
              <div className="h-1 flex-1 bg-orange-500"></div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold mx-2">
                2
              </div>
              <h2 className="ml-4 text-xl font-semibold text-orange-500">Ödeme Seçenekleri</h2>
              <div className="h-1 flex-1 bg-orange-500 ml-2"></div>
            </div>
          </div>
          
          {/* Payment Selection Section */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CreditCard className="mr-2" size={20} />
                Ödeme Seçenekleri
              </h2>
              
              {cardLoading ? (
                <div className="text-center py-4 flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mr-2"></div>
                  <span>Ödeme bilgileri yükleniyor...</span>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center bg-orange-50 p-3 rounded-md border-l-4 border-orange-500 mb-4">
                      <Info size={20} className="text-orange-500 mr-2" />
                      <span>Kart ile ödemeyi seçtiniz. Banka veya Kredi Kartı kullanarak ödemenizi güvenle yapabilirsiniz.</span>
                    </div>
                  
                    {/* Cards List */}
                    {cards.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {cards.map((card) => (
                          <div 
                            key={card.id}
                            className={`border rounded-md p-4 relative cursor-pointer transition ${
                              selectedCard === card.id
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-orange-300'
                            }`}
                            onClick={() => setSelectedCard(card.id)}
                          >
                            {selectedCard === card.id && (
                              <div className="absolute top-2 right-2 text-orange-500">
                                <Check size={20} />
                              </div>
                            )}
                            
                            <div className="mb-3">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  {/* Card type logo based on first digit */}
                                  {String(card.card_no).startsWith('4') ? (
                                    <span className="font-bold text-blue-800 mr-2">VISA</span>
                                  ) : String(card.card_no).startsWith('5') ? (
                                    <span className="font-bold text-red-500 mr-2">MASTERCARD</span>
                                  ) : (
                                    <CreditCard size={24} className="mr-2" />
                                  )}
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditCard(card);
                                    }}
                                    className="text-blue-500 hover:text-blue-700 text-sm"
                                  >
                                    <Edit2 size={14} />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteCard(card.id);
                                    }}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-lg font-medium mb-2">
                              {maskCardNumber(card.card_no)}
                            </div>
                            
                            <div className="flex justify-between text-sm text-gray-600">
                              <div>{card.name_on_card}</div>
                              <div>{card.expire_month}/{card.expire_year.toString().substring(2)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500 mb-4">
                        <p>Henüz kayıtlı kart bulunmuyor. Yeni kart ekleyin.</p>
                      </div>
                    )}
                    
                    {/* Add New Card Button */}
                    <button
                      onClick={() => {
                        resetCardForm();
                        setShowAddCardForm(true);
                      }}
                      className="border-2 border-dashed border-orange-400 hover:border-orange-500 w-full py-3 rounded-md text-orange-500 hover:text-orange-600 hover:bg-orange-50 transition flex items-center justify-center font-semibold"
                    >
                      <Plus size={20} className="mr-2" />
                      Yeni Kart Ekle
                    </button>
                  </div>
                  
                  {/* 3D Secure Option */}
                  <div className="mb-6">
                    <div className="flex items-center py-3">
                      <input
                        type="checkbox"
                        id="use3dSecure"
                        checked={useSecure3d}
                        onChange={() => setUseSecure3d(!useSecure3d)}
                        className="mr-2 h-4 w-4 text-orange-500 focus:ring-orange-500 rounded border-gray-300"
                      />
                      <label htmlFor="use3dSecure" className="text-sm flex items-center cursor-pointer">
                        <ShieldCheck size={16} className="mr-1 text-green-500" />
                        <span>3D Secure ile ödemek istiyorum</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* CVV Field */}
                  {selectedCard && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV Kodu *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cvv"
                          value={cardFormData.cvv}
                          onChange={handleCardInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="123"
                          maxLength="4"
                          required
                        />
                        <div className="absolute right-2 top-2 text-gray-400">
                          <Info size={18} />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Kartınızın arkasındaki 3 veya 4 haneli güvenlik kodu
                      </p>
                    </div>
                  )}
                  
                  {/* Installment Options */}
                  {selectedCard && (
                    <div>
                      <h3 className="font-semibold mb-3">Taksit Seçenekleri</h3>
                      <p className="text-sm text-gray-600 mb-3">Kartınıza uygun taksit seçeneğini seçiniz</p>
                      
                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                                Taksit Sayısı
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Aylık Ödeme
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {installmentOptions.map((option) => (
                              <tr 
                                key={option.value}
                                className={`cursor-pointer hover:bg-gray-50 ${
                                  selectedInstallment === option.value ? 'bg-orange-50' : ''
                                }`}
                                onClick={() => setSelectedInstallment(option.value)}
                              >
                                <td className="px-4 py-3">
                                  <div className="flex items-center">
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                                      selectedInstallment === option.value 
                                      ? 'border-orange-500' 
                                      : 'border-gray-300'
                                    }`}>
                                      {selectedInstallment === option.value && (
                                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                      )}
                                    </div>
                                    <span className="ml-2">{option.title}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-3 font-medium text-right">
                                  {grandTotal.toFixed(2)} TL
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Link 
              to="/checkout/address" 
              className="flex items-center px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              <ChevronLeft size={18} className="mr-1" />
              Adres Bilgilerine Dön
            </Link>
            
            <button
              onClick={handleCreateOrder}
              disabled={!selectedCard || cardLoading || orderLoading}
              className={`flex items-center px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition ${
                (!selectedCard || cardLoading || orderLoading) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {orderLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-b-2 border-white mr-2"></div>
                  İşleniyor...
                </>
              ) : (
                <>
                  Siparişi Oluştur
                  <ChevronRight size={18} className="ml-1" />
                </>
              )}
            </button>
          </div>
          
          {/* Postman Test Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                // Generate test payload
                try {
                  const selectedCardData = cards.find(card => card.id === selectedCard);
                  
                  if (!selectedCardData) {
                    toast.error('Lütfen önce bir kart seçin');
                    return;
                  }
                  
                  // Create sample payload for Postman
                  const testPayload = {
                    address_id: 1,
                    order_date: new Date().toISOString(),
                    card_no: parseInt(selectedCardData.card_no.replace(/\s/g, '')),
                    card_name: selectedCardData.name_on_card,
                    card_expire_month: parseInt(selectedCardData.expire_month),
                    card_expire_year: parseInt(selectedCardData.expire_year),
                    card_ccv: parseInt(cardFormData.cvv || '123'),
                    price: grandTotal,
                    products: cart.map(item => ({
                      product_id: item.product.id,
                      count: item.count,
                      detail: item.product.detail || `${item.product.color || 'default'} - ${item.product.size || 'default'}`
                    }))
                  };
                  
                  // Copy to clipboard
                  navigator.clipboard.writeText(JSON.stringify(testPayload, null, 2))
                    .then(() => {
                      toast.info('Postman test verisi panoya kopyalandı! Postman\'da kullanabilirsiniz.');
                      console.log('Test Payload:', testPayload);
                      
                      // Show example for API call
                      console.log(`
Postman Test Instructions:
1. Open Postman
2. Create a new POST request to '/order' endpoint
3. Paste the copied JSON in the request body
4. Set 'Content-Type' header to 'application/json'
5. Add your authorization token in the headers
6. Send the request
`);
                    })
                    .catch(err => {
                      console.error('Clipboard write failed:', err);
                      toast.error('Veriler panoya kopyalanamadı');
                    });
                } catch (error) {
                  console.error('Error generating test payload:', error);
                  toast.error('Test verisi oluşturulurken hata oluştu');
                }
              }}
              className="text-sm py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              API Postman ile Test Et
            </button>
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
                <span className="font-bold text-xl text-orange-500">{grandTotal.toFixed(2)} TL</span>
              </div>
              
              <button 
                onClick={handleCreateOrder}
                disabled={!selectedCard || cardLoading || orderLoading}
                className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-md transition flex items-center justify-center ${
                  (!selectedCard || cardLoading || orderLoading) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {orderLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-b-2 border-white mr-2"></div>
                    İşleniyor...
                  </>
                ) : (
                  <>
                    <span>Ödeme Yap</span>
                    <ChevronRight size={20} className="ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Card Form Modal */}
      {showAddCardForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editCardId ? 'Kartı Düzenle' : 'Yeni Kart Ekle'}
              </h3>
              <button 
                onClick={() => setShowAddCardForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddOrUpdateCard}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kart Numarası *
                </label>
                <input
                  type="text"
                  name="card_no"
                  value={cardFormData.card_no}
                  onChange={handleCardInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Son Kullanma Ay *
                  </label>
                  <select
                    name="expire_month"
                    value={cardFormData.expire_month}
                    onChange={handleCardInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Ay</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option key={month} value={month}>
                        {month < 10 ? `0${month}` : month}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Son Kullanma Yıl *
                  </label>
                  <select
                    name="expire_year"
                    value={cardFormData.expire_year}
                    onChange={handleCardInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Yıl</option>
                    {yearOptions().map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kart Üzerindeki İsim *
                </label>
                <input
                  type="text"
                  name="name_on_card"
                  value={cardFormData.name_on_card}
                  onChange={handleCardInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ad Soyad"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cvv"
                    value={cardFormData.cvv}
                    onChange={handleCardInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="123"
                    maxLength="4"
                    required={!editCardId}
                  />
                  <div className="absolute right-2 top-2 text-gray-400">
                    <Info size={18} />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Kartınızın arkasındaki 3 veya 4 haneli güvenlik kodu
                </p>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddCardForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  disabled={cardLoading}
                >
                  {cardLoading ? 'İşleniyor...' : editCardId ? 'Güncelle' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPaymentPage; 