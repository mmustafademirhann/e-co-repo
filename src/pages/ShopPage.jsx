import { useHistory, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Product } from '../components/Product'
import { ShopHeader } from '../components/ShopHeader'
import { CategoryBanners } from '../components/CategoryBanners'
import { FilterBar } from '../components/FilterBar'
import { Pagination } from '../components/Pagination'
import Firms from '../components/Firms'
import { fetchProducts } from '../redux/actions/productActions'
import { Loader2, AlertCircle } from 'lucide-react'

const ShopPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { gender, categoryName, categoryId } = useParams()
  
  const products = useSelector(state => state.product.productList)
  const fetchState = useSelector(state => state.product.fetchState)
  const filter = useSelector(state => state.product.filter)
  const sort = useSelector(state => state.product.sort)

  useEffect(() => {
    const params = { categoryId }
    if (filter) params.filter = filter
    if (sort) params.sort = sort
    dispatch(fetchProducts(params))
  }, [dispatch, categoryId, filter, sort])

  if (fetchState === 'FETCHING') {
    return (
      <div className="min-h-screen bg-white max-w-7xl mx-auto p-4 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading products...</span>
      </div>
    )
  }

  if (fetchState === 'FAILED') {
    return (
      <div className="min-h-screen bg-white max-w-7xl mx-auto p-4 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to load products</h2>
        <p className="text-gray-600 mb-4">There was an error loading the products. Please try again later.</p>
        <button 
          onClick={() => dispatch(fetchProducts({ categoryId, filter, sort }))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto">
      <ShopHeader categoryName={categoryName} gender={gender} />
      <CategoryBanners />
      <FilterBar />
      <div className="px-4 py-8">
        <Product products={products} />
      </div>
      <Pagination />
      <Firms />
    </div>
  )
}

export default ShopPage