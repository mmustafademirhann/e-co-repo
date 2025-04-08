import { useHistory } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const products = [
  { id: 1, name: 'Laptop', price: 1499, image: 'https://picsum.photos/seed/laptop/300/200' },
  { id: 2, name: 'Smartphone', price: 899, image: 'https://picsum.photos/seed/smartphone/300/200' },
  { id: 3, name: 'Headphones', price: 199, image: 'https://picsum.photos/seed/headphones/300/200' }
]

const ShopPage = () => {
  const history = useHistory()

  const handleClick = (product) => {
    history.push({
      pathname: '/product',
      state: { product }
    })
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onClick={() => handleClick(p)} />
      ))}
    </div>
  )
}

export default ShopPage
