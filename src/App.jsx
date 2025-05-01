import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import store from './redux/store'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutAddressPage from './pages/CheckoutAddressPage'
import CheckoutPaymentPage from './pages/CheckoutPaymentPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import TeamPage from './pages/TeamPage'
import SignUpForm from './components/SignUpForm'
import RealSignUp from './components/RealSignUp'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import axiosInstance from './api/axios'
import { setUser } from './redux/actions/clientActions'
import { clearSingleProductError, fetchSingleProduct } from './redux/actions/productActions'
import { loadUserCart } from './redux/actions/shoppingCartActions'

// Create a component to handle auto-login
const AutoLoginHandler = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set token in axios headers
      axiosInstance.defaults.headers.common['Authorization'] = token;
      
      // Fetch user data
      axiosInstance.get('/verify')
        .then(response => {
          const userData = response.data?.data || response.data;
          if (userData) {
            dispatch(setUser(userData));
            
            // Load user's cart
            if (userData.id) {
              dispatch(loadUserCart(userData.id));
            }
          }
        })
        .catch(() => {
          // If token is invalid, remove it
          localStorage.removeItem('token');
          delete axiosInstance.defaults.headers.common['Authorization'];
        });
    }
  }, [dispatch]);

  return null;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AutoLoginHandler />
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/shop" component={ShopPage} />
            <Route path="/shop/:gender/:categoryName/:categoryId" component={ShopPage} />
            <Route 
              path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" 
              render={(props) => (
                <ErrorBoundary 
                  onReset={() => {
                    const { productId } = props.match.params;
                    store.dispatch(clearSingleProductError());
                    store.dispatch(fetchSingleProduct(productId));
                  }}
                >
                  <ProductDetail {...props} />
                </ErrorBoundary>
              )} 
            />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route path="/contact" component={Contact} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/cart" component={CartPage} />
            <ProtectedRoute path="/checkout" exact component={CheckoutAddressPage} />
            <ProtectedRoute path="/checkout/address" component={CheckoutAddressPage} />
            <ProtectedRoute path="/checkout/payment" component={CheckoutPaymentPage} />
            <ProtectedRoute path="/checkout/success" component={OrderSuccessPage} />
            <Route 
              path="/product/:productId" 
              render={(props) => (
                <ErrorBoundary 
                  onReset={() => {
                    const { productId } = props.match.params;
                    store.dispatch(clearSingleProductError());
                    store.dispatch(fetchSingleProduct(productId));
                  }}
                >
                  <ProductDetail {...props} />
                </ErrorBoundary>
              )} 
            />
            <Route path="/team" component={TeamPage} />
            <Route path="/login" component={SignUpForm} />
            <Route path="/signup" component={RealSignUp} />
          </Switch>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          limit={3}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </Provider>
  );
}

export default App
