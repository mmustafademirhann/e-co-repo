import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/clientActions';
import { saveAnonymousCart } from '../redux/actions/shoppingCartActions';
import axiosInstance from '../api/axios';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.client);
  const cart = useSelector(state => state.shoppingCart.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token && !isAuthenticated) {
        // Token var ama kullanıcı authenticated değil, tokeni kontrol et
        try {
          // Token'ı axios header'ına ekle
          axiosInstance.defaults.headers.common['Authorization'] = token;
          
          // API ile token doğrulama
          const response = await axiosInstance.get('/verify');
          const userData = response.data?.data || response.data;
          
          if (userData) {
            // Token geçerli, kullanıcıyı set et
            dispatch(setUser(userData));
            setIsTokenValid(true);
          }
        } catch (error) {
          console.error('Token doğrulama hatası:', error);
          // Token geçersiz, temizle
          localStorage.removeItem('token');
          delete axiosInstance.defaults.headers.common['Authorization'];
        }
      } else if (isAuthenticated) {
        // Kullanıcı zaten authenticated
        setIsTokenValid(true);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [dispatch, isAuthenticated]);
  
  if (isLoading) {
    // Yükleniyor göstergesi (token kontrolü yapılıyorken)
    return <div className="flex items-center justify-center h-screen">Yükleniyor...</div>;
  }
  
  // Before redirecting to login, ensure cart is saved
  const handleRedirect = (props) => {
    // If user is not authenticated, save current cart state
    if (!isAuthenticated && !isTokenValid && cart.length > 0) {
      saveAnonymousCart(cart);
      console.log('Saved cart for anonymous user before redirect to login', cart);
    }
    
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }
        }}
      />
    );
  };
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated || isTokenValid ? (
          <Component {...props} />
        ) : (
          handleRedirect(props)
        )
      }
    />
  );
};

export default ProtectedRoute; 