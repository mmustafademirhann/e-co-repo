import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import store from './redux/store'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import ProductDetail from './pages/ProductDetail'
import TeamPage from './pages/TeamPage'
import SignUpForm from './components/SignUpForm'
import RealSignUp from './components/RealSignUp'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route path="/contact" component={Contact} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/product" component={ProductDetail} />
            <Route path="/team" component={TeamPage} />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/realsignup" component={RealSignUp} />
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
  )
}

export default App
