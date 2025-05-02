import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';
import { Loader2, AlertCircle, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';

const PreviousOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }
        
        // Ensure axios instance has the token
        axiosInstance.defaults.headers.common['Authorization'] = token;

        const response = await axiosInstance.get('/order');
        console.log("API Response:", response);

        if (response.data && Array.isArray(response.data)) {
          // Sort orders by date, newest first
          const sortedOrders = response.data.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
          setOrders(sortedOrders);
        } else {
          // Handle cases where data might be nested or not an array
          console.warn("Unexpected API response format:", response.data);
          setOrders([]); // Set empty if format is wrong
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message || 'Failed to fetch orders. Please try again later.');
        toast.error(err.message || 'Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric' 
      });
    } catch (e) {
      console.error('Error formatting date:', dateString, e);
      return 'Invalid Date';
    }
  };

  const calculateOrderTotal = (products) => {
    if (!Array.isArray(products)) return 0;
    return products.reduce((total, item) => total + (item.count * item.price), 0);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[60vh]">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Orders</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Previous Orders</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag size={64} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Total Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(order.order_date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">
                      ${calculateOrderTotal(order.products).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <button className="text-blue-600 hover:text-blue-800 flex items-center">
                        {openOrderId === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        <span className="ml-1">{openOrderId === order.id ? 'Hide' : 'View'}</span>
                      </button>
                    </td>
                  </tr>
                  {/* Collapsible Details Row */}
                  {openOrderId === order.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="4" className="px-6 py-6">
                        <h4 className="text-lg font-semibold mb-4 text-gray-700">Order Details (#{order.id})</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h5 className="font-medium text-gray-600 mb-2">Shipping Address</h5>
                            {order.address ? (
                              <address className="text-sm text-gray-800 not-italic">
                                {order.address.name} {order.address.surname}<br />
                                {order.address.address}<br />
                                {order.address.neighborhood}, {order.address.district}<br />
                                {order.address.city}<br />
                                Phone: {order.address.phone}
                              </address>
                            ) : (
                              <p className="text-sm text-gray-500">Address not available</p>
                            )}
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-600 mb-2">Order Summary</h5>
                            <p className="text-sm text-gray-800">Date: {formatDate(order.order_date)}</p>
                            <p className="text-sm text-gray-800">Total: ${calculateOrderTotal(order.products).toFixed(2)}</p>
                            {/* Add more summary details if available, e.g., payment method */}
                          </div>
                        </div>
                        
                        <h5 className="font-medium text-gray-600 mb-3">Products</h5>
                        <ul className="divide-y divide-gray-200 border rounded-md">
                          {Array.isArray(order.products) && order.products.map((item, index) => (
                            <li key={item.product?.id || index} className="flex items-center p-4">
                              <img 
                                src={item.product?.images?.[0]?.url || '/placeholder.png'} 
                                alt={item.product?.name || 'Product Image'}
                                className="w-16 h-16 object-cover rounded mr-4 border"
                                onError={(e) => e.target.src = '/placeholder.png'}
                              />
                              <div className="flex-grow">
                                <p className="font-medium text-gray-800">{item.product?.name || 'Product Name N/A'}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.count}</p>
                              </div>
                              <p className="text-sm font-medium text-gray-800">${item.price?.toFixed(2) || 'N/A'}</p>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PreviousOrdersPage; 