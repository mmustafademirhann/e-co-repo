import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axios';
import { 
  MapPin,
  Plus,
  Edit2,
  Trash2,
  User,
  Phone,
  MapPin as LocationIcon,
  Check,
  X,
  ChevronRight,
  ChevronLeft 
} from 'lucide-react';
import { setCheckoutAddress } from '../redux/actions/shoppingCartActions';

const CheckoutAddressPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.shoppingCart);
  const { user } = useSelector(state => state.client);
  
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [useShippingForReceipt, setUseShippingForReceipt] = useState(true);
  const [selectedReceiptAddress, setSelectedReceiptAddress] = useState(null);
  const [cities, setCities] = useState(['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana']);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    address: ''
  });
  
  // Fetch addresses on component mount
  useEffect(() => {
    if (cart.length === 0) {
      toast.error('Sepetiniz boş');
      history.push('/cart');
      return;
    }
    
    // Token kontrolü ve ayarlanması
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = token;
      console.log('API istekleri için token ayarlandı');
    } else {
      console.warn('Token bulunamadı');
      // Kullanıcı authentike değil, login sayfasına yönlendirelim
      toast.error('Lütfen önce giriş yapın');
      history.push('/login', { from: location.pathname });
      return;
    }
    
    // İlk adres yüklemesi
    fetchAddresses();
  }, []);
  
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      // API'den adres listesini al
      console.log('Adresler API isteği yapılıyor...');
      const response = await axiosInstance.get('/user/address');
      console.log('API tam cevabı:', response);
      
      // API cevap yapısı doğrudan response.data olabilir (data?.data yerine)
      let addressList = [];
      
      // API yanıtının formatını kontrol et
      if (response && response.data) {
        if (Array.isArray(response.data)) {
          // Doğrudan dizi döndü ise
          addressList = response.data;
          console.log('Adresler doğrudan dizi olarak alındı:', addressList);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // { data: [...] } formatında ise
          addressList = response.data.data;
          console.log('Adresler data alt özelliğinden alındı:', addressList);
        } else {
          // Diğer olası formatları kontrol et
          const possibleArrays = Object.values(response.data).find(val => Array.isArray(val));
          if (possibleArrays) {
            addressList = possibleArrays;
            console.log('Adresler başka bir formatta bulundu:', addressList);
          } else {
            console.warn('API yanıtı beklenen formatta değil:', response.data);
          }
        }
      }
      
      console.log('İşlenmiş adres listesi:', addressList);
      
      // Adres listesini state'e kaydet (boş bile olsa)
      setAddresses(addressList);
      
      // Eğer adres listesi boş değilse, ilk adresi seç
      if (addressList && addressList.length > 0) {
        console.log('İlk adres seçiliyor:', addressList[0].id);
        setSelectedShippingAddress(addressList[0].id);
        if (!useShippingForReceipt) {
          setSelectedReceiptAddress(addressList[0].id);
        }
      } else {
        console.log('Adres listesi boş veya işlenemiyor, seçim yapılamadı');
        setSelectedShippingAddress(null);
        setSelectedReceiptAddress(null);
      }
      
    } catch (error) {
      console.error('Adresleri çekerken hata oluştu:', error);
      if (error.response) {
        console.error('API cevap kodu:', error.response.status);
        console.error('API cevap detayı:', error.response.data);
      }
      toast.error('Adresleriniz yüklenirken bir sorun oluştu');
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: '',
      district: '',
      neighborhood: '',
      address: ''
    });
    setEditAddressId(null);
  };
  
  const handleAddAddress = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      console.log('Form verileri:', formData);
      
      // Form verilerinin tam olduğundan emin ol
      const requiredFields = ['title', 'name', 'surname', 'phone', 'city', 'district', 'neighborhood', 'address'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Eksik alanlar: ${missingFields.join(', ')}`);
      }
      
      // Adres ID si kontrolü
      if (editAddressId) {
        // Update existing address
        console.log('Adres güncelleniyor, ID:', editAddressId);
        const updateData = {
          id: editAddressId,
          ...formData
        };
        console.log('Gönderilecek veri:', updateData);
        
        // API isteği
        const response = await axiosInstance.put('/user/address', updateData);
        console.log('API Cevabı (güncelleme):', response.data);
        
        // Başarı mesajı
        toast.success('Adres başarıyla güncellendi');
      } else {
        // Add new address
        console.log('Yeni adres ekleniyor');
        console.log('Gönderilecek veri:', formData);
        
        // API isteği
        const response = await axiosInstance.post('/user/address', formData);
        console.log('API Cevabı (ekleme):', response.data);
        
        // Başarı mesajı
        toast.success('Adres başarıyla eklendi');
      }
      
      // Form kapatılıyor ve işlem sonrası stateleri temizleme
      resetForm();
      setShowAddForm(false);
      
      // Tam sayfa yenilemesi - En garantili yöntem
      toast.info('Adresleriniz yükleniyor...');
      window.location.reload();
      
    } catch (error) {
      console.error('Adres kaydetme hatası:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Bir hata oluştu';
      toast.error(errorMsg);
      
      // Ekstra hata detayı
      if (error.response) {
        console.error('API yanıt detayları:', error.response.data);
        console.error('HTTP Status:', error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditAddress = (address) => {
    setEditAddressId(address.id);
    setFormData({
      title: address.title,
      name: address.name,
      surname: address.surname,
      phone: address.phone,
      city: address.city,
      district: address.district,
      neighborhood: address.neighborhood,
      address: address.address || ''
    });
    setShowAddForm(true);
  };
  
  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        setLoading(true);
        await axiosInstance.delete(`/user/address/${addressId}`);
        toast.success('Address deleted successfully');
        
        // Remove the address from selected if it was selected
        if (selectedShippingAddress === addressId) {
          setSelectedShippingAddress(null);
        }
        if (selectedReceiptAddress === addressId) {
          setSelectedReceiptAddress(null);
        }
        
        // Refresh addresses list
        await fetchAddresses();
      } catch (error) {
        toast.error('Failed to delete address');
        console.error('Error deleting address:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handleContinue = () => {
    // Validation
    if (!selectedShippingAddress) {
      toast.error('Please select a shipping address');
      return;
    }
    
    if (!useShippingForReceipt && !selectedReceiptAddress) {
      toast.error('Please select a receipt address');
      return;
    }
    
    // Store selected addresses in local storage and Redux state
    const checkoutData = {
      shippingAddressId: selectedShippingAddress,
      receiptAddressId: useShippingForReceipt ? selectedShippingAddress : selectedReceiptAddress
    };
    
    console.log('Saving checkout data to localStorage and Redux:', checkoutData);
    
    // Save to Redux state
    dispatch(setCheckoutAddress(checkoutData));
    
    // Save to localStorage as backup
    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
    // Verify data was saved correctly
    const savedData = localStorage.getItem('checkoutData');
    console.log('Verified saved data in localStorage:', savedData);
    
    // Navigate to payment page
    history.push('/checkout/payment');
  };
  
  const handleUseShippingForReceipt = () => {
    setUseShippingForReceipt(!useShippingForReceipt);
    if (!useShippingForReceipt) {
      setSelectedReceiptAddress(null);
    }
  };
  
  // Calculate order summary
  const totalAmount = cart.reduce((total, item) => total + (item.product.price * item.count), 0);
  const shippingCost = totalAmount > 100 ? 0 : 29.99;
  const discount = 0; // Can be updated if discount is applied
  const grandTotal = totalAmount + shippingCost - discount;
  
  // Get address by ID
  const getAddressById = (id) => {
    return addresses.find(addr => addr.id === id) || {};
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold">
                1
              </div>
              <h1 className="ml-4 text-2xl font-bold text-orange-500">Adres Bilgileri</h1>
            </div>
            
            <div className="flex items-center">
              <div className="h-1 flex-1 bg-orange-500"></div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 text-gray-500 font-bold mx-2">
                2
              </div>
              <h2 className="ml-4 text-xl font-semibold text-gray-500">Ödeme Seçenekleri</h2>
              <div className="h-1 flex-1 bg-gray-300 ml-2"></div>
            </div>
          </div>
          
          {/* Address Selection Section */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <MapPin className="mr-2" size={20} />
                Teslimat Adresi
              </h2>
              
              {loading ? (
                <div className="text-center py-4 flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mr-2"></div>
                  <span>Adresler yükleniyor...</span>
                </div>
              ) : addresses && addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <div 
                      key={address.id} 
                      className={`border rounded-md p-4 relative cursor-pointer transition ${
                        selectedShippingAddress === address.id 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setSelectedShippingAddress(address.id)}
                    >
                      {selectedShippingAddress === address.id && (
                        <div className="absolute top-2 right-2 text-orange-500">
                          <Check size={20} />
                        </div>
                      )}
                      <div className="font-semibold mb-2">{address.title}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-start">
                          <User size={16} className="mr-1 mt-1" />
                          <span>{address.name} {address.surname}</span>
                        </div>
                        <div className="flex items-start mt-1">
                          <Phone size={16} className="mr-1 mt-1" />
                          <span>{address.phone}</span>
                        </div>
                        <div className="flex items-start mt-1">
                          <LocationIcon size={16} className="mr-1 mt-1" />
                          <span>
                            {[address.address, address.neighborhood, address.district, address.city].filter(Boolean).join(', ')}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAddress(address);
                          }}
                          className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
                        >
                          <Edit2 size={14} className="mr-1" />
                          Düzenle
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(address.id);
                          }}
                          className="text-red-500 hover:text-red-700 text-sm flex items-center"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Sil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <p>Henüz adres bulunmuyor. Lütfen "Yeni Adres Ekle" butonunu kullanarak adres ekleyin.</p>
                  <p className="mt-2 text-xs text-gray-400">Adresleriniz görünmüyorsa, <button onClick={() => window.location.reload()} className="text-orange-500 hover:underline">sayfayı yenileyin</button>.</p>
                </div>
              )}
              
              {/* Yeni Adres Ekle Button - Daha belirgin yapalım */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddForm(true);
                  }}
                  className="border-2 border-dashed border-orange-400 hover:border-orange-500 w-full py-3 rounded-md text-orange-500 hover:text-orange-600 hover:bg-orange-50 transition flex items-center justify-center font-semibold"
                >
                  <Plus size={20} className="mr-2" />
                  Yeni Adres Ekle
                </button>
              </div>
            </div>
          </div>
          
          {/* Receipt Address Section */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <MapPin className="mr-2" size={20} />
                  Fatura Adresi
                </h2>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="useShippingAddress"
                    checked={useShippingForReceipt}
                    onChange={handleUseShippingForReceipt}
                    className="mr-2 h-4 w-4 text-orange-500 focus:ring-orange-500 rounded"
                  />
                  <label htmlFor="useShippingAddress" className="text-sm">
                    Faturamı Aynı Adrese Gönder
                  </label>
                </div>
              </div>
              
              {!useShippingForReceipt && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div 
                        key={`receipt-${address.id}`} 
                        className={`border rounded-md p-4 relative cursor-pointer transition ${
                          selectedReceiptAddress === address.id 
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-gray-200 hover:border-orange-300'
                        }`}
                        onClick={() => setSelectedReceiptAddress(address.id)}
                      >
                        {selectedReceiptAddress === address.id && (
                          <div className="absolute top-2 right-2 text-orange-500">
                            <Check size={20} />
                          </div>
                        )}
                        <div className="font-semibold mb-2">{address.title}</div>
                        <div className="text-sm text-gray-600 mb-2">
                          <div className="flex items-start">
                            <User size={16} className="mr-1 mt-1" />
                            <span>{address.name} {address.surname}</span>
                          </div>
                          <div className="flex items-start mt-1">
                            <Phone size={16} className="mr-1 mt-1" />
                            <span>{address.phone}</span>
                          </div>
                          <div className="flex items-start mt-1">
                            <LocationIcon size={16} className="mr-1 mt-1" />
                            <span>
                              {address.neighborhood}, {address.district}, {address.city}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Fatura için de Yeni Adres Ekle butonu */}
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        resetForm();
                        setShowAddForm(true);
                      }}
                      className="border-2 border-dashed border-orange-400 hover:border-orange-500 w-full py-3 rounded-md text-orange-500 hover:text-orange-600 hover:bg-orange-50 transition flex items-center justify-center font-semibold"
                    >
                      <Plus size={20} className="mr-2" />
                      Yeni Adres Ekle
                    </button>
                  </div>
                </>
              )}
              
              {useShippingForReceipt && selectedShippingAddress && (
                <div className="border border-orange-200 rounded-md p-4 bg-orange-50">
                  <div className="font-semibold mb-2">
                    {getAddressById(selectedShippingAddress)?.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-start">
                      <User size={16} className="mr-1 mt-1" />
                      <span>
                        {getAddressById(selectedShippingAddress)?.name} {getAddressById(selectedShippingAddress)?.surname}
                      </span>
                    </div>
                    <div className="flex items-start mt-1">
                      <Phone size={16} className="mr-1 mt-1" />
                      <span>{getAddressById(selectedShippingAddress)?.phone}</span>
                    </div>
                    <div className="flex items-start mt-1">
                      <LocationIcon size={16} className="mr-1 mt-1" />
                      <span>
                        {getAddressById(selectedShippingAddress)?.neighborhood}, 
                        {getAddressById(selectedShippingAddress)?.district}, 
                        {getAddressById(selectedShippingAddress)?.city}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Kurumsal Fatura Notification */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-8 flex items-start">
            <div className="text-blue-500 mr-3 mt-1">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-gray-700">
                Kurumsal faturalı alışveriş yapmak için "Faturamı Aynı Adrese Gönder" tikini kaldırın ve Fatura adresi olarak kayıtlı Kurumsal Fatura adresinizi seçin.
              </p>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Link 
              to="/cart" 
              className="flex items-center px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              <ChevronLeft size={18} className="mr-1" />
              Sepete Dön
            </Link>
            
            <button
              onClick={handleContinue}
              className="flex items-center px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              Ödeme Adımına Geç
              <ChevronRight size={18} className="ml-1" />
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
                onClick={handleContinue}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-md transition flex items-center justify-center"
              >
                <span>Kaydet ve Devam Et</span>
                <ChevronRight size={20} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Address Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editAddressId ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
              </h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddAddress}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adres Başlığı
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ev, İş vb."
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Soyad
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="05xxxxxxxxx"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İl
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Seçiniz</option>
                  {cities.map((city) => (
                    <option key={city} value={city.toLowerCase()}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İlçe
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mahalle
                </label>
                <input
                  type="text"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adres Detayı
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Sokak, bina ve kapı numarası"
                  rows="3"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  disabled={loading}
                >
                  {loading ? 'Yükleniyor...' : editAddressId ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutAddressPage; 