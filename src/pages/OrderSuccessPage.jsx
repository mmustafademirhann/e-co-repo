import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircle, ShoppingBag, ArrowLeft, Home } from 'lucide-react';

const OrderSuccessPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { lastOrder } = useSelector(state => state.shoppingCart);
  
  useEffect(() => {
    // If there's no order data, redirect to home
    if (!lastOrder) {
      history.push('/');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [lastOrder, history]);
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Siparişiniz Alındı!</h1>
          <p className="text-lg text-gray-600">Teşekkürler! Siparişiniz başarıyla oluşturuldu.</p>
        </div>
        
        {lastOrder && (
          <div className="mb-8">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-semibold mb-3">Sipariş Bilgileri</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Sipariş Tarihi</p>
                  <p className="font-medium">
                    {new Date(lastOrder.order_date).toLocaleDateString('tr-TR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Toplam Tutar</p>
                  <p className="font-medium text-orange-500">{lastOrder.price.toFixed(2)} TL</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ürün Sayısı</p>
                  <p className="font-medium">
                    {lastOrder.products.reduce((sum, product) => sum + product.count, 0)} Adet
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ödeme Yöntemi</p>
                  <p className="font-medium">Kredi Kartı</p>
                </div>
              </div>
            </div>
            
            <div className="border-b pb-4 mb-6">
              <h2 className="text-xl font-semibold mb-3">Teslimat Bilgileri</h2>
              <p className="text-gray-700">
                Siparişiniz en kısa sürede hazırlanıp kargoya verilecektir.
                Sipariş takibi için size e-posta ile bilgilendirme yapılacaktır.
              </p>
            </div>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Link 
            to="/"
            className="flex items-center justify-center bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-50 transition"
          >
            <Home className="mr-2 h-5 w-5" />
            Ana Sayfaya Dön
          </Link>
          <Link 
            to="/shop"
            className="flex items-center justify-center bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage; 