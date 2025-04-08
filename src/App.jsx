import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import ProductDetail from './pages/ProductDetail'
import TeamPage from './pages/TeamPage'


function App() {
  return (
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
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
